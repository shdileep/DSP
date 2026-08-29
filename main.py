import os
import json
import socket
import smtplib
import urllib.request
from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Import Local AI Pipeline
import ai_pipeline
import search_service

# Initialize FastAPI App
app = FastAPI(
    title="Dileep Sai Portfolio Contact API Gateway",
    description="Primary API Gateway handling forms, local AI NLP classification, and email routing",
    version="2.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SUBMISSIONS_FILE = "submissions.json"

# Contact Request Schema
class ContactRequest(BaseModel):
    name: str
    email: str
    subject: str = ""
    message: str

class SearchRequest(BaseModel):
    query: str

def load_dotenv():
    """Manually parse .env variables to avoid external dependencies"""
    if os.path.exists(".env"):
        print("[Env] Loading configuration from .env file...")
        with open(".env", "r", encoding="utf-8-sig") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#"):
                    continue
                if "=" in line:
                    key, val = line.split("=", 1)
                    key = key.strip()
                    val = val.strip().strip('"').strip("'")
                    os.environ[key] = val

# Load env variables at startup
load_dotenv()

def save_submission_to_json(name: str, email: str, subject: str, message: str, ai_analysis: dict):
    """Failsafe local database logger storing raw data and AI enrichments"""
    data = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "name": name,
        "email": email,
        "subject": subject,
        "message": message,
        "ai_analysis": ai_analysis
    }
    
    submissions = []
    if os.path.exists(SUBMISSIONS_FILE):
        try:
            with open(SUBMISSIONS_FILE, "r", encoding="utf-8") as f:
                submissions = json.load(f)
                if not isinstance(submissions, list):
                    submissions = []
        except Exception as e:
            print(f"[Submissions Storage Error] Failed to read submissions: {e}")
            submissions = []
            
    submissions.append(data)
    
    try:
        with open(SUBMISSIONS_FILE, "w", encoding="utf-8") as f:
            json.dump(submissions, f, indent=2, ensure_ascii=False)
        print(f"[Submissions Storage] Saved submission to {SUBMISSIONS_FILE}")
    except Exception as e:
        print(f"[Submissions Storage Error] Failed to write submission: {e}")

def forward_to_mock_server(name: str, email: str, subject: str, message: str, ai_analysis: dict):
    payload = {
        "to_email": os.environ.get("RECIPIENT_EMAIL", "dileepsaigalla@gmail.com"),
        "from_email": email,
        "reply_to": email,
        "subject": subject or f"New message from {name}",
        "body": message,
        "ai_metadata": ai_analysis
    }
    try:
        encoded_data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            "http://localhost:5001/api/mock-send",
            data=encoded_data,
            headers={'Content-Type': 'application/json'}
        )
        # 5-second timeout to prevent locking if Mock server is not running
        with urllib.request.urlopen(req, timeout=5) as response:
            res_content = json.loads(response.read().decode("utf-8"))
            print(f"[Forwarder] Mock Email Relay Server Response: {res_content.get('message')}")
    except Exception as err:
        print(f"[Forwarder Error] Failed to contact Mock Email server: {err}")

def dispatch_email(name: str, email: str, subject: str, message: str, ai_analysis: dict):
    # 1. Forward to Mock Server if available
    forward_to_mock_server(name, email, subject, message, ai_analysis)

    recipient = os.environ.get("RECIPIENT_EMAIL", "dileepsaigalla@gmail.com")
    smtp_host = os.environ.get("SMTP_HOST")
    smtp_port = os.environ.get("SMTP_PORT")
    smtp_user = os.environ.get("SMTP_USER")
    smtp_pass = os.environ.get("SMTP_PASS")

    # 2. Custom SMTP if configured
    if smtp_host and smtp_user and smtp_pass:
        try:
            port = int(smtp_port) if smtp_port else 587
            msg = MIMEMultipart()
            msg['From'] = smtp_user
            msg['To'] = recipient
            msg['Subject'] = subject or f"Portfolio Contact from {name}"
            msg['Reply-To'] = email

            body = (
                f"You have received a new message from your portfolio contact form:\n\n"
                f"Name: {name}\n"
                f"Email: {email}\n"
                f"Subject: {subject or 'N/A'}\n\n"
                f"Message:\n{message}\n\n"
                f"--------------------------------------------------\n"
                f"AI Classification: {ai_analysis['category']}\n"
                f"AI Sentiment:      {ai_analysis['sentiment']}\n"
                f"--------------------------------------------------\n"
                f"Automated Draft:\n{ai_analysis['auto_draft_reply']}"
            )
            msg.attach(MIMEText(body, 'plain'))
            
            if port == 465:
                server = smtplib.SMTP_SSL(smtp_host, port, timeout=10)
            else:
                server = smtplib.SMTP(smtp_host, port, timeout=10)
                server.starttls()
                
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)
            server.quit()
            print(f"[SMTP] Email successfully sent to {recipient} via {smtp_host}!")
            return
        except Exception as e:
            print(f"[SMTP Error] Custom SMTP failed: {e}. Trying direct MX delivery...")

    # 3. Direct-to-MX Delivery Fallback (No third-party key, direct SMTP handshake)
    print(f"[SMTP] Attempting direct-to-MX SMTP delivery to {recipient}...")
    try:
        mx_host = "gmail-smtp-in.l.google.com"
        
        msg = MIMEMultipart()
        msg['From'] = f"<{email}>"
        msg['To'] = recipient
        msg['Subject'] = subject or f"Direct Portfolio Contact from {name}"
        msg['Reply-To'] = email
        
        body = (
            f"You have received a new message from your portfolio contact form (Direct MX Fallback):\n\n"
            f"Name: {name}\n"
            f"Email: {email}\n"
            f"Subject: {subject or 'N/A'}\n\n"
            f"Message:\n{message}\n\n"
            f"--------------------------------------------------\n"
            f"AI Classification: {ai_analysis['category']}\n"
            f"AI Sentiment:      {ai_analysis['sentiment']}\n"
            f"--------------------------------------------------\n"
            f"Automated Draft:\n{ai_analysis['auto_draft_reply']}"
        )
        msg.attach(MIMEText(body, 'plain'))
        
        server = smtplib.SMTP(mx_host, 25, timeout=10)
        server.send_message(msg)
        server.quit()
        print(f"[SMTP] Direct MX email successfully delivered to Google MX for {recipient}!")
        return
    except Exception as mx_err:
        print(f"[SMTP Direct Error] Direct MX handshake failed: {mx_err}")

    # 4. Final Fallback: Log to Server Console
    print("\n================= EMAIL DELIVERY FALLBACK =================")
    print(f"SMTP variables are not configured in your .env, and direct MX delivery failed.")
    print(f"Details saved to submissions.json and mock_inbox.json.")
    print("============================================================\n")

@app.post("/api/contact")
async def contact_endpoint(payload: ContactRequest, background_tasks: BackgroundTasks):
    trimmed_name = payload.name.strip()
    trimmed_email = payload.email.strip()
    trimmed_subject = payload.subject.strip()
    trimmed_message = payload.message.strip()

    if not trimmed_name or not trimmed_email or not trimmed_message:
        raise HTTPException(
            status_code=400,
            detail="Name, email, and message fields cannot be empty or blank."
        )

    # 1. Feed message to local AI NLP Classification Pipeline
    ai_analysis = ai_pipeline.analyze_text(trimmed_message)

    # 2. Save submission and AI metadata immediately to submissions.json
    save_submission_to_json(trimmed_name, trimmed_email, trimmed_subject, trimmed_message, ai_analysis)

    # 3. Schedule email dispatch and mock server synchronization asynchronously
    background_tasks.add_task(
        dispatch_email,
        trimmed_name,
        trimmed_email,
        trimmed_subject,
        trimmed_message,
        ai_analysis
    )

    return {
        "success": True,
        "message": "Message received. Back-end backup logged, AI analysis complete, and email queue scheduled.",
        "ai_insight": {
            "sentiment": ai_analysis["sentiment"],
            "category": ai_analysis["category"],
            "reply_draft_preview": ai_analysis["auto_draft_reply"]
        }
    }

@app.post("/api/search")
async def search_endpoint(payload: SearchRequest):
    query = payload.query.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Search query cannot be empty.")
    return search_service.search_web_ai(query)

@app.get("/api/search")
async def search_get_endpoint(q: str = ""):
    query = q.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Query parameter 'q' cannot be empty.")
    return search_service.search_web_ai(query)

if __name__ == "__main__":
    import uvicorn
    # Start ASGI server on port 5000 to match Vite's API proxying route
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)
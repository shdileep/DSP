import os
import json
from datetime import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Mock SMTP Relay Server",
    description="Local dummy SMTP mock server that logs real-time incoming emails and saves them to a simulated inbox file.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

INBOX_FILE = "mock_inbox.json"

class MockMailPayload(BaseModel):
    to_email: str
    from_email: str
    reply_to: str
    subject: str
    body: str
    ai_metadata: dict = {}

def save_to_mock_inbox(payload: MockMailPayload):
    data = {
        "received_at": datetime.utcnow().isoformat() + "Z",
        "to": payload.to_email,
        "from": payload.from_email,
        "reply_to": payload.reply_to,
        "subject": payload.subject,
        "body": payload.body,
        "ai_metadata": payload.ai_metadata
    }
    
    inbox = []
    if os.path.exists(INBOX_FILE):
        try:
            with open(INBOX_FILE, "r", encoding="utf-8") as f:
                inbox = json.load(f)
                if not isinstance(inbox, list):
                    inbox = []
        except Exception as e:
            print(f"[Inbox Storage Error] Failed to read mock inbox: {e}")
            inbox = []
            
    inbox.append(data)
    
    try:
        with open(INBOX_FILE, "w", encoding="utf-8") as f:
            json.dump(inbox, f, indent=2, ensure_ascii=False)
        print(f"[Inbox Storage] Saved incoming mock mail to {INBOX_FILE}")
    except Exception as e:
        print(f"[Inbox Storage Error] Failed to write to mock inbox: {e}")

def safe_print(text: str):
    try:
        print(text)
    except UnicodeEncodeError:
        print(text.encode('ascii', errors='replace').decode('ascii'))

@app.post("/api/mock-send")
async def mock_send_endpoint(payload: MockMailPayload):
    # Save the mock email locally
    save_to_mock_inbox(payload)
    
    # Format and print the email beautifully in console
    safe_print("\n" + "="*60)
    safe_print("[MOCK EMAIL SERVER RECEIPT]")
    safe_print("="*60)
    safe_print(f"Timestamp:   {datetime.utcnow().isoformat()}Z")
    safe_print(f"To:          {payload.to_email}")
    safe_print(f"From:        {payload.from_email}")
    safe_print(f"Reply-To:    {payload.reply_to}")
    safe_print(f"Subject:     {payload.subject}")
    safe_print("-"*60)
    safe_print("Body:")
    safe_print(payload.body)
    
    # Print AI analysis metadata
    ai = payload.ai_metadata
    if ai:
        safe_print("-"*60)
        safe_print("[LOCAL AI PIPELINE ENRICHMENT]")
        safe_print(f"Sentiment:  {ai.get('sentiment', 'N/A')} (Score: {ai.get('sentiment_score', 0)})")
        safe_print(f"Category:   {ai.get('category', 'N/A')}")
        safe_print(f"Entities:   {', '.join(ai.get('entities_extracted', [])) or 'None'}")
        safe_print("Auto-Reply Generated: Yes")
    safe_print("="*60 + "\n")
    
    return {
        "status": "success",
        "message": "Email received by mock SMTP relay server.",
        "inbox_file": INBOX_FILE
    }

if __name__ == "__main__":
    import uvicorn
    # Start mock email relay on port 5001
    uvicorn.run("mock_email_server:app", host="0.0.0.0", port=5001, reload=True)

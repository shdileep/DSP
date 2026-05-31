import re

# Local Lexicons for Sentiment Analysis
POSITIVE_WORDS = {
    'great', 'awesome', 'excellent', 'good', 'love', 'nice', 'fantastic', 'amazing', 
    'impressed', 'best', 'wonderful', 'perfect', 'cool', 'superb', 'positive', 'happy',
    'glad', 'interested', 'exciting', 'innovative', 'pioneer', 'optimize', 'accelerate'
}

NEGATIVE_WORDS = {
    'bad', 'poor', 'terrible', 'worst', 'hate', 'dislike', 'fail', 'error', 'bug', 
    'wrong', 'broken', 'issue', 'problem', 'delay', 'expensive', 'slow', 'difficult',
    'negative', 'sad', 'angry', 'reject', 'cancel', 'stop', 'failed'
}

# Local Lexicons for Intent / Category Classification
INTENT_KEYWORDS = {
    'career': {'job', 'hire', 'intern', 'career', 'opportunity', 'position', 'resume', 'cv', 'role', 'recruiter', 'hr', 'opening'},
    'project': {'contract', 'freelance', 'project', 'consulting', 'proposal', 'scope', 'work', 'build', 'develop', 'app', 'website', 'system'},
    'partnership': {'partner', 'collaborate', 'cooperation', 'alliance', 'joint', 'startup', 'invest', 'funding'},
    'spam': {'crypto', 'bitcoin', 'investment', 'casino', 'lottery', 'seo', 'traffic', 'viagra', 'earn money', 'free offer', 'promotion'}
}

# Local Lexicons for Entity Extraction (Technologies & Skills)
TECH_ENTITIES = {
    'Python', 'FastAPI', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 
    'TensorFlow', 'PyTorch', 'Celery', 'Zustand', 'HTML', 'CSS', 'GenAI', 'LLM', 'RAG', 
    'Agentic AI', 'Celery', 'Redis', 'Express', 'Vite', 'MySQL', 'MongoDB'
}

def analyze_text(text: str):
    """
    Perform self-contained local AI analysis on contact message.
    Does not make any third-party or external API calls.
    """
    cleaned_text = re.sub(r'[^\w\s]', '', text.lower())
    words = cleaned_text.split()
    
    # 1. Sentiment Analysis
    pos_count = sum(1 for w in words if w in POSITIVE_WORDS)
    neg_count = sum(1 for w in words if w in NEGATIVE_WORDS)
    
    if pos_count > neg_count:
        sentiment = "Positive"
    elif neg_count > pos_count:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"
        
    sentiment_score = pos_count - neg_count

    # 2. Category / Intent Classification
    intent_scores = {category: 0 for category in INTENT_KEYWORDS}
    for category, keywords in INTENT_KEYWORDS.items():
        for keyword in keywords:
            # Match whole words
            pattern = r'\b' + re.escape(keyword) + r'\b'
            matches = re.findall(pattern, text.lower())
            intent_scores[category] += len(matches)
            
    # Default to 'General Inquiry' if no keywords found
    max_score = max(intent_scores.values())
    if max_score > 0:
        primary_intent = max(intent_scores, key=intent_scores.get)
        # Format category name nicely
        category = primary_intent.replace('_', ' ').title()
    else:
        category = "General Inquiry"

    # 3. Entity Extraction
    extracted_tech = []
    for tech in TECH_ENTITIES:
        # Case insensitive exact word boundaries search
        pattern = r'\b' + re.escape(tech.lower()) + r'\b'
        if re.search(pattern, text.lower()):
            extracted_tech.append(tech)

    # 4. Local AI Response Generation (Auto-Draft Reply)
    auto_reply = generate_auto_draft(category, sentiment, extracted_tech)

    return {
        "sentiment": sentiment,
        "sentiment_score": sentiment_score,
        "category": category,
        "entities_extracted": extracted_tech,
        "auto_draft_reply": auto_reply
    }

def generate_auto_draft(category: str, sentiment: str, tech: list):
    """Generate a highly professional tailored automated draft from Dileep Sai's assistant"""
    tech_str = f" involving {', '.join(tech)}" if tech else ""
    
    if category == "Career":
        return (
            "Hello,\n\n"
            "Thank you for reaching out regarding a career opportunity at your company! Dileep's virtual assistant here. "
            "Your inquiry has been classified under 'Career Opportunities'. We have processed your request, and Dileep "
            "will review your post and job description shortly. Since you mentioned technologies like "
            f"{', '.join(tech) if tech else 'modern AI/Full-Stack architectures'}, we think Dileep's background in GenAI, FastAPI, "
            "and React would align perfectly. Expect a reply in your inbox soon!\n\n"
            "Best Regards,\n"
            "DeepAI (Dileep's Virtual Assistant)"
        )
    elif category == "Project":
        return (
            "Hello,\n\n"
            "Thank you for contacting Dileep regarding your project proposal! Dileep's virtual assistant here. "
            f"Your project inquiry{tech_str} has been logged in our pipeline. Dileep specializes in high-fidelity full-stack "
            "implementations and agentic AI systems. We will review the project requirements and get back to you with "
            "potential timelines and architectures.\n\n"
            "Best Regards,\n"
            "DeepAI (Dileep's Virtual Assistant)"
        )
    elif category == "Partnership":
        return (
            "Hello,\n\n"
            "Thank you for your collaboration proposal! Dileep's virtual assistant here. Dileep is always enthusiastic "
            "about pioneering innovative AI applications and strategic initiatives. Your proposal has been forwarded directly "
            "to Dileep for a thorough review.\n\n"
            "Best Regards,\n"
            "DeepAI (Dileep's Virtual Assistant)"
        )
    elif category == "Spam":
        return (
            "Hello,\n\n"
            "Your message has been marked as a promotional/unsolicited inquiry. If this was done in error, please excuse "
            "the system classification. Dileep will review this filter manually if needed.\n\n"
            "Regards,\n"
            "DeepAI (Spam Filter Daemon)"
        )
    else:
        # General Inquiry
        sentiment_note = ""
        if sentiment == "Positive":
            sentiment_note = "We appreciate the positive feedback and warm words! "
        
        return (
            "Hello,\n\n"
            "Thank you for your message! Dileep's virtual assistant here. "
            f"{sentiment_note}Dileep has received your message and will review your inquiry shortly. "
            "We will get back to you as soon as possible.\n\n"
            "Best Regards,\n"
            "DeepAI (Dileep's Virtual Assistant)"
        )

# Quick self-test block
if __name__ == "__main__":
    test_msg = "Hello Dileep, we would love to hire you as a Python and FastAPI developer for a freelance project."
    print("Testing Local AI Pipeline:")
    import json
    print(json.dumps(analyze_text(test_msg), indent=2))

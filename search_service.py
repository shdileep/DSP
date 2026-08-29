import os
import json
import re
import urllib.parse
import requests

def load_dotenv():
    """Load variables from .env with utf-8-sig support"""
    env_paths = [".env", os.path.join(os.path.dirname(__file__), ".env")]
    for path in env_paths:
        if os.path.exists(path):
            try:
                with open(path, "r", encoding="utf-8-sig") as f:
                    for line in f:
                        line = line.strip()
                        if line and not line.startswith("#") and "=" in line:
                            k, v = line.split("=", 1)
                            os.environ[k.strip()] = v.strip().strip('"').strip("'")
                break
            except Exception:
                pass

load_dotenv()

def clean_json_text(text: str) -> str:
    """Extract valid JSON from LLM output if wrapped in markdown code blocks."""
    text = text.strip()
    if text.startswith("```"):
        lines = text.splitlines()
        if lines[0].startswith("```"):
            lines = lines[1:]
        if lines and lines[-1].startswith("```"):
            lines = lines[:-1]
        text = "\n".join(lines).strip()
    return text

def call_llm_json(prompt: str, system_prompt: str) -> dict:
    """Execute search query synthesis via high-speed API with multi-model fallback."""
    load_dotenv()
    groq_key = os.environ.get("GROQ_API_KEY", "").strip()
    openai_key = os.environ.get("OPENAI_API_KEY", "").strip()

    # 1. Primary Engine (Ultra-low latency)
    if groq_key:
        groq_models = [
            "openai/gpt-oss-20b",
            "qwen/qwen3.6-27b",
            "groq/compound",
            "openai/gpt-oss-120b",
            "qwen/qwen3.8-27b"
        ]
        headers = {
            "Authorization": f"Bearer {groq_key}",
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        }
        for model in groq_models:
            try:
                payload = {
                    "model": model,
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": prompt}
                    ],
                    "temperature": 0.3,
                    "max_tokens": 2000
                }
                resp = requests.post(
                    "https://api.groq.com/openai/v1/chat/completions",
                    headers=headers,
                    json=payload,
                    timeout=8
                )
                if resp.status_code == 200:
                    res_body = resp.json()
                    content = res_body["choices"][0]["message"]["content"]
                    cleaned = clean_json_text(content)
                    return json.loads(cleaned)
            except Exception:
                continue

    # 2. Secondary Engine Fallback
    if openai_key:
        headers = {
            "Authorization": f"Bearer {openai_key}",
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        }
        openai_models = ["gpt-4o-mini", "gpt-4o"]
        for model in openai_models:
            try:
                payload = {
                    "model": model,
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": prompt}
                    ],
                    "response_format": {"type": "json_object"},
                    "temperature": 0.3,
                    "max_tokens": 2000
                }
                resp = requests.post(
                    "https://api.openai.com/v1/chat/completions",
                    headers=headers,
                    json=payload,
                    timeout=10
                )
                if resp.status_code == 200:
                    res_body = resp.json()
                    content = res_body["choices"][0]["message"]["content"]
                    cleaned = clean_json_text(content)
                    return json.loads(cleaned)
            except Exception:
                continue

    return None

def search_web_ai(query: str) -> dict:
    """Simulate authentic Google Search results with AI Overview and Knowledge Panel."""
    cleaned_query = query.strip()
    if not cleaned_query:
        return {
            "query": "",
            "ai_overview": "Please enter a search term in the search bar.",
            "knowledge_panel": None,
            "results": [],
            "people_also_ask": [],
            "related_searches": []
        }

    system_prompt = (
        "You are the Google Search Engine core backend. "
        "The user entered a search query. Generate a realistic, accurate, and comprehensive Google search results page in valid JSON.\n"
        "Return ONLY a JSON object matching this schema without any conversational prose:\n"
        "{\n"
        "  \"query\": \"the search query\",\n"
        "  \"stats\": \"About 1,420,000,000 results (0.28 seconds)\",\n"
        "  \"ai_overview\": \"A detailed, highly informative, authoritative 2-4 sentence Google AI Overview directly explaining the topic with key bullet takeaways.\",\n"
        "  \"ai_key_points\": [\"Key factual takeaway 1\", \"Key factual takeaway 2\", \"Key factual takeaway 3\"],\n"
        "  \"knowledge_panel\": {\n"
        "    \"title\": \"Entity Name (e.g. Python, Quantum Computing, Tokyo, Elon Musk) or null if generic query\",\n"
        "    \"subtitle\": \"Category / Type / Role\",\n"
        "    \"description\": \"Detailed encyclopedic overview paragraph.\",\n"
        "    \"attributes\": {\"Founded/Born\": \"...\", \"Headquarters/Field\": \"...\", \"Key People/Creator\": \"...\"}\n"
        "  },\n"
        "  \"results\": [\n"
        "    {\n"
        "      \"title\": \"Realistic webpage title (e.g. Official Documentation, Wikipedia, TechCrunch, GitHub)\",\n"
        "      \"url\": \"https://example.com/realistic-slug\",\n"
        "      \"display_url\": \"example.com > category > page\",\n"
        "      \"site_name\": \"Site Name\",\n"
        "      \"snippet\": \"2-3 sentence accurate, rich summary with relevant technical or factual details.\",\n"
        "      \"sitelinks\": [\"Documentation\", \"Getting Started\", \"Community\", \"Downloads\"]\n"
        "    }\n"
        "  ],\n"
        "  \"people_also_ask\": [\n"
        "    {\"question\": \"Frequently asked question 1?\", \"snippet\": \"Accurate concise answer.\"},\n"
        "    {\"question\": \"Frequently asked question 2?\", \"snippet\": \"Accurate concise answer.\"},\n"
        "    {\"question\": \"Frequently asked question 3?\", \"snippet\": \"Accurate concise answer.\"}\n"
        "  ],\n"
        "  \"images\": [\n"
        "    {\"title\": \"Relevant preview 1\", \"source\": \"Wikipedia\"},\n"
        "    {\"title\": \"Relevant preview 2\", \"source\": \"Official Site\"},\n"
        "    {\"title\": \"Relevant preview 3\", \"source\": \"Tech News\"}\n"
        "  ],\n"
        "  \"related_searches\": [\"query tutorial\", \"query architecture\", \"query examples\", \"query vs alternative\", \"query latest news\", \"query documentation\"]\n"
        "}\n"
        "Provide 6-8 distinct, authentic results representing the best real internet sources for this query."
    )

    user_prompt = f"Search query: \"{cleaned_query}\""

    llm_result = call_llm_json(user_prompt, system_prompt)
    if llm_result and isinstance(llm_result, dict) and "ai_overview" in llm_result:
        return llm_result

    # Offline / Instant Fallback Generator
    q_title = cleaned_query.title()
    q_slug = urllib.parse.quote(cleaned_query.lower().replace(" ", "_"))
    q_param = urllib.parse.quote_plus(cleaned_query)

    return {
        "query": cleaned_query,
        "stats": "About 892,000,000 results (0.21 seconds)",
        "ai_overview": f"{q_title} is a widely researched and adopted subject across modern technology, science, and computing. Current advancements emphasize enhanced scalability, robust architectural integration, and automated workflows across distributed ecosystems.",
        "ai_key_points": [
            f"Provides core mechanisms and standard frameworks for {cleaned_query}.",
            f"Extensively documented with active global community development and enterprise adoption.",
            f"Enables optimized performance, modularity, and seamless cross-platform interoperability."
        ],
        "knowledge_panel": {
            "title": q_title,
            "subtitle": "Technology & Knowledge Entity",
            "description": f"Comprehensive information, reference standards, and technical ecosystem surrounding {cleaned_query}.",
            "attributes": {
                "Category": "Software & Technology",
                "Status": "Active & Widely Adopted",
                "Licensing / Access": "Open Standards & Web Ecosystem"
            }
        },
        "results": [
            {
                "title": f"{q_title} - Official Documentation & Developer Guides",
                "url": f"https://developer.mozilla.org/en-US/search?q={q_param}",
                "display_url": f"developer.mozilla.org > docs > {q_slug}",
                "site_name": "MDN Web Docs",
                "snippet": f"Explore comprehensive developer guides, API specifications, best practices, and code examples for {cleaned_query}.",
                "sitelinks": ["Documentation", "Reference API", "Tutorials", "Changelog"]
            },
            {
                "title": f"{q_title} - Wikipedia, the free encyclopedia",
                "url": f"https://en.wikipedia.org/wiki/{q_slug}",
                "display_url": f"en.wikipedia.org > wiki > {q_slug}",
                "site_name": "Wikipedia",
                "snippet": f"History, theoretical concepts, architectural foundations, and modern practical applications of {cleaned_query}.",
                "sitelinks": ["Overview", "History", "Applications", "See also"]
            },
            {
                "title": f"Trending Open Source Projects for {q_title}",
                "url": f"https://github.com/topics/{q_slug}",
                "display_url": f"github.com > topics > {q_slug}",
                "site_name": "GitHub",
                "snippet": f"Discover trending repositories, packages, tools, and algorithms built by developers worldwide for {cleaned_query}.",
                "sitelinks": ["Popular Repos", "Star History", "Discussions", "Releases"]
            },
            {
                "title": f"Latest Analysis and Insights on {q_title}",
                "url": f"https://news.ycombinator.com/item?id={q_param}",
                "display_url": f"news.ycombinator.com > item > {q_slug}",
                "site_name": "Hacker News",
                "snippet": f"Engineering discussions, benchmark comparisons, and deep technical commentary exploring real-world implementations.",
                "sitelinks": ["Top Comments", "Thread Discussion", "Related Submissions"]
            },
            {
                "title": f"{q_title} Community Questions & Technical Solutions",
                "url": f"https://stackoverflow.com/questions/tagged/{q_slug}",
                "display_url": f"stackoverflow.com > questions > tagged > {q_slug}",
                "site_name": "Stack Overflow",
                "snippet": f"Find verified solutions, debugging strategies, and architectural patterns shared by expert software engineers.",
                "sitelinks": ["Top Questions", "Active Issues", "Tag Info"]
            }
        ],
        "people_also_ask": [
            {
                "question": f"What is {cleaned_query} and how does it work?",
                "snippet": f"{q_title} operates by defining structured paradigms, data representations, or computational workflows designed to solve specific operational challenges efficiently."
            },
            {
                "question": f"What are the main advantages of {cleaned_query}?",
                "snippet": f"Primary benefits include increased developer productivity, standardized tooling, modular extensibility, and high performance."
            },
            {
                "question": f"How to get started with {cleaned_query} in 2026?",
                "snippet": f"Begin by reviewing the official documentation, experimenting with introductory tutorials, and examining open-source reference implementations."
            }
        ],
        "images": [
            {"title": f"{q_title} Architecture Diagram", "source": "Wikipedia"},
            {"title": f"{q_title} Workflow & Data Flow", "source": "MDN Docs"},
            {"title": f"{q_title} Ecosystem Map", "source": "GitHub"}
        ],
        "related_searches": [
            f"{cleaned_query} tutorial 2026",
            f"{cleaned_query} architecture overview",
            f"{cleaned_query} open source examples",
            f"{cleaned_query} best practices and design",
            f"{cleaned_query} documentation and cheat sheet",
            f"{cleaned_query} performance benchmark"
        ]
    }

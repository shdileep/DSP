import { ResumeData } from './types';
import profileImg from './assets/images/Dileep_VIT _convocation.png';

export const resumeData: ResumeData = {
  name: "Dileep Sai Galla",
  title: "AI/ML Architect & Full Stack AI Engineer",
  subTitle: "M.Tech in Software Engineering @ VIT Chennai",
  shortSummary: "AI/ML Engineer specializing in production AI systems, agentic workflows, and scalable backend architecture. Engineered and deployed AI products spanning RAG, semantic search, autonomous agents, intelligent automation, and developer tooling, with end-to-end ownership from system architecture to production deployment and optimization.",
  email: "dileepgalla200056@gmail.com",
  phone: "",
  linkedin: "https://www.linkedin.com/in/galla-dileep-sai-b85829390/",
  github: "https://github.com/shdileep",
  portfolio: "https://dileepsai-galla.dev",
  education: [
    {
      institution: "Vellore Institute of Technology",
      degree: "Integrated M.Tech — Software Engineering",
      duration: "Aug 2021 – May 2026",
      location: "Chennai, India"
    },
    {
      institution: "Vignan Jr College",
      degree: "Class 12th (AP Board)",
      duration: "Jun 2019 – Mar 2021",
      location: "Guntur, India"
    },
    {
      institution: "Zilla Parishad High School",
      degree: "Class 10th",
      duration: "Jun 2019 – Mar 2021",
      location: "Guntur, India"
    }
  ],
  skills: [
    {
      category: "AI / ML & GenAI",
      items: ["Python", "TensorFlow", "PyTorch", "NLP Pipelines", "RAG Systems", "Hugging Face Transformers", "LLM Orchestration", "Scikit-Learn"]
    },
    {
      category: "Full Stack Development",
      items: ["React", "Angular", "Node.js", "Express", "FastAPI", "HTML5/CSS3", "JavaScript (ES6+)", "TypeScript"]
    },
    {
      category: "AI Architecture & DBs",
      items: ["Agentic AI", "Prompt Engineering", "Vector Databases", "LangChain", "Multi-Agent Workflows", "MySQL", "PostgreSQL", "Relational Schema Design"]
    },
    {
      category: "DevOps & Tools",
      items: ["Docker", "Vercel", "Firebase", "Git / GitHub / GitLab", "CI/CD Pipelines", "Playwright", "Applitool Eyes", "Postman", "Linux/Bash Scripting"]
    }
  ],
  experience: [
    {
      company: "Renocred",
      role: "Web Developer Intern",
      location: "Remote",
      duration: "Jul 2026 – Present",
      bullets: [
        "Engineering responsive web interfaces, modern component architectures, and dynamic state management.",
        "Integrating full-stack REST/GraphQL API endpoints and scalable backend microservices.",
        "Optimizing web performance, client rendering latency, and cross-platform responsive compatibility.",
        "Collaborating on automated testing pipelines and reliable production release workflows."
      ]
    },
    {
      company: "Easehawk Technologies Pvt. Ltd.",
      role: "AI/ML Architect & Full Stack Engineer Intern",
      location: "Remote",
      duration: "May 2026 – Jul 2026",
      bullets: [
        "Orchestrated multi-agent workspace pipelines using FastAPI and Celery, accelerating request throughput by 42%.",
        "Pioneered high-recall RAG pipelines with hybrid semantic-keyword search, reducing token overhead by 30%.",
        "Engineered modular React 18 / Vite frontend components with Zustand state, reducing render cycles to under 80ms.",
        "Optimized API gateways with rate-limiters and rotating JWT schemes, slashing security authentication lag by 15%.",
        "Streamlined Dockerized CI/CD build scripts across AWS ECS clusters, reducing deployment build time by 25%."
      ]
    },
    {
      company: "Externsclub Pvt. Ltd.",
      role: "AI/ML Intern",
      location: "Bengaluru, Karnataka",
      duration: "Sep 2023 – Nov 2023",
      bullets: [
        "Pioneered 'ResumeAI' using a fine-tuned T5 transformer and vector RAG, cutting response hallucinations by 25%.",
        "Trained Random Forest classifiers with custom TF-IDF extractions, hitting a 91.4% target accuracy benchmark.",
        "Deployed 15+ Dockerized microservices on AWS ECS, ensuring 99.9% uptime during 2x traffic load surges.",
        "Refactored text preprocessing pipelines, reducing downstream scraping dataset ingestion failures by 30%.",
        "Optimized server memory using diagnostic pools, reducing runtime execution bottlenecks and footprints by 18%."
      ]
    },
    {
      company: "Engineer Core",
      role: "Web Development Intern",
      location: "Remote",
      duration: "May 2023 – Jul 2023",
      bullets: [
        "Architected the 'NextTrip' booking solver in Express.js, hosting 100+ parallel users with zero seat collisions.",
        "Secured transactions using PostgreSQL row-level locks, reducing database contention under heavy queues by 35%.",
        "Optimized database schemas and index views, accelerating API endpoint response times and latency by 25%.",
        "Enforced strict TypeScript typing and JSON schema validators, reducing invalid client payload inputs by 95%.",
        "Automated end-to-end integration tests using Playwright, cutting production regression bugs by 20%."
      ]
    }
  ],
  projects: [
    {
      title: "NextTrip",
      subtitle: "Full-Stack AI Bus Ticket Booking Engine",
      duration: "May 2023 – Jul 2023",
      bullets: [
        "Architected a bus reservation platform with Express.js and PostgreSQL, serving 100+ concurrent checkouts.",
        "Engineered a dynamic pricing engine using demand-velocity heuristics, boosting ticket yield margins by 15%.",
        "Integrated optimistic UI states and Zustand store management, reducing client perceived checkout lag by 40%."
      ],
      stack: ["Express.js", "Node.js", "React", "PostgreSQL", "Tailwind CSS", "Dynamic Pricing AI", "JWT"],
      problem: "Traditional bus systems suffer from rigid schedules, empty seats, and slow checkouts under peak concurrency.",
      aiFeatures: ["AI-driven demand calculation for custom fare thresholds", "Multi-agent search optimization for seat allocations", "Optimistic scheduling under high transactional concurrent loads"],
      architecture: "User Query -> Search Engine -> Fare Optimization AI -> Seat Allocator Server -> PG Database (Triggers) -> Ticket Ledger Generation"
    },
    {
      title: "Ujjwal-Hub",
      subtitle: "Intelligent Waste Collection & Route Optimization",
      duration: "Dec 2024 – Present",
      bullets: [
        "Orchestrated bin Fill-Level telemetry and driver GPS tracking in React and Mapbox, with sub-200ms update lag.",
        "Resolved multi-stop vehicle routing constraints using K-Means and A* search, reducing fuel consumption by 35%.",
        "Deployed automatic real-time route recomputations under 2 seconds, cutting driver route delay times by 40%."
      ],
      stack: ["Node.js", "Express", "React", "Mapbox GL", "PostgreSQL", "K-Means", "Dijkstra"],
      problem: "Static waste routing leads to premature collections and overflowing bins, raising fuel costs and carbon footprints.",
      aiFeatures: ["Heuristic Route Optimization with A* & Dijkstra", "K-Means clustering of fill-levels", "Sub-2s automatic live re-routing"],
      architecture: "Bin Sensors -> IoT Telemetry Server -> KMeans Clusterizer -> A* Route Optimizer -> Fleet Driver Dashboard"
    },
    {
      title: "Shubh AI Studio",
      subtitle: "Autonomous Prompt-to-Website, Code-to-Image & Notes Studio",
      duration: "Jun 2026 – Present",
      bullets: [
        "Engineered an Antigravity-style Prompt-to-Website builder generating full-stack responsive web applications with real-time browser preview in under 4 seconds.",
        "Built a neural Code-to-AI Image Generator translating code components, system architectures, and UI logic into high-fidelity design mockups.",
        "Architected an automated AI Notes & Technical Doc Maker producing structured markdown summaries, syntax breakdowns, and study cheat-sheets.",
        "Deployed an autonomous multi-agent swarm (LangGraph/AutoGen) with isolated Judge0 sandbox containerization for secure multi-runtime compiling."
      ],
      stack: ["React", "TypeScript", "FastAPI", "Docker", "Claude 3.5", "LangGraph", "SDXL / Imagen", "Judge0", "Tailwind CSS"],
      problem: "Developers spend excessive hours manually drafting boilerplate web templates, producing visual architecture diagrams, and writing tedious technical notes.",
      aiFeatures: [
        "Prompt-to-Website & Web App generation with instant live browser rendering",
        "Code-to-AI Image generator translating component trees into visual UI mockups",
        "AI Notes, Technical Documentation & study flashcard maker",
        "Self-healing Multi-Agent swarm (LangGraph/AutoGen) with Judge0 sandbox container"
      ],
      architecture: "Natural Prompt / Code Ingest -> Multi-Agent Swarm (LangGraph) -> Web Synthesizer / Image Generator / Notes Engine -> Judge0 Sandbox -> Live Browser Viewport"
    },
    {
      title: "HireZeno 2.O",
      subtitle: "AI Recruitment & Resume Intelligence Platform",
      duration: "Jul 2024 – Present",
      bullets: [
        "Architected an end-to-end Streamlit platform for resume parsing (PDF/DOCX/OCR), extracting contact info, skills, and experience.",
        "Engineered real-time ATS optimization scoring, missing-keyword detection, and section validation heuristics.",
        "Built semantic matching between candidate resumes and job descriptions with multi-role ranking algorithms.",
        "Deployed multi-algorithm ML & deep learning layers predicting hiring probability with exportable PDF evaluation reports."
      ],
      stack: ["Python", "Streamlit", "PyTorch", "Transformers", "NLP / OCR", "Scikit-Learn", "FastAPI", "PDF Engine"],
      problem: "Traditional hiring suffers from slow manual resume screening, keyword mismatch, and inconsistent candidate qualification assessment.",
      aiFeatures: [
        "Resume OCR parsing and structured Named Entity Recognition",
        "Semantic JD-Resume vector matching and candidate ranking",
        "Deep Learning hiring probability and resume intelligence score",
        "Automated ATS optimization, keyword gap alerts, and exportable PDF reports"
      ],
      architecture: "Resume Ingest (PDF/DOCX) -> OCR Fallback -> NLP Schema Extractor -> Transformer Matcher -> ML Ensemble Classifier -> Recruiter Analytics Dashboard"
    }
  ],
  achievements: [
    {
      title: "Patent Filed: Waste Operations Optimizer",
      description: "Invented 'System and Method for Optimizing Garbage Collection Operations' [Application Number: 202641010900], transforming route computation under strict operational constraints."
    },
    {
      title: "HackerEarth & Hackathons Enthusiast",
      description: "Solved complex algorithmic problems on HackerEarth, participating in state hackathons to solve structural and real-world bottlenecks."
    }
  ],
  certifications: [
    { name: "Frontend Developer (React)", issuer: "HackerRank" },
    { name: "Advanced SQL Certificate", issuer: "HackerRank" },
    { name: "GenAI Powered Data Analytics", issuer: "IBM / Coursera" },
    { name: "Software Engineer Intern Standard", issuer: "HackerRank" },
    { name: "Agile Scrum in Practice", issuer: "Infosys Springboard" },
    { name: "Legacy Responsive Web Design V8", issuer: "freeCodeCamp" }
  ],
  blogs: []
};
export const imageAssetPath = profileImg;

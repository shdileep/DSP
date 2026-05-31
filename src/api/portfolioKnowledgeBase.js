export const portfolioKnowledgeBase = {
  personalInfo: {
    name: "Dileep Sai Galla",
    title: "AI/ML Architect & Full Stack AI Engineer",
    summary: "Recent Integrated M.Tech graduate in Software Engineering specializing in AI systems, data engineering, and scalable analytics workflows. Skilled in Python, SQL, ETL pipelines, and API optimization, with experience in LLM evaluation, edge-case analysis, and validating reliable AI-driven products.",
    careerGoals: "Aimed at leading AI/ML architecture designs, deploying enterprise-grade RAG and multi-agent workspaces, and building low-latency, scalable full-stack applications in collaborative environments."
  },
  contact: {
    email: "dileepgalla200056@gmail.com",
    phone: "",
    linkedin: "https://www.linkedin.com/in/galla-dileep-sai-b85829390/",
    github: "https://github.com/shdileep",
    portfolio: "https://dileepsai-galla.dev"
  },
  education: [
    {
      institution: "Vellore Institute of Technology",
      degree: "Integrated M.Tech in Software Engineering",
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
      company: "Easehawk Technologies Pvt. Ltd.",
      role: "AI/ML Architect & Full Stack Engineer Intern",
      location: "Rohini, Delhi",
      duration: "May 2026 – Present",
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
      problem: "Traditional bus systems suffer from rigid schedules, empty seats, and slow checkouts under peak concurrency."
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
      problem: "Static waste routing leads to premature collections and overflowing bins, raising fuel costs and carbon footprints."
    },
    {
      title: "FitMitra",
      subtitle: "ML-Based Android Fitness Application",
      duration: "Jul 2024 – Sep 2025",
      bullets: [
        "Built an Android body metric classifier with TensorFlow Lite and Kotlin, hitting an 82% target planning accuracy.",
        "Secured mobile endpoints using OAuth2 and rotating dual-token JWT pipelines, preventing 99% of unauthorized accesses.",
        "Engineered PyTorch-based BMR and calorie estimation heuristics, generating customized macro splits in under 150ms."
      ],
      stack: ["Android SDK", "Kotlin", "Flask", "PyTorch", "TensorFlow Lite", "K-Means", "MySQL", "JWT"],
      problem: "Generic fitness applications lack personalized biometric planning, causing high user churn and drop-out rates."
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
  ]
};

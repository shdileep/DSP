export const responseHandler = {
  formatProject: (project) => {
    return [
      `🚀 **${project.title}** — *${project.subtitle}*`,
      `- Problem: ${project.problem}`,
      `- Highlights:`,
      ...project.bullets.map(b => `  • ${b}`),
      `- Stack: ${project.stack.join(', ')}`
    ].join('\n');
  },
  
  formatProjectDetails: (project) => {
    return [
      `🚀 **${project.title}** (${project.duration})`,
      `- Problem: ${project.problem}`,
      `- Key Accomplishments:`,
      ...project.bullets.map(b => `  • ${b}`),
      `- Tech Stack: ${project.stack.join(', ')}`
    ].join('\n');
  },
  
  formatExperience: (exp) => {
    return [
      `💼 **${exp.company}** — *${exp.role}*`,
      `- Period & Location: ${exp.duration} (${exp.location})`,
      `- Key Contributions:`,
      ...exp.bullets.map(b => `  • ${b}`)
    ].join('\n');
  },

  formatEducation: (edu) => {
    return [
      `🎓 **${edu.degree}**`,
      `- Institution: ${edu.institution}`,
      `- Duration: ${edu.duration} (${edu.location})`,
      `- Status: Graduated with distinction`
    ].join('\n');
  },

  formatSkills: (_skills) => {
    return [
      `🛠️ **Dileep's Technical Stack:**`,
      `- AI / ML & GenAI: Python, PyTorch, TensorFlow, Transformers, RAG Systems, Agentic AI (LangGraph/AutoGen), LLM Orchestration, Scikit-Learn`,
      `- Full Stack: React, Node.js, Express, FastAPI, TypeScript, JavaScript (ES6+), HTML5/CSS3, Tailwind CSS`,
      `- Architecture & Databases: PostgreSQL (row-level locks, indexing), MySQL, Vector Databases, Relational Schema Design`,
      `- DevOps: Docker, AWS ECS, CI/CD pipelines, Git/GitHub/GitLab, Playwright, Linux/Bash`
    ].join('\n');
  },

  formatAchievements: (_achievements) => {
    return [
      `🏆 **Patents & Key Achievements:**`,
      `- Utility Patent: 'System and Method for Optimizing Garbage Collection Operations' [App No: 202641010900]`,
      `- Innovation: Real-time Dijkstra/K-Means telemetry routing heuristics for urban fleet efficiency`,
      `- Hackathons: Active participant in state and national algorithmic challenges`
    ].join('\n');
  },

  formatCertifications: (_certs) => {
    return [
      `📜 **Verified Certifications & Credentials:**`,
      `- Frontend Developer (React) — HackerRank`,
      `- Advanced SQL Specialist — HackerRank`,
      `- GenAI Powered Data Analytics — IBM / Coursera`,
      `- Agile Scrum in Practice — Infosys Springboard`,
      `- Software Engineer Intern Standard — HackerRank`,
      `- Legacy Responsive Web Design V8 — freeCodeCamp`
    ].join('\n');
  },

  formatContact: (contact) => {
    return [
      `📫 **Connect with Dileep Sai Galla:**`,
      `- Email: ${contact.email}`,
      `- Location: Hyderabad, Telangana, India`,
      `- GitHub: https://github.com/shdileep`,
      `- LinkedIn: Accessible via interactive profile card`
    ].join('\n');
  },

  formatPersonalSummary: (_info) => {
    return [
      `🎯 **Career Focus & Aspirations:**`,
      `- Target Roles: AI/ML Architect, Full-Stack AI Engineer, Distributed Systems Engineer`,
      `- Core Focus: Enterprise RAG platforms, autonomous multi-agent workspaces & low-latency scalable APIs`
    ].join('\n');
  },

  formatAboutDileep: (_kb) => {
    return [
      `👋 **Dileep Sai Galla** — *AI/ML Architect & Full Stack AI Engineer*`,
      `- Education: Integrated M.Tech in Software Engineering from VIT Chennai (2021 – 2026)`,
      `- Current Role: Web Developer Intern at Renocred (Jul 2026 – Present)`,
      `- Core Stack: PyTorch, FastAPI, React, LangGraph, PostgreSQL & Docker`,
      `- Key Projects: Shubh AI Studio, HireZeno 2.O, NextTrip, Ujjwal-Hub & FitMitra`,
      `- Intellectual Property: Utility Patent filed for Urban Operations Optimizer [App No: 202641010900]`
    ].join('\n');
  },

  formatProjectsList: (_projects) => {
    return "Select a flagship project below or ask for specific architectural details:";
  },

  formatEducationList: (_education) => {
    return [
      `🎓 **Academic Background:**`,
      `1) Vellore Institute of Technology (VIT), Chennai — Integrated M.Tech in Software Engineering (2021 – 2026)`,
      `2) Vignan Jr College, Guntur — Class 12th AP Board (2019 – 2021)`,
      `3) Zilla Parishad High School, Guntur — Class 10th (2019 – 2021)`
    ].join('\n');
  },

  formatExperienceList: (_experience) => {
    return [
      `💼 **Professional Experience & Internships:**`,
      `1) Renocred — Web Developer Intern (Jul 2026 – Present, Remote): Responsive UI components & microservice integrations`,
      `2) Easehawk Technologies — AI/ML Architect & Full Stack Engineer Intern (May 2026 – Jul 2026, Remote): Multi-agent workspace pipelines & high-recall RAG systems`,
      `3) Externsclub — AI/ML Intern (Sep 2023 – Nov 2023, Bengaluru): T5 transformer NLP models & Dockerized AWS ECS microservices`,
      `4) Engineer Core — Web Development Intern (May 2023 – Jul 2023, Remote): NextTrip high-concurrency booking solver with PostgreSQL locks`
    ].join('\n');
  },

  formatLayout: (_title, sections) => {
    return sections.join('\n\n');
  }
};

export const responseHandler = {
  formatProject: (project) => {
    return `${project.title.toUpperCase()} is a ${project.subtitle}.\nIt solves the problem: ${project.problem}`;
  },
  
  formatProjectDetails: (project) => {
    return [
      `PROJECT DETAILS: ${project.title.toUpperCase()} - ${project.subtitle}`,
      `\nKey Accomplishments:`,
      project.bullets.map(b => `  - ${b}`).join('\n'),
      `\nTechnologies Used:`,
      `  ${project.stack.join(', ')}`
    ].join('\n');
  },
  
  formatExperience: (exp) => {
    return `Dileep worked at ${exp.company} as ${exp.role} (${exp.duration}), where he: ${exp.bullets[0]}`;
  },

  formatEducation: (edu) => {
    return `Dileep graduated from ${edu.institution} with a ${edu.degree} (${edu.duration}).`;
  },

  formatSkills: (skills) => {
    return "Dileep specializes in Python, React, FastAPI, Docker, PyTorch, LangChain, PostgreSQL, and Agentic AI workflows.";
  },

  formatAchievements: (achievements) => {
    return "Dileep filed a utility patent for a Waste Operations Optimizer [App No: 202641010900] and is a HackerEarth hackathon enthusiast.";
  },

  formatCertifications: (certs) => {
    return "Dileep holds React & SQL certificates from HackerRank, GenAI Data Analytics from IBM/Coursera, and Scrum Master credentials.";
  },

  formatContact: (contact) => {
    return `Dileep is currently based in Hyderabad, Telangana. Reach him at ${contact.email} or via LinkedIn: ${contact.linkedin}`;
  },

  formatPersonalSummary: (info) => {
    return `Dileep is actively seeking AI/ML Architect and Full-Stack Engineering roles. He specializes in low-latency RAG and multi-agent systems.`;
  },

  formatAboutDileep: (kb) => {
    return [
      `Dileep graduated from Vellore Institute of Technology and is currently working at Easehawk Technologies Pvt. Ltd. as an AI/ML Architect & Full Stack Engineer Intern.`,
      `He specializes in GenAI, LLM orchestration, high-recall RAG pipelines, multi-agent workspaces (FastAPI/Celery), React/Vite development, and database optimizations.`,
      `His engineering portfolio highlights NextTrip, Ujjwal-Hub, FitMitra, and a filed utility patent for a Waste Operations Optimizer [App No: 202641010900].`
    ].join(' ');
  },

  formatProjectsList: (projects) => {
    return "Dileep has built several key engineering projects. Please select one below to view its details:";
  },

  formatEducationList: (education) => {
    return "Dileep holds an Integrated M.Tech in Software Engineering from Vellore Institute of Technology (VIT), Chennai, and completed his intermediate education at Vignan Jr College.";
  },

  formatExperienceList: (experience) => {
    return "Dileep is currently working as an AI/ML Architect & Full Stack Engineer Intern at Easehawk Technologies, and previously held AI/ML and Web Development internships at Externsclub and Engineer Core.";
  },

  formatLayout: (title, sections) => {
    return sections.join('\n\n');
  }
};

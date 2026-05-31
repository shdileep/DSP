const synonymMap = {
  // Projects
  'nexttrip': ['nexttrip', 'trip', 'bus', 'ticket', 'booking', 'moxsend', 'reservation', 'checkout'],
  'ujjwal': ['ujjwal', 'ujjwal-hub', 'waste', 'garbage', 'route', 'dijkstra', 'driver', 'telemetry', 'collection', 'gps', 'route optimization'],
  'fitmitra': ['fitmitra', 'fitness', 'exercise', 'tracker', 'health', 'pose', 'android', 'biometrics', 'bmr', 'calorie', 'pose estimator'],
  
  // Education
  'vit': ['vit', 'vellore', 'm.tech', 'university', 'chennai', 'software engineering', 'degree', 'graduation', 'academic', 'studies'],
  'vignan': ['vignan', 'college', '12th', 'guntur', 'junior college', 'intermediate'],
  'zilla': ['zilla', 'parishad', 'high school', 'school', '10th', 'ssc'],
  
  // Experience / Companies
  'easehawk': ['easehawk', 'delhi', 'celery', 'fastapi', 'multi-agent', 'workspace', 'architect', 'present'],
  'externsclub': ['externsclub', 'bengaluru', 't5', 'resumeai', 'hallucinations', 'random forest', 'transformer'],
  'engineer': ['engineer', 'core', 'nexttrip', 'postgres', 'locks', 'collision', 'playwright'],
  
  // Patents & Research
  'patent': ['patent', 'invented', 'optimizing garbage', 'utility patent', '202641010900', 'garbage collection system'],
  
  // Achievements
  'hackerearth': ['hackerearth', 'hackathon', 'hackathons', 'competition', 'winner', 'algorithms'],
  
  // Skills / Programming / DB
  'python': ['python', 'py', 'scripting'],
  'react': ['react', 'vite', 'frontend', 'ui', 'component', 'components'],
  'fastapi': ['fastapi', 'api', 'gateway', 'backend', 'routing'],
  'postgresql': ['postgresql', 'postgres', 'sql', 'database', 'dbs', 'schema', 'relational', 'query'],
  'docker': ['docker', 'container', 'containers', 'containerization'],
  'agentic': ['agentic', 'agentic ai', 'multi-agent', 'langchain', 'orchestration', 'llm', 'genai', 'rag'],

  // Location & Hiring Status
  'location': ['location', 'based', 'live', 'live in', 'address', 'reside', 'delhi', 'chennai', 'guntur', 'india', 'state', 'relocate', 'relocating'],
  'hire': ['hire', 'recruit', 'work with', 'job', 'opportunity', 'opportunities', 'role', 'position', 'open to work', 'seeking', 'employ'],

  // Detailed Tech Synonym Additions
  'celery': ['celery', 'fastapi', 'multi-agent', 'workspace', 'agentic', 'agentic ai', 'throughput', 'scheduler', 'distributed', 'queue'],
  'mapbox': ['mapbox', 'mapbox gl', 'dijkstra', 'k-means', 'route', 'optimization', 'gps', 'telemetry', 'mapping', 'waste', 'garbage', 'route optimizer', 'routing'],
  'playwright': ['playwright', 'applitool', 'eyes', 'postman', 'integration', 'e2e', 'testing', 'tests', 'scrapers', 'regression'],
  'locks': ['locks', 'row-level', 'collision', 'postgres', 'postgresql', 'contention', 'transactions', 'database locks'],
  'scrum': ['scrum', 'agile', 'scrum master', 'infosys', 'infosys springboard', 'practice'],
  'hackerrank': ['hackerrank', 'react certificate', 'sql certificate', 'software engineer intern standard', 'credentials'],
  'fcc': ['freecodecamp', 'fcc', 'responsive web design', 'html5', 'css3', 'web design']
};

export const keywordManager = {
  extractKeywords: (text) => {
    const words = text.toLowerCase().split(/[^a-zA-Z0-9_-]+/);
    const extracted = new Set();

    words.forEach(word => {
      if (word.length < 3) return;
      extracted.add(word);
      
      for (const [canonical, aliases] of Object.entries(synonymMap)) {
        if (aliases.includes(word)) {
          extracted.add(canonical);
        }
      }
    });

    return Array.from(extracted);
  },
  getSynonyms: (keyword) => {
    return synonymMap[keyword.toLowerCase()] || [keyword];
  }
};

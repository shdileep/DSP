export const intentDetector = {
  detect: (text) => {
    const q = text.toLowerCase().trim();
    
    // Core intents with expanded keyword dictionaries
    const intents = [
      {
        name: 'greetings',
        keywords: ['hello', 'hi', 'hey', 'greetings', 'welcome', 'morning', 'afternoon', 'evening', 'yo'],
        score: 0
      },
      {
        name: 'thank_you',
        keywords: ['thank', 'thanks', 'awesome', 'cool', 'great', 'nice', 'appreciate', 'helpful', 'perfect'],
        score: 0
      },
      {
        name: 'about_dileep',
        keywords: ['dileep', 'sai', 'galla', 'who is', 'tell me about', 'background', 'profile', 'summary', 'introduce', 'introduction', 'who are you', 'cv', 'resume', 'about him', 'who is he'],
        score: 0
      },
      {
        name: 'skills',
        keywords: ['skill', 'stack', 'languages', 'competencies', 'technologies', 'framework', 'python', 'javascript', 'typescript', 'react', 'pytorch', 'tensorflow', 'fastapi', 'celery', 'docker', 'database', 'sql', 'postgres', 'mysql', 'agentic', 'prompt', 'langchain', 'hugging face', 'ml', 'ai', 'container', 'programming', 'tools'],
        score: 0
      },
      {
        name: 'projects',
        keywords: ['project', 'projects', 'nexttrip', 'ujjwal', 'fitmitra', 'booking', 'waste', 'routing', 'app', 'system', 'build', 'develop', 'create', 'portfolio', 'done', 'built', 'made'],
        score: 0
      },
      {
        name: 'education',
        keywords: ['education', 'degree', 'university', 'college', 'vit', 'vellore', 'vignan', 'school', 'm.tech', 'academic', 'study', 'studied', 'graduated', 'graduation', 'guntur'],
        score: 0
      },
      {
        name: 'experience',
        keywords: ['experience', 'job', 'work', 'intern', 'employment', 'easehawk', 'externsclub', 'internship', 'career', 'worked', 'company', 'role', 'history', 'working'],
        score: 0
      },
      {
        name: 'certifications',
        keywords: ['certification', 'certifications', 'certificate', 'certified', 'hackerrank', 'coursera', 'ibm', 'scrum', 'freecodecamp', 'credentials'],
        score: 0
      },
      {
        name: 'contact',
        keywords: ['contact', 'email', 'phone', 'linkedin', 'github', 'portfolio', 'hire', 'reach', 'social', 'address', 'mail', 'get in touch', 'write to', 'location', 'based', 'live'],
        score: 0
      },
      {
        name: 'achievements',
        keywords: ['achievement', 'achievements', 'award', 'patent', 'patents', 'hackathon', 'hackerearth', 'winner', 'competition', 'invented', 'publications', 'research'],
        score: 0
      },
      {
        name: 'career_goals',
        keywords: ['career goals', 'objectives', 'aspiration', 'aim', 'future', 'looking to', 'seeking', 'ambition', 'goals', 'hire', 'recruit', 'opportunities', 'role', 'position', 'open to work'],
        score: 0
      }
    ];

    let bestIntent = 'general';
    let maxScore = 0;

    // Apply keyword and regex scoring
    intents.forEach(intent => {
      let matches = 0;
      
      // 1. Basic keyword match count
      intent.keywords.forEach(kw => {
        if (q.includes(kw)) {
          matches++;
        }
      });
      
      intent.score = matches > 0 ? (matches / Math.sqrt(intent.keywords.length)) : 0;
      
      // 2. Exact word boundary boosts
      intent.keywords.forEach(kw => {
        const regex = new RegExp(`\\b${kw}\\b`, 'i');
        if (regex.test(q)) {
          intent.score += 0.4;
        }
      });

      // 3. Question structure pattern boosts
      if (intent.name === 'about_dileep') {
        if (/who\s+is\s+dileep/i.test(q) || /who\s+is\s+he/i.test(q) || /tell\s+me\s+about\s+(dileep|him)/i.test(q) || /introduce\s+(dileep|him|himself)/i.test(q) || /summary\s+of\s+dileep/i.test(q) || /who\s+are\s+you/i.test(q) || /about\s+dileep/i.test(q)) {
          intent.score += 1.5;
        }
      }
      if (intent.name === 'education') {
        if (/where\s+did\s+he\s+(study|graduated|go)/i.test(q) || /education/i.test(q) || /where\s+did\s+dileep\s+go/i.test(q) || /vit/i.test(q) || /college/i.test(q)) {
          intent.score += 1.2;
        }
      }
      if (intent.name === 'experience') {
        if (/where\s+did\s+he\s+work/i.test(q) || /current\s+role/i.test(q) || /what\s+is\s+he\s+working/i.test(q) || /internship/i.test(q) || /job/i.test(q) || /easehawk|externsclub|celery|locks|playwright/i.test(q)) {
          intent.score += 1.2;
        }
      }
      if (intent.name === 'projects') {
        if (/what\s+projects/i.test(q) || /projects\s+done/i.test(q) || /projects\s+built/i.test(q) || /tell\s+me\s+about\s+(nexttrip|ujjwal|fitmitra)/i.test(q) || /mapbox|dijkstra|route/i.test(q)) {
          intent.score += 1.2;
        }
      }
      if (intent.name === 'achievements') {
        if (/patent/i.test(q) || /achievements/i.test(q) || /publications/i.test(q) || /research/i.test(q)) {
          intent.score += 1.5;
        }
      }
      if (intent.name === 'certifications') {
        if (/certif/i.test(q) || /credentials/i.test(q) || /scrum|agile|hackerrank|freecodecamp/i.test(q)) {
          intent.score += 1.5;
        }
      }
      if (intent.name === 'contact') {
        if (/contact/i.test(q) || /email/i.test(q) || /reach/i.test(q) || /location|based|live|address|relocate/i.test(q)) {
          intent.score += 1.5;
        }
      }
      if (intent.name === 'career_goals') {
        if (/hire/i.test(q) || /job/i.test(q) || /opportunity/i.test(q) || /open\s+to|recruit|seeking/i.test(q) || /career\s+goals|goals/i.test(q)) {
          intent.score += 1.5;
        }
      }

      if (intent.score > maxScore) {
        maxScore = intent.score;
        bestIntent = intent.name;
      }
    });

    // Specific overrides for high-confidence targets
    if (q.includes('nexttrip') || q.includes('ujjwal') || q.includes('fitmitra')) {
      bestIntent = 'projects';
      maxScore = Math.max(maxScore, 1.0);
    }
    
    if (q.includes('patent') || q.includes('202641010900')) {
      bestIntent = 'achievements';
      maxScore = Math.max(maxScore, 1.0);
    }

    // Default general check: if query has dileep/sai/galla but low confidence, route to about_dileep
    if (bestIntent === 'general' && (q.includes('dileep') || q.includes('galla') || q.includes('sai') || q.includes('who are you') || q.includes('about him') || q.includes('introduce'))) {
      bestIntent = 'about_dileep';
      maxScore = 0.8;
    }

    return {
      intent: bestIntent,
      confidence: Math.min(maxScore, 1.0)
    };
  }
};

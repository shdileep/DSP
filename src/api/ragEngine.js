import { portfolioKnowledgeBase } from './portfolioKnowledgeBase.js';

// Construct granular document chunks dynamically from Dileep's resume data
function buildDocumentCorpus() {
  const kb = portfolioKnowledgeBase;
  const docs = [];

  // Personal Info & Summary
  docs.push({
    id: 'bio_summary',
    category: 'about_dileep',
    text: `${kb.personalInfo.name} is an ${kb.personalInfo.title}. Professional summary: ${kb.personalInfo.summary}`,
    tags: ['dileep', 'sai', 'galla', 'profile', 'summary', 'introduce', 'title', 'role', 'about']
  });
  docs.push({
    id: 'bio_goals',
    category: 'career_goals',
    text: `Dileep Sai Galla's career goals and engineering aspirations: ${kb.personalInfo.careerGoals}`,
    tags: ['goals', 'objectives', 'aspiration', 'seeking', 'future', 'career']
  });

  // Contact Info
  docs.push({
    id: 'contact_channels',
    category: 'contact',
    text: `Dileep Galla's contact information and channels. Email: ${kb.contact.email}. LinkedIn: ${kb.contact.linkedin}. GitHub: ${kb.contact.github}. Portfolio: ${kb.contact.portfolio}.`,
    tags: ['email', 'phone', 'contact', 'linkedin', 'github', 'reach', 'hire', 'social']
  });

  // Location
  docs.push({
    id: 'location_info',
    category: 'contact',
    text: `Dileep Galla is based in Hyderabad, Telangana.`,
    tags: ['location', 'based', 'live', 'live in', 'address', 'reside', 'hyderabad', 'telangana', 'guntur', 'india', 'state', 'relocate', 'relocating']
  });

  // Education Chunks
  kb.education.forEach((edu, idx) => {
    const instLower = edu.institution.toLowerCase();
    const specificTags = instLower.split(/[^a-zA-Z0-9]/).filter(t => t.length >= 3);
    if (instLower.includes('vellore') || instLower.includes('technology') || instLower.includes('vit')) {
      specificTags.push('vit');
    }
    if (instLower.includes('vignan')) {
      specificTags.push('vignan');
    }
    if (instLower.includes('zilla') || instLower.includes('parishad')) {
      specificTags.push('zilla', 'parishad', 'high', 'school');
    }
    docs.push({
      id: `education_${idx}`,
      category: 'education',
      text: `Dileep Sai Galla graduated from ${edu.institution} with an ${edu.degree} (${edu.duration}) located in ${edu.location}.`,
      tags: ['education', 'degree', 'university', 'college', 'graduated', 'study', 'studied', ...specificTags]
    });
  });

  // Skills Chunks
  kb.skills.forEach((skill, idx) => {
    docs.push({
      id: `skills_${idx}`,
      category: 'skills',
      text: `Dileep holds expert skills in ${skill.category}: ${skill.items.join(', ')}.`,
      tags: ['skills', 'competencies', 'technologies', 'stack', ...skill.items.map(s => s.toLowerCase())]
    });
  });

  // Experience Chunks
  kb.experience.forEach((exp, idx) => {
    const bulletsStr = exp.bullets.join(' ');
    const companyLower = exp.company.toLowerCase();
    const roleLower = exp.role.toLowerCase();
    const specificTags = [
      ...companyLower.split(/[^a-zA-Z0-9]/).filter(t => t.length >= 3),
      ...roleLower.split(/[^a-zA-Z0-9]/).filter(t => t.length >= 3)
    ];
    if (companyLower.includes('easehawk')) {
      specificTags.push('easehawk', 'celery', 'fastapi', 'present');
    } else if (companyLower.includes('externsclub')) {
      specificTags.push('externsclub', 't5', 'resumeai');
    } else if (companyLower.includes('engineer')) {
      specificTags.push('engineer', 'core', 'nexttrip', 'postgres');
    }
    docs.push({
      id: `experience_${idx}`,
      category: 'experience',
      text: `Dileep Sai Galla worked at ${exp.company} as an ${exp.role} in ${exp.location} from ${exp.duration}. Achievements: ${bulletsStr}`,
      tags: ['experience', 'work', 'intern', 'internship', 'company', 'role', 'worked', ...specificTags]
    });
  });

  // Projects Chunks
  kb.projects.forEach((proj, idx) => {
    const bulletsStr = proj.bullets.join(' ');
    const titleLower = proj.title.toLowerCase();
    const specificTags = [
      titleLower,
      ...titleLower.split(/[^a-zA-Z0-9]/).filter(t => t.length >= 3),
      ...proj.stack.map(s => s.toLowerCase()),
      ...proj.subtitle.toLowerCase().split(/[^a-zA-Z0-9]/).filter(t => t.length >= 3)
    ];
    if (titleLower.includes('nexttrip')) {
      specificTags.push('trip', 'bus', 'ticket', 'booking');
    } else if (titleLower.includes('ujjwal')) {
      specificTags.push('ujjwal', 'hub', 'ujjwal-hub', 'waste', 'garbage', 'route', 'driver');
    } else if (titleLower.includes('fitmitra')) {
      specificTags.push('fitness', 'exercise', 'tracker', 'health', 'pose');
    }
    docs.push({
      id: `projects_${idx}`,
      category: 'projects',
      text: `${proj.title} project: ${proj.subtitle}. Stack used: ${proj.stack.join(', ')}. Accomplishments: ${bulletsStr}. Problem solved: ${proj.problem}`,
      tags: ['projects', 'project', ...specificTags]
    });
  });

  // Achievements
  kb.achievements.forEach((ach, idx) => {
    docs.push({
      id: `achievements_${idx}`,
      category: 'achievements',
      text: `Dileep Sai's achievement: ${ach.title}. Description: ${ach.description}`,
      tags: ['achievements', 'award', 'patent', 'hackathon', 'hackerearth', 'invented']
    });
  });

  // Certifications
  const certsList = kb.certifications.map(c => `${c.name} issued by ${c.issuer}`).join(', ');
  docs.push({
    id: 'certifications_all',
    category: 'certifications',
    text: `Dileep holds professional certifications: ${certsList}.`,
    tags: ['certifications', 'credentials', 'hackerrank', 'coursera', 'ibm', 'scrum', 'freecodecamp']
  });

  return docs;
}

// Local semantic search using TF-IDF indexing and Cosine Similarity
function calculateTfidfCosineSimilarity(query, docs, intent) {
  // Tokenize and clean inputs
  const tokenize = (text) => {
    return text.toLowerCase()
      .replace(/-/g, ' ')
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(token => token.length >= 3); // suppress small filler words
  };

  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];

  // Synonym query expansions mapping
  const synonymMap = {
    'study': ['education', 'college', 'university', 'vit', 'degree', 'graduated', 'studied'],
    'studied': ['education', 'college', 'university', 'vit', 'degree', 'graduated', 'study'],
    'university': ['vit', 'vellore', 'chennai', 'education'],
    'college': ['vit', 'vellore', 'vignan', 'education'],
    'work': ['experience', 'intern', 'internship', 'easehawk', 'externsclub', 'job', 'worked'],
    'worked': ['experience', 'intern', 'internship', 'easehawk', 'externsclub', 'job', 'work'],
    'job': ['experience', 'work', 'intern', 'easehawk', 'externsclub'],
    'patent': ['achievements', 'patent', '202641010900', 'utility'],
    'skills': ['stack', 'languages', 'technologies', 'skills', 'skill'],
    'skill': ['stack', 'languages', 'technologies', 'skills', 'skill'],
    'he': ['dileep', 'sai', 'galla'],
    'him': ['dileep', 'sai', 'galla']
  };

  const expandedQueryTokens = new Set(queryTokens);
  queryTokens.forEach(token => {
    if (synonymMap[token]) {
      synonymMap[token].forEach(syn => expandedQueryTokens.add(syn));
    }
  });
  const finalQueryTokens = Array.from(expandedQueryTokens);

  // Compute DF (Document Frequency)
  const docTokensList = docs.map(d => tokenize(d.text));
  const vocabulary = new Set([...finalQueryTokens, ...docTokensList.flat()]);
  
  const df = {};
  vocabulary.forEach(term => {
    df[term] = 0;
    docTokensList.forEach(tokens => {
      if (tokens.includes(term)) {
        df[term]++;
      }
    });
  });

  // Calculate IDF
  const N = docs.length;
  const idf = {};
  vocabulary.forEach(term => {
    idf[term] = Math.log(1 + (N / (1 + df[term])));
  });

  // Calculate TF-IDF Vector for query and docs
  const getTfidfVector = (tokens) => {
    const tf = {};
    tokens.forEach(t => {
      tf[t] = (tf[t] || 0) + 1;
    });

    const vector = {};
    vocabulary.forEach(term => {
      vector[term] = tf[term] ? tf[term] * idf[term] : 0;
    });
    return vector;
  };

  const queryVector = getTfidfVector(finalQueryTokens);

  // Calculate Cosine Similarity
  const results = docs.map((doc, idx) => {
    const docVector = getTfidfVector(docTokensList[idx]);
    
    let dotProduct = 0;
    let queryNorm = 0;
    let docNorm = 0;

    vocabulary.forEach(term => {
      dotProduct += queryVector[term] * docVector[term];
      queryNorm += queryVector[term] * queryVector[term];
      docNorm += docVector[term] * docVector[term];
    });

    queryNorm = Math.sqrt(queryNorm);
    docNorm = Math.sqrt(docNorm);

    const cosineScore = (queryNorm > 0 && docNorm > 0) ? (dotProduct / (queryNorm * docNorm)) : 0;

    // Apply tag boundary matching boosts
    let tagMatches = 0;
    doc.tags.forEach(tag => {
      if (finalQueryTokens.includes(tag)) {
        tagMatches++;
      }
    });
    
    let finalScore = cosineScore + (tagMatches * 0.08);

    // Apply categorical metadata intent boost
    if (doc.category === intent) {
      finalScore += 0.35;
    }

    return {
      doc,
      score: finalScore
    };
  });

  return results
    .filter(r => r.score > 0.05)
    .sort((a, b) => b.score - a.score);
}

export const ragEngine = {
  retrieveContext: (keywords, intent, query = '') => {
    const kb = portfolioKnowledgeBase;
    
    // 1. Build dynamic document chunks
    const docs = buildDocumentCorpus();
    
    // 2. Perform semantic match if query exists
    let context = [];
    if (query && query.trim()) {
      const tfidfResults = calculateTfidfCosineSimilarity(query, docs, intent);
      
      context = tfidfResults.map(r => {
        let type = r.doc.category;
        if (type === 'general') type = 'career_goals'; // fallback
        
        let data = null;
        if (type === 'projects') {
          type = 'project';
          data = kb.projects.find(p => r.doc.id.includes(p.title.toLowerCase()) || r.doc.text.toLowerCase().includes(p.title.toLowerCase()));
        } else if (type === 'experience') {
          data = kb.experience.find(e => r.doc.text.includes(e.company));
        } else if (type === 'education') {
          data = kb.education.find(edu => r.doc.text.includes(edu.institution));
        } else if (type === 'skills') {
          data = kb.skills;
        } else if (type === 'certifications') {
          data = kb.certifications;
        } else if (type === 'achievements') {
          data = kb.achievements;
        } else if (type === 'contact') {
          data = kb.contact;
        } else if (type === 'career_goals') {
          data = kb.personalInfo;
        } else if (type === 'about_dileep') {
          data = kb;
        }
        
        return {
          type,
          data: data || r.doc.text,
          score: r.score
        };
      });
    }

    // 3. Backward compatible exact keyword/intent match checks if semantic search matches are empty
    if (context.length === 0) {
      keywords.forEach(kw => {
        // Projects
        if (kw === 'nexttrip' || kw === 'ujjwal' || kw === 'fitmitra') {
          const proj = kb.projects.find(p => p.title.toLowerCase().includes(kw));
          if (proj) {
            context.push({ type: 'project', data: proj, score: 1.0 });
          }
        }
        // Work Experience
        if (kw === 'easehawk' || kw === 'externsclub') {
          const exp = kb.experience.find(e => e.company.toLowerCase().includes(kw));
          if (exp) {
            context.push({ type: 'experience', data: exp, score: 1.0 });
          }
        }
      });

      // Intent fallback loading
      if (context.length === 0) {
        if (intent === 'skills') {
          context.push({ type: 'skills', data: kb.skills, score: 0.9 });
        } else if (intent === 'experience') {
          kb.experience.forEach(exp => {
            context.push({ type: 'experience', data: exp, score: 0.8 });
          });
        } else if (intent === 'projects') {
          kb.projects.forEach(proj => {
            context.push({ type: 'project', data: proj, score: 0.8 });
          });
        } else if (intent === 'education') {
          kb.education.forEach(edu => {
            context.push({ type: 'education', data: edu, score: 0.9 });
          });
        } else if (intent === 'certifications') {
          context.push({ type: 'certifications', data: kb.certifications, score: 0.9 });
        } else if (intent === 'achievements') {
          context.push({ type: 'achievements', data: kb.achievements, score: 0.9 });
        } else if (intent === 'contact') {
          context.push({ type: 'contact', data: kb.contact, score: 1.0 });
        } else if (intent === 'career_goals') {
          context.push({ type: 'career_goals', data: kb.personalInfo, score: 1.0 });
        } else if (intent === 'about_dileep') {
          context.push({ type: 'about_dileep', data: kb, score: 1.0 });
        }
      }
    }

    return context.sort((a, b) => b.score - a.score);
  }
};

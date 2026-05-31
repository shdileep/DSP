import { responseHandler } from './responseHandler.js';
import { config } from './config.js';
import { portfolioKnowledgeBase } from './portfolioKnowledgeBase.js';
import { lookupQaDatabase } from './qaDatabase.js';
import { contextManager } from './contextManager.js';

export const llmController = {
  generateResponse: (query, intent, retrievedContext, history, sessionId) => {
    const lowerQuery = query.toLowerCase();
    
    // Stateful "tell me more" project follow-up details check
    const isTellMeMore = lowerQuery.includes('tell me more') || lowerQuery.includes('more details') || lowerQuery.includes('more about it') || (lowerQuery.trim() === 'more') || lowerQuery.includes('show more');
    if (isTellMeMore && sessionId) {
      const contextState = contextManager.getOrCreateContext(sessionId);
      if (contextState && contextState.lastProject) {
        const projTitle = contextState.lastProject;
        const project = portfolioKnowledgeBase.projects.find(p => p.title.toLowerCase().includes(projTitle));
        if (project) {
          return responseHandler.formatProjectDetails(project);
        }
      }
    }

    // Direct QA Registry Lookup for specific queries
    const hasSpecificProj = ['nexttrip', 'ujjwal', 'fitmitra', 'mapbox', 'dijkstra', 'pose', 'tflite', 'kotlin', 'booking', 'bus', 'ticket'].some(p => lowerQuery.includes(p));
    if (intent !== 'projects' || hasSpecificProj) {
      const qaAnswer = lookupQaDatabase(query);
      if (qaAnswer) {
        return qaAnswer;
      }
    }

    // If we have retrieved context blocks
    if (retrievedContext && retrievedContext.length > 0) {
      const primaryContext = retrievedContext[0];

      switch (primaryContext.type) {
        case 'about_dileep':
          return responseHandler.formatAboutDileep(portfolioKnowledgeBase);
        
        case 'project': {
          const projects = [];
          const seenProj = new Set();
          retrievedContext.forEach(c => {
            if (c.type === 'project' && c.data && c.data.title && !seenProj.has(c.data.title)) {
              seenProj.add(c.data.title);
              projects.push(c.data);
            }
          });
          projects.sort((a, b) => {
            const idxA = portfolioKnowledgeBase.projects.findIndex(p => p.title === a.title);
            const idxB = portfolioKnowledgeBase.projects.findIndex(p => p.title === b.title);
            return idxA - idxB;
          });
          const hasSpecificProj = ['nexttrip', 'ujjwal', 'fitmitra'].some(p => lowerQuery.includes(p));
          const isDistinctProj = retrievedContext.length > 1 && retrievedContext[0].type === 'project' && retrievedContext[1].type === 'project' && (retrievedContext[0].score - retrievedContext[1].score > 0.15);
          if (!hasSpecificProj && !isDistinctProj) {
            return {
              text: responseHandler.formatProjectsList(projects),
              options: ["NextTrip", "Ujjwal-Hub", "FitMitra"]
            };
          }
          const matchedProj = projects.find(p => lowerQuery.includes(p.title.toLowerCase())) || primaryContext.data;
          return responseHandler.formatProject(matchedProj);
        }

        case 'experience': {
          const experiences = [];
          const seenExp = new Set();
          retrievedContext.forEach(c => {
            if (c.type === 'experience' && c.data && c.data.company && !seenExp.has(c.data.company)) {
              seenExp.add(c.data.company);
              experiences.push(c.data);
            }
          });
          experiences.sort((a, b) => {
            const idxA = portfolioKnowledgeBase.experience.findIndex(e => e.company === a.company);
            const idxB = portfolioKnowledgeBase.experience.findIndex(e => e.company === b.company);
            return idxA - idxB;
          });
          const hasSpecificExp = ['easehawk', 'externsclub', 'engineer core'].some(e => lowerQuery.includes(e));
          const isDistinctExp = retrievedContext.length > 1 && retrievedContext[0].type === 'experience' && retrievedContext[1].type === 'experience' && (retrievedContext[0].score - retrievedContext[1].score > 0.15);
          if (experiences.length > 1 && !hasSpecificExp && !isDistinctExp) {
            if (lowerQuery.includes('current') || lowerQuery.includes('present') || lowerQuery.includes('now')) {
              const current = experiences.find(e => e.duration.toLowerCase().includes('present'));
              if (current) {
                return responseHandler.formatExperience(current);
              }
            }
            return responseHandler.formatExperienceList(experiences);
          }
          const matchedExp = experiences.find(e => lowerQuery.includes(e.company.toLowerCase())) || primaryContext.data;
          return responseHandler.formatExperience(matchedExp);
        }

        case 'education': {
          const education = [];
          const seenEdu = new Set();
          retrievedContext.forEach(c => {
            if (c.type === 'education' && c.data && c.data.institution && !seenEdu.has(c.data.institution)) {
              seenEdu.add(c.data.institution);
              education.push(c.data);
            }
          });
          education.sort((a, b) => {
            const idxA = portfolioKnowledgeBase.education.findIndex(e => e.institution === a.institution);
            const idxB = portfolioKnowledgeBase.education.findIndex(e => e.institution === b.institution);
            return idxA - idxB;
          });
          const hasSpecificEdu = ['vit', 'vellore', 'vignan', 'zilla', 'school'].some(e => lowerQuery.includes(e));
          const isDistinctEdu = retrievedContext.length > 1 && retrievedContext[0].type === 'education' && retrievedContext[1].type === 'education' && (retrievedContext[0].score - retrievedContext[1].score > 0.15);
          if (education.length > 1 && !hasSpecificEdu && !isDistinctEdu) {
            return responseHandler.formatEducationList(education);
          }
          const matchedEdu = education.find(e => lowerQuery.includes(e.institution.toLowerCase())) || primaryContext.data;
          return responseHandler.formatEducation(matchedEdu);
        }
        case 'skills':
          return responseHandler.formatSkills(primaryContext.data);
        case 'certifications':
          return responseHandler.formatCertifications(primaryContext.data);
        case 'achievements':
          return responseHandler.formatAchievements(primaryContext.data);
        case 'contact':
          return responseHandler.formatContact(primaryContext.data);
        case 'career_goals':
          return responseHandler.formatPersonalSummary(primaryContext.data);
        default:
          break;
      }
    }

    // Default intent routing fallbacks
    if (intent === 'projects') {
      const hasSpecificProj = ['nexttrip', 'ujjwal', 'fitmitra'].some(p => lowerQuery.includes(p));
      if (!hasSpecificProj) {
        return {
          text: responseHandler.formatProjectsList([]),
          options: ["NextTrip", "Ujjwal-Hub", "FitMitra"]
        };
      }
    }

    if (intent === 'about_dileep') {
      return responseHandler.formatAboutDileep(portfolioKnowledgeBase);
    }

    if (intent === 'greetings') {
      return config.responseTemplates.greeting;
    }
    
    if (intent === 'thank_you') {
      return config.responseTemplates.thankYou;
    }

    // Direct search for keywords in fallback
    if (lowerQuery.includes('dileep') || lowerQuery.includes('galla') || lowerQuery.includes('sai') || lowerQuery.includes('who are you') || lowerQuery.includes('about him')) {
      return responseHandler.formatAboutDileep(portfolioKnowledgeBase);
    }

    return config.responseTemplates.fallback;
  }
};

export const config = {
  intentConfidenceThreshold: 0.75,
  maxHistorySize: 20,
  defaultSessionId: 'default-session',

  enableRAG: true,
  enableContextMemory: true,
  enableSemanticSearch: true,
  enableIntentRanking: true,
  enableResponseCaching: true,

  session: {
    durationHours: 2,
    cleanupIntervalMinutes: 5,
    persistOnRefresh: true,
    persistOnReopen: true
  },

  searchSettings: {
    minKeywordMatchCount: 1,
    includeSynonyms: true,
    maxResults: 5,
    rankingEnabled: true,
    fuzzyMatchThreshold: 0.7
  },

  responseTemplates: {
    greeting: "Hi! I'm DeepAI. Ask about Dileep's skills, projects, experience, or achievements.",
    fallback: "I am here to help you learn about Dileep Sai Galla. Feel free to ask about his technical skills, internships, VIT education, NextTrip or Ujjwal-Hub projects, and certification credentials.",
    thankYou: "You're welcome! Let me know if you'd like to learn more about Dileep's background or work.",
    contact: "I'd be happy to share Dileep's contact information and professional profiles.",
    error: "Something went wrong while processing your request. Please try again."
  },

  aiPipeline: {
    stages: [
      "intent-detection",
      "context-analysis",
      "keyword-matching",
      "knowledge-retrieval",
      "response-generation",
      "response-formatting"
    ]
  }
};

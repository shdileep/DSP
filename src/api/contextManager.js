const sessionStore = new Map();

export const contextManager = {
  getOrCreateContext: (sessionId) => {
    if (!sessionStore.has(sessionId)) {
      sessionStore.set(sessionId, {
        history: [],
        lastIntent: null,
        lastKeywords: [],
        lastProject: null,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
    }
    return sessionStore.get(sessionId);
  },
  updateContext: (sessionId, userInput, botResponse, intent, keywords) => {
    const context = contextManager.getOrCreateContext(sessionId);
    context.history.push({ user: userInput, bot: botResponse, timestamp: Date.now() });
    if (context.history.length > 10) {
      context.history.shift();
    }
    context.lastIntent = intent;
    context.lastKeywords = keywords;

    // Update lastProject based on user input or bot response keywords
    const combinedText = (userInput + " " + botResponse).toLowerCase();
    if (combinedText.includes('nexttrip')) {
      context.lastProject = 'nexttrip';
    } else if (combinedText.includes('ujjwal')) {
      context.lastProject = 'ujjwal';
    } else if (combinedText.includes('fitmitra')) {
      context.lastProject = 'fitmitra';
    }

    context.updatedAt = Date.now();
    sessionStore.set(sessionId, context);
  },
  clearContext: (sessionId) => {
    sessionStore.delete(sessionId);
  }
};

import { intentDetector } from './intentDetector.js';
import { keywordManager } from './keywordManager.js';
import { ragEngine } from './ragEngine.js';
import { llmController } from './llmController.js';
import { contextManager } from './contextManager.js';

export const aiPipeline = {
  process: (query, sessionId) => {
    // 1. Context retrieval
    const context = contextManager.getOrCreateContext(sessionId);

    // 2. Intent Detection
    const { intent, confidence } = intentDetector.detect(query);

    // 3. Keyword Extraction
    const keywords = keywordManager.extractKeywords(query);

    // 4. RAG Engine Retrieval
    const retrievedContext = ragEngine.retrieveContext(keywords, intent, query);

    // 5. LLM Response Generation
    const resultObj = llmController.generateResponse(query, intent, retrievedContext, context.history, sessionId);
    const responseText = typeof resultObj === 'string' ? resultObj : resultObj.text;
    const responseOptions = typeof resultObj === 'string' ? undefined : resultObj.options;

    // 6. Update Context
    contextManager.updateContext(sessionId, query, responseText, intent, keywords);

    return {
      text: responseText,
      metadata: {
        intent,
        confidence,
        keywords,
        retrievedCount: retrievedContext.length,
        sessionId,
        options: responseOptions
      }
    };
  }
};

import { aiPipeline } from './aiPipeline.js';

export const mockApi = {
  handleChatRequest: async (message, sessionId = 'default-session') => {
    try {
      // Simulate typical async network latency of 300ms
      await new Promise(resolve => setTimeout(resolve, 300));

      if (!message || typeof message !== 'string') {
        return {
          status: 'error',
          error: {
            code: 'INVALID_INPUT',
            message: 'Message parameter must be a non-empty string.'
          }
        };
      }

      const result = aiPipeline.process(message, sessionId);

      return {
        status: 'success',
        data: {
          text: result.text,
          metadata: result.metadata
        }
      };
    } catch (error) {
      return {
        status: 'error',
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message
        }
      };
    }
  }
};

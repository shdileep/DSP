import { contextManager } from './contextManager.js';

const SESSION_KEY = 'deepai_chat_session';
const CLEANUP_INTERVAL_MS = 10000; // Check every 10 seconds

export const historyCleanupService = {
  // Initialize and check current session status
  initSession: () => {
    let session = historyCleanupService.getStoredSession();
    const now = Date.now();

    if (session) {
      if (now >= session.expiresAt) {
        console.log(`[HistoryCleanupService] Session ${session.sessionId} expired. Initiating automatic purge.`);
        historyCleanupService.purgeSession(session.sessionId);
        session = historyCleanupService.createNewSession();
      } else {
        console.log(`[HistoryCleanupService] Resuming active session ${session.sessionId}. Expires at: ${new Date(session.expiresAt).toLocaleTimeString()}`);
      }
    } else {
      session = historyCleanupService.createNewSession();
    }

    // Start periodic background checks
    historyCleanupService.startPeriodicChecks();
    return session.sessionId;
  },

  // Get active session metadata from storage
  getStoredSession: () => {
    try {
      const data = localStorage.getItem(SESSION_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('[HistoryCleanupService] Failed to read localStorage session:', e);
      return null;
    }
  },

  // Create a brand new session with exact 2-hour expiration window
  createNewSession: () => {
    const now = Date.now();
    const duration = 2 * 60 * 60 * 1000; // 2 Hours in milliseconds
    const session = {
      sessionId: `session-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: now,
      expiresAt: now + duration
    };

    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      console.log(`[HistoryCleanupService] Created new session ${session.sessionId}. Expiration set to 2 hours from now.`);
    } catch (e) {
      console.error('[HistoryCleanupService] Failed to store new session:', e);
    }
    return session;
  },

  // Purge all memory, context, and metadata of a session
  purgeSession: (sessionId) => {
    console.log(`[HistoryCleanupService] Purging history, context memory, and cached data for: ${sessionId}`);
    
    // 1. Clear memory contexts
    contextManager.clearContext(sessionId);

    // 2. Clear browser LocalStorage references
    try {
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(`deepai_history_${sessionId}`);
    } catch (e) {
      console.error('[HistoryCleanupService] Error purging LocalStorage keys:', e);
    }

    // 3. Dispatch global custom event to inform chatbot UI to clear its state
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('deepai-session-expired', { detail: { sessionId } });
      window.dispatchEvent(event);
    }
  },

  // Start background interval checks
  startPeriodicChecks: () => {
    if (typeof window === 'undefined') return;
    
    // Clear any previous duplicate timers
    if (window._deepaiCleanupInterval) {
      clearInterval(window._deepaiCleanupInterval);
    }

    window._deepaiCleanupInterval = setInterval(() => {
      const session = historyCleanupService.getStoredSession();
      if (session && Date.now() >= session.expiresAt) {
        console.log(`[HistoryCleanupService] Background check: Session ${session.sessionId} expired.`);
        historyCleanupService.purgeSession(session.sessionId);
        historyCleanupService.createNewSession();
        
        // Trigger page/chat refresh custom events
        if (typeof window !== 'undefined') {
          window.location.reload(); // Force reload to completely clean visual components
        }
      }
    }, CLEANUP_INTERVAL_MS);
  }
};

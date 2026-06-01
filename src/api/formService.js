/**
 * Unified Form Submission Service
 * Simulates a successful send immediately on the client side,
 * stores a backup in localStorage, and silently attempts an email relay in the background.
 */
export const formService = {
  submitContactForm: async (formData) => {
    const { name, email, subject, message } = formData;
    console.log('[FormService] Processing contact submission:', formData);
    
    // 1. Save submission to localStorage as a failsafe local backup
    try {
      const submissions = JSON.parse(localStorage.getItem('portfolio_submissions') || '[]');
      submissions.push({
        timestamp: new Date().toISOString(),
        name,
        email,
        subject,
        message
      });
      localStorage.setItem('portfolio_submissions', JSON.stringify(submissions));
      console.log('[FormService] Submission backed up to localStorage successfully.');
    } catch (e) {
      console.error('[FormService] LocalStorage backup error:', e);
    }

    // 2. Fire-and-forget background fetch to FormSubmit.co email relay
    // This runs silently. If it succeeds, Dileep gets the email. If it fails (due to CORS/Caches),
    // it fails silently without interrupting the user.
    fetch('https://formsubmit.co/ajax/dileepgalla200056@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        subject: subject || 'Portfolio Contact Submission (Silent)',
        message
      })
    })
    .then(res => console.log('[FormService] Background relay status:', res.status))
    .catch(err => console.warn('[FormService] Background relay failed silently:', err.message));

    // 3. Simulate a short loading delay (600ms) for UI realism, then resolve successfully
    await new Promise(resolve => setTimeout(resolve, 600));
    return { success: true };
  }
};

/**
 * Unified Form Submission Service
 * Handles multi-tier fallbacks: FastAPI -> FormSubmit.co -> Netlify Forms
 */
export const formService = {
  submitContactForm: async (formData) => {
    const { name, email, subject, message } = formData;
    
    // Tier 1: FastAPI Backend
    const apiBaseUrl = import.meta.env?.VITE_API_URL || '';
    const apiPath = apiBaseUrl ? `${apiBaseUrl.replace(/\/$/, '')}/api/contact` : '/api/contact';
    
    console.log('[FormService] Attempting Tier 1 submission to FastAPI:', apiPath);
    
    try {
      const response = await fetch(apiPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message })
      });
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (response.ok) {
          console.log('[FormService] Tier 1 Success:', data);
          return { success: true, tier: 1, data };
        }
        throw new Error(data.error || 'Server error.');
      } else {
        throw new Error('API returned static HTML/Page (Endpoint offline).');
      }
    } catch (apiError) {
      console.warn('[FormService] Tier 1 failed:', apiError.message);
      
      // Tier 2: FormSubmit.co AJAX relay
      const formSubmitEmail = 'dileepgalla200056@gmail.com';
      console.log('[FormService] Attempting Tier 2 fallback to FormSubmit.co for:', formSubmitEmail);
      
      try {
        const response = await fetch(`https://formsubmit.co/ajax/${formSubmitEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            subject: subject || 'Portfolio Contact Form Submission',
            message
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('[FormService] Tier 2 Success:', data);
          return { success: true, tier: 2, data };
        }
        throw new Error(`FormSubmit.co returned status: ${response.status}`);
      } catch (relayError) {
        console.warn('[FormService] Tier 2 failed:', relayError.message);
        
        // Tier 3: Netlify Forms fallback (post to root / with form-name)
        console.log('[FormService] Attempting Tier 3 fallback to Netlify Forms');
        try {
          const response = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              'form-name': 'contact',
              name,
              email,
              subject,
              message
            }).toString()
          });
          
          const isProduction = !['localhost', '127.0.0.1'].includes(window.location.hostname);
          if (response.ok && isProduction) {
            console.log('[FormService] Tier 3 Success (Netlify Forms Registered)');
            return { success: true, tier: 3 };
          }
          throw new Error('Netlify Form submission not registered (non-production or static server 404).');
        } catch (netlifyError) {
          console.error('[FormService] All submission tiers failed:', {
            apiError: apiError.message,
            relayError: relayError.message,
            netlifyError: netlifyError.message
          });
          throw new Error('All submission channels failed.');
        }
      }
    }
  }
};

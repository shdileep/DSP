import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Mail, 
  MapPin, 
  FileText, 
  Check, 
  RefreshCw
} from 'lucide-react';
import { ThemeStyle, ResumeData } from '../types';
import { generateResumePDF } from '../utils/generateResume';

interface ContactProps {
  resumeData: ResumeData;
  theme: ThemeStyle;
  customOverlayColor: string;
}

export default function Contact({ resumeData, theme, customOverlayColor }: ContactProps) {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'fallback'>('idle');

  const isTerminal = theme === 'terminal-os';
  const isMinimal = theme === 'minimal-linear';
  const isSynth = theme === 'cyber-synth';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedName = formState.name.trim();
    const trimmedEmail = formState.email.trim();
    const trimmedSubject = formState.subject.trim();
    const trimmedMessage = formState.message.trim();

    const newErrors = { name: '', email: '', subject: '', message: '' };
    let hasError = false;

    if (!trimmedName) {
      newErrors.name = 'Full Name cannot be empty or blank.';
      hasError = true;
    }

    if (!trimmedEmail) {
      newErrors.email = 'Email Address is required.';
      hasError = true;
    } else if (!trimmedEmail.toLowerCase().endsWith('@gmail.com')) {
      newErrors.email = 'You must enter a valid @gmail.com address.';
      hasError = true;
    }

    if (!trimmedSubject) {
      newErrors.subject = 'Subject cannot be empty or blank.';
      hasError = true;
    }

    if (!trimmedMessage) {
      newErrors.message = 'Message cannot be empty or blank.';
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    setStatus('sending');

    const apiBaseUrl = (import.meta as any).env?.VITE_API_URL || '';
    const apiPath = apiBaseUrl ? `${apiBaseUrl.replace(/\/$/, '')}/api/contact` : '/api/contact';
    
    fetch(apiPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: trimmedName,
        email: trimmedEmail,
        subject: trimmedSubject,
        message: trimmedMessage
      })
    })
    .then(async res => {
      const contentType = res.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');
      
      if (!isJson) {
        throw new Error('API_NOT_FOUND_OR_STATIC');
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Server error.');
      }
      return res.json();
    })
    .then(data => {
      setStatus('success');
      setFormState({ name: '', email: '', subject: '', message: '' });
      setErrors({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    })
    .catch(err => {
      console.warn('API Endpoint failed, attempting Netlify Forms fallback:', err.message);
      
      // Try Netlify Forms POST
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          name: trimmedName,
          email: trimmedEmail,
          subject: trimmedSubject,
          message: trimmedMessage
        }).toString()
      })
      .then(res => {
        const isNetlifyHost = window.location.hostname.endsWith('netlify.app') || window.location.hostname.includes('netlify');
        
        if (res.ok && isNetlifyHost) {
          setStatus('success');
          setFormState({ name: '', email: '', subject: '', message: '' });
          setErrors({ name: '', email: '', subject: '', message: '' });
          setTimeout(() => setStatus('idle'), 5000);
        } else {
          throw new Error('Netlify form submission skipped or failed.');
        }
      })
      .catch(netlifyErr => {
        console.error('All form submission channels failed:', netlifyErr);
        setStatus('fallback');
      });
    });
  };

  const textHeaderColor = isTerminal
    ? 'text-green-300 font-mono'
    : isSynth
    ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 font-extrabold'
    : 'text-white font-extrabold';

  const cardStyles = isTerminal
    ? 'border border-green-500/15 bg-black/60 p-6 rounded-lg text-left'
    : isSynth
    ? 'border border-pink-500/10 bg-purple-950/20 backdrop-blur-md p-8 rounded-2xl shadow-[0_0_20px_rgba(236,72,153,0.03)] text-left'
    : isMinimal
    ? 'border border-slate-800 bg-[#0a0f1d] p-8 rounded-xl text-left'
    : 'border border-[#1e293b]/70 bg-slate-900/35 backdrop-blur-xl p-8 rounded-2xl text-left';

  const buttonStyles = isTerminal
    ? 'w-full bg-green-600 hover:bg-green-500 text-black font-semibold font-mono py-3 rounded text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer'
    : isSynth
    ? 'w-full bg-gradient-to-r from-pink-500 to-indigo-600 hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-pink-500/15 cursor-pointer'
    : isMinimal
    ? 'w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer'
    : 'w-full bg-sky-500 hover:bg-sky-400 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-sky-500/25 cursor-pointer';

  const inputStyles = isTerminal
    ? 'w-full bg-black border border-green-500/20 text-green-300 font-mono text-xs p-2.5 rounded focus:outline-none focus:border-green-500 tracking-wide'
    : 'w-full bg-slate-950 text-slate-100 text-xs p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/40 transition-all';

  const infoCardStyles = isTerminal
    ? 'border border-green-500/15 bg-black/60 p-4 rounded-xl flex items-center gap-3.5'
    : isSynth
    ? 'border border-pink-500/10 bg-purple-950/20 backdrop-blur-md p-4 rounded-xl flex items-center gap-3.5 shadow-sm shadow-pink-500/5'
    : isMinimal
    ? 'border border-slate-800 bg-[#0a0f1d] p-4 rounded-xl flex items-center gap-3.5'
    : 'border border-[#1e293b]/70 bg-slate-900/35 backdrop-blur-xl p-4 rounded-xl flex items-center gap-3.5 shadow-md';

  return (
    <section id="contact" className="py-20 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
        
        {/* Left Side: Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            {isTerminal && (
              <span className="text-[11px] font-bold uppercase tracking-widest block font-mono text-green-500">
                {">"} ACCESS MODULE: SECURE CHANNELS
              </span>
            )}
            <h2 className={`text-3xl font-extrabold mt-1 ${textHeaderColor}`}>
              {isTerminal ? '_execute: establish_connection' : 'Contact Me'}
            </h2>
            <div className={`h-1 w-20 mt-2 rounded ${isTerminal ? 'bg-green-500' : isSynth ? 'bg-pink-500' : 'bg-sky-400'}`} style={{ backgroundColor: !isTerminal && !isSynth ? customOverlayColor : undefined }} />
          </div>

          <p className={`text-sm leading-relaxed font-sans ${isTerminal ? 'text-green-400/80' : 'text-slate-350'}`}>
            I am open to strategic full-stack engineering roles, ML pipeline optimizations, or multi-agent consultancy projects. Fill out the contact form or connect directly via secure channels.
          </p>

          <div className="space-y-4 font-mono text-[11px] text-slate-400">
            {/* Email Card */}
            <div className={infoCardStyles}>
              <Mail className={`w-5 h-5 shrink-0 ${isTerminal ? 'text-green-500' : isSynth ? 'text-pink-400' : 'text-sky-400'}`} style={{ color: !isTerminal && !isSynth ? customOverlayColor : undefined }} />
              <div>
                <span className="text-slate-500 uppercase tracking-widest block text-[9px] font-bold font-mono">Email</span>
                <a href={`mailto:${resumeData.email}`} className="text-white hover:underline font-bold block mt-0.5 font-sans">{resumeData.email}</a>
              </div>
            </div>

            {/* Location Card */}
            <div className={infoCardStyles}>
              <MapPin className={`w-5 h-5 shrink-0 ${isTerminal ? 'text-green-500' : isSynth ? 'text-pink-400' : 'text-sky-400'}`} style={{ color: !isTerminal && !isSynth ? customOverlayColor : undefined }} />
              <div>
                <span className="text-slate-500 uppercase tracking-widest block text-[9px] font-bold font-mono">Location</span>
                <span className="text-white font-bold block mt-0.5 font-sans">Hyderabad, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <div className="lg:col-span-7 w-full">
          <div className={cardStyles}>
            
            <div className="space-y-1 text-left">
              <h3 className={`text-base font-bold text-slate-100 ${isTerminal ? 'text-green-300 font-mono' : ''}`}>
                Send a Message
              </h3>
              <p className={`text-xs ${isTerminal ? 'text-green-500/70' : 'text-slate-400'}`}>
                Fill in your details below and I will get back to you as soon as possible.
              </p>
            </div>

            <form 
              onSubmit={handleFormSubmit} 
              className="space-y-4 mt-6"
              name="contact"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </p>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5 font-mono">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  placeholder=""
                  className={`${inputStyles} ${errors.name ? 'border-red-500/50 focus:ring-red-500/30 bg-red-950/5' : ''}`}
                  disabled={status === 'sending' || status === 'success'}
                />
                {errors.name && (
                  <p className="text-[10.5px] text-red-500 font-semibold font-mono mt-1.5 flex items-center gap-1">
                    <span>⚠️</span> {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5 font-mono">
                  Email Address
                </label>
                <input
                  required
                  type="text"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  placeholder=""
                  className={`${inputStyles} ${errors.email ? 'border-red-500/50 focus:ring-red-500/30 bg-red-950/5' : ''}`}
                  disabled={status === 'sending' || status === 'success'}
                />
                {errors.email && (
                  <p className="text-[10.5px] text-red-500 font-semibold font-mono mt-1.5 flex items-center gap-1">
                    <span>⚠️</span> {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5 font-mono">
                  Subject
                </label>
                <input
                  required
                  type="text"
                  name="subject"
                  value={formState.subject}
                  onChange={handleInputChange}
                  placeholder=""
                  className={`${inputStyles} ${errors.subject ? 'border-red-500/50 focus:ring-red-500/30 bg-red-950/5' : ''}`}
                  disabled={status === 'sending' || status === 'success'}
                />
                {errors.subject && (
                  <p className="text-[10.5px] text-red-500 font-semibold font-mono mt-1.5 flex items-center gap-1">
                    <span>⚠️</span> {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5 font-mono">
                  Your Message
                </label>
                <textarea
                  required
                  rows={4}
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  placeholder=""
                  className={`${inputStyles} resize-none ${errors.message ? 'border-red-500/50 focus:ring-red-500/30 bg-red-950/5' : ''}`}
                  disabled={status === 'sending' || status === 'success'}
                />
                {errors.message && (
                  <p className="text-[10.5px] text-red-500 font-semibold font-mono mt-1.5 flex items-center gap-1">
                    <span>⚠️</span> {errors.message}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.button
                      key="btn-idle"
                      type="submit"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={buttonStyles}
                      style={{ backgroundColor: !isTerminal && !isSynth && !isMinimal ? customOverlayColor : undefined }}
                    >
                      <Send className="w-4 h-4" />
                      <span>{isTerminal ? 'TRANSMIT_PAYLOAD' : 'Send Message'}</span>
                    </motion.button>
                  )}

                  {status === 'sending' && (
                    <div
                      key="btn-sending"
                      className="w-full bg-slate-800 text-slate-400 font-mono text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-2 border border-slate-700 pointer-events-none"
                    >
                      <RefreshCw className="w-4 h-4 animate-spin text-sky-400" />
                      <span>ENCRYPTING PROTOCOLS / DISPATCHING CODES...</span>
                    </div>
                  )}

                  {status === 'success' && (
                    <motion.div
                      key="btn-success"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-full bg-gradient-to-r from-emerald-950 to-green-900 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono py-3 rounded-xl flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>PAYLOAD SINKED SUCCESSFULLY! DILEEP NOTIFIED.</span>
                    </motion.div>
                  )}

                  {status === 'fallback' && (
                    <motion.div
                      key="btn-fallback"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="space-y-3"
                    >
                      <div className="text-amber-500 text-[11px] font-semibold font-mono flex items-center gap-1.5 leading-snug">
                        <span>⚠️</span>
                        <span>API is offline or static. Submit using your mail client:</span>
                      </div>
                      <a
                        href={`mailto:${resumeData.email}?subject=${encodeURIComponent(formState.subject || 'Portfolio Contact')}&body=${encodeURIComponent(
                          `Hi Dileep,\n\n${formState.message}\n\nFrom,\n${formState.name}\n(${formState.email})`
                        )}`}
                        className={`${buttonStyles} text-center`}
                        style={{ backgroundColor: !isTerminal && !isSynth && !isMinimal ? customOverlayColor : undefined }}
                        onClick={() => {
                          setTimeout(() => {
                            setFormState({ name: '', email: '', subject: '', message: '' });
                            setErrors({ name: '', email: '', subject: '', message: '' });
                            setStatus('idle');
                          }, 1000);
                        }}
                      >
                        <Mail className="w-4 h-4" />
                        <span>Send via Email Client</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setStatus('idle')}
                        className="w-full py-2 bg-slate-900 border border-slate-800 text-[10px] text-slate-400 hover:text-white rounded-lg font-mono uppercase tracking-wide cursor-pointer transition-colors"
                      >
                        Try Form Again
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>

            {/* Social Anchor Print Button */}
            <div className="border-t border-white/5 pt-6 mt-6">
              <button
                onClick={() => generateResumePDF(resumeData)}
                className={`w-full py-2.5 rounded-lg border border-dashed text-[11px] font-bold text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isTerminal
                    ? 'border-green-500/30 hover:border-green-500 hover:bg-green-500/5'
                    : isSynth
                    ? 'border-pink-500/30 hover:border-pink-500 hover:bg-pink-500/5 hover:shadow-[0_0_12px_rgba(236,72,153,0.2)]'
                    : 'border-slate-800 hover:border-slate-605 hover:bg-slate-900/65'
                }`}
              >
                <FileText className="w-4 h-4 text-sky-400" style={{ color: !isTerminal && !isSynth ? customOverlayColor : undefined }} />
                <span>GENERATE PRINT-FRIENDLY PDF RESUME</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

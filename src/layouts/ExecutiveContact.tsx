import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { ResumeData } from '../types';

interface ExecutiveContactProps {
  resumeData: ResumeData;
}

export default function ExecutiveContact({ resumeData }: ExecutiveContactProps) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedSubject = form.subject.trim();
    const trimmedMessage = form.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) return;
    setLoading(true);

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: trimmedName,
        email: trimmedEmail,
        subject: trimmedSubject || `Executive Consulting Request from ${trimmedName}`,
        message: trimmedMessage
      })
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => {
          throw new Error(data.error || 'Server error.');
        });
      }
      return res.json();
    })
    .then(data => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    })
    .catch(err => {
      console.error('Executive Mail submit error:', err);
      setLoading(false);
      alert('Failed to send message: ' + err.message);
    });
  };

  return (
    <section id="exec-contact" className="py-20 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-900">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
        
        {/* Contact info side */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">
              Get In Touch
            </h2>
            <div className="h-1 w-20 mt-2 bg-amber-500" />
          </div>

          <p className="text-sm text-slate-350 leading-relaxed font-sans font-light">
            I am open to strategic full-stack engineering roles, ML pipeline optimizations, or multi-agent consultancy projects. Fill out the consultation request or connect directly via secure channels.
          </p>

          <div className="space-y-4 font-mono text-[11px] text-slate-400">
            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-950/60 border border-slate-900">
              <Mail className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <span className="text-slate-500 uppercase tracking-widest block text-[9px] font-bold">Email</span>
                <a href={`mailto:${resumeData.email}`} className="text-white hover:text-amber-400 font-bold block mt-0.5">{resumeData.email}</a>
              </div>
            </div>



            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-950/60 border border-slate-900">
              <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <span className="text-slate-500 uppercase tracking-widest block text-[9px] font-bold">Location</span>
                <span className="text-white font-bold block mt-0.5">Hyderabad, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Consultation Form */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-slate-900/30 border border-slate-800/80 backdrop-blur-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder=""
                  className="w-full bg-slate-950 border border-slate-900 text-xs rounded-xl p-3 text-white focus:outline-none focus:border-amber-500/80 transition-all font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">Professional Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder=""
                  className="w-full bg-slate-950 border border-slate-900 text-xs rounded-xl p-3 text-white focus:outline-none focus:border-amber-500/80 transition-all font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">Subject / Scope of Initiative</label>
              <input
                type="text"
                required
                value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}
                placeholder=""
                className="w-full bg-slate-950 border border-slate-900 text-xs rounded-xl p-3 text-white focus:outline-none focus:border-amber-500/80 transition-all font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">Brief Description of Project Requirements</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder=""
                className="w-full bg-slate-950 border border-slate-900 text-xs rounded-xl p-3.5 text-white focus:outline-none focus:border-amber-500/80 transition-all font-sans resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-4 flex-wrap">
              {submitted ? (
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-xs font-bold">
                  <CheckCircle className="w-4 h-4" />
                  <span>Request received. Secure pipeline synced.</span>
                </div>
              ) : (
                <span className="text-[10px] font-mono text-slate-500 uppercase">Direct SMTP Channels</span>
              )}

              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer px-6 py-3 rounded-xl bg-amber-500 text-black font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/10"
              >
                {loading ? (
                  <span>Dispatching Request...</span>
                ) : (
                  <>
                    <span>Dispatch Initiative</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>

    </section>
  );
}

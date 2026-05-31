import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, ArrowRight, Download, Linkedin, Github, Mail, Sliders } from 'lucide-react';
import { ResumeData, ThemeStyle } from '../types';
import { imageAssetPath } from '../data';
import { generateResumePDF } from '../utils/generateResume';

interface HeroProps {
  resumeData: ResumeData;
  theme: ThemeStyle;
  customOverlayColor: string;
  onOpenBuilder: () => void;
}

export default function Hero({ resumeData, theme, customOverlayColor, onOpenBuilder }: HeroProps) {
  const titles = ['AI Engineer', 'ML Architect', 'Full Stack Developer', 'GenAI Builder'];
  const [titleIdx, setTitleIdx] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing simulator effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullWord = titles[titleIdx];
    
    const handleType = () => {
      if (!isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        if (currentText === fullWord) {
          timer = setTimeout(() => setIsDeleting(true), 2000); // Wait before delete
        } else {
          timer = setTimeout(handleType, 100);
        }
      } else {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setTitleIdx((prev) => (prev + 1) % titles.length);
        } else {
          timer = setTimeout(handleType, 50);
        }
      }
    };

    timer = setTimeout(handleType, 120);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIdx]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const isTerminal = theme === 'terminal-os';
  const isMinimal = theme === 'minimal-linear';
  const isSynth = theme === 'cyber-synth';

  const badges = ['AI/ML', 'LLM Apps', 'Full Stack', 'GenAI', 'Automation', 'Cloud'];

  return (
    <section 
      id="hero" 
      className="min-h-screen pt-24 sm:pt-28 flex items-center relative overflow-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full pb-16">
        
        {/* Left Side: Intro + badging + action buttons */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6 text-left"
        >
          {/* Badge capsules */}
          <div className="flex flex-wrap gap-2.5">
            {badges.map((badge, idx) => (
              <span 
                key={badge}
                className={`text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest transition-all ${
                  isTerminal
                    ? 'border border-green-500/30 text-green-400 bg-green-500/5 hover:bg-green-500/15'
                    : isSynth
                    ? 'border border-pink-500/30 text-pink-400 bg-pink-500/5 hover:shadow-[0_0_8px_rgba(236,72,153,0.3)]'
                    : isMinimal
                    ? 'border border-slate-700 text-slate-300 bg-slate-900/60'
                    : 'border border-sky-500/20 text-sky-400 bg-sky-500/5 hover:bg-sky-500/10'
                }`}
                style={{
                  borderColor: !isTerminal && !isMinimal && !isSynth ? customOverlayColor + '30' : undefined,
                  color: !isTerminal && !isMinimal && !isSynth ? customOverlayColor : undefined
                }}
              >
                {badge}
              </span>
            ))}
          </div>

          <div>
            <span className={`text-sm font-semibold tracking-wide block ${isTerminal ? 'text-green-500 font-mono' : isSynth ? 'text-pink-400' : 'text-slate-400'}`}>
              {isTerminal ? '> INITIALIZE_PROFILE_PROTOCOL' : "HI, I'M"}
            </span>
            <h1 className={`text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight mt-1 leading-tight ${
              isTerminal 
                ? 'font-mono text-green-300' 
                : isSynth 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400' 
                : isMinimal 
                ? 'text-white' 
                : 'text-slate-100'
            }`}>
              {resumeData.name}
            </h1>

            {/* Dynamic typing row */}
            <div className="h-10 sm:h-12 flex items-center gap-2 mt-3.5">
              <span className={`text-lg sm:text-2xl font-bold font-mono ${
                isTerminal ? 'text-yellow-400' : isSynth ? 'text-cyan-400' : 'text-sky-400'
              }`}
              style={{ color: !isTerminal && !isSynth ? customOverlayColor : undefined }}
              >
                {isTerminal ? '_exec:' : ''} {currentText}
              </span>
              <span className={`w-1.5 h-6 rounded-full animate-blink ${
                isTerminal ? 'bg-yellow-400' : isSynth ? 'bg-cyan-400' : 'bg-sky-400'
              }`}
              style={{ backgroundColor: !isTerminal && !isSynth ? customOverlayColor : undefined }}
              />
            </div>
          </div>

          <p className={`text-sm.5 sm:text-base max-w-xl leading-relaxed ${isTerminal ? 'text-green-400/80' : 'text-slate-350'}`}>
            {resumeData.shortSummary}
          </p>

          {/* Core Call to Actions */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => handleScrollTo('projects')}
              className={`cursor-pointer px-6 py-3 rounded-xl font-bold text-sm tracking-wide flex items-center gap-2 transition-all ${
                isTerminal
                  ? 'bg-green-600 hover:bg-green-500 text-black'
                  : isSynth
                  ? 'bg-gradient-to-r from-pink-500 to-indigo-600 text-white hover:opacity-90 shadow-lg shadow-pink-500/20'
                  : isMinimal
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                  : 'bg-sky-500 hover:bg-sky-400 text-white shadow-xl shadow-sky-500/20'
              }`}
              style={{ backgroundColor: !isTerminal && !isSynth && !isMinimal ? customOverlayColor : undefined }}
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => generateResumePDF(resumeData)}
              className={`cursor-pointer px-6 py-3 rounded-xl font-bold text-sm tracking-wide flex items-center gap-2 border transition-all ${
                isTerminal
                  ? 'border-green-500/40 text-green-400 hover:bg-green-500/5'
                  : isSynth
                  ? 'border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/5 hover:shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  : isMinimal
                  ? 'border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-900/40'
                  : 'border-slate-700/80 text-slate-100 hover:border-slate-500 hover:bg-slate-900/30'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Get Resume (PDF)</span>
            </button>
            
            <button
              onClick={onOpenBuilder}
              className="cursor-pointer px-5 py-3 rounded-xl font-bold text-sm tracking-wide border border-dashed border-amber-500/30 bg-amber-500/5 text-amber-500 hover:bg-amber-500/10 transition-all flex items-center gap-2"
            >
              <Sliders className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>Portfolio Transformer</span>
            </button>
          </div>

          {/* Social connections links */}
          <div className="flex items-center gap-3.5 pt-4 text-slate-500 text-xs font-mono">
            <span>CONNECT:</span>
            <a 
              href={resumeData.linkedin} 
              target="_blank" 
              rel="noreferrer"
              className={`hover:text-sky-400 transition-colors flex items-center gap-1 ${isTerminal ? 'hover:text-green-300' : ''}`}
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <span className="text-slate-800">/</span>
            <a 
              href={resumeData.github} 
              target="_blank" 
              rel="noreferrer"
              className={`hover:text-white transition-colors flex items-center gap-1 ${isTerminal ? 'hover:text-green-300' : ''}`}
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <span className="text-slate-800">/</span>
            <a 
              href={`mailto:${resumeData.email}`}
              className={`hover:text-pink-400 transition-colors flex items-center gap-1 ${isTerminal ? 'hover:text-green-300' : ''}`}
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>

        </motion.div>

        {/* Right Side: Circular hologram rotating image or terminal simulator */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 flex justify-center items-center relative mt-8 lg:mt-0"
        >
          {isTerminal ? (
            // In terminal mode we output a retro CLI instead of image right away
            <div className="w-full max-w-md">
              <div className="p-3 bg-slate-900/40 border border-slate-800 rounded-t-xl text-slate-400 text-xs font-mono flex items-center justify-between">
                <span>telemetry_visualizer.py</span>
                <span className="text-green-500 text-[10px]">ACTIVE</span>
              </div>
              <div className="aspect-square bg-black border-x border-b border-green-500/20 rounded-b-xl flex flex-col justify-center items-center p-6 text-center select-none relative">
                <div className="absolute inset-0 bg-green-500/3 pointer-events-none" />
                <div className="w-40 h-40 rounded-full border-2 border-dashed border-green-500/40 p-2 animate-spin-slow">
                  <div className="w-full h-full rounded-full border border-green-500/20 flex items-center justify-center">
                    <Cpu className="w-12 h-12 text-green-400 animate-pulse" />
                  </div>
                </div>
                <h4 className="text-green-300 font-bold mt-6 tracking-wide uppercase text-sm">System Architect Online</h4>
                <p className="text-[10px] text-green-500/80 max-w-xs mt-2 leading-relaxed">
                  Dileep Sai Galla<br />
                  M.Tech Candidate @ Chennai, IN<br />
                  Vellore Institute of Technology
                </p>
                <div className="flex gap-4 mt-4">
                  <span className="text-[10px] text-yellow-500 text-yellow-500/60 font-semibold">[PROMPT BASH CLI OVERLAY]</span>
                </div>
              </div>
            </div>
          ) : (
            // Neo AI / Cyber Synth / Minimal glass circle layers
            <div className="relative w-72 h-72 sm:w-85 sm:h-85 flex items-center justify-center">
              
              {/* Animated outer ring */}
              <div 
                className={`absolute inset-0 rounded-full animate-spin-slow transition-all duration-700 ${
                  isSynth
                    ? 'border border-dashed border-pink-500/40 bg-gradient-to-tr from-pink-500/10 via-transparent to-cyan-500/10'
                    : isMinimal
                    ? 'border border-slate-800'
                    : 'border-2 border-dashed border-sky-500/30'
                }`}
                style={{ borderColor: !isSynth && !isMinimal ? customOverlayColor + '30' : undefined }}
              />

              {/* Rotating glowing border overlay */}
              <div 
                className={`absolute -inset-1.5 rounded-full animate-spin-reverse opacity-45 duration-1000 transition-all ${
                  isSynth
                    ? 'bg-gradient-to-r from-pink-500 to-cyan-500 blur-sm'
                    : isMinimal
                    ? 'bg-transparent'
                    : 'bg-gradient-to-r from-sky-400 to-indigo-500 blur-sm'
                }`}
                style={{ 
                  background: !isSynth && !isMinimal ? `linear-gradient(to right, ${customOverlayColor}, transparent)` : undefined,
                  display: isMinimal ? 'none' : 'block'
                }}
              />

              {/* Middle glassmorphism blur holder */}
              <div className="absolute inset-5 rounded-full bg-slate-950/75 backdrop-blur-3xl border border-white/5 shadow-2xl flex items-center justify-center overflow-hidden">
                <img
                  src={imageAssetPath}
                  alt={resumeData.name}
                  referrerPolicy="no-referrer"
                  className="w-[96%] h-[96%] rounded-full object-cover transition-all hover:scale-110 duration-500 grayscale opacity-90 hover:grayscale-0 relative"
                />
                
                {/* Visual Hologram overlay indicator */}
                <div className={`absolute inset-0 pointer-events-none mix-blend-overlay ${
                  isSynth 
                    ? 'bg-gradient-to-t from-pink-500/20 to-cyan-500/10' 
                    : isMinimal
                    ? 'bg-transparent'
                    : 'bg-gradient-to-t from-sky-500/20 to-transparent'
                }`} />
              </div>

              {/* Floating micro badges around avatar */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className={`absolute top-6 left-2 px-3 py-1 bg-slate-900/90 text-[10px] font-bold border rounded-lg shadow-xl shadow-black/45 ${
                  isSynth ? 'border-pink-500/40 text-pink-400' : 'border-sky-500/20 text-sky-400'
                }`}
                style={{
                  borderColor: !isSynth && !isMinimal ? customOverlayColor + '40' : undefined,
                  color: !isSynth && !isMinimal ? customOverlayColor : undefined,
                  display: isMinimal ? 'none' : 'block'
                }}
              >
                <span>🚀 Agentic LLMs</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                className={`absolute bottom-8 right-0 px-3 py-1 bg-slate-900/90 text-[10px] font-bold border rounded-lg shadow-xl shadow-black/45 ${
                  isSynth ? 'border-cyan-500/40 text-cyan-400' : 'border-indigo-500/30 text-indigo-400'
                }`}
                style={{
                  display: isMinimal ? 'none' : 'block'
                }}
              >
                <span>⚡ RAG Pipeline</span>
              </motion.div>

            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}

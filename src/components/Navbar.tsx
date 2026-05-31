import { motion } from 'motion/react';
import { 
  Terminal, 
  Cpu, 
  Menu, 
  X, 
  Sliders,
  Download
} from 'lucide-react';
import { ThemeStyle } from '../types';
import { useState } from 'react';
import { resumeData } from '../data';
import { generateResumePDF } from '../utils/generateResume';
import { usePortfolioTransformer } from '../state/portfolioTransformer';

interface NavbarProps {
  theme: ThemeStyle;
  customOverlayColor: string;
}

export default function Navbar({
  theme,
  customOverlayColor
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdvanced, toggleMode] = usePortfolioTransformer();

  const sections = isAdvanced 
    ? [
        { id: 'executive-hero', label: 'Home' },
        { id: 'exec-dashboard', label: 'Dashboard' },
        { id: 'exec-projects', label: 'Projects' },
        { id: 'exec-architecture', label: 'Architecture' },
        { id: 'exec-experience', label: 'Experience' },
        { id: 'exec-education', label: 'Education' },
        { id: 'exec-research', label: 'Research' },
        { id: 'exec-contact', label: 'Contact' }
      ]
    : [
        { id: 'hero', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'architecture', label: 'Architecture' },
        { id: 'experience', label: 'Experience' },
        { id: 'certifications', label: 'Certifications' },
        { id: 'contact', label: 'Contact' }
      ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Theme-specific styles
  const isTerminal = theme === 'terminal-os';
  const isMinimal = theme === 'minimal-linear';
  const isSynth = theme === 'cyber-synth';

  const logoText = isAdvanced 
    ? 'Dileep Sai' 
    : isTerminal 
    ? 'GALLA_OS v1.7' 
    : isSynth 
    ? 'SYNAPSE_STUDIO' 
    : isMinimal 
    ? 'Dileep Sai' 
    : 'Dileep.AI';

  const navStyles = isTerminal
    ? 'border-b border-green-500/20 bg-[#020502]/80 text-green-400 font-mono'
    : isSynth
    ? 'border-b border-pink-500/20 bg-purple-950/45 backdrop-blur-xl text-pink-400'
    : isMinimal
    ? 'border-b border-slate-800 bg-[#0a0f1d]/50 backdrop-blur-md text-slate-100'
    : 'border-b border-slate-800/60 bg-[#050816]/70 backdrop-blur-xl text-slate-100';

  const linkHoverStyles = isTerminal
    ? 'hover:text-green-300 hover:bg-green-500/10 px-2 py-1 rounded'
    : isSynth
    ? 'hover:text-cyan-400 hover:shadow-[0_0_10px_rgba(34,211,238,0.4)] transition-all'
    : isMinimal
    ? 'hover:text-white transition-colors'
    : 'hover:text-sky-400 transition-colors duration-200';

  return (
    <motion.nav 
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 inset-x-0 h-16 z-40 transition-all duration-300 ${navStyles}`}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => handleLinkClick(isAdvanced ? 'executive-hero' : 'hero')}>
          {!isTerminal && (
            <div className="p-1 px-2.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center gap-1.5" style={{ borderColor: customOverlayColor + '30', color: customOverlayColor }}>
              <Cpu className="w-4 h-4 animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider relative top-[0.5px]">AI/ML</span>
            </div>
          )}
          <span className={`text-sm sm:text-base font-extrabold tracking-tight ${isTerminal ? 'font-mono glow-font-green' : isSynth ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400' : 'font-sans'}`}>
            {logoText}
          </span>
        </div>

        {/* Desktop Sections */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-semibold">
          {sections.map(sec => (
            <button
              key={sec.id}
              onClick={() => handleLinkClick(sec.id)}
              className={`cursor-pointer ${linkHoverStyles}`}
            >
              {isTerminal ? `_ls ${sec.label.toLowerCase()}` : sec.label}
            </button>
          ))}
        </div>

        {/* Action Button Links */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Portfolio Transformer toggle button */}
          <button
            onClick={toggleMode}
            className={`cursor-pointer px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              isTerminal
                ? 'border border-green-500/40 text-green-400 bg-green-500/5 hover:bg-green-500/10'
                : isSynth
                ? 'border border-indigo-500/50 bg-indigo-950/20 text-[#a5b4fc] hover:shadow-[0_0_12px_rgba(139,92,246,0.3)] shadow-indigo-500/20'
                : 'border border-slate-700/80 bg-slate-900/60 text-slate-100 hover:border-slate-500/90'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-amber-500" />
            <span>{isAdvanced ? 'Original Portfolio' : 'Portfolio Transformer'}</span>
            <span className="flex h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          </button>

          {/* CV Download printable */}
          <button
            onClick={() => generateResumePDF(resumeData)}
            className={`cursor-pointer px-4.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              isTerminal
                ? 'bg-green-600 hover:bg-green-500 text-black font-semibold'
                : isSynth
                ? 'bg-gradient-to-r from-pink-500 to-indigo-600 hover:shadow-[0_0_15px_rgba(236,72,153,0.4)] text-white'
                : 'bg-sky-500 hover:bg-sky-400 text-white shadow-md'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Quick theme cycle */}
          <button
            onClick={toggleMode}
            className="p-1.5 rounded-md hover:bg-white/5 text-slate-400 cursor-pointer"
          >
            <Sliders className="w-5 h-5 text-amber-500 animate-pulse" />
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md hover:bg-white/5 text-slate-400 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile drop menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`absolute top-16 inset-x-0 p-4 shadow-xl flex flex-col gap-3 py-6 text-sm border-b ${
            isTerminal
              ? 'bg-[#020502]/95 text-green-400 border-green-500/20 font-mono'
              : isSynth
              ? 'bg-purple-950/95 backdrop-blur-2xl text-pink-400 border-pink-500/20'
              : 'bg-slate-950 border-slate-800'
          }`}
        >
          {sections.map(sec => (
            <button
              key={sec.id}
              onClick={() => handleLinkClick(sec.id)}
              className="py-1 px-2.5 rounded hover:bg-white/5 text-left transition-all cursor-pointer"
            >
              {isTerminal ? `_execute: ${sec.label.toLowerCase()}` : sec.label}
            </button>
          ))}
          
          <div className="h-px bg-slate-800/80 my-2" />
          
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                toggleMode();
              }}
              className="py-2.5 rounded-lg font-bold text-xs bg-slate-900 border border-slate-800 text-slate-350 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-amber-500" />
              Transformer
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                generateResumePDF(resumeData);
              }}
              className="py-2.5 rounded-lg font-bold text-xs bg-sky-500 text-white flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

import { motion } from 'motion/react';
import { 
  Terminal, 
  Menu, 
  X, 
  Sliders,
  Download
} from 'lucide-react';
import AnimatedChipCodeIcon from './AnimatedChipCodeIcon';
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
    : 'border-b border-sky-500/15 bg-[#050816]/85 backdrop-blur-2xl text-slate-100';

  const linkHoverStyles = isTerminal
    ? 'hover:text-green-300 hover:bg-green-500/10 px-2 py-1 rounded'
    : isSynth
    ? 'hover:text-cyan-400 hover:shadow-[0_0_10px_rgba(34,211,238,0.4)] transition-all'
    : isMinimal
    ? 'hover:text-white transition-colors'
    : 'text-slate-300 hover:text-sky-400 transition-colors duration-200';

  const cubicEase = [0.16, 1, 0.3, 1] as const;

  return (
    <motion.nav 
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: cubicEase }}
      className={`fixed top-0 inset-x-0 h-16 z-40 transition-all duration-300 ${navStyles}`}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo with Exact Animated Chip Code Icon */}
        <motion.div 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: cubicEase }}
          className="flex items-center gap-2.5 cursor-pointer select-none group" 
          onClick={() => handleLinkClick(isAdvanced ? 'executive-hero' : 'hero')}
          style={{ willChange: 'transform, opacity' }}
        >
          <AnimatedChipCodeIcon size={32} />
          <span className="text-sm sm:text-base font-extrabold tracking-tight">
            <span className="text-sky-400">Dileep</span>{' '}
            <span className="text-white">Sai Galla</span>
          </span>
        </motion.div>

        {/* Desktop Sections with Staggered Entrance and Draw-in Underline on Hover */}
        <div className="hidden lg:flex items-center gap-7 text-xs font-semibold">
          {sections.map((sec, idx) => (
            <motion.button
              key={sec.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.1 + (idx * 0.04), // Staggered at 100ms + 40ms per item
                ease: cubicEase 
              }}
              onClick={() => handleLinkClick(sec.id)}
              className="relative py-1 cursor-pointer text-slate-300 hover:text-white transition-colors group select-none"
              style={{ willChange: 'transform, opacity' }}
            >
              <span>{isTerminal ? `_ls ${sec.label.toLowerCase()}` : sec.label}</span>
              
              {/* Underline draws in from left to right (200ms, transform-origin left, scaleX 0->1) */}
              <span 
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-400 to-cyan-300 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out pointer-events-none rounded-full" 
              />
            </motion.button>
          ))}
        </div>

        {/* Action Button Links */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Portfolio Transformer toggle button with periodic 4-5s shimmer */}
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + (sections.length * 0.04), ease: cubicEase }}
            onClick={toggleMode}
            className="relative overflow-hidden cursor-pointer px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 border border-sky-500/20 bg-sky-500/5 text-slate-300 hover:bg-sky-500/15 hover:text-white group"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Shimmer sweep effect running every 4.5s */}
            <span 
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-sky-400/20 to-transparent pointer-events-none"
              style={{
                animation: 'shimmerSweep 4.5s infinite linear'
              }}
            />
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span className="relative z-10">{isAdvanced ? 'Original Portfolio' : 'Transformer'}</span>
            <span className="relative z-10 flex h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          </motion.button>

          {/* Let's Connect CTA Button with Hover Bloom (1.03 scale) and Click Tactile Scale (0.98) */}
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.14 + (sections.length * 0.04), ease: cubicEase }}
            onClick={() => handleLinkClick('contact')}
            className="cursor-pointer px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-md shadow-sky-500/20 hover:shadow-[0_0_22px_rgba(56,189,248,0.45)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 ease-out flex items-center gap-1.5"
            style={{ willChange: 'transform, opacity' }}
          >
            <span>Let&apos;s Connect</span>
          </motion.button>
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

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Download, Linkedin, Github, Mail, Sliders } from 'lucide-react';
import { ResumeData, ThemeStyle } from '../types';
import mainMeImage from '../assets/images/mainme.png';
import { generateResumePDF } from '../utils/generateResume';

interface HeroProps {
  resumeData: ResumeData;
  theme: ThemeStyle;
  customOverlayColor: string;
  onOpenBuilder: () => void;
}

export default function Hero({ resumeData, theme, customOverlayColor, onOpenBuilder }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const [scrollY, setScrollY] = useState(0);

  // Smooth scroll listener with requestAnimationFrame throttling for scroll-linked parallax
  useEffect(() => {
    if (prefersReducedMotion) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Limit parallax calculation to hero view scope to save CPU
          if (window.scrollY <= window.innerHeight * 1.5) {
            setScrollY(window.scrollY);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const cubicEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#050816] pt-16"
    >
      {/* 1. Deep Midnight & Electric Blue Ambient Spotlight — 0.3x Parallax */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: prefersReducedMotion ? undefined : `translate3d(0, ${scrollY * 0.3}px, 0)`,
          willChange: prefersReducedMotion ? undefined : 'transform',
          background: `
            radial-gradient(circle at 50% 45%, rgba(56, 189, 248, 0.18) 0%, rgba(14, 165, 233, 0.08) 35%, rgba(5, 8, 22, 0.95) 75%, #050816 100%),
            radial-gradient(circle at 20% 70%, rgba(56, 189, 248, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 80% 30%, rgba(99, 102, 241, 0.06) 0%, transparent 45%)
          `
        }}
      />

      {/* Subtle Electric Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px]" 
      />

      {/* Subtle Unified Grain/Noise Texture across entire Hero Section (~5% opacity) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay z-15"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* ========================================================================= */}
      {/* DESKTOP CENTER PORTRAIT: Mask-Wipe Reveal + Scroll Parallax (lg+ only)     */}
      {/* ========================================================================= */}
      <div 
        className="hidden lg:flex absolute inset-x-0 bottom-0 top-12 items-center justify-center pointer-events-none select-none z-10"
        style={{
          transform: prefersReducedMotion ? undefined : `translate3d(0, ${scrollY * 0.6}px, 0)`,
          willChange: prefersReducedMotion ? undefined : 'transform',
        }}
      >
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
          transition={{ 
            duration: prefersReducedMotion ? 0.2 : 0.7, 
            delay: prefersReducedMotion ? 0 : 0.5, 
            ease: cubicEase 
          }}
          className="relative w-full max-w-xl lg:max-w-2xl h-[85vh] max-h-[820px] flex items-end justify-center overflow-hidden"
          style={{
            willChange: 'transform, opacity, clip-path',
            maskImage: 'linear-gradient(to right, transparent 0%, black 14%, black 100%), linear-gradient(to bottom, black 0%, black 72%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 14%, black 100%), linear-gradient(to bottom, black 0%, black 72%, transparent 100%)',
            maskComposite: 'intersect',
            WebkitMaskComposite: 'source-in',
          }}
        >
          {/* Ambient Blue Halo Glow */}
          <div className="absolute top-12 w-80 sm:w-[480px] h-80 sm:h-[480px] rounded-full bg-gradient-to-b from-sky-400/25 via-cyan-500/15 to-transparent blur-3xl" />

          {/* High-Resolution Portrait with Left & Bottom Edge Mask, Desaturation, and Color Match */}
          <div className="relative z-10 h-full w-auto max-h-[800px] flex items-end justify-center">
            <img 
              src={mainMeImage} 
              alt="Dileep Sai Galla"
              className="h-full w-auto max-h-[800px] object-cover drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
              style={{
                imageRendering: 'auto',
                filter: 'saturate(0.9) brightness(0.96) contrast(1.04) hue-rotate(-2deg)',
                maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)',
                WebkitMaskComposite: 'source-in',
                maskComposite: 'intersect',
              }}
            />

            {/* Subtle theme accent color overlay */}
            <div 
              className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-20 bg-sky-500/30 rounded-3xl"
              style={{
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 90%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 90%)',
              }}
            />

            {/* Light Vignette Radial Overlay Div */}
            <div 
              className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_35%,transparent_38%,rgba(5,8,22,0.45)_75%,rgba(5,8,22,0.95)_100%)]" 
            />
          </div>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* FOREGROUND CONTENT: Desktop Flanking Layout + Mobile Clean Stack           */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center py-12 md:py-16">
        
        {/* DESKTOP LAYOUT (lg:) */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-center w-full">
          
          {/* LEFT SIDE: Welcome to my PORTFOLIO */}
          <div className="col-span-4 space-y-5 text-left max-w-md">
            <div className="space-y-1">
              <motion.p 
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ 
                  duration: prefersReducedMotion ? 0.2 : 0.4, 
                  delay: prefersReducedMotion ? 0 : 0.3, 
                  ease: cubicEase 
                }}
                className="text-base sm:text-lg md:text-xl font-medium tracking-wide text-slate-300 font-sans"
                style={{ willChange: 'transform, opacity' }}
              >
                Welcome to my
              </motion.p>
              
              <motion.h1 
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                transition={{ 
                  duration: prefersReducedMotion ? 0.2 : 0.5, 
                  delay: prefersReducedMotion ? 0 : 0.45, 
                  ease: cubicEase 
                }}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-blue-300 drop-shadow-[0_0_20px_rgba(56,189,248,0.25)] font-sans"
                style={{ willChange: 'transform, opacity' }}
              >
                PORTFOLIO
              </motion.h1>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <motion.button
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ 
                  duration: prefersReducedMotion ? 0.2 : 0.4, 
                  delay: prefersReducedMotion ? 0 : 0.75, 
                  ease: cubicEase 
                }}
                onClick={() => handleScrollTo('projects')}
                className="cursor-pointer px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/25 hover:shadow-[0_0_25px_rgba(56,189,248,0.45)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 ease-out flex items-center gap-2"
                style={{ willChange: 'transform, opacity' }}
              >
                <span>Explore Work</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ 
                  duration: prefersReducedMotion ? 0.2 : 0.4, 
                  delay: prefersReducedMotion ? 0 : 0.81, 
                  ease: cubicEase 
                }}
                onClick={() => generateResumePDF(resumeData)}
                className="cursor-pointer px-4.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-900/80 hover:bg-slate-800 text-white border border-sky-500/20 backdrop-blur-md hover:border-sky-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2"
                style={{ willChange: 'transform, opacity' }}
              >
                <Download className="w-4 h-4 text-sky-400" />
                <span>Resume</span>
              </motion.button>

              <motion.button
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ 
                  duration: prefersReducedMotion ? 0.2 : 0.4, 
                  delay: prefersReducedMotion ? 0 : 0.87, 
                  ease: cubicEase 
                }}
                onClick={onOpenBuilder}
                className="relative overflow-hidden cursor-pointer px-3.5 py-2.5 rounded-xl text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-1.5 group"
                title="Toggle Portfolio View"
                style={{ willChange: 'transform, opacity' }}
              >
                <span 
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-amber-300/25 to-transparent pointer-events-none"
                  style={{
                    animation: 'shimmerSweep 4.5s infinite linear'
                  }}
                />
                <Sliders className="w-3.5 h-3.5 text-amber-400 animate-pulse relative z-10" />
                <span className="relative z-10">Transformer</span>
              </motion.button>
            </div>

            {/* Social channels */}
            <motion.div 
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ 
                duration: prefersReducedMotion ? 0.2 : 0.4, 
                delay: prefersReducedMotion ? 0 : 0.93, 
                ease: cubicEase 
              }}
              className="pt-1 flex items-center gap-3.5 text-slate-400 text-xs font-mono"
              style={{ willChange: 'transform, opacity' }}
            >
              <a 
                href={resumeData.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-sky-400 transition-colors flex items-center gap-1.5 hover:scale-105 transform duration-150"
              >
                <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-700">•</span>
              <a 
                href={resumeData.github} 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5 hover:scale-105 transform duration-150"
              >
                <Github className="w-3.5 h-3.5 text-slate-300" />
                <span>GitHub</span>
              </a>
              <span className="text-slate-700">•</span>
              <a 
                href={`mailto:${resumeData.email}`}
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 hover:scale-105 transform duration-150"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Email</span>
              </a>
            </motion.div>
          </div>

          {/* CENTER SPACING: Dedicated space for portrait on desktop */}
          <div className="col-span-3 pointer-events-none" />

          {/* RIGHT SIDE: Glass Card */}
          <div className="col-span-5 flex justify-end translate-x-4 xl:translate-x-8">
            <motion.div 
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 30 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              transition={{ 
                duration: prefersReducedMotion ? 0.2 : 0.6, 
                delay: prefersReducedMotion ? 0 : 0.6, 
                ease: cubicEase 
              }}
              className="w-full max-w-sm backdrop-blur-2xl bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-left space-y-4 relative overflow-hidden"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />

              <motion.div 
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ 
                  duration: prefersReducedMotion ? 0.2 : 0.4, 
                  delay: prefersReducedMotion ? 0 : 0.65, 
                  ease: cubicEase 
                }}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-black/40 text-xs font-semibold text-white/90 backdrop-blur-md shadow-inner select-none"
                style={{ willChange: 'transform, opacity' }}
              >
                <span>Open to Work</span>
                <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                  <motion.span 
                    animate={prefersReducedMotion ? undefined : {
                      scale: [1, 1.15, 1],
                      opacity: [1, 0.6, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
                  />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                </span>
              </motion.div>

              <div className="space-y-2 pt-1">
                <motion.h3 
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={{ 
                    duration: prefersReducedMotion ? 0.2 : 0.4, 
                    delay: prefersReducedMotion ? 0 : 0.80, 
                    ease: cubicEase 
                  }}
                  className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight"
                  style={{ willChange: 'transform, opacity' }}
                >
                  Generative AI Engineer
                </motion.h3>

                <motion.h3 
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={{ 
                    duration: prefersReducedMotion ? 0.2 : 0.4, 
                    delay: prefersReducedMotion ? 0 : 0.95, 
                    ease: cubicEase 
                  }}
                  className="text-xl sm:text-2xl font-bold text-white/90 tracking-tight leading-tight"
                  style={{ willChange: 'transform, opacity' }}
                >
                  Full Stack Developer
                </motion.h3>

                <motion.h3 
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={{ 
                    duration: prefersReducedMotion ? 0.2 : 0.4, 
                    delay: prefersReducedMotion ? 0 : 1.10, 
                    ease: cubicEase 
                  }}
                  className="text-xl sm:text-2xl font-bold text-white/75 tracking-tight leading-tight"
                  style={{ willChange: 'transform, opacity' }}
                >
                  AI/ML Engineer
                </motion.h3>
              </div>

            </motion.div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* MOBILE / TABLET RESPONSIVE CLEAN FLOW (< lg) — ZERO OVERLAPPING           */}
        {/* ========================================================================= */}
        <div className="lg:hidden flex flex-col items-center text-center space-y-6 w-full max-w-lg mx-auto py-4">
          
          {/* 1. Header Text */}
          <div className="space-y-1.5 w-full">
            <motion.p 
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: cubicEase }}
              className="text-sm sm:text-base font-medium tracking-wide text-slate-300 font-sans"
            >
              Welcome to my
            </motion.p>
            
            <motion.h1 
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.25, ease: cubicEase }}
              className="text-4xl sm:text-5xl font-extrabold tracking-tight uppercase leading-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-blue-300 drop-shadow-[0_0_20px_rgba(56,189,248,0.25)] font-sans"
            >
              PORTFOLIO
            </motion.h1>
          </div>

          {/* 2. Beautiful Unobscured Mobile Portrait Container */}
          <motion.div 
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.35, ease: cubicEase }}
            className="relative w-64 sm:w-72 h-72 sm:h-80 rounded-3xl p-2 bg-gradient-to-b from-sky-500/15 via-slate-900/40 to-slate-950/80 border border-sky-500/25 shadow-2xl flex items-end justify-center overflow-hidden"
          >
            {/* Ambient Halo behind portrait */}
            <div className="absolute top-2 w-48 h-48 rounded-full bg-sky-400/20 blur-2xl pointer-events-none" />
            <img 
              src={mainMeImage} 
              alt="Dileep Sai Galla"
              className="relative z-10 w-auto h-full max-h-[300px] object-cover drop-shadow-xl"
              style={{
                filter: 'saturate(0.95) brightness(0.98)',
                maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
              }}
            />
          </motion.div>

          {/* 3. Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 w-full pt-1">
            <button
              onClick={() => handleScrollTo('projects')}
              className="cursor-pointer px-4.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/25 active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <span>Explore Work</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => generateResumePDF(resumeData)}
              className="cursor-pointer px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-900/90 text-white border border-sky-500/25 backdrop-blur-md active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-sky-400" />
              <span>Resume</span>
            </button>

            <button
              onClick={onOpenBuilder}
              className="cursor-pointer px-3.5 py-2.5 rounded-xl text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400 active:scale-[0.98] transition-all flex items-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Transformer</span>
            </button>
          </div>

          {/* 4. Social Links */}
          <div className="flex items-center justify-center gap-4 text-slate-400 text-xs font-mono pt-1">
            <a 
              href={resumeData.linkedin} 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5 text-sky-400" />
              <span>LinkedIn</span>
            </a>
            <span className="text-slate-700">•</span>
            <a 
              href={resumeData.github} 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5 text-slate-300" />
              <span>GitHub</span>
            </a>
            <span className="text-slate-700">•</span>
            <a 
              href={`mailto:${resumeData.email}`}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>Email</span>
            </a>
          </div>

          {/* 5. Mobile Glass Roles Card */}
          <div className="w-full max-w-sm backdrop-blur-2xl bg-white/[0.03] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center space-y-3 relative overflow-hidden mt-2">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-black/40 text-xs font-semibold text-white/90 backdrop-blur-md">
              <span>Open to Work</span>
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
            </div>

            <div className="space-y-1 pt-1">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Generative AI Engineer
              </h3>
              <h3 className="text-lg sm:text-xl font-bold text-white/90 tracking-tight">
                Full Stack Developer
              </h3>
              <h3 className="text-lg sm:text-xl font-bold text-white/75 tracking-tight">
                AI/ML Engineer
              </h3>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}


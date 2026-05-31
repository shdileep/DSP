import { motion } from 'motion/react';
import { Sparkles, Terminal, ArrowRight, Download, Cpu, Activity, ShieldAlert } from 'lucide-react';
import { ResumeData } from '../types';
import { generateResumePDF } from '../utils/generateResume';

interface ExecutiveHeroProps {
  resumeData: ResumeData;
  customOverlayColor: string;
  onToggleMode: () => void;
}

export default function ExecutiveHero({ resumeData, customOverlayColor, onToggleMode }: ExecutiveHeroProps) {
  return (
    <section 
      id="executive-hero" 
      className="min-h-screen pt-32 sm:pt-36 flex items-center relative overflow-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Decorative blueprint grids background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full pb-16 relative z-10">
        
        {/* Left Side: Advanced Title, Lead Statement, & Mock Console */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 space-y-8 text-left"
        >
          {/* Active indicator */}

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">
              Dileep Sai Galla
            </h1>
            <h2 className="text-lg sm:text-xl font-mono text-slate-400 font-medium">
              AI/ML Architect | Full Stack AI Engineer
            </h2>
            <div className="h-0.5 w-24 bg-gradient-to-r from-amber-500 to-indigo-500 mt-2" />
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans font-light">
            Recent Integrated M.Tech graduate in Software Engineering specializing in AI systems, data engineering, and scalable analytics workflows. Skilled in Python, SQL, ETL pipelines, and API optimization, with experience in LLM evaluation, edge-case analysis, and validating reliable AI-driven products.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('exec-projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="cursor-pointer px-6 py-3 rounded-xl bg-amber-500 text-black font-extrabold text-xs tracking-wider uppercase transition-all hover:bg-amber-400 shadow-xl shadow-amber-500/10 flex items-center gap-2"
            >
              <span>Explore Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => generateResumePDF(resumeData)}
              className="cursor-pointer px-6 py-3 rounded-xl bg-slate-950 border border-slate-850 hover:border-slate-700 text-white font-extrabold text-xs tracking-wider uppercase transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-amber-500" />
              <span>Download PDF</span>
            </button>
            
            <button
              onClick={onToggleMode}
              className="cursor-pointer px-5 py-3 rounded-xl border border-dashed border-sky-500/30 bg-sky-500/5 text-sky-400 font-extrabold text-xs tracking-wider uppercase transition-all hover:bg-sky-500/10 flex items-center gap-2"
            >
              <span>Toggle Portfolio A</span>
            </button>
          </div>
        </motion.div>

        {/* Right Side: Elegant McKinsey/Keynote Style Photo Frame */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          {/* Keynote board housing */}
          <div className="relative w-80 h-100 sm:w-88 sm:h-110 flex items-center justify-center p-4">
            
            {/* Elegant gradient glow ring */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/10 via-indigo-500/10 to-transparent rounded-[2.5rem] blur-2xl opacity-30 pointer-events-none" />
            
            {/* Double-Outline Premium Shadow Container */}
            <div className="absolute inset-0 rounded-[2.2rem] border border-slate-800 bg-slate-950/40 backdrop-blur-3xl shadow-2xl p-2.5 flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full rounded-[1.8rem] border border-slate-750/60 overflow-hidden group shadow-inner">
                
                {/* Image */}
                <img 
                  src="/src/assets/images/dileepgalla.jpeg"
                  alt="Dileep Sai Galla"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter grayscale contrast-110 brightness-95 group-hover:grayscale-0"
                />

                {/* Subtle gradient overlay to blend */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />

              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

import { motion } from 'motion/react';
import { 
  ExternalLink, 
  Settings, 
  Cpu, 
  Map, 
  Sparkles, 
  MessageSquare, 
  Trash2, 
  Activity, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import PreviewShell from './previews/PreviewShell';
import FitMitraPreview from './previews/FitMitraPreview';
import NextTripPreview from './previews/NextTripPreview';
import UjjwalHubPreview from './previews/UjjwalHubPreview';
import { ResumeData, ThemeStyle } from '../types';


interface ProjectsProps {
  resumeData: ResumeData;
  theme: ThemeStyle;
  customOverlayColor: string;
}

export default function Projects({ resumeData, theme, customOverlayColor }: ProjectsProps) {
  const isTerminal = theme === 'terminal-os';
  const isMinimal = theme === 'minimal-linear';
  const isSynth = theme === 'cyber-synth';

  const projects = resumeData.projects || [];

  // Map icons for projects based on words in title
  const getProjectIcon = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('nexttrip') || lower.includes('booking') || lower.includes('bus')) return Map;
    if (lower.includes('ujjwal') || lower.includes('waste') || lower.includes('route')) return Trash2;
    return Activity;
  };

  const sectionHeaderColor = isTerminal
    ? 'text-green-300 font-mono'
    : isSynth
    ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 font-extrabold'
    : 'text-white font-extrabold';

  const gridContainerStyles = "grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8";

  // Different theme backgrounds
  const cardStyles = (index: number) => {
    // Bento layout span
    let bentoSpan = "lg:col-span-12";
    if (index === 0) bentoSpan = "lg:col-span-12 xl:col-span-6";
    if (index === 1) bentoSpan = "lg:col-span-12 xl:col-span-6";
    if (index === 2) bentoSpan = "lg:col-span-12";

    const baseThemeBg = isTerminal
      ? 'border border-green-500/20 bg-black hover:border-green-500 rounded-lg p-6'
      : isSynth
      ? 'border border-pink-500/10 bg-purple-950/20 backdrop-blur-md hover:border-pink-500/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_20px_rgba(236,72,153,0.05)] hover:shadow-[0_0_25px_rgba(236,72,153,0.15)] transition-all'
      : isMinimal
      ? 'border border-slate-800 bg-[#0a0f1d] hover:border-slate-600 rounded-xl p-6 sm:p-8 transition-colors'
      : 'border border-slate-800/80 bg-slate-900/30 backdrop-blur-xl hover:border-sky-500/30 rounded-2xl p-6 sm:p-8 transition-all group duration-300';

    return `${bentoSpan} ${baseThemeBg} flex flex-col relative overflow-hidden text-left`;
  };

  return (
    <section id="projects" className="py-20 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title */}
      <div className="text-left mb-12">
        {isTerminal && (
          <span className="text-[11px] font-bold uppercase tracking-widest block font-mono text-green-500">
            {">"} COMPILE_LOGS_TARGETS: REPOS
          </span>
        )}
        <h2 className={`text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight ${sectionHeaderColor}`}>
          {isTerminal ? '_ls projects/featured/' : 'Core R&D Systems'}
        </h2>
        <div className={`h-1 w-20 mt-2 rounded ${isTerminal ? 'bg-green-500' : isSynth ? 'bg-pink-500' : 'bg-sky-400'}`} style={{ backgroundColor: !isTerminal && !isSynth ? customOverlayColor : undefined }} />
      </div>

      {/* Bento Grid */}
      <div className={gridContainerStyles}>
        {projects.map((proj, idx) => {
          const ProjIcon = getProjectIcon(proj.title);
          return (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={cardStyles(idx)}
            >
              {/* Glassmorphic glowing spotlight background element */}
              {!isTerminal && !isMinimal && (
                <div className={`absolute top-0 right-0 w-44 h-44 rounded-full filter blur-[80px] -z-10 opacity-15 pointer-events-none transition-all duration-500 group-hover:scale-120 group-hover:opacity-25 ${
                  isSynth ? 'bg-pink-500' : 'bg-sky-400'
                }`} 
                style={{ backgroundColor: !isSynth ? customOverlayColor : undefined }}
                />
              )}

              {/* Card Header */}
              <div className="flex items-center justify-between gap-4 border-b border-slate-800/60 pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border ${
                    isTerminal 
                      ? 'border-green-500/20 bg-green-500/5 text-green-400' 
                      : isSynth 
                      ? 'border-pink-500/20 bg-pink-500/5 text-pink-400' 
                      : 'border-slate-800 bg-slate-900/50 text-sky-400'
                  }`}
                  style={{ color: !isTerminal && !isSynth ? customOverlayColor : undefined }}
                  >
                    <ProjIcon className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className={`text-base sm:text-lg font-extrabold text-slate-100 ${isTerminal ? 'font-mono text-green-300' : ''}`}>
                      {proj.title}
                    </h3>
                    <p className={`text-[10px] font-semibold tracking-wider uppercase font-mono ${isTerminal ? 'text-green-500/70' : isSynth ? 'text-cyan-400/90' : 'text-sky-400/80'}`}
                      style={{ color: !isTerminal && !isSynth ? customOverlayColor + 'b8' : undefined }}
                    >
                      {proj.subtitle}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] text-slate-500 font-semibold font-mono whitespace-nowrap shrink-0">
                  {proj.duration}
                </span>
              </div>

              {/* Content Split: Left Info, Right Tech Visual Asset Dashboard (Interactive CSS images) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch flex-1">
                
                {/* Left side detail text */}
                <div className="md:col-span-7 flex flex-col justify-between space-y-4">


                  {/* Bullets lists */}
                  <div className="space-y-2">
                    <span className="font-bold text-[10px] text-slate-500 uppercase tracking-widest block font-mono">Core Metrics & Accomplishments:</span>
                    <ul className="space-y-2.5 text-xs">
                      {proj.bullets.map((bullet, bidx) => (
                        <li key={bidx} className="flex items-start gap-2.5 leading-relaxed">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isTerminal ? 'text-green-500' : isSynth ? 'text-pink-400' : 'text-sky-400'
                          }`}
                          style={{ color: !isTerminal && !isSynth ? customOverlayColor : undefined }}
                          />
                          <span className={isTerminal ? 'text-green-400/90' : 'text-slate-300'}>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* AI / Pipelines details */}
                  <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-xl space-y-1 mt-2">
                    <span className="font-bold text-[9px] text-slate-400 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                      <Cpu className={`w-3.5 h-3.5 ${isSynth ? 'text-pink-500' : 'text-sky-400'}`} style={{ color: !isTerminal && !isSynth ? customOverlayColor : undefined }} />
                      ORCHESTRATOR PIPELINE MATRIX
                    </span>
                    <p className="text-[10.5px] text-slate-400 leading-relaxed font-mono">
                      {proj.architecture}
                    </p>
                  </div>
                </div>

                {/* Right side high-fidelity visual asset mockups (satisfying "imag in the projects" and interactive cards) */}
                <div className="md:col-span-5 flex items-center justify-center">
                  <PreviewShell
                    accentColor={idx === 0 ? '#38bdf8' : idx === 1 ? '#10b981' : '#34d399'}
                    label={idx === 0 ? 'NextTrip AI · Live' : idx === 1 ? 'Ujjwal-Hub · Live' : 'FitMitra AI · Live'}
                  >
                    {idx === 0 && <NextTripPreview />}
                    {idx === 1 && <UjjwalHubPreview />}
                    {idx === 2 && <FitMitraPreview />}
                  </PreviewShell>
                </div>

              </div>

              {/* Technologies summary */}
              <div className="mt-6 pt-5 border-t border-slate-800/50 flex flex-wrap gap-1.5 items-center">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mr-1.5 font-mono">Stack:</span>
                {proj.stack.map(s => (
                  <span 
                    key={s} 
                    className={`text-[10px] p-1 px-2.5 rounded font-mono ${
                      isTerminal
                        ? 'bg-green-500/10 text-green-400 border border-green-500/10'
                        : isSynth
                        ? 'bg-purple-950/70 text-cyan-400 border border-cyan-500/10'
                        : 'bg-slate-950/80 text-slate-300 border border-slate-800'
                    }`}
                  >
                    {s}
                  </span>
                ))}
              </div>

            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

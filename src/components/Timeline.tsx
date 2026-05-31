import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, GraduationCap, ChevronRight } from 'lucide-react';
import { ResumeData, ThemeStyle } from '../types';

// Import actual logo images
import easehawkLogo from '../assets/images/easehawk_technologies_logo.jpg';
import engineercoreLogo from '../assets/images/engineercore.jpg';
import externsclubLogo from '../assets/images/externsclub_logo.jpg';

function CompanyLogo({ company, theme }: { company: string; theme: string }) {
  const isTerminal = theme === 'terminal-os';
  
  // High-end, premium responsive logo container styling
  const logoClass = `w-10 h-10 shrink-0 select-none object-contain rounded-xl border p-1 bg-slate-950/60 ${
    isTerminal ? 'border-green-500/30' : 'border-slate-800'
  }`;
  
  if (company.includes('Easehawk')) {
    return (
      <img src={easehawkLogo} alt="Easehawk Technologies" className={logoClass} />
    );
  }
  
  if (company.includes('Externsclub')) {
    return (
      <img src={externsclubLogo} alt="Externsclub" className={logoClass} />
    );
  }
  
  if (company.includes('Engineer Core')) {
    return (
      <img src={engineercoreLogo} alt="Engineer Core" className={logoClass} />
    );
  }
  return <Briefcase className="w-5 h-5 text-slate-550" />;
}

interface TimelineProps {
  resumeData: ResumeData;
  theme: ThemeStyle;
  customOverlayColor: string;
}

export default function Timeline({ resumeData, theme, customOverlayColor }: TimelineProps) {
  const isTerminal = theme === 'terminal-os';
  const isMinimal = theme === 'minimal-linear';
  const isSynth = theme === 'cyber-synth';

  const experience = resumeData.experience || [];
  const education = resumeData.education || [];

  const textHeaderColor = isTerminal
    ? 'text-green-350 font-mono'
    : isSynth
    ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 font-extrabold font-sans'
    : 'text-white font-extrabold font-sans tracking-tight';

  const titleHeader = (txt: string) => {
    return isTerminal ? `_ls ${txt.toLowerCase()}/` : txt;
  };

  // Professional and hygienic card background styling
  const cardStyles = isTerminal
    ? 'border border-green-500/20 bg-black/80 p-5 rounded-lg text-left transition-all font-mono'
    : isSynth
    ? 'border border-pink-500/10 bg-purple-950/15 backdrop-blur-2xl p-6 rounded-2xl hover:border-pink-500/30 transition-all text-left shadow-lg shadow-pink-500/5 hover:shadow-pink-500/10'
    : isMinimal
    ? 'border border-slate-800 bg-slate-950 p-6 rounded text-left hover:border-slate-700 transition-all'
    : 'border border-slate-800/80 bg-slate-900/30 hover:bg-slate-900/50 backdrop-blur-2xl p-6 rounded-2xl hover:border-slate-700 transition-all duration-300 text-left shadow-xl';

  const highlightText = (text: string) => {
    if (isTerminal) return 'text-yellow-400 font-mono';
    if (isSynth) return 'text-cyan-450';
    return 'text-sky-450';
  };

  return (
    <section id="experience" className="py-20 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Experience Timeline (Left column, width 7/12) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="text-left mb-6">
            {isTerminal && (
              <span className="text-[10px] font-bold uppercase tracking-widest block font-mono text-green-500">
                {">"} BASH: TELEMETRY JOB HISTORY
              </span>
            )}
            <h2 className={`text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight ${textHeaderColor}`}>
              {titleHeader('Work Experience')}
            </h2>
            <div className={`h-1 w-16 mt-2 rounded ${isTerminal ? 'bg-green-500' : isSynth ? 'bg-pink-500' : 'bg-sky-400'}`} style={{ backgroundColor: !isTerminal && !isSynth ? customOverlayColor : undefined }} />
          </div>

          {/* Vertical stack */}
          <div className="relative pl-5 sm:pl-6 border-l border-slate-800/50 space-y-8">
            {experience.map((exp, idx) => (
              <motion.div
                key={exp.company + exp.role}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="relative"
              >
                {/* Clean geometric ring node */}
                <span className={`absolute -left-[28px] sm:-left-[32px] top-4.5 w-3.5 h-3.5 rounded-full border-2 bg-[#050816] ${
                  isTerminal
                    ? 'border-green-500'
                    : isSynth
                    ? 'border-pink-500'
                    : 'border-sky-500'
                }`}
                style={{ borderColor: !isTerminal && !isSynth ? customOverlayColor : undefined }}
                />

                <div className={cardStyles}>
                  {/* Metadata top bar matching education layout */}
                  <div className="flex items-center justify-between gap-1.5 font-mono text-[10px] text-slate-400 mb-3.5 border-b border-white/5 pb-2">
                    <span className="flex items-center gap-1 bg-slate-950/60 border border-slate-800 p-1 px-2 rounded-full">
                      <Calendar className="w-3 h-3 text-slate-550" />
                      {exp.duration}
                    </span>
                    <span className="text-[9.5px] uppercase tracking-wider font-semibold text-slate-500">
                      {exp.location}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="flex items-start gap-3.5 text-left">
                    {/* Company Brand Logo */}
                    <div className="shrink-0 mt-0.5">
                      <CompanyLogo company={exp.company} theme={theme} />
                    </div>
                    
                    <div className="space-y-1.5 flex-1">
                      <h3 className={`text-base sm:text-lg font-bold text-slate-100 tracking-tight leading-snug ${isTerminal ? 'text-green-300 font-mono' : ''}`}>
                        {exp.role}
                      </h3>
                      
                      <p className={`text-xs sm:text-sm font-semibold tracking-wide ${isTerminal ? 'text-yellow-400' : isSynth ? 'text-pink-400' : 'text-sky-400'}`}
                        style={{ color: !isTerminal && !isSynth ? customOverlayColor : undefined }}
                      >
                        {exp.company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education Timeline (Right column, width 5/12) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="text-left mb-6">
            {isTerminal && (
              <span className="text-[10px] font-bold uppercase tracking-widest block font-mono text-green-500">
                {">"} ACCESS: ACADEMIC CREDENTIALS
              </span>
            )}
            <h2 className={`text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight ${textHeaderColor}`}>
              {titleHeader('Education')}
            </h2>
            <div className={`h-1 w-16 mt-2 rounded ${isTerminal ? 'bg-green-500' : isSynth ? 'bg-pink-500' : 'bg-sky-400'}`} style={{ backgroundColor: !isTerminal && !isSynth ? customOverlayColor : undefined }} />
          </div>

          <div className="relative pl-5 sm:pl-6 border-l border-slate-800/50 space-y-8">
            {education.map((edu, idx) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="relative"
              >
                {/* Node target dot */}
                <span className={`absolute -left-[28px] sm:-left-[32px] top-4.5 w-3.5 h-3.5 rounded-full border-2 bg-[#050816] ${
                  isTerminal
                    ? 'border-green-500'
                    : isSynth
                    ? 'border-cyan-400'
                    : 'border-indigo-500'
                }`}
                />

                <div className={cardStyles}>
                  <div className="flex items-center justify-between gap-1.5 font-mono text-[10px] text-slate-405 mb-3.5 border-b border-white/5 pb-2">
                    <span className="flex items-center gap-1 bg-slate-950/60 border border-slate-850 p-1 px-2 rounded-full">
                      <Calendar className="w-3 h-3 text-slate-550" />
                      {edu.duration}
                    </span>
                    <span className="text-[9.5px] uppercase tracking-wider font-semibold text-slate-500">
                      {edu.location}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 text-left">
                    <GraduationCap className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
                    <div>
                      <h3 className={`text-sm sm:text-base font-bold text-slate-100 tracking-tight leading-tight ${isTerminal ? 'text-green-300 font-mono' : ''}`}>
                        {edu.degree}
                      </h3>
                      <p className={`text-xs sm:text-sm font-semibold mt-1 tracking-wide ${isTerminal ? 'text-yellow-400' : isSynth ? 'text-pink-400' : 'text-sky-455'}`}
                        style={{ color: !isTerminal && !isSynth ? customOverlayColor : undefined }}
                      >
                        {edu.institution}
                      </p>
                    </div>
                  </div>

                  {/* Clean conditioning for final Grade/CGPA value displays without verbose titles */}
                  {(edu.cgpa || edu.percentage) && (
                    <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs font-sans">
                      <span className="text-slate-400 font-medium">Scored Grade:</span>
                      <span className={`font-mono font-black p-1 px-3 rounded-md text-[11px] ${
                        isTerminal 
                          ? 'bg-green-500/10 text-green-400' 
                          : isSynth 
                          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-505/20'
                      }`}>
                        {edu.cgpa ? `CGPA ${edu.cgpa}/10` : `Percentage: ${edu.percentage}`}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

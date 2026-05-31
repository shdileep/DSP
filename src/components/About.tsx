import { motion } from 'motion/react';
import { Award, BookOpen, Briefcase, FileText, CheckCircle2 } from 'lucide-react';
import { ResumeData, ThemeStyle } from '../types';

interface AboutProps {
  resumeData: ResumeData;
  theme: ThemeStyle;
  customOverlayColor: string;
}

export default function About({ resumeData, theme, customOverlayColor }: AboutProps) {
  const isTerminal = theme === 'terminal-os';
  const isMinimal = theme === 'minimal-linear';
  const isSynth = theme === 'cyber-synth';

  const items = [
    {
      icon: BookOpen,
      title: 'Academic Credentials',
      desc: 'Pursuing Integrated M.Tech at Vellore Institute of Technology, Chennai (Aug 2021 - May 2026).',
      highlight: 'M.Tech Candidate'
    },
    {
      icon: Award,
      title: 'Intellectual Property Record',
      desc: 'Invented and filed Utility Patent: "System and Method for Optimizing Garbage Collection Operations" (App No: 202641010900).',
      highlight: 'Patent Filed'
    },
    {
      icon: Briefcase,
      title: 'Production Internships',
      desc: 'Shipped AI architectures, vLLM prompt engines, and full-stack platforms at Easehawk Technologies and Externsclub.',
      highlight: '3 Engineering Internships'
    }
  ];

  const containerStyles = isTerminal
    ? 'border border-green-500/20 bg-black/45 p-6 rounded-xl font-mono'
    : isSynth
    ? 'border border-pink-500/20 bg-purple-950/20 backdrop-blur-md p-8 rounded-2xl relative shadow-[0_0_20px_rgba(236,72,153,0.05)]'
    : isMinimal
    ? 'border border-slate-800 bg-[#0a0f1d] p-8 rounded-xl'
    : 'border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl p-8 rounded-2xl';

  const textHeaderColor = isTerminal
    ? 'text-green-300'
    : isSynth
    ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 font-extrabold'
    : 'text-white';

  const cardBackground = isTerminal
    ? 'border border-green-500/10 bg-black/75 hover:border-green-500/30'
    : isSynth
    ? 'border border-pink-500/10 bg-purple-950/40 hover:shadow-[0_0_12px_rgba(236,72,153,0.2)] text-slate-300 hover:border-pink-500/30'
    : isMinimal
    ? 'border border-slate-800 hover:border-slate-700 bg-slate-950'
    : 'border border-slate-800/60 hover:border-sky-500/20 hover:bg-slate-900/65 bg-slate-900/60';

  return (
    <section id="about" className="py-20 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title */}
      <div className="text-left mb-12">
        <h2 className={`text-2xl sm:text-3xl font-extrabold ${textHeaderColor}`}>
          {isTerminal ? '_cat about_me.md' : 'About Me'}
        </h2>
        <div className={`h-1 w-20 mt-2 rounded ${isTerminal ? 'bg-green-500' : isSynth ? 'bg-pink-500' : 'bg-sky-400'}`} style={{ backgroundColor: !isTerminal && !isSynth ? customOverlayColor : undefined }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left narrative content */}
        <div className="lg:col-span-6 space-y-6">
          <div className={containerStyles}>
            <p className={`leading-relaxed text-sm ${isTerminal ? 'text-green-400' : 'text-slate-300'}`}>
              I am Dileep Sai Galla, an <strong>AI Systems Engineer and Architect</strong>. I specialize in merging advanced Machine Learning heuristics with reliable full-stack application development. 
              <br /><br />
              Throughout my academic tenure at <strong>Vellore Institute of Technology (VIT Chennai)</strong>, I have worked deeply on resolving performance degradation issues in retrieval frameworks, orchestrating multiple AI agents via prompt tuning, and accelerating routing computations using pathfinding algorithms.
            </p>
          </div>
        </div>

        {/* Right side bento cards */}
        <div className="lg:col-span-6 space-y-4">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`p-5 rounded-xl transition-all text-left flex gap-4 ${cardBackground}`}
              >
                <div className={`p-2.5 rounded-lg shrink-0 h-fit ${isTerminal ? 'bg-green-500/15 text-green-400' : isSynth ? 'bg-pink-500/10 text-pink-400' : 'bg-sky-500/10 text-sky-400'}`}
                  style={{
                    backgroundColor: !isTerminal && !isSynth ? customOverlayColor + '15' : undefined,
                    color: !isTerminal && !isSynth ? customOverlayColor : undefined
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className={`text-sm font-bold text-slate-200 ${isTerminal ? 'font-mono text-green-300' : ''}`}>
                      {item.title}
                    </h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${isTerminal ? 'bg-green-500/10 text-green-400' : isSynth ? 'bg-pink-500/10 text-pink-400' : 'bg-sky-500/10 text-sky-400'}`}
                      style={{
                        backgroundColor: !isTerminal && !isSynth ? customOverlayColor + '15' : undefined,
                        color: !isTerminal && !isSynth ? customOverlayColor : undefined
                      }}
                    >
                      {item.highlight}
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isTerminal ? 'text-green-400/80' : 'text-slate-400'}`}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

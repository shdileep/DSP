import { motion } from 'motion/react';
import { 
  Cpu, 
  Globe, 
  Workflow, 
  Cloud, 
  Database, 
  Code2, 
  Terminal, 
  Layout, 
  Settings, 
  Shield 
} from 'lucide-react';
import { ResumeData, ThemeStyle } from '../types';

interface SkillsProps {
  resumeData: ResumeData;
  theme: ThemeStyle;
  customOverlayColor: string;
}

export default function Skills({ resumeData, theme, customOverlayColor }: SkillsProps) {
  const isTerminal = theme === 'terminal-os';
  const isMinimal = theme === 'minimal-linear';
  const isSynth = theme === 'cyber-synth';

  // Fallback to static skills if JSON fails, but link cleanly to JSON-sync state first!
  const getCategories = () => {
    if (resumeData.skills && resumeData.skills.length > 0) {
      return resumeData.skills;
    }
    // Dynamic static fallback matching the PDF exactly
    return [
      {
        category: "AI/ML",
        items: ["Python", "TensorFlow", "PyTorch", "Hugging Face", "NLP Pipelines", "Scikit-Learn"]
      },
      {
        category: "Full Stack",
        items: ["React", "Angular", "Node.js", "Express", "FastAPI", "PHP", "SQL / Java", "TypeScript"]
      },
      {
        category: "AI Architecture",
        items: ["Agentic AI Systems", "Multi-Agent Workflows", "LangChain", "Vector Databases", "Prompt Engineering"]
      },
      {
        category: "Cloud / DevOps",
        items: ["Docker", "Firebase", "AWS / Vercel", "Git / GitHub / GitLab", "CI/CD Pipelines", "Playwright & Postman"]
      }
    ];
  };

  const categories = getCategories();

  // Dynamic helper to give professional individual icons to skills badges
  const getSkillIcon = (skill: string) => {
    const s = skill.toLowerCase();
    if (s.includes('python') || s.includes('typescript') || s.includes('php') || s.includes('sql') || s.includes('java') || s.includes('javascript')) {
      return Code2;
    }
    if (s.includes('tensorflow') || s.includes('pytorch') || s.includes('hugging') || s.includes('nlp') || s.includes('classifier') || s.includes('ml') || s.includes('scikit')) {
      return Cpu;
    }
    if (s.includes('react') || s.includes('angular') || s.includes('node') || s.includes('express') || s.includes('fastapi')) {
      return Globe;
    }
    if (s.includes('agent') || s.includes('prompt') || s.includes('langchain') || s.includes('workflow')) {
      return Workflow;
    }
    if (s.includes('docker') || s.includes('firebase') || s.includes('aws') || s.includes('git') || s.includes('ci/cd') || s.includes('pipeline')) {
      return Cloud;
    }
    if (s.includes('database') || s.includes('chromadb') || s.includes('mysql') || s.includes('postgresql')) {
      return Database;
    }
    if (s.includes('auth') || s.includes('jwt') || s.includes('secure') || s.includes('compliance')) {
      return Shield;
    }
    if (s.includes('playwright') || s.includes('postman') || s.includes('test') || s.includes('tool')) {
      return Settings;
    }
    return Terminal;
  };

  // Pick category icon
  const getIcon = (catName: string) => {
    const lower = catName.toLowerCase();
    if (lower.includes('ai') && lower.includes('ml')) return Cpu;
    if (lower.includes('architecture') || lower.includes('workflow')) return Workflow;
    if (lower.includes('cloud') || lower.includes('devops') || lower.includes('tools')) return Cloud;
    return Globe;
  };

  const cardStyles = isTerminal
    ? 'border border-green-500/20 bg-black/80 p-5 rounded-lg'
    : isSynth
    ? 'border border-pink-500/10 bg-purple-950/20 backdrop-blur-md p-6 rounded-2xl shadow-[0_0_15px_rgba(236,72,153,0.05)] hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] group transition-all duration-300'
    : isMinimal
    ? 'border border-slate-800 bg-slate-950 p-6 rounded-xl hover:border-slate-700 transition-all'
    : 'border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl group hover:border-sky-500/30 transition-all duration-300';

  const categoryHeader = isTerminal
    ? 'text-yellow-400 font-mono text-sm border-b border-green-500/15 pb-2 mb-4 flex items-center gap-2'
    : isSynth
    ? 'text-pink-400 font-extrabold text-base flex items-center gap-2'
    : 'text-slate-100 font-bold text-base flex items-center gap-2';

  const badgeStyles = isTerminal
    ? 'border border-green-500/20 bg-black text-green-400 font-mono text-[11px] p-1 px-2 rounded hover:border-green-500 flex items-center gap-1.5'
    : isSynth
    ? 'bg-purple-950/60 text-pink-300 hover:text-cyan-400 border border-pink-500/10 hover:border-cyan-400/30 text-[11px] p-1 px-2.5 rounded-full transition-all flex items-center gap-1.5 hover:shadow-[0_0_8px_rgba(34,211,238,0.3)]'
    : isMinimal
    ? 'bg-slate-900 text-slate-300 border border-slate-800 text-[11px] p-1 px-2.5 rounded flex items-center gap-1.5'
    : 'bg-slate-900/60 text-slate-300 hover:text-sky-400 border border-slate-800 hover:border-sky-500/25 text-[11.5px] p-1.5 px-3 rounded-lg transition-all flex items-center gap-1.5';

  return (
    <section id="skills" className="py-20 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Heading */}
      <div className="text-left mb-12">
        {isTerminal && (
          <span className="text-xs font-bold uppercase tracking-widest block text-green-500 font-mono">
            {">"} TELEMETRY --CHECKPOINT: SKILL
          </span>
        )}
        <h2 className={`text-2xl sm:text-3xl font-extrabold mt-1 ${isTerminal ? 'text-green-300 font-mono' : isSynth ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400' : 'text-white'}`}>
          {isTerminal ? '_ls skills/' : 'Technical Skills'}
        </h2>
        <div className={`h-1 w-20 mt-2 rounded ${isTerminal ? 'bg-green-500' : isSynth ? 'bg-pink-500' : 'bg-sky-400'}`} style={{ backgroundColor: !isTerminal && !isSynth ? customOverlayColor : undefined }} />
      </div>

      {/* Grid of categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {categories.map((cat, idx) => {
          const Icon = getIcon(cat.category);
          return (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={cardStyles}
            >
              {/* Category Header Info */}
              <div className="flex items-center justify-between mb-4.5">
                <div className={categoryHeader}>
                  <div className={`p-1.5 rounded-md ${isTerminal ? 'bg-green-500/10 text-green-400' : isSynth ? 'bg-pink-500/10 text-pink-400' : 'bg-sky-500/10 text-sky-400'}`}
                    style={{
                      backgroundColor: !isTerminal && !isSynth ? customOverlayColor + '10' : undefined,
                      color: !isTerminal && !isSynth ? customOverlayColor : undefined
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`${isTerminal ? 'font-mono' : 'font-sans'}`}>{cat.category}</span>
                </div>
                
                {!isTerminal && (
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                    READY TO DEPLOY
                  </span>
                )}
              </div>

              {/* Skills Capsules */}
              <div className="flex flex-wrap gap-2 pt-2">
                {cat.items.map((item) => {
                  const SkillIcon = getSkillIcon(item);
                  return (
                    <div
                      key={item}
                      className={badgeStyles}
                    >
                      <SkillIcon className={`w-3.5 h-3.5 ${isTerminal ? 'text-green-500' : isSynth ? 'text-pink-400' : 'text-sky-400'}`}
                        style={{ color: !isTerminal && !isSynth ? customOverlayColor : undefined }}
                      />
                      <span className="font-medium">{item}</span>
                    </div>
                  );
                })}
              </div>

            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

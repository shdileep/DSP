import { motion } from 'motion/react';
import { Cpu, Terminal, Layers, TrendingUp } from 'lucide-react';
import { ResumeData } from '../types';

interface ExecutiveDashboardProps {
  resumeData: ResumeData;
}

export default function ExecutiveDashboard({ resumeData }: ExecutiveDashboardProps) {
  const metrics = [
    { label: 'Projects Shipped', value: '12+', progress: 95, desc: 'Production AI & Web Solutions' },
    { label: 'AI Systems Built', value: '8+', progress: 85, desc: 'RAG, NLP, & Classifier pipelines' },
    { label: 'Technologies', value: '25+', progress: 90, desc: 'Python, JS, C++, Kotlin, PyTorch' },
    { label: 'Certifications', value: '6+', progress: 100, desc: 'IBM, HackerRank validated' },
    { label: 'Research & IP Record', value: '1 Patent', progress: 100, desc: 'Garbage Collection Routing Patent' },
    { label: 'Engineering Internships', value: '3 Shipped', progress: 100, desc: 'Easehawk, Externsclub, Core' }
  ];

  const coreExpertise = [
    { title: 'Agentic AI', rate: '95%', desc: 'Autonomous agent design, prompt templates routing, task decomposition.' },
    { title: 'Multi-Agent Systems', rate: '92%', desc: 'Orchestrated parallel worker queues, state synchronization loops.' },
    { title: 'RAG Pipelines', rate: '98%', desc: 'Hybrid semantic-keyword search matching, dense vector indexes, low-latency recall.' },
    { title: 'LLM Engineering', rate: '90%', desc: 'vLLM optimization, model evaluation metrics, temperature/hyperparameters tuning.' },
    { title: 'AI Architecture', rate: '94%', desc: 'FastAPI microservices interfaces, Celery task brokers, PostgreSQL schemas.' },
    { title: 'Full Stack Development', rate: '96%', desc: 'React 18 state reconciliation, TypeScript strict typing, responsive Tailwind.' },
    { title: 'Cloud Infrastructure', rate: '88%', desc: 'Dockerized microservices deployment, AWS ECS containers scaling, Vercel hooks.' },
    { title: 'MLOps', rate: '92%', desc: 'Data engineering pipelines, TF-IDF feature extractions, validation accuracy profiling.' }
  ];

  return (
    <section id="exec-dashboard" className="py-20 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="space-y-20">
        
        {/* Metric Cockpit Bento Boxes */}
        <div>
          <div className="text-left mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              AI Impact & System Telemetry
            </h2>
            <div className="h-0.5 w-24 bg-gradient-to-r from-amber-500 to-indigo-500 mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map((metric, idx) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="p-6 rounded-2xl bg-slate-950 border border-slate-900 shadow-xl flex flex-col justify-between hover:border-amber-500/25 transition-all text-left relative overflow-hidden"
              >
                {/* Visual grid highlight */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/5 via-transparent to-transparent pointer-events-none" />
                
                <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{metric.label}</span>
                  <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-4xl font-black text-white font-mono tracking-tight">{metric.value}</span>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">{metric.progress}% SYSTEM_LOCK</span>
                  </div>

                  {/* Tech status bar */}
                  <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-indigo-500 rounded-full" 
                      style={{ width: `${metric.progress}%` }}
                    />
                  </div>
                </div>

                <p className="text-xs text-slate-400 font-sans leading-relaxed mt-4 font-light">{metric.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Expertise Grid */}
        <div>
          <div className="text-left mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Architectural Domains
            </h2>
            <div className="h-0.5 w-24 bg-gradient-to-r from-amber-500 to-indigo-500 mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreExpertise.map((exp, idx) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="p-6 rounded-2xl bg-slate-900/35 border border-slate-800/80 hover:border-slate-700 transition-all text-left flex flex-col justify-between space-y-4 shadow-lg relative"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">IDX: {exp.rate}</span>
                  </div>
                  
                  <h3 className="text-xs font-bold text-slate-100 uppercase tracking-widest font-mono">
                    {exp.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
                  {exp.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}

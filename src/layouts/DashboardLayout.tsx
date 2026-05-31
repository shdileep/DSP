import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Database, 
  Activity, 
  Terminal, 
  Layers, 
  Server, 
  Shield, 
  Network, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Sliders,
  FolderKanban,
  Award
} from 'lucide-react';
import { ResumeData, ThemeStyle } from '../types';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Timeline from '../components/Timeline';
import Certifications from '../components/Certifications';
import Blogs from '../components/Blogs';
import Contact from '../components/Contact';
import profilePic from '../assets/images/dileepgalla.jpeg';

interface DashboardLayoutProps {
  resumeData: ResumeData;
  theme: ThemeStyle;
  customOverlayColor: string;
  onOpenBuilder: () => void;
}

export default function DashboardLayout({
  resumeData,
  theme,
  customOverlayColor,
  onOpenBuilder
}: DashboardLayoutProps) {
  const isTerminal = theme === 'terminal-os';
  const isSynth = theme === 'cyber-synth';
  
  // Custom mock live telemetry stats
  const [metrics, setMetrics] = useState({
    apiLatency: '142ms',
    modelLoad: '48.2%',
    ragRecall: '96.8%',
    activeAgents: '4',
    telemetryRate: '4.8s/p'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        apiLatency: `${Math.floor(120 + Math.random() * 40)}ms`,
        modelLoad: `${(45 + Math.random() * 10).toFixed(1)}%`,
        ragRecall: `${(95 + Math.random() * 4).toFixed(1)}%`,
        activeAgents: `${Math.floor(3 + Math.random() * 3)}`,
        telemetryRate: `${(4.0 + Math.random() * 1.5).toFixed(1)}s/p`
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Bento Grid Header / Command Center Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 mt-16">
        
        {/* Module 1: AI Command Bio & HUD Photo Frame */}
        <div className={`lg:col-span-8 p-6 rounded-2xl border flex flex-col justify-between relative overflow-hidden min-h-[340px] ${
          isTerminal ? 'border-green-500/20 bg-black' : isSynth ? 'border-pink-500/20 bg-purple-950/20' : 'border-slate-800/80 bg-slate-900/40 backdrop-blur-xl'
        }`}>
          {/* Cyber accents */}
          <div className="absolute top-0 right-0 w-20 h-20 border-r border-t border-sky-500/20 rounded-tr-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-20 h-20 border-l border-b border-sky-500/20 rounded-bl-2xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            
            {/* HUD Profile Frame */}
            <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
              {/* Outer spinning hex-styled indicator */}
              <div className="absolute inset-0 rounded-xl border border-dashed border-sky-400/40 animate-spin-slow" 
                style={{ borderColor: !isTerminal && !isSynth ? customOverlayColor + '40' : undefined }}
              />
              {/* Inner scanning laser */}
              <div className="absolute inset-2 border border-sky-500/20 rounded-lg overflow-hidden flex items-center justify-center bg-slate-950/85">
                <img 
                  src={profilePic}
                  alt="Dileep Sai Galla"
                  className="w-full h-full object-cover grayscale brightness-90 contrast-110 hover:grayscale-0 transition-all duration-300"
                />
                
                {/* HUD scanlines */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] opacity-40" />
                
                {/* Glowing target crosshair */}
                <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-sky-400" style={{ borderColor: !isTerminal && !isSynth ? customOverlayColor : undefined }} />
                <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-sky-400" style={{ borderColor: !isTerminal && !isSynth ? customOverlayColor : undefined }} />
                <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-sky-400" style={{ borderColor: !isTerminal && !isSynth ? customOverlayColor : undefined }} />
                <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-sky-400" style={{ borderColor: !isTerminal && !isSynth ? customOverlayColor : undefined }} />
              </div>
              
              {/* Core digital tag */}
              <span className="absolute -bottom-2 px-2 py-0.5 rounded text-[8px] bg-slate-900 border border-slate-700 text-sky-400 font-mono tracking-widest uppercase">
                {isTerminal ? 'ID: G_OS_SYS' : 'ID: AI_ARCH'}
              </span>
            </div>

            {/* Title / Description info */}
            <div className="space-y-4 text-center md:text-left flex-1">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase font-bold" style={{ color: !isTerminal && !isSynth ? customOverlayColor : undefined }}>
                  {isTerminal ? '// PIPELINE HOST ONLINE' : 'System AI Architect'}
                </span>
                <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
                  {resumeData.name}
                </h1>
                <p className="text-xs text-slate-400 mt-1 font-mono">{resumeData.title}</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                Recent Integrated M.Tech graduate in Software Engineering specializing in GenAI engineering, custom RAG indexing, and high-performance server architectures.
              </p>

              <div className="flex flex-wrap gap-2.5 justify-center md:justify-start">
                <span className="px-2.5 py-1 rounded bg-slate-900/60 border border-slate-800 text-[10px] font-mono text-slate-300">
                  ⚡ latency: {metrics.apiLatency}
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900/60 border border-slate-800 text-[10px] font-mono text-slate-300">
                  🤖 models: llama3 / deepseek / t5
                </span>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>CORE WORKFLOW: SYSTEM RUNNING</span>
            </span>
            <button 
              onClick={onOpenBuilder}
              className="text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
              style={{ color: !isTerminal && !isSynth ? customOverlayColor : undefined }}
            >
              Configure Live Dashboard <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Module 2: Live AI Analytics Grid */}
        <div className={`lg:col-span-4 p-6 rounded-2xl border flex flex-col justify-between ${
          isTerminal ? 'border-green-500/20 bg-black' : isSynth ? 'border-pink-500/20 bg-purple-950/20' : 'border-slate-800/80 bg-slate-900/40 backdrop-blur-xl'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono tracking-widest text-slate-300 uppercase">Live Systems Monitor</span>
              <Activity className="w-4 h-4 text-sky-400 animate-pulse" style={{ color: !isTerminal && !isSynth ? customOverlayColor : undefined }} />
            </div>

            <div className="space-y-3 font-mono text-[11px]">
              
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/40">
                <span className="text-slate-450">GPU MEM CORE LOAD</span>
                <span className="text-white font-bold">{metrics.modelLoad}</span>
              </div>
              
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/40">
                <span className="text-slate-450">RAG HEURISTICS RECALL</span>
                <span className="text-emerald-400 font-bold">{metrics.ragRecall}</span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/40">
                <span className="text-slate-450">ACTIVE WORKSPACE AGENTS</span>
                <span className="text-sky-450 font-bold">{metrics.activeAgents} units</span>
              </div>

              <div className="flex justify-between items-center py-1.5">
                <span className="text-slate-450">TELEMETRY POLL RATE</span>
                <span className="text-yellow-500 font-bold">{metrics.telemetryRate}</span>
              </div>

            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-850 text-[10px] font-mono text-slate-450 leading-normal">
            <span className="font-bold text-white block mb-0.5">Active IP Registry:</span>
            Invented System & Method for Waste Route Optimization [Patent Filed App: 202641010900]
          </div>
        </div>

      </div>

      {/* Grid of Bento-Box Components */}
      <div className="space-y-12 mt-12">
        
        {/* Section A: Skills System (Telemetry Matrix) */}
        <div>
          <div className="text-left mb-6">
            <span className="text-xs text-sky-400 font-mono tracking-wider font-bold" style={{ color: !isTerminal && !isSynth ? customOverlayColor : undefined }}>[SECTION_01: CAPABILITY_MATRIX]</span>
            <h2 className="text-xl font-extrabold text-white mt-1">Skills Telemetry Grid</h2>
          </div>
          <Skills resumeData={resumeData} theme={theme} customOverlayColor={customOverlayColor} />
        </div>

        {/* Section B: Projects Panel (Simulators Expanded) */}
        <div>
          <div className="text-left mb-6">
            <span className="text-xs text-sky-400 font-mono tracking-wider font-bold" style={{ color: !isTerminal && !isSynth ? customOverlayColor : undefined }}>[SECTION_02: EXPERIMENTAL_SANDBOXES]</span>
            <h2 className="text-xl font-extrabold text-white mt-1">Interactive Project Simulators</h2>
          </div>
          <Projects resumeData={resumeData} theme={theme} customOverlayColor={customOverlayColor} />
        </div>

        {/* Section C: Live Timeline Feed */}
        <div>
          <div className="text-left mb-6">
            <span className="text-xs text-sky-400 font-mono tracking-wider font-bold" style={{ color: !isTerminal && !isSynth ? customOverlayColor : undefined }}>[SECTION_03: TIMESTEP_LOGS]</span>
            <h2 className="text-xl font-extrabold text-white mt-1">Experience Timelines & Versioning</h2>
          </div>
          <Timeline resumeData={resumeData} theme={theme} customOverlayColor={customOverlayColor} />
        </div>

        {/* Section D: Blogs / Credentials */}
        <div className={`grid grid-cols-1 ${resumeData.blogs && resumeData.blogs.length > 0 ? 'lg:grid-cols-2' : ''} gap-8`}>
          
          <div className={`p-6 rounded-2xl border ${
            isTerminal ? 'border-green-500/20 bg-black' : isSynth ? 'border-pink-500/20 bg-purple-950/20' : 'border-slate-800/80 bg-slate-900/40'
          }`}>
            <h3 className="text-md font-bold text-white mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-sky-400" style={{ color: !isTerminal && !isSynth ? customOverlayColor : undefined }} />
              <span>Certifications Index</span>
            </h3>
            <Certifications certifications={resumeData.certifications} theme={theme} customOverlayColor={customOverlayColor} />
          </div>

          {resumeData.blogs && resumeData.blogs.length > 0 && (
            <div className={`p-6 rounded-2xl border ${
              isTerminal ? 'border-green-500/20 bg-black' : isSynth ? 'border-pink-500/20 bg-purple-950/20' : 'border-slate-800/80 bg-slate-900/40'
            }`}>
              <h3 className="text-md font-bold text-white mb-4 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-purple-400" />
                <span>Articles & System Manuals</span>
              </h3>
              <Blogs blogs={resumeData.blogs} theme={theme} customOverlayColor={customOverlayColor} />
            </div>
          )}

        </div>

        {/* Section E: Contact */}
        <Contact resumeData={resumeData} theme={theme} customOverlayColor={customOverlayColor} />

      </div>

      {/* System Footer Accent */}
      <footer className="mt-16 pt-8 border-t border-slate-900 text-center text-xs font-mono text-slate-500">
        <div>Dileep Sai Galla &copy; {new Date().getFullYear()} — Dashboard Layout Mode v1.2</div>
      </footer>

    </div>
  );
}

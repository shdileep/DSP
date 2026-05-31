import { ResumeData, ThemeStyle } from '../types';
import ExecutiveHero from './ExecutiveHero';
import ExecutiveDashboard from './ExecutiveDashboard';
import ExecutiveProjects from './ExecutiveProjects';
import ExecutiveArchitecture from './ExecutiveArchitecture';
import ExecutiveExperience from './ExecutiveExperience';
import ExecutiveEducation from './ExecutiveEducation';
import ExecutiveResearch from './ExecutiveResearch';
import ExecutiveContact from './ExecutiveContact';
import { 
  Cpu, 
  ArrowUp,
  Code2,
  Brain,
  Github,
  Linkedin,
  Mail
} from 'lucide-react';

interface AdvancedExecutivePortfolioProps {
  resumeData: ResumeData;
  theme: ThemeStyle;
  customOverlayColor: string;
  onToggleMode: () => void;
}

export default function AdvancedExecutivePortfolio({
  resumeData,
  theme,
  customOverlayColor,
  onToggleMode
}: AdvancedExecutivePortfolioProps) {
  const isTerminal = theme === 'terminal-os';
  const isSynth = theme === 'cyber-synth';

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="text-slate-100 bg-[#070913] min-h-screen">
      
      {/* 1. Hero Section */}
      <ExecutiveHero 
        resumeData={resumeData}
        customOverlayColor={customOverlayColor}
        onToggleMode={onToggleMode}
      />

      {/* 2. AI Impact Dashboard (Metrics & Capabilities) */}
      <ExecutiveDashboard 
        resumeData={resumeData}
      />

      {/* 3. Featured Engineering Systems (Case Studies) */}
      <ExecutiveProjects 
        resumeData={resumeData}
      />

      {/* 4. AI Multi-Agent Pipeline Showcase & Developer Intelligence Center */}
      <ExecutiveArchitecture />

      {/* 5. Professional Chronology Experiences */}
      <ExecutiveExperience 
        resumeData={resumeData}
      />

      {/* 5.5. Academic credentials */}
      <ExecutiveEducation 
        resumeData={resumeData}
      />

      {/* 6. Scientific Publications & Certifications */}
      <ExecutiveResearch 
        resumeData={resumeData}
      />

      {/* 7. Consultation contact */}
      <ExecutiveContact 
        resumeData={resumeData}
      />

      {/* 8. Unified Footer matching Website A */}
      <footer className={`pt-20 pb-12 border-t transition-all duration-300 relative ${
        isTerminal 
          ? 'border-green-500/10 bg-[#020502] text-green-400 font-mono' 
          : isSynth 
          ? 'border-pink-500/15 bg-[#090215] text-pink-300' 
          : 'border-slate-800/40 bg-slate-950 text-slate-300'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 text-left">
            
            {/* Column 1: Expert Bio & Identity */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-xl ${
                  isTerminal ? 'bg-green-500/10 text-green-400' : isSynth ? 'bg-pink-500/10 text-pink-400' : 'bg-sky-500/10 text-sky-400'
                }`}
                style={{
                  backgroundColor: !isTerminal && !isSynth ? customOverlayColor + '10' : undefined,
                  color: !isTerminal && !isSynth ? customOverlayColor : undefined
                }}
                >
                  <Cpu className="w-5 h-5 animate-pulse" />
                </div>
                <span className={`text-lg font-bold tracking-tight ${isTerminal ? 'text-green-300' : 'text-white'}`}>
                  {resumeData.name}
                </span>
              </div>
              <p className={`text-xs leading-relaxed ${isTerminal ? 'text-green-500/60' : 'text-slate-400'}`}>
                {resumeData.title}. Graduated with an Integrated M.Tech in Software Engineering from VIT Chennai. Specializing in high-performance full-stack architectures and agentic AI.
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <span className={`px-2 py-1 rounded-md text-[10px] font-semibold tracking-wider uppercase ${
                  isTerminal ? 'bg-green-950/40 text-green-400 border border-green-500/20' : 'bg-slate-900 border border-white/5 text-slate-400'
                }`}>
                  M.Tech SE
                </span>
                <span className={`px-2 py-1 rounded-md text-[10px] font-semibold tracking-wider uppercase ${
                  isTerminal ? 'bg-green-950/40 text-green-400 border border-green-500/20' : 'bg-slate-900 border border-white/5 text-slate-400'
                }`}>
                  Full Stack
                </span>
                <span className={`px-2 py-1 rounded-md text-[10px] font-semibold tracking-wider uppercase ${
                  isTerminal ? 'bg-green-950/40 text-green-400 border border-green-500/20' : 'bg-slate-900 border border-white/5 text-slate-400'
                }`}>
                  AI/ML
                </span>
              </div>
            </div>

            {/* Column 2: System Engineering Stack */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-slate-400">
                <Code2 className="w-4 h-4 text-sky-400" style={{ color: !isTerminal && !isSynth ? customOverlayColor : undefined }} />
                <span>Systems Engineering</span>
              </div>
              <ul className={`text-xs space-y-2 ${isTerminal ? 'text-green-500/60' : 'text-slate-400'}`}>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-450 shrink-0" style={{ backgroundColor: !isTerminal && !isSynth ? customOverlayColor : undefined }} />
                  React 18 / Vite / TypeScript
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-450 shrink-0" style={{ backgroundColor: !isTerminal && !isSynth ? customOverlayColor : undefined }} />
                  Node.js / Express / FASTApi
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-450 shrink-0" style={{ backgroundColor: !isTerminal && !isSynth ? customOverlayColor : undefined }} />
                  PostgreSQL / SQL Transactions
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-450 shrink-0" style={{ backgroundColor: !isTerminal && !isSynth ? customOverlayColor : undefined }} />
                  Docker / CI-CD / Containerization
                </li>
              </ul>
            </div>

            {/* Column 3: Intelligent AI Engine */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-slate-400">
                <Brain className="w-4 h-4 text-purple-400" />
                <span>AI Core & Research</span>
              </div>
              <ul className={`text-xs space-y-2 ${isTerminal ? 'text-green-500/60' : 'text-slate-400'}`}>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  RAG Hybrid Semantic Architectures
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  Agentic & Multi-Agent Workflows
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  Python / PyTorch / TensorFlow
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  Prompt Engineering & LLM Eval
                </li>
              </ul>
            </div>

            {/* Column 4: Channels & Handshake */}
            <div className="space-y-5">
              <div className="space-y-2">
                <h4 className="text-xs font-bold tracking-widest uppercase text-slate-400">Get In Touch</h4>
                <p className={`text-xs ${isTerminal ? 'text-green-500/60' : 'text-slate-400'}`}>
                  Feel free to reach out for key initiatives, full-stack AI roles, or engineering queries.
                </p>
              </div>

              {/* Handshake connection cards */}
              <div className="grid grid-cols-3 gap-2.5">
                <a 
                  href={resumeData.linkedin}
                  target="_blank" 
                  rel="noreferrer"
                  className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${
                    isTerminal 
                      ? 'border-green-500/10 hover:border-green-500 bg-green-500/5 hover:bg-green-500/10 text-green-400' 
                      : isSynth 
                      ? 'border-pink-500/10 hover:border-pink-500 bg-pink-500/5 hover:bg-pink-500/10 text-pink-400' 
                      : 'border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-900 text-slate-350 hover:text-white'
                  }`}
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a 
                  href={resumeData.github}
                  target="_blank" 
                  rel="noreferrer"
                  className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${
                    isTerminal 
                      ? 'border-green-500/10 hover:border-green-500 bg-green-500/5 hover:bg-green-500/10 text-green-400' 
                      : isSynth 
                      ? 'border-pink-500/10 hover:border-pink-500 bg-pink-500/5 hover:bg-pink-500/10 text-pink-400' 
                      : 'border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-900 text-slate-350 hover:text-white'
                  }`}
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a 
                  href={`mailto:${resumeData.email}`}
                  className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${
                    isTerminal 
                      ? 'border-green-500/10 hover:border-green-500 bg-green-500/5 hover:bg-green-500/10 text-green-400' 
                      : isSynth 
                      ? 'border-pink-500/10 hover:border-pink-500 bg-pink-500/5 hover:bg-pink-500/10 text-pink-400' 
                      : 'border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-900 text-slate-350 hover:text-white'
                  }`}
                  aria-label="Send Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              {/* Dynamic scroll indicator button */}
              <button 
                onClick={handleScrollToTop}
                className={`w-full py-2 px-4 rounded-xl border text-xs font-bold font-mono flex items-center justify-center gap-2 group transition-all cursor-pointer ${
                  isTerminal 
                    ? 'border-green-500/20 hover:border-green-500/50 hover:bg-green-500/10 bg-green-500/5 text-green-400' 
                    : isSynth 
                    ? 'border-pink-500/20 hover:border-pink-500/50 hover:bg-pink-500/10 bg-pink-500/5 text-pink-400' 
                    : 'border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-900 text-slate-350 hover:text-white'
                }`}
                style={{
                  borderColor: !isTerminal && !isSynth ? customOverlayColor + '30' : undefined,
                  color: !isTerminal && !isSynth ? customOverlayColor : undefined
                }}
              >
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                {isTerminal ? 'BACK_TO_TOP' : 'Back to Top'}
              </button>
            </div>

          </div>

          {/* Divider Line */}
          <div className={`h-px w-full mb-8 opacity-30 ${isTerminal ? 'bg-green-500/20' : isSynth ? 'bg-pink-500/20' : 'bg-slate-800'}`} />

          {/* Copyright, Precision and build summary block */}
          <div className="text-center text-xs font-mono">
            <span className={isTerminal ? 'text-green-500/40' : 'text-slate-505'}>
              &copy; {new Date().getFullYear()} Dileep Sai Galla. All rights reserved.
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
}

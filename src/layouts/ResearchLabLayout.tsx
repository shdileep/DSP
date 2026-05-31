import { useState, useEffect } from 'react';
import { 
  FileCode, 
  Binary, 
  Dribbble, 
  Map, 
  Hash, 
  BookOpen, 
  Cpu, 
  Search,
  ExternalLink,
  ChevronRight,
  Sliders
} from 'lucide-react';
import { ResumeData, ThemeStyle } from '../types';
import profilePic from '../assets/images/dileepgalla.jpeg';
import Timeline from '../components/Timeline';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Blogs from '../components/Blogs';
import Contact from '../components/Contact';

interface ResearchLabLayoutProps {
  resumeData: ResumeData;
  theme: ThemeStyle;
  customOverlayColor: string;
  onOpenBuilder: () => void;
}

export default function ResearchLabLayout({
  resumeData,
  theme,
  customOverlayColor,
  onOpenBuilder
}: ResearchLabLayoutProps) {
  const isTerminal = theme === 'terminal-os';
  const isSynth = theme === 'cyber-synth';
  
  // Scanner coordinates simulation
  const [coords, setCoords] = useState({ lat: '13.0827° N', lon: '80.2707° E', time: '17:16:57' });

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setCoords(prev => ({
        ...prev,
        time: d.toTimeString().split(' ')[0]
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 font-mono text-slate-350">
      
      {/* Top Banner Accent */}
      <div className="border border-slate-800 p-2.5 rounded-lg flex items-center justify-between text-[10px] uppercase tracking-widest text-slate-400 mb-8 bg-slate-950 mt-10">
        <span>ARCHIVE: PUBLIC_RECONSTRUCTION</span>
        <span>SYS_STATUS: VERIFIED</span>
        <button 
          onClick={onOpenBuilder}
          className="text-white hover:underline flex items-center gap-1 cursor-pointer"
        >
          [SETTINGS_CLI]
        </button>
      </div>

      {/* Hero section structured as Academic Index Card */}
      <div className="border-2 border-slate-800 rounded-xl bg-slate-950 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
        
        {/* Scanner Profile Image Frame */}
        <div className="md:col-span-4 flex flex-col items-center">
          
          <div className="relative border-4 border-slate-800 rounded-lg p-3 bg-white text-black text-center shadow-lg group">
            
            {/* Holographic scanning bar */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-bounce pointer-events-none z-10" />

            <div className="w-48 h-48 overflow-hidden rounded border border-slate-300 relative bg-slate-200">
              <img 
                src={profilePic}
                alt="Dileep Sai Galla"
                className="w-full h-full object-cover grayscale opacity-90 contrast-125 brightness-95"
              />
            </div>
            
            <div className="mt-3 font-mono text-[9px] font-bold text-slate-700 tracking-wider">
              GALLA_DILEEP_SAI.jpg
            </div>
            <div className="mt-1 font-mono text-[8px] text-slate-450 border-t border-slate-200 pt-1.5 flex justify-between gap-2">
              <span>{coords.lat}</span>
              <span>{coords.lon}</span>
            </div>
          </div>
          
        </div>

        {/* Paper Header / Abstract */}
        <div className="md:col-span-8 space-y-4">
          <div>
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">[PAPER IDENTIFIER: VIT-SE-2026]</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 leading-snug">
              CRITICAL ANALYSIS & MODELING: ARCHITECTING GENAI WORKFLOWS
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-semibold uppercase">{resumeData.name} — Vellore Institute of Technology</p>
          </div>

          <div className="border-t border-b border-dashed border-slate-800 py-3 text-xs leading-relaxed text-slate-300">
            <strong>Abstract:</strong> This document catalogues computational competencies, shipped system simulations, and published research articles of Dileep Sai Galla. Emphasizes waste route solver algorithms, low-latency client-side state engines, and patent files relating to optimization heuristics.
          </div>

          <div className="grid grid-cols-2 gap-4 text-[10px] tracking-wide text-slate-405 font-mono">
            <div>
              <span className="block text-slate-500">// CONTACT CHANNELS</span>
              <a href={`mailto:${resumeData.email}`} className="text-white hover:text-emerald-400 block mt-1">EM: {resumeData.email}</a>
              {resumeData.phone && <span className="block text-white">TEL: {resumeData.phone}</span>}
            </div>
            <div>
              <span className="block text-slate-500">// GLOBAL DIRECTORIES</span>
              <a href={resumeData.linkedin} target="_blank" rel="noreferrer" className="text-emerald-450 hover:underline block mt-1">LN: LinkedIn Profile</a>
              <a href={resumeData.github} target="_blank" rel="noreferrer" className="text-emerald-450 hover:underline block">GH: GitHub Repository</a>
            </div>
          </div>

        </div>

      </div>

      {/* Standardized Papers Directory Grid */}
      <div className="space-y-12">
        
        {/* 1. Abstract & Patents */}
        <div className="border-t-2 border-slate-800 pt-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Binary className="w-4 h-4 text-emerald-400" />
              <span>01. Intellectual Patents & Research Statements</span>
            </h3>
            <span className="text-[10px] text-slate-500">SECTION_INDEX: IP</span>
          </div>

          <div className="p-5 border border-slate-800 rounded-lg bg-slate-950 text-xs leading-relaxed space-y-4">
            <p>
              <strong>Utility Patent Filed (Application Number 202641010900):</strong>
              <br />
              <em>"System and Method for Optimizing Garbage Collection Operations"</em>
              <br />
              Invented a high-velocity scheduling heuristic resolving fleet delivery constraints. The architecture computes load allocations, dynamic routing node grids, and bin telemetry syncs under 2 seconds.
            </p>
          </div>
        </div>

        {/* 2. Shipped Software Patents (Projects) */}
        <div className="border-t-2 border-slate-800 pt-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-emerald-400" />
              <span>02. Software Specifications & Project Repositories</span>
            </h3>
            <span className="text-[10px] text-slate-500">SECTION_INDEX: SHIPPED</span>
          </div>
          <Projects resumeData={resumeData} theme={theme} customOverlayColor={customOverlayColor} />
        </div>

        {/* 3. Published Blogs & Articles */}
        {resumeData.blogs && resumeData.blogs.length > 0 && (
          <div className="border-t-2 border-slate-800 pt-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>03. Literature Indexes & Technical Bulletins</span>
              </h3>
              <span className="text-[10px] text-slate-500">SECTION_INDEX: TEXT</span>
            </div>
            <Blogs blogs={resumeData.blogs} theme={theme} customOverlayColor={customOverlayColor} />
          </div>
        )}

        {/* 4. Core Technical Competencies (Skills) */}
        <div className="border-t-2 border-slate-800 pt-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>04. Competency Matrices</span>
            </h3>
            <span className="text-[10px] text-slate-500">SECTION_INDEX: MATRICES</span>
          </div>
          <Skills resumeData={resumeData} theme={theme} customOverlayColor={customOverlayColor} />
        </div>

        {/* 5. Timestep logs (Experience) */}
        <div className="border-t-2 border-slate-800 pt-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Map className="w-4 h-4 text-emerald-400" />
              <span>05. Timestep Chronology Logs</span>
            </h3>
            <span className="text-[10px] text-slate-500">SECTION_INDEX: HISTORY</span>
          </div>
          <Timeline resumeData={resumeData} theme={theme} customOverlayColor={customOverlayColor} />
        </div>

        {/* 6. Certifications */}
        <div className="border-t-2 border-slate-800 pt-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Hash className="w-4 h-4 text-emerald-400" />
              <span>06. External Credentials</span>
            </h3>
            <span className="text-[10px] text-slate-500">SECTION_INDEX: AUTH</span>
          </div>
          <Certifications certifications={resumeData.certifications} theme={theme} customOverlayColor={customOverlayColor} />
        </div>

        {/* 7. Handshake Form */}
        <Contact resumeData={resumeData} theme={theme} customOverlayColor={customOverlayColor} />

      </div>

      {/* Research Footer */}
      <footer className="mt-16 pt-8 border-t border-slate-900 text-center text-xs tracking-wider text-slate-650">
        <div>[DILEEP_GALLA // RESEARCH_ARCHIVE_2026 // TIME: {coords.time}]</div>
      </footer>

    </div>
  );
}

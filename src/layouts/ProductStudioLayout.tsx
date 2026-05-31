import { useState, useRef, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Linkedin, 
  Github, 
  Mail, 
  ChevronRight, 
  Zap, 
  Code, 
  Smartphone,
  Sliders
} from 'lucide-react';
import { ResumeData, ThemeStyle } from '../types';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Timeline from '../components/Timeline';
import Blogs from '../components/Blogs';
import Contact from '../components/Contact';

interface ProductStudioLayoutProps {
  resumeData: ResumeData;
  theme: ThemeStyle;
  customOverlayColor: string;
  onOpenBuilder: () => void;
}

export default function ProductStudioLayout({
  resumeData,
  theme,
  customOverlayColor,
  onOpenBuilder
}: ProductStudioLayoutProps) {
  const isTerminal = theme === 'terminal-os';
  const isSynth = theme === 'cyber-synth';

  // 3D Tilt effect handlers
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Max rotation 15deg
    setRotateX(-y / (box.height / 2) * 15);
    setRotateY(x / (box.width / 2) * 15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-slate-100 font-sans">
      
      {/* Product Showcase Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 mt-10">
        
        {/* Left narrative and hot products listing */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="flex items-center gap-2">
            <span className="p-1 px-2.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 fill-indigo-400" />
              <span>Silicon Valley Product Engineer</span>
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-300">
            SHIPPING AI PRODUCTS <br />THAT SCALE
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-xl font-normal leading-relaxed">
            I am <strong className="text-white font-bold">{resumeData.name}</strong>, a builder specializing in crafting production-ready prompt interfaces, reactive full-stack layers, and optimization routers. Focus on high-impact visual architectures.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <button 
              onClick={() => {
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-xl bg-indigo-650 hover:bg-indigo-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-indigo-600/10 flex items-center gap-2 group transition-all cursor-pointer"
            >
              <span>View Shipped Products</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button 
              onClick={onOpenBuilder}
              className="px-6 py-3 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900/30 text-slate-350 text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Sliders className="w-4 h-4" />
              <span>Customize Architecture</span>
            </button>
          </div>

          <div className="flex gap-4 pt-4 text-xs text-slate-500 font-mono">
            <a href={resumeData.linkedin} target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
            <span>/</span>
            <a href={resumeData.github} target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
            <span>/</span>
            <a href={`mailto:${resumeData.email}`} className="hover:text-white flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> Email
            </a>
          </div>
        </div>

        {/* Right side: 3D Tilting Frame with vibrant cursor hover gradient mask */}
        <div className="lg:col-span-5 flex justify-center items-center">
          
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-80 h-80 sm:w-90 sm:h-90 flex items-center justify-center cursor-pointer transition-all duration-300"
            style={{
              transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Glowing gradient background blur bubble */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-[2.5rem] blur-2xl opacity-20" />
            
            {/* Outer skewed line-frame */}
            <div className="absolute inset-2 rounded-[2.5rem] border border-white/10 bg-slate-950/40 backdrop-blur-md p-1 shadow-2xl flex items-center justify-center overflow-hidden">
              {/* Profile image with inner shadow */}
              <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden">
                <img 
                  src="/src/assets/images/dileepgalla.jpeg"
                  alt="Dileep Sai Galla"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Visual hologram overlay glass layer */}
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-pink-500/10 mix-blend-overlay" />
                
                {/* Bottom glass block with name */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-slate-900/80 backdrop-blur-lg border border-white/5 text-center">
                  <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase block">PRODUCT ARCHITECT</span>
                  <span className="text-xs font-extrabold text-white block mt-0.5">{resumeData.name}</span>
                </div>
              </div>
            </div>

            {/* Skewed decorative tech badge */}
            <div className="absolute top-6 right-6 px-3 py-1 bg-slate-900 border border-white/10 rounded-xl text-[10px] font-bold text-white shadow-xl flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-yellow-400" />
              <span>SV STACK</span>
            </div>

          </div>

        </div>

      </div>

      {/* Case Study Content Loop */}
      <div className="space-y-24">
        
        {/* Part A: Case Studies (Projects Grid First!) */}
        <div id="projects" className="border-t border-slate-900 pt-16">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-bold text-indigo-455 tracking-widest uppercase">CASE STUDIES</span>
            <h2 className="text-3xl font-extrabold text-white">Shipped Digital Products</h2>
          </div>
          <Projects resumeData={resumeData} theme={theme} customOverlayColor={customOverlayColor} />
        </div>

        {/* Part B: Product Engineering Skills */}
        <div className="border-t border-slate-900 pt-16">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-bold text-indigo-455 tracking-widest uppercase">CAPABILITIES</span>
            <h2 className="text-3xl font-extrabold text-white">Product Engineering Engine</h2>
          </div>
          <Skills resumeData={resumeData} theme={theme} customOverlayColor={customOverlayColor} />
        </div>

        {/* Part C: Shipped Products Timeline */}
        <div className="border-t border-slate-900 pt-16">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-bold text-indigo-455 tracking-widest uppercase">SHIPPED WORKFLOWS</span>
            <h2 className="text-3xl font-extrabold text-white">Development Timeline</h2>
          </div>
          <Timeline resumeData={resumeData} theme={theme} customOverlayColor={customOverlayColor} />
        </div>

        {/* Part D: Blogs / Insights */}
        {resumeData.blogs && resumeData.blogs.length > 0 && (
          <div className="border-t border-slate-900 pt-16">
            <div className="text-center mb-12 space-y-2">
              <span className="text-xs font-bold text-indigo-455 tracking-widest uppercase font-mono">INSIGHTS</span>
              <h2 className="text-3xl font-extrabold text-white">Product Bulletins</h2>
            </div>
            <Blogs blogs={resumeData.blogs} theme={theme} customOverlayColor={customOverlayColor} />
          </div>
        )}

        {/* Part E: SMTP contact mail form */}
        <Contact resumeData={resumeData} theme={theme} customOverlayColor={customOverlayColor} />

      </div>

      {/* Product Studio Footer */}
      <footer className="mt-20 pt-8 border-t border-slate-900 text-center text-xs text-slate-500 font-sans">
        <div>Dileep Sai Galla — Product Studio Layout Model &copy; {new Date().getFullYear()}</div>
      </footer>

    </div>
  );
}

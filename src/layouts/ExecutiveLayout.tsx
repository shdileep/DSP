import { 
  FileText, 
  Linkedin, 
  Github, 
  Mail, 
  MapPin, 
  Phone,
  Bookmark,
  Award,
  Globe,
  Sliders,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { ResumeData, ThemeStyle } from '../types';
import Timeline from '../components/Timeline';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Blogs from '../components/Blogs';
import Contact from '../components/Contact';

interface ExecutiveLayoutProps {
  resumeData: ResumeData;
  theme: ThemeStyle;
  customOverlayColor: string;
  onOpenBuilder: () => void;
}

export default function ExecutiveLayout({
  resumeData,
  theme,
  customOverlayColor,
  onOpenBuilder
}: ExecutiveLayoutProps) {
  const isTerminal = theme === 'terminal-os';
  const isSynth = theme === 'cyber-synth';

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      
      {/* Executive Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center border-b border-slate-800 pb-12 mt-10">
        
        {/* Asymmetrical Premium Image Frame */}
        <div className="md:col-span-4 flex justify-center md:justify-start">
          <div className="relative group">
            {/* Outer gold-like luxury double-border */}
            <div className="absolute -inset-2 rounded-2xl border-2 border-amber-500/30 scale-95 opacity-80 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500" />
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-tr from-amber-500/40 via-transparent to-sky-500/25 blur-sm" />
            
            {/* Picture block */}
            <div className="relative w-56 h-56 rounded-xl overflow-hidden border border-slate-800 shadow-[0_15px_30px_rgba(0,0,0,0.5)] bg-slate-950 flex items-center justify-center">
              <img 
                src="/src/assets/images/dileepgalla.jpeg"
                alt="Dileep Sai Galla"
                className="w-full h-full object-cover grayscale opacity-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-750 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Asymmetric label */}
            <div className="absolute -bottom-3 -right-3 px-3 py-1 bg-amber-500 text-black text-[9px] font-bold uppercase tracking-widest rounded shadow-md font-sans">
              AI ARCHITECT
            </div>
          </div>
        </div>

        {/* Bio Summary / Core Contact Details */}
        <div className="md:col-span-8 space-y-6 text-center md:text-left">
          <div className="space-y-2">
            <span className="text-amber-500 text-xs font-bold tracking-widest uppercase">Executive Portfolio Showcase</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {resumeData.name}
            </h1>
            <p className="text-lg text-slate-350 font-serif italic">
              {resumeData.title}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-slate-400 font-mono justify-center md:justify-start">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-500" />
              <a href={`mailto:${resumeData.email}`} className="hover:text-amber-400">{resumeData.email}</a>
            </span>
            {resumeData.phone && resumeData.phone.trim() && (
              <>
                <span className="text-slate-700">|</span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <span>{resumeData.phone}</span>
                </span>
              </>
            )}
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>Hyderabad, India</span>
            </span>
          </div>

          <div className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start">
            <a 
              href={resumeData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded border border-slate-800 hover:border-amber-500/40 bg-slate-900/60 text-slate-300 text-xs flex items-center gap-1.5 transition-all"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a 
              href={resumeData.github}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded border border-slate-800 hover:border-amber-500/40 bg-slate-900/60 text-slate-300 text-xs flex items-center gap-1.5 transition-all"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <button 
              onClick={onOpenBuilder}
              className="px-3.5 py-1.5 rounded border border-dashed border-amber-500/30 bg-amber-500/5 text-amber-500 text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Layout Settings</span>
            </button>
          </div>
        </div>

      </div>

      {/* Corporate Structure Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
        
        {/* Left Column: Milestones, Resume, Executive summary statement */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Executive statement */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4.5 h-4.5 text-amber-500" />
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">Executive Overview</h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed font-sans border-l-2 border-amber-500/50 pl-4 py-1">
              Experienced Software Engineer specializing in cognitive systems engineering. Proven track record of architecting distributed workflows, automating vector-indexed RAG search query algorithms, and designing clean relational schemas that scale. Bridging advanced model evaluations with secure frontend execution dashboards.
            </p>
          </div>

          {/* Timeline Milestones */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-4.5 h-4.5 text-amber-500" />
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">Professional Milestones</h2>
            </div>
            <Timeline resumeData={resumeData} theme={theme} customOverlayColor={customOverlayColor} />
          </div>

          {/* Projects Architecture */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-4.5 h-4.5 text-amber-500" />
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">AI Architectures Shipped</h2>
            </div>
            <Projects resumeData={resumeData} theme={theme} customOverlayColor={customOverlayColor} />
          </div>

        </div>

        {/* Right Column: Skills matrix, Credentials, certifications sidebar */}
        <div className="lg:col-span-4 space-y-12">
          
          {/* Skills Core Matrix */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="w-4.5 h-4.5 text-amber-500" />
              <h2 className="text-md font-bold text-white uppercase tracking-wider">Core Core Matrix</h2>
            </div>
            <div className="p-5 bg-slate-900/20 border border-slate-800 rounded-xl">
              <Skills resumeData={resumeData} theme={theme} customOverlayColor={customOverlayColor} />
            </div>
          </div>

          {/* Academic Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-4.5 h-4.5 text-amber-500" />
              <h2 className="text-md font-bold text-white uppercase tracking-wider">Academic Record</h2>
            </div>
            <div className="p-5 bg-slate-900/20 border border-slate-800 rounded-xl space-y-4 text-xs leading-relaxed text-slate-350">
              {resumeData.education.map(edu => (
                <div key={edu.institution} className="space-y-1">
                  <span className="font-bold text-white block">{edu.institution}</span>
                  <span className="text-amber-500 block">{edu.degree}</span>
                  <span className="text-slate-450 block font-mono text-[10px]">{edu.duration} | {edu.location}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Quick List */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-4.5 h-4.5 text-amber-500" />
              <h2 className="text-md font-bold text-white uppercase tracking-wider">Credentials</h2>
            </div>
            <div className="p-5 bg-slate-900/20 border border-slate-800 rounded-xl">
              <Certifications certifications={resumeData.certifications} theme={theme} customOverlayColor={customOverlayColor} />
            </div>
          </div>

          {/* Publications & Blogs */}
          {resumeData.blogs && resumeData.blogs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-4.5 h-4.5 text-amber-500" />
                <h2 className="text-md font-bold text-white uppercase tracking-wider">Articles</h2>
              </div>
              <Blogs blogs={resumeData.blogs} theme={theme} customOverlayColor={customOverlayColor} />
            </div>
          )}

        </div>

      </div>

      <div className="mt-20 border-t border-slate-800 pt-10">
        <Contact resumeData={resumeData} theme={theme} customOverlayColor={customOverlayColor} />
      </div>

      {/* Corporate Footer */}
      <footer className="mt-16 pt-8 border-t border-slate-900 text-center text-xs text-slate-500 font-serif">
        <div>Dileep Sai Galla — Executive Showcase Layout Model &copy; {new Date().getFullYear()}</div>
      </footer>

    </div>
  );
}

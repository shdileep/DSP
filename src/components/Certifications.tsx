import { motion } from 'motion/react';
import { Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ThemeStyle, Certification } from '../types';

// Import actual logo images
import infosysLogo from '../assets/images/Infosys Spring.png';
import hackerrankLogo from '../assets/images/hackerrank.png';
import freecodecampLogo from '../assets/images/freecodecamp.png';

function IssuerLogo({ issuer, theme, customOverlayColor }: { issuer: string; theme: string; customOverlayColor: string }) {
  const isTerminal = theme === 'terminal-os';
  const isSynth = theme === 'cyber-synth';
  
  // Custom styled responsive container for images
  const logoClass = `w-10 h-10 shrink-0 select-none object-contain rounded-xl border p-1 bg-slate-950/60 ${
    isTerminal ? 'border-green-500/30' : 'border-slate-800'
  }`;
  
  if (issuer.includes('Infosys')) {
    return (
      <img src={infosysLogo} alt="Infosys" className={logoClass} />
    );
  }

  if (issuer.includes('HackerRank')) {
    return (
      <img src={hackerrankLogo} alt="HackerRank" className={logoClass} />
    );
  }

  if (issuer.includes('IBM') || issuer.includes('Coursera')) {
    return (
      <svg className="w-10 h-10 shrink-0 select-none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ibm-stripes" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0F62FE" />
            <stop offset="100%" stopColor="#002D9C" />
          </linearGradient>
          <linearGradient id="coursera-grow" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0056D2" />
            <stop offset="100%" stopColor="#3FA4FF" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" rx="20" fill="#0A1128" stroke="#102A6B" strokeWidth="1.5" />
        {/* IBM stylized horizontal bars */}
        <g stroke="url(#ibm-stripes)" strokeWidth="2.5" strokeLinecap="square">
          <line x1="18" y1="32" x2="42" y2="32" />
          <line x1="18" y1="38" x2="42" y2="38" />
          <line x1="18" y1="44" x2="42" y2="44" />
          <line x1="18" y1="50" x2="42" y2="50" />
          <line x1="18" y1="56" x2="42" y2="56" />
          <line x1="18" y1="62" x2="42" y2="62" />
          <line x1="18" y1="68" x2="42" y2="68" />
        </g>
        {/* Coursera's geometric flower structure */}
        <path d="M 68 50 C 68 40, 78 40, 80 50 C 82 60, 72 60, 68 50 Z" fill="url(#coursera-grow)" opacity="0.95" />
        <path d="M 60 58 C 51 52, 59 42, 68 50 C 77 58, 69 68, 60 58 Z" fill="url(#coursera-grow)" opacity="0.8" />
        <path d="M 76 58 C 85 52, 77 42, 68 50 C 59 58, 67 68, 76 58 Z" fill="url(#ibm-stripes)" opacity="0.7" />
        <circle cx="68" cy="50" r="3" fill="#FFFFFF" />
      </svg>
    );
  }

  if (issuer.includes('Scrum')) {
    return (
      <svg className="w-10 h-10 shrink-0 select-none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="scrum-amber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7A00" />
            <stop offset="100%" stopColor="#FF5C00" />
          </linearGradient>
          <linearGradient id="scrum-teal" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00A3C4" />
            <stop offset="100%" stopColor="#00839F" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" rx="20" fill="#1C150D" stroke="#3D2910" strokeWidth="1.5" />
        <path d="M 50 22 C 67 22, 78 35, 78 50 C 78 65, 65 78, 50 78 C 35 78, 22 65, 22 50 C 22 38, 30 28, 42 24" stroke="url(#scrum-teal)" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M 50 35 C 58 35, 65 42, 65 50 C 65 58, 58 65, 50 65 C 42 65, 35 58, 35 50" stroke={isTerminal ? '#22C55E' : 'url(#scrum-amber)'} strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="50" cy="50" r="4" fill="#FF7A00" />
        <path d="M 38 18 L 46 22 L 38 28 Z" fill="#00A3C4" />
      </svg>
    );
  }

  if (issuer.includes('freeCodeCamp')) {
    return (
      <img src={freecodecampLogo} alt="freeCodeCamp" className={logoClass} />
    );
  }

  return (
    <div className={`p-2.5 rounded-lg shrink-0 ${
      isTerminal 
        ? 'bg-green-500/10 text-green-400' 
        : isSynth 
        ? 'bg-pink-500/10 text-pink-400' 
        : 'bg-sky-500/10 text-sky-400'
    }`}
    style={{
      backgroundColor: !isTerminal && !isSynth ? customOverlayColor + '10' : undefined,
      color: !isTerminal && !isSynth ? customOverlayColor : undefined
    }}
    >
      <ShieldCheck className="w-5 h-5" />
    </div>
  );
}

interface CertificationsProps {
  certifications?: Certification[];
  theme: ThemeStyle;
  customOverlayColor: string;
}

export default function Certifications({ certifications = [], theme, customOverlayColor }: CertificationsProps) {
  const isTerminal = theme === 'terminal-os';
  const isMinimal = theme === 'minimal-linear';
  const isSynth = theme === 'cyber-synth';

  // Fallbacks if not synched in JSON block
  const getCertsList = () => {
    if (certifications && certifications.length > 0) {
      return certifications;
    }
    return [
      { name: "Frontend Developer (React)", issuer: "HackerRank" },
      { name: "Advanced SQL Certificate", issuer: "HackerRank" },
      { name: "GenAI Powered Data Analytics", issuer: "IBM / Coursera" },
      { name: "Software Engineer Intern Certificate", issuer: "HackerRank" },
      { name: "Agile Scrum in Practice", issuer: "Scrum Alliance" },
      { name: "Legacy Responsive Web Design V8", issuer: "freeCodeCamp" }
    ];
  };

  const certs = getCertsList();

  const textHeadingColor = isTerminal
    ? 'text-green-300 font-mono'
    : isSynth
    ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 font-extrabold'
    : 'text-white font-extrabold';

  const cardStyles = isTerminal
    ? 'border border-green-500/10 bg-black/60 p-4 rounded-lg flex items-center gap-3.5 hover:border-green-500/35 transition-all text-left'
    : isSynth
    ? 'border border-pink-500/10 bg-purple-950/20 backdrop-blur-md p-5 rounded-xl flex items-center gap-4 hover:border-pink-500/30 hover:shadow-[0_0_12px_rgba(236,72,153,0.1)] transition-all text-left'
    : isMinimal
    ? 'border border-slate-800 bg-[#0a0f1d] p-4 rounded-lg flex items-center gap-3 hover:border-slate-700 transition-all text-left'
    : 'border border-slate-850 bg-slate-900/40 backdrop-blur-xl p-5 rounded-2xl flex items-center gap-4 hover:border-sky-500/25 bg-slate-900/35 hover:bg-slate-905 transition-all text-left';

  return (
    <section id="certifications" className="py-16 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title */}
      <div className="text-left mb-10">
        {isTerminal && (
          <span className="text-[11px] font-bold uppercase tracking-widest block text-green-500 font-mono">
            {">"} COMPILE CERTIFICATES: PRINT
          </span>
        )}
        <h2 className={`text-2xl sm:text-3xl font-extrabold mt-1 ${textHeadingColor}`}>
          {isTerminal ? '_ls certifications/' : 'Certifications'}
        </h2>
        <div className={`h-1 w-20 mt-2 rounded ${isTerminal ? 'bg-green-500' : isSynth ? 'bg-pink-500' : 'bg-sky-400'}`} style={{ backgroundColor: !isTerminal && !isSynth ? customOverlayColor : undefined }} />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {certs.map((cert, idx) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className={cardStyles}
          >
            {/* Beautiful corporate brand visual crest */}
            <IssuerLogo issuer={cert.issuer} theme={theme} customOverlayColor={customOverlayColor} />

            <div className="space-y-0.5 min-w-0">
              <h3 className={`text-xs sm:text-sm font-bold text-slate-100 truncate ${isTerminal ? 'font-mono text-green-300' : ''}`}>
                {cert.name}
              </h3>
              <p className="text-[10.5px] text-slate-500 font-semibold font-mono tracking-wide">
                ISSUED BY: <span className={isTerminal ? 'text-yellow-500' : isSynth ? 'text-cyan-400' : 'text-slate-300'}>{cert.issuer}</span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

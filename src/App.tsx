import { useState } from 'react';

// Import Types and Data
import { ThemeStyle, ResumeData } from './types';
import { resumeData as initialData } from './data';

// Import Components
import BackgroundEffect from './components/BackgroundEffect';
import Navbar from './components/Navbar';
import DeepAiChat from './components/DeepAiChat';
import PortfolioTransformer from './layouts/PortfolioTransformer';
import { usePortfolioTransformer } from './state/portfolioTransformer';

export default function App() {
  const [theme] = useState<ThemeStyle>('neo-ai');
  const [resumeData] = useState<ResumeData>(initialData);
  const [customOverlayColor] = useState('#38BDF8'); // Electric Blue fallback
  const [isAdvanced, toggleMode] = usePortfolioTransformer();

  const isTerminal = theme === 'terminal-os';
  const isSynth = theme === 'cyber-synth';

  return (
    <div className={`min-h-screen relative font-sans transition-all duration-300 ${
      isTerminal 
        ? 'font-mono text-green-400 bg-black' 
        : isSynth 
        ? 'text-[#ff61d5] bg-[#0a0016]' 
        : 'text-slate-100 bg-[#050816]'
    }`}>
      
      {/* 1. Canvas Interactive Particles Background Grid */}
      <BackgroundEffect theme={theme} />

      {/* 2. Glassmorphism Top Navbar */}
      <Navbar 
        theme={theme} 
        customOverlayColor={customOverlayColor} 
      />

      {/* 3. Main Contents and Portfolio Transformer Router */}
      <PortfolioTransformer 
        resumeData={resumeData}
        theme={theme}
        customOverlayColor={customOverlayColor}
        onToggleMode={toggleMode}
      />

      {/* 4. Floating DeepAi Bot widget */}
      <DeepAiChat 
        resumeData={resumeData}
        theme={theme}
        customOverlayColor={customOverlayColor}
      />

    </div>
  );
}

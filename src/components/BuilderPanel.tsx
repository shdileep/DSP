import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Sliders, 
  Sparkles, 
  Code, 
  FileJson, 
  Check, 
  Play, 
  RefreshCw, 
  X, 
  Download, 
  Terminal, 
  ChevronRight,
  FileText
} from 'lucide-react';
import { ResumeData, ThemeStyle } from '../types';
import { useLayout } from '../state/layoutStore';

interface BuilderPanelProps {
  currentTheme: ThemeStyle;
  setTheme: (theme: ThemeStyle) => void;
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  customOverlayColor: string;
  setCustomOverlayColor: (color: string) => void;
}

export default function BuilderPanel({
  currentTheme,
  setTheme,
  resumeData,
  setResumeData,
  isOpen,
  setIsOpen,
  customOverlayColor,
  setCustomOverlayColor
}: BuilderPanelProps) {
  const [activeLayout, setLayout] = useLayout();
  const [activeTab, setActiveTab] = useState<'themes' | 'schema' | 'ai-copilot' | 'code'>('themes');
  const [jsonText, setJsonText] = useState(JSON.stringify(resumeData, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);
  
  // AI Copilot state
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiChat, setAiChat] = useState<{ role: 'user' | 'system' | 'ai'; text: string; actionApplied?: boolean }[]>([
    {
      role: 'ai',
      text: "Welcome! I'm Dileep Galla's AI Portfolio Architect. Give me a design direction like: 'Make a high-intensity neon hacker cyber theme', 'Set the primary text color to bright emerald', or 'Update the resume name to Dr. Sai Galla'. I will live-rebuild the templates based on your prompt."
    }
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Sync state if external change
  useEffect(() => {
    setJsonText(JSON.stringify(resumeData, null, 2));
  }, [resumeData]);

  const handleJsonChange = (val: string) => {
    setJsonText(val);
    try {
      const parsed = JSON.parse(val);
      if (parsed && typeof parsed === 'object' && parsed.name) {
        setResumeData(parsed);
        setJsonError(null);
      } else {
        setJsonError("Invalid Schema: Root object must contain at least a 'name' field.");
      }
    } catch (e: any) {
      setJsonError(e.message);
    }
  };

  const handleResetData = () => {
    // Reload relative page data or refresh
    window.location.reload();
  };

  const speakAiResponse = async (prompt: string) => {
    setIsAiLoading(true);
    setAiChat(prev => [...prev, { role: 'user', text: prompt }]);
    
    // Simulate real-time prompt parsing engine
    setTimeout(() => {
      const cleaned = prompt.toLowerCase();
      let reply = "I analyzed your requirements. Re-indexing custom stylesheets now.";
      let themeToSet: ThemeStyle | undefined = undefined;
      let nameToSet: string | undefined = undefined;
      let colorToSet: string | undefined = undefined;

      if (cleaned.includes('terminal') || cleaned.includes('hacker') || cleaned.includes('green') || cleaned.includes('matrix')) {
        themeToSet = 'terminal-os';
        reply = "Configured 'Terminal OS' template. CRT scanlines enabled, amber-green telemetry dashboards synced successfully.";
      } else if (cleaned.includes('minimal') || cleaned.includes('linear') || cleaned.includes('monochrome') || cleaned.includes('clean')) {
        themeToSet = 'minimal-linear';
        reply = "Aligned custom grids. Ported Dileep's profile over to the layout framework used by Vercel & Linear. Sharp corners enabled.";
      } else if (cleaned.includes('cyber') || cleaned.includes('synth') || cleaned.includes('retro') || cleaned.includes('neon') || cleaned.includes('magenta')) {
        themeToSet = 'cyber-synth';
        reply = "Ignited Neon Retro Synths! 3D perspectives loaded on canvas, active highlights updated to hot-pink & electric-cyan.";
      } else if (cleaned.includes('neo') || cleaned.includes('ai') || cleaned.includes('purple') || cleaned.includes('blue') || cleaned.includes('original')) {
        themeToSet = 'neo-ai';
        reply = "Restored 'Neo AI Architect Mode'. Glassmorphism layers, glowing neural paths, and electric-blue blur bubbles online.";
      }

      // Check name change command
      if (cleaned.includes('name to')) {
        const match = prompt.match(/name to (.*)/i);
        if (match && match[1]) {
          nameToSet = match[1].trim();
          reply += ` | Dynamically set resume profile name to "${nameToSet}".`;
        }
      }

      // Check custom highlight colors
      if (cleaned.includes('color to') || cleaned.includes('highlight to')) {
        const colors_match = prompt.match(/(color|highlight) to (#[0-9a-fA-F]{6}|red|cyan|amber|orange|violet|teal|gray)/i);
        if (colors_match && colors_match[2]) {
          let selection = colors_match[2];
          if (selection === 'red') selection = '#EF4444';
          if (selection === 'violet') selection = '#8B5CF6';
          if (selection === 'cyan') selection = '#06B6D4';
          if (selection === 'amber') selection = '#F59E0B';
          if (selection === 'teal') selection = '#14B8A6';
          colorToSet = selection;
          reply += ` | Custom spotlight filters override active: Injecting HTML overlay value: ${selection}.`;
        }
      }

      setAiChat(prev => [...prev, { role: 'ai', text: reply, actionApplied: true }]);
      
      // Apply identified dynamic edits
      if (themeToSet) setTheme(themeToSet);
      if (colorToSet) setCustomOverlayColor(colorToSet);
      if (nameToSet) setResumeData({ ...resumeData, name: nameToSet });
      
      setIsAiLoading(false);
      setAiPrompt('');
    }, 1500);
  };

  const triggerExportSchema = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resumeData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${resumeData.name.replace(/\s+/g, '_')}_AI_Portfolio_Schema.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Mock compiled component generator based on active theme
  const getCompiledReactCode = () => {
    return `import React from 'react';
import { motion } from 'motion/react';
// Theme Template: ${currentTheme.toUpperCase()} style
// Dileep Sai Galla Portfolio Compiled component

export default function DileepPortfolioTemplate() {
  const data = ${JSON.stringify({ name: resumeData.name, title: resumeData.title, subTitle: resumeData.subTitle }, null, 2)};
  
  return (
    <div className="min-h-screen ${currentTheme === 'neo-ai' ? 'bg-[#050816] text-white' : currentTheme === 'terminal-os' ? 'bg-[#020502] text-green-400 font-mono' : currentTheme === 'cyber-synth' ? 'bg-[#0a0016] text-[#ff61d5]' : 'bg-[#0a0f1d] text-slate-300'} p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6">
        <header className="border-b ${currentTheme === 'minimal-linear' ? 'border-slate-800' : 'border-dashed border-cyan-500/30'} pb-4">
          <h1 className="text-4xl font-extrabold font-sans tracking-tight">{data.name}</h1>
          <p className="text-xl text-sky-400 font-mono mt-1">{data.title}</p>
          <span className="text-xs text-slate-500">{data.subTitle}</span>
        </header>
        {/* Dynamic resume contents rendered live... */}
      </motion.div>
    </div>
  );
}`;
  };

  return (
    <>
      {/* Actual Builder Dashboard Sidebar Panel */}
      {isOpen && (
        <motion.div
          id="builder-dashboard"
          initial={{ x: 420, opacity: 0.8 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 24, stiffness: 220 }}
          className="fixed right-0 top-0 h-full w-[410px] sm:w-[450px] z-50 bg-slate-950/95 backdrop-blur-2xl border-l border-slate-800/80 shadow-2xl flex flex-col font-sans select-none"
        >
          {/* Header Panel */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-sky-500/15 text-sky-400 border border-sky-500/20">
                <Sliders className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100 tracking-tight">AI Portfolio Builder</h3>
                <p className="text-[11px] text-slate-400">Modify resume schema & template designs real-time</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Selection */}
          <div className="grid grid-cols-4 border-b border-slate-800/60 text-xs text-center bg-slate-950/50">
            <button
              onClick={() => setActiveTab('themes')}
              className={`py-3 font-semibold transition-all border-b-2 cursor-pointer flex flex-col items-center gap-1 ${
                activeTab === 'themes'
                  ? 'border-sky-500 text-sky-400 bg-sky-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Templates</span>
            </button>
            <button
              onClick={() => setActiveTab('schema')}
              className={`py-3 font-semibold transition-all border-b-2 cursor-pointer flex flex-col items-center gap-1 ${
                activeTab === 'schema'
                  ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileJson className="w-3.5 h-3.5" />
              <span>Resume JSON</span>
            </button>
            <button
              onClick={() => setActiveTab('ai-copilot')}
              className={`py-3 font-semibold transition-all border-b-2 cursor-pointer flex flex-col items-center gap-1 ${
                activeTab === 'ai-copilot'
                  ? 'border-purple-500 text-purple-400 bg-purple-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Design Prompt</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`py-3 font-semibold transition-all border-b-2 cursor-pointer flex flex-col items-center gap-1 ${
                activeTab === 'code'
                  ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>React Code</span>
            </button>
          </div>

          {/* Panel Content Scroll Container */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {/* TAB: THEMES & SELECTORS */}
            {activeTab === 'themes' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Select Portfolio Stylesheet</h4>
                <div className="grid grid-cols-2 gap-3.5">
                  
                  {/* Theme 1: NEO AI */}
                  <div
                    onClick={() => setTheme('neo-ai')}
                    className={`p-3.5 rounded-xl border border-slate-800 text-left transition-all cursor-pointer relative overflow-hidden ${
                      currentTheme === 'neo-ai'
                        ? 'border-sky-500 bg-sky-950/20'
                        : 'hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-sky-400 absolute top-3.5 right-3.5 animate-pulse" style={{ display: currentTheme === 'neo-ai' ? 'block' : 'none' }} />
                    <span className="text-xs font-bold text-slate-100 block">Neo AI Architect</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Electric-blue & purple nodes</span>
                    <div className="flex gap-1.5 mt-2.5">
                      <div className="w-3 h-3 rounded-full bg-[#050816] border border-slate-800" />
                      <div className="w-3 h-3 rounded-full bg-[#38BDF8]" />
                      <div className="w-3 h-3 rounded-full bg-[#8B5CF6]" />
                    </div>
                  </div>

                  {/* Theme 2: TERMINAL OS */}
                  <div
                    onClick={() => setTheme('terminal-os')}
                    className={`p-3.5 rounded-xl border border-slate-800 text-left transition-all cursor-pointer relative overflow-hidden ${
                      currentTheme === 'terminal-os'
                        ? 'border-green-500 bg-green-950/10'
                        : 'hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400 absolute top-3.5 right-3.5" style={{ display: currentTheme === 'terminal-os' ? 'block' : 'none' }} />
                    <span className="text-xs font-bold text-slate-100 block">Terminal OS Console</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Developer grid CLI shell</span>
                    <div className="flex gap-1.5 mt-2.5">
                      <div className="w-3 h-3 rounded-full bg-black border border-slate-800" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                    </div>
                  </div>

                  {/* Theme 3: MINIMAL LINEAR */}
                  <div
                    onClick={() => setTheme('minimal-linear')}
                    className={`p-3.5 rounded-xl border border-slate-800 text-left transition-all cursor-pointer relative overflow-hidden ${
                      currentTheme === 'minimal-linear'
                        ? 'border-indigo-500 bg-indigo-950/20'
                        : 'hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 absolute top-3.5 right-3.5" style={{ display: currentTheme === 'minimal-linear' ? 'block' : 'none' }} />
                    <span className="text-xs font-bold text-slate-100 block">Minimal Linear</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Vercel dark style grids</span>
                    <div className="flex gap-1.5 mt-2.5">
                      <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-800" />
                      <div className="w-3 h-3 rounded-full bg-indigo-400" />
                      <div className="w-3 h-3 rounded-full bg-slate-400" />
                    </div>
                  </div>

                  {/* Theme 4: CYBER SYNTH */}
                  <div
                    onClick={() => setTheme('cyber-synth')}
                    className={`p-3.5 rounded-xl border border-slate-800 text-left transition-all cursor-pointer relative overflow-hidden ${
                      currentTheme === 'cyber-synth'
                        ? 'border-pink-500 bg-pink-950/20'
                        : 'hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-pink-400 absolute top-3.5 right-3.5" style={{ display: currentTheme === 'cyber-synth' ? 'block' : 'none' }} />
                    <span className="text-xs font-bold text-slate-100 block">Horizon Synthwave</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Neon glowing meshes</span>
                    <div className="flex gap-1.5 mt-2.5">
                      <div className="w-3 h-3 rounded-full bg-purple-950 border border-slate-800" />
                      <div className="w-3 h-3 rounded-full bg-rose-500" />
                      <div className="w-3 h-3 rounded-full bg-cyan-400" />
                    </div>
                  </div>
                </div>

                {/* PORTFOLIO ARCHITECTURE */}
                <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-950 space-y-3.5 mt-5">
                  <span className="text-xs font-bold text-slate-200 block uppercase tracking-wider">Portfolio Architecture Layout</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    Instantly swap structural layouts, order of modules, and profile card frames client-side.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'original', name: 'Original Portfolio', desc: 'VIT Convocation CV layout' },
                      { id: 'dashboard', name: 'AI Command Center', desc: 'Bento Grid & telemetry metrics HUD' },
                      { id: 'executive', name: 'Executive Showcase', desc: 'CTO style milestone presentation' },
                      { id: 'research', name: 'Research Lab Paper', desc: 'Monospaced academic index log' },
                      { id: 'product', name: 'Product Design Studio', desc: 'Silicon Valley visual case studies' },
                    ].map(lay => {
                      const isActive = activeLayout === lay.id;
                      return (
                        <button
                          key={lay.id}
                          onClick={() => setLayout(lay.id as any)}
                          className={`flex items-center justify-between p-3 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                            isActive
                              ? 'bg-sky-500/10 border-sky-500 text-sky-400 font-semibold'
                              : 'bg-transparent border-slate-800 hover:border-slate-700 text-slate-350 hover:bg-slate-900/25'
                          }`}
                        >
                          <div>
                            <span className="font-bold block">{lay.name}</span>
                            <span className="text-[10px] text-slate-400 block mt-0.5">{lay.desc}</span>
                          </div>
                          {isActive && <Check className="w-4 h-4 text-sky-400" />}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => {
                      setLayout('original');
                      setTheme('neo-ai');
                      setCustomOverlayColor('#38BDF8');
                    }}
                    className="w-full py-2 px-3 border border-slate-800 rounded-lg text-xs font-bold text-slate-300 hover:bg-slate-900 hover:border-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Restore Original Portfolio
                  </button>
                </div>

                <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-950 space-y-3.5 mt-5">
                  <span className="text-xs font-bold text-slate-200 block">Interactive Overlay Spotlight</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Choose a spotlight override accent. This shifts the gradient glow systems on elements like cards or avatars.
                  </p>
                  
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {[
                      { hex: '#38BDF8', name: 'Electric Sky' },
                      { hex: '#8B5CF6', name: 'Aether Purple' },
                      { hex: '#10B981', name: 'Bio Leak' },
                      { hex: '#F59E0B', name: 'Warning Orange' },
                      { hex: '#EC4899', name: 'Cyber Rose' },
                    ].map(col => (
                      <button
                        key={col.hex}
                        onClick={() => setCustomOverlayColor(col.hex)}
                        className={`flex items-center gap-1.5 p-1 px-2.5 rounded-full text-[10px] font-semibold border text-white transition-all cursor-pointer ${
                          customOverlayColor === col.hex
                            ? 'bg-white/10 border-white/45 shadow'
                            : 'bg-transparent border-slate-800 hover:border-slate-700'
                        }`}
                        title={col.name}
                      >
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: col.hex }} />
                        <span>{col.name}</span>
                        {customOverlayColor === col.hex && <Check className="w-3 h-3 text-sky-400" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Profile togglers to demonstrate robustness */}
                <div className="space-y-2 mt-4 text-xs">
                  <span className="font-bold text-slate-300 block">Simulate Other Developer Templates</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        handleJsonChange(JSON.stringify(resumeData, null, 2));
                      }}
                      className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-md text-slate-200 text-[10px] hover:border-slate-600 font-semibold cursor-pointer flex-1"
                    >
                      Dileep Sai Galla (Core M.Tech CV)
                    </button>
                    <button
                      onClick={() => {
                        const guestProfile = {
                          ...resumeData,
                          name: "Sarah Chen",
                          title: "Senior LLM Infrastructure Expert",
                          shortSummary: "PhD researcher from Stanford specializing in distributed attention caches, TPU memory management, and optimizing sub-billion parameter transformer models for low-latency robotics inference pipelines.",
                          skills: [
                            { category: "High Performance", items: ["CUDA C++", "TPUs", "vLLM", "FlashAttention", "Memory Optimization"] },
                            { category: "Core AI", items: ["PyTorch", "Model Quantization", "DPO Alignments"] }
                          ]
                        };
                        setResumeData(guestProfile);
                      }}
                      className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-md text-slate-400 text-[10px] hover:border-slate-600 font-semibold cursor-pointer flex-1"
                    >
                      Load Sample "Sarah Chen" AI Profile
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: JSON LIVE RESUME SCHEMA */}
            {activeTab === 'schema' && (
              <div className="space-y-4 h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Editable ISO-JSON Schema</h4>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={triggerExportSchema}
                      className="p-1 px-2.5 rounded bg-slate-900 text-slate-200 hover:text-white hover:bg-slate-800 transition-all text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                      title="Download custom Schema JSON file"
                    >
                      <Download className="w-3 h-3" />
                      Download
                    </button>
                    <button
                      onClick={handleResetData}
                      className="p-1 px-2 bg-slate-900 text-slate-400 hover:text-slate-200 rounded transition-all text-[11px] cursor-pointer"
                      title="Reset resume content to original"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  The portfolio is completely data-driven. Type directly inside the code window below to change any values, experience bullet, website links, or titles. Key fields will live-update the layout immediately.
                </p>

                <div className="relative flex-1">
                  <textarea
                    value={jsonText}
                    onChange={(e) => handleJsonChange(e.target.value)}
                    className="w-full h-[320px] bg-slate-950 text-sky-400 font-mono text-xs p-3.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-500/85 overflow-y-auto block resize-none tab-size-2"
                    spellCheck="false"
                  />
                  {jsonError && (
                    <div className="mt-2 text-[10px] p-2 bg-red-950/40 border border-red-500/20 text-red-400 rounded-md font-mono">
                      Error: {jsonError}
                    </div>
                  )}
                  {!jsonError && (
                    <div className="mt-1 text-[9px] text-emerald-400/90 font-mono flex items-center gap-1 justify-end">
                      <Check className="w-3 h-3 text-emerald-400" />
                      Schema active and synchronized.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: AI DESIGN COPILOT */}
            {activeTab === 'ai-copilot' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">AI Design Agent Chat</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Give stylistic prompts to our simulated layout assistant. It understands commands to shift layouts, swap themes, change profile names, and highlight custom colors.
                </p>

                <div className="space-y-3 max-h-[280px] overflow-y-auto p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-sans">
                  {aiChat.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`p-2.5 rounded-lg leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-sky-500/10 text-sky-300 ml-4 border-l-2 border-sky-400' 
                          : msg.role === 'system'
                          ? 'bg-slate-900 text-slate-400 italic'
                          : 'bg-slate-900/60 text-slate-300 mr-4'
                      }`}
                    >
                      <div className="font-bold mb-0.5 text-[10px] text-slate-400 uppercase tracking-wide">
                        {msg.role === 'user' ? 'You' : msg.role === 'system' ? 'System Log' : 'AI Copilot Agent'}
                      </div>
                      <div>{msg.text}</div>
                    </div>
                  ))}
                  {isAiLoading && (
                    <div className="p-2.5 bg-slate-900/60 text-slate-400 flex items-center gap-2">
                       <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-400" />
                       <span className="text-[10px] font-mono">Compiling prompt guidelines, hot-reloading components...</span>
                    </div>
                  )}
                </div>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!aiPrompt.trim() || isAiLoading) return;
                    speakAiResponse(aiPrompt);
                  }}
                  className="flex gap-2"
                >
                  <input
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    type="text"
                    placeholder="e.g. ' hcker green theme' or 'name to Dileep Galla'"
                    className="flex-1 bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-2.5 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    type="submit"
                    className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white cursor-pointer"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                </form>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold block">Quick Sample Prompts to Try:</span>
                  <div className="flex flex-col gap-1.5">
                    <button
                      type="button"
                      onClick={() => speakAiResponse("Switch theme to synthwave cyber grid")}
                      className="text-[10.5px] text-slate-400 hover:text-slate-200 text-left bg-slate-900 hover:bg-slate-900 p-1 px-2.5 rounded border border-slate-800/60 flex items-center justify-between cursor-pointer"
                    >
                      <span>"Switch theme to synthwave cyber grid"</span>
                      <ChevronRight className="w-3 h-3 text-slate-600" />
                    </button>
                    <button
                      type="button"
                      onClick={() => speakAiResponse("Set custom highlight color to orange")}
                      className="text-[10.5px] text-slate-400 hover:text-slate-200 text-left bg-slate-900 hover:bg-slate-900 p-1 px-2.5 rounded border border-slate-800/60 flex items-center justify-between cursor-pointer"
                    >
                      <span>"Set custom highlight color to orange"</span>
                      <ChevronRight className="w-3 h-3 text-slate-600" />
                    </button>
                    <button
                      type="button"
                      onClick={() => speakAiResponse("Change the main user name to Dileep Sai Galla, M.Tech Architect")}
                      className="text-[10.5px] text-slate-400 hover:text-slate-200 text-left bg-slate-900 hover:bg-slate-900 p-1 px-2.5 rounded border border-slate-800/60 flex items-center justify-between cursor-pointer"
                    >
                      <span>"Change the name to Dileep Sai Galla, M.Tech Architect"</span>
                      <ChevronRight className="w-3 h-3 text-slate-600" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: GENERATED REACT CODE */}
            {activeTab === 'code' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Dynamic React/Tailwind Source</h4>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(getCompiledReactCode());
                      alert("Code block copied to clipboard!");
                    }}
                    className="p-1 px-2.5 rounded bg-emerald-950/50 text-emerald-400 hover:text-white hover:bg-emerald-800 transition-all text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    Copy Template
                  </button>
                </div>
                
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  Below lies the dynamically created template view of Dileep's portfolio compiled for your active style (<strong className="text-white-500">{currentTheme}</strong>). Drag or copy this component straight into your project hierarchy.
                </p>

                <div className="relative">
                  <pre className="max-w-[390px] h-[340px] bg-slate-950 text-[10px] text-emerald-500 font-mono p-3.5 rounded-xl border border-slate-800/80 overflow-auto scrollbar-thin select-all">
                    {getCompiledReactCode()}
                  </pre>
                </div>
              </div>
            )}

          </div>

          {/* Footer Panel Action */}
          <div className="p-4 border-t border-slate-800/60 bg-slate-950 flex gap-2.5">
            <button
              onClick={() => {
                alert("This option extracts a clean markdown representation of Dileep's resume for LLMs.");
                console.log(resumeData);
              }}
              className="px-4 py-2.5 border border-slate-800 font-bold hover:border-slate-700 text-slate-300 text-xs rounded-xl hover:bg-slate-900 flex-1 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-sky-400" />
              LLM Prompt Friendly
            </button>
            <button
               onClick={() => {
                 window.print();
               }}
               className="px-4 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold hover:opacity-90 text-xs rounded-xl flex-1 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download PDF Resume
            </button>
          </div>

        </motion.div>
      )}
    </>
  );
}

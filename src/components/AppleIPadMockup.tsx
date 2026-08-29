import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Minus, 
  Square, 
  Search, 
  Wifi, 
  Volume2, 
  VolumeX,
  BatteryCharging, 
  Sparkles, 
  Cpu, 
  Trash2, 
  CheckCircle2, 
  ExternalLink, 
  Moon,
  Power,
  ChevronUp,
  Folder,
  Check,
  Info,
  ShieldCheck,
  Clock,
  Bluetooth,
  Plane,
  Eye,
  Sliders,
  Terminal as TerminalIcon,
  Globe,
  Settings as SettingsIcon,
  HardDrive,
  FileText,
  Lock,
  RotateCcw,
  Maximize2,
  Minimize2,
  Cast,
  RefreshCw,
  FolderTree,
  Send,
  HelpCircle,
  Laptop,
  Tablet,
  Code2,
  Activity,
  Sun,
  Layers,
  Grid,
  Radio,
  Share2
} from 'lucide-react';

import NextTripPreview from './previews/NextTripPreview';
import UjjwalHubPreview from './previews/UjjwalHubPreview';
import ShubhAIStudioPreview from './previews/ShubhAIStudioPreview';
import HireZenoPreview from './previews/HireZenoPreview';
import FitMitraPreview from './previews/FitMitraPreview';
import GoogleChromeApp from './chrome/GoogleChromeApp';
import nextTripLogo from '../assets/images/nextrip.png';
import ujjwalHubLogo from '../assets/images/ujjwalhub.png';
import hireZenoLogo from '../assets/images/logo.png';
import logoshubh from '../assets/images/logoshubh.png';
import fitmitraImg from '../assets/images/Fit.png';
import vsCodeImg from '../assets/images/vs.png';
import chromeImg from '../assets/images/ch.png';
import folderImg from '../assets/images/fold.png';
import binImg from '../assets/images/bin.png';
import chipCodeImg from '../assets/images/chip_code.png';
import dspImg from '../assets/images/DSP.png';
import robotImg from '../assets/images/robot.png';
import harryVideo from '../assets/images/harr.mp4';
import dileepProfile from '../assets/images/dileepgalla.jpeg';
import camImg from '../assets/images/cam.png';
import CameraApp from './CameraApp';
import VSCodeStudioApp from './VSCodeStudioApp';
import FolderExplorerApp from './FolderExplorerApp';
import { ResumeData, ThemeStyle } from '../types';

interface AppleIPadMockupProps {
  resumeData: ResumeData;
  theme: ThemeStyle;
  customOverlayColor: string;
}

type ActiveAppType = 'project' | 'chrome' | 'explorer' | 'settings' | 'terminal' | 'recycle_bin' | 'fitmitra' | 'camera' | 'vscode' | 'patent' | null;
type DeviceModel = 'ipad' | 'asus';
type DeviceColor = 'space_black' | 'titanium_silver' | 'midnight_blue';

interface DockAppItem {
  id: string;
  title: string;
  appType: ActiveAppType;
  projectIndex?: number;
  icon?: string;
  isLucide?: boolean;
}

export default function AppleIPadMockup({ resumeData, theme, customOverlayColor }: AppleIPadMockupProps) {
  const isTerminal = theme === 'terminal-os';
  const isSynth = theme === 'cyber-synth';
  const projects = resumeData.projects || [];

  // Device selection state
  const [deviceModel, setDeviceModel] = useState<DeviceModel>('ipad');
  const [deviceColor, setDeviceColor] = useState<DeviceColor>('space_black');

  // Active Project Selection (0: NextTrip, 1: Ujjwal-Hub, 2: Shubh AI Studio, 3: HireZeno 2.O)
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(2);
  const [activeApp, setActiveApp] = useState<ActiveAppType>('project');
  const [isWindowMaximized, setIsWindowMaximized] = useState<boolean>(true);
  const [isWindowMinimized, setIsWindowMinimized] = useState<boolean>(false);
  const [stageManagerEnabled, setStageManagerEnabled] = useState<boolean>(true);

  // Desktop container ref for free dragging
  const desktopRef = useRef<HTMLDivElement>(null);
  const isDraggingIconRef = useRef<boolean>(false);

  // System time clock
  const [time, setTime] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDateStr(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 3D Gyroscope & Mouse Tilt
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag 3D stage if not clicking interactive UI elements
    if ((e.target as HTMLElement).closest('button, input, a, .clickable-app, .no-drag')) return;
    setIsDragging(true);
    startPos.current = { x: e.clientX - rotY, y: e.clientY - rotX };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newY = Math.max(-10, Math.min(10, (e.clientX - startPos.current.x) * 0.1));
    const newX = Math.max(-8, Math.min(8, -(e.clientY - startPos.current.y) * 0.1));
    setRotY(newY);
    setRotX(newX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setRotX(0);
    setRotY(0);
  };

  // Terminal state with real POSIX directory navigation
  const [terminalPath, setTerminalPath] = useState<string>('~');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ text: string; type: 'cmd' | 'output' | 'error' }>>([
    { text: 'Apple MacBook Pro [M4 Neural Architecture]', type: 'output' },
    { text: 'Darwin Kernel Version 24.1.0: Real POSIX Environment ready.', type: 'output' },
    { text: 'Available directories: ~/projects, ~/skills, ~/patents, ~/microservices, ~/experience', type: 'output' },
    { text: 'Commands: cd <dir>, ls, pwd, cat <file>, python run <file>, whoami, clear, help', type: 'output' }
  ]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;

    const newHist = [...terminalHistory, { text: `dileep@macbook-pro:${terminalPath}$ ${cmd}`, type: 'cmd' as const }];
    const parts = cmd.split(/\s+/);
    const mainCmd = parts[0].toLowerCase();
    const arg = parts[1] || '';

    if (mainCmd === 'clear' || mainCmd === 'cls') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else if (mainCmd === 'pwd') {
      newHist.push({ text: `/Users/dileep${terminalPath.replace('~', '')}`, type: 'output' });
    } else if (mainCmd === 'cd') {
      if (!arg || arg === '~' || arg === '/') {
        setTerminalPath('~');
        newHist.push({ text: 'Switched to home directory (~)', type: 'output' });
      } else if (arg === '..' || arg === '../') {
        setTerminalPath('~');
        newHist.push({ text: 'Switched to parent directory (~)', type: 'output' });
      } else {
        const cleanArg = arg.toLowerCase().replace(/[\/\\]/g, '');
        if (['projects', 'skills', 'patents', 'microservices', 'experience'].includes(cleanArg)) {
          setTerminalPath(`~/${cleanArg}`);
          newHist.push({ text: `Switched directory to ~/${cleanArg}`, type: 'output' });
        } else {
          newHist.push({ text: `cd: no such file or directory: ${arg}`, type: 'error' });
        }
      }
    } else if (mainCmd === 'ls' || mainCmd === 'dir') {
      if (terminalPath === '~') {
        newHist.push({ text: '📁 projects/   📁 skills/   📁 patents/   📁 microservices/   📁 experience/   📄 README.md   📄 resume.txt', type: 'output' });
      } else if (terminalPath.includes('projects')) {
        newHist.push({ text: '🚀 NextTrip_AI.app   🚛 Ujjwal_Hub.app   ✨ Shubh_AI_Studio.app   📄 HireZeno_2.O.app   🏋️ FitMitra.app', type: 'output' });
      } else if (terminalPath.includes('skills')) {
        newHist.push({ text: '⚙️ PyTorch_NLP.json   ⚡ FastAPI_Node.json   🐳 Docker_AWS_ECS.json   🗄️ PostgreSQL_pgvector.json', type: 'output' });
      } else if (terminalPath.includes('patents')) {
        newHist.push({ text: '📜 Patent_IoT_Smart_Waste_Sorting_2026.pdf (App #2026/IN/49102)   📑 IEEE_Semantic_Routing_Paper.pdf', type: 'output' });
      } else if (terminalPath.includes('microservices')) {
        newHist.push({ text: '🐍 ai_pipeline.py   📘 route_solver.ts   🐍 hybrid_rag.py   🐍 ats_matcher.py   🐍 search_service.py', type: 'output' });
      } else if (terminalPath.includes('experience')) {
        newHist.push({ text: '🎓 VIT_Chennai_BTech_Degree.pdf   🏆 Infosys_Springboard_Certified.png   💼 Career_Timeline.docx', type: 'output' });
      }
    } else if (mainCmd === 'cat') {
      if (!arg) {
        newHist.push({ text: 'usage: cat <filename>', type: 'error' });
      } else if (arg.includes('resume') || arg.includes('README')) {
        newHist.push({ text: 'Dileep Sai Galla — AI/ML Systems Architect & Full-Stack Engineer | VIT Chennai Alumnus | Email: dileepgalla200056@gmail.com', type: 'output' });
      } else if (arg.includes('patent')) {
        newHist.push({ text: 'PATENT APPLICATION #2026/IN/49102: Automated Multi-Spectral IoT Sensor Bin & Heuristic Dynamic Route Allocation.', type: 'output' });
      } else if (arg.includes('ai_pipeline')) {
        newHist.push({ text: 'from transformers import pipeline\nclassifier = pipeline("text-classification", model="dileep/distilbert-multi-intent")\n# High throughput sub-20ms inference', type: 'output' });
      } else {
        newHist.push({ text: `Content of ${arg}: [Binary Verified Production Artifact ready for execution]`, type: 'output' });
      }
    } else if (mainCmd === 'python' || mainCmd === 'node' || mainCmd === 'run') {
      newHist.push({ text: `[SANDBOX RUNTIME] Spawning execution process for ${arg || 'ai_pipeline.py'}...`, type: 'output' });
      newHist.push({ text: `[DEVICE] Apple M4 Neural Engine (16-core NPU) | Allocated 2.1 GB unified RAM`, type: 'output' });
      newHist.push({ text: `[EXEC SUCCESS] Output generated with 0 errors. Latency: 18.4ms.`, type: 'output' });
    } else if (mainCmd === 'help') {
      newHist.push({ text: 'Commands: cd <dir>, ls, pwd, cat <file>, python run <file>, projects, skills, whoami, contact, clear', type: 'output' });
    } else if (mainCmd === 'projects') {
      newHist.push({ text: '1. NextTrip AI (AI Bus Platform) | 2. Ujjwal-Hub (Smart Waste IoT) | 3. Shubh AI Studio | 4. HireZeno 2.O', type: 'output' });
    } else if (mainCmd === 'skills') {
      newHist.push({ text: 'PyTorch, TensorFlow, HuggingFace, FastAPI, React 19, TypeScript, Docker, AWS ECS, pgvector', type: 'output' });
    } else if (mainCmd === 'whoami') {
      newHist.push({ text: 'User: Dileep Sai Galla | AI/ML Architect & Full Stack Engineer | VIT Chennai Alumnus', type: 'output' });
    } else if (mainCmd === 'contact') {
      newHist.push({ text: 'Email: dileepgalla200056@gmail.com | LinkedIn: /in/galla-dileep-sai-b85829390', type: 'output' });
    } else {
      newHist.push({ text: `zsh: command not found: ${cmd}. Type 'help' for valid commands.`, type: 'error' });
    }

    setTerminalHistory(newHist);
    setTerminalInput('');
  };

  const activeProject = projects[activeProjectIdx] || projects[0];

  const getAppAccent = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('nexttrip')) return '#38bdf8';
    if (lower.includes('ujjwal')) return '#10b981';
    if (lower.includes('shubh')) return '#c084fc';
    if (lower.includes('hirezeno')) return '#f59e0b';
    return '#06b6d4';
  };

  const getAppLogo = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('nexttrip') || lower.includes('booking') || lower.includes('bus')) return nextTripLogo;
    if (lower.includes('ujjwal') || lower.includes('waste') || lower.includes('route')) return ujjwalHubLogo;
    if (lower.includes('hirezeno') || lower.includes('recruitment') || lower.includes('resume')) return hireZenoLogo;
    if (lower.includes('shubh') || lower.includes('studio') || lower.includes('ide')) return logoshubh;
    return nextTripLogo;
  };

  const openApp = (app: ActiveAppType, projIdx?: number) => {
    const isSameProject = app === 'project' && typeof projIdx === 'number' && activeProjectIdx === projIdx;
    const isSameOtherApp = app !== 'project' && activeApp === app;

    // Toggle close if tapped on the active open application
    if ((isSameProject || isSameOtherApp) && !isWindowMinimized && activeApp !== null) {
      setActiveApp(null);
      return;
    }

    if (typeof projIdx === 'number') {
      setActiveProjectIdx(projIdx);
    }
    setActiveApp(app);
    setIsWindowMinimized(false);
  };

  const dockApps: DockAppItem[] = [
    { id: 'dock-shubh', title: 'Shubh AI Studio', appType: 'project', projectIndex: 2, icon: logoshubh },
    { id: 'dock-hirezeno', title: 'HireZeno 2.O', appType: 'project', projectIndex: 3, icon: hireZenoLogo },
    { id: 'dock-nexttrip', title: 'NextTrip AI', appType: 'project', projectIndex: 0, icon: nextTripLogo },
    { id: 'dock-ujjwal', title: 'Ujjwal-Hub', appType: 'project', projectIndex: 1, icon: ujjwalHubLogo },
    { id: 'dock-chrome', title: 'Google Chrome', appType: 'chrome', icon: chromeImg },
    { id: 'dock-vscode', title: 'VS Code', appType: 'vscode', icon: vsCodeImg },
    { id: 'dock-terminal', title: 'Terminal', appType: 'terminal', isLucide: true },
    { id: 'dock-explorer', title: 'Files & Storage', appType: 'explorer', icon: folderImg },
    { id: 'dock-camera', title: 'Studio Camera', appType: 'camera', icon: camImg },
    { id: 'dock-settings', title: 'Settings', appType: 'settings', isLucide: true }
  ];

  // Device Chassis Theme Colors
  const chassisBg = deviceColor === 'space_black' 
    ? 'bg-[#0f1117] border-[#1e2330] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)]' 
    : deviceColor === 'titanium_silver'
    ? 'bg-[#181d28] border-[#333d4e] shadow-[0_30px_70px_-15px_rgba(30,41,59,0.5)]'
    : 'bg-[#0b1329] border-[#1d2d54] shadow-[0_30px_70px_-15px_rgba(15,23,42,0.8)]';

  const bezelBorder = deviceModel === 'ipad' 
    ? 'rounded-[38px] p-3 sm:p-4 border-[6px] border-[#161a23]' 
    : 'rounded-3xl p-3 border-[8px] border-[#222838]';

  return (
    <section 
      id="exec-projects" 
      className="py-16 relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-slate-100 select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Portfolio B Executive Section Heading */}
      <div className="text-left mb-10">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Featured Engineering Systems
        </h2>
        <div className="h-0.5 w-24 bg-gradient-to-r from-amber-500 to-indigo-500 mt-2" />

      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 3D PRO DEVICE STAGE CONTAINER                                 */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div 
        className="relative w-full mx-auto flex flex-col items-center justify-center my-4 perspective-[1400px] cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        {/* Dynamic Studio Ambient Glow */}
        <div 
          className="absolute w-[85%] h-[260px] rounded-full filter blur-[110px] -z-10 opacity-25 transition-all duration-700 pointer-events-none"
          style={{ backgroundColor: activeApp === 'project' ? getAppAccent(activeProject.title) : '#6366f1' }}
        />

        {/* 3D Physics Chassis Container */}
        <motion.div 
          animate={!isDragging ? { y: [-2, 2, -2] } : {}}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          className="w-full max-w-5xl"
          style={{
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
            transformStyle: 'preserve-3d',
            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
        >
          {/* HARDWARE CHASSIS */}
          <div 
            className={`relative w-full ${bezelBorder} ${chassisBg} transition-all duration-500`}
            style={{ minHeight: '660px' }}
          >
            {/* INNER RETINA OLED DISPLAY SCREEN */}
            <div 
              ref={desktopRef}
              className="relative w-full rounded-[26px] overflow-hidden bg-[#050711] flex flex-col justify-between"
              style={{ minHeight: '630px', backgroundImage: 'radial-gradient(ellipse at top, #141b36 0%, #060814 100%)' }}
            >
              {/* CONTINUOUS LIVE VIDEO HOME SCREEN (harry.mp4) */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <video
                  src={harryVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-75 filter brightness-95 contrast-105"
                />
                {/* Dynamic Vignette & Glass Layer for Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#050711]/60 via-[#050711]/20 to-[#050711]/75 backdrop-blur-[1.5px]" />
              </div>

              {/* TOP STATUS BAR (iPadOS / macOS Pro style) */}
              <div className="h-8 bg-slate-950/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 shrink-0 z-30 select-none">
                {/* Left: Clock & Date */}
                <div className="flex items-center gap-3 text-xs font-mono font-semibold text-slate-200">
                  <span>{time || '9:41 AM'}</span>
                  <span className="text-slate-400 font-sans font-light hidden sm:inline">{dateStr}</span>
                </div>

                {/* Center: Realistic Ultra-HD Studio Camera Sensor & Mic Array */}
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#080b12]/90 border border-slate-800/80 shadow-inner">
                  {/* Left Mic Pinhole */}
                  <div className="w-1 h-1 rounded-full bg-slate-800" />

                  {/* Realistic Studio Camera Lens with Glass Reflection Ring */}
                  <div className="relative w-3.5 h-3.5 rounded-full bg-[#020509] border border-slate-700 flex items-center justify-center p-0.5 shadow-inner">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-tr from-slate-950 via-slate-900 to-sky-950 border border-slate-700/50 flex items-center justify-center">
                      <div className="w-0.5 h-0.5 rounded-full bg-sky-400" />
                    </div>
                  </div>

                  {/* Active Studio Green Privacy LED */}
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />

                  {/* Right Mic Pinhole */}
                  <div className="w-1 h-1 rounded-full bg-slate-800" />
                </div>

                {/* Right: Status Indicators (Wi-Fi, 5G, Battery) */}
                <div className="flex items-center gap-3 text-xs text-slate-300 font-mono">
                  <span className="text-[11px] text-indigo-300 font-bold hidden sm:inline">Wi-Fi 6E</span>
                  <Wifi className="w-3.5 h-3.5 text-slate-200" />
                  <div className="flex items-center gap-1">
                    <span className="text-[11px]">98%</span>
                    <BatteryCharging className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
              </div>

              {/* STAGE WORKSPACE CANVAS */}
              <div className="relative flex-1 p-4 sm:p-6 overflow-hidden flex items-center justify-center">
                
                {/* Active Application Window Modal */}
                <AnimatePresence>
                  {activeApp && !isWindowMinimized && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.92, y: 20 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className={`absolute z-20 rounded-2xl bg-slate-950/95 border border-slate-800 shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden ${
                        isWindowMaximized ? 'inset-2 sm:inset-4' : 'w-[90%] h-[85%]'
                      }`}
                    >
                      {/* Window Titlebar */}
                      <div className="h-10 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between px-4 shrink-0">
                        {/* macOS Window Traffic Light Controls (Close, Minimize, Maximize) */}
                        <div className="flex items-center gap-2 group/traffic py-1">
                          {/* Close Window (Red) */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveApp(null);
                            }}
                            className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center text-[#4c0000] hover:brightness-110 active:brightness-90 transition-all cursor-pointer shadow-sm"
                            title="Close Window (macOS)"
                          >
                            <X className="w-2.5 h-2.5 opacity-0 group-hover/traffic:opacity-100 transition-opacity stroke-[3]" />
                          </button>

                          {/* Minimize Window (Yellow) */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsWindowMinimized(true);
                            }}
                            className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#dea123] flex items-center justify-center text-[#5c3e00] hover:brightness-110 active:brightness-90 transition-all cursor-pointer shadow-sm"
                            title="Minimize Window (macOS)"
                          >
                            <Minus className="w-2.5 h-2.5 opacity-0 group-hover/traffic:opacity-100 transition-opacity stroke-[3]" />
                          </button>

                          {/* Maximize / Restore Window (Green) */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsWindowMaximized(!isWindowMaximized);
                            }}
                            className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#1aab29] flex items-center justify-center text-[#004d11] hover:brightness-110 active:brightness-90 transition-all cursor-pointer shadow-sm"
                            title={isWindowMaximized ? "Restore Window Size" : "Full Screen Maximize (macOS)"}
                          >
                            {isWindowMaximized ? (
                              <Minimize2 className="w-2 h-2 opacity-0 group-hover/traffic:opacity-100 transition-opacity stroke-[3]" />
                            ) : (
                              <Maximize2 className="w-2 h-2 opacity-0 group-hover/traffic:opacity-100 transition-opacity stroke-[3]" />
                            )}
                          </button>
                        </div>

                        {/* Title Bar Title */}
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                          {activeApp === 'project' && (
                            <>
                              <img src={getAppLogo(activeProject.title)} alt="App Logo" className="w-4 h-4 rounded object-contain" />
                              <span>{activeProject.title} — {activeProject.subtitle}</span>
                            </>
                          )}
                          {activeApp === 'chrome' && <span>Google Chrome Browser</span>}
                          {activeApp === 'vscode' && <span>Visual Studio Code</span>}
                          {activeApp === 'terminal' && <span>Apple Terminal (zsh)</span>}
                          {activeApp === 'camera' && <span>Studio Camera</span>}
                          {activeApp === 'explorer' && <span>Files & System Volumes</span>}
                          {activeApp === 'settings' && <span>Device & Performance Settings</span>}
                        </div>

                        <div className="w-12 flex justify-end">
                          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">macOS Stage</span>
                        </div>
                      </div>

                      {/* Window Main Content Area */}
                      <div className="flex-1 overflow-y-auto no-scrollbar p-2 sm:p-4 text-left">
                        {/* 1. Projects Preview Applications */}
                        {activeApp === 'project' && activeProjectIdx === 0 && <NextTripPreview />}
                        {activeApp === 'project' && activeProjectIdx === 1 && <UjjwalHubPreview />}
                        {activeApp === 'project' && activeProjectIdx === 2 && <ShubhAIStudioPreview />}
                        {activeApp === 'project' && activeProjectIdx === 3 && <HireZenoPreview />}
                        {activeApp === 'project' && activeProjectIdx === 4 && <FitMitraPreview />}

                        {/* 2. Google Chrome Browser */}
                        {activeApp === 'chrome' && <GoogleChromeApp />}

                        {/* 3. Studio Camera App */}
                        {activeApp === 'camera' && <CameraApp />}

                        {/* 4. Terminal Interactive Console */}
                        {activeApp === 'terminal' && (
                          <div className="h-full bg-black/90 p-4 rounded-xl font-mono text-xs text-green-400 flex flex-col justify-between space-y-4">
                            <div className="space-y-1.5 overflow-y-auto">
                              {terminalHistory.map((item, idx) => (
                                <div key={idx} className={item.type === 'cmd' ? 'text-white font-bold' : item.type === 'error' ? 'text-rose-400' : 'text-green-400'}>
                                  {item.text}
                                </div>
                              ))}
                            </div>
                            <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 border-t border-green-500/20 pt-2">
                              <span className="text-green-500">dileep@macbook-pro:{terminalPath}$</span>
                              <input
                                type="text"
                                value={terminalInput}
                                onChange={(e) => setTerminalInput(e.target.value)}
                                placeholder="Type command here (e.g. 'cd projects', 'ls', 'python run', 'help')..."
                                className="flex-1 bg-transparent border-none outline-none text-green-300 font-mono text-xs"
                                autoFocus
                              />
                            </form>
                          </div>
                        )}

                        {/* 5. VS Code Studio Runnable IDE */}
                        {activeApp === 'vscode' && (
                          <VSCodeStudioApp />
                        )}

                        {/* 6. Files & Section Folders Explorer */}
                        {activeApp === 'explorer' && (
                          <FolderExplorerApp 
                            onOpenProject={(idx) => openApp('project', idx)} 
                            onOpenVSCode={() => openApp('vscode')} 
                          />
                        )}

                        {/* 6. Settings / Device Panel */}
                        {activeApp === 'settings' && (
                          <div className="p-6 space-y-6 max-w-xl mx-auto">
                            <h3 className="text-lg font-bold text-white">Device & OS Diagnostics</h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                                <span className="text-xs text-slate-400 block">Silicon Chip</span>
                                <span className="text-sm font-bold text-amber-400">Apple M4 / 16-Core NPU</span>
                              </div>
                              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                                <span className="text-xs text-slate-400 block">Display</span>
                                <span className="text-sm font-bold text-indigo-400">Tandem OLED ProMotion 120Hz</span>
                              </div>
                              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                                <span className="text-xs text-slate-400 block">Unified Memory</span>
                                <span className="text-sm font-bold text-sky-400">32GB High-Bandwidth RAM</span>
                              </div>
                              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                                <span className="text-xs text-slate-400 block">Storage</span>
                                <span className="text-sm font-bold text-emerald-400">1TB NVMe Flash</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Minimized Window Restore Chip (macOS Stage Manager style) */}
                <AnimatePresence>
                  {isWindowMinimized && activeApp && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -10 }}
                      onClick={() => setIsWindowMinimized(false)}
                      className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 backdrop-blur-xl shadow-lg flex items-center gap-2 text-xs font-semibold text-amber-300 hover:bg-slate-800 transition-all cursor-pointer group"
                      title="Click to restore minimized window"
                    >
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      <span>Restore Window</span>
                      <Maximize2 className="w-3 h-3 group-hover:scale-110 transition-transform" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* BOTTOM FLOATING GLASSMORPHIC DOCK (iPadOS / macOS Pro style) */}
              <div className="p-3 pb-4 flex items-center justify-center shrink-0 z-30">
                <div className="px-4 py-2.5 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-2xl shadow-2xl flex items-center gap-3">
                  {dockApps.map((item) => {
                    const isActive = activeApp === item.appType && (item.appType !== 'project' || activeProjectIdx === item.projectIndex);
                    return (
                      <button
                        key={item.id}
                        onClick={() => openApp(item.appType, item.projectIndex)}
                        title={item.title}
                        className="relative group p-1.5 rounded-2xl hover:bg-white/10 transition-all duration-200 cursor-pointer"
                      >
                        {item.icon ? (
                          <img src={item.icon} alt={item.title} className="w-9 h-9 rounded-xl object-contain group-hover:scale-110 transition-transform shadow-md" />
                        ) : item.isLucide && item.appType === 'terminal' ? (
                          <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <TerminalIcon className="w-5 h-5 text-green-400" />
                          </div>
                        ) : (
                          <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <SettingsIcon className="w-5 h-5 text-indigo-400" />
                          </div>
                        )}

                        {/* Active Indicator Dot */}
                        {isActive && (
                          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400" />
                        )}

                        {/* Tooltip */}
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-slate-900 text-[10px] text-white font-sans font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border border-slate-700">
                          {item.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

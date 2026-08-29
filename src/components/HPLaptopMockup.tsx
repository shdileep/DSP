import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Reorder } from 'motion/react';
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
  Code2,
  Activity,
  Sun
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
import harryVideo from '../assets/images/har.mp4';
import dileepProfile from '../assets/images/dileepgalla.jpeg';
import camImg from '../assets/images/cam.png';
import CameraApp from './CameraApp';
import VSCodeStudioApp from './VSCodeStudioApp';
import FolderExplorerApp from './FolderExplorerApp';
import { ResumeData, ThemeStyle } from '../types';
import { windowsSound } from '../utils/windowsSound';

interface HPLaptopMockupProps {
  resumeData: ResumeData;
  theme: ThemeStyle;
  customOverlayColor: string;
}

type ActiveAppType = 'project' | 'chrome' | 'explorer' | 'settings' | 'terminal' | 'recycle_bin' | 'fitmitra' | 'camera' | 'vscode' | 'patent' | null;

interface TaskbarAppItem {
  id: string;
  title: string;
  appType: ActiveAppType;
  projectIndex?: number;
  icon?: string;
  isLucide?: boolean;
  isPinned?: boolean;
}

const PICKUP_LINES = [
  "Are you Wi-Fi? Because I'm feeling a strong connection.",
  "Are you an AI model? Because you optimize my entire world.",
  "Code is like humor. When you have to explain it, it's bad.",
  "Are you a semicolon? Because without you, everything falls apart.",
  "You must be GitHub, because I'd push to your main branch any day.",
  "Are you 404? Because I've been searching for you all day."
];

export default function HPLaptopMockup({ resumeData, theme, customOverlayColor }: HPLaptopMockupProps) {
  const isTerminal = theme === 'terminal-os';
  const isSynth = theme === 'cyber-synth';
  const projects = resumeData.projects || [];

  // Active Project Selection (0: NextTrip, 1: Ujjwal-Hub, 2: Shubh AI Studio, 3: HireZeno 2.O)
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(2);
  const [activeApp, setActiveApp] = useState<ActiveAppType>('project');
  const [isWindowMaximized, setIsWindowMaximized] = useState<boolean>(true);
  const [isWindowMinimized, setIsWindowMinimized] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'app' | 'task_manager'>('app');

  // Desktop container ref for free dragging
  const desktopRef = useRef<HTMLDivElement>(null);
  const isDraggingIconRef = useRef<boolean>(false);

  // Dynamic Real-Time & Swappable Taskbar Apps (Initialized with the 4 core projects)
  const [taskbarApps, setTaskbarApps] = useState<TaskbarAppItem[]>([
    { id: 'proj-0', title: projects[0]?.title || 'NextTrip AI', appType: 'project', projectIndex: 0, icon: nextTripLogo, isPinned: true },
    { id: 'proj-1', title: projects[1]?.title || 'Ujjwal-Hub', appType: 'project', projectIndex: 1, icon: ujjwalHubLogo, isPinned: true },
    { id: 'proj-2', title: projects[2]?.title || 'Shubh AI Studio', appType: 'project', projectIndex: 2, icon: logoshubh, isPinned: true },
    { id: 'proj-3', title: projects[3]?.title || 'HireZeno 2.O', appType: 'project', projectIndex: 3, icon: hireZenoLogo, isPinned: true },
  ]);

  const getAppLogo = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('nexttrip') || lower.includes('booking') || lower.includes('bus')) return nextTripLogo;
    if (lower.includes('ujjwal') || lower.includes('waste') || lower.includes('route')) return ujjwalHubLogo;
    if (lower.includes('hirezeno') || lower.includes('recruitment') || lower.includes('resume')) return hireZenoLogo;
    if (lower.includes('shubh') || lower.includes('studio') || lower.includes('ide')) return logoshubh;
    return nextTripLogo;
  };

  const getAppMetadata = (appName: ActiveAppType, projectIndex?: number): TaskbarAppItem => {
    if (appName === 'project') {
      const idx = projectIndex ?? activeProjectIdx;
      const proj = projects[idx] || projects[0];
      return {
        id: `proj-${idx}`,
        title: proj?.title || 'Project',
        appType: 'project',
        projectIndex: idx,
        icon: getAppLogo(proj?.title || ''),
        isPinned: true
      };
    }
    if (appName === 'chrome') {
      return { id: 'app-chrome', title: 'Google Chrome', appType: 'chrome', icon: chromeImg, isPinned: false };
    }
    if (appName === 'vscode') {
      return { id: 'app-vscode', title: 'VS Code', appType: 'vscode', icon: vsCodeImg, isPinned: false };
    }
    if (appName === 'explorer') {
      return { id: 'app-explorer', title: 'This PC', appType: 'explorer', icon: folderImg, isPinned: false };
    }
    if (appName === 'recycle_bin') {
      return { id: 'app-recycle_bin', title: 'Recycle Bin', appType: 'recycle_bin', icon: binImg, isPinned: false };
    }
    if (appName === 'terminal') {
      return { id: 'app-terminal', title: 'Terminal', appType: 'terminal', isLucide: true, isPinned: false };
    }
    if (appName === 'patent') {
      return { id: 'app-patent', title: 'Patent 2026', appType: 'patent', icon: dspImg, isPinned: false };
    }
    if (appName === 'fitmitra') {
      return { id: 'app-fitmitra', title: 'FitMitra AI', appType: 'fitmitra', icon: fitmitraImg, isPinned: false };
    }
    if (appName === 'camera') {
      return { id: 'app-camera', title: 'Camera', appType: 'camera', icon: camImg, isPinned: false };
    }
    if (appName === 'settings') {
      return { id: 'app-settings', title: 'Settings', appType: 'settings', isLucide: true, isPinned: false };
    }
    return { id: `app-${appName}`, title: 'Application', appType: appName, isPinned: false };
  };

  // Video Ref for Guaranteed Continuous Autoplay of harry.mp4
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startVideo = () => {
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.defaultMuted = true;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.log("Autoplay waiting for interaction:", err);
          });
        }
      }
    };
    startVideo();
    window.addEventListener('click', startVideo, { once: true });
    window.addEventListener('touchstart', startVideo, { once: true });
    return () => {
      window.removeEventListener('click', startVideo);
      window.removeEventListener('touchstart', startVideo);
    };
  }, []);

  // Flyout and Popover Menus
  const [isStartMenuOpen, setIsStartMenuOpen] = useState<boolean>(false);
  const [isQuickSettingsOpen, setIsQuickSettingsOpen] = useState<boolean>(false);
  const [isPowerMenuOpen, setIsPowerMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Power Modes: 'running' | 'locked' | 'sleeping' | 'restarting' | 'shutdown'
  const [powerState, setPowerState] = useState<'running' | 'locked' | 'sleeping' | 'restarting' | 'shutdown'>('running');

  // Quick Settings Controls
  const [wifiEnabled, setWifiEnabled] = useState<boolean>(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState<boolean>(true);
  const [airplaneMode, setAirplaneMode] = useState<boolean>(false);
  const [energySaver, setEnergySaver] = useState<boolean>(false);
  const [accessibility, setAccessibility] = useState<boolean>(false);
  const [projectCast, setProjectCast] = useState<boolean>(false);
  const [screenBrightness, setScreenBrightness] = useState<number>(100);
  const [audioVolume, setAudioVolume] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Wallpaper Pickup Line index
  const [pickupIdx, setPickupIdx] = useState<number>(0);

  // Chrome Browser State
  const [chromeTab, setChromeTab] = useState<'google' | 'github' | 'linkedin' | 'portfolio'>('google');
  const [chromeSearchInput, setChromeSearchInput] = useState<string>('');

  // VS Code State
  const [vsCodeFile, setVsCodeFile] = useState<'ai_pipeline' | 'astar_routing' | 'rag_engine' | 'resume_matcher'>('ai_pipeline');

  // Terminal CLI State with dynamic folder navigation
  const [terminalPath, setTerminalPath] = useState<string>('C:\\Users\\DileepSai');
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ text: string; type: 'cmd' | 'output' | 'error' }>>([
    { text: 'Microsoft Windows [Version 11.0.22631.3007] - PowerShell 7.4.2 Core', type: 'output' },
    { text: '(c) Microsoft Corporation. HP Spectre Pro AI Architecture with NVIDIA RTX 4080.', type: 'output' },
    { text: 'Folders: .\\projects, .\\skills, .\\patents, .\\microservices, .\\experience', type: 'output' },
    { text: 'Commands: cd, dir, ls, type <file>, python run <file>, whoami, cls, help', type: 'output' }
  ]);

  // Subtle 3D Minimal Tilt
  const [rotY, setRotY] = useState<number>(3);
  const [rotX, setRotX] = useState<number>(5);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; startRotY: number; startRotX: number }>({ x: 0, y: 0, startRotY: 0, startRotX: 0 });

  // System Live Clock & Date
  const [currentTime, setCurrentTime] = useState<string>('12:00:00 PM');
  const [currentDate, setCurrentDate] = useState<string>('8/29/2026');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }));
      setCurrentDate(`${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update Sound Controller
  useEffect(() => {
    windowsSound.setVolume(audioVolume / 100);
    windowsSound.setMuted(isMuted);
  }, [audioVolume, isMuted]);

  // Open or switch to an app manually (automatically appears in Task Manager footer in real time)
  const openApp = (appName: ActiveAppType, projectIndex?: number) => {
    windowsSound.playWindowOpen();
    if (appName === 'project') {
      if (typeof projectIndex === 'number') {
        setActiveProjectIdx(projectIndex);
      }
    }
    setActiveApp(appName);
    setIsWindowMinimized(false);
    setIsStartMenuOpen(false);
    setIsQuickSettingsOpen(false);
    setIsPowerMenuOpen(false);

    if (appName) {
      const meta = getAppMetadata(appName, projectIndex);
      setTaskbarApps(prev => {
        if (prev.some(item => item.id === meta.id)) return prev;
        return [...prev, meta];
      });
    }
  };

  const handleMinimize = () => {
    windowsSound.playWindowMinimize();
    setIsWindowMinimized(true);
  };

  const handleCloseWindow = () => {
    windowsSound.playClick();
    const closingApp = activeApp;
    setActiveApp(null);
    setIsWindowMinimized(false);

    // If dynamically opened app is closed, remove it in real time from taskbar (pinned apps stay)
    if (closingApp && closingApp !== 'project') {
      setTaskbarApps(prev => prev.filter(item => item.appType !== closingApp || item.isPinned));
    }
  };

  const handleTaskbarItemClick = (item: TaskbarAppItem) => {
    const isCurrentActive = item.appType === 'project'
      ? (activeApp === 'project' && activeProjectIdx === item.projectIndex && !isWindowMinimized)
      : (activeApp === item.appType && !isWindowMinimized);

    if (isCurrentActive) {
      handleMinimize();
    } else {
      openApp(item.appType, item.projectIndex);
    }
  };

  const toggleStartMenu = () => {
    windowsSound.playStartMenu();
    setIsStartMenuOpen(prev => !prev);
    setIsQuickSettingsOpen(false);
    setIsPowerMenuOpen(false);
  };

  const toggleQuickSettings = () => {
    windowsSound.playQuickSettings();
    setIsQuickSettingsOpen(prev => !prev);
    setIsStartMenuOpen(false);
    setIsPowerMenuOpen(false);
  };

  const handlePowerAction = (action: 'lock' | 'sleep' | 'restart' | 'shutdown') => {
    windowsSound.playClick();
    setIsPowerMenuOpen(false);
    setIsStartMenuOpen(false);

    if (action === 'lock') {
      setPowerState('locked');
    } else if (action === 'sleep') {
      setPowerState('sleeping');
    } else if (action === 'restart') {
      setPowerState('restarting');
      setTimeout(() => {
        setPowerState('running');
        windowsSound.playPowerSound();
      }, 2500);
    } else if (action === 'shutdown') {
      setPowerState('shutdown');
    }
  };

  const handleWakeUpOrUnlock = () => {
    windowsSound.playPowerSound();
    setPowerState('running');
  };

  // Subtle 3D Drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY, startRotY: rotY, startRotX: rotX };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const newRotY = Math.max(-12, Math.min(12, dragStartRef.current.startRotY + dx * 0.12));
    const newRotX = Math.max(-2, Math.min(12, dragStartRef.current.startRotX - dy * 0.08));
    setRotY(newRotY);
    setRotX(newRotX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Terminal Command Execution
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;

    windowsSound.playClick();
    const newHist = [...terminalHistory, { text: `PS ${terminalPath}> ${cmd}`, type: 'cmd' as const }];
    const parts = cmd.split(/\s+/);
    const mainCmd = parts[0].toLowerCase();
    const arg = parts[1] || '';

    if (mainCmd === 'clear' || mainCmd === 'cls') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else if (mainCmd === 'cd') {
      if (!arg || arg === '\\' || arg === '~') {
        setTerminalPath('C:\\Users\\DileepSai');
        newHist.push({ text: 'Directory set to C:\\Users\\DileepSai', type: 'output' });
      } else if (arg === '..' || arg === '..\\') {
        setTerminalPath('C:\\Users\\DileepSai');
        newHist.push({ text: 'Directory set to parent C:\\Users\\DileepSai', type: 'output' });
      } else {
        const cleanArg = arg.toLowerCase().replace(/[\/\\]/g, '');
        if (['projects', 'skills', 'patents', 'microservices', 'experience'].includes(cleanArg)) {
          setTerminalPath(`C:\\Users\\DileepSai\\${cleanArg}`);
          newHist.push({ text: `Switched directory to C:\\Users\\DileepSai\\${cleanArg}`, type: 'output' });
        } else {
          newHist.push({ text: `Set-Location : Cannot find path '${arg}' because it does not exist.`, type: 'error' });
        }
      }
    } else if (mainCmd === 'dir' || mainCmd === 'ls') {
      if (terminalPath === 'C:\\Users\\DileepSai') {
        newHist.push({ text: 'Mode          Length Name', type: 'output' });
        newHist.push({ text: 'd-----        0      projects', type: 'output' });
        newHist.push({ text: 'd-----        0      skills', type: 'output' });
        newHist.push({ text: 'd-----        0      patents', type: 'output' });
        newHist.push({ text: 'd-----        0      microservices', type: 'output' });
        newHist.push({ text: 'd-----        0      experience', type: 'output' });
        newHist.push({ text: '-a----     2418      README.md', type: 'output' });
        newHist.push({ text: '-a----     4820      Dileep_Resume.pdf', type: 'output' });
      } else if (terminalPath.includes('projects')) {
        newHist.push({ text: 'd-----   124MB  NextTrip_AI.app', type: 'output' });
        newHist.push({ text: 'd-----    98MB  Ujjwal_Hub_IoT.app', type: 'output' });
        newHist.push({ text: 'd-----   215MB  Shubh_AI_Studio.app', type: 'output' });
        newHist.push({ text: 'd-----    86MB  HireZeno_2.O.app', type: 'output' });
      } else if (terminalPath.includes('skills')) {
        newHist.push({ text: '-a----    18KB  PyTorch_NLP_Stack.json', type: 'output' });
        newHist.push({ text: '-a----    24KB  FullStack_Cloud.json', type: 'output' });
      } else if (terminalPath.includes('patents')) {
        newHist.push({ text: '-a----   4.2MB  Patent_IoT_Smart_Waste_Sorting_2026.pdf [App #2026/IN/49102]', type: 'output' });
        newHist.push({ text: '-a----   2.8MB  IEEE_Semantic_Routing_Paper.pdf', type: 'output' });
      } else if (terminalPath.includes('microservices')) {
        newHist.push({ text: '-a----   6.8KB  ai_pipeline.py', type: 'output' });
        newHist.push({ text: '-a----  12.4KB  route_solver.ts', type: 'output' });
        newHist.push({ text: '-a----   8.2KB  hybrid_rag.py', type: 'output' });
      } else if (terminalPath.includes('experience')) {
        newHist.push({ text: '-a----   3.1MB  VIT_Chennai_BTech_Degree.pdf', type: 'output' });
        newHist.push({ text: '-a----   1.4MB  Infosys_Springboard_Certified.png', type: 'output' });
      }
    } else if (mainCmd === 'type' || mainCmd === 'cat') {
      if (!arg) {
        newHist.push({ text: 'usage: type <filename>', type: 'error' });
      } else if (arg.includes('resume') || arg.includes('README')) {
        newHist.push({ text: 'Dileep Sai Galla — AI/ML Systems Architect & Full-Stack Engineer | VIT Chennai Alumnus | Email: dileepgalla200056@gmail.com', type: 'output' });
      } else if (arg.includes('patent')) {
        newHist.push({ text: 'PATENT APPLICATION #2026/IN/49102: Automated Multi-Spectral IoT Sensor Bin & Heuristic Dynamic Route Allocation.', type: 'output' });
      } else {
        newHist.push({ text: `Contents of ${arg}: [Production Binary & AI Model weights verified.]`, type: 'output' });
      }
    } else if (mainCmd === 'python' || mainCmd === 'node' || mainCmd === 'run') {
      newHist.push({ text: `[POWERSHELL RUNTIME] Executing ${arg || 'ai_pipeline.py'} with CUDA 12.2...`, type: 'output' });
      newHist.push({ text: `[DEVICE] NVIDIA GeForce RTX 4080 (12GB VRAM) active`, type: 'output' });
      newHist.push({ text: `[SUCCESS] Output generated with 0 errors. Latency: 18.4ms.`, type: 'output' });
    } else if (mainCmd === 'help') {
      newHist.push({ text: 'Available commands: cd <dir>, dir, ls, type <file>, python run <file>, whoami, contact, cls, help', type: 'output' });
    } else if (mainCmd === 'projects') {
      newHist.push({ text: '1. NextTrip AI (AI Bus Platform) | 2. Ujjwal-Hub (Smart Waste IoT) | 3. Shubh AI Studio | 4. HireZeno 2.O', type: 'output' });
    } else if (mainCmd === 'skills') {
      newHist.push({ text: 'AI/ML: PyTorch, TensorFlow, HuggingFace, RAG, NLP, LangChain, Transformers', type: 'output' });
    } else if (mainCmd === 'whoami' || mainCmd === 'info') {
      newHist.push({ text: 'User: Dileep Sai Galla | AI/ML Architect & Full Stack AI Engineer | VIT Chennai Alumnus', type: 'output' });
    } else if (mainCmd === 'contact') {
      newHist.push({ text: 'Email: dileepgalla200056@gmail.com | LinkedIn: /in/galla-dileep-sai-b85829390', type: 'output' });
    } else {
      newHist.push({ text: `'${cmd}' is not recognized as an internal or external command. Type 'help' for available commands.`, type: 'error' });
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
    return '#06b6d4';
  };

  // Check if an app is currently the active window
  const isAppActive = (appName: ActiveAppType, projectIndex?: number) => {
    if (activeApp !== appName) return false;
    if (appName === 'project' && typeof projectIndex === 'number') {
      return activeProjectIdx === projectIndex && !isWindowMinimized;
    }
    return !isWindowMinimized;
  };

  return (
    <section 
      id="projects" 
      className="py-16 relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-slate-100 select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Project Section Heading */}
      <div className="text-left mb-10">
        {isTerminal && (
          <span className="text-xs font-bold uppercase tracking-widest block text-green-500 font-mono">
            {">"} TELEMETRY --WORKSPACE: PROJECT_LAB
          </span>
        )}
        <h2 className={`text-2xl sm:text-3xl font-extrabold mt-1 ${isTerminal ? 'text-green-300 font-mono' : isSynth ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400' : 'text-white'}`}>
          {isTerminal ? '_exec interactive_workspace/' : 'Featured Projects'}
        </h2>
        <div 
          className={`h-1 w-20 mt-2 rounded ${isTerminal ? 'bg-green-500' : isSynth ? 'bg-pink-500' : 'bg-sky-400'}`} 
          style={{ backgroundColor: !isTerminal && !isSynth ? customOverlayColor : undefined }} 
        />

      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 3D HP LAPTOP STAGE CONTAINER                                 */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div 
        className="relative w-full mx-auto flex flex-col items-center justify-center my-4 perspective-[1400px] cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        {/* Antigravity floating ambient spotlight */}
        <div 
          className="absolute w-[85%] h-[240px] rounded-full filter blur-[100px] -z-10 opacity-20 transition-all duration-700 pointer-events-none"
          style={{ backgroundColor: activeApp === 'project' ? getAppAccent(activeProject.title) : '#38bdf8' }}
        />

        {/* Floating Subtle 3D Physics Chassis */}
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
          {/* LAPTOP DISPLAY CHASSIS */}
          <div 
            className="relative w-full rounded-3xl border-4 border-[#2b3038] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] overflow-hidden bg-[#020617]"
            style={{ minHeight: '640px' }}
          >
            {/* 1. TOP BEZEL WITH WEBCAM & DUAL ARRAY MIC */}
            <div className="h-6 bg-[#12161f] border-b border-[#202530] flex items-center justify-center px-6 shrink-0 z-30 select-none">
              <div className="flex items-center gap-2">
                {/* Left Mic */}
                <div className="w-1 h-1 rounded-full bg-slate-700" />

                {/* HP TrueVision Camera Lens */}
                <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center p-0.5 shadow-inner">
                  <div className={`w-1 h-1 rounded-full transition-colors ${
                    activeApp === 'camera' && !isWindowMinimized 
                      ? 'bg-sky-400 shadow-[0_0_5px_#38bdf8]' 
                      : 'bg-sky-950 border border-sky-900'
                  }`} />
                </div>

                {/* Physical White Camera Status LED (Bright white glow when open, completely OFF when closed) */}
                <div 
                  className={`transition-all duration-300 rounded-full ${
                    activeApp === 'camera' && !isWindowMinimized 
                      ? 'w-1.5 h-1.5 bg-white shadow-[0_0_8px_#ffffff,0_0_16px_#ffffff] animate-pulse' 
                      : 'w-1 h-1 bg-slate-800/80 border border-slate-700/50 opacity-30'
                  }`} 
                  title={activeApp === 'camera' && !isWindowMinimized ? "HP TrueVision Camera Active (White LED ON)" : "Camera Inactive (LED OFF)"} 
                />

                {/* Right Mic */}
                <div className="w-1 h-1 rounded-full bg-slate-700" />
              </div>
            </div>

            {/* 2. WINDOWS 11 SCREEN DISPLAY CONTAINER */}
            <div 
              className="relative flex-1 flex flex-col overflow-hidden bg-[#040814]"
              style={{
                minHeight: '580px',
                filter: `brightness(${screenBrightness}%)`
              }}
            >
              {/* ─────────────────────────────────────────────────── */}
              {/* CONTINUOUS LIVE 4K/8K ENHANCED VIDEO WALLPAPER: har.mp4 */}
              {/* ─────────────────────────────────────────────────── */}
              <div className="absolute inset-0 z-0 overflow-hidden select-none">
                <video
                  ref={videoRef}
                  src={harryVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-all duration-700"
                  style={{ 
                    filter: 'contrast(1.08) brightness(1.03) saturate(1.12)',
                    imageRendering: 'crisp-edges',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                />
                {/* Modern dark gradient overlay so text, desktop icons, and windows have crystal clear contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/50 pointer-events-none z-[1]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_10%,rgba(0,0,0,0.3)_100%)] pointer-events-none z-[1]" />
              </div>

              {/* ─────────────────────────────────────────────────── */}
              {/* DESKTOP CONTENT WORKSPACE                           */}
              {/* ─────────────────────────────────────────────────── */}
              <div ref={desktopRef} className="flex-1 relative p-3 flex flex-col justify-between overflow-hidden z-10">
                
                {/* DESKTOP HOME SCREEN APPS (Windows-style Draggable Icons) */}
                <div className="flex flex-col flex-wrap content-start items-start gap-y-1 gap-x-1.5 h-full max-h-[440px] z-10 text-left py-1 select-none pointer-events-auto">
                  
                  {/* ── COLUMN 1: SYSTEM & UTILITIES ── */}
                  {/* 1. File Explorer / This PC */}
                  <motion.div
                    drag
                    dragConstraints={desktopRef}
                    dragElastic={0.06}
                    dragMomentum={false}
                    whileDrag={{ scale: 1.1, zIndex: 40 }}
                    onDragStart={() => { isDraggingIconRef.current = true; }}
                    onDragEnd={() => { setTimeout(() => { isDraggingIconRef.current = false; }, 120); }}
                    onClick={() => {
                      if (!isDraggingIconRef.current) openApp('explorer');
                    }}
                    className="group flex flex-col items-center justify-center p-1 rounded-[3px] hover:bg-sky-400/15 hover:border-sky-400/30 border border-transparent transition-colors cursor-grab active:cursor-grabbing text-center w-[64px] h-[64px] select-none"
                    title="This PC (File Explorer)"
                  >
                    <div className="w-7.5 h-7.5 flex items-center justify-center mb-0.5 group-hover:scale-105 transition-transform shrink-0 pointer-events-none">
                      <img src={folderImg} alt="This PC" className="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                    </div>
                    <span className="text-[9px] leading-tight font-sans text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] truncate max-w-[60px] pointer-events-none">
                      This PC
                    </span>
                  </motion.div>

                  {/* 2. Recycle Bin */}
                  <motion.div
                    drag
                    dragConstraints={desktopRef}
                    dragElastic={0.06}
                    dragMomentum={false}
                    whileDrag={{ scale: 1.1, zIndex: 40 }}
                    onDragStart={() => { isDraggingIconRef.current = true; }}
                    onDragEnd={() => { setTimeout(() => { isDraggingIconRef.current = false; }, 120); }}
                    onClick={() => {
                      if (!isDraggingIconRef.current) openApp('recycle_bin');
                    }}
                    className="group flex flex-col items-center justify-center p-1 rounded-[3px] hover:bg-sky-400/15 hover:border-sky-400/30 border border-transparent transition-colors cursor-grab active:cursor-grabbing text-center w-[64px] h-[64px] select-none"
                    title="Recycle Bin"
                  >
                    <div className="w-7.5 h-7.5 flex items-center justify-center mb-0.5 group-hover:scale-105 transition-transform shrink-0 pointer-events-none">
                      <img src={binImg} alt="Recycle Bin" className="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                    </div>
                    <span className="text-[9px] leading-tight font-sans text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] truncate max-w-[60px] pointer-events-none">
                      Recycle Bin
                    </span>
                  </motion.div>

                  {/* 3. Google Chrome */}
                  <motion.div
                    drag
                    dragConstraints={desktopRef}
                    dragElastic={0.06}
                    dragMomentum={false}
                    whileDrag={{ scale: 1.1, zIndex: 40 }}
                    onDragStart={() => { isDraggingIconRef.current = true; }}
                    onDragEnd={() => { setTimeout(() => { isDraggingIconRef.current = false; }, 120); }}
                    onClick={() => {
                      if (!isDraggingIconRef.current) openApp('chrome');
                    }}
                    className="group flex flex-col items-center justify-center p-1 rounded-[3px] hover:bg-sky-400/15 hover:border-sky-400/30 border border-transparent transition-colors cursor-grab active:cursor-grabbing text-center w-[64px] h-[64px] select-none"
                    title="Google Chrome Browser"
                  >
                    <div className="w-7.5 h-7.5 flex items-center justify-center mb-0.5 group-hover:scale-105 transition-transform shrink-0 pointer-events-none">
                      <img src={chromeImg} alt="Chrome" className="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                    </div>
                    <span className="text-[9px] leading-tight font-sans text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] truncate max-w-[60px] pointer-events-none">
                      Chrome
                    </span>
                  </motion.div>

                  {/* 4. VS Code Studio */}
                  <motion.div
                    drag
                    dragConstraints={desktopRef}
                    dragElastic={0.06}
                    dragMomentum={false}
                    whileDrag={{ scale: 1.1, zIndex: 40 }}
                    onDragStart={() => { isDraggingIconRef.current = true; }}
                    onDragEnd={() => { setTimeout(() => { isDraggingIconRef.current = false; }, 120); }}
                    onClick={() => {
                      if (!isDraggingIconRef.current) openApp('vscode');
                    }}
                    className="group flex flex-col items-center justify-center p-1 rounded-[3px] hover:bg-sky-400/15 hover:border-sky-400/30 border border-transparent transition-colors cursor-grab active:cursor-grabbing text-center w-[64px] h-[64px] select-none"
                    title="VS Code Architecture Editor"
                  >
                    <div className="w-7.5 h-7.5 flex items-center justify-center mb-0.5 group-hover:scale-105 transition-transform shrink-0 pointer-events-none">
                      <img src={vsCodeImg} alt="VS Code" className="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                    </div>
                    <span className="text-[9px] leading-tight font-sans text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] truncate max-w-[60px] pointer-events-none">
                      VS Code
                    </span>
                  </motion.div>

                  {/* 5. Windows Terminal */}
                  <motion.div
                    drag
                    dragConstraints={desktopRef}
                    dragElastic={0.06}
                    dragMomentum={false}
                    whileDrag={{ scale: 1.1, zIndex: 40 }}
                    onDragStart={() => { isDraggingIconRef.current = true; }}
                    onDragEnd={() => { setTimeout(() => { isDraggingIconRef.current = false; }, 120); }}
                    onClick={() => {
                      if (!isDraggingIconRef.current) openApp('terminal');
                    }}
                    className="group flex flex-col items-center justify-center p-1 rounded-[3px] hover:bg-sky-400/15 hover:border-sky-400/30 border border-transparent transition-colors cursor-grab active:cursor-grabbing text-center w-[64px] h-[64px] select-none"
                    title="Windows Terminal (PowerShell)"
                  >
                    <div className="w-7.5 h-7.5 flex items-center justify-center mb-0.5 group-hover:scale-105 transition-transform shrink-0 pointer-events-none">
                      <div className="w-7 h-7 rounded-[4px] bg-slate-900/90 flex items-center justify-center shadow">
                        <TerminalIcon className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300" />
                      </div>
                    </div>
                    <span className="text-[9px] leading-tight font-sans text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] truncate max-w-[60px] pointer-events-none">
                      Terminal
                    </span>
                  </motion.div>

                  {/* 6. Patent Document */}
                  <motion.div
                    drag
                    dragConstraints={desktopRef}
                    dragElastic={0.06}
                    dragMomentum={false}
                    whileDrag={{ scale: 1.1, zIndex: 40 }}
                    onDragStart={() => { isDraggingIconRef.current = true; }}
                    onDragEnd={() => { setTimeout(() => { isDraggingIconRef.current = false; }, 120); }}
                    onClick={() => {
                      if (!isDraggingIconRef.current) openApp('patent');
                    }}
                    className="group flex flex-col items-center justify-center p-1 rounded-[3px] hover:bg-sky-400/15 hover:border-sky-400/30 border border-transparent transition-colors cursor-grab active:cursor-grabbing text-center w-[64px] h-[64px] select-none"
                    title="Patent 202641010900 Document"
                  >
                    <div className="w-7.5 h-7.5 flex items-center justify-center mb-0.5 group-hover:scale-105 transition-transform shrink-0 pointer-events-none">
                      <img src={dspImg} alt="Patent" className="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] scale-125" />
                    </div>
                    <span className="text-[9px] leading-tight font-sans text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] truncate max-w-[60px] pointer-events-none">
                      Patent 2026
                    </span>
                  </motion.div>

                  {/* ── COLUMN 2: FEATURED AI APPS & PROJECTS ── */}
                  {/* 7. NextTrip AI App */}
                  <motion.div
                    drag
                    dragConstraints={desktopRef}
                    dragElastic={0.06}
                    dragMomentum={false}
                    whileDrag={{ scale: 1.1, zIndex: 40 }}
                    onDragStart={() => { isDraggingIconRef.current = true; }}
                    onDragEnd={() => { setTimeout(() => { isDraggingIconRef.current = false; }, 120); }}
                    onClick={() => {
                      if (!isDraggingIconRef.current) openApp('project', 0);
                    }}
                    className="group flex flex-col items-center justify-center p-1 rounded-[3px] hover:bg-sky-400/15 hover:border-sky-400/30 border border-transparent transition-colors cursor-grab active:cursor-grabbing text-center w-[64px] h-[64px] select-none"
                    title="NextTrip AI Bus Platform"
                  >
                    <div className="w-7.5 h-7.5 flex items-center justify-center mb-0.5 group-hover:scale-105 transition-transform shrink-0 pointer-events-none">
                      <img src={nextTripLogo} alt="NextTrip" className="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                    </div>
                    <span className="text-[9px] leading-tight font-sans text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] truncate max-w-[60px] pointer-events-none">
                      NextTrip AI
                    </span>
                  </motion.div>

                  {/* 8. Ujjwal-Hub App */}
                  <motion.div
                    drag
                    dragConstraints={desktopRef}
                    dragElastic={0.06}
                    dragMomentum={false}
                    whileDrag={{ scale: 1.1, zIndex: 40 }}
                    onDragStart={() => { isDraggingIconRef.current = true; }}
                    onDragEnd={() => { setTimeout(() => { isDraggingIconRef.current = false; }, 120); }}
                    onClick={() => {
                      if (!isDraggingIconRef.current) openApp('project', 1);
                    }}
                    className="group flex flex-col items-center justify-center p-1 rounded-[3px] hover:bg-sky-400/15 hover:border-sky-400/30 border border-transparent transition-colors cursor-grab active:cursor-grabbing text-center w-[64px] h-[64px] select-none"
                    title="Ujjwal-Hub Smart IoT Waste Command"
                  >
                    <div className="w-7.5 h-7.5 flex items-center justify-center mb-0.5 group-hover:scale-105 transition-transform shrink-0 pointer-events-none">
                      <img src={ujjwalHubLogo} alt="Ujjwal-Hub" className="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                    </div>
                    <span className="text-[9px] leading-tight font-sans text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] truncate max-w-[60px] pointer-events-none">
                      Ujjwal-Hub
                    </span>
                  </motion.div>

                  {/* 9. Shubh AI Studio App */}
                  <motion.div
                    drag
                    dragConstraints={desktopRef}
                    dragElastic={0.06}
                    dragMomentum={false}
                    whileDrag={{ scale: 1.1, zIndex: 40 }}
                    onDragStart={() => { isDraggingIconRef.current = true; }}
                    onDragEnd={() => { setTimeout(() => { isDraggingIconRef.current = false; }, 120); }}
                    onClick={() => {
                      if (!isDraggingIconRef.current) openApp('project', 2);
                    }}
                    className="group flex flex-col items-center justify-center p-1 rounded-[3px] hover:bg-sky-400/15 hover:border-sky-400/30 border border-transparent transition-colors cursor-grab active:cursor-grabbing text-center w-[64px] h-[64px] select-none"
                    title="Shubh AI Studio"
                  >
                    <div className="w-7.5 h-7.5 flex items-center justify-center mb-0.5 group-hover:scale-105 transition-transform shrink-0 pointer-events-none">
                      <img src={logoshubh} alt="Shubh AI Studio" className="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] scale-160" />
                    </div>
                    <span className="text-[9px] leading-tight font-sans text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] truncate max-w-[60px] pointer-events-none">
                      Shubh AI
                    </span>
                  </motion.div>

                  {/* 10. HireZeno 2.O App */}
                  <motion.div
                    drag
                    dragConstraints={desktopRef}
                    dragElastic={0.06}
                    dragMomentum={false}
                    whileDrag={{ scale: 1.1, zIndex: 40 }}
                    onDragStart={() => { isDraggingIconRef.current = true; }}
                    onDragEnd={() => { setTimeout(() => { isDraggingIconRef.current = false; }, 120); }}
                    onClick={() => {
                      if (!isDraggingIconRef.current) openApp('project', 3);
                    }}
                    className="group flex flex-col items-center justify-center p-1 rounded-[3px] hover:bg-sky-400/15 hover:border-sky-400/30 border border-transparent transition-colors cursor-grab active:cursor-grabbing text-center w-[64px] h-[64px] select-none"
                    title="HireZeno 2.O AI Resume Matcher"
                  >
                    <div className="w-7.5 h-7.5 flex items-center justify-center mb-0.5 group-hover:scale-105 transition-transform shrink-0 pointer-events-none">
                      <img src={hireZenoLogo} alt="HireZeno 2.O" className="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] scale-140" />
                    </div>
                    <span className="text-[9px] leading-tight font-sans text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] truncate max-w-[60px] pointer-events-none">
                      HireZeno 2.O
                    </span>
                  </motion.div>

                  {/* 11. FitMitra AI */}
                  <motion.div
                    drag
                    dragConstraints={desktopRef}
                    dragElastic={0.06}
                    dragMomentum={false}
                    whileDrag={{ scale: 1.1, zIndex: 40 }}
                    onDragStart={() => { isDraggingIconRef.current = true; }}
                    onDragEnd={() => { setTimeout(() => { isDraggingIconRef.current = false; }, 120); }}
                    onClick={() => {
                      if (!isDraggingIconRef.current) openApp('fitmitra');
                    }}
                    className="group flex flex-col items-center justify-center p-1 rounded-[3px] hover:bg-sky-400/15 hover:border-sky-400/30 border border-transparent transition-colors cursor-grab active:cursor-grabbing text-center w-[64px] h-[64px] select-none"
                    title="FitMitra AI Health & Biometrics"
                  >
                    <div className="w-7.5 h-7.5 flex items-center justify-center mb-0.5 group-hover:scale-105 transition-transform shrink-0 pointer-events-none">
                      <img src={fitmitraImg} alt="FitMitra" className="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] scale-110" />
                    </div>
                    <span className="text-[9px] leading-tight font-sans text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] truncate max-w-[60px] pointer-events-none">
                      FitMitra AI
                    </span>
                  </motion.div>

                  {/* 12. Camera */}
                  <motion.div
                    drag
                    dragConstraints={desktopRef}
                    dragElastic={0.06}
                    dragMomentum={false}
                    whileDrag={{ scale: 1.1, zIndex: 40 }}
                    onDragStart={() => { isDraggingIconRef.current = true; }}
                    onDragEnd={() => { setTimeout(() => { isDraggingIconRef.current = false; }, 120); }}
                    onClick={() => {
                      if (!isDraggingIconRef.current) openApp('camera');
                    }}
                    className="group flex flex-col items-center justify-center p-1 rounded-[3px] hover:bg-sky-400/15 hover:border-sky-400/30 border border-transparent transition-colors cursor-grab active:cursor-grabbing text-center w-[64px] h-[64px] select-none"
                    title="Camera (HP TrueVision FHD Camera)"
                  >
                    <div className="w-7.5 h-7.5 flex items-center justify-center mb-0.5 group-hover:scale-105 transition-transform shrink-0 pointer-events-none">
                      <img src={camImg} alt="Camera" className="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] scale-110" />
                    </div>
                    <span className="text-[9px] leading-tight font-sans text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] truncate max-w-[60px] pointer-events-none">
                      Camera
                    </span>
                  </motion.div>
                </div>

                {/* ─────────────────────────────────────────────────── */}
                {/* C. ACTIVE WINDOW VIEWPORT (WITH WINDOW CONTROLS)    */}
                {/* ─────────────────────────────────────────────────── */}
                <AnimatePresence mode="wait">
                  {activeApp && !isWindowMinimized && (
                    <motion.div
                      key={activeApp === 'project' ? `proj_${activeProjectIdx}_${activeTab}` : activeApp}
                      initial={{ opacity: 0, scale: 0.95, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 12 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className={`absolute ${
                        isWindowMaximized 
                          ? 'inset-1 rounded-xl' 
                          : 'top-2 left-6 right-6 bottom-2 rounded-2xl'
                      } bg-slate-950/95 border border-slate-700/80 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden backdrop-blur-2xl z-20`}
                    >
                      {/* Window Titlebar */}
                      <div className="h-8 bg-slate-900/95 border-b border-slate-800 px-3 flex items-center justify-between shrink-0 select-none">
                        
                        {/* Title & Icon */}
                        <div className="flex items-center gap-2">
                          {activeApp === 'project' ? (
                            activeTab === 'task_manager' ? (
                              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                            ) : (
                              <img src={getAppLogo(activeProject.title)} alt="" className="w-4 h-4 object-contain rounded" />
                            )
                          ) : activeApp === 'fitmitra' ? (
                            <img src={fitmitraImg} alt="FitMitra" className="w-4 h-4 object-contain rounded" />
                          ) : activeApp === 'camera' ? (
                            <img src={camImg} alt="Camera" className="w-4 h-4 object-contain rounded" />
                          ) : activeApp === 'vscode' ? (
                            <img src={vsCodeImg} alt="VS Code" className="w-4 h-4 object-contain rounded" />
                          ) : activeApp === 'patent' ? (
                            <img src={dspImg} alt="Patent" className="w-4 h-4 object-contain rounded" />
                          ) : activeApp === 'chrome' ? (
                            <img src={chromeImg} alt="Chrome" className="w-4 h-4 object-contain rounded" />
                          ) : activeApp === 'explorer' ? (
                            <img src={folderImg} alt="Explorer" className="w-4 h-4 object-contain rounded" />
                          ) : activeApp === 'settings' ? (
                            <SettingsIcon className="w-3.5 h-3.5 text-sky-400" />
                          ) : activeApp === 'terminal' ? (
                            <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <img src={binImg} alt="Recycle Bin" className="w-4 h-4 object-contain rounded" />
                          )}

                          <span className="text-[10.5px] font-extrabold text-white tracking-tight">
                            {activeApp === 'project' 
                              ? (activeTab === 'task_manager' ? 'Task Manager — System Intelligence' : activeProject.title)
                              : activeApp === 'fitmitra'
                              ? 'FitMitra AI — Intelligent Biometrics & Form Classifier'
                              : activeApp === 'camera'
                              ? 'Camera — HP TrueVision FHD IR Camera'
                              : activeApp === 'vscode'
                              ? 'Visual Studio Code — Dileep Architecture & Microservices'
                              : activeApp === 'patent'
                              ? 'Patent Gazette — Application No. 202641010900'
                              : activeApp === 'chrome'
                              ? 'Google Chrome'
                              : activeApp === 'explorer'
                              ? 'File Explorer — Dileep Workspace'
                              : activeApp === 'settings'
                              ? 'Windows Settings'
                              : activeApp === 'terminal'
                              ? 'Windows PowerShell — Administrator'
                              : 'Recycle Bin'}
                          </span>

                          {activeApp === 'project' && (
                            <span className="text-[7px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                              {activeTab === 'task_manager' ? 'Windows 11 Live' : activeProject.subtitle}
                            </span>
                          )}
                          {activeApp === 'camera' && (
                            <span className="text-[7px] font-mono px-1.5 py-0.2 rounded bg-sky-950 text-sky-300 border border-sky-700">
                              1080p 60FPS
                            </span>
                          )}
                          {activeApp === 'fitmitra' && (
                            <span className="text-[7px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                              Production Biometrics
                            </span>
                          )}
                          {activeApp === 'vscode' && (
                            <span className="text-[7px] font-mono px-1.5 py-0.2 rounded bg-blue-950 text-blue-300 border border-blue-700">
                              TypeScript • Python • FastAPI
                            </span>
                          )}
                          {activeApp === 'patent' && (
                            <span className="text-[7px] font-mono px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-700">
                              Published Patent
                            </span>
                          )}
                        </div>

                        {/* Project View Switcher (App View / Task Manager) */}
                        {activeApp === 'project' && (
                          <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[7px] font-mono">
                            <button
                              onClick={() => {
                                windowsSound.playClick();
                                setActiveTab('app');
                              }}
                              className={`px-2 py-0.5 rounded cursor-pointer ${activeTab === 'app' ? 'bg-sky-500 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                            >
                              App View
                            </button>
                            <button
                              onClick={() => {
                                windowsSound.playClick();
                                setActiveTab('task_manager');
                              }}
                              className={`px-2 py-0.5 rounded cursor-pointer ${activeTab === 'task_manager' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                            >
                              Task Manager
                            </button>
                          </div>
                        )}

                        {/* Standard Windows Window Controls (Minimize, Maximize, Close) */}
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={handleMinimize}
                            className="w-5 h-5 rounded hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                            title="Minimize"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <button 
                            onClick={() => {
                              windowsSound.playClick();
                              setIsWindowMaximized(!isWindowMaximized);
                            }}
                            className="w-5 h-5 rounded hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                            title={isWindowMaximized ? "Restore" : "Maximize"}
                          >
                            {isWindowMaximized ? <Minimize2 className="w-2.5 h-2.5" /> : <Maximize2 className="w-2.5 h-2.5" />}
                          </button>
                          <button 
                            onClick={handleCloseWindow}
                            className="w-5 h-5 rounded hover:bg-red-600 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                            title="Close"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Window Main Content Viewport */}
                      <div className="flex-1 relative overflow-y-auto no-scrollbar bg-slate-950">
                        
                        {/* 1. PROJECT APPS */}
                        {activeApp === 'project' && (
                          activeTab === 'task_manager' ? (
                            /* TASK MANAGER */
                            <div className="p-4 space-y-3 text-left font-sans bg-slate-950">
                              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-md space-y-2">
                                <div className="flex items-center gap-2 text-emerald-400 text-[9px] font-bold">
                                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                                  <span>Active System Orchestration Telemetry</span>
                                </div>
                                <div className="space-y-1.5 text-[8.5px] text-slate-300">
                                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                    <span>FastAPI Gateway running locally on port 5000 (Active)</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                    <span>Vite HMR Development Server on port 3000 (Ready)</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                                    <Info className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                                    <span>Local AI NLP Pipeline inference latency: 42ms</span>
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-2 text-[8px] font-mono">
                                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-sky-500/20">
                                  <div className="flex justify-between items-center text-slate-400">
                                    <span>Intel Core i9-13900H</span>
                                    <span className="text-sky-400 font-bold">12.8%</span>
                                  </div>
                                  <div className="h-1 bg-slate-950 rounded-full mt-1.5 overflow-hidden">
                                    <div className="h-full bg-sky-400 w-[13%]" />
                                  </div>
                                  <span className="text-[6.5px] text-slate-500 block mt-1">14 Cores • 20 Threads • 5.4 GHz Turbo</span>
                                </div>

                                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-emerald-500/20">
                                  <div className="flex justify-between items-center text-slate-400">
                                    <span>64 GB DDR5 5600MHz</span>
                                    <span className="text-emerald-400 font-bold">9.2 / 64 GB</span>
                                  </div>
                                  <div className="h-1 bg-slate-950 rounded-full mt-1.5 overflow-hidden">
                                    <div className="h-full bg-emerald-400 w-[14%]\" />
                                  </div>
                                  <span className="text-[6.5px] text-slate-500 block mt-1">High-Throughput Dual Channel Architecture</span>
                                </div>
                              </div>

                              {/* Project Processes */}
                              <div className="rounded-xl bg-slate-900/70 border border-slate-800 overflow-hidden text-[7.5px] font-mono">
                                <div className="bg-slate-900 px-3 py-1.5 border-b border-slate-850 flex justify-between text-slate-400 font-bold">
                                  <span>Active Process</span>
                                  <span>Status</span>
                                  <span>Memory</span>
                                </div>
                                {projects.map((p, idx) => (
                                  <div 
                                    key={p.title} 
                                    onClick={() => {
                                      windowsSound.playClick();
                                      setActiveProjectIdx(idx);
                                      setActiveTab('app');
                                    }}
                                    className="px-3 py-1.5 border-b border-slate-900 flex justify-between items-center hover:bg-slate-800/60 cursor-pointer"
                                  >
                                    <div className="flex items-center gap-1.5 text-white font-bold">
                                      <img src={getAppLogo(p.title)} alt="" className="w-3.5 h-3.5 object-contain rounded" />
                                      <span>{p.title}.exe</span>
                                    </div>
                                    <span className="text-emerald-400 font-bold">Running (Feature Flow Active)</span>
                                    <span className="text-slate-400">168 MB</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            /* LIVE APPLICATION FLOW - Plays complete feature flow */
                            <>
                              {activeProjectIdx === 0 && <NextTripPreview />}
                              {activeProjectIdx === 1 && <UjjwalHubPreview />}
                              {activeProjectIdx === 2 && <ShubhAIStudioPreview />}
                              {activeProjectIdx === 3 && <HireZenoPreview />}
                            </>
                          )
                        )}

                        {/* 2. GOOGLE CHROME */}
                        {activeApp === 'chrome' && (
                          <GoogleChromeApp />
                        )}

                        {/* 3. FILE EXPLORER */}
                        {activeApp === 'explorer' && (
                          <FolderExplorerApp 
                            onOpenProject={(idx) => openApp('project', idx)} 
                            onOpenVSCode={() => openApp('vscode')} 
                          />
                        )}

                        {/* 4. WINDOWS SETTINGS */}
                        {activeApp === 'settings' && (
                          <div className="h-full flex flex-col bg-slate-950 p-6 text-left font-sans overflow-y-auto space-y-4">
                            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                              <div className="w-12 h-12 rounded-2xl bg-sky-950 border border-sky-500/40 flex items-center justify-center text-sky-400">
                                <Laptop className="w-6 h-6" />
                              </div>
                              <div>
                                <h3 className="text-base font-extrabold text-white">HP Spectre Pro 16 AI Workstation</h3>
                                <p className="text-xs text-slate-400 font-mono">Windows 11 Pro • Architecture Build 22631.3007</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                                <span className="text-slate-400 text-[9px] font-mono uppercase block">Processor</span>
                                <span className="text-white font-bold">13th Gen Intel(R) Core(TM) i9-13900H (14 Cores, 20 Threads)</span>
                              </div>
                              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                                <span className="text-slate-400 text-[9px] font-mono uppercase block">Installed RAM</span>
                                <span className="text-white font-bold">64.0 GB DDR5 (5600 MHz Dual-Channel)</span>
                              </div>
                              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                                <span className="text-slate-400 text-[9px] font-mono uppercase block">Graphics Acceleration</span>
                                <span className="text-white font-bold">NVIDIA GeForce RTX 4080 Laptop GPU (12GB GDDR6)</span>
                              </div>
                              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                                <span className="text-slate-400 text-[9px] font-mono uppercase block">Developer Experience</span>
                                <span className="text-emerald-400 font-bold">AI Copilot Ready • Local PyTorch &amp; Docker Host</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 5. POWERSHELL TERMINAL */}
                        {activeApp === 'terminal' && (
                          <div className="h-full bg-slate-950 p-4 font-mono text-left text-xs flex flex-col justify-between overflow-hidden">
                            <div className="flex-1 overflow-y-auto space-y-1.5 no-scrollbar">
                              {terminalHistory.map((h, i) => (
                                <div 
                                  key={i} 
                                  className={
                                    h.type === 'cmd' 
                                      ? 'text-white font-bold' 
                                      : h.type === 'error' 
                                      ? 'text-red-400' 
                                      : 'text-emerald-400 leading-relaxed'
                                  }
                                >
                                  {h.text}
                                </div>
                              ))}
                            </div>

                            {/* Prompt Input */}
                            <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-2 border-t border-slate-850 mt-2">
                              <span className="text-sky-400 font-bold shrink-0">PS {terminalPath}&gt;</span>
                              <input
                                type="text"
                                value={terminalInput}
                                onChange={e => setTerminalInput(e.target.value)}
                                placeholder="type 'cd projects', 'dir', 'python run', 'cls', or 'help'"
                                className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs"
                                autoFocus
                              />
                            </form>
                          </div>
                        )}

                        {/* 6. RECYCLE BIN */}
                        {activeApp === 'recycle_bin' && (
                          <div className="h-full flex flex-col items-center justify-center p-6 text-center text-slate-400 font-sans">
                            <Trash2 className="w-12 h-12 text-slate-600 mb-2" />
                            <h4 className="text-sm font-bold text-slate-200">Recycle Bin is Empty</h4>
                            <p className="text-xs text-slate-500 font-mono mt-1">All code repositories &amp; models are in healthy production states.</p>
                          </div>
                        )}

                        {/* 7. FITMITRA AI */}
                        {activeApp === 'fitmitra' && (
                          <div className="h-full flex flex-col bg-slate-950 text-left font-sans">
                            <FitMitraPreview />
                          </div>
                        )}

                        {/* 8. CAMERA APP */}
                        {activeApp === 'camera' && (
                          <div className="h-full flex flex-col bg-slate-950 overflow-hidden">
                            <CameraApp />
                          </div>
                        )}

                        {/* 9. VS CODE STUDIO */}
                        {activeApp === 'vscode' && (
                          <VSCodeStudioApp />
                        )}

                        {/* 10. PATENT LEDGER & GAZETTE */}
                        {activeApp === 'patent' && (
                          <div className="h-full flex flex-col bg-slate-950 p-5 text-left font-sans overflow-y-auto space-y-3.5 no-scrollbar">
                            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-2 shadow-lg">
                              <div className="flex items-center justify-between">
                                <span className="text-[7.5px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-900/60 px-2 py-0.5 rounded-full border border-amber-500/40">
                                  Official Patent Filing Gazette
                                </span>
                                <span className="text-[7.5px] font-mono text-slate-400">Application No: 202641010900</span>
                              </div>
                              <h3 className="text-sm font-black text-white tracking-tight">
                                System and Method for Optimizing Garbage Collection Operations
                              </h3>
                              <p className="text-[8.5px] text-slate-300 leading-relaxed font-sans">
                                <strong>Inventors:</strong> Dileep Sai Galla et al. | <strong>Status:</strong> Published &amp; Field Verified
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-[8px] font-mono">
                              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                                <span className="text-slate-500 block uppercase">Core Innovation</span>
                                <span className="text-white font-bold block">Dynamic K-Means Clusterizer with A* Path Recomputation</span>
                              </div>
                              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                                <span className="text-slate-500 block uppercase">Measured Efficiency</span>
                                <span className="text-emerald-400 font-bold block">35% Fuel Reduction • Sub-2s Route Response</span>
                              </div>
                            </div>

                            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                              <span className="text-[8.5px] font-bold text-white font-mono uppercase block text-sky-400">
                                Telemetry Architecture Abstract:
                              </span>
                              <p className="text-[8px] text-slate-300 leading-relaxed font-mono">
                                IoT ultrasonic sensor telemetry sends real-time bin volume levels over MQTT to an edge ingestion server. The clustering model dynamically clusters overflowing bins and recalculates multi-stop vehicle paths using heuristic weights, eliminating empty runs and preventing bin overflows across municipal fleets.
                              </p>
                            </div>
                          </div>
                        )}

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* ─────────────────────────────────────────────────── */}
              {/* D. WINDOWS 11 START MENU FLYOUT                     */}
              {/* ─────────────────────────────────────────────────── */}
              <AnimatePresence>
                {isStartMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#1f2733]/95 border border-slate-700/80 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl p-4 flex flex-col gap-3.5 z-40 text-left select-none"
                  >
                    {/* Search Bar */}
                    <div className="bg-[#141b24] border border-slate-700 rounded-full px-3.5 py-1.5 flex items-center gap-2 text-slate-300 shadow-inner">
                      <Search className="w-3.5 h-3.5 text-slate-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Type here to search apps, settings, and documents..."
                        className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none font-sans"
                      />
                    </div>

                    {/* Pinned Section */}
                    <div>
                      <div className="flex justify-between items-center px-1 mb-2">
                        <span className="text-[10px] font-bold text-white font-sans">Pinned Apps</span>
                        <span className="text-[8.5px] font-mono text-sky-400 hover:underline cursor-pointer">All apps &gt;</span>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-2 text-center text-[8.5px] font-sans max-h-48 overflow-y-auto no-scrollbar py-0.5">
                        {/* 1. NextTrip */}
                        <button 
                          onClick={() => openApp('project', 0)}
                          className="flex flex-col items-center p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
                        >
                          <img src={nextTripLogo} alt="" className="w-6.5 h-6.5 object-contain rounded group-hover:scale-110 transition-transform" />
                          <span className="text-white font-medium mt-1 truncate w-full">NextTrip</span>
                        </button>

                        {/* 2. Ujjwal-Hub */}
                        <button 
                          onClick={() => openApp('project', 1)}
                          className="flex flex-col items-center p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
                        >
                          <img src={ujjwalHubLogo} alt="" className="w-6.5 h-6.5 object-contain rounded group-hover:scale-110 transition-transform" />
                          <span className="text-white font-medium mt-1 truncate w-full">Ujjwal-Hub</span>
                        </button>

                        {/* 3. Shubh AI Studio */}
                        <button 
                          onClick={() => openApp('project', 2)}
                          className="flex flex-col items-center p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
                        >
                          <img src={logoshubh} alt="" className="w-6.5 h-6.5 object-contain rounded group-hover:scale-110 transition-transform scale-125" />
                          <span className="text-white font-medium mt-1 truncate w-full">Shubh AI</span>
                        </button>

                        {/* 4. HireZeno */}
                        <button 
                          onClick={() => openApp('project', 3)}
                          className="flex flex-col items-center p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
                        >
                          <img src={hireZenoLogo} alt="" className="w-6.5 h-6.5 object-contain rounded group-hover:scale-110 transition-transform" />
                          <span className="text-white font-medium mt-1 truncate w-full">HireZeno</span>
                        </button>

                        {/* 5. FitMitra AI */}
                        <button 
                          onClick={() => openApp('fitmitra')}
                          className="flex flex-col items-center p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
                        >
                          <img src={fitmitraImg} alt="" className="w-6.5 h-6.5 object-contain rounded group-hover:scale-110 transition-transform" />
                          <span className="text-white font-medium mt-1 truncate w-full">FitMitra</span>
                        </button>

                        {/* 6. Camera */}
                        <button 
                          onClick={() => openApp('camera')}
                          className="flex flex-col items-center p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
                        >
                          <img src={camImg} alt="" className="w-6.5 h-6.5 object-contain rounded group-hover:scale-110 transition-transform" />
                          <span className="text-white font-medium mt-1 truncate w-full">Camera</span>
                        </button>

                        {/* 7. VS Code */}
                        <button 
                          onClick={() => openApp('vscode')}
                          className="flex flex-col items-center p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
                        >
                          <img src={vsCodeImg} alt="" className="w-6.5 h-6.5 object-contain rounded group-hover:scale-110 transition-transform" />
                          <span className="text-white font-medium mt-1 truncate w-full">VS Code</span>
                        </button>

                        {/* 8. Patent Ledger */}
                        <button 
                          onClick={() => openApp('patent')}
                          className="flex flex-col items-center p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
                        >
                          <img src={dspImg} alt="" className="w-6.5 h-6.5 object-contain rounded group-hover:scale-110 transition-transform" />
                          <span className="text-white font-medium mt-1 truncate w-full">Patent</span>
                        </button>

                        {/* 9. Chrome */}
                        <button 
                          onClick={() => openApp('chrome')}
                          className="flex flex-col items-center p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
                        >
                          <div className="w-6.5 h-6.5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden">
                            <img src={chromeImg} alt="Chrome" className="w-full h-full object-contain" />
                          </div>
                          <span className="text-white font-medium mt-1 truncate w-full">Chrome</span>
                        </button>

                        {/* 10. File Explorer */}
                        <button 
                          onClick={() => openApp('explorer')}
                          className="flex flex-col items-center p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
                        >
                          <div className="w-6.5 h-6.5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden">
                            <img src={folderImg} alt="Explorer" className="w-full h-full object-contain" />
                          </div>
                          <span className="text-white font-medium mt-1 truncate w-full">Explorer</span>
                        </button>

                        {/* 11. Terminal */}
                        <button 
                          onClick={() => openApp('terminal')}
                          className="flex flex-col items-center p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
                        >
                          <div className="w-6.5 h-6.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                            <TerminalIcon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-white font-medium mt-1 truncate w-full">Terminal</span>
                        </button>

                        {/* 12. Settings */}
                        <button 
                          onClick={() => openApp('settings')}
                          className="flex flex-col items-center p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
                        >
                          <div className="w-6.5 h-6.5 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                            <SettingsIcon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-white font-medium mt-1 truncate w-full">Settings</span>
                        </button>
                      </div>
                    </div>

                    {/* Recommended / Recent Items */}
                    <div className="border-t border-slate-700/60 pt-2">
                      <div className="px-1 mb-1.5 text-[10px] font-bold text-white font-sans">Recommended</div>
                      <div className="space-y-1 text-[8px] font-sans text-slate-300">
                        <div 
                          onClick={() => openApp('explorer')}
                          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 text-red-400" />
                          <div className="text-left">
                            <span className="font-bold block text-white">Dileep_Sai_Resume.pdf</span>
                            <span className="text-[7px] text-slate-400 font-mono">Recently updated • Integrated M.Tech</span>
                          </div>
                        </div>
                        <div 
                          onClick={() => openApp('terminal')}
                          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                          <div className="text-left">
                            <span className="font-bold block text-white">ai_pipeline.py (Local NLP Classifier)</span>
                            <span className="text-[7px] text-slate-400 font-mono">FastAPI Microservice backend</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Start Menu Bottom User & Power Bar */}
                    <div className="border-t border-slate-700/60 pt-2 flex items-center justify-between relative">
                      {/* User Avatar */}
                      <div className="flex items-center gap-2">
                        <img src={dileepProfile} alt="Dileep Sai" className="w-7 h-7 rounded-full object-cover border border-sky-400/80 shadow" />
                        <div className="text-left leading-tight">
                          <span className="text-[9.5px] font-extrabold text-white block">Dileep Sai Galla</span>
                          <span className="text-[7px] text-slate-400 font-mono block">Administrator</span>
                        </div>
                      </div>

                      {/* Power Button & Menu */}
                      <div className="relative">
                        <button
                          onClick={() => {
                            windowsSound.playClick();
                            setIsPowerMenuOpen(!isPowerMenuOpen);
                          }}
                          className="p-2 rounded-lg hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-colors cursor-pointer"
                          title="Power Options"
                        >
                          <Power className="w-4 h-4" />
                        </button>

                        {/* Power Popover Menu */}
                        <AnimatePresence>
                          {isPowerMenuOpen && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9, y: 5 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9, y: 5 }}
                              className="absolute right-0 bottom-10 w-32 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-1.5 space-y-1 text-[8.5px] font-sans text-slate-200 z-50"
                            >
                              <button
                                onClick={() => handlePowerAction('lock')}
                                className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-800 text-left cursor-pointer"
                              >
                                <Lock className="w-3 h-3 text-sky-400" />
                                <span>Lock</span>
                              </button>
                              <button
                                onClick={() => handlePowerAction('sleep')}
                                className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-800 text-left cursor-pointer"
                              >
                                <Moon className="w-3 h-3 text-purple-400" />
                                <span>Sleep</span>
                              </button>
                              <button
                                onClick={() => handlePowerAction('restart')}
                                className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-800 text-left cursor-pointer"
                              >
                                <RotateCcw className="w-3 h-3 text-amber-400" />
                                <span>Restart</span>
                              </button>
                              <button
                                onClick={() => handlePowerAction('shutdown')}
                                className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-red-900/60 text-red-300 text-left cursor-pointer"
                              >
                                <Power className="w-3 h-3 text-red-400" />
                                <span>Shut down</span>
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ─────────────────────────────────────────────────── */}
              {/* E. QUICK SETTINGS / ACTION CENTER FLYOUT            */}
              {/* ─────────────────────────────────────────────────── */}
              <AnimatePresence>
                {isQuickSettingsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute bottom-12 right-2 w-80 bg-[#1c232e]/95 border border-slate-700/80 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl p-4 flex flex-col gap-3.5 z-40 text-left select-none"
                  >
                    {/* Quick Setting Tiles (6 Toggle Grid) */}
                    <div className="grid grid-cols-3 gap-2 text-[8px] font-sans">
                      
                      {/* Wi-Fi */}
                      <button
                        onClick={() => {
                          windowsSound.playClick();
                          setWifiEnabled(!wifiEnabled);
                        }}
                        className={`p-2.5 rounded-xl border flex flex-col justify-between h-16 transition-all cursor-pointer ${
                          wifiEnabled 
                            ? 'bg-sky-600 border-sky-400 text-white shadow-md' 
                            : 'bg-slate-900/80 border-slate-700 text-slate-400'
                        }`}
                      >
                        <Wifi className="w-4 h-4" />
                        <div>
                          <span className="font-bold block leading-none">Wi-Fi</span>
                          <span className="text-[6.5px] opacity-80 truncate block mt-0.5">{wifiEnabled ? 'Dileep_5G_Ultra' : 'Off'}</span>
                        </div>
                      </button>

                      {/* Bluetooth */}
                      <button
                        onClick={() => {
                          windowsSound.playClick();
                          setBluetoothEnabled(!bluetoothEnabled);
                        }}
                        className={`p-2.5 rounded-xl border flex flex-col justify-between h-16 transition-all cursor-pointer ${
                          bluetoothEnabled 
                            ? 'bg-sky-600 border-sky-400 text-white shadow-md' 
                            : 'bg-slate-900/80 border-slate-700 text-slate-400'
                        }`}
                      >
                        <Bluetooth className="w-4 h-4" />
                        <div>
                          <span className="font-bold block leading-none">Bluetooth</span>
                          <span className="text-[6.5px] opacity-80 truncate block mt-0.5">{bluetoothEnabled ? 'AirPods Pro' : 'Off'}</span>
                        </div>
                      </button>

                      {/* Airplane Mode */}
                      <button
                        onClick={() => {
                          windowsSound.playClick();
                          setAirplaneMode(!airplaneMode);
                        }}
                        className={`p-2.5 rounded-xl border flex flex-col justify-between h-16 transition-all cursor-pointer ${
                          airplaneMode 
                            ? 'bg-sky-600 border-sky-400 text-white shadow-md' 
                            : 'bg-slate-900/80 border-slate-700 text-slate-400'
                        }`}
                      >
                        <Plane className="w-4 h-4" />
                        <div>
                          <span className="font-bold block leading-none">Airplane</span>
                          <span className="text-[6.5px] opacity-80 block mt-0.5">{airplaneMode ? 'On' : 'Off'}</span>
                        </div>
                      </button>

                      {/* Energy Saver */}
                      <button
                        onClick={() => {
                          windowsSound.playClick();
                          setEnergySaver(!energySaver);
                        }}
                        className={`p-2.5 rounded-xl border flex flex-col justify-between h-16 transition-all cursor-pointer ${
                          energySaver 
                            ? 'bg-emerald-600 border-emerald-400 text-white shadow-md' 
                            : 'bg-slate-900/80 border-slate-700 text-slate-400'
                        }`}
                      >
                        <BatteryCharging className="w-4 h-4" />
                        <div>
                          <span className="font-bold block leading-none">Energy Saver</span>
                          <span className="text-[6.5px] opacity-80 block mt-0.5">{energySaver ? 'Active' : 'Off'}</span>
                        </div>
                      </button>

                      {/* Accessibility */}
                      <button
                        onClick={() => {
                          windowsSound.playClick();
                          setAccessibility(!accessibility);
                        }}
                        className={`p-2.5 rounded-xl border flex flex-col justify-between h-16 transition-all cursor-pointer ${
                          accessibility 
                            ? 'bg-sky-600 border-sky-400 text-white shadow-md' 
                            : 'bg-slate-900/80 border-slate-700 text-slate-400'
                        }`}
                      >
                        <Eye className="w-4 h-4" />
                        <div>
                          <span className="font-bold block leading-none">Accessibility</span>
                          <span className="text-[6.5px] opacity-80 block mt-0.5">High Contrast</span>
                        </div>
                      </button>

                      {/* Project / Cast */}
                      <button
                        onClick={() => {
                          windowsSound.playClick();
                          setProjectCast(!projectCast);
                        }}
                        className={`p-2.5 rounded-xl border flex flex-col justify-between h-16 transition-all cursor-pointer ${
                          projectCast 
                            ? 'bg-sky-600 border-sky-400 text-white shadow-md' 
                            : 'bg-slate-900/80 border-slate-700 text-slate-400'
                        }`}
                      >
                        <Cast className="w-4 h-4" />
                        <div>
                          <span className="font-bold block leading-none">Project</span>
                          <span className="text-[6.5px] opacity-80 block mt-0.5">Duplicate</span>
                        </div>
                      </button>
                    </div>

                    {/* Brightness & Volume Sliders */}
                    <div className="space-y-2.5 pt-1 border-t border-slate-700/60">
                      {/* Brightness Slider */}
                      <div className="flex items-center gap-2.5 text-slate-300">
                        <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                        <input
                          type="range"
                          min={30}
                          max={100}
                          value={screenBrightness}
                          onChange={e => setScreenBrightness(Number(e.target.value))}
                          className="w-full accent-sky-400 h-1 bg-slate-800 rounded-lg cursor-pointer"
                        />
                        <span className="text-[8px] font-mono text-slate-400 w-7 text-right">{screenBrightness}%</span>
                      </div>

                      {/* Volume Slider */}
                      <div className="flex items-center gap-2.5 text-slate-300">
                        <button
                          onClick={() => {
                            windowsSound.playClick();
                            setIsMuted(!isMuted);
                          }}
                          className="shrink-0 cursor-pointer text-slate-300 hover:text-white"
                        >
                          {isMuted || audioVolume === 0 ? (
                            <VolumeX className="w-4 h-4 text-red-400" />
                          ) : (
                            <Volume2 className="w-4 h-4 text-sky-400" />
                          )}
                        </button>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={isMuted ? 0 : audioVolume}
                          onChange={e => {
                            setAudioVolume(Number(e.target.value));
                            if (isMuted) setIsMuted(false);
                          }}
                          className="w-full accent-sky-400 h-1 bg-slate-800 rounded-lg cursor-pointer"
                        />
                        <span className="text-[8px] font-mono text-slate-400 w-7 text-right">{isMuted ? '0%' : `${audioVolume}%`}</span>
                      </div>
                    </div>

                    {/* Battery Status Footer */}
                    <div className="border-t border-slate-700/60 pt-2 flex items-center justify-between text-[8px] font-sans text-slate-300">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                        <BatteryCharging className="w-4 h-4 text-emerald-400" />
                        <span>100% Fully Charged • Plugged in</span>
                      </div>
                      <span className="text-slate-500 font-mono text-[7.5px]">HP Smart Charge</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ─────────────────────────────────────────────────── */}
              {/* F. POWER SCREENS (Lock, Sleep, Restart, Shutdown)   */}
              {/* ─────────────────────────────────────────────────── */}
              <AnimatePresence>
                {powerState === 'locked' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleWakeUpOrUnlock}
                    className="absolute inset-0 z-50 bg-cover bg-center flex flex-col justify-between p-8 text-center select-none cursor-pointer backdrop-blur-md"
                    style={{
                      background: 'radial-gradient(ellipse at center, #0a1733 0%, #020612 100%)'
                    }}
                  >
                    <div className="mt-8">
                      <h1 className="text-4xl sm:text-5xl font-light text-white tracking-tight">{currentTime.split(' ')[0]}</h1>
                      <p className="text-xs text-slate-300 mt-1 font-sans">{currentDate} • Monday</p>
                    </div>

                    <div className="flex flex-col items-center gap-2 mb-6">
                      <img src={dileepProfile} alt="" className="w-14 h-14 rounded-full object-cover border-2 border-sky-400 shadow-2xl" />
                      <h3 className="text-sm font-bold text-white">Dileep Sai Galla</h3>
                      <button className="px-4 py-1 rounded-full bg-sky-500 text-white text-[10px] font-bold shadow-lg hover:bg-sky-400 transition-all mt-1">
                        Click to Unlock
                      </button>
                    </div>
                  </motion.div>
                )}

                {powerState === 'sleeping' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleWakeUpOrUnlock}
                    className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 text-center cursor-pointer select-none"
                  >
                    <Moon className="w-8 h-8 text-slate-700 animate-pulse mb-2" />
                    <span className="text-slate-600 text-xs font-mono">HP Spectre Pro Standby Mode</span>
                    <span className="text-slate-700 text-[9px] font-mono mt-1">Click anywhere or press any key to resume</span>
                  </motion.div>
                )}

                {powerState === 'restarting' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 bg-[#0078d4] flex flex-col items-center justify-center p-6 text-center text-white select-none"
                  >
                    <div className="w-8 h-8 rounded-full border-2 border-white border-t-transparent animate-spin mb-4" />
                    <span className="text-sm font-bold font-sans">Restarting...</span>
                  </motion.div>
                )}

                {powerState === 'shutdown' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 text-center text-white select-none"
                  >
                    <button
                      onClick={handleWakeUpOrUnlock}
                      className="w-14 h-14 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-sky-400 hover:text-white hover:border-sky-400 shadow-2xl transition-all cursor-pointer group mb-3"
                    >
                      <Power className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </button>
                    <span className="text-xs font-bold text-slate-400">System Powered Off</span>
                    <span className="text-[9px] text-slate-600 font-mono mt-1">Click power button to boot Windows 11</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ───────────────────────────────────────────────── */}
              {/* 3. AUTHENTIC WINDOWS 11 TASKBAR                   */}
              {/* ───────────────────────────────────────────────── */}
              <div className="h-11 bg-[#e8ecf2] dark:bg-[#181f29] border-t border-slate-300 dark:border-slate-800 px-3 flex items-center justify-between shrink-0 z-30 select-none shadow-md">
                
                {/* Left: Weather Widget */}
                <div className="flex items-center gap-2 text-[8px] font-sans text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 p-1 px-1.5 rounded-md cursor-pointer transition-colors">
                    <svg viewBox="0 0 24 24" className="w-4 h-4">
                      <circle cx="9" cy="9" r="4" fill="#f59e0b" />
                      <path d="M19 16.5a3.5 3.5 0 00-3.5-3.5c-.3 0-.6.05-.9.13A4.5 4.5 0 006 14.5c0 .3.04.6.1.9A3 3 0 008 21h11a3 3 0 000-4.5z" fill="#94a3b8" />
                      <path d="M18 17.5a2.5 2.5 0 00-2.5-2.5c-.2 0-.4.04-.6.1A3.5 3.5 0 008 16c0 .2.03.4.07.6A2 2 0 009.5 20h8.5a2 2 0 000-2.5z" fill="#cbd5e1" />
                    </svg>
                    <div className="text-left leading-none">
                      <span className="font-bold block text-[8px]">26°C</span>
                      <span className="text-[6.5px] text-slate-500 dark:text-slate-400 block mt-0.5">Partly cloudy</span>
                    </div>
                  </div>
                </div>

                {/* Center: Windows Start, Search & Pinned Taskbar Apps */}
                <div className="flex items-center gap-1.5">
                  
                  {/* Windows 11 Blue Start Icon */}
                  <button 
                    onClick={toggleStartMenu}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isStartMenuOpen 
                        ? 'bg-slate-300 dark:bg-slate-800 ring-2 ring-sky-400' 
                        : 'hover:bg-slate-200 dark:hover:bg-slate-800'
                    }`}
                    title="Start"
                  >
                    <svg viewBox="0 0 16 16" className="w-4 h-4 fill-[#0078d4]">
                      <rect x="0.5" y="0.5" width="6.8" height="6.8" rx="0.5" />
                      <rect x="8.7" y="0.5" width="6.8" height="6.8" rx="0.5" />
                      <rect x="0.5" y="8.7" width="6.8" height="6.8" rx="0.5" />
                      <rect x="8.7" y="8.7" width="6.8" height="6.8" rx="0.5" />
                    </svg>
                  </button>

                  {/* Pill Search Box */}
                  <div 
                    onClick={toggleStartMenu}
                    className="flex items-center gap-1.5 bg-white dark:bg-[#252e3b] border border-slate-300 dark:border-slate-700 rounded-full px-3 py-1 text-[8.5px] text-slate-700 dark:text-slate-300 shadow-sm cursor-text hover:border-slate-400"
                  >
                    <Search className="w-3 h-3 text-slate-500" />
                    <span className="font-medium">Search</span>
                  </div>

                  {/* Task View */}
                  <button 
                    onClick={() => openApp('project')}
                    className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors" 
                    title="Task View"
                  >
                    <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current">
                      <rect x="1" y="2" width="7" height="10" rx="1" fill="#334155" />
                      <rect x="5" y="4" width="9" height="10" rx="1" fill="#64748b" />
                    </svg>
                  </button>

                  <div className="h-4 w-[1px] bg-slate-400 dark:bg-slate-700 mx-1" />

                  {/* Real-Time Dynamic & Manually Swappable Taskbar Running Apps */}
                  <Reorder.Group
                    axis="x"
                    values={taskbarApps}
                    onReorder={setTaskbarApps}
                    className="flex items-center gap-1.5"
                  >
                    {taskbarApps.map((item) => {
                      const isActive = item.appType === 'project'
                        ? isAppActive('project', item.projectIndex)
                        : isAppActive(item.appType);
                      const isMin = item.appType === 'project'
                        ? (activeApp === 'project' && activeProjectIdx === item.projectIndex && isWindowMinimized)
                        : (activeApp === item.appType && isWindowMinimized);
                      const isShubh = item.title.toLowerCase().includes('shubh');
                      const isHireZeno = item.title.toLowerCase().includes('hirezeno');

                      return (
                        <Reorder.Item
                          key={item.id}
                          value={item}
                          whileDrag={{ scale: 1.15, zIndex: 60 }}
                          className="relative cursor-grab active:cursor-grabbing select-none"
                        >
                          <button
                            onClick={() => handleTaskbarItemClick(item)}
                            className={`relative w-8 h-8 rounded-xl transition-all cursor-pointer flex items-center justify-center p-1 ${
                              isActive 
                                ? 'bg-slate-300 dark:bg-slate-800 shadow-md ring-2 ring-sky-400' 
                                : isMin
                                ? 'bg-slate-200 dark:bg-slate-850 opacity-90'
                                : 'hover:bg-slate-200 dark:hover:bg-slate-800/80 opacity-90 hover:opacity-100 hover:scale-105'
                            }`}
                            title={`${item.title} (Drag to swap position)`}
                          >
                            <div className="w-6 h-6 flex items-center justify-center overflow-visible pointer-events-none">
                              {item.isLucide ? (
                                item.appType === 'terminal' ? (
                                  <div className="w-5 h-5 rounded bg-slate-900 flex items-center justify-center">
                                    <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
                                  </div>
                                ) : (
                                  <SettingsIcon className="w-4 h-4 text-sky-400" />
                                )
                              ) : (
                                <img 
                                  src={item.icon} 
                                  alt={item.title} 
                                  className={`w-full h-full object-contain filter drop-shadow ${
                                    isShubh 
                                      ? 'scale-160' 
                                      : isHireZeno 
                                      ? 'scale-150' 
                                      : item.appType === 'patent'
                                      ? 'scale-125'
                                      : 'scale-110'
                                  }`} 
                                />
                              )}
                            </div>
                            
                            {/* Taskbar Active / Open Indicator Pill */}
                            {(isActive || isMin) && (
                              <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 rounded-full transition-all pointer-events-none ${
                                isActive ? 'w-3.5 h-0.5 bg-sky-400 shadow-[0_0_4px_#38bdf8]' : 'w-1.5 h-0.5 bg-slate-400'
                              }`} />
                            )}
                          </button>
                        </Reorder.Item>
                      );
                    })}
                  </Reorder.Group>
                </div>

                {/* Right: Quick Settings & Clock Tray (Click opens Quick Settings!) */}
                <div className="flex items-center gap-1 text-[8px] font-sans text-slate-700 dark:text-slate-300">
                  
                  {/* System Tray Flyout Button */}
                  <div
                    onClick={toggleQuickSettings}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-lg cursor-pointer transition-colors ${
                      isQuickSettingsOpen 
                        ? 'bg-slate-300 dark:bg-slate-800 ring-1 ring-sky-400' 
                        : 'hover:bg-slate-200 dark:hover:bg-slate-800'
                    }`}
                    title="Quick Settings (Wi-Fi, Sound, Battery)"
                  >
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span className="font-semibold text-[7px]">ENG</span>
                    {wifiEnabled ? <Wifi className="w-3 h-3 text-sky-400" /> : <Wifi className="w-3 h-3 text-slate-500 opacity-40" />}
                    {isMuted || audioVolume === 0 ? <VolumeX className="w-3 h-3 text-red-400" /> : <Volume2 className="w-3 h-3 text-slate-300" />}
                    <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                  </div>

                  {/* Live Clock & Date */}
                  <div className="flex flex-col items-end leading-tight pl-1 border-l border-slate-300 dark:border-slate-700">
                    <span className="font-semibold text-[7.5px]">{currentTime}</span>
                    <span className="text-[6.5px] text-slate-500 dark:text-slate-400">{currentDate}</span>
                  </div>

                  {/* Windows 11 Far Right "Show Desktop" Peek Button */}
                  <button
                    onClick={() => {
                      windowsSound.playWindowMinimize();
                      if (activeApp !== null && !isWindowMinimized) {
                        setIsWindowMinimized(true);
                      } else if (isWindowMinimized) {
                        setIsWindowMinimized(false);
                      }
                    }}
                    className="w-1.5 h-6 ml-1 border-l border-slate-400 dark:border-slate-700 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-r transition-colors cursor-pointer"
                    title="Show Desktop"
                  />
                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* ACTIVE PROJECT METADATA & SPECS DRAWER (Below Laptop)       */}
      {/* ─────────────────────────────────────────────────────────── */}
      <motion.div 
        key={activeProject.title}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-6 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl text-left shadow-xl max-w-5xl mx-auto"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl border flex items-center justify-center p-1.5 shadow-md shrink-0"
              style={{ 
                backgroundColor: `${getAppAccent(activeProject.title)}1a`,
                borderColor: `${getAppAccent(activeProject.title)}4d`
              }}
            >
              <img 
                src={getAppLogo(activeProject.title)} 
                alt={activeProject.title} 
                className="w-full h-full object-contain rounded filter drop-shadow" 
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  {activeProject.title}
                </h3>
                <span 
                  className="text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase"
                  style={{ 
                    backgroundColor: `${getAppAccent(activeProject.title)}26`,
                    color: getAppAccent(activeProject.title)
                  }}
                >
                  Active in HP Workstation
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {activeProject.subtitle} • {activeProject.duration}
              </p>
            </div>
          </div>

          {/* Manual Switchers (No auto hopper!) */}
          <div className="flex flex-wrap gap-1.5">
            {projects.map((p, idx) => (
              <button
                key={p.title}
                onClick={() => openApp('project', idx)}
                className={`px-3 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  activeApp === 'project' && activeProjectIdx === idx && !isWindowMinimized
                    ? 'bg-sky-500 text-white font-bold shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        {/* Bullets & Architecture Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block">
              Core Engineering Achievements &amp; Metrics:
            </span>
            <ul className="space-y-2 text-xs text-slate-300">
              {activeProject.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5 flex flex-col justify-between space-y-4">
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-sky-400" />
                Pipeline Orchestrator Architecture
              </span>
              <p className="text-[10px] font-mono text-slate-400 leading-relaxed">
                {activeProject.architecture}
              </p>
            </div>

            {/* Stack badges */}
            <div>
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Full-Stack Technologies:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeProject.stack.map(s => (
                  <span key={s} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[10px] font-mono">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

    </section>
  );
}

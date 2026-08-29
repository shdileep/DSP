import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Sparkles, 
  Search, 
  Brain, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Award, 
  Download, 
  Check, 
  Layers, 
  Cpu, 
  BarChart3, 
  Target, 
  FileCheck, 
  Play, 
  Pause,
  RotateCcw, 
  BookOpen, 
  Compass, 
  Zap, 
  Eye, 
  ChevronRight, 
  HelpCircle, 
  ShieldCheck, 
  UserCheck, 
  ExternalLink,
  Code,
  Network,
  GitBranch,
  Flame,
  LayoutTemplate,
  Briefcase,
  Sliders,
  Terminal,
  Grid,
  Maximize2,
  X
} from 'lucide-react';
import hireZenoLogo from '../../assets/images/logo.png';
import resumeImg from '../../assets/images/resume.png';
import { windowsSound } from '../../utils/windowsSound';

type ActiveTab = 
  | 'ats_checker' 
  | 'resume_templates' 
  | 'cv_templates' 
  | 'cv_checker' 
  | 'ai_roadmap' 
  | 'ml_roadmap' 
  | 'nlp_roadmap';

export default function HireZenoPreview() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('ats_checker');

  // ATS Scanner State
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [scanCompleted, setScanCompleted] = useState<boolean>(false);
  const [selectedTemplateModal, setSelectedTemplateModal] = useState<any | null>(null);

  // Automated Exploration Tour State
  const [isAutoTouring, setIsAutoTouring] = useState<boolean>(true);
  const allTabs: ActiveTab[] = [
    'ats_checker', 
    'resume_templates', 
    'cv_templates', 
    'cv_checker', 
    'ai_roadmap', 
    'ml_roadmap', 
    'nlp_roadmap'
  ];

  // Trigger 2-second realistic blue laser scan
  const startScan = () => {
    windowsSound.playClick();
    setIsScanning(true);
    setScanProgress(0);
    setScanCompleted(false);

    const startTime = Date.now();
    const duration = 1000; // 1.0 second fast scan

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.round((elapsed / duration) * 100));
      setScanProgress(progress);

      if (elapsed >= duration) {
        clearInterval(interval);
        setIsScanning(false);
        setScanCompleted(true);
        windowsSound.playNotification();
      }
    }, 20);
  };

  // Run initial scan on mount
  useEffect(() => {
    startScan();
  }, []);

  // Automated Tour Progression across each and every page
  useEffect(() => {
    if (!isAutoTouring) return;

    const interval = setInterval(() => {
      setActiveTab(prev => {
        const currentIdx = allTabs.indexOf(prev);
        const nextIdx = (currentIdx + 1) % allTabs.length;
        const nextTab = allTabs[nextIdx];
        if (nextTab === 'ats_checker') {
          startScan();
        }
        return nextTab;
      });
    }, 1100);

    return () => clearInterval(interval);
  }, [isAutoTouring]);

  // 10 Distinct Resume Templates Data
  const RESUME_TEMPLATES = [
    {
      id: 1,
      title: 'Modern Tech Professional',
      subtitle: 'With Photo & LinkedIn Sidebar',
      tag: 'FAANG & AI Focus',
      color: 'from-blue-600 to-indigo-600',
      badge: 'Most Popular',
      layoutType: 'Sidebar + Main Content',
      features: ['Headshot & LinkedIn badge', 'Technical skill density meters', 'Action-oriented bullet points', 'GitHub commit highlights'],
      atsCompatibility: '98%'
    },
    {
      id: 2,
      title: 'Minimalist Ivy League',
      subtitle: 'Classic Serif Monochrome',
      tag: 'Finance & Research',
      color: 'from-slate-700 to-slate-900',
      badge: 'ATS Gold Standard',
      layoutType: 'Single Column Linear',
      features: ['Harvard/Stanford traditional layout', 'Zero graphic obstruction', 'Maximum line efficiency', 'Pure typographic hierarchy'],
      atsCompatibility: '100%'
    },
    {
      id: 3,
      title: 'Grid & Boxed Executive',
      subtitle: 'Structured Modular Cards',
      tag: 'Leadership & Mgmt',
      color: 'from-emerald-600 to-teal-700',
      badge: 'Executive Level',
      layoutType: 'Modular Boxed Grid',
      features: ['Key achievements KPI badges', 'Role scope and team budget cards', 'Patent & IP showcase', 'Executive summary box'],
      atsCompatibility: '94%'
    },
    {
      id: 4,
      title: 'Two-Page / Dual-Column Split',
      subtitle: 'Dark Accent Skill Rail',
      tag: 'Senior Engineers',
      color: 'from-cyan-600 to-blue-700',
      badge: 'High Impact',
      layoutType: 'Left Rail + Right Body',
      features: ['Dark navy skill sidebar', 'Extended project timeline (2 pages)', 'Certifications & Awards grid', 'Language & Tool tags'],
      atsCompatibility: '95%'
    },
    {
      id: 5,
      title: 'Silicon Valley Developer',
      subtitle: 'Dark/Code IDE Styled Layout',
      tag: 'Full-Stack & Systems',
      color: 'from-purple-600 to-indigo-800',
      badge: 'Dev Favorite',
      layoutType: 'Terminal & Chip Grid',
      features: ['Syntax highlighted section tags', 'CLI command styled headings', 'Docker & Kubernetes chips', 'Live demo QR code slot'],
      atsCompatibility: '92%'
    },
    {
      id: 6,
      title: 'Corporate Enterprise',
      subtitle: 'Navy Header with Formal Accents',
      tag: 'Enterprise & B2B',
      color: 'from-blue-800 to-sky-900',
      badge: 'Corporate Standard',
      layoutType: 'Top Banner + 2 Columns',
      features: ['Navy top banner with contact matrix', 'Formal corporate typography', 'Revenue impact bullets', 'Security clearance tag'],
      atsCompatibility: '97%'
    },
    {
      id: 7,
      title: 'Creative UI / AI Designer',
      subtitle: 'Gradient Headers & Portfolio Chips',
      tag: 'Design & Frontend',
      color: 'from-pink-600 to-purple-600',
      badge: 'Creative Choice',
      layoutType: 'Visual Asymmetric',
      features: ['Modern pastel gradient accents', 'Figma & Design system tags', 'Visual metric cards', 'Behance / Dribbble links'],
      atsCompatibility: '91%'
    },
    {
      id: 8,
      title: 'Academic & Research Fellow',
      subtitle: 'Citations, Papers & Grant Focus',
      tag: 'Ph.D & Researchers',
      color: 'from-amber-700 to-orange-800',
      badge: 'Research Standard',
      layoutType: 'Comprehensive Multi-Page',
      features: ['Peer-reviewed publication ledger', 'ArXiv & IEEE citation links', 'Grant & Fellowship history', 'Laboratory leadership'],
      atsCompatibility: '99%'
    },
    {
      id: 9,
      title: 'Startup Founder & Lead',
      subtitle: 'Metric-Driven Bold ROI Cards',
      tag: 'Startups & Ventures',
      color: 'from-rose-600 to-red-700',
      badge: 'Growth Driven',
      layoutType: 'Impact Focused Flow',
      features: ['0-to-1 Product launch milestones', 'ARR & User growth callouts', 'Tech stack architecture diagram', 'Fundraising summary'],
      atsCompatibility: '93%'
    },
    {
      id: 10,
      title: 'Compact Single-Page ATS',
      subtitle: 'Ultra-Dense High-Speed Parser',
      tag: 'Entry & Mid Level',
      color: 'from-teal-600 to-emerald-700',
      badge: 'Fast Parse',
      layoutType: 'Single Page Compressed',
      features: ['Fits 4 years experience on 1 page', 'Zero whitespace waste', 'Standard unicode bullets', 'Instant parser compliance'],
      atsCompatibility: '100%'
    }
  ];

  // CV Templates Data
  const CV_TEMPLATES = [
    {
      id: 'cv-1',
      title: 'Senior AI Research Scientist CV',
      targetRole: 'AI Research Scientist / Staff ML',
      description: 'Optimized for deep research backgrounds, incorporating publication matrices, target JD matching, and patent portfolios.',
      matchScore: '94%',
      features: ['Comprehensive publication list', 'Patent application #202641010900 highlight', 'Target JD semantic keyword match', 'Compute cluster specs (H100/A100)'],
      color: 'from-indigo-600 to-sky-700'
    },
    {
      id: 'cv-2',
      title: 'Lead MLOps & Distributed Systems CV',
      targetRole: 'Lead MLOps Engineer / Principal Architect',
      description: 'Structured to highlight cloud infrastructure, Triton/vLLM model serving pipelines, and high-throughput vector databases.',
      matchScore: '91%',
      features: ['Kubernetes & Ray cluster governance', 'Latency SLA & Throughput benchmarking', 'Model monitoring & drift mitigation', 'CI/CD automated retraining'],
      color: 'from-cyan-600 to-teal-700'
    },
    {
      id: 'cv-3',
      title: 'Enterprise GenAI & RAG Solutions CV',
      targetRole: 'Enterprise AI Solutions Architect',
      description: 'Focused on enterprise RAG deployments, LangGraph agentic frameworks, and B2B client delivery metrics.',
      matchScore: '89%',
      features: ['Hybrid RAG (Qdrant + BM25) architecture', 'Security & SOC2 / HIPAA compliance', 'Client ROI & cost reduction metrics', 'Multi-agent orchestration workflows'],
      color: 'from-blue-700 to-purple-800'
    }
  ];

  return (
    <div className="relative w-full h-full flex flex-col bg-[#030712] select-none text-slate-100 overflow-hidden font-sans">
      
      {/* ─────────────────────────────────────────────────────────── */}
      {/* TOP HEADER & NAVIGATION BAR                                 */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div className="h-12 bg-slate-950/95 border-b border-slate-800/80 px-4 flex items-center justify-between shrink-0 z-30 backdrop-blur-xl">
        
        {/* Top-Left: HireZeno Logo & Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-950 via-slate-900 to-blue-950 border border-sky-500/40 flex items-center justify-center p-1 shadow-[0_0_15px_rgba(56,189,248,0.25)]">
            <img src={hireZenoLogo} alt="HireZeno" className="w-full h-full object-contain filter drop-shadow" />
          </div>
          <div className="leading-tight text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black tracking-tight text-white font-mono">HireZeno</span>
              <span className="text-[7.5px] font-bold px-1.5 py-0.2 rounded bg-gradient-to-r from-sky-600 to-blue-600 text-white font-mono shadow-sm">
                2.O ATS
              </span>
            </div>
            <span className="text-[7.5px] text-slate-400 font-mono block">AI Career &amp; Resume Intelligence</span>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setIsAutoTouring(!isAutoTouring)}
            className="px-2 py-1 rounded-lg text-[8px] font-mono font-bold flex items-center gap-1 bg-slate-900 hover:bg-slate-850 border border-sky-500/40 text-sky-400 cursor-pointer shrink-0 transition-colors mr-1"
            title={isAutoTouring ? "Pause Auto Exploration" : "Resume Auto Exploration"}
          >
            {isAutoTouring ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
            <span>{isAutoTouring ? "AUTO-TOUR ON" : "PAUSED"}</span>
          </button>

          {[
            { id: 'ats_checker', label: 'Resume Score Checker', icon: FileCheck },
            { id: 'resume_templates', label: 'Resume Templates', icon: LayoutTemplate },
            { id: 'cv_templates', label: 'CV Templates', icon: Briefcase },
            { id: 'cv_checker', label: 'CV Score Checker', icon: Search },
            { id: 'ai_roadmap', label: 'AI Roadmap', icon: Brain },
            { id: 'ml_roadmap', label: 'ML Roadmap', icon: Cpu },
            { id: 'nlp_roadmap', label: 'NLP Roadmap', icon: Network },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  windowsSound.playClick();
                  setActiveTab(tab.id as ActiveTab);
                  setIsAutoTouring(false);
                }}
                className={`px-2.5 py-1.5 rounded-lg text-[8.5px] font-mono flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? 'bg-sky-500/20 border border-sky-400/60 text-sky-300 font-bold shadow-[0_0_10px_rgba(56,189,248,0.2)]' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
                }`}
              >
                <Icon className={`w-3 h-3 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* MAIN VIEWPORT CONTENT                                       */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 text-left">
        <AnimatePresence mode="wait">
          
          {/* ═══════════════════════════════════════════════════════════ */}
          {/* TAB 1: RESUME ATS SCORE CHECKER (WITH 2S BLUE SCANNER)     */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {activeTab === 'ats_checker' && (
            <motion.div
              key="ats_checker"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full"
            >
              {/* Left Column: Uploaded Resume PDF Viewport with Blue Laser Scan */}
              <div className="lg:col-span-5 flex flex-col bg-slate-900/80 border border-slate-800 rounded-2xl p-3 backdrop-blur-xl shadow-xl">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 shrink-0 mb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-sky-400" />
                    <div>
                      <span className="text-[10px] font-bold text-white block font-mono">Dileep_Sai_Galla_AI_Engineer.pdf</span>
                      <span className="text-[7.5px] text-slate-400 font-mono">Single Page • 142 KB • Extracted via OCR</span>
                    </div>
                  </div>
                  <button
                    onClick={startScan}
                    disabled={isScanning}
                    className="px-2.5 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/50 text-sky-300 text-[8px] font-mono font-bold flex items-center gap-1 cursor-pointer transition-all shadow-sm"
                  >
                    <RotateCcw className={`w-3 h-3 ${isScanning ? 'animate-spin' : ''}`} />
                    <span>{isScanning ? 'Scanning...' : 'Re-Scan (2s)'}</span>
                  </button>
                </div>

                {/* Resume Container with Realistic 2-Second Blue Scanning Laser Line */}
                <div className="relative flex-1 bg-white rounded-xl overflow-hidden shadow-2xl border border-slate-700/80 flex items-center justify-center p-1 group select-none">
                  
                  {/* High-Resolution Document Image */}
                  <img 
                    src={resumeImg} 
                    alt="Dileep AI Engineer Resume" 
                    className="w-full h-full object-contain filter contrast-105" 
                  />

                  {/* ── HIGH-TECH BLUE SCANNING LASER EFFECT (2 SECONDS) ── */}
                  {isScanning && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      {/* Laser Bar moving from top (0%) to bottom (100%) */}
                      <motion.div 
                        initial={{ top: '0%' }}
                        animate={{ top: '100%' }}
                        transition={{ duration: 2.0, ease: 'linear' }}
                        className="absolute left-0 right-0 z-20"
                      >
                        {/* Glowing Blue Beam */}
                        <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_12px_#38bdf8,0_0_25px_#0284c7]" />
                        
                        {/* Trailing Luminous Gradient Aura */}
                        <div className="h-14 w-full bg-gradient-to-t from-cyan-500/25 via-sky-500/10 to-transparent -translate-y-full" />
                      </motion.div>

                      {/* HUD Scan Status Watermark */}
                      <div className="absolute top-3 left-3 bg-slate-950/90 border border-cyan-400/60 rounded-lg px-2.5 py-1 text-[8px] font-mono text-cyan-300 flex items-center gap-1.5 shadow-lg backdrop-blur-md z-30">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                        <span>OCR Tokenizer: {scanProgress}%</span>
                      </div>
                    </div>
                  )}

                  {/* Scan Completed Success Badge */}
                  {scanCompleted && (
                    <div className="absolute bottom-3 right-3 bg-slate-950/90 border border-emerald-500/60 rounded-lg px-2.5 py-1 text-[8px] font-mono text-emerald-300 flex items-center gap-1.5 shadow-lg backdrop-blur-md z-20">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Scan Completed (86% Match)</span>
                    </div>
                  )}

                </div>
              </div>

              {/* Right Column: Mock ATS Analysis Results */}
              <div className="lg:col-span-7 flex flex-col space-y-3 overflow-y-auto pr-1">
                
                {/* 1. Overall Score & Benchmark Card */}
                <div className="bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-sky-950/40 border border-slate-800 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-white font-mono tracking-tight">86%</span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-mono text-[9px] font-bold">
                          Grade A • Strong ATS Match
                        </span>
                      </div>
                      <p className="text-[8.5px] text-slate-300 mt-1">
                        High interview probability for Senior AI/ML Engineer and GenAI Architect roles.
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[7.5px] text-slate-400 font-mono block">BENCHMARK COMPARISON</span>
                      <span className="text-xs font-bold text-sky-400 font-mono">Top 8% of 10,000+ Candidates</span>
                    </div>
                  </div>

                  {/* 4 Core ATS Pillar Meters */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-800/80">
                    <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-2">
                      <span className="text-[7px] text-slate-400 font-mono block">Keyword Density</span>
                      <span className="text-[11px] font-bold text-emerald-400 font-mono">92/100</span>
                      <div className="w-full bg-slate-800 h-1 rounded-full mt-1 overflow-hidden">
                        <div className="bg-emerald-400 h-full rounded-full w-[92%]" />
                      </div>
                    </div>
                    <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-2">
                      <span className="text-[7px] text-slate-400 font-mono block">Action Verbs &amp; ROI</span>
                      <span className="text-[11px] font-bold text-sky-400 font-mono">84/100</span>
                      <div className="w-full bg-slate-800 h-1 rounded-full mt-1 overflow-hidden">
                        <div className="bg-sky-400 h-full rounded-full w-[84%]" />
                      </div>
                    </div>
                    <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-2">
                      <span className="text-[7px] text-slate-400 font-mono block">Format Parseability</span>
                      <span className="text-[11px] font-bold text-emerald-400 font-mono">96/100</span>
                      <div className="w-full bg-slate-800 h-1 rounded-full mt-1 overflow-hidden">
                        <div className="bg-emerald-400 h-full rounded-full w-[96%]" />
                      </div>
                    </div>
                    <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-2">
                      <span className="text-[7px] text-slate-400 font-mono block">Section Hierarchy</span>
                      <span className="text-[11px] font-bold text-purple-400 font-mono">90/100</span>
                      <div className="w-full bg-slate-800 h-1 rounded-full mt-1 overflow-hidden">
                        <div className="bg-purple-400 h-full rounded-full w-[90%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Keyword Analysis & Repetition Distribution */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 shadow-lg">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2.5">
                    <span className="text-[9.5px] font-bold text-white font-mono flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-sky-400" />
                      Keyword Extraction &amp; Frequency Analysis
                    </span>
                    <span className="text-[7.5px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-1.5 py-0.2 rounded">
                      12 Core AI Keywords Matched
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { kw: 'LangChain / LangGraph', count: '4x', status: 'optimal' },
                      { kw: 'PyTorch / Transformers', count: '5x', status: 'optimal' },
                      { kw: 'Hybrid RAG / VectorDB', count: '3x', status: 'optimal' },
                      { kw: 'FastAPI / REST', count: '4x', status: 'optimal' },
                      { kw: 'Docker / Containers', count: '2x', status: 'optimal' },
                      { kw: 'LoRA / QLoRA', count: '2x', status: 'optimal' },
                      { kw: 'FAISS / Qdrant', count: '3x', status: 'optimal' },
                      { kw: 'Sentence Transformers', count: '2x', status: 'optimal' },
                      { kw: 'PostgreSQL / RLS', count: '2x', status: 'optimal' },
                      { kw: 'Kubernetes (K8s)', count: '0x', status: 'missing' },
                      { kw: 'TensorRT / Triton', count: '0x', status: 'missing' },
                    ].map(item => (
                      <span 
                        key={item.kw}
                        className={`text-[8px] font-mono px-2 py-0.5 rounded-lg border flex items-center gap-1 ${
                          item.status === 'optimal' 
                            ? 'bg-slate-950 border-slate-700/80 text-slate-200' 
                            : 'bg-amber-950/40 border-amber-800/80 text-amber-300'
                        }`}
                      >
                        <span className={`w-1 h-1 rounded-full ${item.status === 'optimal' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                        <span>{item.kw}</span>
                        <span className="text-[7px] text-slate-500 font-bold">({item.count})</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. Missing Sections & Areas for Improvement */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  
                  {/* Missing Sections */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3">
                    <span className="text-[9px] font-bold text-amber-300 font-mono flex items-center gap-1 mb-2">
                      <AlertCircle className="w-3 h-3 text-amber-400" />
                      Missing / Optional Sections
                    </span>
                    <ul className="space-y-1.5 text-[8px] text-slate-300 font-sans">
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-mono font-bold">•</span>
                        <span><strong>Cloud Certifications:</strong> Add AWS Machine Learning Specialty or GCP Cloud Architect credentials.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-mono font-bold">•</span>
                        <span><strong>Patent Gazette URL:</strong> Include direct link for Patent App #202641010900.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Areas for Improvement */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3">
                    <span className="text-[9px] font-bold text-sky-300 font-mono flex items-center gap-1 mb-2">
                      <TrendingUp className="w-3 h-3 text-sky-400" />
                      Actionable Improvements
                    </span>
                    <ul className="space-y-1.5 text-[8px] text-slate-300 font-sans">
                      <li className="flex items-start gap-1.5">
                        <span className="text-sky-400 font-mono font-bold">✓</span>
                        <span><strong>Quantified Metrics:</strong> Excellent latency metrics (halved training time, 4.2s to 1.8s inference).</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-sky-400 font-mono font-bold">✓</span>
                        <span><strong>Action Verbs:</strong> Strong density of verbs: <em>Architected, Engineered, Redesigned, Deployed</em>.</span>
                      </li>
                    </ul>
                  </div>

                </div>

                {/* 4. Spelling, Grammar & Formatting Validation */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-[8px] font-mono text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>0 Spelling Errors</span>
                    </div>
                    <div className="flex items-center gap-1 text-[8px] font-mono text-emerald-400">
                      <Check className="w-3.5 h-3.5" />
                      <span>Grammar Syntax 100% Valid</span>
                    </div>
                    <div className="flex items-center gap-1 text-[8px] font-mono text-emerald-400">
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>ATS Single-Column Format OK</span>
                    </div>
                  </div>
                  <span className="text-[7.5px] font-mono text-slate-400">Validated against Workday, Greenhouse &amp; Lever parsers</span>
                </div>

              </div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* TAB 2: RESUME TEMPLATES (10 DISTINCT PROFESSIONAL DESIGNS) */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {activeTab === 'resume_templates' && (
            <motion.div
              key="resume_templates"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="pb-2 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                  <LayoutTemplate className="w-4 h-4 text-sky-400" />
                  10 Professional ATS-Optimized Resume Templates
                </h3>
                <p className="text-[8.5px] text-slate-400 mt-0.5">
                  Engineered with distinct layouts, single/two-column splits, boxed sections, and custom typography to pass every ATS parser.
                </p>
              </div>

              {/* 10 Resume Template Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {RESUME_TEMPLATES.map(tpl => (
                  <div
                    key={tpl.id}
                    onClick={() => {
                      windowsSound.playClick();
                      setSelectedTemplateModal(tpl);
                    }}
                    className="group relative bg-slate-900/90 border border-slate-800 hover:border-sky-500/60 rounded-2xl p-3 flex flex-col justify-between transition-all cursor-pointer hover:shadow-[0_10px_25px_rgba(56,189,248,0.15)] hover:-translate-y-1"
                  >
                    {/* Header Mini Wireframe Simulation */}
                    <div>
                      <div className="relative h-28 w-full bg-slate-950 rounded-xl border border-slate-800 p-2 overflow-hidden mb-2.5 flex flex-col justify-between group-hover:border-sky-500/40 transition-colors">
                        
                        {/* Simulated Layout Wireframe */}
                        {tpl.id === 1 && (
                          <div className="flex h-full gap-1">
                            <div className="w-1/3 bg-blue-900/40 rounded p-1 flex flex-col items-center">
                              <div className="w-4 h-4 rounded-full bg-blue-400/60 mb-1" />
                              <div className="w-full h-1 bg-blue-400/30 rounded mb-0.5" />
                              <div className="w-2/3 h-1 bg-blue-400/20 rounded" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="w-3/4 h-1.5 bg-slate-400 rounded" />
                              <div className="w-full h-1 bg-slate-600 rounded" />
                              <div className="w-5/6 h-1 bg-slate-700 rounded" />
                              <div className="w-full h-1 bg-slate-700 rounded" />
                            </div>
                          </div>
                        )}

                        {tpl.id === 2 && (
                          <div className="h-full space-y-1.5 p-1 text-center">
                            <div className="w-1/2 h-1.5 bg-slate-300 rounded mx-auto" />
                            <div className="w-full h-0.5 bg-slate-700" />
                            <div className="w-full h-1 bg-slate-500 rounded" />
                            <div className="w-full h-1 bg-slate-600 rounded" />
                            <div className="w-5/6 h-1 bg-slate-600 rounded" />
                          </div>
                        )}

                        {tpl.id === 3 && (
                          <div className="h-full grid grid-cols-2 gap-1 p-0.5">
                            <div className="bg-emerald-950/40 border border-emerald-800/40 rounded p-1" />
                            <div className="bg-slate-900 border border-slate-800 rounded p-1" />
                            <div className="bg-slate-900 border border-slate-800 rounded p-1" />
                            <div className="bg-emerald-950/40 border border-emerald-800/40 rounded p-1" />
                          </div>
                        )}

                        {tpl.id === 4 && (
                          <div className="flex h-full gap-1">
                            <div className="w-1/3 bg-cyan-950/80 border-r border-cyan-800/50 p-1 space-y-1">
                              <div className="w-full h-1 bg-cyan-400/60 rounded" />
                              <div className="w-full h-1 bg-cyan-400/40 rounded" />
                            </div>
                            <div className="flex-1 space-y-1 p-0.5">
                              <div className="w-3/4 h-1 bg-slate-300 rounded" />
                              <div className="w-full h-1 bg-slate-600 rounded" />
                              <div className="w-5/6 h-1 bg-slate-600 rounded" />
                            </div>
                          </div>
                        )}

                        {tpl.id >= 5 && (
                          <div className="h-full space-y-1 p-1">
                            <div className="w-2/3 h-1.5 bg-purple-400/80 rounded" />
                            <div className="w-full h-1 bg-slate-600 rounded" />
                            <div className="w-5/6 h-1 bg-slate-700 rounded" />
                            <div className="flex gap-1 pt-1">
                              <div className="w-4 h-2 bg-sky-600/40 rounded" />
                              <div className="w-4 h-2 bg-purple-600/40 rounded" />
                              <div className="w-4 h-2 bg-emerald-600/40 rounded" />
                            </div>
                          </div>
                        )}

                        {/* Top Badge */}
                        <div className="absolute top-1.5 right-1.5">
                          <span className="text-[6.5px] font-mono px-1 py-0.2 rounded bg-slate-900 text-sky-300 border border-slate-700">
                            {tpl.atsCompatibility} ATS
                          </span>
                        </div>

                      </div>

                      {/* Card Content */}
                      <span className="text-[7px] font-mono text-sky-400 block uppercase tracking-wider">{tpl.tag}</span>
                      <h4 className="text-[10px] font-bold text-white font-mono mt-0.5 leading-tight group-hover:text-sky-300 transition-colors">
                        {tpl.title}
                      </h4>
                      <p className="text-[7.5px] text-slate-400 mt-1 line-clamp-2">
                        {tpl.subtitle}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 mt-2 flex items-center justify-between">
                      <span className="text-[7px] font-mono text-slate-500">{tpl.layoutType}</span>
                      <span className="text-[7.5px] font-bold text-sky-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        Preview <ChevronRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* TAB 3: CV TEMPLATES (MULTIPLE DESIGNS WITH JD ALIGNMENT)   */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {activeTab === 'cv_templates' && (
            <motion.div
              key="cv_templates"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="pb-2 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-sky-400" />
                  Targeted CV Templates with JD Keyword Alignment
                </h3>
                <p className="text-[8.5px] text-slate-400 mt-0.5">
                  Multi-page comprehensive CV architectures tailored for Research Fellowships, Staff Architect, and Principal Engineer job descriptions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CV_TEMPLATES.map(cv => (
                  <div 
                    key={cv.id}
                    className="bg-slate-900/90 border border-slate-800 hover:border-sky-500/60 rounded-2xl p-4 flex flex-col justify-between shadow-xl transition-all hover:shadow-[0_10px_30px_rgba(56,189,248,0.15)]"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[8px] font-mono px-2 py-0.5 rounded-full bg-sky-950 border border-sky-800 text-sky-300 font-bold">
                          {cv.targetRole}
                        </span>
                        <span className="text-[9px] font-mono text-emerald-400 font-bold">
                          {cv.matchScore} JD Match
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-white font-mono mt-1">{cv.title}</h4>
                      <p className="text-[8px] text-slate-400 mt-1 leading-relaxed">{cv.description}</p>

                      {/* Feature Bullet Points */}
                      <div className="mt-3 space-y-1.5 pt-2 border-t border-slate-800">
                        {cv.features.map(f => (
                          <div key={f} className="flex items-start gap-1.5 text-[8px] text-slate-300">
                            <Check className="w-3 h-3 text-sky-400 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        windowsSound.playClick();
                        alert(`Loaded ${cv.title} into your editor workspace.`);
                      }}
                      className="mt-4 w-full py-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white text-[8.5px] font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all"
                    >
                      <Download className="w-3 h-3" />
                      <span>Use This CV Template</span>
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* TAB 4: CV SCORE CHECKER (SEMANTIC JD MATCHER)              */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {activeTab === 'cv_checker' && (
            <motion.div
              key="cv_checker"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
                <h3 className="text-xs font-bold text-white font-mono flex items-center gap-2">
                  <Search className="w-4 h-4 text-sky-400" />
                  Semantic CV vs Job Description (JD) Matcher
                </h3>
                <p className="text-[8.5px] text-slate-400 mt-1">
                  Evaluates dense CV publications, research grants, and technical leadership against enterprise job descriptions using embedding cosine similarity.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-left">
                    <span className="text-[8px] font-mono text-sky-400 block mb-1">Target Job Description (JD)</span>
                    <p className="text-[8px] text-slate-300 font-mono leading-relaxed bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                      "Looking for Senior AI Engineer with strong PyTorch, RAG vector retrieval (Qdrant), Multi-Agent workflows (LangGraph), model quantization (LoRA/QLoRA), and low-latency FastAPI deployment."
                    </p>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-left">
                    <span className="text-[8px] font-mono text-emerald-400 block mb-1">Candidate Profile Match</span>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-black text-white font-mono">89.4% Cosine Match</span>
                      <span className="text-[7.5px] font-mono text-emerald-300 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded">
                        High Fit
                      </span>
                    </div>
                    <div className="space-y-1 text-[8px] text-slate-300">
                      <div className="flex justify-between"><span>Core AI Frameworks:</span> <strong className="text-emerald-400">100%</strong></div>
                      <div className="flex justify-between"><span>Vector Databases &amp; RAG:</span> <strong className="text-emerald-400">95%</strong></div>
                      <div className="flex justify-between"><span>Distributed MLOps:</span> <strong className="text-sky-400">82%</strong></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* TAB 5: AI ROADMAP (TEXT-BASED STEP-BY-STEP LEARNING PATH)   */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {activeTab === 'ai_roadmap' && (
            <motion.div
              key="ai_roadmap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="pb-2 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                  <Brain className="w-4 h-4 text-sky-400" />
                  Artificial Intelligence (AI) Engineering Roadmap 2026
                </h3>
                <p className="text-[8.5px] text-slate-400 mt-0.5">
                  Step-by-step master learning path from foundational math to agentic multi-agent systems and production deployment.
                </p>
              </div>

              {/* Step-by-step text-based roadmap cards */}
              <div className="space-y-3">
                {[
                  {
                    step: 'Phase 1',
                    title: 'Programming, Data Structures & Applied Math Foundations',
                    whatToLearn: 'Python 3.12+, Object-Oriented Design, Linear Algebra (Matrices, Eigenvalues, SVD), Vector Calculus (Gradients, Jacobian), Probability & Bayesian Statistics.',
                    nextSteps: 'Build algorithmic problem-solving speed in Python and understand tensor manipulation with NumPy and Pandas.',
                    keyTools: 'Python, NumPy, Pandas, Git, JupyterLab'
                  },
                  {
                    step: 'Phase 2',
                    title: 'Classical Machine Learning & Statistical Modeling',
                    whatToLearn: 'Supervised algorithms (Linear/Logistic Regression, Random Forests, Gradient Boosted Trees, XGBoost), Unsupervised (K-Means, PCA, DBSCAN), Cross-Validation, Bias-Variance Tradeoff, Precision/Recall optimization.',
                    nextSteps: 'Master feature engineering pipelines, data leakage prevention, and model evaluation metrics.',
                    keyTools: 'scikit-learn, XGBoost, LightGBM, SciPy, Matplotlib'
                  },
                  {
                    step: 'Phase 3',
                    title: 'Deep Learning & Neural Network Architectures',
                    whatToLearn: 'Multi-Layer Perceptrons (MLPs), Backpropagation, Activation Functions, Loss Functions (Cross-Entropy, MSE, Triplet Loss), CNNs (Computer Vision), RNNs/LSTMs, PyTorch tensor computation and GPU acceleration with CUDA.',
                    nextSteps: 'Construct custom PyTorch training loops, loss functions, and dataset loaders from scratch.',
                    keyTools: 'PyTorch, TorchVision, CUDA, Weights & Biases (W&B)'
                  },
                  {
                    step: 'Phase 4',
                    title: 'Transformers, Large Language Models (LLMs) & Prompt Engineering',
                    whatToLearn: 'Attention Mechanism (Scaled Dot-Product, Multi-Head Self-Attention), Transformer Encoder-Decoder architecture, Foundation Models (BERT, GPT-4, LLaMA-3, Mistral), Context Windows, Tokenization (BPE, SentencePiece), Prompt Design & Few-Shot CoT.',
                    nextSteps: 'Fine-tune open-weight LLMs using Parameter-Efficient Fine-Tuning (PEFT, LoRA, QLoRA, Axolotl).',
                    keyTools: 'Hugging Face Transformers, Tokenizers, PEFT, TRL, vLLM'
                  },
                  {
                    step: 'Phase 5',
                    title: 'Retrieval-Augmented Generation (RAG) & Vector Databases',
                    whatToLearn: 'Dense vs Sparse Embeddings, Hybrid Search (Vector + BM25 keyword matching), Semantic Chunking strategies, Vector similarity metrics (Cosine, Dot-Product), Re-ranking algorithms (Cohere Re-ranker, Cross-Encoders).',
                    nextSteps: 'Build low-latency semantic search engines over enterprise PDF/knowledge documents.',
                    keyTools: 'Qdrant, FAISS, ChromaDB, PGVector, Sentence Transformers'
                  },
                  {
                    step: 'Phase 6',
                    title: 'Agentic Workflows & Autonomous Multi-Agent Orchestration',
                    whatToLearn: 'Plan-and-Solve architectures, Function Calling / Tool Usage, State Machines, LangGraph cyclical workflows, Long-Term Memory (Episodic + Semantic), Human-in-the-Loop approval gates, Error recovery & self-correction.',
                    nextSteps: 'Develop autonomous multi-agent software engineering and customer intelligence workflows.',
                    keyTools: 'LangChain, LangGraph, AutoGen, CrewAI, Instructor'
                  },
                  {
                    step: 'Phase 7',
                    title: 'Production MLOps, Containerization & High-Throughput Serving',
                    whatToLearn: 'REST API wrapping with FastAPI, Docker containerization, Kubernetes cluster deployment, Model quantization (AWQ, GGUF), Continuous integration and automated retraining pipelines, Hallucination monitoring (Ragas, Trulens).',
                    nextSteps: 'Deploy scalable sub-40ms AI microservices on cloud infrastructure.',
                    keyTools: 'FastAPI, Docker, Triton Inference Server, vLLM, Prometheus, Grafana'
                  }
                ].map((item, idx) => (
                  <div key={item.step} className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 shadow-md text-left">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800 font-bold">
                          {item.step}
                        </span>
                        <h4 className="text-[10px] font-bold text-white font-mono">{item.title}</h4>
                      </div>
                      <span className="text-[7.5px] font-mono text-slate-500">Step {idx + 1} of 7</span>
                    </div>

                    <div className="space-y-1.5 text-[8.5px]">
                      <div>
                        <strong className="text-sky-300 font-mono">1. What to Learn First: </strong>
                        <span className="text-slate-300">{item.whatToLearn}</span>
                      </div>
                      <div>
                        <strong className="text-emerald-300 font-mono">2. Next Progression Step: </strong>
                        <span className="text-slate-300">{item.nextSteps}</span>
                      </div>
                      <div className="pt-1">
                        <span className="text-[7.5px] font-mono text-slate-400">Core Tools &amp; Libraries: </span>
                        <span className="text-[7.5px] font-mono text-purple-300 bg-purple-950/40 border border-purple-800/40 px-1.5 py-0.2 rounded">
                          {item.keyTools}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* TAB 6: ML ROADMAP (MACHINE LEARNING SPECIALIST PATH)        */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {activeTab === 'ml_roadmap' && (
            <motion.div
              key="ml_roadmap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="pb-2 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  Machine Learning (ML) Specialist Roadmap 2026
                </h3>
                <p className="text-[8.5px] text-slate-400 mt-0.5">
                  Rigorous statistical modeling, algorithmic feature engineering, and robust production pipeline development.
                </p>
              </div>

              {/* Step-by-step ML roadmap cards */}
              <div className="space-y-3">
                {[
                  {
                    step: 'Phase 1',
                    title: 'Statistical Theory & Mathematical Foundations',
                    whatToLearn: 'Probability distributions (Gaussian, Bernoulli, Poisson), Hypothesis testing (t-tests, ANOVA, Chi-Square), Maximum Likelihood Estimation (MLE), Gradient Descent variants (SGD, Adam, RMSProp), Matrix decomposition (PCA, SVD).',
                    nextSteps: 'Write loss minimization functions from mathematical principles without external libraries.',
                    keyTools: 'NumPy, SciPy, SymPy, JupyterLab'
                  },
                  {
                    step: 'Phase 2',
                    title: 'Exploratory Data Analysis (EDA) & Feature Engineering',
                    whatToLearn: 'Outlier detection (IQR, Isolation Forests, Z-Score), Handling missing values (KNN Imputer, MICE), Feature scaling (StandardScaler, RobustScaler), Encoding categorical variables (Target encoding, One-Hot), Polynomial and interaction features.',
                    nextSteps: 'Create automated data cleaning and imputation pipelines that prevent data leakage.',
                    keyTools: 'Pandas, Polars, Seaborn, Feature-Engine'
                  },
                  {
                    step: 'Phase 3',
                    title: 'Supervised Learning Algorithms & Ensembles',
                    whatToLearn: 'Linear & Ridge/Lasso Regression, Logistic Regression, Decision Trees, Support Vector Machines (SVM with RBF kernels), Random Forests, Boosting frameworks (XGBoost, LightGBM, CatBoost).',
                    nextSteps: 'Benchmark model latency vs accuracy tradeoffs and tune hyperparameters using Bayesian Optimization (Optuna).',
                    keyTools: 'scikit-learn, XGBoost, CatBoost, Optuna'
                  },
                  {
                    step: 'Phase 4',
                    title: 'Unsupervised Learning, Clustering & Dimensionality Reduction',
                    whatToLearn: 'K-Means clustering, Hierarchical clustering (Dendrograms), DBSCAN density-based clustering, Principal Component Analysis (PCA), t-SNE, UMAP for high-dimensional feature visualization.',
                    nextSteps: 'Implement anomaly detection systems and customer segmentation clustering models.',
                    keyTools: 'scikit-learn, UMAP-learn, HDBSCAN'
                  },
                  {
                    step: 'Phase 5',
                    title: 'Time Series Forecasting & Anomaly Detection',
                    whatToLearn: 'Stationarity tests (ADF test), Autoregressive models (ARIMA, SARIMAX), Prophet, Exponential Smoothing, Recurrent time series forecasting (LSTMs, Temporal Fusion Transformers).',
                    nextSteps: 'Forecast demand, resource utilization, and detect sudden metric deviations in real-time.',
                    keyTools: 'Statsmodels, Prophet, Darts, NeuralProphet'
                  },
                  {
                    step: 'Phase 6',
                    title: 'ML Engineering, Model Registry & Pipeline Deployment',
                    whatToLearn: 'Model tracking and versioning with MLflow, Data version control with DVC, Automated feature stores (Feast), Model packaging into ONNX runtime, Real-time REST API serving with sub-10ms response times.',
                    nextSteps: 'Deploy and monitor production ML models with data drift and concept drift alerts.',
                    keyTools: 'MLflow, DVC, ONNX, Feast, FastAPI, Docker'
                  }
                ].map((item, idx) => (
                  <div key={item.step} className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 shadow-md text-left">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                          {item.step}
                        </span>
                        <h4 className="text-[10px] font-bold text-white font-mono">{item.title}</h4>
                      </div>
                      <span className="text-[7.5px] font-mono text-slate-500">Step {idx + 1} of 6</span>
                    </div>

                    <div className="space-y-1.5 text-[8.5px]">
                      <div>
                        <strong className="text-emerald-300 font-mono">1. What to Learn First: </strong>
                        <span className="text-slate-300">{item.whatToLearn}</span>
                      </div>
                      <div>
                        <strong className="text-sky-300 font-mono">2. Next Progression Step: </strong>
                        <span className="text-slate-300">{item.nextSteps}</span>
                      </div>
                      <div className="pt-1">
                        <span className="text-[7.5px] font-mono text-slate-400">Core Tools &amp; Libraries: </span>
                        <span className="text-[7.5px] font-mono text-emerald-300 bg-emerald-950/40 border border-emerald-800/40 px-1.5 py-0.2 rounded">
                          {item.keyTools}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* TAB 7: NLP ROADMAP (NATURAL LANGUAGE PROCESSING PATH)      */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {activeTab === 'nlp_roadmap' && (
            <motion.div
              key="nlp_roadmap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="pb-2 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                  <Network className="w-4 h-4 text-purple-400" />
                  Natural Language Processing (NLP) Specialist Roadmap 2026
                </h3>
                <p className="text-[8.5px] text-slate-400 mt-0.5">
                  From text tokenization and semantic embeddings to Transformer self-attention, RAG architectures, and evaluation metrics.
                </p>
              </div>

              {/* Step-by-step NLP roadmap cards */}
              <div className="space-y-3">
                {[
                  {
                    step: 'Phase 1',
                    title: 'Text Preprocessing, RegEx & Classical Linguistic Rules',
                    whatToLearn: 'Regular expressions for pattern extraction, Tokenization, Stopwords removal, Stemming (Porter/Snowball) vs Lemmatization (WordNet), Part-of-Speech (POS) Tagging, Named Entity Recognition (NER), N-Grams, TF-IDF Vectorization.',
                    nextSteps: 'Build rule-based information extraction and sentiment classification engines on raw unstructured text.',
                    keyTools: 'NLTK, spaCy, RegEx, scikit-learn'
                  },
                  {
                    step: 'Phase 2',
                    title: 'Static & Contextual Word Embeddings',
                    whatToLearn: 'Distributional semantics hypothesis, Word2Vec (Skip-Gram & CBOW architectures), GloVe global co-occurrence vectors, FastText subword embeddings, Cosine similarity search, Embedding space visualization.',
                    nextSteps: 'Understand how semantic geometry encodes analogies and relationships between words.',
                    keyTools: 'Gensim, FastText, NumPy, Matplotlib'
                  },
                  {
                    step: 'Phase 3',
                    title: 'Sequential Deep Learning & Encoder-Decoder Networks',
                    whatToLearn: 'Recurrent Neural Networks (RNNs), Vanishing/Exploding gradients, Long Short-Term Memory (LSTM) gates (Forget, Input, Output), Gated Recurrent Units (GRUs), Bidirectional LSTMs, Seq2Seq with Bahdanau Attention for Machine Translation.',
                    nextSteps: 'Implement custom LSTM text generation and sequence tagging models in PyTorch.',
                    keyTools: 'PyTorch, TorchText, CUDA'
                  },
                  {
                    step: 'Phase 4',
                    title: 'Transformer Architecture Deep-Dive & Pretrained LLMs',
                    whatToLearn: 'Self-Attention mechanics (Q, K, V dot product scaling), Multi-Head Attention, Positional Encodings (Sinusoidal, RoPE, ALiBi), Encoder models (BERT, RoBERTa for classification), Decoder models (GPT for generation), Sequence-to-Sequence (T5).',
                    nextSteps: 'Fine-tune BERT for entity recognition and T5 for abstractive text summarization.',
                    keyTools: 'Hugging Face Transformers, Datasets, Tokenizers, Accelerate'
                  },
                  {
                    step: 'Phase 5',
                    title: 'Vector Search, RAG & Semantic Information Retrieval',
                    whatToLearn: 'Bi-Encoders vs Cross-Encoders, Sentence-Transformers (SBERT), Dense Vector Retrieval (HNSW indexing, IVFPQ compression), Hybrid search combining BM25 keyword matching with Vector Cosine similarity, Contextual compression.',
                    nextSteps: 'Architect enterprise search pipelines with sub-30ms retrieval latency across millions of passages.',
                    keyTools: 'Sentence-Transformers, Qdrant, FAISS, BM25, Cohere Rerank'
                  },
                  {
                    step: 'Phase 6',
                    title: 'LLM Fine-Tuning, Alignment & NLP Evaluation Metrics',
                    whatToLearn: 'Instruction Fine-Tuning (SFT), Parameter-Efficient Fine-Tuning (LoRA, QLoRA 4-bit quantization), Alignment with DPO / RLHF, NLP Evaluation Metrics (BLEU, ROUGE-1/2/L, Perplexity, METEOR, Ragas faithfulness score).',
                    nextSteps: 'Evaluate and prevent hallucinations in production generative NLP pipelines.',
                    keyTools: 'PEFT, TRL, Unsloth, Axolotl, Ragas, Trulens'
                  }
                ].map((item, idx) => (
                  <div key={item.step} className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 shadow-md text-left">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-bold">
                          {item.step}
                        </span>
                        <h4 className="text-[10px] font-bold text-white font-mono">{item.title}</h4>
                      </div>
                      <span className="text-[7.5px] font-mono text-slate-500">Step {idx + 1} of 6</span>
                    </div>

                    <div className="space-y-1.5 text-[8.5px]">
                      <div>
                        <strong className="text-purple-300 font-mono">1. What to Learn First: </strong>
                        <span className="text-slate-300">{item.whatToLearn}</span>
                      </div>
                      <div>
                        <strong className="text-sky-300 font-mono">2. Next Progression Step: </strong>
                        <span className="text-slate-300">{item.nextSteps}</span>
                      </div>
                      <div className="pt-1">
                        <span className="text-[7.5px] font-mono text-slate-400">Core Tools &amp; Libraries: </span>
                        <span className="text-[7.5px] font-mono text-purple-300 bg-purple-950/40 border border-purple-800/40 px-1.5 py-0.2 rounded">
                          {item.keyTools}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* TEMPLATE PREVIEW MODAL DRAWER                               */}
      {/* ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedTemplateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-lg w-full p-5 shadow-2xl text-left relative"
            >
              <button
                onClick={() => setSelectedTemplateModal(null)}
                className="absolute top-4 right-4 p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[8px] font-mono px-2 py-0.5 rounded-full bg-sky-950 border border-sky-800 text-sky-300 font-bold">
                  {selectedTemplateModal.tag}
                </span>
                <span className="text-[8px] font-mono text-emerald-400 font-bold">
                  {selectedTemplateModal.atsCompatibility} ATS Guaranteed
                </span>
              </div>

              <h3 className="text-sm font-bold text-white font-mono">{selectedTemplateModal.title}</h3>
              <p className="text-[9px] text-slate-400 mt-0.5">{selectedTemplateModal.subtitle}</p>

              {/* Features list */}
              <div className="mt-3 bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-1.5">
                <span className="text-[8px] font-mono text-slate-400 block mb-1">Architecture Highlights:</span>
                {selectedTemplateModal.features.map((f: string) => (
                  <div key={f} className="flex items-center gap-1.5 text-[8.5px] text-slate-300">
                    <Check className="w-3 h-3 text-sky-400 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  onClick={() => setSelectedTemplateModal(null)}
                  className="px-3 py-1.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white text-[9px] font-mono cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    windowsSound.playClick();
                    alert(`Selected template: "${selectedTemplateModal.title}". Loaded into your editing canvas!`);
                    setSelectedTemplateModal(null);
                  }}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white text-[9px] font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-lg"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Apply &amp; Download Template</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

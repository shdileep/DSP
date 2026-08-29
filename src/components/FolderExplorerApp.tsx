import React, { useState } from 'react';
import { 
  Folder, 
  FileText, 
  FileCode, 
  Image as ImageIcon, 
  Award, 
  Search, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  Grid, 
  List, 
  HardDrive, 
  Download, 
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
  CheckCircle2,
  X
} from 'lucide-react';

export interface ExplorerItem {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'code' | 'image' | 'doc';
  size: string;
  date: string;
  badge?: string;
  category: 'projects' | 'patents' | 'skills' | 'experience' | 'microservices';
  description: string;
  contentSnippet?: string;
  actionType?: 'open_project' | 'open_code' | 'view_pdf' | 'view_image';
  projectIndex?: number;
}

const ALL_ITEMS: ExplorerItem[] = [
  // ── 1. PROJECTS FOLDER ──
  {
    id: 'p-nexttrip',
    name: 'NextTrip_AI_Platform.app',
    type: 'folder',
    size: '124 MB',
    date: 'Aug 2026',
    badge: 'Production',
    category: 'projects',
    description: 'AI-Powered Smart Bus Reservation & Dynamic Pricing Engine',
    contentSnippet: 'Features real-time seat inventory, coupon engine, dynamic surge pricing, and live GPS transit telemetry.',
    actionType: 'open_project',
    projectIndex: 0
  },
  {
    id: 'p-ujjwal',
    name: 'Ujjwal_Hub_IoT.app',
    type: 'folder',
    size: '98 MB',
    date: 'Jul 2026',
    badge: 'IoT Fleet',
    category: 'projects',
    description: 'Smart Waste Management IoT Sensors & A* Heuristic TSP Route Optimizer',
    contentSnippet: 'Automated telemetry tracking 24 bin nodes and fleet turn-by-turn dispatch.',
    actionType: 'open_project',
    projectIndex: 1
  },
  {
    id: 'p-shubh',
    name: 'Shubh_AI_Studio.app',
    type: 'folder',
    size: '215 MB',
    date: 'Aug 2026',
    badge: 'Autonomous AI',
    category: 'projects',
    description: 'Autonomous Natural Language Prompt-to-Full-Stack E-Commerce Studio',
    contentSnippet: 'Transforms raw text prompts into production responsive storefronts with live checkout in seconds.',
    actionType: 'open_project',
    projectIndex: 2
  },
  {
    id: 'p-hirezeno',
    name: 'HireZeno_2.O_ATS.app',
    type: 'folder',
    size: '86 MB',
    date: 'Jun 2026',
    badge: 'BERT NLP',
    category: 'projects',
    description: 'Autonomous AI Resume Parser, ATS Keyword Matcher & Career Roadmap Engine',
    contentSnippet: 'BERT cosine similarity scoring with 10 industry resume templates and roadmap generation.',
    actionType: 'open_project',
    projectIndex: 3
  },

  // ── 2. PATENTS & RESEARCH ──
  {
    id: 'pat-01',
    name: 'Patent_IoT_Smart_Waste_Sorting_2026.pdf',
    type: 'pdf',
    size: '4.2 MB',
    date: 'Jan 2026',
    badge: 'Official Patent',
    category: 'patents',
    description: 'Patent: Automated Multi-Spectral IoT Sensor Bin & Heuristic Dynamic Route Allocation',
    contentSnippet: 'Indian Patent Application #2026/IN/49102 filed for smart municipal IoT automation.'
  },
  {
    id: 'pat-02',
    name: 'IEEE_AI_Semantic_Routing_Paper.pdf',
    type: 'pdf',
    size: '2.8 MB',
    date: 'Mar 2026',
    badge: 'IEEE Published',
    category: 'patents',
    description: 'Research Paper: Multi-Agent Deep Reinforcement Learning for Real-Time Fleet Logistics'
  },
  {
    id: 'pat-03',
    name: 'VIT_Chennai_Undergrad_Thesis.pdf',
    type: 'pdf',
    size: '8.1 MB',
    date: 'May 2025',
    badge: 'Distinction',
    category: 'patents',
    description: 'Autonomous Machine Learning Architectures for Distributed Vector Search'
  },

  // ── 3. SKILLS & FRAMEWORKS ──
  {
    id: 'sk-01',
    name: 'AI_ML_PyTorch_Stack.json',
    type: 'code',
    size: '18 KB',
    date: 'Aug 2026',
    badge: 'Expert',
    category: 'skills',
    description: 'PyTorch, TensorFlow, HuggingFace Transformers, LangChain, RAG Pipelines, pgvector'
  },
  {
    id: 'sk-02',
    name: 'FullStack_Cloud_Architecture.json',
    type: 'code',
    size: '24 KB',
    date: 'Aug 2026',
    badge: 'Production',
    category: 'skills',
    description: 'React 19, TypeScript, FastAPI, Node.js, Docker, AWS ECS, PostgreSQL, TailwindCSS'
  },

  // ── 4. EXPERIENCE & CREDENTIALS ──
  {
    id: 'exp-01',
    name: 'VIT_Chennai_BTech_Degree.pdf',
    type: 'pdf',
    size: '3.1 MB',
    date: '2021-2025',
    badge: 'Alumnus',
    category: 'experience',
    description: 'Vellore Institute of Technology (VIT Chennai) — B.Tech Computer Science & Engineering'
  },
  {
    id: 'exp-02',
    name: 'Infosys_Springboard_Certified.png',
    type: 'image',
    size: '1.4 MB',
    date: '2024',
    badge: 'Certified',
    category: 'experience',
    description: 'Infosys Springboard AI/ML & Cloud Computing Professional Certification'
  },

  // ── 5. MICROSERVICES SOURCE ──
  {
    id: 'ms-01',
    name: 'ai_pipeline.py',
    type: 'code',
    size: '6.8 KB',
    date: 'Aug 2026',
    badge: 'Python',
    category: 'microservices',
    description: 'FastAPI Zero-Shot NLP Classifier and Auto-Draft Synthesis Core'
  },
  {
    id: 'ms-02',
    name: 'search_service.py',
    type: 'code',
    size: '13.2 KB',
    date: 'Aug 2026',
    badge: 'Python',
    category: 'microservices',
    description: 'Multi-threaded live web search retrieval & AI summarizer agent'
  }
];

interface FolderExplorerAppProps {
  onOpenProject?: (projectIndex: number) => void;
  onOpenVSCode?: () => void;
}

export default function FolderExplorerApp({ onOpenProject, onOpenVSCode }: FolderExplorerAppProps) {
  const [currentFolder, setCurrentFolder] = useState<'root' | 'projects' | 'patents' | 'skills' | 'experience' | 'microservices'>('projects');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItem, setSelectedItem] = useState<ExplorerItem | null>(null);

  const displayedItems = ALL_ITEMS.filter(item => {
    const matchesCategory = currentFolder === 'root' || item.category === currentFolder;
    const matchesSearch = searchQuery.trim() === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleItemClick = (item: ExplorerItem) => {
    setSelectedItem(item);
    if (item.actionType === 'open_project' && typeof item.projectIndex === 'number' && onOpenProject) {
      onOpenProject(item.projectIndex);
    }
  };

  return (
    <div className="w-full h-full min-h-[460px] flex flex-col bg-[#0b0f19] text-slate-200 font-sans text-xs select-none overflow-hidden rounded-xl border border-slate-800 shadow-2xl">
      {/* ── TOP EXPLORER HEADER ── */}
      <div className="h-11 bg-[#121826] border-b border-slate-800 flex items-center justify-between px-3 shrink-0 gap-3">
        {/* Navigation History & Breadcrumbs */}
        <div className="flex items-center gap-1.5 flex-1 overflow-hidden">
          <button 
            onClick={() => setCurrentFolder('root')} 
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Go to root"
          >
            <HardDrive className="w-3.5 h-3.5" />
          </button>
          <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />
          <div className="flex items-center gap-1 bg-[#1a2336] px-2.5 py-1 rounded-md border border-slate-700 text-[11px] text-slate-300 font-mono truncate">
            <span className="text-sky-400 font-bold">This PC</span>
            <span>&gt;</span>
            <span className="text-slate-400">Dileep-OS</span>
            <span>&gt;</span>
            <span className="text-emerald-400 font-bold uppercase">{currentFolder}</span>
          </div>
        </div>

        {/* Search Filter */}
        <div className="relative w-48 shrink-0">
          <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search files & folders..."
            className="w-full bg-[#1a2336] border border-slate-700 rounded-md pl-7 pr-2 py-1 text-[11px] text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500 transition-colors"
          />
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-[#1a2336] p-0.5 rounded border border-slate-700">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1 rounded transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'}`}
            title="Grid View"
          >
            <Grid className="w-3 h-3" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1 rounded transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'}`}
            title="List View"
          >
            <List className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* ── MAIN EXPLORER BODY ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Section Folder Sidebar */}
        <div className="w-48 bg-[#0e1320] border-r border-slate-800 p-2 shrink-0 flex flex-col justify-between select-none">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 mb-1">
              SECTION FOLDERS
            </div>
            
            <div className="space-y-1">
              {[
                { id: 'projects', label: 'Featured Projects', icon: Folder, color: 'text-amber-400' },
                { id: 'patents', label: 'Patents & Research', icon: Award, color: 'text-purple-400' },
                { id: 'skills', label: 'Skills & Stack', icon: Cpu, color: 'text-sky-400' },
                { id: 'experience', label: 'Experience & Degrees', icon: ShieldCheck, color: 'text-emerald-400' },
                { id: 'microservices', label: 'Microservices Source', icon: FileCode, color: 'text-cyan-400' }
              ].map(folder => {
                const isSelected = currentFolder === folder.id;
                const IconComponent = folder.icon;
                return (
                  <button
                    key={folder.id}
                    onClick={() => setCurrentFolder(folder.id as any)}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all cursor-pointer text-[11px] font-medium ${
                      isSelected 
                        ? 'bg-sky-600/20 text-sky-300 font-bold border border-sky-500/40 shadow-sm' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 ${folder.color}`} />
                    <span className="truncate">{folder.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Disk Telemetry */}
          <div className="p-2.5 rounded-lg bg-[#141a2b] border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>Fast NVMe SSD</span>
              <span className="text-emerald-400 font-bold">512 GB Free</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 w-[38%]" />
            </div>
          </div>
        </div>

        {/* Right Files Container View */}
        <div className="flex-1 p-4 overflow-y-auto no-scrollbar bg-[#0b0f19]">
          {displayedItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-2">
              <Search className="w-8 h-8 opacity-40" />
              <p>No files or folders found matching query.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {displayedItems.map(item => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="p-3 rounded-xl bg-[#121826]/80 hover:bg-[#1a2336] border border-slate-800 hover:border-sky-500/50 transition-all cursor-pointer flex flex-col justify-between group shadow-sm hover:shadow-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-700/80 group-hover:scale-110 transition-transform">
                      {item.type === 'folder' ? (
                        <Folder className="w-5 h-5 text-amber-400" />
                      ) : item.type === 'pdf' ? (
                        <FileText className="w-5 h-5 text-rose-400" />
                      ) : item.type === 'image' ? (
                        <ImageIcon className="w-5 h-5 text-indigo-400" />
                      ) : (
                        <FileCode className="w-5 h-5 text-sky-400" />
                      )}
                    </div>
                    {item.badge && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-950/80 text-sky-400 border border-sky-800/50 font-bold">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 text-left">
                    <div className="font-semibold text-slate-200 group-hover:text-white truncate text-[11px]">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-slate-400 line-clamp-2 leading-tight">
                      {item.description}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[9px] text-slate-500 font-mono">
                    <span>{item.size}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1 text-left">
              {displayedItems.map(item => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="px-3 py-2 rounded-lg bg-[#121826]/60 hover:bg-[#1a2336] border border-slate-800/60 flex items-center justify-between transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    {item.type === 'folder' ? (
                      <Folder className="w-4 h-4 text-amber-400" />
                    ) : item.type === 'pdf' ? (
                      <FileText className="w-4 h-4 text-rose-400" />
                    ) : (
                      <FileCode className="w-4 h-4 text-sky-400" />
                    )}
                    <div>
                      <div className="font-semibold text-slate-200 group-hover:text-white text-[11px]">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-slate-400">{item.description}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-[10px] text-slate-500 font-mono">
                    <span>{item.size}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── FILE DETAILS POPUP MODAL ── */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#131929] border border-slate-700 rounded-2xl p-5 shadow-2xl text-left space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-sky-950/80 border border-sky-700/50 text-sky-400">
                  <FileText className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-bold text-white text-sm">{selectedItem.name}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">{selectedItem.size} • {selectedItem.date}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedItem(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed">{selectedItem.description}</p>
            {selectedItem.contentSnippet && (
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[10px] text-emerald-400">
                {selectedItem.contentSnippet}
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              {selectedItem.actionType === 'open_project' && (
                <button
                  onClick={() => {
                    const idx = selectedItem.projectIndex ?? 0;
                    setSelectedItem(null);
                    if (onOpenProject) onOpenProject(idx);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Launch Application</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

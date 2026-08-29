import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Globe, 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  Home, 
  Lock, 
  Star, 
  Plus, 
  X, 
  Sparkles, 
  ExternalLink, 
  Share2, 
  MoreVertical, 
  Bookmark, 
  ChevronDown, 
  ChevronUp, 
  Image as ImageIcon, 
  Newspaper, 
  Video, 
  MapPin, 
  SlidersHorizontal,
  Compass,
  Layers,
  CheckCircle2,
  Clock,
  BookOpen
} from 'lucide-react';
import { windowsSound } from '../../utils/windowsSound';

interface SearchResultItem {
  title: string;
  url: string;
  display_url?: string;
  site_name: string;
  snippet: string;
  sitelinks?: string[];
}

interface KnowledgePanelData {
  title: string;
  subtitle: string;
  description: string;
  attributes?: Record<string, string>;
}

interface SearchResponseData {
  query: string;
  stats?: string;
  ai_overview?: string;
  ai_key_points?: string[];
  knowledge_panel?: KnowledgePanelData | null;
  results: SearchResultItem[];
  people_also_ask?: Array<{ question: string; snippet: string }>;
  images?: Array<{ title: string; source: string }>;
  related_searches?: string[];
}

interface ChromeTab {
  id: string;
  title: string;
  url: string;
  query: string;
  pageType: 'home' | 'search' | 'webpage';
  activeCategory: 'all' | 'images' | 'news' | 'videos';
  searchData: SearchResponseData | null;
  loading: boolean;
  history: Array<{ url: string; query: string; pageType: 'home' | 'search' | 'webpage' }>;
  historyIndex: number;
}

const POPULAR_SEARCHES = [
  'Latest AI Models & Architectures',
  'Quantum Computing Breakthroughs',
  'SpaceX Starship Mars Mission',
  'TypeScript 5.5 Features',
  'FastAPI High-Performance Async',
  'WebAssembly & Rust Ecosystem'
];

const DEFAULT_BOOKMARKS = [
  { name: 'Google', url: 'https://www.google.com', query: '' },
  { name: 'GitHub', url: 'https://github.com', query: 'GitHub open source repositories' },
  { name: 'Wikipedia', url: 'https://en.wikipedia.org', query: 'Wikipedia free encyclopedia' },
  { name: 'Stack Overflow', url: 'https://stackoverflow.com', query: 'Stack Overflow programming solutions' },
  { name: 'Hacker News', url: 'https://news.ycombinator.com', query: 'Hacker News technology trends' },
  { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', query: 'MDN Web Docs developer reference' }
];

export default function GoogleChromeApp() {
  const [tabs, setTabs] = useState<ChromeTab[]>([
    {
      id: 'tab-1',
      title: 'New Tab',
      url: 'https://www.google.com',
      query: '',
      pageType: 'home',
      activeCategory: 'all',
      searchData: null,
      loading: false,
      history: [{ url: 'https://www.google.com', query: '', pageType: 'home' }],
      historyIndex: 0
    }
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('tab-1');
  const [addressInput, setAddressInput] = useState<string>('https://www.google.com');
  const [expandedPaaIdx, setExpandedPaaIdx] = useState<number | null>(0);
  const [showAiOverviewMore, setShowAiOverviewMore] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  useEffect(() => {
    if (activeTab) {
      if (activeTab.pageType === 'home') {
        setAddressInput('https://www.google.com');
      } else if (activeTab.pageType === 'search') {
        setAddressInput(`https://www.google.com/search?q=${encodeURIComponent(activeTab.query)}`);
      } else {
        setAddressInput(activeTab.url);
      }
    }
  }, [activeTabId, activeTab?.pageType, activeTab?.query, activeTab?.url]);

  // Execute Search Function via Backend API
  const executeSearch = async (queryText: string, targetTabId?: string) => {
    const q = queryText.trim();
    if (!q) return;

    const tabId = targetTabId || activeTabId;
    windowsSound.playClick();

    // Set tab to loading & search mode
    setTabs(prev => prev.map(t => {
      if (t.id === tabId) {
        const newHistory = t.history.slice(0, t.historyIndex + 1);
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(q)}`;
        newHistory.push({ url: searchUrl, query: q, pageType: 'search' });
        return {
          ...t,
          title: `${q} - Google Search`,
          url: searchUrl,
          query: q,
          pageType: 'search',
          loading: true,
          history: newHistory,
          historyIndex: newHistory.length - 1
        };
      }
      return t;
    }));

    try {
      // Call backend search endpoint
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: json_payload(q)
      });

      if (response.ok) {
        const data = await response.json();
        setTabs(prev => prev.map(t => {
          if (t.id === tabId) {
            return {
              ...t,
              searchData: data,
              loading: false
            };
          }
          return t;
        }));
      } else {
        // Fallback GET request or client synthesis
        const getResp = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        if (getResp.ok) {
          const getData = await getResp.json();
          setTabs(prev => prev.map(t => t.id === tabId ? { ...t, searchData: getData, loading: false } : t));
        } else {
          fallbackClientSearch(q, tabId);
        }
      }
    } catch {
      fallbackClientSearch(q, tabId);
    }
  };

  const json_payload = (query: string) => {
    return JSON.stringify({ query });
  };

  // Client-side fallback synthesizer
  const fallbackClientSearch = (q: string, tabId: string) => {
    const qTitle = q.charAt(0).toUpperCase() + q.slice(1);
    const qSlug = encodeURIComponent(q.toLowerCase().replace(/\s+/g, '_'));
    const mockData: SearchResponseData = {
      query: q,
      stats: 'About 1,240,000,000 results (0.24 seconds)',
      ai_overview: `${qTitle} is widely explored across technology, engineering, and digital science. Key principles include robust modular systems, high-efficiency data flows, and automated interoperability.`,
      ai_key_points: [
        `Defines fundamental standards and architectural paradigms for ${q}.`,
        `Extensively utilized in distributed modern environments.`,
        `Active open-source community with continuous ongoing developments.`
      ],
      knowledge_panel: {
        title: qTitle,
        subtitle: 'Computing & Technology Domain',
        description: `Authoritative overview, foundational principles, and global ecosystem surrounding ${q}.`,
        attributes: {
          'Category': 'Software & Innovation',
          'Ecosystem': 'Global Web Standards',
          'Status': 'Production Ready & Active'
        }
      },
      results: [
        {
          title: `${qTitle} - Official Documentation & Developer Guide`,
          url: `https://developer.mozilla.org/en-US/docs/${qSlug}`,
          display_url: `developer.mozilla.org > docs > ${qSlug}`,
          site_name: 'MDN Web Docs',
          snippet: `Comprehensive guides, API references, tutorials, and best practices for implementing ${q} in modern software systems.`,
          sitelinks: ['Documentation', 'Reference Manual', 'API Guides', 'Tutorials']
        },
        {
          title: `${qTitle} - Wikipedia, the free encyclopedia`,
          url: `https://en.wikipedia.org/wiki/${qSlug}`,
          display_url: `en.wikipedia.org > wiki > ${qSlug}`,
          site_name: 'Wikipedia',
          snippet: `Detailed background, history, technical specifications, and key advancements in ${q}.`,
          sitelinks: ['History', 'Overview', 'Key Concepts', 'References']
        },
        {
          title: `Trending Open Source Repositories for ${qTitle}`,
          url: `https://github.com/topics/${qSlug}`,
          display_url: `github.com > topics > ${qSlug}`,
          site_name: 'GitHub',
          snippet: `Explore open-source libraries, packages, utilities, and developer projects built around ${q}.`,
          sitelinks: ['Trending Repos', 'Community Discussions', 'Code Releases']
        },
        {
          title: `Latest Community Insights and Discussions on ${qTitle}`,
          url: `https://news.ycombinator.com/item?id=${qSlug}`,
          display_url: `news.ycombinator.com > item > ${qSlug}`,
          site_name: 'Hacker News',
          snippet: `Read engineering reviews, benchmark breakdowns, and real-world adoption case studies on ${q}.`,
          sitelinks: ['Comments', 'Discussion', 'Analysis']
        }
      ],
      people_also_ask: [
        {
          question: `What is ${q} and how does it work?`,
          snippet: `${qTitle} provides structured capabilities, standard APIs, and execution paradigms to solve real-world problems effectively.`
        },
        {
          question: `What are the top benefits of ${q}?`,
          snippet: `Key advantages include high efficiency, clear developer documentation, rapid prototyping, and broad industry support.`
        }
      ],
      related_searches: [
        `${q} tutorial 2026`,
        `${q} architecture guide`,
        `${q} open source tools`,
        `${q} best practices`,
        `${q} documentation`
      ]
    };

    setTabs(prev => prev.map(t => t.id === tabId ? { ...t, searchData: mockData, loading: false } : t));
  };

  // Address Bar Submit Handler
  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = addressInput.trim();
    if (!input) return;

    if (input.startsWith('http://') || input.startsWith('https://') || (input.includes('.') && !input.includes(' '))) {
      const fullUrl = input.startsWith('http://') || input.startsWith('https://') ? input : `https://${input}`;
      const domain = fullUrl.replace(/https?:\/\//, '').split('/')[0];
      setTabs(prev => prev.map(t => {
        if (t.id === activeTabId) {
          const newHistory = t.history.slice(0, t.historyIndex + 1);
          newHistory.push({ url: fullUrl, query: '', pageType: 'webpage' });
          return {
            ...t,
            title: domain,
            url: fullUrl,
            query: '',
            pageType: 'webpage',
            loading: false,
            history: newHistory,
            historyIndex: newHistory.length - 1
          };
        }
        return t;
      }));
    } else {
      executeSearch(input);
    }
  };

  // Open New Tab
  const handleNewTab = () => {
    windowsSound.playClick();
    const newId = `tab-${Date.now()}`;
    const newTab: ChromeTab = {
      id: newId,
      title: 'New Tab',
      url: 'https://www.google.com',
      query: '',
      pageType: 'home',
      activeCategory: 'all',
      searchData: null,
      loading: false,
      history: [{ url: 'https://www.google.com', query: '', pageType: 'home' }],
      historyIndex: 0
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newId);
  };

  // Close Tab
  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    windowsSound.playClick();
    if (tabs.length === 1) {
      // Reset the single tab to home
      setTabs([{
        id: 'tab-1',
        title: 'New Tab',
        url: 'https://www.google.com',
        query: '',
        pageType: 'home',
        activeCategory: 'all',
        searchData: null,
        loading: false,
        history: [{ url: 'https://www.google.com', query: '', pageType: 'home' }],
        historyIndex: 0
      }]);
      setActiveTabId('tab-1');
      return;
    }
    const filtered = tabs.filter(t => t.id !== tabId);
    setTabs(filtered);
    if (activeTabId === tabId) {
      setActiveTabId(filtered[filtered.length - 1].id);
    }
  };

  // Navigation Back / Forward / Refresh / Home
  const handleGoBack = () => {
    if (!activeTab || activeTab.historyIndex <= 0) return;
    windowsSound.playClick();
    const targetIdx = activeTab.historyIndex - 1;
    const item = activeTab.history[targetIdx];
    setTabs(prev => prev.map(t => {
      if (t.id === activeTabId) {
        return {
          ...t,
          url: item.url,
          query: item.query,
          pageType: item.pageType,
          title: item.pageType === 'home' ? 'New Tab' : item.pageType === 'search' ? `${item.query} - Google Search` : t.title,
          historyIndex: targetIdx
        };
      }
      return t;
    }));
  };

  const handleGoForward = () => {
    if (!activeTab || activeTab.historyIndex >= activeTab.history.length - 1) return;
    windowsSound.playClick();
    const targetIdx = activeTab.historyIndex + 1;
    const item = activeTab.history[targetIdx];
    setTabs(prev => prev.map(t => {
      if (t.id === activeTabId) {
        return {
          ...t,
          url: item.url,
          query: item.query,
          pageType: item.pageType,
          title: item.pageType === 'home' ? 'New Tab' : item.pageType === 'search' ? `${item.query} - Google Search` : t.title,
          historyIndex: targetIdx
        };
      }
      return t;
    }));
  };

  const handleRefresh = () => {
    windowsSound.playClick();
    if (activeTab.pageType === 'search' && activeTab.query) {
      executeSearch(activeTab.query);
    }
  };

  const handleGoHome = () => {
    windowsSound.playClick();
    setTabs(prev => prev.map(t => {
      if (t.id === activeTabId) {
        const newHistory = t.history.slice(0, t.historyIndex + 1);
        newHistory.push({ url: 'https://www.google.com', query: '', pageType: 'home' });
        return {
          ...t,
          title: 'New Tab',
          url: 'https://www.google.com',
          query: '',
          pageType: 'home',
          history: newHistory,
          historyIndex: newHistory.length - 1
        };
      }
      return t;
    }));
  };

  const handleVisitUrl = (url: string, title?: string) => {
    windowsSound.playClick();
    setTabs(prev => prev.map(t => {
      if (t.id === activeTabId) {
        const newHistory = t.history.slice(0, t.historyIndex + 1);
        newHistory.push({ url, query: '', pageType: 'webpage' });
        return {
          ...t,
          title: title || url.replace(/https?:\/\//, '').split('/')[0],
          url,
          pageType: 'webpage',
          history: newHistory,
          historyIndex: newHistory.length - 1
        };
      }
      return t;
    }));
  };

  const handleCategoryChange = (category: 'all' | 'images' | 'news' | 'videos') => {
    windowsSound.playClick();
    setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, activeCategory: category } : t));
  };

  return (
    <div className="h-full flex flex-col bg-[#202124] text-left font-sans select-none overflow-hidden">
      
      {/* ───────────────────────────────────────────────────────────── */}
      {/* 1. CHROME TAB STRIP                                           */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="bg-[#1f1f23] px-2 pt-2 flex items-center gap-1 border-b border-black/40 text-[9px] font-medium overflow-x-auto no-scrollbar">
        {tabs.map(tab => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              onClick={() => {
                windowsSound.playClick();
                setActiveTabId(tab.id);
              }}
              className={`group max-w-[170px] min-w-[110px] h-7 px-2.5 rounded-t-lg flex items-center justify-between gap-1.5 cursor-pointer transition-colors ${
                isActive 
                  ? 'bg-[#303134] text-white font-semibold shadow-md' 
                  : 'bg-[#28292c]/60 text-slate-400 hover:bg-[#28292c] hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <Globe className={`w-3 h-3 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span className="truncate">{tab.title}</span>
              </div>
              <button
                onClick={(e) => handleCloseTab(e, tab.id)}
                className="w-3.5 h-3.5 rounded-full hover:bg-white/20 flex items-center justify-center text-slate-400 hover:text-white shrink-0"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          );
        })}

        <button
          onClick={handleNewTab}
          className="w-6 h-6 rounded-full hover:bg-[#303134] flex items-center justify-center text-slate-400 hover:text-white cursor-pointer transition-colors"
          title="New Tab"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2. CHROME NAVIGATION & OMNIBOX BAR                            */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="bg-[#303134] px-3 py-1.5 border-b border-[#202124] flex items-center gap-2 text-[9px]">
        {/* Nav Buttons */}
        <div className="flex items-center gap-1 text-slate-400 shrink-0">
          <button 
            onClick={handleGoBack}
            disabled={!activeTab || activeTab.historyIndex <= 0}
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
              activeTab && activeTab.historyIndex > 0 ? 'hover:bg-white/10 text-white cursor-pointer' : 'text-slate-600 cursor-default'
            }`}
            title="Click to go back"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={handleGoForward}
            disabled={!activeTab || activeTab.historyIndex >= activeTab.history.length - 1}
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
              activeTab && activeTab.historyIndex < activeTab.history.length - 1 ? 'hover:bg-white/10 text-white cursor-pointer' : 'text-slate-600 cursor-default'
            }`}
            title="Click to go forward"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={handleRefresh}
            className={`w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-white cursor-pointer ${
              activeTab?.loading ? 'animate-spin text-sky-400' : ''
            }`}
            title="Reload this page"
          >
            <RotateCw className="w-3 h-3" />
          </button>
          <button 
            onClick={handleGoHome}
            className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-white cursor-pointer"
            title="Open Google Homepage"
          >
            <Home className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Omnibox (Address & Search Bar) */}
        <form onSubmit={handleAddressSubmit} className="flex-1 flex items-center bg-[#202124] hover:bg-[#1a1b1d] focus-within:bg-[#1a1b1d] border border-slate-700/80 focus-within:border-sky-500 rounded-full px-3 py-1 text-slate-200 transition-all">
          <Lock className="w-3 h-3 text-emerald-400 mr-2 shrink-0" />
          <input
            type="text"
            value={addressInput}
            onChange={e => setAddressInput(e.target.value)}
            placeholder="Search Google or type a URL"
            className="w-full bg-transparent text-[9.5px] font-sans text-white focus:outline-none placeholder-slate-500"
          />
          {addressInput && (
            <button
              type="button"
              onClick={() => setAddressInput('')}
              className="text-slate-400 hover:text-white mr-1"
            >
              <X className="w-3 h-3" />
            </button>
          )}
          <Star className="w-3 h-3 text-slate-400 hover:text-amber-400 cursor-pointer ml-1 shrink-0 transition-colors" />
        </form>

        {/* Action icons */}
        <div className="flex items-center gap-1 text-slate-400 shrink-0">
          <button className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-300">
            <Share2 className="w-3 h-3" />
          </button>
          <button className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-300">
            <MoreVertical className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 3. BOOKMARKS SHORTCUTS BAR                                   */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="bg-[#28292c] px-3 py-1 border-b border-[#202124] flex items-center gap-2 text-[8px] text-slate-300 overflow-x-auto no-scrollbar">
        {DEFAULT_BOOKMARKS.map(bm => (
          <button
            key={bm.name}
            onClick={() => {
              if (bm.query) {
                executeSearch(bm.query);
              } else {
                handleGoHome();
              }
            }}
            className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer transition-colors shrink-0"
          >
            <Globe className="w-2.5 h-2.5 text-slate-400" />
            <span>{bm.name}</span>
          </button>
        ))}
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 4. MAIN BROWSER CONTENT VIEWPORT                              */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 bg-[#202124] overflow-y-auto no-scrollbar">
        
        {/* ─────────────────────────────────────────────────────────── */}
        {/* A. GOOGLE HOME PAGE (NEW TAB)                               */}
        {/* ─────────────────────────────────────────────────────────── */}
        {activeTab.pageType === 'home' && (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto space-y-6">
            {/* Google Colorful Logo */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight select-none">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </h1>
              <p className="text-[10px] font-sans text-slate-400">Search the world's information, technologies, and documents</p>
            </div>

            {/* Google Search Form */}
            <div className="w-full space-y-4">
              <div className="relative group">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search Google or type a query..."
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      executeSearch((e.target as HTMLInputElement).value);
                    }
                  }}
                  className="w-full bg-[#303134] hover:bg-[#3c4043] focus:bg-[#303134] border border-slate-700/80 focus:border-[#8ab4f8] rounded-full py-2.5 pl-11 pr-10 text-xs text-white placeholder-slate-400 focus:outline-none shadow-lg transition-all"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => {
                    if (searchInputRef.current?.value) {
                      executeSearch(searchInputRef.current.value);
                    }
                  }}
                  className="absolute right-3 top-2 px-2.5 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded-full text-[8.5px] font-bold transition-colors cursor-pointer"
                >
                  Search
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-2 text-[9px] font-medium text-slate-300">
                <button
                  onClick={() => {
                    if (searchInputRef.current?.value) {
                      executeSearch(searchInputRef.current.value);
                    } else {
                      executeSearch('Quantum computing breakthroughs 2026');
                    }
                  }}
                  className="px-4 py-1.5 rounded-lg bg-[#303134] hover:bg-[#3c4043] border border-slate-700 text-slate-200 cursor-pointer transition-colors"
                >
                  Google Search
                </button>
                <button
                  onClick={() => {
                    const random = POPULAR_SEARCHES[Math.floor(Math.random() * POPULAR_SEARCHES.length)];
                    executeSearch(random);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-[#303134] hover:bg-[#3c4043] border border-slate-700 text-slate-200 cursor-pointer transition-colors"
                >
                  I'm Feeling Lucky
                </button>
              </div>
            </div>

            {/* Trending / Popular Queries */}
            <div className="w-full space-y-2 pt-2 text-left">
              <div className="flex items-center gap-1.5 text-[8.5px] font-bold text-slate-400 uppercase tracking-wider">
                <Compass className="w-3 h-3 text-sky-400" />
                <span>Trending Searches across the Web</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_SEARCHES.map(query => (
                  <button
                    key={query}
                    onClick={() => executeSearch(query)}
                    className="text-[8.5px] font-sans px-3 py-1 rounded-full bg-[#303134] hover:bg-sky-950 hover:text-sky-300 hover:border-sky-500/50 border border-slate-700 text-slate-300 cursor-pointer transition-all flex items-center gap-1"
                  >
                    <Search className="w-2.5 h-2.5 text-slate-400" />
                    <span>{query}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────── */}
        {/* B. GOOGLE SEARCH RESULTS PAGE (SERP)                        */}
        {/* ─────────────────────────────────────────────────────────── */}
        {activeTab.pageType === 'search' && (
          <div className="min-h-full flex flex-col bg-[#202124] text-slate-200">
            {/* Top Search Subheader & Filter Tabs */}
            <div className="border-b border-[#303134] px-4 pt-3 pb-0 bg-[#202124] sticky top-0 z-10">
              <div className="flex items-center justify-between pb-2.5">
                <div className="flex items-center gap-2 w-full max-w-lg">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      defaultValue={activeTab.query}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          executeSearch((e.target as HTMLInputElement).value);
                        }
                      }}
                      className="w-full bg-[#303134] border border-slate-700 rounded-full py-1.5 pl-4 pr-9 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#8ab4f8]"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2 cursor-pointer" />
                  </div>
                </div>
              </div>

              {/* SERP Category Filter Bar */}
              <div className="flex items-center gap-4 text-[9px] font-medium text-slate-400">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`pb-2 flex items-center gap-1 cursor-pointer transition-colors border-b-2 ${
                    activeTab.activeCategory === 'all' ? 'border-[#8ab4f8] text-[#8ab4f8] font-bold' : 'border-transparent hover:text-white'
                  }`}
                >
                  <Search className="w-3 h-3" />
                  <span>All</span>
                </button>
                <button
                  onClick={() => handleCategoryChange('images')}
                  className={`pb-2 flex items-center gap-1 cursor-pointer transition-colors border-b-2 ${
                    activeTab.activeCategory === 'images' ? 'border-[#8ab4f8] text-[#8ab4f8] font-bold' : 'border-transparent hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3 h-3" />
                  <span>Images</span>
                </button>
                <button
                  onClick={() => handleCategoryChange('news')}
                  className={`pb-2 flex items-center gap-1 cursor-pointer transition-colors border-b-2 ${
                    activeTab.activeCategory === 'news' ? 'border-[#8ab4f8] text-[#8ab4f8] font-bold' : 'border-transparent hover:text-white'
                  }`}
                >
                  <Newspaper className="w-3 h-3" />
                  <span>News</span>
                </button>
                <button
                  onClick={() => handleCategoryChange('videos')}
                  className={`pb-2 flex items-center gap-1 cursor-pointer transition-colors border-b-2 ${
                    activeTab.activeCategory === 'videos' ? 'border-[#8ab4f8] text-[#8ab4f8] font-bold' : 'border-transparent hover:text-white'
                  }`}
                >
                  <Video className="w-3 h-3" />
                  <span>Videos</span>
                </button>
              </div>
            </div>

            {/* Results Body */}
            <div className="p-4 sm:p-6 max-w-5xl space-y-6">
              
              {/* Search Loading State */}
              {activeTab.loading && (
                <div className="space-y-3 py-6">
                  <div className="flex items-center gap-2 text-sky-400 text-xs font-bold animate-pulse">
                    <Sparkles className="w-4 h-4" />
                    <span>Searching Google index...</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-800 rounded w-3/4 animate-pulse" />
                    <div className="h-3 bg-slate-800/60 rounded w-full animate-pulse" />
                    <div className="h-3 bg-slate-800/60 rounded w-5/6 animate-pulse" />
                  </div>
                </div>
              )}

              {/* Search Results Content */}
              {!activeTab.loading && activeTab.searchData && (
                <>
                  {/* Results Count & Query Timing */}
                  <div className="text-[8.5px] font-sans text-slate-400">
                    {activeTab.searchData.stats || `About 1,480,000,000 results (0.24 seconds)`}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Left & Center Column: Main Organic Results & AI Overview */}
                    <div className="lg:col-span-2 space-y-5">
                      
                      {/* 1. GOOGLE AI OVERVIEW (Gemini/SGE Style) */}
                      {activeTab.searchData.ai_overview && (
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#292238] via-[#202738] to-[#1f2628] border border-purple-500/40 shadow-xl space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300">
                                <Sparkles className="w-3 h-3" />
                              </div>
                              <span className="text-xs font-bold text-white tracking-wide">AI Overview</span>
                              <span className="text-[7.5px] font-mono px-1.5 py-0.2 rounded-full bg-purple-900/60 border border-purple-700/60 text-purple-300">
                                Generative AI
                              </span>
                            </div>
                          </div>

                          {/* Overview Summary */}
                          <p className="text-[10.5px] text-slate-200 leading-relaxed font-sans">
                            {activeTab.searchData.ai_overview}
                          </p>

                          {/* Key Points */}
                          {activeTab.searchData.ai_key_points && activeTab.searchData.ai_key_points.length > 0 && (
                            <div className="space-y-1.5 pt-1">
                              <span className="text-[8px] font-bold uppercase text-purple-300 tracking-wider">Key Takeaways</span>
                              <ul className="space-y-1 text-[9.5px] text-slate-300 list-disc list-inside">
                                {activeTab.searchData.ai_key_points.map((point, idx) => (
                                  <li key={idx} className="leading-normal">{point}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="flex justify-end pt-1">
                            <button
                              onClick={() => setShowAiOverviewMore(!showAiOverviewMore)}
                              className="text-[8px] font-bold text-[#8ab4f8] hover:underline flex items-center gap-0.5 cursor-pointer"
                            >
                              <span>{showAiOverviewMore ? 'Show less' : 'Show details'}</span>
                              {showAiOverviewMore ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* 2. PEOPLE ALSO ASK (ACCORDION) */}
                      {activeTab.searchData.people_also_ask && activeTab.searchData.people_also_ask.length > 0 && (
                        <div className="p-3.5 rounded-2xl bg-[#28292c] border border-slate-700/80 space-y-2">
                          <h4 className="text-[10.5px] font-bold text-white flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                            <span>People also ask</span>
                          </h4>
                          <div className="divide-y divide-slate-700/60 text-[9.5px]">
                            {activeTab.searchData.people_also_ask.map((paa, idx) => {
                              const isExpanded = expandedPaaIdx === idx;
                              return (
                                <div key={idx} className="py-2">
                                  <button
                                    onClick={() => setExpandedPaaIdx(isExpanded ? null : idx)}
                                    className="w-full flex items-center justify-between text-left text-slate-200 hover:text-white font-medium cursor-pointer"
                                  >
                                    <span>{paa.question}</span>
                                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
                                  </button>
                                  {isExpanded && (
                                    <p className="mt-1.5 text-[9px] text-slate-300 leading-relaxed pl-2 border-l-2 border-sky-500">
                                      {paa.snippet}
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* 3. ORGANIC SEARCH RESULTS */}
                      <div className="space-y-4">
                        {activeTab.searchData.results.map((res, idx) => (
                          <div key={idx} className="space-y-1 group">
                            {/* Favicon & Breadcrumbs */}
                            <div className="flex items-center gap-1.5 text-[8.5px] text-slate-400">
                              <Globe className="w-3 h-3 text-slate-500" />
                              <span className="font-medium text-slate-300">{res.site_name}</span>
                              <span>›</span>
                              <span className="text-slate-500 truncate max-w-xs">{res.display_url || res.url}</span>
                            </div>

                            {/* Blue Clickable Title */}
                            <h3 
                              onClick={() => handleVisitUrl(res.url, res.title)}
                              className="text-sm font-semibold text-[#8ab4f8] group-hover:underline cursor-pointer transition-colors"
                            >
                              {res.title}
                            </h3>

                            {/* Snippet */}
                            <p className="text-[10px] text-slate-300 leading-relaxed font-sans">
                              {res.snippet}
                            </p>

                            {/* Sitelinks */}
                            {res.sitelinks && res.sitelinks.length > 0 && (
                              <div className="flex flex-wrap gap-2 pt-1">
                                {res.sitelinks.map(sl => (
                                  <span
                                    key={sl}
                                    onClick={() => executeSearch(`${activeTab.query} ${sl}`)}
                                    className="text-[8px] font-medium text-[#8ab4f8] hover:underline cursor-pointer bg-[#303134] px-2 py-0.5 rounded"
                                  >
                                    {sl}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* 4. RELATED SEARCHES */}
                      {activeTab.searchData.related_searches && activeTab.searchData.related_searches.length > 0 && (
                        <div className="pt-4 border-t border-[#303134] space-y-2">
                          <h4 className="text-[10px] font-bold text-white">Related searches</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {activeTab.searchData.related_searches.map(rel => (
                              <button
                                key={rel}
                                onClick={() => executeSearch(rel)}
                                className="p-2 rounded-xl bg-[#303134] hover:bg-[#3c4043] text-left text-[9px] text-slate-200 hover:text-white flex items-center gap-2 cursor-pointer transition-colors"
                              >
                                <Search className="w-3 h-3 text-slate-400 shrink-0" />
                                <span className="truncate">{rel}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Google Knowledge Graph Panel */}
                    <div className="space-y-4">
                      {activeTab.searchData.knowledge_panel && (
                        <div className="p-4 rounded-2xl bg-[#28292c] border border-slate-700/80 shadow-md space-y-3">
                          <div>
                            <span className="text-[7.5px] font-mono uppercase text-sky-400 tracking-wider">
                              {activeTab.searchData.knowledge_panel.subtitle || 'Knowledge Entity'}
                            </span>
                            <h2 className="text-base font-extrabold text-white">
                              {activeTab.searchData.knowledge_panel.title}
                            </h2>
                          </div>

                          <p className="text-[9.5px] text-slate-300 leading-relaxed font-sans">
                            {activeTab.searchData.knowledge_panel.description}
                          </p>

                          {activeTab.searchData.knowledge_panel.attributes && (
                            <div className="space-y-1.5 pt-2 border-t border-slate-700/80 text-[8.5px]">
                              {Object.entries(activeTab.searchData.knowledge_panel.attributes).map(([k, v]) => (
                                <div key={k} className="flex justify-between gap-2">
                                  <span className="text-slate-400">{k}:</span>
                                  <span className="text-white font-medium text-right">{v}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Quick Shortcuts in Sidebar */}
                      <div className="p-3.5 rounded-2xl bg-[#28292c] border border-slate-700/80 space-y-2">
                        <span className="text-[8px] font-bold uppercase text-slate-400 tracking-wider">Explore More</span>
                        <div className="space-y-1 text-[8.5px]">
                          {DEFAULT_BOOKMARKS.slice(0, 4).map(bm => (
                            <button
                              key={bm.name}
                              onClick={() => executeSearch(bm.query || bm.name)}
                              className="w-full flex items-center justify-between p-1.5 rounded hover:bg-[#303134] text-slate-300 hover:text-white cursor-pointer"
                            >
                              <span>{bm.name}</span>
                              <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────── */}
        {/* C. IN-BROWSER SIMULATED WEBPAGE VIEWER                      */}
        {/* ─────────────────────────────────────────────────────────── */}
        {activeTab.pageType === 'webpage' && (
          <div className="h-full flex flex-col bg-slate-950 p-6 overflow-y-auto space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[8px] font-mono text-emerald-400">Secure Web View (HTTPS)</span>
                <h2 className="text-lg font-bold text-white">{activeTab.title}</h2>
                <span className="text-[9px] font-mono text-slate-400">{activeTab.url}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleGoBack}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[9px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>Back to Search</span>
                </button>
                <a
                  href={activeTab.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-[9px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Open External ↗</span>
                </a>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 leading-relaxed text-slate-300 text-xs font-sans">
              <h3 className="text-sm font-bold text-white">Live Web Document Content</h3>
              <p>
                Connected to <span className="font-mono text-sky-400">{activeTab.url}</span> through Google Chrome secure gateway.
              </p>
              <p className="text-[11px] text-slate-400">
                You can search any topic or browse pages using the Google Chrome address bar above.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

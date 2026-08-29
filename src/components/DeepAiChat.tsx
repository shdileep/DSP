import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Send, Bot, User, ArrowRight, CornerDownRight, ExternalLink } from 'lucide-react';
import { ResumeData, ThemeStyle } from '../types';
import robotIcon from '../assets/images/robot.png';
import mainmeImg from '../assets/images/mainme.png';
import linkImg from '../assets/images/link.png';

import { mockApi } from '../api/mockApi.js';
import { historyCleanupService } from '../api/historyCleanupService.js';
import { postgresDatabase } from '../api/postgresDatabase.js';
import { usePortfolioTransformer } from '../state/portfolioTransformer';
import AnimatedChatIcon from './AnimatedChatIcon';

interface DeepAiChatProps {
  resumeData: ResumeData;
  theme: ThemeStyle;
  customOverlayColor: string;
}

function DeepAiLogo({ size = 24, className = "", icon = robotIcon }: { size?: number; className?: string; icon?: string }) {
  return (
    <img 
      src={icon} 
      alt="DeepAi Bot" 
      className={`shrink-0 select-none object-contain rounded-full ${className}`} 
      style={{ width: size, height: size }}
    />
  );
}

function renderMarkdownText(content: string): React.ReactNode {
  if (!content) return null;
  if (!content.includes('**') && !content.includes('*') && !content.includes('`')) {
    return content;
  }

  // Tokenize by bold **...**, code `...`, and italics *...*
  const parts = content.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700/50 text-sky-300 font-mono text-[10.5px]">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={index} className="italic text-slate-300">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}

function FormattedAiMessage({ text, isTerminal, isContactCard }: { text: string; isTerminal: boolean; isContactCard?: boolean }) {
  // If plain simple short message (1 line without bullets/numbers/urls), render cleanly
  if (!text.includes('\n') && !text.includes('http') && !text.includes('@') && !text.startsWith('-') && !text.match(/^\d+[\)\.]/)) {
    return <div className="leading-relaxed text-[11.5px] font-sans">{renderMarkdownText(text)}</div>;
  }

  // Split by newlines
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  const renderedElements: React.ReactNode[] = [];

  lines.forEach((line, idx) => {
    // If rich contact card is displayed, skip redundant LinkedIn raw text line
    if (isContactCard && line.toLowerCase().includes('linkedin')) {
      return;
    }

    // 1. Check for standalone URL
    if (line.startsWith('http://') || line.startsWith('https://')) {
      renderedElements.push(
        <a 
          key={idx} 
          href={line} 
          target="_blank" 
          rel="noopener noreferrer"
          className="my-1.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-950/80 border border-sky-500/40 text-sky-300 hover:text-white hover:bg-sky-900/60 font-mono text-[11px] transition-all break-all shadow-sm"
        >
          <span>{line}</span>
          <ExternalLink className="w-3 h-3 shrink-0" />
        </a>
      );
      return;
    }

    // 2. Check for standalone Email
    if (line.includes('@') && !line.includes(' ') && line.includes('.')) {
      renderedElements.push(
        <a 
          key={idx} 
          href={`mailto:${line}`}
          className="my-1.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 hover:text-white hover:bg-indigo-900/60 font-mono text-[11px] transition-all shadow-sm"
        >
          <span>✉️ {line}</span>
        </a>
      );
      return;
    }

    // 3. Check for Categorized Skill / Architecture Bullet: e.g. "- AI / ML & GenAI: Python, PyTorch, ..."
    const categoryBulletMatch = line.match(/^[-*]\s*([^:]+):\s*(.+)$/);
    if (categoryBulletMatch) {
      const categoryTitle = categoryBulletMatch[1].trim();
      const rawItems = categoryBulletMatch[2].trim();

      // If it's a link or URL, render as clean bullet link instead of a category badge card
      if (rawItems.startsWith('http://') || rawItems.startsWith('https://')) {
        renderedElements.push(
          <div key={idx} className="my-1 flex items-center gap-1.5 text-left pl-1">
            <span className="text-sky-400 font-bold">•</span>
            <span className="text-[11px] text-slate-300 font-semibold">{renderMarkdownText(categoryTitle)}:</span>
            <a 
              href={rawItems} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sky-400 hover:underline inline-flex items-center gap-1 font-mono text-[10.5px]"
            >
              <span>{rawItems.replace(/^https?:\/\/(www\.)?/, '')}</span>
              <ExternalLink className="w-2.5 h-2.5 shrink-0" />
            </a>
          </div>
        );
        return;
      }

      // If it's an email address
      if (rawItems.includes('@') && !rawItems.includes(',')) {
        renderedElements.push(
          <div key={idx} className="my-1 flex items-center gap-1.5 text-left pl-1">
            <span className="text-sky-400 font-bold">•</span>
            <span className="text-[11px] text-slate-300 font-semibold">{renderMarkdownText(categoryTitle)}:</span>
            <a href={`mailto:${rawItems}`} className="text-indigo-400 hover:underline font-mono text-[10.5px]">
              {rawItems}
            </a>
          </div>
        );
        return;
      }

      // If it's a single non-skill item like "Location: Hyderabad, Telangana, India"
      if (!rawItems.includes(',')) {
        renderedElements.push(
          <div key={idx} className="my-1 flex items-center gap-1.5 text-left pl-1">
            <span className="text-sky-400 font-bold">•</span>
            <span className="text-[11px] text-slate-300 font-semibold">{renderMarkdownText(categoryTitle)}:</span>
            <span className="text-[11px] text-slate-200">{renderMarkdownText(rawItems)}</span>
          </div>
        );
        return;
      }

      // Multi-tech skill tags
      const items = rawItems.split(',').map(s => s.trim()).filter(Boolean);

      const getCategoryBadgeColor = (title: string) => {
        const lower = title.toLowerCase();
        if (lower.includes('ai') || lower.includes('ml') || lower.includes('genai')) return 'border-indigo-500/40 bg-indigo-950/70 text-indigo-300';
        if (lower.includes('full stack') || lower.includes('frontend') || lower.includes('backend')) return 'border-sky-500/40 bg-sky-950/70 text-sky-300';
        if (lower.includes('database') || lower.includes('architecture')) return 'border-purple-500/40 bg-purple-950/70 text-purple-300';
        if (lower.includes('devops') || lower.includes('cloud')) return 'border-emerald-500/40 bg-emerald-950/70 text-emerald-300';
        return 'border-amber-500/40 bg-amber-950/70 text-amber-300';
      };

      renderedElements.push(
        <div key={idx} className="my-2 p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 shadow-sm space-y-1.5 text-left">
          <div className="flex items-center gap-1.5">
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getCategoryBadgeColor(categoryTitle)}`}>
              ✦ {renderMarkdownText(categoryTitle)}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {items.map((item, itemIdx) => (
              <span 
                key={itemIdx}
                className="px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-700/70 text-[10.5px] text-slate-200 font-sans hover:border-sky-400 hover:text-white transition-colors"
              >
                {renderMarkdownText(item)}
              </span>
            ))}
          </div>
        </div>
      );
      return;
    }

    // 4. Check for Numbered List Items: e.g. "1) Prompt-to-Website Engine: ..." or "1. Renocred — ..."
    const numberedMatch = line.match(/^(\d+)[\)\.]\s*(.+)$/);
    if (numberedMatch) {
      const num = numberedMatch[1];
      const content = numberedMatch[2].trim();
      
      let titlePart = content;
      let descPart = '';

      if (content.includes(':')) {
        const parts = content.split(':');
        titlePart = parts[0].trim();
        descPart = parts.slice(1).join(':').trim();
      } else if (content.includes('—')) {
        const parts = content.split('—');
        titlePart = parts[0].trim();
        descPart = parts.slice(1).join('—').trim();
      }

      renderedElements.push(
        <div key={idx} className="my-1.5 p-2 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2.5 text-left">
          <span className="w-5 h-5 rounded-full bg-sky-950 text-sky-400 border border-sky-500/40 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
            {num}
          </span>
          <div className="flex-1 text-[11px] leading-relaxed">
            <span className="font-bold text-slate-100">{renderMarkdownText(titlePart)}</span>
            {descPart && <span className="text-slate-300 font-normal"> — {renderMarkdownText(descPart)}</span>}
          </div>
        </div>
      );
      return;
    }

    // 5. Standard bullet point (starting with - or *)
    if (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('• ')) {
      const bulletText = line.replace(/^[-*•]\s*/, '');
      renderedElements.push(
        <div key={idx} className="my-1 flex items-start gap-2 text-left pl-1">
          <span className="text-sky-400 font-bold mt-0.5">•</span>
          <span className="text-[11px] text-slate-200 leading-relaxed">{renderMarkdownText(bulletText)}</span>
        </div>
      );
      return;
    }

    // 6. Section header / Intro paragraph
    renderedElements.push(
      <p key={idx} className={`leading-relaxed text-[11.5px] ${idx === 0 ? 'font-semibold text-slate-100 mb-1' : 'text-slate-200 my-1'}`}>
        {renderMarkdownText(line)}
      </p>
    );
  });

  return <div className="space-y-1 text-left font-sans">{renderedElements}</div>;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: Date;
  options?: string[];
  isContactCard?: boolean;
}

export default function DeepAiChat({ resumeData, theme, customOverlayColor }: DeepAiChatProps) {
  const [isAdvanced] = usePortfolioTransformer();
  const activeIcon = robotIcon;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>('default-session');
  const scrollRef = useRef<HTMLDivElement>(null);

  const isTerminal = theme === 'terminal-os';
  const isSynth = theme === 'cyber-synth';
  const isMinimal = theme === 'minimal-linear';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Trigger typing welcome message in the first 1s after opening
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setMessages([
          {
            id: 'welcome',
            sender: 'ai',
            text: "Hello! I'm DeepAI, Dileep's virtual assistant. How may I assist you today?",
            timestamp: new Date()
          }
        ]);
        setIsTyping(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    const activeSessionId = historyCleanupService.initSession();
    setSessionId(activeSessionId);

    const handleSessionExpiry = () => {
      setMessages([]);
      const newSession = historyCleanupService.createNewSession();
      setSessionId(newSession.sessionId);
    };

    window.addEventListener('deepai-session-expired', handleSessionExpiry);
    return () => {
      window.removeEventListener('deepai-session-expired', handleSessionExpiry);
    };
  }, []);

  // Client-Side Mock AI API request execution pipeline
  const sendMessageToApi = async (text: string) => {
    setIsTyping(true);
    try {
      // Save User Message to PostgreSQL storage
      await postgresDatabase.saveMessage(sessionId, 'user', text, 'user_query', 1.0);

      const response = await mockApi.handleChatRequest(text, sessionId);
      const pipelineResult = response.status === 'success' ? response.data.text : 'Error processing request.';
      
      let options: string[] | undefined = undefined;
      let isContact = ['contact', 'email', 'linkedin', 'phone', 'reach', 'hire', 'connect', 'message', 'profile', 'get in touch', 'write to'].some(k => text.toLowerCase().includes(k));

      // Save AI Message to PostgreSQL storage
      if (response.status === 'success') {
        const metadata = response.data.metadata;
        await postgresDatabase.saveMessage(sessionId, 'ai', pipelineResult, metadata.intent, metadata.confidence);
        if (metadata.options) {
          options = metadata.options;
        }
        if (metadata.intent === 'contact' || metadata.intent === 'linkedin') {
          isContact = true;
        }
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: pipelineResult,
        timestamp: new Date(),
        options: options,
        isContactCard: isContact || pipelineResult.includes('linkedin.com') || pipelineResult.includes('dileepgalla200056@gmail.com')
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error('Chat API Error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    const userQuery = inputValue.trim();
    setInputValue('');
    sendMessageToApi(userQuery);
  };

  const selectSuggestion = (text: string) => {
    setInputValue(text);
    // Submit message on next tick
    setTimeout(() => {
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: text,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMsg]);
      sendMessageToApi(text);
    }, 50);
  };

  const handleSelectOption = (messageId: string, option: string) => {
    // Hide other options immediately
    setMessages(prev => prev.map(m => {
      if (m.id === messageId) {
        return { ...m, options: [] };
      }
      return m;
    }));

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: option,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    sendMessageToApi(option);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-sans print:hidden">
      
      {/* Floating Action Circle Button with Idle Bounce/Breathe Animation */}
      <motion.button
        id="deepai-launch-btn"
        onClick={() => setIsOpen(!isOpen)}
        animate={!isOpen ? { y: [0, -3, 0] } : { y: 0 }}
        transition={!isOpen ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center cursor-pointer shadow-2xl relative transition-colors ${
          isTerminal
            ? 'bg-black border border-green-500 text-green-400 font-mono hover:bg-green-950/20'
            : isSynth
            ? 'bg-gradient-to-tr from-pink-500 to-indigo-600 text-white shadow-pink-500/20'
            : 'bg-indigo-600 text-white shadow-indigo-600/30'
        }`}
        style={{
          backgroundColor: !isTerminal && !isSynth && !isMinimal ? customOverlayColor : undefined,
          willChange: 'transform'
        }}
        aria-label="Toggle DeepAi Bot"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }}>
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
          ) : (
            <motion.div 
              key="spark" 
              className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center" 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {/* Outer pulsing ring */}
              <span className="absolute -inset-2 rounded-full bg-indigo-500/15 border border-indigo-500/20 animate-pulse" />
              
              {/* Swirling neural particle animation in the background */}
              <div className="absolute inset-0 opacity-80 pointer-events-none scale-110">
                <AnimatedChatIcon 
                  isAdvanced={isAdvanced} 
                  color={isTerminal ? '#22c55e' : '#ffffff'} 
                />
              </div>

              {/* Clearly visible central robot icon with floating animation */}
              <motion.img 
                src={robotIcon} 
                alt="AI Assistant"
                className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 select-none pointer-events-none object-contain"
                style={{
                  filter: isTerminal ? 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)' : undefined
                }}
                animate={{
                  y: [0, -2, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Windows Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="deepai-chat-window"
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`absolute bottom-16 right-0 w-[calc(100vw-2rem)] sm:w-[400px] max-w-[400px] h-[min(520px,78vh)] rounded-2xl shadow-3xl flex flex-col justify-between overflow-hidden border ${
              isTerminal
                ? 'bg-black border-green-500/40 text-green-400 font-mono'
                : isSynth
                ? 'bg-purple-950/95 border-pink-500/20 backdrop-blur-2xl text-slate-100 shadow-[0_0_50px_rgba(236,72,153,0.15)]'
                : 'bg-slate-950/95 border-slate-805 backdrop-blur-2xl text-slate-100 shadow-[0_0_50px_rgba(79,70,229,0.1)]'
            }`}
          >
            {/* Window Header */}
            <div className={`p-4 border-b flex items-center justify-between ${
              isTerminal 
                ? 'border-green-500/25 bg-green-950/10' 
                : isSynth
                ? 'border-pink-500/10 bg-gradient-to-r from-pink-500/10 to-indigo-500/10'
                : 'border-white/5 bg-white/5'
            }`}>
              <div className="flex items-center gap-2.5 text-left">
                <div className={`p-1 rounded-lg ${
                  isTerminal ? 'bg-green-950 text-green-400' : 'bg-indigo-600/20 text-indigo-400'
                }`}>
                  <DeepAiLogo size={20} className="animate-pulse" icon={activeIcon} />
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm tracking-wide text-slate-100">DeepAi Assistant</h3>
                </div>
              </div>

              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors hover:bg-white/5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Stream Container */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin text-left font-sans text-xs"
            >
              {messages.map((msg) => {
                const isAi = msg.sender === 'ai';
                return (
                  <div key={msg.id} className={`flex gap-2.5 max-w-[85%] ${isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}>
                    
                    {/* Circle user icon */}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border text-[10px] ${
                      isAi
                        ? isTerminal
                          ? 'border-green-500/30 text-green-400 bg-black'
                          : 'border-indigo-500/20 text-indigo-400 bg-indigo-950/40'
                        : isTerminal
                        ? 'border-green-500/30 text-green-400 bg-green-950/20'
                        : 'border-slate-800 text-slate-300 bg-slate-900'
                    }`}>
                      {isAi ? <DeepAiLogo size={16} icon={activeIcon} /> : <User className="w-3.5 h-3.5" />}
                    </div>

                    {/* Speech box bubble */}
                    <div className={`p-3 rounded-2xl ${
                      isAi
                        ? isTerminal
                          ? 'bg-black border border-green-500/15 text-green-300'
                          : 'bg-slate-900 border border-white/5 text-slate-200'
                        : isTerminal
                        ? 'bg-green-950/25 border border-green-500/30 text-green-300'
                        : isSynth
                        ? 'bg-pink-600 text-white'
                        : 'bg-indigo-650 text-white'
                    }`}
                    style={{
                      backgroundColor: !isAi ? (!isTerminal && !isSynth ? customOverlayColor : undefined) : undefined
                    }}
                    >
                      {isAi ? (
                        <FormattedAiMessage text={msg.text} isTerminal={isTerminal} isContactCard={msg.isContactCard} />
                      ) : (
                        <div className="whitespace-pre-wrap leading-relaxed text-[11.5px] font-sans">
                          {msg.text}
                        </div>
                      )}

                      {/* Rich Clickable Contact Card Box (Medium Sized with Landing Page Blue Aura) */}
                      {isAi && msg.isContactCard && (
                        <a
                          href="https://www.linkedin.com/in/galla-dileep-sai-b85829390/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2.5 block max-w-[240px] group rounded-2xl overflow-hidden border border-sky-500/30 bg-[#060a16] shadow-[0_10px_30px_-5px_rgba(2,132,199,0.35)] hover:border-sky-400 hover:shadow-[0_15px_35px_-5px_rgba(56,189,248,0.55)] transition-all duration-300 cursor-pointer text-left select-none relative"
                        >
                          {/* Dileep Full Photo with Hero-style Blue Aura Background */}
                          <div 
                            className="relative w-full h-40 overflow-hidden flex items-center justify-center p-1.5"
                            style={{
                              background: 'radial-gradient(circle at 50% 35%, #172554 0%, #0c142b 55%, #050814 100%)'
                            }}
                          >
                            {/* Shining Cyan/Sky Blue Ambient Glow */}
                            <div className="absolute w-28 h-28 rounded-full bg-sky-400/30 blur-2xl pointer-events-none" />

                            <img 
                              src={mainmeImg} 
                              alt="Galla Dileep sai" 
                              className="relative z-10 w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] group-hover:scale-[1.03] transition-transform duration-300" 
                            />
                          </div>

                          {/* LinkedIn Details Bar below photo */}
                          <div className="p-2.5 flex items-center justify-between gap-2 bg-[#080d1e] border-t border-sky-900/40">
                            <div className="flex items-center gap-2">
                              <img 
                                src={linkImg} 
                                alt="LinkedIn Logo" 
                                className="w-6 h-6 rounded-md object-contain shrink-0 shadow-md group-hover:scale-110 transition-transform" 
                              />
                              <div>
                                <div className="text-[11.5px] font-bold text-white group-hover:text-sky-300 transition-colors leading-tight">
                                  Galla Dileep sai
                                </div>
                                <span className="text-[9.5px] text-sky-200/60 block font-sans leading-tight">
                                  AI/ML Architect & Full Stack
                                </span>
                              </div>
                            </div>

                            <div className="p-1 rounded-lg bg-sky-500/20 text-sky-300 group-hover:bg-sky-400 group-hover:text-black transition-all shrink-0 shadow-[0_0_10px_rgba(56,189,248,0.3)]">
                              <ArrowRight className="w-3 h-3" />
                            </div>
                          </div>
                        </a>
                      )}

                      {isAi && msg.options && msg.options.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {msg.options.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => handleSelectOption(msg.id, opt)}
                              className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold border cursor-pointer transition-all ${
                                isTerminal
                                  ? 'border-green-500/40 bg-black text-green-400 hover:bg-green-500/10'
                                  : 'border-white/10 bg-slate-950 text-indigo-300 hover:bg-white/5 hover:border-slate-500'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      <span className="block text-[8px] text-slate-500 mt-1.5 text-right font-mono uppercase">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                  </div>
                );
              })}

              {/* Typing simulation indicator */}
              {isTyping && (
                <div className="flex gap-2.5 max-w-[80%] mr-auto">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center bg-slate-900 text-slate-400 text-xs border border-white/5 shrink-0">
                    <DeepAiLogo size={16} icon={activeIcon} />
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-white/5 rounded-2xl flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce delay-150" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce delay-300" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Suggested Prompt Badges (Direct click) */}
            <div className="px-4 py-2 border-t border-white/5 flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none scrollbar-none select-none">
              <button 
                onClick={() => selectSuggestion('What is NextTrip?')}
                className="px-2.5 py-1 text-[10px] font-semibold tracking-wide bg-slate-900 border border-white/5 hover:border-slate-500 rounded-full text-slate-350 cursor-pointer transition-colors shrink-0"
              >
                NextTrip AI
              </button>
              <button 
                onClick={() => selectSuggestion('Tell me about Ujjwal Hub')}
                className="px-2.5 py-1 text-[10px] font-semibold tracking-wide bg-slate-900 border border-white/5 hover:border-slate-500 rounded-full text-slate-350 cursor-pointer transition-colors shrink-0"
              >
                Ujjwal Hub
              </button>
              <button 
                onClick={() => selectSuggestion('List Dileep Sai\'s skills')}
                className="px-2.5 py-1 text-[10px] font-semibold tracking-wide bg-slate-900 border border-white/5 hover:border-slate-500 rounded-full text-slate-350 cursor-pointer transition-colors shrink-0"
              >
                Technical Skills
              </button>
              <button 
                onClick={() => selectSuggestion('How can I contact Dileep?')}
                className="px-2.5 py-1 text-[10px] font-semibold tracking-wide bg-slate-900 border border-white/5 hover:border-slate-500 rounded-full text-slate-350 cursor-pointer transition-colors shrink-0"
              >
                Contact
              </button>
            </div>

            {/* Text Input Panel */}
            <form 
              onSubmit={handleSendMessage}
              className={`p-3 border-t flex items-center gap-2 ${
                isTerminal ? 'border-green-500/25 bg-black' : 'border-white/5 bg-slate-950'
              }`}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isTerminal ? 'root@deepai:~$ ask_question' : 'Send a message...'}
                className={`flex-1 p-2 px-3 text-xs bg-slate-900 border text-white rounded-xl focus:outline-none transition-colors max-w-[80%] ${
                  isTerminal 
                    ? 'border-green-500/30 focus:border-green-400 font-mono text-green-300' 
                    : 'border-white/5 focus:border-slate-700'
                }`}
              />
              <button
                type="submit"
                className={`p-2 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  isTerminal
                    ? 'bg-transparent border border-green-500/30 text-green-400 hover:bg-green-500/10'
                    : isSynth
                    ? 'bg-pink-600 hover:bg-pink-500 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
                style={{
                  backgroundColor: !isTerminal && !isSynth && !isMinimal ? customOverlayColor : undefined
                }}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, FolderGit2, ArrowRight } from 'lucide-react';
import { ResumeData } from '../types';

interface TerminalViewProps {
  resumeData: ResumeData;
  customOverlayColor: string;
}

export default function TerminalView({ resumeData, customOverlayColor }: TerminalViewProps) {
  const [history, setHistory] = useState<string[]>([
    'Welcome to GALLA_OS (v1.7.0-TS-VITE)',
    'Type "help" to list available system telemetry controls.',
    'System status: ONLINE | Encryption: SHIELD-ACTIVE',
    'guest@dileepsai-galla.dev:~$ '
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history];
    // Remove the trailing prompt symbol from display if we want, or re-render
    newHistory[newHistory.length - 1] = `guest@dileepsai-galla.dev:~$ ${cmd}`;

    if (!trimmed) {
      newHistory.push('guest@dileepsai-galla.dev:~$ ');
      setHistory(newHistory);
      return;
    }

    switch (trimmed) {
      case 'help':
        newHistory.push(
          'Available System Commands:',
          '  help        - Display user-manual instruction protocols.',
          '  about       - Get profile executive summary.',
          '  skills      - Dump categorized AI/ML & Core engineering skillsets.',
          '  projects    - Output featured R&D initiatives (NextTrip, Ujjwal-Hub).',
          '  experience  - Generate vertical timeline of active employment.',
          '  education   - Detail Chennai/VIT university credentials.',
          '  patent      - Display USPTO/GCP patent allocation application logs.',
          '  contact     - Reveal SMTP email channels & active links.',
          '  clear       - Wipe the CRT phosphor screen clean.',
          ''
        );
        break;

      case 'about':
        newHistory.push(
          'PROFILE TELEMETRY SUMMARY:',
          `  Name:        ${resumeData.name}`,
          `  Role:        ${resumeData.title}`,
          `  HQ Location: Chennai / Rohini (Delhi), India`,
          `  Summary:     ${resumeData.shortSummary}`,
          ''
        );
        break;

      case 'skills':
        newHistory.push('INSPECTING RESUME SKILL MATRIX...');
        resumeData.skills.forEach(cat => {
          newHistory.push(`  [${cat.category.toUpperCase()}]`);
          newHistory.push(`    - ${cat.items.join(', ')}`);
        });
        newHistory.push('');
        break;

      case 'projects':
        newHistory.push('INSPECTING COMPILING GIT REPOS...');
        resumeData.projects.forEach(p => {
          newHistory.push(
            `  > PROJECT: ${p.title.toUpperCase()} (${p.subtitle})`,
            `    Duration:     ${p.duration}`,
            `    AI Pipeline:  ${p.architecture}`,
            `    Tech Stack:   ${p.stack.join(', ')}`,
            `    Bullets:`
          );
          p.bullets.forEach(b => newHistory.push(`      * ${b}`));
          newHistory.push('');
        });
        break;

      case 'experience':
        newHistory.push('INSPECTING EMPLOYMENT MATRIX TELEMETRY...');
        resumeData.experience.forEach(exp => {
          newHistory.push(
            `  [${exp.duration}] ${exp.role} @ ${exp.company} (${exp.location})`,
            `    Duties:`
          );
          exp.bullets.forEach(b => newHistory.push(`      - ${b}`));
          newHistory.push('');
        });
        break;

      case 'education':
        newHistory.push('SCHOOL CREDENTIAL DATABASE:');
        resumeData.education.forEach(edu => {
          newHistory.push(
            `  - ${edu.degree} from ${edu.institution}`,
            `    Period:   ${edu.duration}`,
            `    Grades:   ${edu.cgpa ? `CGPA ${edu.cgpa}` : `Percentage ${edu.percentage}`}`
          );
        });
        newHistory.push('');
        break;

      case 'patent':
        newHistory.push(
          'RETRIEVING PATENT DATA FROM INTELLECTUAL PROPERTY PIPELINE...',
          '  Title:       System and Method for Optimizing Garbage Collection Operations',
          '  App Number:  202641010900 (Utility Patent filed under VIT)',
          '  Status:      OFFICIALLY RECORDED / IN REVIEW-STAGE',
          '  Utility:     Combines IoT bin telemetry thresholds with dynamic heuristics',
          '               recomputations using modified TSP and KMeans, reducing cumulative',
          '               navigation distance metrics by 35% under sub-200ms latency cycles.',
          ''
        );
        break;

      case 'contact':
        newHistory.push(
          'INITIATING SECURE TCP SOCKET...',
          `  Email:     ${resumeData.email}`
        );
        if (resumeData.phone && resumeData.phone.trim()) {
          newHistory.push(`  Phone:     ${resumeData.phone}`);
        }
        newHistory.push(
          `  GitHub:    ${resumeData.github}`,
          `  LinkedIn:  ${resumeData.linkedin}`,
          '  Feel free to shoot an email or submit a contact request.',
          ''
        );
        break;

      case 'clear':
        setHistory(['guest@dileepsai-galla.dev:~$ ']);
        setInputVal('');
        return;

      default:
        newHistory.push(
          `  GALLA_OS: Bash error: command not found: "${cmd}".`,
          '  Type "help" to list available telemetry logs.',
          ''
        );
    }

    newHistory.push('guest@dileepsai-galla.dev:~$ ');
    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  return (
    <div 
      onClick={handleTerminalClick}
      className="p-5 font-mono text-[12.5px] bg-black/95 text-green-400 border border-green-500/30 rounded-xl shadow-2xl relative overflow-hidden h-[450px] flex flex-col cursor-text select-text"
    >
      {/* Visual CRT Glass Screen Curve Line */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/1 to-transparent mix-blend-overlay" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_60%,rgba(0,0,0,0.45)_100%)]" />

      {/* Top Console Bar */}
      <div className="flex items-center justify-between border-b border-green-500/20 pb-2 mb-3 bg-black/40 -mx-5 -mt-5 p-3 px-5">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-green-400 animate-pulse" />
          <span className="font-bold tracking-tight text-green-300">GALLA_AI_SYSTEMS_CORE [INTELLIGENT SHELL]</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-green-400" />
            <span className="text-[10px] text-green-500">SECURE SHELL</span>
          </div>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
        </div>
      </div>

      {/* Terminal Lines Output */}
      <div className="flex-1 overflow-y-auto space-y-1 mb-2 scrollbar-thin scrollbar-thumb-green-500/20 pr-1.5 lg:pr-3">
        {history.map((line, idx) => (
          <div 
            key={idx} 
            className={`whitespace-pre-wrap ${
              line.startsWith('guest@') 
                ? 'text-green-300' 
                : line.includes('error') 
                ? 'text-red-400' 
                : line.startsWith('PROFILE') || line.startsWith('SCHOOL') || line.startsWith('INSPECTING') || line.includes('PROJECT')
                ? 'text-yellow-400 font-bold'
                : 'text-green-400/90'
            }`}
          >
            {line}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Prompt inputs */}
      <div className="flex items-center gap-1.5 border-t border-green-500/10 pt-2 bg-black/40">
        <span className="text-yellow-400 shrink-0">guest@dileepsai-galla.dev:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-green-300 border-none outline-none focus:ring-0 p-0 font-mono text-[12.5px] caret-green-400"
          autoFocus
          spellCheck="false"
          placeholder="type help..."
        />
        <span className="w-2 h-4.5 bg-green-400 animate-blink shrink-0" />
      </div>
    </div>
  );
}

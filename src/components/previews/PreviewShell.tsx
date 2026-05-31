import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface PreviewShellProps {
  children: React.ReactNode;
  accentColor?: string;
  label?: string;
  className?: string;
}

export default function PreviewShell({ children, accentColor = '#38BDF8', label = 'LIVE PREVIEW', className = '' }: PreviewShellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: tilt.y, rotateY: tilt.x }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{ perspective: 800, transformStyle: 'preserve-3d' }}
      className={`relative w-full h-full min-h-[240px] ${className}`}
    >
      {/* Animated glow background pulse */}
      <div
        className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl animate-pulse pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${accentColor}60, transparent 70%)` }}
      />

      {/* Outer animated gradient border */}
      <div
        className="absolute -inset-[1.5px] rounded-2xl pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${accentColor}50, transparent 50%, ${accentColor}30)`,
          animation: 'spin 8s linear infinite',
        }}
      />

      {/* Main frame */}
      <div className="relative w-full h-full rounded-2xl bg-slate-950/95 border border-slate-800/60 overflow-hidden flex flex-col backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
        
        {/* Browser chrome bar */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-800/80 bg-slate-900/80 shrink-0">
          <span className="w-2 h-2 rounded-full bg-rose-500/80" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
          <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
          <div className="flex-1 mx-2 h-4 bg-slate-800/60 rounded-full flex items-center justify-center">
            <span className="text-[8px] text-slate-500 font-mono tracking-widest uppercase">{label}</span>
          </div>
          <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: accentColor }} />
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-hidden relative">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

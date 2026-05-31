import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Cpu, Bell, Layers, AlertTriangle, CheckCircle2, Compass } from 'lucide-react';

type SimulationStep = 'idle' | 'scanning' | 'routing' | 'truck-moving' | 'unloading' | 'complete';

interface Bin {
  idx: number;
  id: string;
  name: string;
  location: string;
  color: 'green' | 'orange' | 'red';
  originalStatus: 'Full' | 'Off';
  x: number;
  y: number;
}

const BINS_DATA: Bin[] = [
  { idx: 0, id: "Bin 1", name: "Secunderabad, Bin 1", location: "Secunderabad, Phase 2, Main Rd", color: 'orange', originalStatus: 'Full', x: 100, y: 100 },
  { idx: 1, id: "Bin 2", name: "Gachibowli, Bin 2", location: "Gachibowli Tech Park, Phase 1", color: 'red', originalStatus: 'Full', x: 220, y: 80 },
  { idx: 2, id: "Bin 3", name: "Begumpet, Bin 3", location: "Begumpet Airport Area, Lane 4", color: 'red', originalStatus: 'Full', x: 280, y: 180 },
  { idx: 3, id: "Bin 4", name: "Jubilee Hills, Bin 4", location: "Jubilee Hills, Phase 3, Rd 5", color: 'green', originalStatus: 'Off', x: 150, y: 140 },
  { idx: 4, id: "Bin 5", name: "Charminar, Bin 5", location: "Charminar Market Square", color: 'green', originalStatus: 'Off', x: 120, y: 50 },
  { idx: 5, id: "Bin 6", name: "Banjara Hills, Bin 6", location: "Banjara Hills, Rd 12, Opp Mall", color: 'green', originalStatus: 'Off', x: 300, y: 120 }
];

const ROUTE_POINTS = [
  { x: 50, y: 150 },   // Start Hub
  { x: 100, y: 100 },  // Bin 1
  { x: 150, y: 110 },  // transit
  { x: 220, y: 80 },   // Bin 2
  { x: 240, y: 130 },  // transit
  { x: 280, y: 180 },  // Bin 3
  { x: 330, y: 150 },  // transit
  { x: 340, y: 90 }    // Dump Yard
];

export default function UjjwalHubPreview() {
  const [isAiEnabled, setIsAiEnabled] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // 0 to 18000 ms
  const [notification, setNotification] = useState<string | null>(null);

  // Auto-play trigger
  useEffect(() => {
    if (!isAiEnabled && elapsedTime === 0) {
      const autoPlayTimer = setTimeout(() => {
        setIsAiEnabled(true);
      }, 4500);
      return () => clearTimeout(autoPlayTimer);
    }
  }, [isAiEnabled, elapsedTime]);

  // Main simulation timer tick (50ms interval)
  useEffect(() => {
    if (!isAiEnabled) {
      setElapsedTime(0);
      setNotification(null);
      return;
    }

    const interval = setInterval(() => {
      setElapsedTime(prev => {
        const next = prev + 50;
        if (next >= 18000) {
          setIsAiEnabled(false);
          return 0;
        }
        
        // Show complete notification at ~14.8s
        if (prev < 14800 && next >= 14800) {
          setNotification('Ujjwal Route Optimization Complete');
        }
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isAiEnabled]);

  // Determine current simulation step
  let simulationStep: SimulationStep = 'idle';
  if (isAiEnabled) {
    if (elapsedTime < 1800) simulationStep = 'scanning';
    else if (elapsedTime < 3200) simulationStep = 'routing';
    else if (elapsedTime < 12200) simulationStep = 'truck-moving';
    else if (elapsedTime < 14800) simulationStep = 'unloading';
    else simulationStep = 'complete';
  }

  // Calculate truck coordinates and 3D angle
  let truckX = 50;
  let truckY = 150;
  let truckAngle = 0;

  if (simulationStep === 'truck-moving') {
    const truckElapsed = elapsedTime - 3200; // 0 to 9000 ms
    const totalDuration = 9000;
    const numSegments = ROUTE_POINTS.length - 1;
    const timePerSegment = totalDuration / numSegments; // 1285.7 ms
    
    const segmentIndex = Math.min(
      Math.floor(truckElapsed / timePerSegment),
      numSegments - 1
    );
    const segmentFraction = (truckElapsed % timePerSegment) / timePerSegment;
    
    const p1 = ROUTE_POINTS[segmentIndex];
    const p2 = ROUTE_POINTS[segmentIndex + 1];
    
    truckX = p1.x + (p2.x - p1.x) * segmentFraction;
    truckY = p1.y + (p2.y - p1.y) * segmentFraction;
    
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    truckAngle = Math.atan2(dy, dx) * 180 / Math.PI;
  } else if (simulationStep === 'unloading' || simulationStep === 'complete') {
    truckX = 340;
    truckY = 90;
    truckAngle = 0;
  }

  // Determine collected bins based on timing thresholds
  const collectedBins: number[] = [];
  if (isAiEnabled) {
    if (elapsedTime >= 4500) collectedBins.push(0); // Bin 1 collected
    if (elapsedTime >= 7100) collectedBins.push(1); // Bin 2 collected
    if (elapsedTime >= 9600) collectedBins.push(2); // Bin 3 collected
  }

  // Calculate Speed, Distance, Time, and Progress details
  let speed = 0;
  let distance = 0;
  let time = 0;
  let progress = 0;

  if (simulationStep === 'truck-moving') {
    const truckElapsed = elapsedTime - 3200;
    const t = truckElapsed / 9000;
    
    // Smooth distance and time accumulation
    distance = parseFloat((t * 12.8).toFixed(1));
    time = Math.floor(t * 40); // 40 minutes target
    progress = Math.floor(t * 97);

    // Speed calculation - accelerates, slows down near nodes/bins, and decelerates at the yard
    if (t < 0.1) {
      speed = Math.floor(t * 10 * 48); // accelerate up to 48
    } else if (t > 0.9) {
      speed = Math.floor((1 - t) * 10 * 48); // decelerate down to 0
    } else {
      // slow down near orange/red bins at ~0.14, ~0.43, ~0.71 of the timeline
      const binStops = [0.142, 0.428, 0.714];
      let minDelta = 1.0;
      binStops.forEach(bs => {
        const d = Math.abs(t - bs);
        if (d < minDelta) minDelta = d;
      });

      if (minDelta < 0.08) {
        const factor = minDelta / 0.08;
        speed = Math.floor(12 + (48 - 12) * factor); // slow down to 12 km/h
      } else {
        speed = Math.floor(45 + Math.sin(t * 40) * 6); // normal cruising speed 39-51 km/h
      }
    }
  } else if (simulationStep === 'unloading' || simulationStep === 'complete') {
    speed = 0;
    distance = 12.8;
    time = 40;
    progress = 97;
  }

  // Calculate dynamic tasks and completed counts for the top cards
  let tasksCount = 97;
  let completedCount = 0;
  
  if (isAiEnabled) {
    if (simulationStep === 'truck-moving') {
      const truckElapsed = elapsedTime - 3200;
      tasksCount = Math.max(0, 97 - Math.floor((truckElapsed / 9000) * 97));
      completedCount = Math.min(97, Math.floor((truckElapsed / 9000) * 97));
    } else if (simulationStep === 'unloading' || simulationStep === 'complete') {
      tasksCount = 0;
      completedCount = 97;
    }
  }

  // Filters bins based on the current Ujjwal Route AI state
  // Green empty bins disappear if AI/Ujjwal is enabled
  const activeBins = BINS_DATA.filter(bin => {
    if (isAiEnabled && bin.originalStatus === 'Off') {
      return false; // hide green bins
    }
    return true;
  });

  // Segregate active tasks (pending) and completed ones
  const pendingBins = activeBins.filter(b => !collectedBins.includes(b.idx));
  const completedBinsList = activeBins.filter(b => collectedBins.includes(b.idx));

  return (
    <div 
      className="relative w-full h-full flex flex-col font-sans select-none overflow-y-auto max-h-[500px] no-scrollbar"
      style={{ background: 'linear-gradient(180deg, #020617 0%, #090d16 100%)' }}
    >
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b98108_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* ── TOP HEADER NAVBAR ── */}
      <div className="flex items-center justify-between border-b border-emerald-500/10 px-3 py-2 bg-slate-955/85 backdrop-blur-md shrink-0 relative z-25">
        <div className="flex items-center gap-1.5">
          <div className="p-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Trash2 className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <div>
            <span className="text-white font-extrabold text-xs tracking-tight">UjjwalHub</span>
            <span className="text-emerald-500/80 text-[7px] font-mono tracking-widest block leading-none">CITY LOGISTICS</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Location Badge */}
          <span className="text-[7.5px] bg-slate-900 border border-slate-800 text-slate-350 px-2 py-0.5 rounded-full font-mono">
            📍 Hyderabad, IN
          </span>

          {/* AI Mode indicator */}
          <span className={`text-[7.5px] font-mono border px-2 py-0.5 rounded-full flex items-center gap-1 transition-all ${
            isAiEnabled 
              ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_10px_#22d3ee20]' 
              : 'bg-slate-900 text-slate-500 border-slate-800'
          }`}>
            <Cpu className={`w-2.5 h-2.5 ${isAiEnabled ? 'animate-spin' : ''}`} />
            {simulationStep === 'idle' && 'AI IDLE'}
            {simulationStep === 'scanning' && 'AI SCANNING'}
            {simulationStep === 'routing' && 'AI ROUTING'}
            {simulationStep === 'truck-moving' && 'MOVING'}
            {simulationStep === 'unloading' && 'UNLOADING'}
            {simulationStep === 'complete' && 'OPTIMIZED'}
          </span>

          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
        </div>
      </div>

      {/* ── THREE CARDS ON TOP OF THE MAP ── */}
      <div className="grid grid-cols-3 gap-2 px-3 pt-2 pb-1 bg-slate-950/20 shrink-0 z-20 relative">
        {/* Card 1: Hubs */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-xl p-1.5 flex flex-col justify-between overflow-hidden shadow-lg text-left">
          <div className="flex justify-between items-center text-slate-500 text-[6.5px] font-mono uppercase tracking-wider">
            <span>Total Hubs</span>
            <Layers className="w-2 h-2 text-slate-500" />
          </div>
          <div className="flex items-baseline justify-between mt-0.5">
            <span className="text-white font-extrabold text-[10px]">140</span>
            <span className="text-emerald-400 text-[5.5px] font-mono bg-emerald-500/10 border border-emerald-500/20 px-1 rounded leading-none">ACTIVE</span>
          </div>
        </div>

        {/* Card 2: Tasks */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-xl p-1.5 flex flex-col justify-between overflow-hidden shadow-lg text-left">
          <div className="flex justify-between items-center text-slate-500 text-[6.5px] font-mono uppercase tracking-wider">
            <span>Tasks</span>
            <AlertTriangle className="w-2 h-2 text-rose-500" />
          </div>
          <div className="flex items-baseline justify-between mt-0.5">
            <span className="text-white font-extrabold text-[10px]">{tasksCount}</span>
            <span className="text-rose-400 text-[5.5px] font-mono font-bold">REMAINING</span>
          </div>
        </div>

        {/* Card 3: Completed */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-xl p-1.5 flex flex-col justify-between overflow-hidden shadow-lg text-left">
          <div className="flex justify-between items-center text-slate-500 text-[6.5px] font-mono uppercase tracking-wider">
            <span>Completed</span>
            <CheckCircle2 className="w-2 h-2 text-cyan-400" />
          </div>
          <div className="flex items-baseline justify-between mt-0.5">
            <span className="text-cyan-400 font-extrabold text-[10px]">{completedCount}</span>
            <span className="text-[5.5px] text-slate-500 font-mono">/97 GOAL</span>
          </div>
        </div>
      </div>

      {/* ── MAP CONTAINER ── */}
      <div className="relative w-full h-[180px] bg-slate-950/40 border-b border-slate-900 overflow-hidden flex flex-col shrink-0">
        
        {/* Notification slides in */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ y: -30, opacity: 0, x: '-50%' }}
              animate={{ y: 0, opacity: 1, x: '-50%' }}
              exit={{ y: -30, opacity: 0, x: '-50%' }}
              className="absolute top-2.5 left-1/2 bg-slate-900 border border-emerald-500/30 backdrop-blur-md px-3 py-1 rounded-lg shadow-xl flex items-center gap-1.5 z-35 whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-white font-extrabold text-[8px] uppercase tracking-wide">{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI route controller widget */}
        <div className="absolute top-2 right-2 z-25 bg-slate-900/95 border border-slate-800/80 p-2 rounded-lg backdrop-blur-md flex flex-col gap-1 text-[7.5px] w-[130px] shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1">
            <span className="text-slate-200 font-bold uppercase tracking-wider">Ujjwal Route Opt.</span>
            <span className={`w-1.5 h-1.5 rounded-full ${isAiEnabled ? 'bg-cyan-400 animate-pulse' : 'bg-slate-700'}`} />
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-slate-500 font-mono">STATUS: {isAiEnabled ? 'ACTIVE' : 'OFF'}</span>
            <button 
              onClick={() => setIsAiEnabled(!isAiEnabled)}
              className={`w-7 h-4 rounded-full p-[2px] transition-all duration-300 relative flex items-center ${
                isAiEnabled ? 'bg-cyan-500 shadow-[0_0_8px_#06b6d480]' : 'bg-slate-800'
              }`}
            >
              <motion.div 
                layout
                className="w-2.5 h-2.5 bg-white rounded-full shadow"
                animate={{ x: isAiEnabled ? 12 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </button>
          </div>
        </div>

        {/* Realistic Interactive SVG Map */}
        <div className="flex-1 w-full h-full relative z-10">
          <svg viewBox="0 0 400 180" className="w-full h-full select-none">
            <defs>
              <filter id="glow-neon-blue" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-red-node" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* City Grid Line Overlay */}
            <g className="stroke-slate-900/30" strokeWidth="0.5">
              {Array.from({ length: 11 }).map((_, i) => (
                <line key={`x-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="180" />
              ))}
              {Array.from({ length: 5 }).map((_, i) => (
                <line key={`y-${i}`} x1="0" y1={i * 40} x2="400" y2={i * 40} />
              ))}
            </g>

            {/* Road Networks */}
            <g className="stroke-slate-800/15 fill-none" strokeWidth="1">
              <path d="M 10 150 L 390 150" />
              <path d="M 100 10 L 100 170" />
              <path d="M 220 10 L 220 170" />
              <path d="M 320 10 L 320 170" />
              <path d="M 10 50 L 390 50" />
              <path d="M 120 50 L 150 140 L 280 175" />
              <path d="M 50 150 L 100 100 L 150 110 L 220 80 L 240 130 L 280 180 L 330 150 L 340 90" strokeWidth="2.5" className="stroke-slate-900/60" />
            </g>

            {/* AI Neon Route Path */}
            {isAiEnabled && (simulationStep === 'routing' || simulationStep === 'truck-moving' || simulationStep === 'unloading' || simulationStep === 'complete') && (
              <motion.path 
                d="M 50 150 L 100 100 L 150 110 L 220 80 L 240 130 L 280 180 L 330 150 L 340 90" 
                fill="none" 
                stroke="#22d3ee" 
                strokeWidth="3.5"
                filter="url(#glow-neon-blue)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            )}

            {/* District labels */}
            <g className="fill-slate-600/60 text-[5.5px] font-mono font-bold">
              <text x="35" y="162">HITECH Hub</text>
              <text x="75" y="93">Gachibowli</text>
              <text x="160" y="128">Banjara</text>
              <text x="210" y="65">Begumpet</text>
              <text x="325" y="73">Secunderabad</text>
            </g>

            {/* 1. Start Hub */}
            <g>
              <circle cx="50" cy="150" r="6" className="fill-cyan-400" />
              <circle cx="50" cy="150" r="12" className="stroke-cyan-500 fill-none stroke-[0.8] animate-ping" />
            </g>

            {/* 2. Green bins (disappear if Ujjwal route is on) */}
            {!isAiEnabled && (
              <g className="transition-all duration-500">
                {/* Bin 4 */}
                <circle cx="150" cy="140" r="5" className="fill-emerald-500" />
                <circle cx="150" cy="140" r="9" className="stroke-emerald-500 fill-none stroke-[0.6] animate-pulse" />
                {/* Bin 5 */}
                <circle cx="120" cy="50" r="5" className="fill-emerald-500" />
                <circle cx="120" cy="50" r="9" className="stroke-emerald-500 fill-none stroke-[0.6] animate-pulse" />
                {/* Bin 6 */}
                <circle cx="300" cy="120" r="5" className="fill-emerald-500" />
                <circle cx="300" cy="120" r="9" className="stroke-emerald-500 fill-none stroke-[0.6] animate-pulse" />
              </g>
            )}

            {/* 3. Orange / Red Bins (Approaching turns them blue) */}
            {BINS_DATA.slice(0, 3).map(bin => {
              const isCollected = collectedBins.includes(bin.idx);
              const binColor = isCollected ? '#22d3ee' : bin.color === 'red' ? '#ef4444' : '#f59e0b';
              const strokeColor = isCollected ? 'stroke-cyan-400' : bin.color === 'red' ? 'stroke-red-500' : 'stroke-amber-500';
              
              return (
                <g key={bin.id}>
                  <motion.circle 
                    cx={bin.x} 
                    cy={bin.y} 
                    r={isCollected ? 6.5 : 7}
                    fill={binColor}
                    animate={{
                      scale: isCollected ? [1, 1.25, 1] : 1
                    }}
                    transition={{ duration: 0.5 }}
                    filter={isCollected ? 'url(#glow-neon-blue)' : ''}
                  />
                  {!isCollected && (
                    <circle 
                      cx={bin.x} 
                      cy={bin.y} 
                      r="12" 
                      className={`fill-none stroke-[0.8] animate-ping ${strokeColor}`} 
                      style={{ animationDuration: '2s' }} 
                    />
                  )}
                </g>
              );
            })}

            {/* 4. Dump Yard Destination */}
            <g>
              <motion.rect 
                x="328" 
                y="78" 
                width="22" 
                height="22" 
                rx="3.5" 
                animate={{
                  fill: simulationStep === 'unloading' ? '#22d3ee' : '#1e293b',
                  stroke: simulationStep === 'unloading' ? '#67e8f9' : '#475569',
                }}
                className="stroke-[1.5]"
              />
            </g>

            {/* 5. 3D-Realistic Safety Waste Truck */}
            {(simulationStep === 'truck-moving' || simulationStep === 'unloading' || simulationStep === 'complete') && (
              <g transform={`translate(${truckX}, ${truckY}) rotate(${truckAngle})`}>
                {/* 3D Drop Shadow offset */}
                <rect x="-18" y="-6" width="28" height="12" rx="1.5" fill="black" opacity="0.35" transform="translate(-1, 2)" />
                
                {/* 3D Side Container Shadow Panel */}
                <rect x="-18" y="0" width="28" height="5" fill="#cbd5e1" rx="0.5" />
                
                {/* Highly Visible Silver Container (top panel) */}
                <rect x="-18" y="-7" width="18" height="11" rx="1" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.4" />
                
                {/* Neon green dynamic strip */}
                <rect x="-14" y="-3" width="10" height="2" rx="0.5" fill="#10b981" className="animate-pulse" />
                
                {/* Safety Orange Cabin Block */}
                <rect x="0" y="-6" width="10" height="9" rx="1" fill="#f97316" stroke="#ea580c" strokeWidth="0.4" />
                
                {/* Cabin Side Panel (creating 3D depth) */}
                <rect x="0" y="-1" width="10" height="3" fill="#d97706" rx="0.5" />

                {/* Windshield glass */}
                <rect x="7" y="-5" width="2.5" height="6.5" fill="#e0f2fe" />
                
                {/* Wheels */}
                <circle cx="-13" cy="5" r="3" fill="#0f172a" />
                <circle cx="-3" cy="5" r="3" fill="#0f172a" />
              </g>
            )}
          </svg>
        </div>

        {/* Small Compass Icon at Left Side Bottom */}
        {isAiEnabled && (
          <div className="absolute bottom-2 left-2 z-25 bg-slate-900/90 border border-slate-800/80 p-1.5 rounded-xl backdrop-blur-md flex items-center gap-1.5 shadow-lg">
            <div className="relative w-7 h-7 flex items-center justify-center bg-slate-950 rounded-full border border-slate-800">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#334155" strokeWidth="4" />
                <text x="50" y="24" textAnchor="middle" fontSize="16" fill="#94a3b8" fontWeight="bold">N</text>
                <g transform={`rotate(${truckAngle}, 50, 50)`}>
                  <polygon points="50,18 43,50 50,45" fill="#ef4444" />
                  <polygon points="50,82 57,50 50,55" fill="#64748b" />
                  <circle cx="50" cy="50" r="6" fill="#22d3ee" />
                </g>
              </svg>
            </div>
            <div className="flex flex-col text-left font-mono text-[7px] leading-tight">
              <span className="text-slate-550 font-bold uppercase">Heading</span>
              <span className="text-cyan-400 font-black">{Math.floor(truckAngle)}°</span>
            </div>
          </div>
        )}
      </div>

      {/* ── SPEEDOMETER & TRAVEL STATS ── */}
      {isAiEnabled && (
        <div className="bg-slate-955/60 border-b border-slate-900 p-2.5 grid grid-cols-4 gap-3 items-center shrink-0">
          {/* Speedometer Gauge */}
          <div className="col-span-1 flex items-center justify-center">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#0f172a" strokeWidth="10" strokeDasharray="188 251" />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke={speed > 42 ? '#ea580c' : '#10b981'} 
                  strokeWidth="10" 
                  strokeDasharray={`${(speed / 60) * 188} 251`} 
                  className="transition-all duration-200"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                <span className="text-[11px] font-black text-white">{speed}</span>
                <span className="text-[4.5px] text-slate-550 font-mono tracking-wider">KM/H</span>
              </div>
            </div>
          </div>

          {/* Speedy telemetry parameters */}
          <div className="col-span-3 grid grid-cols-2 gap-2 text-left font-mono text-[8px]">
            <div className="p-1.5 bg-slate-900/60 border border-slate-850 rounded-lg">
              <span className="text-slate-550 block text-[6px] uppercase font-bold tracking-wider">Distance</span>
              <span className="text-white font-extrabold block mt-0.5">{distance} km</span>
            </div>
            <div className="p-1.5 bg-slate-900/60 border border-slate-850 rounded-lg">
              <span className="text-slate-550 block text-[6px] uppercase font-bold tracking-wider">Time</span>
              <span className="text-white font-extrabold block mt-0.5">{time} min</span>
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN TASK PROGRESS BAR ── */}
      {isAiEnabled && (
        <div className="px-3 py-2 bg-slate-950/20 shrink-0">
          <div className="relative w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div 
              className="absolute top-0 left-0 h-full transition-all duration-300"
              style={{
                width: `${(progress / 97) * 100}%`,
                backgroundColor: progress >= 97 ? '#3b82f6' : '#10b981' // turns blue when task is completed
              }}
            />
          </div>
        </div>
      )}

      {/* ── BINS PROGRESS LIST board ── */}
      <div className="p-3 bg-slate-950/90 border-t border-slate-900 flex-1 overflow-y-auto min-h-[140px] text-left no-scrollbar">
        
        {/* Pending Operations Section */}
        {pendingBins.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[7.5px] font-bold text-slate-500 uppercase tracking-widest font-mono">Pending Targets</span>
              <span className="text-[7px] text-slate-600 font-mono">Count: {pendingBins.length}</span>
            </div>
            <div className="space-y-1">
              {pendingBins.map((bin) => (
                <div 
                  key={bin.id}
                  className={`flex items-center justify-between p-2 rounded-lg border border-slate-900 bg-slate-950 text-[10px] font-mono transition-all`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${bin.color === 'red' ? 'bg-red-500 animate-pulse' : bin.color === 'orange' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                    <div>
                      <span className="font-bold text-[8.5px] block text-white">{bin.name}</span>
                      <span className="text-[7px] text-slate-550 block leading-none">{bin.id}</span>
                    </div>
                  </div>
                  <span className="text-[7px] text-slate-400 hidden sm:block truncate max-w-[140px]">{bin.location}</span>
                  <span className={`text-[7.5px] font-extrabold uppercase ${bin.color === 'red' ? 'text-red-400' : bin.color === 'orange' ? 'text-amber-400' : 'text-slate-500'}`}>
                    [{bin.originalStatus}]
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Operations Section */}
        {completedBinsList.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[7.5px] font-bold text-blue-500 uppercase tracking-widest font-mono">Completed Handshakes</span>
              <span className="text-[7px] text-blue-500/80 font-mono">Count: {completedBinsList.length}</span>
            </div>
            <div className="space-y-1">
              {completedBinsList.map((bin) => (
                <div 
                  key={bin.id}
                  className="flex items-center justify-between p-2 rounded-lg border border-blue-500/20 bg-blue-950/10 text-[10px] font-mono text-blue-400"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    <div>
                      <span className="font-bold text-[8.5px] block text-blue-300">{bin.name}</span>
                      <span className="text-[7px] text-blue-500/60 block leading-none">{bin.id}</span>
                    </div>
                  </div>
                  <span className="text-[7px] text-blue-500/60 hidden sm:block truncate max-w-[140px]">{bin.location}</span>
                  <span className="text-[7.5px] font-extrabold uppercase text-blue-400">
                    [Completed]
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── FOOTER STATS ── */}
      <div className="border-t border-slate-900 px-3 py-2 bg-slate-950/80 font-mono text-[7px] text-slate-550 flex items-center justify-between shrink-0 relative z-20">
        <span>Powered by Ujjwal AI Heuristics</span>
        <div className="flex gap-2">
          <span>GPS: L1 LOCK</span>
          <span className="text-cyan-400">LATENCY: 1.1ms</span>
        </div>
      </div>
    </div>
  );
}

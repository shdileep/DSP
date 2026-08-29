import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trash2, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  Compass, 
  Gauge, 
  Truck, 
  Clock, 
  MapPin, 
  X, 
  Route, 
  RefreshCw, 
  Activity, 
  ShieldAlert,
  ArrowRight,
  Flame,
  BatteryCharging
} from 'lucide-react';
import { BinItem, TruckItem } from './types';
import { INITIAL_BINS, ROUTE_WAYPOINTS, INITIAL_TRUCKS } from './mockData';

interface BinsMonitoringViewProps {
  onDispatchTask?: (bin: BinItem) => void;
}

export default function BinsMonitoringView({ onDispatchTask }: BinsMonitoringViewProps) {
  // Smart Route Optimization Toggle state (Active by default for automated telemetry)
  const [isSmartRouteEnabled, setIsSmartRouteEnabled] = useState<boolean>(true);
  const [elapsedTime, setElapsedTime] = useState<number>(0); // 0 to 18000ms loop
  const [selectedBin, setSelectedBin] = useState<BinItem | null>(null);
  const [showTruckModal, setShowTruckModal] = useState<boolean>(false);
  const [bins, setBins] = useState<BinItem[]>(INITIAL_BINS);
  const [notification, setNotification] = useState<string | null>(null);

  // Simulation step calculation
  // idle -> scanning -> routing -> truck-moving -> unloading -> complete
  type SimStep = 'idle' | 'scanning' | 'routing' | 'truck-moving' | 'unloading' | 'complete';
  let simStep: SimStep = 'idle';

  if (isSmartRouteEnabled) {
    if (elapsedTime < 1500) simStep = 'scanning';
    else if (elapsedTime < 2800) simStep = 'routing';
    else if (elapsedTime < 13500) simStep = 'truck-moving';
    else if (elapsedTime < 16500) simStep = 'unloading';
    else simStep = 'complete';
  }

  // Timer loop for truck movement & automated collection
  useEffect(() => {
    if (!isSmartRouteEnabled) {
      setElapsedTime(0);
      setNotification(null);
      return;
    }

    const interval = setInterval(() => {
      setElapsedTime(prev => {
        const next = prev + 50;
        if (next >= 18000) {
          // Loop seamlessly
          return 0;
        }

        // Notification triggers
        if (prev < 2800 && next >= 2800) {
          setNotification('Smart Route Activated — Optimal Path Locked');
        }
        if (prev < 14000 && next >= 14000) {
          setNotification('All Target Bins Collected — Reaching Dump Yard');
        }
        if (prev < 16500 && next >= 16500) {
          setNotification('Unloading Complete — Ready for Next Shift');
        }

        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isSmartRouteEnabled]);

  // Route waypoints
  const waypoints = ROUTE_WAYPOINTS;
  const numSegments = waypoints.length - 1;
  const moveDuration = 10700; // 2800 to 13500ms
  const timePerSegment = moveDuration / numSegments; // ~1070ms per segment

  // Calculate live truck coordinates and heading angle
  let truckX = 40;
  let truckY = 110;
  let truckAngle = 0;
  let currentSegmentIndex = 0;

  if (simStep === 'truck-moving') {
    const truckElapsed = Math.max(0, elapsedTime - 2800);
    currentSegmentIndex = Math.min(
      Math.floor(truckElapsed / timePerSegment),
      numSegments - 1
    );
    const segmentFraction = (truckElapsed % timePerSegment) / timePerSegment;

    const p1 = waypoints[currentSegmentIndex];
    const p2 = waypoints[currentSegmentIndex + 1];

    truckX = p1.x + (p2.x - p1.x) * segmentFraction;
    truckY = p1.y + (p2.y - p1.y) * segmentFraction;

    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    truckAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
  } else if (simStep === 'unloading' || simStep === 'complete') {
    truckX = 440;
    truckY = 90;
    truckAngle = 0;
    currentSegmentIndex = numSegments - 1;
  }

  // Collected Bins based on waypoint milestones
  const collectedBinIds: string[] = [];
  if (isSmartRouteEnabled && elapsedTime >= 2800) {
    const truckElapsed = elapsedTime - 2800;
    waypoints.forEach((wp, idx) => {
      if (wp.binId && truckElapsed >= (idx * timePerSegment)) {
        collectedBinIds.push(wp.binId);
      }
    });
  }

  // Dynamic Telemetry: Speed, Distance, Tasks Remaining, ETA
  let speed = 0;
  let distanceCovered = 0;
  let tasksRemaining = 9;
  let nextBinLabel = 'B-104 (Secunderabad)';
  let etaNext = '6 min';
  let distToNext = '2.4 km';
  let routeProgress = 0;

  if (simStep === 'truck-moving') {
    const truckElapsed = elapsedTime - 2800;
    const t = truckElapsed / moveDuration;
    distanceCovered = parseFloat((t * 42.6).toFixed(1));
    routeProgress = Math.min(100, Math.floor(t * 100));
    tasksRemaining = Math.max(0, 9 - collectedBinIds.length);

    // Speed curve: accelerates, slows down at each bin pickup, cruising 38-48 km/h
    const segmentFrac = (truckElapsed % timePerSegment) / timePerSegment;
    if (segmentFrac < 0.2) {
      speed = Math.floor(18 + segmentFrac * 5 * 24); // accelerating from bin
    } else if (segmentFrac > 0.8) {
      speed = Math.floor(42 - (segmentFrac - 0.8) * 5 * 28); // decelerating into bin
    } else {
      speed = Math.floor(38 + Math.sin(t * 30) * 4); // cruising speed
    }

    const nextWp = waypoints[Math.min(currentSegmentIndex + 1, waypoints.length - 1)];
    if (nextWp) {
      nextBinLabel = nextWp.label;
      distToNext = `${Math.max(0.2, (2.8 * (1 - segmentFrac))).toFixed(1)} km`;
      etaNext = `${Math.max(1, Math.ceil(6 * (1 - segmentFrac)))} min`;
    }
  } else if (simStep === 'unloading' || simStep === 'complete') {
    speed = 0;
    distanceCovered = 42.6;
    tasksRemaining = 0;
    nextBinLabel = 'At Dumping Yard';
    etaNext = 'Arrived';
    distToNext = '0.0 km';
    routeProgress = 100;
  }

  // Top summary numbers (Section 4 requirements)
  const fullBinsCount = 10;
  const halfFullBinsCount = 10;
  const emptyBinsCount = 16;
  const totalTasksCount = fullBinsCount + halfFullBinsCount + 16; // 36

  // Primary truck TRK-204 data
  const mainTruck = INITIAL_TRUCKS[0];

  return (
    <div className="space-y-3.5 text-left font-sans animate-in fade-in duration-200">
      
      {/* ── SECTION 4: SUMMARY CARDS AT TOP ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        
        {/* Card 1: Total Tasks */}
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-3 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-[8px] font-mono uppercase tracking-wider">
            <span>Total Tasks</span>
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-black text-white tracking-tight">{totalTasksCount}</span>
            <span className="text-[7.5px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full font-bold">
              HYD SECTORS
            </span>
          </div>
        </div>

        {/* Card 2: Full Bins (Red) */}
        <div className="bg-slate-900/80 backdrop-blur-md border border-red-500/20 rounded-2xl p-3 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-[8px] font-mono uppercase tracking-wider">
            <span>Full Bins</span>
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-black text-red-400 tracking-tight">{fullBinsCount}</span>
            <span className="text-[7.5px] font-mono bg-red-500/15 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full font-bold">
              CRITICAL 🔴
            </span>
          </div>
        </div>

        {/* Card 3: Half-Full Bins (Orange) */}
        <div className="bg-slate-900/80 backdrop-blur-md border border-amber-500/20 rounded-2xl p-3 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-[8px] font-mono uppercase tracking-wider">
            <span>Half-Full Bins</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-black text-amber-400 tracking-tight">{halfFullBinsCount}</span>
            <span className="text-[7.5px] font-mono bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
              ROUTE 🟠
            </span>
          </div>
        </div>

        {/* Card 4: Empty Bins (Green) */}
        <div className="bg-slate-900/80 backdrop-blur-md border border-emerald-500/20 rounded-2xl p-3 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-[8px] font-mono uppercase tracking-wider">
            <span>Empty Bins</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-black text-emerald-400 tracking-tight">{emptyBinsCount}</span>
            <span className="text-[7.5px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
              OPTIMAL 🟢
            </span>
          </div>
        </div>

      </div>

      {/* ── SECTION 5 & 6: INTERACTIVE MAP & SMART ROUTE TOGGLE ── */}
      <div className="relative w-full rounded-2xl border border-slate-800 bg-[#020617] overflow-hidden shadow-2xl flex flex-col">
        
        {/* Top Floating Controls Bar */}
        <div className="px-3.5 py-2.5 bg-slate-950/85 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2 z-20 backdrop-blur-md">
          
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-white block">City Bin Matrix</span>
              <span className="text-[7.5px] font-mono text-slate-400">Hyderabad Central • Grid Zone 4A</span>
            </div>
          </div>

          {/* ── SECTION 6: SMART ROUTE TOGGLE BUTTON ── */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/90 px-3 py-1.5 rounded-xl shadow-md">
            <div className="text-left">
              <span className="text-[8.5px] font-bold text-white block leading-none">Smart Route</span>
              <span className={`text-[7px] font-mono font-bold ${isSmartRouteEnabled ? 'text-cyan-400' : 'text-slate-500'}`}>
                {isSmartRouteEnabled ? 'AI AUTO-ROUTE ON' : 'ROUTE OFF'}
              </span>
            </div>
            
            <button
              onClick={() => setIsSmartRouteEnabled(!isSmartRouteEnabled)}
              className={`w-9 h-5 rounded-full p-0.5 transition-all duration-300 relative flex items-center cursor-pointer ${
                isSmartRouteEnabled 
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 shadow-[0_0_12px_rgba(6,182,212,0.6)]' 
                  : 'bg-slate-800'
              }`}
              title="Toggle Smart Route Optimization"
            >
              <motion.div
                layout
                className="w-4 h-4 bg-white rounded-full shadow-md"
                animate={{ x: isSmartRouteEnabled ? 16 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              />
            </button>
          </div>

        </div>

        {/* Floating Notification Alert */}
        <AnimatePresence>
          {notification && isSmartRouteEnabled && (
            <motion.div
              initial={{ y: -30, opacity: 0, x: '-50%' }}
              animate={{ y: 0, opacity: 1, x: '-50%' }}
              exit={{ y: -30, opacity: 0, x: '-50%' }}
              className="absolute top-14 left-1/2 bg-slate-900/95 border border-cyan-500/40 backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-2xl flex items-center gap-2 z-30 whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-white font-extrabold text-[8.5px] uppercase tracking-wide font-mono">
                {notification}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SVG INTERACTIVE MAP VIEWPORT ── */}
        <div className="relative w-full h-[260px] sm:h-[300px] bg-[#030712] overflow-hidden select-none">
          
          <svg viewBox="0 0 480 210" className="w-full h-full">
            <defs>
              {/* Neon Glow Filters */}
              <filter id="glow-route-blue" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.0" result="blur" />
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
              <filter id="glow-orange-node" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* City Grid Background */}
            <g className="stroke-slate-900/50" strokeWidth="0.5">
              {Array.from({ length: 13 }).map((_, i) => (
                <line key={`gx-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="210" />
              ))}
              {Array.from({ length: 6 }).map((_, i) => (
                <line key={`gy-${i}`} x1="0" y1={i * 40} x2="480" y2={i * 40} />
              ))}
            </g>

            {/* Road Networks in Hyderabad */}
            <g className="stroke-slate-800/30 fill-none" strokeWidth="1.2">
              <path d="M 20 110 L 460 110" />
              <path d="M 100 10 L 100 190" />
              <path d="M 180 10 L 180 190" />
              <path d="M 250 10 L 250 190" />
              <path d="M 320 10 L 320 190" />
              <path d="M 390 10 L 390 190" />
              <path d="M 75 170 L 140 135 L 210 155 L 290 160 L 360 150 L 440 90" strokeDasharray="3,3" />
              <path d="M 120 45 L 180 65 L 250 110 L 320 80 L 390 120 L 440 90" strokeDasharray="3,3" />
            </g>

            {/* District Area Watermark Labels */}
            <g className="fill-slate-700/40 text-[6.5px] font-mono font-black select-none">
              <text x="25" y="125">CENTRAL DEPOT</text>
              <text x="85" y="85">SECUNDERABAD</text>
              <text x="160" y="55">GACHIBOWLI</text>
              <text x="125" y="150">JUBILEE HILLS</text>
              <text x="195" y="170">BANJARA HILLS</text>
              <text x="235" y="100">BEGUMPET</text>
              <text x="275" y="175">KUKATPALLY</text>
              <text x="305" y="70">MADHAPUR</text>
              <text x="345" y="165">KONDAPUR</text>
              <text x="375" y="110">HUKUMPETA</text>
              <text x="410" y="80">JAWAHARNAGAR DUMP</text>
            </g>

            {/* ── SECTION 7: AUTOMATIC GARBAGE COLLECTION ROUTE (BLUE NEON PATH) ── */}
            {/* Connects ONLY to 🔴 Full Bins and 🟠 Half-Full Bins, leading to Jawaharnagar Dump Yard. Ignores Green Bins! */}
            {isSmartRouteEnabled && (
              <motion.path
                d="M 40 110 L 100 95 L 140 135 L 180 65 L 210 155 L 250 110 L 290 160 L 320 80 L 360 150 L 390 120 L 440 90"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="3.2"
                filter="url(#glow-route-blue)"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            )}

            {/* 1. Start Central Depot */}
            <g>
              <circle cx="40" cy="110" r="7" className="fill-cyan-500" />
              <circle cx="40" cy="110" r="14" className="stroke-cyan-400 fill-none stroke-[1] animate-ping" />
              <text x="40" y="132" textAnchor="middle" fill="#38bdf8" fontSize="5.5" fontWeight="bold" fontFamily="monospace">
                DEPOT
              </text>
            </g>

            {/* 2. Dump Yard Final Destination */}
            <g>
              <motion.rect
                x="426"
                y="76"
                width="28"
                height="28"
                rx="6"
                animate={{
                  fill: simStep === 'unloading' ? '#06b6d4' : '#1e293b',
                  stroke: simStep === 'unloading' ? '#67e8f9' : '#334155',
                }}
                className="stroke-[1.5] cursor-pointer"
              />
              <text x="440" y="93" textAnchor="middle" fill={simStep === 'unloading' ? '#020617' : '#94a3b8'} fontSize="6" fontWeight="bold" fontFamily="monospace">
                DUMP
              </text>
              <text x="440" y="118" textAnchor="middle" fill="#64748b" fontSize="5" fontFamily="monospace">
                YARD
              </text>
            </g>

            {/* 3. Bin Markers on Map */}
            {bins.map(bin => {
              const isCollected = collectedBinIds.includes(bin.id);
              const isTargetRoute = bin.color === 'red' || bin.color === 'orange';
              
              // Fill color calculation
              let fillColor = '#10b981'; // green
              let strokeClass = 'stroke-emerald-500';
              if (isCollected) {
                fillColor = '#06b6d4'; // collected turns cyan
                strokeClass = 'stroke-cyan-400';
              } else if (bin.color === 'red') {
                fillColor = '#ef4444';
                strokeClass = 'stroke-red-500';
              } else if (bin.color === 'orange') {
                fillColor = '#f59e0b';
                strokeClass = 'stroke-amber-500';
              }

              // In Smart Route mode, green bins stay visible but are not connected to route
              return (
                <g 
                  key={bin.id}
                  onClick={() => setSelectedBin(bin)}
                  className="cursor-pointer group"
                >
                  {/* Outer pulsating ring for active target bins */}
                  {!isCollected && isTargetRoute && (
                    <circle
                      cx={bin.x}
                      cy={bin.y}
                      r="12"
                      className={`fill-none stroke-[0.8] animate-ping ${strokeClass}`}
                      style={{ animationDuration: '2.5s' }}
                    />
                  )}

                  {/* Node Circle */}
                  <motion.circle
                    cx={bin.x}
                    cy={bin.y}
                    r={isCollected ? 6.5 : isTargetRoute ? 7.5 : 5.5}
                    fill={fillColor}
                    filter={isCollected ? 'url(#glow-route-blue)' : bin.color === 'red' ? 'url(#glow-red-node)' : ''}
                    whileHover={{ scale: 1.35 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />

                  {/* Bin ID Label */}
                  <text
                    x={bin.x}
                    y={bin.y + 13}
                    textAnchor="middle"
                    fill={isCollected ? '#38bdf8' : bin.color === 'red' ? '#fca5a5' : bin.color === 'orange' ? '#fcd34d' : '#86efac'}
                    fontSize="5"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {bin.id}
                  </text>
                </g>
              );
            })}

            {/* ── SECTION 8: 3D REALISTIC GARBAGE TRUCK WITH LIVE MOVEMENT ── */}
            {isSmartRouteEnabled && (
              <g 
                transform={`translate(${truckX}, ${truckY}) rotate(${truckAngle})`}
                onClick={() => setShowTruckModal(true)}
                className="cursor-pointer filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
              >
                {/* 3D Drop Shadow */}
                <rect x="-20" y="-7" width="32" height="14" rx="2" fill="black" opacity="0.45" transform="translate(-1, 3)" />

                {/* Container Chassis / Underbody */}
                <rect x="-20" y="-1" width="32" height="6" fill="#64748b" rx="1" />

                {/* Silver Heavy Duty Garbage Compactor Container */}
                <rect x="-20" y="-8" width="20" height="13" rx="1.5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.6" />

                {/* Neon Green Eco Safety Dynamic Strip */}
                <rect x="-16" y="-3.5" width="12" height="2.5" rx="0.5" fill="#10b981" className="animate-pulse" />

                {/* Safety Orange Cabin Block */}
                <rect x="0" y="-7.5" width="12" height="11" rx="1.5" fill="#f97316" stroke="#ea580c" strokeWidth="0.6" />

                {/* Cabin Shadow Depth Panel */}
                <rect x="0" y="-1.5" width="12" height="4" fill="#c2410c" rx="0.5" />

                {/* Windshield Glass */}
                <rect x="7.5" y="-6" width="3.5" height="8" rx="0.5" fill="#e0f2fe" />

                {/* Heavy Compactor Wheels */}
                <circle cx="-14" cy="6" r="3.2" fill="#0f172a" stroke="#475569" strokeWidth="0.5" />
                <circle cx="-3" cy="6" r="3.2" fill="#0f172a" stroke="#475569" strokeWidth="0.5" />
                <circle cx="8" cy="6" r="3.2" fill="#0f172a" stroke="#475569" strokeWidth="0.5" />
              </g>
            )}

          </svg>

          {/* Compass / Heading Indicator */}
          {isSmartRouteEnabled && (
            <div className="absolute bottom-2.5 left-2.5 z-25 bg-slate-900/90 border border-slate-800/90 p-2 rounded-xl backdrop-blur-md flex items-center gap-2 shadow-xl">
              <div className="relative w-7 h-7 flex items-center justify-center bg-slate-950 rounded-full border border-slate-800">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#334155" strokeWidth="4" />
                  <text x="50" y="24" textAnchor="middle" fontSize="16" fill="#94a3b8" fontWeight="bold">N</text>
                  <g transform={`rotate(${truckAngle}, 50, 50)`}>
                    <polygon points="50,18 43,50 50,45" fill="#ef4444" />
                    <polygon points="50,82 57,50 50,55" fill="#64748b" />
                    <circle cx="50" cy="50" r="6" fill="#06b6d4" />
                  </g>
                </svg>
              </div>
              <div className="text-left font-mono text-[7.5px] leading-tight">
                <span className="text-slate-400 font-bold block uppercase">Truck Heading</span>
                <span className="text-cyan-400 font-black text-[9px]">{Math.floor(truckAngle)}° NE</span>
              </div>
            </div>
          )}

          {/* Quick Truck Card Trigger at Top-Right of Map */}
          {isSmartRouteEnabled && (
            <button
              onClick={() => setShowTruckModal(true)}
              className="absolute top-2.5 right-2.5 z-25 bg-slate-900/95 border border-emerald-500/30 p-2 rounded-xl backdrop-blur-md flex items-center gap-2 shadow-xl hover:border-emerald-400 transition-colors"
            >
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Truck className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-tight">
                <span className="text-white font-extrabold text-[8.5px] block">TRK-204</span>
                <span className="text-emerald-400 text-[7px] font-mono font-bold block">Raj Kumar</span>
              </div>
            </button>
          )}

        </div>

        {/* ── SECTION 9: LIVE ROUTE INFORMATION HUD (When Smart Route is ON) ── */}
        {isSmartRouteEnabled && (
          <div className="bg-slate-950/95 border-t border-slate-800/80 p-3 grid grid-cols-2 sm:grid-cols-5 gap-2.5 items-center z-10 font-mono text-left">
            
            {/* 1. Speedometer Gauge */}
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
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
                  <span className="text-[10px] font-black text-white">{speed}</span>
                  <span className="text-[4px] text-slate-400">KM/H</span>
                </div>
              </div>
              <div>
                <span className="text-[6.5px] text-slate-500 uppercase font-bold block">Truck Speed</span>
                <span className="text-white font-extrabold text-[9px] block mt-0.5">{speed} km/h</span>
              </div>
            </div>

            {/* 2. Total Distance Covered / Route Distance */}
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[6.5px] text-slate-500 uppercase font-bold block">Total Distance</span>
              <span className="text-white font-extrabold text-[10px] block mt-0.5">42.6 km</span>
              <span className="text-[6.5px] text-cyan-400 block">{distanceCovered} km covered</span>
            </div>

            {/* 3. Estimated Travel Time */}
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[6.5px] text-slate-500 uppercase font-bold block">Estimated Time</span>
              <span className="text-white font-extrabold text-[10px] block mt-0.5">1h 18m</span>
              <span className="text-[6.5px] text-emerald-400 block">On Schedule</span>
            </div>

            {/* 4. Remaining Tasks */}
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[6.5px] text-slate-500 uppercase font-bold block">Remaining Tasks</span>
              <span className="text-amber-400 font-extrabold text-[10px] block mt-0.5">{tasksRemaining} Bins</span>
              <span className="text-[6.5px] text-slate-400 block">Goal: 9 Stops</span>
            </div>

            {/* 5. Next Stop & ETA */}
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-[6.5px] text-slate-500 uppercase font-bold block">Next Destination</span>
              <span className="text-cyan-300 font-bold text-[8.5px] block truncate mt-0.5">{nextBinLabel}</span>
              <span className="text-[6.5px] text-slate-400 block">{distToNext} • ETA: {etaNext}</span>
            </div>

          </div>
        )}

        {/* Route Progress Bar */}
        {isSmartRouteEnabled && (
          <div className="px-3.5 py-1.5 bg-slate-950 border-t border-slate-900 flex items-center gap-3">
            <span className="text-[7px] font-mono text-slate-400 shrink-0 font-bold uppercase">
              Route Progress: {routeProgress}%
            </span>
            <div className="flex-1 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-300"
                style={{ width: `${routeProgress}%` }}
              />
            </div>
            <span className="text-[7px] font-mono text-emerald-400 shrink-0 font-bold">
              {tasksRemaining === 0 ? 'Route Finished' : 'Active Transit'}
            </span>
          </div>
        )}

      </div>

      {/* ── SECTION 10: INTERACTIVE BIN DETAILS CARD (MODAL / OVERLAY) ── */}
      {selectedBin && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in duration-150"
          onClick={() => setSelectedBin(null)}
        >
          <div 
            className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full p-5 shadow-2xl text-left font-sans"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-800 mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm shadow-md ${
                  selectedBin.color === 'red' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                  selectedBin.color === 'orange' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                  'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">{selectedBin.name}</h3>
                  <p className="text-[8px] font-mono text-cyan-400 font-bold">
                    Bin ID: {selectedBin.id} • {selectedBin.sector}
                  </p>
                </div>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-mono font-bold uppercase ${
                selectedBin.color === 'red' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                selectedBin.color === 'orange' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {selectedBin.status}
              </span>
            </div>

            {/* Bin Fill Level Gauge */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 space-y-1.5 mb-3">
              <div className="flex justify-between items-center text-[9px] font-mono">
                <span className="text-slate-400 font-bold uppercase">Fill Level Capacity:</span>
                <span className={`font-black text-sm ${
                  selectedBin.fillPercentage > 75 ? 'text-red-400' :
                  selectedBin.fillPercentage > 30 ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {selectedBin.fillPercentage}% ({selectedBin.capacityKg} kg max)
                </span>
              </div>
              <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className={`h-full rounded-full transition-all ${
                    selectedBin.fillPercentage > 75 ? 'bg-red-500' :
                    selectedBin.fillPercentage > 30 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${selectedBin.fillPercentage}%` }}
                />
              </div>
            </div>

            {/* Bin Operational Attributes (Section 10 Requirements) */}
            <div className="grid grid-cols-2 gap-2 text-[8.5px] font-mono">
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-850">
                <span className="text-slate-500 block text-[7px] uppercase font-bold">Distance from Truck</span>
                <span className="text-white font-extrabold text-xs block mt-0.5">{selectedBin.distanceFromTruck}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-850">
                <span className="text-slate-500 block text-[7px] uppercase font-bold">Estimated Travel Time</span>
                <span className="text-white font-extrabold text-xs block mt-0.5">{selectedBin.estimatedTime}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-850">
                <span className="text-slate-500 block text-[7px] uppercase font-bold">Collection Priority</span>
                <span className={`font-extrabold text-xs block mt-0.5 ${
                  selectedBin.priority === 'High' ? 'text-red-400' :
                  selectedBin.priority === 'Medium' ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {selectedBin.priority} Priority
                </span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-850">
                <span className="text-slate-500 block text-[7px] uppercase font-bold">Route Inclusion</span>
                <span className={`font-extrabold text-xs block mt-0.5 ${
                  selectedBin.isIncludedInRoute ? 'text-cyan-400' : 'text-slate-400'
                }`}>
                  {selectedBin.isIncludedInRoute ? 'Included in Blue Route' : 'Excluded (Empty)'}
                </span>
              </div>
            </div>

            {/* IoT Sensor Specs */}
            <div className="mt-2 p-2 rounded-xl bg-slate-950 border border-slate-850 text-[8px] font-mono text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="text-white font-medium">{selectedBin.location}</span>
              </div>
              <div className="flex justify-between">
                <span>IoT Sensor Battery:</span>
                <span className="text-emerald-400 font-bold">{selectedBin.sensorBattery}% Health</span>
              </div>
              <div className="flex justify-between">
                <span>Last Waste Collection:</span>
                <span className="text-slate-300">{selectedBin.lastCollected}</span>
              </div>
            </div>

            {/* Footer actions */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setSelectedBin(null)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
              >
                Dismiss
              </button>
              <button
                onClick={() => {
                  if (onDispatchTask) onDispatchTask(selectedBin);
                  setSelectedBin(null);
                }}
                className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold transition-colors shadow"
              >
                Dispatch Truck TRK-204
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── SECTION 11: LIVE TRUCK INFORMATION CARD (MODAL / OVERLAY) ── */}
      {showTruckModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in duration-150"
          onClick={() => setShowTruckModal(false)}
        >
          <div 
            className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full p-5 shadow-2xl text-left font-sans"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-800 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-500 text-slate-950 font-black text-base flex items-center justify-center shadow-lg">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">{mainTruck.id} — Heavy Compactor</h3>
                  <p className="text-[8px] font-mono text-emerald-400 font-bold">
                    Assigned Driver: {mainTruck.driverName} ({mainTruck.driverId})
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[8px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Live on Route
              </span>
            </div>

            {/* Truck Telemetry Specs (Section 11 Requirements) */}
            <div className="space-y-2 text-[9px] font-mono">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-850">
                  <span className="text-slate-500 block text-[7px] uppercase font-bold">Current Speed</span>
                  <span className="text-white font-extrabold text-xs block mt-0.5">{speed} km/h</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-850">
                  <span className="text-slate-500 block text-[7px] uppercase font-bold">Current Task</span>
                  <span className="text-amber-400 font-extrabold text-xs block mt-0.5 truncate">{nextBinLabel}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-850">
                  <span className="text-slate-500 block text-[7px] uppercase font-bold">Next Destination</span>
                  <span className="text-cyan-400 font-extrabold text-xs block mt-0.5 truncate">{nextBinLabel}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-850">
                  <span className="text-slate-500 block text-[7px] uppercase font-bold">Distance &amp; ETA</span>
                  <span className="text-white font-extrabold text-xs block mt-0.5">{distToNext} ({etaNext})</span>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
                <div className="flex justify-between text-slate-400 text-[8px]">
                  <span>Total Route Distance:</span>
                  <span className="text-white font-bold">42.6 km</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[8px]">
                  <span>Route Completion:</span>
                  <span className="text-emerald-400 font-bold">{routeProgress}% Processed</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[8px]">
                  <span>Fuel Tank Level:</span>
                  <span className="text-white font-bold">{mainTruck.fuelLevel}% Diesel Full</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setShowTruckModal(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
              >
                Close Truck HUD
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── BINS TARGET STATUS LIST (PENDING VS COLLECTED) ── */}
      <div className="p-3 bg-slate-900/70 border border-slate-800 rounded-2xl backdrop-blur-md">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2 font-mono text-[8px]">
          <span className="text-slate-400 font-bold uppercase tracking-wider">Scheduled Target Bins</span>
          <span className="text-emerald-400 font-bold">Auto-Optimized Routing Sequence</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {bins.slice(0, 6).map(bin => {
            const isCollected = collectedBinIds.includes(bin.id);
            return (
              <div 
                key={bin.id}
                onClick={() => setSelectedBin(bin)}
                className={`p-2 rounded-xl border text-[8px] font-mono flex items-center justify-between cursor-pointer transition-all ${
                  isCollected 
                    ? 'bg-cyan-950/20 border-cyan-500/30 text-cyan-300' 
                    : bin.color === 'red' 
                    ? 'bg-red-950/20 border-red-500/30 text-red-300' 
                    : 'bg-slate-950 border-slate-850 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    isCollected ? 'bg-cyan-400 animate-pulse' :
                    bin.color === 'red' ? 'bg-red-500 animate-ping' :
                    bin.color === 'orange' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />
                  <div>
                    <span className="font-bold block text-white text-[8.5px]">{bin.id} — {bin.name}</span>
                    <span className="text-slate-500 text-[7px] block">{bin.location}</span>
                  </div>
                </div>
                <span className="font-extrabold uppercase text-[7.5px]">
                  {isCollected ? '[Collected]' : `[${bin.fillPercentage}%]`}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

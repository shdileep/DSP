import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Bus, 
  Star, 
  Zap, 
  QrCode, 
  CheckCircle2, 
  ArrowRight, 
  CreditCard, 
  Armchair, 
  Wifi, 
  Battery, 
  Signal, 
  Calendar,
  TrendingDown
} from 'lucide-react';

const SCREENS = ['search', 'results', 'seats', 'optimizer', 'checkout', 'success'] as const;
type Screen = typeof SCREENS[number];
const DURATIONS: Record<Screen, number> = {
  search: 3500, results: 4500, seats: 4800, optimizer: 4200, checkout: 3800, success: 4250
};

const variants = {
  enter: { opacity: 0, y: 15, scale: 0.98 },
  center: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -12, scale: 0.98 },
};

/* ── Screen Status Header (Simulating Mobile UX inside browser frame) ── */
function HeaderBar({ title, sub }: { title: string, sub?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800/60 pb-2 mb-3 shrink-0 select-none">
      <div>
        <p className="text-slate-500 text-[6.5px] font-mono uppercase tracking-widest font-extrabold">{title}</p>
        {sub && <p className="text-white font-extrabold text-[10px] mt-0.5 tracking-tight">{sub}</p>}
      </div>
      <div className="flex items-center gap-1.5 text-[7px] font-mono text-slate-400">
        <span>09:41 AM</span>
        <div className="flex items-center gap-0.5">
          <Signal className="w-2 h-2 text-slate-450" />
          <Wifi className="w-2 h-2 text-slate-450" />
          <Battery className="w-2.5 h-2.5 text-slate-450" />
        </div>
      </div>
    </div>
  );
}

/* ── Search Screen ── */
function Search() {
  const [typed, setTyped] = useState('');
  const dest = 'Hyderabad, TS';
  
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { 
      i++; 
      setTyped(dest.slice(0, i)); 
      if (i >= dest.length) clearInterval(t); 
    }, 100);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div key="search" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}
      className="absolute inset-0 flex flex-col p-4 gap-3 text-left"
      style={{ background: 'linear-gradient(160deg, #020617 0%, #051329 100%)' }}>
      
      <HeaderBar title="NextTrip Route Search" sub="Optimized Bus Transits" />

      <div className="space-y-2 mt-1">
        {[{ label: 'DEPARTURE HUB', val: 'Chennai Central, TN' }, { label: 'ARRIVAL STATION (AI ROUTED)', val: typed || '…' }].map((f, i) => (
          <div key={i} className="flex items-center gap-3 bg-slate-900/90 border border-slate-800/80 rounded-xl p-2.5 shadow-md">
            <div className={`p-1.5 rounded-lg ${i === 0 ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400 animate-pulse'}`}>
              <MapPin className="w-3.5 h-3.5 shrink-0" />
            </div>
            <div>
              <p className="text-[6.5px] text-slate-500 font-mono font-bold leading-none">{f.label}</p>
              <p className="text-white text-[10px] font-extrabold mt-1">{f.val}</p>
            </div>
          </div>
        ))}

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800/80 rounded-xl p-2.5 shadow-md">
            <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <div>
              <p className="text-[6.5px] text-slate-500 font-mono font-bold leading-none">DATE</p>
              <p className="text-white text-[9px] font-bold mt-0.5">Tomorrow, Jun 1</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800/80 rounded-xl p-2.5 shadow-md">
            <span className="text-[11px] select-none pl-0.5">👥</span>
            <div>
              <p className="text-[6.5px] text-slate-500 font-mono font-bold leading-none">SEATS</p>
              <p className="text-white text-[9px] font-bold mt-0.5">2 Passengers</p>
            </div>
          </div>
        </div>
      </div>

      <motion.button
        animate={{ scale: [1, 1.015, 1], boxShadow: ['0 0 10px rgba(59,130,246,0.15)', '0 0 20px rgba(59,130,246,0.3)', '0 0 10px rgba(59,130,246,0.15)'] }} 
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="w-full h-9 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center gap-1.5 text-white font-extrabold text-[10px] shadow-[0_0_20px_rgba(59,130,246,0.3)] mt-2"
      >
        <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300 animate-bounce" /> Analyze & Solve Routes
      </motion.button>

      {/* AI Recommendation Overlay Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 8 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.8 }}
        className="flex items-center gap-2 bg-blue-950/30 border border-blue-550/20 rounded-xl p-2 mt-auto"
      >
        <div className="p-1 rounded-lg bg-blue-500/10 text-blue-400">
          <Zap className="w-3 h-3 animate-pulse" />
        </div>
        <span className="text-blue-300 text-[7.5px] leading-normal font-mono">
          AI ADVISORY: Dep. 06:00 AM matches optimal traffic velocity. Saves ₹120.
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ── Results Screen ── */
const BUSES = [
  { name: 'SRS Travels Premium', time: '06:00 - 14:30', price: 520, rating: 4.8, seats: 12, tag: 'AC Sleeper 2+1', class: 'border-blue-500/40 bg-blue-950/10' },
  { name: 'VRL Logistics Star', time: '08:30 - 17:00', price: 440, rating: 4.5, seats: 5, tag: 'AC Seater Multi-Axle', class: 'border-slate-800 bg-slate-900/25' },
  { name: 'Orange Tours Luxury', time: '22:00 - 06:30', price: 680, rating: 4.9, seats: 2, tag: 'Volvo VIP Club', class: 'border-slate-800 bg-slate-900/25' },
];

function Results() {
  const [prices, setPrices] = useState([520, 440, 680]);
  useEffect(() => {
    const t = setInterval(() => {
      setPrices(p => p.map(val => val + (Math.random() > 0.5 ? 4 : -4)));
    }, 90000); // disable dynamic price ticking visually, keep it stable
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div key="results" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}
      className="absolute inset-0 flex flex-col p-3.5 gap-2.5 text-left"
      style={{ background: 'linear-gradient(180deg, #020617 0%, #031023 100%)' }}>
      
      <HeaderBar title="Available Transits" sub="Chennai (MAA) ➔ Hyderabad (HYD)" />

      <div className="space-y-2 flex-1 overflow-y-auto no-scrollbar">
        {BUSES.map((b, i) => (
          <motion.div key={b.name} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
            className={`flex items-center justify-between p-2.5 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:border-slate-700 ${b.class}`}>
            
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <Bus className={`w-3.5 h-3.5 ${i === 0 ? 'text-blue-400' : 'text-slate-500'}`} />
                <p className="text-white text-[9px] font-black">{b.name}</p>
              </div>
              <p className="text-slate-450 text-[7.5px] font-mono leading-none">{b.time} · {b.tag}</p>
              <div className="flex items-center gap-1.5 pt-0.5">
                <div className="flex items-center gap-0.5 text-yellow-400">
                  <Star className="w-2.5 h-2.5 fill-yellow-400" />
                  <span className="text-[7.5px] font-black">{b.rating}</span>
                </div>
                <span className="text-slate-600 text-[6px]">·</span>
                <span className={`text-[7.5px] font-mono ${b.seats <= 3 ? 'text-rose-400 animate-pulse font-bold' : 'text-slate-500'}`}>
                  {b.seats} seats left
                </span>
              </div>
            </div>
            
            <div className="text-right flex flex-col items-end gap-0.5">
              <motion.p className="text-white font-extrabold text-[12px] tracking-tight" key={prices[i]}>
                ₹{Math.round(prices[i])}
              </motion.p>
              <p className="text-[6px] text-slate-500 font-mono uppercase tracking-wider leading-none">AI lock fare</p>
              {i === 0 && (
                <span className="text-[6.5px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono font-black mt-1">
                  AI BEST VALUE
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Seat Map Screen ── */
function Seats() {
  const [selected, setSelected] = useState<number[]>([7, 8]);
  const seatsGrid = Array.from({ length: 15 }, (_, i) => i);
  const occupied = [0, 3, 9, 12, 14];

  return (
    <motion.div key="seats" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}
      className="absolute inset-0 flex flex-col p-3.5 gap-2.5 text-left"
      style={{ background: 'linear-gradient(180deg, #020617 0%, #031023 100%)' }}>
      
      <HeaderBar title="Select Cabin Seats" sub="SRS Travels Premium · Lower Deck" />

      {/* Legend */}
      <div className="flex justify-between items-center bg-slate-900/60 p-2 border border-slate-850 rounded-xl text-[6.5px] text-slate-400 font-mono shrink-0">
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-slate-800 border border-slate-700" />Available</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-blue-500" />Selected</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-slate-950 border border-slate-900 opacity-30" />Occupied</div>
      </div>

      {/* Cabin Visual with Steering Wheel */}
      <div className="flex-1 bg-slate-950/60 border border-slate-850 rounded-2xl p-2.5 flex flex-col gap-2 relative">
        <div className="flex items-center justify-between border-b border-slate-900 pb-1 text-[7px] text-slate-500 font-mono">
          <span>FRONT CABIN ENTRY</span>
          {/* Driver Steering wheel icon */}
          <div className="flex items-center gap-1">
            <span>🛞 DRIVER</span>
          </div>
        </div>

        {/* Grid mapping (Bus seat selection representation with armchair icons) */}
        <div className="grid grid-cols-5 gap-2 content-start flex-1 mt-1">
          {seatsGrid.map(i => {
            const isOcc = occupied.includes(i);
            const isSel = selected.includes(i);
            const seatNum = `${Math.floor(i / 3) + 1}${['A', 'B', 'C'][i % 3]}`;

            return (
              <motion.button 
                key={i} 
                onClick={() => !isOcc && setSelected(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i])}
                whileHover={!isOcc ? { scale: 1.05 } : {}}
                className={`h-7 rounded-lg border flex flex-col items-center justify-center transition-all ${
                  isOcc ? 'bg-slate-950 border-slate-900 text-slate-700 cursor-not-allowed opacity-20' :
                  isSel ? 'bg-blue-500 border-blue-450 text-white shadow-lg shadow-blue-500/20' :
                  'bg-slate-900 border-slate-850 text-slate-400 hover:border-blue-500/50'
                }`}
              >
                <Armchair className="w-3.5 h-3.5" />
                <span className="text-[5px] font-mono leading-none mt-0.5 font-extrabold">{seatNum}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center bg-blue-950/20 border border-blue-500/15 rounded-xl p-2.5 shrink-0">
        <div>
          <p className="text-slate-500 text-[6.5px] font-mono">SELECTED FARE ({selected.length} Seats)</p>
          <p className="text-blue-400 font-extrabold text-xs">₹{selected.length * 520}</p>
        </div>
        <button 
          className="px-3.5 py-1.5 bg-blue-500 rounded-lg text-white text-[9.5px] font-extrabold flex items-center gap-1 shadow-lg shadow-blue-500/20"
        >
          Confirm <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

/* ── AI Pricing Optimizer Screen (Highly Advanced SVG Charts) ── */
function Optimizer() {
  const [val, setVal] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => { 
    const t = setInterval(() => {
      setVal(v => {
        const next = Math.min(v + 2, 100);
        if (next < 30) setActiveStep(0);
        else if (next < 65) setActiveStep(1);
        else if (next < 90) setActiveStep(2);
        else setActiveStep(3);
        return next;
      });
    }, 60); 
    return () => clearInterval(t); 
  }, []);

  const steps = [
    'Scanning Fleet Contention Modules…',
    'Analyzing Seat Booking Velocity…',
    'Applying Demand Elasticity Curves…',
    'Securing Dynamic Discount Lock…'
  ];

  return (
    <motion.div key="opt" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}
      className="absolute inset-0 flex flex-col p-4 gap-3 text-left"
      style={{ background: 'linear-gradient(135deg, #020617 0%, #031835 100%)' }}>
      
      <HeaderBar title="NextTrip AI Optimizer" sub="Real-Time Price Heuristics" />

      {/* Dynamic Graph illustrating fare drop */}
      <div className="bg-slate-950/80 border border-slate-900 rounded-2xl p-2.5 flex-1 flex flex-col justify-between overflow-hidden relative">
        <div className="flex justify-between items-center">
          <span className="text-[7.5px] font-mono text-slate-500">FARE VELOCITY GRAPH</span>
          <div className="flex items-center gap-1 text-[7px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">
            <TrendingDown className="w-2.5 h-2.5" />
            <span>₹120 SAVED</span>
          </div>
        </div>

        {/* Live Drawing SVG Line Graph */}
        <div className="h-16 w-full relative mt-1.5 mb-1.5 flex items-center justify-center">
          <svg viewBox="0 0 300 80" className="w-full h-full">
            <defs>
              <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Gridlines */}
            <line x1="0" y1="20" x2="300" y2="20" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3 3" />
            <line x1="0" y1="50" x2="300" y2="50" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3 3" />
            
            {/* Optimized Curve Area */}
            <motion.path 
              d="M 10 15 Q 100 20 180 55 T 290 60 L 290 80 L 10 80 Z"
              fill="url(#chart-glow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            {/* Optimized Curve Line */}
            <motion.path 
              d="M 10 15 Q 100 20 180 55 T 290 60"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: val / 100 }}
              transition={{ duration: 0.1 }}
            />
            {/* Initial Constant price reference */}
            <line x1="10" y1="15" x2="290" y2="15" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
            <text x="235" y="10" fontSize="7" fill="#ef4444" className="font-mono">Initial: ₹640</text>
            
            {/* Moving locator point */}
            {val > 0 && (
              <circle cx={10 + (280 * (val / 100))} cy={15 + (45 * (val / 100))} r="3" fill="#60a5fa" stroke="#020617" strokeWidth="1" />
            )}
          </svg>
        </div>

        <div className="flex justify-between items-center text-[7.5px] font-mono text-slate-400">
          <span>Processing Efficiency</span>
          <span className="text-blue-400 font-extrabold">{val}%</span>
        </div>
      </div>

      <div className="space-y-1.5 mt-1 shrink-0">
        <div className="h-1.5 bg-slate-900 border border-slate-850 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: `${val}%` }} />
        </div>
        
        {/* Animated steps tracker */}
        <div className="p-2 bg-slate-900/60 border border-slate-850 rounded-xl flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-yellow-400 animate-pulse shrink-0" />
          <AnimatePresence mode="wait">
            <motion.p 
              key={activeStep} 
              initial={{ opacity: 0, x: 5 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -5 }}
              className="text-white text-[8px] font-mono leading-none"
            >
              {steps[activeStep]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Checkout Screen (Holographic Card Visualization) ── */
function Checkout() {
  const [stage, setStage] = useState(0);
  useEffect(() => { 
    const t = setInterval(() => setStage(s => Math.min(s + 1, 2)), 1200); 
    return () => clearInterval(t); 
  }, []);

  return (
    <motion.div key="checkout" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}
      className="absolute inset-0 flex flex-col p-4 gap-3 text-left"
      style={{ background: 'linear-gradient(180deg, #020617 0%, #041022 100%)' }}>
      
      <HeaderBar title="Securing Seat Inventory" sub="Holographic Gateway Checkout" />
      
      {/* High-Fidelity Holographic Credit Card Mockup */}
      <motion.div 
        animate={{ rotateY: [0, 8, -8, 0], rotateX: [0, 4, -4, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="w-full h-24 bg-gradient-to-tr from-blue-700 via-indigo-950 to-slate-950 border border-blue-500/30 rounded-xl p-3.5 flex flex-col justify-between shadow-xl relative overflow-hidden"
        style={{ perspective: 1000 }}
      >
        {/* Holographic Reflection Sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <div className="w-5.5 h-4 bg-slate-800 border border-slate-700 rounded flex items-center justify-center font-bold text-[7px] text-slate-350">
              MC
            </div>
            <span className="text-[7px] font-mono text-cyan-300/80 font-black tracking-widest uppercase">Titanium</span>
          </div>
          <span className="text-[6.5px] font-mono text-slate-400 font-bold uppercase tracking-wider">Razorpay Secure</span>
        </div>
        
        <p className="text-white text-xs font-mono tracking-widest font-extrabold text-center mt-1">4532 •••• •••• 8821</p>
        
        <div className="flex justify-between items-center text-[7px] font-mono text-slate-450 leading-none">
          <span>DILEEP SAI GALLA</span>
          <span>EXP: 09/30</span>
        </div>
      </motion.div>

      <div className="space-y-1.5 mt-1 flex-1">
        {['Acquiring optimistic locks…', 'Encrypting gateway telemetry…', 'Digital Ticket Signed ✓'].slice(0, stage + 1).map((s, i) => (
          <motion.div key={s} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-[8px] font-mono">
            <CheckCircle2 className={`w-3.5 h-3.5 ${i === stage ? 'text-blue-400 animate-pulse' : 'text-emerald-400'}`} />
            <span className={i === stage ? 'text-blue-300 font-extrabold' : 'text-slate-400'}>{s}</span>
          </motion.div>
        ))}
      </div>
      
      {stage >= 2 && (
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="flex justify-center shrink-0">
          <div className="w-16 h-16 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-lg p-1.5">
            <QrCode className="w-full h-full text-slate-950" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ── Success Screen (Apple Wallet Boarding Pass) ── */
function Success() {
  return (
    <motion.div key="success" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}
      className="absolute inset-0 flex flex-col items-center justify-between p-4 gap-2 text-center"
      style={{ background: 'linear-gradient(135deg, #020617 0%, #031f13 100%)' }}>
      
      <div className="flex flex-col items-center gap-1.5 mt-1 shrink-0">
        <motion.div 
          animate={{ scale: [0.9, 1.05, 0.9], boxShadow: ['0 0 10px #10b98120', '0 0 25px #10b98140', '0 0 10px #10b98120'] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-450 to-teal-500 flex items-center justify-center border border-emerald-400/30"
        >
          <CheckCircle2 className="w-5.5 h-5.5 text-white" />
        </motion.div>
        <div>
          <p className="text-white font-extrabold text-xs tracking-tight">Booking Confirmed</p>
          <p className="text-emerald-400 text-[8px] font-mono font-bold tracking-wider mt-0.5">PNR: NXT-2026-8821</p>
        </div>
      </div>

      {/* Detailed E-Ticket Apple Wallet Ticket pass */}
      <div className="w-full bg-slate-900/90 border border-slate-800/80 rounded-2xl p-3 space-y-1.5 shadow-xl relative text-left">
        {/* Ticket Notch Cutouts */}
        <div className="absolute w-3 h-3 bg-slate-950 border-r border-slate-800 rounded-full -left-1.5 top-1/2 -translate-y-1/2" />
        <div className="absolute w-3 h-3 bg-slate-950 border-l border-slate-800 rounded-full -right-1.5 top-1/2 -translate-y-1/2" />

        {[
          ['Transit Route', 'Chennai Central ➔ Hyderabad Hitech'], 
          ['Bus Service', 'SRS Travels · Luxury Sleeper'], 
          ['Departure', 'Tomorrow, 06:00 AM'], 
          ['Seats Booked', '3A, 3B']
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between text-[7.5px] font-mono pb-1 border-b border-slate-850/50 last:border-0 last:pb-0">
            <span className="text-slate-500 font-bold">{k}</span>
            <span className="text-slate-200 font-black">{v}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 rounded-xl px-3 py-1 font-mono text-[7px] shrink-0">
        <Zap className="w-3 h-3 text-emerald-400 animate-pulse" />
        <span className="text-emerald-300 font-bold">AI dynamic routing locks saved you ₹120!</span>
      </div>
    </motion.div>
  );
}

export default function NextTripPreview() {
  const [screenIdx, setScreenIdx] = useState(0);
  const screen = SCREENS[screenIdx];

  useEffect(() => {
    const t = setTimeout(() => setScreenIdx(i => (i + 1) % SCREENS.length), DURATIONS[screen]);
    return () => clearTimeout(t);
  }, [screenIdx, screen]);

  const screenMap: Record<Screen, React.ReactElement> = {
    search: <Search />, results: <Results />, seats: <Seats />,
    optimizer: <Optimizer />, checkout: <Checkout />, success: <Success />,
  };

  return (
    <div className="relative w-full h-full min-h-[270px]">
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-30 bg-slate-950/80 border border-slate-850/50 p-1 px-2.5 rounded-full backdrop-blur-md">
        {SCREENS.map((s, i) => (
          <button 
            key={s} 
            onClick={() => setScreenIdx(i)}
            className={`h-1 rounded-full transition-all duration-300 ${i === screenIdx ? 'w-4.5 bg-blue-400' : 'w-1 bg-slate-650 hover:bg-slate-500'}`} 
          />
        ))}
      </div>
      <AnimatePresence mode="wait">{screenMap[screen]}</AnimatePresence>
    </div>
  );
}

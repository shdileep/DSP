import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Flame, 
  Droplets, 
  Brain, 
  MessageSquare, 
  Zap, 
  Heart, 
  Award, 
  ChevronRight, 
  Check, 
  Signal, 
  Wifi, 
  Battery,
  Footprints,
  Clock,
  Apple,
  Coffee,
  CheckCircle2
} from 'lucide-react';
import fitmitraImg from '../../assets/images/Fitmitra.png';

const SCREENS = ['splash', 'signin', 'onboard', 'processing', 'dashboard', 'chat'] as const;
type Screen = typeof SCREENS[number];

const DURATIONS: Record<Screen, number> = {
  splash: 2500, signin: 3200, onboard: 4800, processing: 4500, dashboard: 7000, chat: 4500
};

const variants = {
  enter: { opacity: 0, y: 15, scale: 0.98 },
  center: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -12, scale: 0.98 },
};

/* ── Screen Status Header ── */
function HeaderBar({ title, sub }: { title: string, sub?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800/60 pb-2 mb-3 shrink-0 select-none">
      <div>
        <p className="text-emerald-450 text-[6.5px] font-mono uppercase tracking-widest font-extrabold">{title}</p>
        {sub && <p className="text-white font-extrabold text-[10px] mt-0.5 tracking-tight">{sub}</p>}
      </div>
      <div className="flex items-center gap-1.5 text-[7px] font-mono text-slate-450">
        <span>09:41 AM</span>
        <div className="flex items-center gap-0.5">
          <Signal className="w-2 h-2 text-slate-500" />
          <Wifi className="w-2 h-2 text-slate-500" />
          <Battery className="w-2.5 h-2.5 text-slate-500" />
        </div>
      </div>
    </div>
  );
}

/* ──────── Splash Screen ──────── */
function Splash() {
  return (
    <motion.div key="splash" variants={variants} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.4 }} className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center"
      style={{ background: 'linear-gradient(135deg, #020617 0%, #061f12 50%, #020617 100%)' }}>
      
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1],
          boxShadow: ['0 0 20px #10b98120', '0 0 35px #10b98140', '0 0 20px #10b98120']
        }} 
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center border border-emerald-300/30 mb-4"
      >
        <Activity className="w-9 h-9 text-white animate-pulse" />
      </motion.div>
      <span className="text-white font-extrabold text-xl tracking-tight bg-clip-text bg-gradient-to-r from-white to-slate-400">FitMitra</span>
      <span className="text-emerald-400 text-[9px] font-mono tracking-widest font-bold mt-1">AI FITNESS PARTNER</span>
      
      <div className="mt-8 flex gap-1.5">
        {[0, 1, 2].map(i => (
          <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.2, 0.9] }}
            transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.3 }} />
        ))}
      </div>
    </motion.div>
  );
}

/* ──────── Sign‑In Screen ──────── */
function SignIn() {
  const [typedEmail, setTypedEmail] = useState('');
  const emailVal = 'dileep@vit.edu';
  
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTypedEmail(emailVal.slice(0, i));
      if (i >= emailVal.length) clearInterval(t);
    }, 100);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div key="signin" variants={variants} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.4 }} className="absolute inset-0 flex flex-col items-center justify-center p-6 gap-4 text-left"
      style={{ background: 'linear-gradient(180deg, #020617 0%, #05160d 100%)' }}>
      
      <div className="text-center space-y-1 w-full shrink-0">
        <p className="text-emerald-400 text-[8.5px] font-mono uppercase tracking-widest font-bold">SECURE PASS PORTAL</p>
        <h2 className="text-white font-extrabold text-sm tracking-tight">Access FitMitra Hub</h2>
      </div>

      <div className="w-full space-y-2 mt-1 z-10">
        <div className="w-full h-8.5 bg-slate-900/90 border border-slate-800 rounded-lg px-3 flex items-center justify-between">
          <span className="text-slate-355 text-[9px] font-mono">{typedEmail || '…'}</span>
          {typedEmail === emailVal && <Check className="w-3 h-3 text-emerald-400" />}
        </div>
        <div className="w-full h-8.5 bg-slate-900/90 border border-slate-800 rounded-lg px-3 flex items-center justify-between">
          <span className="text-slate-500 text-[9px] font-mono">••••••••••••</span>
        </div>
      </div>

      <button className="w-full h-8.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center text-white font-extrabold text-[10px] shadow-[0_0_20px_#10b98130] hover:shadow-[0_0_25px_#10b98150] transition-all z-10">
        Sign In to Portal
      </button>
      
      <div className="w-full h-8.5 bg-slate-900/60 border border-slate-800/80 rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-900/80 transition-colors z-10">
        <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500" />
        <span className="text-slate-300 text-[9.5px] font-bold">Sign in with Google</span>
      </div>

      {/* Floating biometrics */}
      {[Heart, Flame, Droplets].map((Icon, i) => (
        <motion.div key={i} className="absolute pointer-events-none text-emerald-400/10"
          style={{ top: `${15 + i * 22}%`, right: `${6 + i * 3}%` }}
          animate={{ y: [0, -6, 0], rotate: [0, 8, 0], scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3.5 + i * 0.8, delay: i * 0.4 }}>
          <Icon className="w-6 h-6" />
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ──────── Onboarding Screen ──────── */
const STEPS = ['Biometrics', 'Core Goal', 'Activity Level'];
function Onboard() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % STEPS.length), 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div key="onboard" variants={variants} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.4 }} className="absolute inset-0 flex flex-col p-4.5 gap-3 text-left"
      style={{ background: 'linear-gradient(180deg, #020617 0%, #04160e 100%)' }}>
      
      <div className="flex items-center justify-between select-none">
        <span className="text-emerald-400 text-[7px] font-mono uppercase tracking-widest font-bold">SETUP ENGINE</span>
        <div className="flex gap-1">
          {STEPS.map((_, i) => (
            <div key={i} className={`h-1 w-6 rounded-full transition-all duration-500 ${i <= step ? 'bg-emerald-400' : 'bg-slate-800'}`} />
          ))}
        </div>
      </div>
      
      <h2 className="text-white font-extrabold text-sm tracking-tight">Your {STEPS[step]}</h2>
      
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="age" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-3">
              <p className="text-[9.5px] text-slate-400 font-medium">Select your current age range:</p>
              <div className="grid grid-cols-3 gap-2">
                {[18, 22, 25, 28, 32, 36].map(age => (
                  <div key={age} className={`py-1.5 rounded-lg text-[9px] font-extrabold border text-center font-mono transition-all ${
                    age === 25 
                      ? 'bg-emerald-500 text-white border-emerald-400 shadow-[0_0_12px_#10b98120]' 
                      : 'bg-slate-900 border-slate-850 text-slate-500'
                  }`}>
                    {age} YRS
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="goal" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-2">
              {['Lose Fat / Lean', 'Build Muscle Mass', 'Cardio / Stay Fit'].map((g, i) => (
                <div key={g} className={`flex items-center justify-between p-2 rounded-xl border text-[9.5px] font-bold transition-all ${
                  i === 0 
                    ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300' 
                    : 'border-slate-800/80 bg-slate-900/40 text-slate-500'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${i === 0 ? 'bg-emerald-500' : 'bg-slate-800'}`}>
                      {i === 0 && <Check className="w-2.5 h-2.5 text-white" />}
                    </div>
                    <span>{g}</span>
                  </div>
                  <span className="text-[7px] font-mono text-slate-555">{i === 0 ? 'RECOMMENDED' : ''}</span>
                </div>
              ))}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="activity" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-2">
              {['Sedentary (Office)', 'Moderate (3-4x/week)', 'Hyper Active (Daily)'].map((a, i) => (
                <div key={a} className={`flex items-center gap-2.5 p-2 rounded-xl border text-[9.5px] font-bold transition-all ${
                  i === 1 
                    ? 'border-cyan-500/60 bg-cyan-500/10 text-cyan-300' 
                    : 'border-slate-800/80 bg-slate-900/40 text-slate-500'
                }`}>
                  <Zap className={`w-3.5 h-3.5 ${i === 1 ? 'text-cyan-400 animate-pulse' : 'text-slate-700'}`} />
                  <span>{a}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button className="mt-auto h-8.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center gap-1.5 text-white font-extrabold text-[10px] shadow-[0_0_12px_#10b98120] select-none">
        Initialize Core <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}

/* ──────── ML Pose Classifier Screen ──────── */
function Processing() {
  const [angle, setAngle] = useState(90);
  const [pulseScale, setPulseScale] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setAngle(a => {
        const next = a + 1;
        if (next > 115) {
          setPulseScale(1.15);
          setTimeout(() => setPulseScale(1), 150);
          return 75;
        }
        return next;
      });
    }, 45);
    return () => clearInterval(t);
  }, []);

  const isFormOptimal = angle >= 90 && angle <= 100;

  return (
    <motion.div key="proc" variants={variants} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.4 }} className="absolute inset-0 flex flex-col p-4 text-left"
      style={{ background: 'linear-gradient(135deg, #020617 0%, #021a1f 100%)' }}>
      
      <HeaderBar title="AI Camera Form Analyzer" sub="ML Pose Estimation Active" />

      {/* Camera Simulator Screen */}
      <div className="flex-1 bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden relative flex items-center justify-center p-2.5">
        
        {/* HUD lines */}
        <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-emerald-500/60" />
        <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-emerald-500/60" />
        <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-emerald-500/60" />
        <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-emerald-500/60" />

        <div className="absolute inset-0 bg-[radial-gradient(#10b98103_1px,transparent_1px)] bg-[size:10px_10px]" />

        {/* Joint Graph SVG */}
        <svg viewBox="0 0 200 120" className="w-full h-full relative z-10">
          <defs>
            <filter id="glow-emerald" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Skeleton nodes */}
          <circle cx="100" cy="24" r="6" fill="#020617" stroke="#10b981" strokeWidth="1.5" />
          <line x1="100" y1="30" x2="100" y2="55" stroke="#10b981" strokeWidth="2" />
          <line x1="100" y1="35" x2="80" y2="40" stroke="#10b981" strokeWidth="1.5" />
          <line x1="80" y1="40" x2="65" y2="30" stroke="#10b981" strokeWidth="1.5" />
          <line x1="100" y1="55" x2="90" y2="82" stroke="#10b981" strokeWidth="2.5" />
          <line x1="90" y1="82" x2="120" y2="88" stroke="#10b981" strokeWidth="2.5" />
          <line x1="120" y1="88" x2="105" y2="110" stroke="#10b981" strokeWidth="2.5" />

          {/* Glowing Knee Joint */}
          <motion.circle 
            cx="120" 
            cy="88" 
            r="4.5" 
            fill={isFormOptimal ? '#10b981' : '#eab308'} 
            animate={{ scale: pulseScale }}
            filter="url(#glow-emerald)" 
          />

          <text x="130" y="91" fill={isFormOptimal ? '#34d399' : '#fbbf24'} fontSize="8" fontWeight="bold" className="font-mono">
            {angle}° {isFormOptimal ? 'OK' : 'DEEP'}
          </text>

          <rect x="50" y="15" width="105" height="100" rx="4" fill="none" stroke={isFormOptimal ? '#10b981' : '#eab308'} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        </svg>

        <div className="absolute bottom-2.5 left-2.5 bg-slate-900/90 border border-slate-800 px-2 py-1 rounded-lg flex items-center gap-1.5 shadow-md">
          <span className={`w-1.5 h-1.5 rounded-full ${isFormOptimal ? 'bg-emerald-400 animate-ping' : 'bg-yellow-400 animate-ping'}`} />
          <span className="text-[7.5px] font-mono text-slate-300 font-extrabold uppercase">
            {isFormOptimal ? 'SQUAT FORM VALID' : 'SPINE TILT WARNING'}
          </span>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 text-[7.5px] font-mono text-slate-500 shrink-0">
        <div className="bg-slate-900/40 border border-slate-850 p-1.5 rounded-lg">
          <p className="leading-none text-slate-550 uppercase">ML Classifier Core</p>
          <p className="text-white font-extrabold mt-1">pose_landmark_v2.tflite</p>
        </div>
        <div className="bg-slate-900/40 border border-slate-850 p-1.5 rounded-lg">
          <p className="leading-none text-slate-550 uppercase">Pose Calibration</p>
          <p className="text-emerald-400 font-extrabold mt-1">Joint Alignment: 94.2%</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ──────── Dashboard Screen (Richer Visuals & Live stats trackers) ──────── */
function Dashboard() {
  const [pulsePoints, setPulsePoints] = useState<number[]>([40, 42, 40, 41, 40, 55, 30, 70, 35, 42, 40, 41, 40]);
  const [steps, setSteps] = useState(6420);

  // Live Steps Tracker counter
  useEffect(() => {
    const t = setInterval(() => {
      setSteps(s => Math.min(s + Math.floor(Math.random() * 4) + 1, 10000));
    }, 850);
    return () => clearInterval(t);
  }, []);

  // ECG cardiac line simulator
  useEffect(() => {
    const t = setInterval(() => {
      setPulsePoints(pts => {
        const next = [...pts.slice(1)];
        const rng = Math.random();
        let point = 40;
        if (rng > 0.88) point = 75;
        else if (rng > 0.74) point = 25;
        else point = 40 + Math.sin(Date.now() / 90) * 1.5;
        next.push(point);
        return next;
      });
    }, 140);
    return () => clearInterval(t);
  }, []);

  const pathD = `M 0 ${pulsePoints[0]} ` + pulsePoints.slice(1).map((p, idx) => `L ${(idx + 1) * 16} ${p}`).join(' ');

  const mealPlan = [
    { time: '07:30 AM', type: 'Pre-Workout', icon: <Coffee className="w-3 h-3 text-amber-400" />, food: 'Oats with almonds, black coffee' },
    { time: '09:30 AM', type: 'Post-Workout', icon: <Flame className="w-3 h-3 text-emerald-400" />, food: 'Whey isolate shake + 1 banana' },
    { time: '01:30 PM', type: 'Lunch Split', icon: <Apple className="w-3 h-3 text-blue-400" />, food: 'Grilled chicken breast/paneer, brown rice' },
    { time: '05:30 PM', type: 'Evening Snack', icon: <Clock className="w-3 h-3 text-orange-400" />, food: 'Roasted chickpea salad, green tea' },
    { time: '08:30 PM', type: 'Dinner', icon: <CheckCircle2 className="w-3 h-3 text-emerald-500" />, food: 'Baked salmon/tofu, quinoa, broccoli' }
  ];

  const waterTimings = [
    { time: '08:00 AM', amount: '500 ml', state: 'done' },
    { time: '11:00 AM', amount: '500 ml', state: 'done' },
    { time: '02:00 PM', amount: '500 ml', state: 'done' },
    { time: '05:00 PM', amount: '500 ml', state: 'done' },
    { time: '08:00 PM', amount: '500 ml', state: 'next' },
    { time: '10:00 PM', amount: '500 ml', state: 'locked' }
  ];

  const exercises = [
    { name: 'Barbell Squats', sets: '4x12', state: '94.2% verified depth' },
    { name: 'Decline Pushups', sets: '3x15', state: '92.0% angle correct' },
    { name: 'Dumbbell Rows', sets: '3x10', state: '95.5% lock hold' },
    { name: 'Forearm Planks', sets: '3x60s', state: 'Completed' }
  ];

  return (
    <motion.div key="dash" variants={variants} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.4 }} className="absolute inset-0 flex flex-col p-3.5 gap-2.5 overflow-y-auto no-scrollbar"
      style={{ background: 'linear-gradient(180deg, #030d08 0%, #03080e 100%)' }}>
      
      <HeaderBar title="FitMitra Dashboard" sub="AI Biometrics & Tracking" />

      {/* Grid 1: Calories & Heart Rate */}
      <div className="grid grid-cols-2 gap-2 shrink-0">
        <div className="bg-slate-900/60 rounded-xl p-2.5 border border-emerald-500/15 flex flex-col items-center justify-between shadow-md">
          <p className="text-slate-500 text-[6.5px] font-mono uppercase tracking-wider leading-none">Calorie Ring</p>
          <div className="relative w-9 h-9 mt-1 mb-1">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="14.5" fill="none" stroke="#0e1713" strokeWidth="3.5" />
              <circle cx="18" cy="18" r="14.5" fill="none" stroke="url(#emerald-grad)" strokeWidth="3.5"
                strokeLinecap="round" strokeDasharray="68 91" />
              <defs>
                <linearGradient id="emerald-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[7.5px] font-black text-emerald-400">75%</span>
          </div>
          <p className="text-slate-400 text-[6.5px] font-mono leading-none">1680 / 2240 kcal</p>
        </div>

        <div className="bg-slate-900/60 rounded-xl p-2 border border-cyan-500/15 flex flex-col justify-between shadow-md">
          <div className="flex justify-between items-center px-1">
            <p className="text-slate-500 text-[6.5px] font-mono uppercase tracking-wider leading-none">ECG Pulse</p>
            <div className="flex items-center gap-0.5 text-cyan-400 font-mono text-[7px] font-bold">
              <Heart className="w-2.5 h-2.5 fill-cyan-400 text-cyan-400 animate-pulse" />
              <span>78 BPM</span>
            </div>
          </div>
          <div className="h-9 w-full relative mt-0.5 overflow-hidden">
            <svg viewBox="0 0 200 80" className="w-full h-full">
              <line x1="0" y1="40" x2="200" y2="40" stroke="#1e293b" strokeWidth="0.5" opacity="0.3" />
              <path d={pathD} fill="none" stroke="#06b6d4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Grid 2: Step Tracker & Timed Water Schedule */}
      <div className="grid grid-cols-2 gap-2 shrink-0">
        {/* Step Tracker */}
        <div className="bg-slate-900/60 rounded-xl p-2.5 border border-emerald-500/15 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between text-slate-550">
            <span className="text-[6.5px] font-mono uppercase font-bold tracking-wider">Step Tracker</span>
            <Footprints className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
          </div>
          <div className="my-1.5">
            <span className="text-white font-extrabold text-sm font-mono block tracking-tight">
              {steps.toLocaleString()}
            </span>
            <span className="text-slate-500 text-[6.5px] block font-mono leading-none mt-0.5">/ 10,000 steps</span>
          </div>
          <div className="h-1 bg-slate-950 border border-slate-900 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: `${(steps / 10000) * 100}%` }} />
          </div>
        </div>

        {/* Timed Water Intake */}
        <div className="bg-slate-900/60 rounded-xl p-2 border border-blue-500/15 flex flex-col justify-between shadow-md text-left">
          <div className="flex items-center justify-between text-slate-550 px-0.5">
            <span className="text-[6.5px] font-mono uppercase font-bold tracking-wider">Water Timings</span>
            <Droplets className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          </div>
          
          <div className="grid grid-cols-3 gap-0.5 mt-1 shrink-0">
            {waterTimings.map((wt, i) => (
              <div key={i} className={`p-0.5 rounded border text-[5.5px] font-mono text-center flex flex-col justify-between h-5 leading-none ${
                wt.state === 'done' ? 'bg-blue-950/20 border-blue-500/25 text-blue-400' :
                wt.state === 'next' ? 'bg-slate-900 border-cyan-500/30 text-cyan-300 animate-pulse' :
                'bg-slate-950/40 border-slate-900 text-slate-650'
              }`}>
                <span>{wt.time.split(' ')[0]}</span>
                <span className="font-extrabold text-[5px] mt-0.5">{wt.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timed Meal Plan (Food with timings) */}
      <div className="bg-slate-900/80 rounded-xl p-2.5 border border-slate-850 shrink-0 text-left">
        <div className="flex items-center justify-between border-b border-slate-850 pb-1 mb-1.5">
          <span className="text-[6.5px] font-mono text-slate-550 font-bold uppercase tracking-wider">Timed AI Meal Schedule</span>
          <span className="text-[6px] text-emerald-450 font-mono">2,240 kcal Target</span>
        </div>
        <div className="space-y-1.5">
          {mealPlan.map((m, i) => (
            <div key={i} className="flex items-center justify-between text-[7.5px] font-mono bg-slate-950/45 p-1 rounded-lg border border-slate-900">
              <div className="flex items-center gap-2">
                {m.icon}
                <div>
                  <span className="text-white font-extrabold text-[8px]">{m.food}</span>
                  <span className="text-slate-550 text-[6.5px] block leading-none">{m.type}</span>
                </div>
              </div>
              <span className="text-slate-400 font-bold tracking-tight bg-slate-900 border border-slate-850 px-1 rounded-md">
                {m.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Exercises Showing */}
      <div className="bg-slate-900/80 rounded-xl p-2.5 border border-slate-850 shrink-0 text-left">
        <div className="flex items-center justify-between border-b border-slate-850 pb-1 mb-1.5">
          <span className="text-[6.5px] font-mono text-slate-550 font-bold uppercase tracking-wider">Active Workout Programs</span>
          <span className="text-[6px] text-cyan-455 font-mono">AI Joint Tracking</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {exercises.map((ex, i) => (
            <div key={i} className="p-2 rounded-lg bg-slate-950/60 border border-slate-900 flex flex-col justify-between">
              <div className="flex justify-between items-baseline">
                <span className="text-white font-bold text-[8px]">{ex.name}</span>
                <span className="text-cyan-400 font-mono text-[7px]">{ex.sets}</span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-[6.5px] text-slate-500 font-mono leading-none">
                <span className={`w-1 h-1 rounded-full ${ex.state === 'Completed' ? 'bg-emerald-400' : 'bg-cyan-400 animate-pulse'}`} />
                <span>{ex.state}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View Platform snapshot */}
      <div className="relative rounded-xl overflow-hidden border border-slate-850 h-16 group/phone shrink-0 bg-slate-950 mt-1 select-none">
        <img src={fitmitraImg} alt="FitMitra Application" className="w-full h-full object-cover opacity-35 group-hover/phone:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent flex items-center justify-center p-2">
          <span className="text-white text-[8px] font-bold bg-slate-900/90 border border-slate-700/60 px-3 py-1 rounded-full backdrop-blur-sm shadow-md">View Biometrics Telemetry</span>
        </div>
        <motion.div 
          animate={{ y: [-64, 64] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
          className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-450/40 to-transparent pointer-events-none" 
        />
      </div>
    </motion.div>
  );
}

/* ──────── AI Chat Screen ──────── */
const AI_MSGS = [
  'Biometrics sync complete. Daily target thresholds set: 2,240 kcal & 4.0L Water.',
  'Protein target: 140g. Scheduled Pre-Workout Oats at 07:30 AM & Post-Workout shake at 09:30 AM.',
  'Pose Tracker calibrated. Squats form accuracy verified at 94.2%. Let\'s run it! 💪'
];

function Chat() {
  const [msgs, setMsgs] = useState<string[]>([]);
  
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      if (i < AI_MSGS.length) { 
        setMsgs(m => [...m, AI_MSGS[i]]); 
        i++; 
      }
      else clearInterval(t);
    }, 1250);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div key="chat" variants={variants} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.4 }} className="absolute inset-0 flex flex-col p-3.5 gap-3 text-left"
      style={{ background: 'linear-gradient(180deg, #020617 0%, #04120a 100%)' }}>
      
      <div className="flex items-center gap-2 border-b border-slate-900 pb-2 relative z-10 select-none">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-450 to-teal-500 flex items-center justify-center text-white shadow-md">
          <Brain className="w-4 h-4 animate-pulse" />
        </div>
        <div>
          <p className="text-white font-extrabold text-[10px] tracking-tight">DeepFit AI Coach</p>
          <div className="flex items-center gap-1 leading-none">
            <span className="w-1.2 h-1.2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[7.5px] font-mono text-emerald-455">Active ML Model pipeline</span>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-2.5 overflow-hidden justify-end flex flex-col no-scrollbar">
        <AnimatePresence>
          {msgs.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10, y: 5 }} animate={{ opacity: 1, x: 0, y: 0 }}
              className="flex gap-2 items-start max-w-[90%]">
              <div className="w-4.5 h-4.5 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 shrink-0 mt-0.5 flex items-center justify-center text-white text-[8px] font-black shadow-sm">
                AI
              </div>
              <div className="bg-slate-900 border border-slate-850 rounded-2xl rounded-tl-none p-2 text-[8.5px] text-slate-200 leading-normal font-medium shadow-md">
                {m}
                {/* Embed custom Macro chart inside the second message block */}
                {i === 1 && (
                  <div className="mt-2 p-1.5 bg-slate-950/80 border border-slate-900 rounded-lg flex items-center justify-between gap-2.5">
                    <span className="text-[6.5px] text-slate-500 font-mono">TARGET SPLIT:</span>
                    <div className="flex gap-1.5 text-[6.5px] font-mono">
                      <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1 rounded">Prot 40%</span>
                      <span className="text-cyan-400 font-bold bg-cyan-500/10 px-1 rounded">Carb 35%</span>
                      <span className="text-amber-400 font-bold bg-amber-500/10 px-1 rounded">Fat 25%</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {msgs.length < AI_MSGS.length && (
          <div className="flex gap-2 items-center">
            <div className="w-4.5 h-4.5 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 shrink-0 flex items-center justify-center text-white text-[8px] font-black">
              AI
            </div>
            <div className="flex gap-1 p-2 bg-slate-900 border border-slate-850 rounded-xl rounded-tl-none">
              {[0, 1, 2].map(i => (
                <motion.span key={i} className="w-1 h-1 rounded-full bg-emerald-400"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.25 }} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 relative z-10 pt-1.5 border-t border-slate-900/60 shrink-0 select-none">
        <div className="flex-1 h-7.5 bg-slate-900 border border-slate-850 rounded-xl px-3 flex items-center">
          <span className="text-slate-500 text-[8px]">Ask AI Coach about nutrition matrix…</span>
        </div>
        <button className="w-7.5 h-7.5 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-[0_0_12px_#10b98130]">
          <Award className="w-3.5 h-3.5 text-white" />
        </button>
      </div>
    </motion.div>
  );
}

export default function FitMitraPreview() {
  const [screenIdx, setScreenIdx] = useState(0);
  const screen = SCREENS[screenIdx];

  useEffect(() => {
    const t = setTimeout(() => setScreenIdx(i => (i + 1) % SCREENS.length), DURATIONS[screen]);
    return () => clearTimeout(t);
  }, [screenIdx, screen]);

  const screenMap: Record<Screen, React.ReactElement> = {
    splash: <Splash />, signin: <SignIn />, onboard: <Onboard />,
    processing: <Processing />, dashboard: <Dashboard />, chat: <Chat />,
  };

  return (
    <div className="relative w-full h-full min-h-[280px]">
      {/* Screen indicator dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-30 bg-slate-955/80 border border-slate-850/50 p-1 px-2.5 rounded-full backdrop-blur-md">
        {SCREENS.map((s, i) => (
          <button 
            key={s} 
            onClick={() => setScreenIdx(i)}
            className={`h-1.2 rounded-full transition-all duration-300 ${i === screenIdx ? 'w-4.5 bg-emerald-400' : 'w-1.2 bg-slate-650 hover:bg-slate-500'}`} 
          />
        ))}
      </div>
      <AnimatePresence mode="wait">
        {screenMap[screen]}
      </AnimatePresence>
    </div>
  );
}

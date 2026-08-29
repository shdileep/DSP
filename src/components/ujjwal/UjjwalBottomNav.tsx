import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Trash2, 
  Truck, 
  Wallet, 
  Radio, 
  SlidersHorizontal 
} from 'lucide-react';
import { UjjwalTab } from './types';

interface UjjwalBottomNavProps {
  activeTab: UjjwalTab;
  onSelectTab: (tab: UjjwalTab) => void;
  leaveRequestsCount?: number;
  fullBinsCount?: number;
}

export default function UjjwalBottomNav({
  activeTab,
  onSelectTab,
  leaveRequestsCount = 0,
  fullBinsCount = 0
}: UjjwalBottomNavProps) {
  const navItems: { id: UjjwalTab; icon: React.ComponentType<{ className?: string }>; tooltip: string; badge?: number }[] = [
    { id: 'drivers', icon: Users, tooltip: 'Live Drivers' },
    { id: 'bins', icon: Trash2, tooltip: 'Bins Monitoring', badge: fullBinsCount },
    { id: 'tracking', icon: Truck, tooltip: 'Driver Tracking' },
    { id: 'payroll', icon: Wallet, tooltip: 'Payroll' },
    { id: 'news', icon: Radio, tooltip: 'News & Events', badge: leaveRequestsCount },
    { id: 'management', icon: SlidersHorizontal, tooltip: 'Management & Settings' },
  ];

  return (
    <div className="w-full flex items-center justify-center p-2.5 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent shrink-0 relative z-30 pointer-events-auto">
      {/* Solid Rounded Rectangle Navigation Bar */}
      <nav 
        aria-label="Main Navigation"
        className="flex items-center gap-1.5 sm:gap-3 bg-slate-900/95 border border-slate-700/80 px-3 sm:px-5 py-2 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl"
      >
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              title={item.tooltip}
              aria-label={item.tooltip}
              className={`relative p-2 sm:p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer group ${
                isActive 
                  ? 'text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.25)]' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/70 border border-transparent'
              }`}
            >
              {/* Active Indicator Underline / Glow Pill */}
              {isActive && (
                <motion.div
                  layoutId="activeNavPill"
                  className="absolute inset-0 rounded-xl bg-emerald-500/10 border border-emerald-500/30 -z-10"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}

              <Icon className={`w-5 h-5 sm:w-5.5 sm:h-5.5 transition-transform group-hover:scale-110 ${isActive ? 'scale-105 stroke-[2.2]' : 'stroke-[1.8]'}`} />

              {/* Optional Subtle Badge for Alerts */}
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse ring-2 ring-slate-900" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

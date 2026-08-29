import React, { useState } from 'react';
import { 
  Bell, 
  Settings, 
  User, 
  Maximize2, 
  Minimize2, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  X,
  ShieldCheck,
  Radio,
  ChevronDown
} from 'lucide-react';
import ujjwalHubLogo from '../../assets/images/ujjwalhub.png';
import { NotificationItem, UjjwalTab } from './types';

interface UjjwalHeaderProps {
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onNavigate: (tab: UjjwalTab) => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export default function UjjwalHeader({
  notifications,
  onMarkAllRead,
  onNavigate,
  isFullscreen,
  onToggleFullscreen
}: UjjwalHeaderProps) {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-13 bg-slate-950/90 border-b border-emerald-500/15 backdrop-blur-md px-3 sm:px-4 flex items-center justify-between shrink-0 relative z-40 select-none">
      
      {/* ── Left Side: Ujjwal Hub Logo & Title ── */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center p-1 shadow-sm overflow-hidden group hover:border-emerald-400 transition-colors">
          <img 
            src={ujjwalHubLogo} 
            alt="Ujjwal Hub" 
            className="w-full h-full object-contain filter drop-shadow group-hover:scale-105 transition-transform" 
          />
        </div>
        <div className="text-left">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-1.5">
              Ujjwal Hub
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </h1>
            <span className="hidden sm:inline-flex text-[8px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold uppercase tracking-wider">
              Smart Waste Command
            </span>
          </div>
          <p className="text-[7.5px] font-mono text-slate-400 hidden xs:block">
            IoT Sensor Fleet Monitoring • Hyd Sector 4
          </p>
        </div>
      </div>

      {/* ── Center: Live Operational Status Pills ── */}
      <div className="hidden md:flex items-center gap-2 text-[8px] font-mono">
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
          <Radio className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
          <span>GPS L1/L5 Locked</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
          <ShieldCheck className="w-2.5 h-2.5 text-cyan-400" />
          <span>Fleet Server: Online</span>
        </div>
      </div>

      {/* ── Right Side: Top-Right Controls (Profile, Settings, Notifications, Fullscreen) ── */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        
        {/* Fullscreen Toggle Button */}
        {onToggleFullscreen && (
          <button
            onClick={onToggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        )}

        {/* Notification / Bell Icon */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifs(!showNotifs);
              setShowProfile(false);
            }}
            className="relative p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Operational Notifications"
          >
            <Bell className="w-3.5 h-3.5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-white font-mono text-[7.5px] font-bold flex items-center justify-center animate-pulse shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifs && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-slate-900/95 border border-slate-700/80 rounded-xl shadow-2xl p-3 backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150 text-left">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-white">Operational Alerts</span>
                  {unreadCount > 0 && (
                    <span className="text-[8px] font-mono bg-rose-500/20 text-rose-400 px-1.5 py-0.2 rounded border border-rose-500/30">
                      {unreadCount} New
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={onMarkAllRead}
                    className="text-[8px] font-mono text-emerald-400 hover:underline"
                  >
                    Mark read
                  </button>
                  <button 
                    onClick={() => setShowNotifs(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 max-h-60 overflow-y-auto no-scrollbar">
                {notifications.map(n => (
                  <div 
                    key={n.id}
                    className={`p-2 rounded-lg border text-[9px] transition-colors ${
                      n.read 
                        ? 'bg-slate-950/50 border-slate-850 text-slate-400' 
                        : 'bg-slate-850/90 border-slate-700 text-slate-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-[9.5px] text-white flex items-center gap-1">
                        {n.type === 'alert' && <AlertTriangle className="w-2.5 h-2.5 text-rose-400" />}
                        {n.type === 'warning' && <AlertTriangle className="w-2.5 h-2.5 text-amber-400" />}
                        {n.type === 'success' && <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />}
                        {n.type === 'info' && <Info className="w-2.5 h-2.5 text-cyan-400" />}
                        {n.title}
                      </span>
                      <span className="text-[7.5px] font-mono text-slate-500">{n.time}</span>
                    </div>
                    <p className="text-[8px] leading-relaxed text-slate-300">{n.message}</p>
                  </div>
                ))}
              </div>

              <div className="mt-2 pt-2 border-t border-slate-800 text-center">
                <button
                  onClick={() => {
                    setShowNotifs(false);
                    onNavigate('news');
                  }}
                  className="text-[8.5px] font-mono text-cyan-400 hover:underline font-bold"
                >
                  View All Events &amp; Activity Feed →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Settings Icon */}
        <button
          onClick={() => {
            onNavigate('management');
            setShowNotifs(false);
            setShowProfile(false);
          }}
          className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
          title="Management & Settings"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>

        {/* User Profile Icon */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifs(false);
            }}
            className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title="User Profile"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-950 font-black text-[9px]">
              <User className="w-3 h-3 text-white" />
            </div>
            <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-900/95 border border-slate-700/80 rounded-xl shadow-2xl p-3 backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150 text-left">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-white text-xs shadow">
                  DG
                </div>
                <div>
                  <span className="font-bold text-xs text-white block leading-tight">Dileep Galla</span>
                  <span className="text-[7.5px] font-mono text-emerald-400 block">Operations Director</span>
                </div>
              </div>
              <div className="space-y-1 text-[8.5px] text-slate-300 font-mono">
                <div className="flex justify-between py-1 border-b border-slate-850">
                  <span className="text-slate-500">Employee ID:</span>
                  <span className="text-white font-bold">DIR-HYD-01</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-850">
                  <span className="text-slate-500">Station:</span>
                  <span className="text-white">Hyderabad Central</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Access Level:</span>
                  <span className="text-emerald-400 font-bold">Admin Root</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-800 flex justify-between">
                <button 
                  onClick={() => {
                    setShowProfile(false);
                    onNavigate('payroll');
                  }}
                  className="text-[8px] font-mono text-cyan-400 hover:underline"
                >
                  Payroll
                </button>
                <button 
                  onClick={() => {
                    setShowProfile(false);
                    onNavigate('management');
                  }}
                  className="text-[8px] font-mono text-slate-400 hover:text-white"
                >
                  Settings
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </header>
  );
}

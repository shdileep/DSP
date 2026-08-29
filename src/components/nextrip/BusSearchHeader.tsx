import React, { useState } from 'react';
import { 
  Bell, 
  Settings as SettingsIcon, 
  User, 
  Maximize2, 
  Minimize2, 
  ShieldCheck, 
  Sparkles, 
  Headphones, 
  CheckCircle2, 
  Tag, 
  Clock,
  ChevronDown
} from 'lucide-react';
import nextripLogo from '../../assets/images/nextrip.png';
import { ActiveTab } from './types';

interface BusSearchHeaderProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  bookingCount: number;
}

export default function BusSearchHeader({
  activeTab,
  onNavigate,
  isFullscreen,
  onToggleFullscreen,
  bookingCount
}: BusSearchHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      title: '50% Festive Discount Active!',
      desc: 'Use coupon code NEXTRIP50 to save up to ₹500 on all sleeper buses.',
      time: '10m ago',
      unread: true,
      icon: Tag,
      color: 'text-amber-400 bg-amber-500/10'
    },
    {
      id: 2,
      title: 'Hyderabad → Pune Trip Reminder',
      desc: 'Your journey with Vinayaka Travels is scheduled for tomorrow at 08:30 PM.',
      time: '2h ago',
      unread: true,
      icon: Clock,
      color: 'text-sky-400 bg-sky-500/10'
    },
    {
      id: 3,
      title: 'Women Safety Priority Route Confirmed',
      desc: 'Dedicated female-seat row allocated for your safe transit.',
      time: '1d ago',
      unread: false,
      icon: ShieldCheck,
      color: 'text-emerald-400 bg-emerald-500/10'
    }
  ];

  return (
    <header className="h-14 bg-slate-900/95 border-b border-slate-800/90 px-4 sm:px-6 flex items-center justify-between shrink-0 select-none z-30 shadow-md backdrop-blur-md">
      {/* ── TOP LEFT: Application Logo & Name ── */}
      <div 
        onClick={() => onNavigate('search')}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="relative flex items-center justify-center">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500/20 via-blue-600/30 to-indigo-600/20 p-1 border border-sky-400/40 shadow-[0_0_15px_rgba(56,189,248,0.25)] group-hover:border-sky-400 transition-all duration-300">
            <img 
              src={nextripLogo} 
              alt="NextTrip Logo" 
              className="w-full h-full object-contain filter drop-shadow" 
            />
          </div>
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
          </span>
        </div>

        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-base font-black tracking-tight text-white group-hover:text-sky-400 transition-colors">
              NextTrip
            </span>
            <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-sky-500/15 text-sky-400 border border-sky-500/30">
              PC Pro
            </span>
          </div>
          <p className="text-[9px] text-slate-400 font-medium tracking-wide">
            Official Bus Booking Platform
          </p>
        </div>
      </div>

      {/* ── TOP CENTER: Quick Status / Highlights ── */}
      <div className="hidden md:flex items-center gap-4 text-[11px] font-medium text-slate-300">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 shadow-inner">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[10px] text-slate-200">100% Safe & Verified Operators</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[10px] text-amber-300 font-bold">Code: NEXTRIP50 for 50% OFF</span>
        </div>
      </div>

      {/* ── TOP RIGHT: Action Icons (Profile, Settings, Notifications, Fullscreen) ── */}
      <div className="flex items-center gap-2 sm:gap-3 relative">
        {/* Fullscreen Expand Toggle */}
        {onToggleFullscreen && (
          <button
            onClick={onToggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Expand to Full PC Screen"}
            className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 text-sky-400" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        )}

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            title="Notifications & Offers"
            className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-white transition-all relative shadow-sm"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[9px] flex items-center justify-center border-2 border-slate-900 shadow">
              2
            </span>
          </button>

          {/* Notifications Dropdown Modal */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700/90 rounded-xl shadow-2xl z-50 p-3 text-left animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-sky-400" /> Notifications & Alerts
                </span>
                <span className="text-[9px] text-sky-400 font-mono cursor-pointer hover:underline">
                  Mark all as read
                </span>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar">
                {notifications.map(n => {
                  const Icon = n.icon;
                  return (
                    <div 
                      key={n.id} 
                      className={`p-2 rounded-lg border transition-all ${
                        n.unread ? 'bg-slate-800/90 border-slate-700' : 'bg-slate-900/50 border-slate-800/60 opacity-75'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <div className={`p-1 rounded-md shrink-0 ${n.color}`}>
                          <Icon className="w-3 h-3" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[11px] font-bold text-white leading-tight">{n.title}</p>
                          <p className="text-[9.5px] text-slate-300 mt-0.5 leading-snug">{n.desc}</p>
                          <span className="text-[8px] text-slate-500 font-mono block mt-1">{n.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Settings Icon */}
        <button
          onClick={() => onNavigate('settings')}
          title="Settings"
          className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all shadow-sm ${
            activeTab === 'settings' 
              ? 'bg-sky-500/20 border-sky-400 text-sky-300' 
              : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700/80 text-slate-300 hover:text-white'
          }`}
        >
          <SettingsIcon className="w-4 h-4" />
        </button>

        {/* User Profile Icon & Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-lg bg-gradient-to-r from-slate-800 to-slate-850 hover:from-slate-750 hover:to-slate-800 border border-slate-700/80 text-white transition-all shadow-sm group"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shadow">
              D
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-[11px] font-bold leading-none text-white group-hover:text-sky-300 transition-colors">
                Dileep
              </p>
              <span className="text-[8px] text-slate-400 font-mono">Verified Passenger</span>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-white transition-transform" />
          </button>

          {/* Profile Menu Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 p-2 text-left animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-3 py-2 border-b border-slate-800">
                <p className="text-xs font-bold text-white">Dileep Sai Galla</p>
                <p className="text-[9px] text-slate-400 font-mono">dileepgalla200056@gmail.com</p>
              </div>

              <div className="py-1 text-[11px]">
                <button
                  onClick={() => {
                    onNavigate('my_bookings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-3 py-1.5 text-left rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white flex items-center justify-between"
                >
                  <span>My Bookings</span>
                  <span className="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400 text-[9px] font-bold">
                    {bookingCount}
                  </span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('profile');
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-3 py-1.5 text-left rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-sky-400" />
                  <span>Saved Passengers & Profile</span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('offers');
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-3 py-1.5 text-left rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2"
                >
                  <Tag className="w-3.5 h-3.5 text-amber-400" />
                  <span>Exclusive Offers</span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-3 py-1.5 text-left rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2 border-t border-slate-800 mt-1 pt-1.5"
                >
                  <SettingsIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span>Preferences & Settings</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

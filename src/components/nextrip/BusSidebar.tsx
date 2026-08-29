import React from 'react';
import { 
  Search, 
  Ticket, 
  Compass, 
  Tag, 
  Receipt, 
  User, 
  Settings, 
  Headphones, 
  PhoneCall, 
  ShieldCheck,
  ChevronRight,
  Flame
} from 'lucide-react';
import { ActiveTab } from './types';

interface BusSidebarProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
  bookingCount: number;
}

export default function BusSidebar({
  activeTab,
  onNavigate,
  bookingCount
}: BusSidebarProps) {
  const menuItems = [
    {
      id: 'search' as ActiveTab,
      label: 'Bus Search & Menu',
      icon: Search,
      badge: 'Live',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    },
    {
      id: 'my_bookings' as ActiveTab,
      label: 'My Bookings',
      icon: Ticket,
      badge: bookingCount > 0 ? `${bookingCount}` : undefined,
      badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30'
    },
    {
      id: 'my_trips' as ActiveTab,
      label: 'My Trips',
      icon: Compass
    },
    {
      id: 'offers' as ActiveTab,
      label: 'Offers & Discounts',
      icon: Tag,
      badge: '50% OFF',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30 animate-pulse'
    },
    {
      id: 'transactions' as ActiveTab,
      label: 'Transaction History',
      icon: Receipt
    },
    {
      id: 'profile' as ActiveTab,
      label: 'Passenger Profiles',
      icon: User
    },
    {
      id: 'settings' as ActiveTab,
      label: 'Settings & Security',
      icon: Settings
    }
  ];

  const isCurrentTab = (id: ActiveTab) => {
    if (id === 'search' && (activeTab === 'search' || activeTab === 'results' || activeTab === 'seat_selection' || activeTab === 'pickup_drop' || activeTab === 'passenger_details' || activeTab === 'fare_payment')) {
      return true;
    }
    return activeTab === id;
  };

  return (
    <aside className="w-56 lg:w-60 bg-slate-900/90 border-r border-slate-800/90 flex flex-col justify-between p-3 shrink-0 select-none backdrop-blur-md">
      {/* ── Main Navigation List ── */}
      <div className="space-y-1">
        <div className="px-3 py-1.5 mb-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
          Navigation
        </div>

        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = isCurrentTab(item.id);

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-sky-500/20 via-sky-600/15 to-transparent text-sky-300 border-l-4 border-sky-400 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70 border-l-4 border-transparent font-medium'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`p-1.5 rounded-lg transition-colors ${
                  isActive ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                }`}>
                  <Icon className="w-4 h-4 shrink-0" />
                </div>
                <span className="text-[11.5px] tracking-tight">{item.label}</span>
              </div>

              <div className="flex items-center gap-1">
                {item.badge && (
                  <span className={`px-1.5 py-0.5 rounded text-[8.5px] font-mono font-bold border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                  isActive ? 'text-sky-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'
                }`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* ── 24/7 Helpline & Assurance Widget ── */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-slate-850 via-slate-900 to-sky-950/40 border border-slate-700/80 shadow-md">
          <div className="flex items-center gap-2 text-sky-400 text-[10px] font-bold">
            <Headphones className="w-3.5 h-3.5 animate-pulse" />
            <span>24x7 Customer Assist</span>
          </div>
          <p className="text-[9px] text-slate-300 mt-1 leading-tight">
            Need emergency assistance with your booking?
          </p>
          <div className="mt-2 flex items-center justify-between pt-1.5 border-t border-slate-800">
            <div className="flex items-center gap-1 text-[9.5px] font-mono text-emerald-400 font-bold">
              <PhoneCall className="w-3 h-3" />
              <span>1800-NEXT-TRIP</span>
            </div>
            <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1 py-0.2 rounded font-mono">
              Toll Free
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[8.5px] text-slate-400 font-mono">
          <ShieldCheck className="w-3 h-3 text-sky-400" />
          <span>IRCTC & Govt Recognized</span>
        </div>
      </div>
    </aside>
  );
}

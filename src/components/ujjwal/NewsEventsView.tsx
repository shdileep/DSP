import React, { useState } from 'react';
import { 
  Radio, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Truck, 
  Trash2, 
  UserCheck, 
  Filter, 
  Search, 
  ShieldAlert, 
  Calendar,
  Layers,
  Check
} from 'lucide-react';
import { OperationalEventItem } from './types';
import { INITIAL_EVENTS } from './mockData';

export default function NewsEventsView() {
  const [events, setEvents] = useState<OperationalEventItem[]>(INITIAL_EVENTS);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleApproveLeave = (id: string) => {
    setEvents(prev => prev.map(e => {
      if (e.id === id) {
        return { ...e, status: 'Approved', description: `${e.driverName}'s leave request was APPROVED by Dispatch Supervisor.` };
      }
      return e;
    }));
  };

  const handleRejectLeave = (id: string) => {
    setEvents(prev => prev.map(e => {
      if (e.id === id) {
        return { ...e, status: 'Rejected', description: `${e.driverName}'s leave request was REJECTED due to peak route schedule.` };
      }
      return e;
    }));
  };

  const categories = ['All', 'Driver', 'Truck', 'Bin', 'Route'];

  const filteredEvents = events.filter(e => {
    const matchesCat = activeCategory === 'All' ? true : e.category === activeCategory;
    const matchesSearch = 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.driverName && e.driverName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (e.truckId && e.truckId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (e.location && e.location.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  const pendingLeaveRequests = events.filter(e => e.isLeaveRequest && e.status === 'Pending');

  return (
    <div className="space-y-4 text-left font-sans animate-in fade-in duration-200">
      
      {/* ── Top Header Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/70 border border-slate-800 p-3 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-extrabold text-white block">Operations Activity Stream</span>
            <span className="text-[7.5px] font-mono text-slate-400">
              Live Fleet Dispatches, Driver Leave Requests &amp; Bin Telemetry
            </span>
          </div>
        </div>

        {/* Category Filter Pills & Search */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-44">
            <Search className="w-3 h-3 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search event, driver..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-7 pr-2 py-1 text-[8.5px] text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-xl border border-slate-800 text-[8px] font-mono">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2 py-1 rounded-lg transition-all ${
                  activeCategory === cat ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Pending Driver Leave Requests Spotlight (Section 13) ── */}
      {pendingLeaveRequests.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/40 to-slate-900/90 border border-amber-500/30 backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs font-extrabold text-amber-300 font-mono uppercase tracking-wider">
                Action Required: Driver Leave Requests ({pendingLeaveRequests.length})
              </span>
            </div>
            <span className="text-[7.5px] font-mono text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Shift Roster Review
            </span>
          </div>

          <div className="space-y-2">
            {pendingLeaveRequests.map(leave => (
              <div 
                key={leave.id}
                className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[9px] font-mono"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white text-xs">{leave.driverName}</span>
                    <span className="text-amber-400 text-[8px]">Dates: {leave.leaveDates}</span>
                  </div>
                  <p className="text-slate-400 text-[8px] mt-0.5">{leave.description} ({leave.relativeTime})</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleRejectLeave(leave.id)}
                    className="px-3 py-1 bg-slate-850 hover:bg-red-500/20 text-red-400 border border-slate-700 hover:border-red-500/40 rounded-xl font-bold text-[8.5px] flex items-center gap-1 transition-colors"
                  >
                    <XCircle className="w-3 h-3" />
                    Reject
                  </button>
                  <button
                    onClick={() => handleApproveLeave(leave.id)}
                    className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-extrabold text-[8.5px] flex items-center gap-1 transition-colors shadow"
                  >
                    <Check className="w-3 h-3" />
                    Approve Leave
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Operational Event Feed (Section 14) ── */}
      <div className="space-y-2 max-h-[440px] overflow-y-auto no-scrollbar">
        {filteredEvents.map(evt => {
          const isCompleted = evt.status === 'Completed' || evt.status === 'Approved';
          const isAlert = evt.status === 'Alert';
          const isRejected = evt.status === 'Rejected';

          return (
            <div
              key={evt.id}
              className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all backdrop-blur-md flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                {/* Event Category Icon */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  evt.category === 'Driver' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                  evt.category === 'Truck' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' :
                  evt.category === 'Bin' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' :
                  'bg-purple-500/15 text-purple-400 border border-purple-500/30'
                }`}>
                  {evt.category === 'Driver' && <UserCheck className="w-4 h-4" />}
                  {evt.category === 'Truck' && <Truck className="w-4 h-4" />}
                  {evt.category === 'Bin' && <Trash2 className="w-4 h-4" />}
                  {evt.category === 'Route' && <Layers className="w-4 h-4" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-white text-xs">{evt.title}</h4>
                    <span className="text-[7.5px] font-mono text-slate-500">
                      • {evt.relativeTime}
                    </span>
                  </div>
                  
                  <p className="text-[8.5px] text-slate-300 font-mono mt-0.5 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="flex items-center gap-3 mt-1.5 text-[7.5px] font-mono text-slate-400">
                    {evt.location && <span>📍 {evt.location}</span>}
                    {evt.truckId && <span className="text-cyan-400 font-bold">🚛 {evt.truckId}</span>}
                    {evt.binId && <span className="text-amber-400 font-bold">🗑️ {evt.binId}</span>}
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="shrink-0 text-right">
                <span className={`px-2 py-0.5 rounded-full text-[7.5px] font-mono font-bold uppercase ${
                  isCompleted ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                  isAlert ? 'bg-red-500/15 text-red-400 border border-red-500/30' :
                  isRejected ? 'bg-slate-800 text-slate-400' :
                  'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                }`}>
                  {evt.status}
                </span>
                <span className="block text-[6.5px] font-mono text-slate-500 mt-1">
                  {evt.timestamp.split(',')[1]}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Phone, 
  Truck, 
  MapPin, 
  Clock, 
  Star, 
  Activity, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  Filter,
  UserCheck,
  UserX
} from 'lucide-react';
import { DriverItem } from './types';

interface ActiveDriversViewProps {
  drivers: DriverItem[];
  onSelectDriver?: (driver: DriverItem) => void;
  onDispatchDriver?: (driver: DriverItem) => void;
}

export default function ActiveDriversView({
  drivers,
  onSelectDriver,
  onDispatchDriver
}: ActiveDriversViewProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDriverModal, setSelectedDriverModal] = useState<DriverItem | null>(null);

  const filteredDrivers = drivers.filter(d => {
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'active' ? d.isActive :
      !d.isActive;

    const matchesSearch = 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.assignedTruck.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.currentLocation.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const activeCount = drivers.filter(d => d.isActive).length;
  const inactiveCount = drivers.filter(d => !d.isActive).length;

  return (
    <div className="space-y-4 text-left font-sans animate-in fade-in duration-200">
      
      {/* ── Top Summary & Filter Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/70 border border-slate-800 p-3 rounded-2xl backdrop-blur-md">
        
        {/* Left: Summary Metrics */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-white block">Driver Directory</span>
              <span className="text-[7.5px] font-mono text-slate-400">
                {drivers.length} Total Registered Personnel
              </span>
            </div>
          </div>

          <div className="h-6 w-[1px] bg-slate-800 hidden xs:block" />

          <div className="flex items-center gap-2 text-[8px] font-mono">
            <span className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              {activeCount} Active
            </span>
            <span className="flex items-center gap-1 bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
              {inactiveCount} Inactive
            </span>
          </div>
        </div>

        {/* Right: Search & Quick Filter Pills */}
        <div className="flex items-center gap-2">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3 h-3 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search driver, ID, truck..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-7 pr-2.5 py-1 text-[8.5px] text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-xl border border-slate-800 text-[8px] font-mono">
            <button
              onClick={() => setFilter('all')}
              className={`px-2 py-1 rounded-lg transition-all ${filter === 'all' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-2 py-1 rounded-lg transition-all ${filter === 'active' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('inactive')}
              className={`px-2 py-1 rounded-lg transition-all ${filter === 'inactive' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Inactive
            </button>
          </div>
        </div>

      </div>

      {/* ── Driver Cards Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filteredDrivers.map(driver => (
          <div
            key={driver.id}
            onClick={() => setSelectedDriverModal(driver)}
            className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer relative overflow-hidden backdrop-blur-md hover:scale-[1.01] ${
              driver.isActive 
                ? 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/50 shadow-lg' 
                : 'bg-slate-950/70 border-slate-850 opacity-80 hover:opacity-100 hover:border-slate-700'
            }`}
          >
            {/* Top Row: Name, ID, Active/Inactive Badge */}
            <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-sm ${
                  driver.isActive 
                    ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white ring-2 ring-emerald-500/20' 
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {driver.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-xs tracking-tight">{driver.name}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5 font-mono text-[8px] text-slate-400">
                    <span className="bg-slate-950 px-1.5 py-0.2 rounded border border-slate-800 font-bold text-slate-300">
                      {driver.empId}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                      <Star className="w-2.5 h-2.5 fill-amber-400" />
                      {driver.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-right">
                <span className={`inline-flex items-center gap-1 text-[7.5px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                  driver.isActive 
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${driver.isActive ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
                  {driver.status}
                </span>
                <span className="block text-[7px] font-mono text-slate-500 mt-1">
                  Last: {driver.lastActive}
                </span>
              </div>
            </div>

            {/* Middle Details: Current Activity & Truck Assignment */}
            <div className="py-2.5 space-y-1.5 text-[8.5px] font-mono">
              <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-950/60 border border-slate-850">
                <span className="text-slate-400 flex items-center gap-1">
                  <Activity className="w-2.5 h-2.5 text-cyan-400" />
                  Activity:
                </span>
                <span className="text-slate-200 font-bold text-right truncate max-w-[170px]">
                  {driver.currentActivity}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <div className="p-1.5 rounded-lg bg-slate-950/60 border border-slate-850">
                  <span className="text-slate-400 block text-[6.5px] uppercase font-bold flex items-center gap-1">
                    <Truck className="w-2.5 h-2.5 text-emerald-400" />
                    Truck
                  </span>
                  <span className="text-white font-extrabold block mt-0.5">{driver.assignedTruck}</span>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-950/60 border border-slate-850">
                  <span className="text-slate-400 block text-[6.5px] uppercase font-bold flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 text-rose-400" />
                    Location
                  </span>
                  <span className="text-white font-bold block mt-0.5 truncate">{driver.currentLocation.split('—')[0]}</span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Phone, Shift & Quick Action Button */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[7.5px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-2.5 h-2.5 text-slate-500" />
                {driver.shift.split('(')[0]}
              </span>
              <div className="flex items-center gap-1.5">
                <a
                  href={`tel:${driver.phone}`}
                  onClick={e => e.stopPropagation()}
                  className="p-1 rounded bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white transition-colors"
                  title="Call Driver"
                >
                  <Phone className="w-2.5 h-2.5" />
                </a>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onDispatchDriver) onDispatchDriver(driver);
                  }}
                  className="px-2 py-0.8 bg-emerald-500/15 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/30 rounded font-bold transition-colors"
                >
                  Dispatch
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Driver Detail Modal ── */}
      {selectedDriverModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in duration-150"
          onClick={() => setSelectedDriverModal(null)}
        >
          <div 
            className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full p-5 shadow-2xl text-left font-sans"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-3 border-b border-slate-800 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-black text-base flex items-center justify-center shadow-lg">
                  {selectedDriverModal.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">{selectedDriverModal.name}</h3>
                  <p className="text-[8px] font-mono text-emerald-400 font-bold">
                    {selectedDriverModal.empId} • {selectedDriverModal.experience} Experience
                  </p>
                </div>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-mono font-bold uppercase ${
                selectedDriverModal.isActive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
              }`}>
                {selectedDriverModal.status}
              </span>
            </div>

            <div className="space-y-2 text-[9px] font-mono">
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
                <span className="text-slate-500 block text-[7.5px] uppercase font-bold">Current Operational Assignment</span>
                <p className="text-white font-bold text-xs">{selectedDriverModal.currentActivity}</p>
                <p className="text-slate-400 text-[8px]">Location: {selectedDriverModal.currentLocation}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-850">
                  <span className="text-slate-500 block text-[7px] uppercase">Assigned Truck</span>
                  <span className="text-emerald-400 font-extrabold text-xs block mt-0.5">{selectedDriverModal.assignedTruck}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-850">
                  <span className="text-slate-500 block text-[7px] uppercase">Trips Completed Today</span>
                  <span className="text-cyan-400 font-extrabold text-xs block mt-0.5">{selectedDriverModal.completedTripsToday} Trips</span>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
                <div className="flex justify-between text-slate-400 text-[8px]">
                  <span>Shift Schedule:</span>
                  <span className="text-white">{selectedDriverModal.shift}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[8px]">
                  <span>Direct Contact:</span>
                  <span className="text-emerald-400 font-bold">{selectedDriverModal.phone}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[8px]">
                  <span>Driver Safety Rating:</span>
                  <span className="text-amber-400 font-bold">{selectedDriverModal.rating} / 5.0</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setSelectedDriverModal(null)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
              >
                Close
              </button>
              <a
                href={`tel:${selectedDriverModal.phone}`}
                className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold transition-colors shadow"
              >
                Call Driver
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

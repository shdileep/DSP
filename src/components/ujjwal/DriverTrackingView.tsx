import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Gauge, 
  Navigation, 
  BatteryCharging, 
  Fuel, 
  Activity, 
  Clock, 
  ShieldCheck, 
  Search, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { TruckItem, DriverItem } from './types';
import { INITIAL_TRUCKS, INITIAL_DRIVERS } from './mockData';

export default function DriverTrackingView() {
  const [trucks, setTrucks] = useState<TruckItem[]>(INITIAL_TRUCKS);
  const [selectedTruckId, setSelectedTruckId] = useState<string>(INITIAL_TRUCKS[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedTruck = trucks.find(t => t.id === selectedTruckId) || trucks[0];
  const matchedDriver = INITIAL_DRIVERS.find(d => d.empId === selectedTruck.driverId);

  const filteredTrucks = trucks.filter(t => 
    t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.currentTask.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.truckNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 text-left font-sans animate-in fade-in duration-200">
      
      {/* ── Top Header Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/70 border border-slate-800 p-3 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-extrabold text-white block">Real-Time Fleet &amp; Driver Tracking</span>
            <span className="text-[7.5px] font-mono text-slate-400">
              Live GPS Telemetry • {trucks.length} Active Heavy Vehicles
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-56">
          <Search className="w-3 h-3 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Search truck ID, driver name..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-7 pr-2.5 py-1 text-[8.5px] text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* ── Main Two-Column Layout: Fleet Selector + Telemetry & Interactive Map ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        
        {/* Left Column: Fleet List (5 cols) */}
        <div className="lg:col-span-5 space-y-2 max-h-[460px] overflow-y-auto no-scrollbar">
          {filteredTrucks.map(truck => {
            const isSelected = truck.id === selectedTruckId;
            return (
              <div
                key={truck.id}
                onClick={() => setSelectedTruckId(truck.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer backdrop-blur-md ${
                  isSelected 
                    ? 'bg-slate-850 border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30' 
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-start justify-between pb-2 border-b border-slate-800/60">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                      isSelected ? 'bg-cyan-500 text-slate-950 shadow' : 'bg-slate-800 text-slate-300'
                    }`}>
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-xs">{truck.id}</h4>
                      <span className="text-[7.5px] font-mono text-slate-400 block">{truck.truckNumber}</span>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[7.5px] font-mono font-bold uppercase ${
                    truck.status === 'Collecting' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                    truck.status === 'En Route' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' :
                    'bg-slate-800 text-slate-400'
                  }`}>
                    {truck.status}
                  </span>
                </div>

                <div className="py-2 space-y-1 text-[8px] font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Driver:</span>
                    <span className="text-white font-bold">{truck.driverName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Current Task:</span>
                    <span className="text-cyan-300 font-medium truncate max-w-[140px]">{truck.currentTask}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Speed:</span>
                    <span className="text-white font-bold">{truck.speed} km/h</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="pt-1 border-t border-slate-800/60 flex items-center gap-2 font-mono text-[7px] text-slate-400">
                  <span>Route: {truck.routeProgress}%</span>
                  <div className="flex-1 h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cyan-400 rounded-full" 
                      style={{ width: `${truck.routeProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Truck GPS Map & Detailed Telemetry HUD (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          
          {/* Mini Live Tracking Map Viewport */}
          <div className="relative w-full h-[200px] rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
            
            <svg viewBox="0 0 400 180" className="w-full h-full">
              {/* Grid */}
              <g className="stroke-slate-900/60" strokeWidth="0.5">
                {Array.from({ length: 11 }).map((_, i) => (
                  <line key={`gx-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="180" />
                ))}
                {Array.from({ length: 5 }).map((_, i) => (
                  <line key={`gy-${i}`} x1="0" y1={i * 40} x2="400" y2={i * 40} />
                ))}
              </g>

              {/* Road lines */}
              <g className="stroke-slate-800/40 fill-none" strokeWidth="1">
                <path d="M 10 100 L 390 100" />
                <path d="M 100 10 L 100 170" />
                <path d="M 200 10 L 200 170" />
                <path d="M 300 10 L 300 170" />
                <path d="M 40 120 L 120 70 L 220 130 L 320 80 L 380 90" strokeDasharray="3,3" />
              </g>

              {/* Active Route Path for Selected Truck */}
              <path
                d="M 40 120 L 120 70 L 220 130 L 320 80 L 380 90"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.5"
                strokeDasharray="4,2"
              />

              {/* All Trucks on GPS */}
              {trucks.map(t => {
                const isCur = t.id === selectedTruck.id;
                return (
                  <g key={t.id} transform={`translate(${t.x}, ${t.y})`}>
                    {isCur && (
                      <circle cx="0" cy="0" r="16" className="stroke-cyan-400 fill-none stroke-[1] animate-ping" />
                    )}
                    <circle cx="0" cy="0" r={isCur ? 8 : 5} fill={isCur ? '#06b6d4' : '#64748b'} />
                    <text
                      x="0"
                      y={isCur ? -10 : -7}
                      textAnchor="middle"
                      fill={isCur ? '#38bdf8' : '#94a3b8'}
                      fontSize={isCur ? "6" : "4.5"}
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {t.id}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* GPS Overlay Badge */}
            <div className="absolute top-2 left-2 bg-slate-900/90 border border-slate-800 px-2 py-1 rounded-lg backdrop-blur-md text-[7.5px] font-mono text-slate-300">
              <span className="text-emerald-400 font-bold">● LIVE SATELLITE FEED</span> • Lock: GPS/GLONASS
            </div>
          </div>

          {/* Detailed Telemetry HUD */}
          <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-2xl backdrop-blur-md space-y-3">
            
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <h3 className="text-white font-extrabold text-sm">{selectedTruck.model}</h3>
                <span className="text-[8px] font-mono text-slate-400">
                  Route ID: {selectedTruck.assignedRouteId} • Vehicle No: {selectedTruck.truckNumber}
                </span>
              </div>
              <span className="text-xs font-mono font-black text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-xl border border-cyan-500/20">
                {selectedTruck.id}
              </span>
            </div>

            {/* Metric Tiles */}
            <div className="grid grid-cols-3 gap-2 text-[8px] font-mono">
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-850">
                <span className="text-slate-500 block text-[6.5px] uppercase font-bold flex items-center gap-1">
                  <Gauge className="w-2.5 h-2.5 text-cyan-400" />
                  Speed
                </span>
                <span className="text-white font-extrabold text-xs block mt-0.5">{selectedTruck.speed} km/h</span>
              </div>

              <div className="p-2 rounded-xl bg-slate-950 border border-slate-850">
                <span className="text-slate-500 block text-[6.5px] uppercase font-bold flex items-center gap-1">
                  <Fuel className="w-2.5 h-2.5 text-amber-400" />
                  Fuel Tank
                </span>
                <span className="text-amber-400 font-extrabold text-xs block mt-0.5">{selectedTruck.fuelLevel}% Diesel</span>
              </div>

              <div className="p-2 rounded-xl bg-slate-950 border border-slate-850">
                <span className="text-slate-500 block text-[6.5px] uppercase font-bold flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5 text-emerald-400" />
                  Next Stop ETA
                </span>
                <span className="text-emerald-400 font-extrabold text-xs block mt-0.5">{selectedTruck.eta}</span>
              </div>
            </div>

            {/* Driver & Task Assignment */}
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-850 space-y-1.5 text-[8.5px] font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Assigned Driver:</span>
                <span className="text-white font-bold">{selectedTruck.driverName} ({selectedTruck.driverId})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Current Task:</span>
                <span className="text-cyan-300 font-bold">{selectedTruck.currentTask}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Next Destination:</span>
                <span className="text-slate-200">{selectedTruck.nextStop} ({selectedTruck.distanceToNext})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Route Target:</span>
                <span className="text-slate-300">{selectedTruck.totalDistance}</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

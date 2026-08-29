import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  Users, 
  Truck, 
  Trash2, 
  Map, 
  Bell, 
  Cpu, 
  ShieldCheck, 
  Save, 
  Check, 
  RotateCcw,
  Zap,
  Radio,
  Key
} from 'lucide-react';

export default function ManagementView() {
  const [activeTab, setActiveTab] = useState<'system' | 'fleet' | 'bins' | 'routes' | 'alerts'>('system');
  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  // Settings states
  const [refreshRate, setRefreshRate] = useState('5s');
  const [routeOptimizationWeight, setRouteOptimizationWeight] = useState('Efficiency (Fuel + Time)');
  const [binThreshold, setBinThreshold] = useState(75);
  const [gpsAccuracy, setGpsAccuracy] = useState('High Precision (RTK ±0.5m)');
  const [telegramAlerts, setTelegramAlerts] = useState(true);
  const [smsDriverDispatch, setSmsDriverDispatch] = useState(true);

  const handleSave = () => {
    setSavedStatus('Settings saved and deployed to IoT edge devices.');
    setTimeout(() => setSavedStatus(null), 3000);
  };

  return (
    <div className="space-y-4 text-left font-sans animate-in fade-in duration-200">
      
      {/* ── Top Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/70 border border-slate-800 p-3 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-extrabold text-white block">Operational Management &amp; Settings</span>
            <span className="text-[7.5px] font-mono text-slate-400">
              System Configuration, IoT Telemetry, Vehicle Fleet &amp; Notification Rules
            </span>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition-colors shadow"
        >
          <Save className="w-3.5 h-3.5" />
          Save Configurations
        </button>
      </div>

      {savedStatus && (
        <div className="p-2.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 font-mono text-[9px] flex items-center gap-2">
          <Check className="w-3.5 h-3.5" />
          {savedStatus}
        </div>
      )}

      {/* ── Settings Tabs Navigation ── */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-slate-950 p-1 rounded-2xl border border-slate-800 text-[8px] font-mono">
        <button
          onClick={() => setActiveTab('system')}
          className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
            activeTab === 'system' ? 'bg-purple-600 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Cpu className="w-3 h-3" />
          System &amp; IoT Core
        </button>

        <button
          onClick={() => setActiveTab('fleet')}
          className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
            activeTab === 'fleet' ? 'bg-cyan-600 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Truck className="w-3 h-3" />
          Fleet &amp; Drivers
        </button>

        <button
          onClick={() => setActiveTab('bins')}
          className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
            activeTab === 'bins' ? 'bg-emerald-600 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Trash2 className="w-3 h-3" />
          Smart Bins &amp; Sensors
        </button>

        <button
          onClick={() => setActiveTab('routes')}
          className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
            activeTab === 'routes' ? 'bg-amber-600 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Map className="w-3 h-3" />
          Route &amp; Geo-fencing
        </button>

        <button
          onClick={() => setActiveTab('alerts')}
          className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
            activeTab === 'alerts' ? 'bg-rose-600 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Bell className="w-3 h-3" />
          Alerts &amp; Webhooks
        </button>
      </div>

      {/* ── Settings Content Panes ── */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur-md space-y-4">
        
        {/* System & IoT Core */}
        {activeTab === 'system' && (
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              Core IoT Telemetry Engine
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[9px] font-mono">
              <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl space-y-1.5">
                <label className="text-slate-400 font-bold block">Sensor Telemetry Refresh Rate</label>
                <select 
                  value={refreshRate} 
                  onChange={e => setRefreshRate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-white rounded-lg p-1.5 focus:outline-none focus:border-purple-500"
                >
                  <option value="2s">2 seconds (Real-time Live)</option>
                  <option value="5s">5 seconds (Standard Operational)</option>
                  <option value="15s">15 seconds (Battery Conservation)</option>
                </select>
                <span className="text-[7.5px] text-slate-500 block">Ultrasonic echo &amp; load-cell polling frequency.</span>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl space-y-1.5">
                <label className="text-slate-400 font-bold block">AI Route Optimization Objective</label>
                <select 
                  value={routeOptimizationWeight} 
                  onChange={e => setRouteOptimizationWeight(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-white rounded-lg p-1.5 focus:outline-none focus:border-purple-500"
                >
                  <option value="Efficiency (Fuel + Time)">Efficiency (Fuel + Time Balanced)</option>
                  <option value="Fastest Clearance (Full Bins First)">Fastest Clearance (Full Bins First)</option>
                  <option value="Minimum CO2 Emissions">Minimum Carbon Emissions (Shortest Km)</option>
                </select>
                <span className="text-[7.5px] text-slate-500 block">Dijkstra &amp; Simulated Annealing solver heuristic.</span>
              </div>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-between text-[9px] font-mono">
              <div>
                <span className="text-white font-bold block">GNSS / GPS Receiver Calibration</span>
                <span className="text-slate-400 text-[8px] block">High Precision RTK ±0.5m locked to Hyderabad Base Station.</span>
              </div>
              <span className="text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                Connected (L1/L5)
              </span>
            </div>
          </div>
        )}

        {/* Fleet & Drivers */}
        {activeTab === 'fleet' && (
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-cyan-400" />
              Heavy Vehicle Fleet Diagnostics
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[9px] font-mono">
              <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                <span className="text-slate-500 block text-[7.5px] uppercase">Fleet Fuel Alert Threshold</span>
                <span className="text-amber-400 font-extrabold text-sm block">15% Diesel Level</span>
                <p className="text-slate-400 text-[8px]">Auto-triggers routing to IndianOil Commercial Depot.</p>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                <span className="text-slate-500 block text-[7.5px] uppercase">Compactor Hydraulic Safety Limit</span>
                <span className="text-emerald-400 font-extrabold text-sm block">18,500 kg Gross</span>
                <p className="text-slate-400 text-[8px]">Enforces immediate diversion to Jawaharnagar Dump Yard.</p>
              </div>
            </div>
          </div>
        )}

        {/* Smart Bins */}
        {activeTab === 'bins' && (
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
              <Trash2 className="w-3.5 h-3.5 text-emerald-400" />
              Smart Garbage Bin Thresholds
            </h3>

            <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl space-y-2 text-[9px] font-mono">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">Full Capacity Trigger Threshold:</span>
                <span className="text-red-400 font-black text-sm">{binThreshold}% Fill</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="95" 
                value={binThreshold}
                onChange={e => setBinThreshold(Number(e.target.value))}
                className="w-full accent-red-500"
              />
              <span className="text-[7.5px] text-slate-500 block">
                Bins exceeding this capacity turn 🔴 Red and are auto-appended to active truck routes.
              </span>
            </div>
          </div>
        )}

        {/* Routes */}
        {activeTab === 'routes' && (
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
              <Map className="w-3.5 h-3.5 text-amber-400" />
              Geo-fencing &amp; Dumping Yard Coordinates
            </h3>

            <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl space-y-1.5 text-[8.5px] font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Central Logistics Hub:</span>
                <span className="text-white font-bold">17.4474° N, 78.3762° E (HITECH City)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Final Dumping Yard:</span>
                <span className="text-emerald-400 font-bold">17.5120° N, 78.6010° E (Jawaharnagar)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Speed Limit Geo-Governor:</span>
                <span className="text-cyan-400 font-bold">50 km/h Urban • 80 km/h Highway</span>
              </div>
            </div>
          </div>
        )}

        {/* Alerts & Webhooks */}
        {activeTab === 'alerts' && (
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-rose-400" />
              Automated Notification Gateways
            </h3>

            <div className="space-y-2 text-[9px] font-mono">
              <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-white font-bold block">Telegram Operations Dispatch Channel</span>
                  <span className="text-slate-400 text-[8px] block">Broadcasts full bin alerts and truck delays to supervisors.</span>
                </div>
                <button
                  onClick={() => setTelegramAlerts(!telegramAlerts)}
                  className={`px-3 py-1 rounded-lg font-bold text-xs ${
                    telegramAlerts ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {telegramAlerts ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-white font-bold block">SMS Driver Dispatch Gateway</span>
                  <span className="text-slate-400 text-[8px] block">Sends SMS route turn sheets directly to driver handsets.</span>
                </div>
                <button
                  onClick={() => setSmsDriverDispatch(!smsDriverDispatch)}
                  className={`px-3 py-1 rounded-lg font-bold text-xs ${
                    smsDriverDispatch ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {smsDriverDispatch ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

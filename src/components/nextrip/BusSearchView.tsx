import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  ArrowRightLeft, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Bus as BusIcon, 
  Clock, 
  TrendingDown,
  Compass,
  Check
} from 'lucide-react';

interface BusSearchViewProps {
  fromCity: string;
  toCity: string;
  travelDate: string;
  busTypeFilter: string[]; // ['AC', 'Sleeper', 'Seater']
  isWomenPreferred: boolean;
  onFromCityChange: (city: string) => void;
  onToCityChange: (city: string) => void;
  onTravelDateChange: (date: string) => void;
  onToggleBusType: (type: string) => void;
  onToggleWomenPreferred: (pref: boolean) => void;
  onSearch: () => void;
}

export default function BusSearchView({
  fromCity,
  toCity,
  travelDate,
  busTypeFilter,
  isWomenPreferred,
  onFromCityChange,
  onToCityChange,
  onTravelDateChange,
  onToggleBusType,
  onToggleWomenPreferred,
  onSearch
}: BusSearchViewProps) {
  const [activeFromInput, setActiveFromInput] = useState(false);
  const [activeToInput, setActiveToInput] = useState(false);

  const popularRoutes = [
    { from: 'Hyderabad', to: 'Guntur', tag: 'Fast Track' },
    { from: 'Secunderabad', to: 'Pune', tag: 'High Demand' },
    { from: 'Hyderabad', to: 'Pune', tag: 'Popular' },
    { from: 'Bengaluru', to: 'Chennai', tag: 'Volvo Special' },
    { from: 'Vijayawada', to: 'Hyderabad', tag: 'Express' }
  ];

  const citySuggestions = [
    'Hyderabad', 'Secunderabad', 'Pune', 'Guntur', 'Vijayawada', 
    'Bengaluru', 'Chennai', 'Mumbai', 'Visakhapatnam', 'Tirupati'
  ];

  // Quick swap from and to
  const handleSwap = () => {
    const temp = fromCity;
    onFromCityChange(toCity);
    onToCityChange(temp);
  };

  const handleSelectRoute = (f: string, t: string) => {
    onFromCityChange(f);
    onToCityChange(t);
  };

  return (
    <div className="space-y-4 text-left">
      {/* ── Main Search Form Box ── */}
      <div className="bg-gradient-to-br from-slate-900/95 via-slate-850 to-slate-900 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        {/* Background glow accent */}
        <div className="absolute -right-20 -top-20 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <BusIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-white tracking-tight">
                Search Bus Tickets & Schedules
              </h2>
              <p className="text-[10px] text-slate-400">
                1000+ verified operators with AI Dynamic Fare Price Lock
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[9.5px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
            <ShieldCheck className="w-3 h-3" />
            <span>Guaranteed Seat Allocation</span>
          </div>
        </div>

        {/* ── Primary Form Grid: From, Swap, To, Date ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 relative">
          
          {/* FROM Source Location */}
          <div className="md:col-span-4 relative">
            <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
              FROM (Source Location)
            </label>
            <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2 hover:border-sky-500/70 focus-within:border-sky-400 transition-all shadow-inner">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
              <input
                type="text"
                value={fromCity}
                onChange={e => onFromCityChange(e.target.value)}
                onFocus={() => setActiveFromInput(true)}
                onBlur={() => setTimeout(() => setActiveFromInput(false), 200)}
                placeholder="e.g. Hyderabad, Secunderabad"
                className="w-full bg-transparent text-white text-xs font-bold focus:outline-none placeholder-slate-500"
              />
            </div>

            {/* Auto suggestions */}
            {activeFromInput && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-40 p-1.5 max-h-40 overflow-y-auto no-scrollbar">
                <span className="text-[8px] font-mono text-slate-400 px-2 py-0.5 block">POPULAR CITIES</span>
                {citySuggestions.filter(c => c.toLowerCase().includes(fromCity.toLowerCase()) || !fromCity).map(city => (
                  <button
                    key={city}
                    onMouseDown={() => onFromCityChange(city)}
                    className="w-full text-left px-2.5 py-1 text-[11px] text-slate-200 hover:bg-slate-800 hover:text-white rounded-lg flex items-center justify-between"
                  >
                    <span>{city}</span>
                    <span className="text-[8px] font-mono text-slate-400">Hub Station</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SWAP BUTTON */}
          <div className="hidden md:flex md:col-span-1 items-end justify-center pb-1">
            <button
              onClick={handleSwap}
              title="Swap Locations"
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-sky-500/20 border border-slate-700 hover:border-sky-400 flex items-center justify-center text-slate-300 hover:text-sky-400 transition-all shadow-md active:scale-95"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* TO Destination Location */}
          <div className="md:col-span-4 relative">
            <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
              TO (Destination Location)
            </label>
            <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2 hover:border-sky-500/70 focus-within:border-sky-400 transition-all shadow-inner">
              <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
              <input
                type="text"
                value={toCity}
                onChange={e => onToCityChange(e.target.value)}
                onFocus={() => setActiveToInput(true)}
                onBlur={() => setTimeout(() => setActiveToInput(false), 200)}
                placeholder="e.g. Pune, Guntur"
                className="w-full bg-transparent text-white text-xs font-bold focus:outline-none placeholder-slate-500"
              />
            </div>

            {/* Auto suggestions */}
            {activeToInput && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-40 p-1.5 max-h-40 overflow-y-auto no-scrollbar">
                <span className="text-[8px] font-mono text-slate-400 px-2 py-0.5 block">POPULAR DESTINATIONS</span>
                {citySuggestions.filter(c => c.toLowerCase().includes(toCity.toLowerCase()) || !toCity).map(city => (
                  <button
                    key={city}
                    onMouseDown={() => onToCityChange(city)}
                    className="w-full text-left px-2.5 py-1 text-[11px] text-slate-200 hover:bg-slate-800 hover:text-white rounded-lg flex items-center justify-between"
                  >
                    <span>{city}</span>
                    <span className="text-[8px] font-mono text-slate-400">Terminal</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DATE OF TRAVEL (Calendar selector default to current/upcoming date) */}
          <div className="md:col-span-3">
            <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
              DATE OF TRAVEL
            </label>
            <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2 hover:border-sky-500/70 focus-within:border-sky-400 transition-all shadow-inner">
              <Calendar className="w-4 h-4 text-sky-400 shrink-0" />
              <input
                type="date"
                value={travelDate}
                onChange={e => onTravelDateChange(e.target.value)}
                className="w-full bg-transparent text-white text-xs font-bold focus:outline-none [color-scheme:dark]"
              />
            </div>
          </div>
        </div>

        {/* ── Filters Bar: Bus Type (Seater, Sleeper, AC) + Book for Women Checkbox ── */}
        <div className="mt-4 pt-3.5 border-t border-slate-800/90 flex flex-wrap items-center justify-between gap-3">
          {/* Bus Type Options (Seater, Sleeper, AC) */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[9.5px] font-mono font-bold text-slate-400 uppercase">
              Bus Type:
            </span>
            {['AC', 'Sleeper', 'Seater'].map(type => {
              const isSelected = busTypeFilter.includes(type);
              return (
                <button
                  key={type}
                  onClick={() => onToggleBusType(type)}
                  className={`px-3 py-1 rounded-lg text-[10.5px] font-bold border transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-sm'
                      : 'bg-slate-950/70 border-slate-700 text-slate-300 hover:border-slate-600 hover:text-white'
                  }`}
                >
                  <div className={`w-2.5 h-2.5 rounded flex items-center justify-center ${
                    isSelected ? 'bg-sky-400 text-slate-950' : 'border border-slate-600'
                  }`}>
                    {isSelected && <Check className="w-2 h-2 stroke-[3]" />}
                  </div>
                  <span>{type}</span>
                </button>
              );
            })}
          </div>

          {/* Book for Women Checkbox with Clear Indication */}
          <div 
            onClick={() => onToggleWomenPreferred(!isWomenPreferred)}
            className={`cursor-pointer px-3 py-1 rounded-xl border flex items-center gap-2 transition-all ${
              isWomenPreferred
                ? 'bg-pink-500/20 border-pink-400 text-pink-300 shadow-[0_0_12px_rgba(244,114,182,0.25)]'
                : 'bg-slate-950/70 border-slate-700 text-slate-300 hover:border-pink-500/50'
            }`}
          >
            <div className={`w-3.5 h-3.5 rounded flex items-center justify-center transition-colors ${
              isWomenPreferred ? 'bg-pink-500 text-white' : 'border border-slate-600'
            }`}>
              {isWomenPreferred && <Check className="w-2.5 h-2.5 stroke-[3]" />}
            </div>
            <Heart className={`w-3.5 h-3.5 ${isWomenPreferred ? 'text-pink-400 fill-pink-400' : 'text-slate-400'}`} />
            <div className="text-left">
              <span className="text-[10.5px] font-bold block leading-none">
                Book for Women
              </span>
              <span className="text-[8px] text-pink-300/80 font-mono">
                Dedicated Safe Rows & Women Preferred Seating
              </span>
            </div>
          </div>

          {/* SEARCH BUSES BUTTON */}
          <button
            onClick={onSearch}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 active:scale-98 transition-all"
          >
            <Search className="w-4 h-4" />
            <span>SEARCH BUSES</span>
          </button>
        </div>
      </div>

      {/* ── Popular Route Pills & Quick Search Shortcuts ── */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-slate-300">
        <span className="text-[9px] font-mono text-slate-400 uppercase shrink-0 font-bold flex items-center gap-1">
          <Compass className="w-3 h-3 text-sky-400" /> Popular:
        </span>
        {popularRoutes.map(r => (
          <button
            key={`${r.from}-${r.to}`}
            onClick={() => handleSelectRoute(r.from, r.to)}
            className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/40 text-[10px] text-slate-300 hover:text-white font-medium shrink-0 flex items-center gap-1.5 transition-all"
          >
            <span>{r.from} ➔ {r.to}</span>
            <span className="px-1 py-0.2 rounded bg-sky-500/15 text-sky-300 text-[8px] font-mono">
              {r.tag}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { 
  Bus as BusIcon, 
  Star, 
  Clock, 
  MapPin, 
  Wifi, 
  Zap, 
  ShieldCheck, 
  Heart, 
  SlidersHorizontal, 
  ArrowRight, 
  RotateCcw,
  Sparkles,
  ChevronDown,
  Info
} from 'lucide-react';
import { Bus } from './types';

interface BusResultsListProps {
  buses: Bus[];
  fromCity: string;
  toCity: string;
  travelDate: string;
  isWomenPreferred: boolean;
  onSelectBus: (bus: Bus) => void;
}

export default function BusResultsList({
  buses,
  fromCity,
  toCity,
  travelDate,
  isWomenPreferred,
  onSelectBus
}: BusResultsListProps) {
  // Search Filters State
  const [filterAC, setFilterAC] = useState<boolean | null>(null);
  const [filterSleeper, setFilterSleeper] = useState<boolean | null>(null);
  const [filterSeater, setFilterSeater] = useState<boolean | null>(null);
  const [filterPeriod, setFilterPeriod] = useState<string>('all');
  const [filterMinRating, setFilterMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(3500);
  const [sortBy, setSortBy] = useState<'recommended' | 'price_low' | 'price_high' | 'rating' | 'duration' | 'seats'>('recommended');
  const [operatorFilter, setOperatorFilter] = useState<string>('all');

  // Available unique operators
  const operators = useMemo(() => {
    return Array.from(new Set(buses.map(b => b.operator)));
  }, [buses]);

  // Filtered and Sorted list
  const filteredBuses = useMemo(() => {
    let list = buses.filter(b => {
      if (filterAC !== null && b.isAC !== filterAC) return false;
      if (filterSleeper && !b.isSleeper) return false;
      if (filterSeater && !b.isSeater) return false;
      if (filterPeriod !== 'all' && b.departurePeriod !== filterPeriod) return false;
      if (filterMinRating > 0 && b.rating < filterMinRating) return false;
      if (b.basePrice > maxPrice) return false;
      if (operatorFilter !== 'all' && b.operator !== operatorFilter) return false;
      return true;
    });

    if (sortBy === 'price_low') list.sort((a, b) => a.basePrice - b.basePrice);
    else if (sortBy === 'price_high') list.sort((a, b) => b.basePrice - a.basePrice);
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'seats') list.sort((a, b) => b.availableSeatsCount - a.availableSeatsCount);
    
    return list;
  }, [buses, filterAC, filterSleeper, filterSeater, filterPeriod, filterMinRating, maxPrice, sortBy, operatorFilter]);

  const handleResetFilters = () => {
    setFilterAC(null);
    setFilterSleeper(null);
    setFilterSeater(null);
    setFilterPeriod('all');
    setFilterMinRating(0);
    setMaxPrice(3500);
    setOperatorFilter('all');
    setSortBy('recommended');
  };

  return (
    <div className="space-y-4 text-left">
      {/* ── Route & Count Breadcrumb Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 rounded-xl p-3 px-4 shadow-md">
        <div className="flex items-center gap-2 text-white">
          <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
            <BusIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-black text-sm">
              <span>{fromCity || 'Hyderabad'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
              <span>{toCity || 'Pune'}</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              Travel Date: <strong className="text-slate-200">{travelDate || 'Today'}</strong> • {filteredBuses.length} Buses Available
            </span>
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Sort By:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="bg-slate-950 border border-slate-700 text-white text-[11px] font-bold rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-sky-400 cursor-pointer"
          >
            <option value="recommended">⭐ Recommended (AI Best)</option>
            <option value="price_low">💰 Price: Low to High</option>
            <option value="price_high">💎 Price: High to Low</option>
            <option value="rating">🌟 Top Rated First</option>
            <option value="seats">💺 Most Seats Available</option>
          </select>
        </div>
      </div>

      {/* ── Main Layout: Left Filters Column + Right Bus Cards List ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* ── SEARCH FILTERS SIDEBAR (Section 4 Requirements) ── */}
        <div className="lg:col-span-3 space-y-3">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 shadow-md space-y-3.5 sticky top-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-black text-white flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-sky-400" /> Filter Results
              </span>
              <button
                onClick={handleResetFilters}
                className="text-[9.5px] text-slate-400 hover:text-sky-300 font-mono flex items-center gap-1"
              >
                <RotateCcw className="w-2.5 h-2.5" /> Reset
              </button>
            </div>

            {/* Bus Type Filters (AC, Non-AC, Seater, Sleeper) */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">Bus Types</label>
              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                <button
                  onClick={() => setFilterAC(filterAC === true ? null : true)}
                  className={`p-1.5 rounded-lg border font-bold transition-all text-center ${
                    filterAC === true ? 'bg-sky-500/20 border-sky-400 text-sky-300' : 'bg-slate-950/60 border-slate-800 text-slate-300'
                  }`}
                >
                  AC Buses
                </button>
                <button
                  onClick={() => setFilterAC(filterAC === false ? null : false)}
                  className={`p-1.5 rounded-lg border font-bold transition-all text-center ${
                    filterAC === false ? 'bg-sky-500/20 border-sky-400 text-sky-300' : 'bg-slate-950/60 border-slate-800 text-slate-300'
                  }`}
                >
                  Non-AC
                </button>
                <button
                  onClick={() => setFilterSleeper(!filterSleeper)}
                  className={`p-1.5 rounded-lg border font-bold transition-all text-center ${
                    filterSleeper ? 'bg-sky-500/20 border-sky-400 text-sky-300' : 'bg-slate-950/60 border-slate-800 text-slate-300'
                  }`}
                >
                  Sleeper Berth
                </button>
                <button
                  onClick={() => setFilterSeater(!filterSeater)}
                  className={`p-1.5 rounded-lg border font-bold transition-all text-center ${
                    filterSeater ? 'bg-sky-500/20 border-sky-400 text-sky-300' : 'bg-slate-950/60 border-slate-800 text-slate-300'
                  }`}
                >
                  Seater
                </button>
              </div>
            </div>

            {/* Departure Time Period */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">Departure Time</label>
              <div className="grid grid-cols-2 gap-1.5 text-[9.5px]">
                {[
                  { id: 'morning', label: 'Morning', time: '06:00 - 12:00' },
                  { id: 'afternoon', label: 'Afternoon', time: '12:00 - 18:00' },
                  { id: 'evening', label: 'Evening', time: '18:00 - 23:00' },
                  { id: 'night', label: 'Night', time: '23:00 - 06:00' }
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => setFilterPeriod(filterPeriod === p.id ? 'all' : p.id)}
                    className={`p-1.5 rounded-lg border text-left transition-all ${
                      filterPeriod === p.id ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-bold' : 'bg-slate-950/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="block font-bold">{p.label}</span>
                    <span className="text-[8px] text-slate-500 block font-mono">{p.time}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider Filter */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[9px] font-mono text-slate-400 uppercase font-bold">
                <span>Max Ticket Price</span>
                <span className="text-sky-400 font-extrabold">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="3500"
                step="50"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
              <div className="flex justify-between text-[8px] font-mono text-slate-500">
                <span>₹1,000</span>
                <span>₹3,500</span>
              </div>
            </div>

            {/* Minimum Star Rating */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">Customer Rating</label>
              <div className="flex items-center gap-1 text-[10px]">
                {[4.5, 4.0, 3.5].map(r => (
                  <button
                    key={r}
                    onClick={() => setFilterMinRating(filterMinRating === r ? 0 : r)}
                    className={`flex-1 py-1 rounded-lg border font-bold text-center flex items-center justify-center gap-1 ${
                      filterMinRating === r ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-slate-950/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    <span>{r}+</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Operator Filter */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">Travel Operator</label>
              <select
                value={operatorFilter}
                onChange={e => setOperatorFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white text-[10.5px] rounded-lg p-1.5 focus:outline-none focus:border-sky-400"
              >
                <option value="all">All Travel Operators ({operators.length})</option>
                {operators.map(op => (
                  <option key={op} value={op}>{op}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ── BUS LISTING CARDS COLUMN (Section 3 Requirements) ── */}
        <div className="lg:col-span-9 space-y-3">
          {filteredBuses.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
              <BusIcon className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-white font-bold text-sm">No buses match the selected filter criteria</p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl bg-sky-500 text-white text-xs font-bold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredBuses.map((bus, idx) => (
              <div
                key={bus.id}
                className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 sm:p-5 shadow-lg transition-all duration-200 hover:shadow-sky-500/5 group relative"
              >
                {/* ── TOP BAR OF CARD: Operator, Bus Type & TOP-RIGHT STAR RATING ── */}
                <div className="flex items-start justify-between border-b border-slate-800/80 pb-3 mb-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm sm:text-base font-black text-white group-hover:text-sky-300 transition-colors">
                        {bus.operator}
                      </h3>
                      {bus.discountBadge && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono font-black">
                          {bus.discountBadge}
                        </span>
                      )}
                      {bus.hasWomenSafety && (
                        <span className="px-2 py-0.5 rounded-full bg-pink-500/15 text-pink-300 border border-pink-500/30 text-[8.5px] font-mono font-bold flex items-center gap-1">
                          <Heart className="w-2.5 h-2.5 fill-pink-400 text-pink-400" /> Women Safe
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {bus.busName} • <span className="text-slate-300 font-bold">{bus.busType}</span>
                    </p>
                  </div>

                  {/* ── TOP-RIGHT RATING (Explicit Requirement) ── */}
                  <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 px-2.5 py-1 rounded-xl shrink-0 shadow-inner">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="text-xs font-black text-white">{bus.rating}</span>
                    </div>
                    <span className="text-[9px] text-slate-500 font-mono">
                      ({bus.totalRatings.toLocaleString()})
                    </span>
                  </div>
                </div>

                {/* ── MAIN BODY: Journey Timeline, Seats Available & Pricing Action ── */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  
                  {/* Journey Timeline (Left / Middle) */}
                  <div className="md:col-span-8 space-y-2">
                    <div className="flex items-center justify-between text-left">
                      {/* Departure */}
                      <div>
                        <span className="text-base sm:text-lg font-black text-white block leading-none">
                          {bus.departureTime}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono font-medium block mt-1">
                          {bus.departureCity}
                        </span>
                        <span className="text-[8.5px] text-slate-500 block">
                          {bus.boardingPoints[0]?.location || 'Main Boarding'}
                        </span>
                      </div>

                      {/* Duration Line */}
                      <div className="flex flex-col items-center px-3">
                        <span className="text-[9px] font-mono text-slate-400 font-bold mb-1">
                          {bus.duration}
                        </span>
                        <div className="w-24 sm:w-32 h-0.5 bg-gradient-to-r from-sky-500 via-indigo-400 to-emerald-400 relative flex items-center justify-between">
                          <div className="w-2 h-2 rounded-full bg-sky-400 -translate-y-0.5" />
                          <BusIcon className="w-3 h-3 text-indigo-300 -translate-y-1.5" />
                          <div className="w-2 h-2 rounded-full bg-emerald-400 -translate-y-0.5" />
                        </div>
                        <span className="text-[8px] font-mono text-emerald-400 mt-1">Direct Transit</span>
                      </div>

                      {/* Arrival */}
                      <div className="text-right">
                        <span className="text-base sm:text-lg font-black text-white block leading-none">
                          {bus.arrivalTime}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono font-medium block mt-1">
                          {bus.arrivalCity}
                        </span>
                        <span className="text-[8.5px] text-slate-500 block">
                          {bus.droppingPoints[0]?.location || 'Main Drop'}
                        </span>
                      </div>
                    </div>

                    {/* Amenities & Seats count pill */}
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60 flex-wrap">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg border ${
                        bus.availableSeatsCount <= 5 
                          ? 'bg-rose-500/15 border-rose-500/30 text-rose-400 animate-pulse' 
                          : 'bg-slate-950 border-slate-800 text-sky-400'
                      }`}>
                        💺 {bus.availableSeatsCount} seats left
                      </span>

                      {bus.amenities.slice(0, 3).map(a => (
                        <span key={a} className="text-[9px] text-slate-400 bg-slate-950/60 border border-slate-800 px-2 py-0.5 rounded-md">
                          {a}
                        </span>
                      ))}
                      {bus.amenities.length > 3 && (
                        <span className="text-[8.5px] text-slate-500 font-mono">
                          +{bus.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pricing and Action Button (Right) */}
                  <div className="md:col-span-4 flex flex-col items-end justify-center pt-3 md:pt-0 border-t md:border-t-0 md:border-l border-slate-800 md:pl-4 space-y-2">
                    <div className="text-right">
                      <div className="flex items-baseline gap-1.5 justify-end">
                        <span className="text-[10px] text-slate-500 font-mono line-through">
                          ₹{bus.originalPrice}
                        </span>
                        <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                          ₹{bus.basePrice.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-[8.5px] text-emerald-400 font-mono block font-bold">
                        Save ₹{bus.originalPrice - bus.basePrice} with AI Fare
                      </span>
                    </div>

                    {/* VIEW DETAILS BUTTON */}
                    <button
                      onClick={() => onSelectBus(bus)}
                      className="w-full py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-sky-500/20 active:scale-95 transition-all group-hover:bg-gradient-to-r group-hover:from-sky-400 group-hover:to-blue-400"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

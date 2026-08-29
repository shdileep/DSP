import React, { useState } from 'react';
import { 
  Bus as BusIcon, 
  ArrowRight, 
  ArrowLeft, 
  Armchair, 
  Bed, 
  Star, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Info, 
  Check,
  Zap,
  Sparkles,
  Heart
} from 'lucide-react';
import { Bus, Seat, SeatDeck } from './types';

interface BusSeatSelectionProps {
  bus: Bus;
  selectedSeats: Seat[];
  onToggleSeat: (seat: Seat) => void;
  onBack: () => void;
  onProceed: () => void;
}

export default function BusSeatSelection({
  bus,
  selectedSeats,
  onToggleSeat,
  onBack,
  onProceed
}: BusSeatSelectionProps) {
  const [activeDeckTab, setActiveDeckTab] = useState<SeatDeck>('lower');

  const lowerDeckSeats = bus.seats.filter(s => s.deck === 'lower');
  const upperDeckSeats = bus.seats.filter(s => s.deck === 'upper');

  const totalSeatPrice = selectedSeats.reduce((acc, s) => acc + s.price, 0);

  const getSeatStatusClass = (seat: Seat) => {
    const isSelected = selectedSeats.some(s => s.id === seat.id);

    if (isSelected) {
      return 'bg-sky-500 border-sky-300 text-slate-950 font-black shadow-[0_0_12px_rgba(56,189,248,0.6)] scale-105 ring-2 ring-sky-300';
    }
    if (seat.status === 'reserved') {
      return 'bg-slate-950/80 border-slate-850 text-slate-700 cursor-not-allowed opacity-40';
    }
    if (seat.status === 'women_reserved') {
      return 'bg-pink-950/40 border-pink-500/50 text-pink-300 hover:border-pink-400 hover:bg-pink-900/40';
    }
    return 'bg-slate-900 border-slate-700 text-slate-300 hover:border-sky-400 hover:bg-slate-800/90 hover:text-white shadow-sm';
  };

  return (
    <div className="space-y-4 text-left">
      {/* ── Top Bus Overview Bar ── */}
      <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-white">{bus.operator}</h2>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-sky-500/15 text-sky-400 border border-sky-500/30 font-bold">
                  {bus.busType}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                {bus.departureCity} ➔ {bus.arrivalCity} • {bus.departureTime} - {bus.arrivalTime} ({bus.duration})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-amber-400 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{bus.rating}</span>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-extrabold bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20">
              {bus.discountBadge}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-[9.5px] font-mono text-slate-300 bg-slate-950/70 p-2 px-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded bg-slate-900 border border-slate-700" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded bg-sky-500 border border-sky-300 ring-1 ring-sky-400" />
            <span className="text-sky-300 font-bold">Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded bg-slate-950 border border-slate-850 opacity-40" />
            <span className="text-slate-500">Reserved / Occupied</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded bg-pink-950/60 border border-pink-500" />
            <span className="text-pink-300 font-bold">Female Preferred</span>
          </div>
        </div>
      </div>

      {/* ── Main 2-Deck Seat Selection Bus Cabin & Summary ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* ── BUS CABIN SEAT MAP (Left 8 cols) ── */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-4">
          
          {/* Deck Switcher Tabs (Lower Deck & Upper Deck) */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveDeckTab('lower')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeDeckTab === 'lower'
                    ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20 font-black'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Armchair className="w-3.5 h-3.5" />
                <span>Lower Deck (LB)</span>
                <span className="text-[9px] font-mono opacity-80">
                  ({lowerDeckSeats.filter(s => s.status === 'available').length} Left)
                </span>
              </button>

              <button
                onClick={() => setActiveDeckTab('upper')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeDeckTab === 'upper'
                    ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20 font-black'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Bed className="w-3.5 h-3.5" />
                <span>Upper Deck (UB)</span>
                <span className="text-[9px] font-mono opacity-80">
                  ({upperDeckSeats.filter(s => s.status === 'available').length} Left)
                </span>
              </button>
            </div>

            <span className="text-[10px] font-mono text-slate-400">
              Prices vary by berth tier (₹2,049 - ₹3,089)
            </span>
          </div>

          {/* Realistic Bus Structure */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 relative shadow-inner">
            
            {/* Front Bus Driver Area & Cabin Door */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-[10px] font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-slate-300">FRONT CABIN ENTRY</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg">
                <span className="text-base">🛞</span>
                <span className="font-bold text-slate-200">DRIVER SEAT</span>
              </div>
            </div>

            {/* Seat Grid Layout (Single Column on Left, Gangway / Aisle in Middle, Double Column on Right) */}
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map(row => {
                const currentDeckSeats = activeDeckTab === 'lower' ? lowerDeckSeats : upperDeckSeats;
                const leftSeat = currentDeckSeats.find(s => s.row === row && s.col === 1);
                const rightSeat1 = currentDeckSeats.find(s => s.row === row && s.col === 3);
                const rightSeat2 = currentDeckSeats.find(s => s.row === row && s.col === 4);

                return (
                  <div key={row} className="flex items-center justify-between gap-3">
                    
                    {/* LEFT SINGLE BERTH / SEAT */}
                    <div className="w-1/3">
                      {leftSeat && (
                        <button
                          disabled={leftSeat.status === 'reserved'}
                          onClick={() => onToggleSeat(leftSeat)}
                          className={`w-full py-2.5 px-3 rounded-xl border flex items-center justify-between transition-all group/seat ${getSeatStatusClass(
                            leftSeat
                          )}`}
                        >
                          <div className="flex items-center gap-2">
                            {leftSeat.category.includes('sleeper') ? (
                              <Bed className="w-4 h-4" />
                            ) : (
                              <Armchair className="w-4 h-4" />
                            )}
                            <div className="text-left leading-none">
                              <span className="text-xs font-black block font-mono">{leftSeat.number}</span>
                              <span className="text-[8px] font-mono opacity-80 block mt-0.5">{leftSeat.berthType}</span>
                            </div>
                          </div>
                          <span className="text-[11px] font-black font-mono">
                            ₹{leftSeat.price.toLocaleString()}
                          </span>
                        </button>
                      )}
                    </div>

                    {/* GANGWAY / AISLE INDICATOR */}
                    <div className="w-1/6 flex items-center justify-center text-[8px] font-mono text-slate-600 tracking-widest uppercase">
                      AISLE
                    </div>

                    {/* RIGHT DOUBLE BERTH / SEATS */}
                    <div className="w-1/2 grid grid-cols-2 gap-2">
                      {rightSeat1 && (
                        <button
                          disabled={rightSeat1.status === 'reserved'}
                          onClick={() => onToggleSeat(rightSeat1)}
                          className={`w-full py-2.5 px-2.5 rounded-xl border flex items-center justify-between transition-all ${getSeatStatusClass(
                            rightSeat1
                          )}`}
                        >
                          <div className="flex items-center gap-1.5">
                            {rightSeat1.category.includes('sleeper') ? (
                              <Bed className="w-3.5 h-3.5" />
                            ) : (
                              <Armchair className="w-3.5 h-3.5" />
                            )}
                            <span className="text-xs font-black font-mono">{rightSeat1.number}</span>
                          </div>
                          <span className="text-[10px] font-black font-mono">
                            ₹{rightSeat1.price}
                          </span>
                        </button>
                      )}

                      {rightSeat2 && (
                        <button
                          disabled={rightSeat2.status === 'reserved'}
                          onClick={() => onToggleSeat(rightSeat2)}
                          className={`w-full py-2.5 px-2.5 rounded-xl border flex items-center justify-between transition-all ${getSeatStatusClass(
                            rightSeat2
                          )}`}
                        >
                          <div className="flex items-center gap-1.5">
                            {rightSeat2.category.includes('sleeper') ? (
                              <Bed className="w-3.5 h-3.5" />
                            ) : (
                              <Armchair className="w-3.5 h-3.5" />
                            )}
                            <span className="text-xs font-black font-mono">{rightSeat2.number}</span>
                          </div>
                          <span className="text-[10px] font-black font-mono">
                            ₹{rightSeat2.price}
                          </span>
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Rear Emergency Exit */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[9px] font-mono text-slate-500">
              <span>REAR PASSENGER CABIN</span>
              <span className="text-rose-400 font-bold flex items-center gap-1">
                🚨 EMERGENCY EXIT
              </span>
            </div>
          </div>
        </div>

        {/* ── SEAT SELECTION SUMMARY & PRICING BREAKDOWN (Right 4 cols) ── */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-4 sticky top-2">
            <h3 className="text-xs font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center justify-between">
              <span>Booking Seat Summary</span>
              <span className="text-sky-400 font-mono font-bold">
                {selectedSeats.length} Seat{selectedSeats.length !== 1 ? 's' : ''} Selected
              </span>
            </h3>

            {/* Selected Seats List with Details & Individual Prices */}
            {selectedSeats.length === 0 ? (
              <div className="p-6 rounded-xl bg-slate-950/60 border border-dashed border-slate-800 text-center space-y-2">
                <Armchair className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400 font-medium">Please click on a seat to select</p>
                <p className="text-[9px] text-slate-500 font-mono">
                  Standard Lower Berth starting at ₹2,049
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto no-scrollbar">
                {selectedSeats.map(seat => (
                  <div
                    key={seat.id}
                    className="p-2.5 rounded-xl bg-slate-950 border border-sky-500/30 flex items-center justify-between shadow-inner"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-white font-mono">
                          {seat.number}
                        </span>
                        <span className="text-[8.5px] font-mono px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300">
                          {seat.deck === 'lower' ? 'Lower Deck' : 'Upper Deck'}
                        </span>
                      </div>
                      <p className="text-[9.5px] text-slate-400 mt-0.5">{seat.berthType}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black text-sky-400 font-mono block">
                        ₹{seat.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => onToggleSeat(seat)}
                        className="text-[8.5px] text-rose-400 hover:underline font-mono"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Total Fare calculation preview */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 font-mono text-[10px]">
              <div className="flex justify-between text-slate-400">
                <span>Base Seats Fare:</span>
                <span className="text-white font-bold">₹{totalSeatPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated GST (5%):</span>
                <span className="text-emerald-400 font-bold">+₹{Math.round(totalSeatPrice * 0.05)}</span>
              </div>
              <div className="flex justify-between text-white font-black text-xs pt-1.5 border-t border-slate-800">
                <span>Subtotal:</span>
                <span className="text-sky-400 font-mono">₹{Math.round(totalSeatPrice * 1.05).toLocaleString()}</span>
              </div>
            </div>

            {/* NEXT BUTTON */}
            <button
              disabled={selectedSeats.length === 0}
              onClick={onProceed}
              className={`w-full py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
                selectedSeats.length > 0
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-sky-500/25 active:scale-98'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <span>Next: Select Boarding & Drop</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

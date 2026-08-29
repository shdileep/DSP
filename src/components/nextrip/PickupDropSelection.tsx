import React from 'react';
import { 
  Bus as BusIcon, 
  MapPin, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Navigation,
  Building,
  Check
} from 'lucide-react';
import { Bus, BoardingDroppingPoint, Seat } from './types';

interface PickupDropSelectionProps {
  bus: Bus;
  selectedSeats: Seat[];
  selectedPickup: BoardingDroppingPoint | null;
  selectedDrop: BoardingDroppingPoint | null;
  onSelectPickup: (point: BoardingDroppingPoint) => void;
  onSelectDrop: (point: BoardingDroppingPoint) => void;
  onBack: () => void;
  onProceed: () => void;
}

export default function PickupDropSelection({
  bus,
  selectedSeats,
  selectedPickup,
  selectedDrop,
  onSelectPickup,
  onSelectDrop,
  onBack,
  onProceed
}: PickupDropSelectionProps) {
  const canProceed = selectedPickup !== null && selectedDrop !== null;

  return (
    <div className="space-y-4 text-left">
      {/* ── Top Journey Tracker ── */}
      <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base font-black text-white">
              Select Boarding & Dropping Points
            </h2>
            <p className="text-[11px] text-slate-400 font-mono">
              {bus.operator} • {bus.departureCity} ➔ {bus.arrivalCity} • {selectedSeats.length} Seat(s) ({selectedSeats.map(s => s.number).join(', ')})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className={`px-2.5 py-1 rounded-xl border font-bold ${
            selectedPickup ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-500'
          }`}>
            Pickup: {selectedPickup ? selectedPickup.location : 'Pending'}
          </span>
          <span className={`px-2.5 py-1 rounded-xl border font-bold ${
            selectedDrop ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-500'
          }`}>
            Drop: {selectedDrop ? selectedDrop.location : 'Pending'}
          </span>
        </div>
      </div>

      {/* ── Two-Column Grid: Boarding Points (Left) + Dropping Points (Right) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* ── BOARDING POINTS (PICKUP) ── */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2 text-sky-400 font-black text-xs uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>1. Boarding / Pickup Location ({bus.departureCity})</span>
            </div>
            <span className="text-[9px] font-mono text-slate-400">Select one point</span>
          </div>

          <div className="space-y-2.5">
            {bus.boardingPoints.map(bp => {
              const isSelected = selectedPickup?.id === bp.id;

              return (
                <div
                  key={bp.id}
                  onClick={() => onSelectPickup(bp)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-sky-500/15 border-sky-400 shadow-md shadow-sky-500/10 ring-1 ring-sky-400/50'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2.5">
                      <div className={`w-4 h-4 rounded-full mt-0.5 flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-sky-500 text-slate-950' : 'border border-slate-700'
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white leading-tight">{bp.location}</p>
                        <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                          <Building className="w-3 h-3 text-slate-500" />
                          <span>Landmark: {bp.landmark}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-black text-sky-400 font-mono block">
                        {bp.time}
                      </span>
                      <span className="text-[8.5px] text-slate-500 font-mono">Departure</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── DROPPING POINTS (DESTINATION) ── */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2 text-orange-400 font-black text-xs uppercase tracking-wider">
              <Navigation className="w-4 h-4" />
              <span>2. Dropping Location ({bus.arrivalCity})</span>
            </div>
            <span className="text-[9px] font-mono text-slate-400">Select one point</span>
          </div>

          <div className="space-y-2.5">
            {bus.droppingPoints.map(dp => {
              const isSelected = selectedDrop?.id === dp.id;

              return (
                <div
                  key={dp.id}
                  onClick={() => onSelectDrop(dp)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-orange-500/15 border-orange-400 shadow-md shadow-orange-500/10 ring-1 ring-orange-400/50'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2.5">
                      <div className={`w-4 h-4 rounded-full mt-0.5 flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-orange-500 text-slate-950' : 'border border-slate-700'
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white leading-tight">{dp.location}</p>
                        <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                          <Building className="w-3 h-3 text-slate-500" />
                          <span>Landmark: {dp.landmark}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-black text-orange-400 font-mono block">
                        {dp.time}
                      </span>
                      <span className="text-[8.5px] text-slate-500 font-mono">Arrival</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ── Bottom Action Bar ── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-3">
        <div className="text-[11px] text-slate-300">
          {!canProceed ? (
            <span className="text-amber-400 font-bold">
              ⚠️ Please pick both a Boarding point and a Dropping point to continue
            </span>
          ) : (
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Boarding & Dropping Points selected successfully
            </span>
          )}
        </div>

        <button
          disabled={!canProceed}
          onClick={onProceed}
          className={`px-8 py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
            canProceed
              ? 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-sky-500/25 active:scale-98'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          <span>Next: Passenger Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

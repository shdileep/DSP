import React, { useState } from 'react';
import { 
  Bus as BusIcon, 
  ArrowRight, 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck,
  Zap,
  Bookmark
} from 'lucide-react';
import { Bus, BoardingDroppingPoint, Seat, PassengerInfo, SavedPassenger } from './types';

interface PassengerDetailsFormProps {
  bus: Bus;
  selectedSeats: Seat[];
  travelDate: string;
  pickupPoint: BoardingDroppingPoint;
  dropPoint: BoardingDroppingPoint;
  passengers: PassengerInfo[];
  savedPassengers: SavedPassenger[];
  onUpdatePassenger: (seatId: string, field: keyof PassengerInfo, value: any) => void;
  onApplySavedPassenger: (seatId: string, saved: SavedPassenger) => void;
  onBack: () => void;
  onProceed: () => void;
}

export default function PassengerDetailsForm({
  bus,
  selectedSeats,
  travelDate,
  pickupPoint,
  dropPoint,
  passengers,
  savedPassengers,
  onUpdatePassenger,
  onApplySavedPassenger,
  onBack,
  onProceed
}: PassengerDetailsFormProps) {
  const [saveToProfile, setSaveToProfile] = useState(true);

  // Validate that all passengers have valid name and age
  const isValid = passengers.every(
    p => p.name.trim().length >= 2 && p.age !== '' && Number(p.age) > 0 && p.phone.trim().length >= 8
  );

  return (
    <div className="space-y-4 text-left">
      {/* ── Top Header & Selected Journey Recap ── */}
      <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base font-black text-white">Passenger Details & Verification</h2>
            <p className="text-[11px] text-slate-400 font-mono">
              Fill details for {selectedSeats.length} ticket{selectedSeats.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[9.5px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Complimentary ₹5,00,000 Travel Insurance Included</span>
        </div>
      </div>

      {/* ── Main Layout: Passenger Forms (Left) + Booking Recap Card (Right) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* ── PASSENGER FORMS COLUMN (Left 8 cols) ── */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* ── SAVED PASSENGERS 1-CLICK SELECT BAR (Section 9 Requirement) ── */}
          <div className="bg-gradient-to-r from-sky-950/40 via-slate-900 to-indigo-950/40 border border-sky-500/30 rounded-2xl p-4 shadow-lg space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-black text-white">Saved Passengers (1-Click Autofill)</span>
              </div>
              <span className="text-[9px] font-mono text-sky-300 bg-sky-500/15 px-2 py-0.5 rounded-full border border-sky-500/30">
                Fast Fill Active
              </span>
            </div>

            <p className="text-[10px] text-slate-300">
              Click any saved passenger below to instantly autofill the selected seat form:
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {savedPassengers.map(sp => (
                <button
                  key={sp.id}
                  onClick={() => {
                    // autofill for the first seat or active seat
                    if (passengers.length > 0) {
                      onApplySavedPassenger(passengers[0].seatId, sp);
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-sky-400 text-left transition-all flex items-center gap-2 group shadow-sm"
                >
                  <div className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-[9px]">
                    {sp.name[0]}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-white group-hover:text-sky-300 block leading-tight">
                      {sp.name}
                    </span>
                    <span className="text-[8.5px] text-slate-400 font-mono">
                      {sp.age} yrs • {sp.gender}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Individual Passenger Form Per Selected Seat */}
          {passengers.map((passenger, idx) => {
            const currentSeat = selectedSeats.find(s => s.id === passenger.seatId);

            return (
              <div
                key={passenger.seatId}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3.5"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-sky-500 text-slate-950 font-black text-xs flex items-center justify-center font-mono">
                      {idx + 1}
                    </span>
                    <h3 className="text-xs font-black text-white">
                      Passenger Details — Seat {passenger.seatNumber}
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[8.5px] font-mono bg-slate-800 text-sky-400 border border-slate-700">
                      {currentSeat?.berthType || 'Berth'} (₹{currentSeat?.price})
                    </span>
                  </div>

                  {/* Seat-specific saved passenger dropdown */}
                  <div className="relative">
                    <select
                      onChange={e => {
                        const sp = savedPassengers.find(p => p.id === e.target.value);
                        if (sp) onApplySavedPassenger(passenger.seatId, sp);
                      }}
                      className="bg-slate-950 border border-slate-700 text-slate-300 text-[10px] rounded-lg px-2 py-1 focus:outline-none focus:border-sky-400"
                      defaultValue=""
                    >
                      <option value="" disabled>Autofill from Profile ▾</option>
                      {savedPassengers.map(sp => (
                        <option key={sp.id} value={sp.id}>{sp.name} ({sp.age}, {sp.gender})</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Form Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  {/* Full Name */}
                  <div className="sm:col-span-6">
                    <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase mb-1">
                      Full Name (As on Govt ID) *
                    </label>
                    <div className="flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 focus-within:border-sky-400 transition-colors">
                      <User className="w-4 h-4 text-slate-400 shrink-0" />
                      <input
                        type="text"
                        value={passenger.name}
                        onChange={e => onUpdatePassenger(passenger.seatId, 'name', e.target.value)}
                        placeholder="e.g. Dileep Sai Galla"
                        className="w-full bg-transparent text-white text-xs font-bold focus:outline-none placeholder-slate-600"
                      />
                    </div>
                  </div>

                  {/* Age */}
                  <div className="sm:col-span-3">
                    <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase mb-1">
                      Age *
                    </label>
                    <div className="flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 focus-within:border-sky-400 transition-colors">
                      <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                      <input
                        type="number"
                        min="1"
                        max="120"
                        value={passenger.age}
                        onChange={e => onUpdatePassenger(passenger.seatId, 'age', e.target.value ? Number(e.target.value) : '')}
                        placeholder="Age"
                        className="w-full bg-transparent text-white text-xs font-bold focus:outline-none placeholder-slate-600"
                      />
                    </div>
                  </div>

                  {/* Gender Selector */}
                  <div className="sm:col-span-3">
                    <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase mb-1">
                      Gender *
                    </label>
                    <div className="grid grid-cols-3 gap-1">
                      {['Male', 'Female', 'Other'].map(g => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => onUpdatePassenger(passenger.seatId, 'gender', g)}
                          className={`py-2 rounded-xl text-[10px] font-bold border transition-all ${
                            passenger.gender === g
                              ? 'bg-sky-500 border-sky-400 text-slate-950 font-black'
                              : 'bg-slate-950 border-slate-700 text-slate-300 hover:text-white'
                          }`}
                        >
                          {g === 'Male' ? 'M' : g === 'Female' ? 'F' : 'O'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="sm:col-span-6">
                    <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase mb-1">
                      Mobile Number (For SMS & Live Bus Track) *
                    </label>
                    <div className="flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 focus-within:border-sky-400 transition-colors">
                      <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                      <input
                        type="tel"
                        value={passenger.phone}
                        onChange={e => onUpdatePassenger(passenger.seatId, 'phone', e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-transparent text-white text-xs font-bold focus:outline-none placeholder-slate-600"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="sm:col-span-6">
                    <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase mb-1">
                      Email Address (For E-Ticket PDF)
                    </label>
                    <div className="flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 focus-within:border-sky-400 transition-colors">
                      <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                      <input
                        type="email"
                        value={passenger.email}
                        onChange={e => onUpdatePassenger(passenger.seatId, 'email', e.target.value)}
                        placeholder="dileepgalla200056@gmail.com"
                        className="w-full bg-transparent text-white text-xs font-bold focus:outline-none placeholder-slate-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── BOOKING RECAP SIDEBAR (Right 4 cols - Section 9 Requirements) ── */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3.5 sticky top-2">
            <h3 className="text-xs font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Booking Overview
            </h3>

            <div className="space-y-2.5 text-[11px]">
              <div>
                <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">Selected Bus</span>
                <span className="font-black text-white text-xs block">{bus.operator}</span>
                <span className="text-[10px] text-slate-400">{bus.busType}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                <div>
                  <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">Route</span>
                  <span className="font-bold text-slate-200">{bus.departureCity} ➔ {bus.arrivalCity}</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">Travel Date</span>
                  <span className="font-bold text-slate-200">{travelDate || 'Today'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                <div>
                  <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">Seats</span>
                  <span className="font-bold text-sky-400 font-mono">
                    {selectedSeats.map(s => s.number).join(', ')}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">Seat Type</span>
                  <span className="font-bold text-slate-300">{selectedSeats[0]?.berthType || 'Sleeper'}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-1.5">
                <div>
                  <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">Pickup Point</span>
                  <span className="font-bold text-emerald-400 text-[10.5px] block">{pickupPoint.location}</span>
                  <span className="text-[9px] text-slate-400 font-mono">{pickupPoint.time} ({pickupPoint.landmark})</span>
                </div>

                <div className="pt-1">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">Drop Point</span>
                  <span className="font-bold text-orange-400 text-[10.5px] block">{dropPoint.location}</span>
                  <span className="text-[9px] text-slate-400 font-mono">{dropPoint.time} ({dropPoint.landmark})</span>
                </div>
              </div>
            </div>

            {/* PROCEED BUTTON */}
            <button
              disabled={!isValid}
              onClick={onProceed}
              className={`w-full py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
                isValid
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-sky-500/25 active:scale-98'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <span>Proceed to Fare & Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

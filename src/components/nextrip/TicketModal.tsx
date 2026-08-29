import React, { useRef } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  QrCode, 
  Bus as BusIcon, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Share2,
  CheckCircle2
} from 'lucide-react';
import nextripLogo from '../../assets/images/nextrip.png';
import { Booking } from './types';

interface TicketModalProps {
  booking: Booking;
  onClose: () => void;
}

export default function TicketModal({ booking, onClose }: TicketModalProps) {
  const ticketRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left my-auto">
        
        {/* Modal Header Actions */}
        <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Official Digital E-Ticket Pass
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-rose-500 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── HIGH FIDELITY BOARDING PASS E-TICKET (Apple Wallet / Airline Style) ── */}
        <div ref={ticketRef} className="p-5 sm:p-6 space-y-4 bg-gradient-to-b from-slate-900 to-slate-950">
          
          {/* Ticket Header */}
          <div className="bg-gradient-to-r from-sky-600 via-blue-700 to-indigo-700 rounded-2xl p-4 text-white shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/20 p-1 backdrop-blur-md">
                  <img src={nextripLogo} alt="NextTrip" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight leading-none">NextTrip Bus Pass</h3>
                  <span className="text-[9px] font-mono opacity-80">Confirmed Electronic Boarding Pass</span>
                </div>
              </div>

              <div className="text-right font-mono">
                <span className="text-[8px] uppercase tracking-wider block opacity-75">PNR / BOOKING ID</span>
                <span className="text-xs font-black bg-white/20 px-2 py-0.5 rounded-md">
                  {booking.pnr}
                </span>
              </div>
            </div>

            {/* Route & Times */}
            <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
              <div>
                <span className="text-[9px] opacity-75 uppercase font-mono block">From</span>
                <span className="text-base font-black block">{booking.route.from}</span>
                <span className="text-[10px] font-mono opacity-90">{booking.bus.departureTime}</span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[8px] font-mono bg-black/25 px-2 py-0.5 rounded-full mb-1">
                  {booking.bus.duration}
                </span>
                <div className="w-20 h-0.5 bg-white/40 flex items-center justify-center">
                  <BusIcon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[7.5px] font-mono mt-1 opacity-80">Direct Transit</span>
              </div>

              <div className="text-right">
                <span className="text-[9px] opacity-75 uppercase font-mono block">To</span>
                <span className="text-base font-black block">{booking.route.to}</span>
                <span className="text-[10px] font-mono opacity-90">{booking.bus.arrivalTime}</span>
              </div>
            </div>
          </div>

          {/* Ticket Details Grid */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 relative">
            {/* Notch cuts */}
            <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-slate-900 rounded-full border-r border-slate-800" />
            <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-slate-900 rounded-full border-l border-slate-800" />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] font-mono border-b border-slate-800 pb-3">
              <div>
                <span className="text-[8px] text-slate-500 uppercase block font-bold">OPERATOR</span>
                <span className="font-black text-white">{booking.bus.operator}</span>
              </div>
              <div>
                <span className="text-[8px] text-slate-500 uppercase block font-bold">TRAVEL DATE</span>
                <span className="font-bold text-slate-200">{booking.travelDate}</span>
              </div>
              <div>
                <span className="text-[8px] text-slate-500 uppercase block font-bold">SEATS ALLOCATED</span>
                <span className="font-black text-sky-400">{booking.selectedSeats.map(s => s.number).join(', ')}</span>
              </div>
              <div>
                <span className="text-[8px] text-slate-500 uppercase block font-bold">TOTAL FARE</span>
                <span className="font-black text-emerald-400">₹{booking.fare.totalPayable.toLocaleString()}</span>
              </div>
            </div>

            {/* Boarding and Dropping Detailed Point */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10.5px]">
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[8px] font-mono text-sky-400 font-bold uppercase block">BOARDING POINT</span>
                <p className="text-white font-bold mt-0.5">{booking.pickupPoint.location}</p>
                <p className="text-[9.5px] text-slate-400 font-mono mt-0.5">Time: {booking.pickupPoint.time} • Landmark: {booking.pickupPoint.landmark}</p>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[8px] font-mono text-orange-400 font-bold uppercase block">DROPPING POINT</span>
                <p className="text-white font-bold mt-0.5">{booking.dropPoint.location}</p>
                <p className="text-[9.5px] text-slate-400 font-mono mt-0.5">Time: {booking.dropPoint.time} • Landmark: {booking.dropPoint.landmark}</p>
              </div>
            </div>

            {/* Passengers Table */}
            <div className="pt-2">
              <span className="text-[8px] font-mono text-slate-500 uppercase block font-bold mb-1.5">PASSENGER LIST</span>
              <div className="space-y-1.5">
                {booking.passengers.map((p, i) => (
                  <div key={i} className="flex items-center justify-between bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-850 text-[10.5px]">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-sky-400" />
                      <span className="font-bold text-white">{p.name} ({p.age} yrs, {p.gender})</span>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[9.5px] text-slate-400">
                      <span>Seat: <strong className="text-sky-300">{p.seatNumber}</strong></span>
                      <span>Phone: {p.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QR Code & Barcode Verification */}
            <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-white rounded-lg shadow">
                  <QrCode className="w-12 h-12 text-slate-950" />
                </div>
                <div>
                  <span className="text-[9px] font-mono text-emerald-400 font-bold block flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> VERIFIED DIGITAL TICKET
                  </span>
                  <p className="text-[8px] text-slate-400 font-mono mt-0.5">
                    Scan by Bus Conductor / Crew at boarding gate
                  </p>
                </div>
              </div>

              {/* Barcode Visual */}
              <div className="text-center font-mono">
                <div className="h-6 flex items-center gap-0.5 justify-center opacity-80">
                  {Array.from({ length: 28 }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-full bg-slate-300 ${idx % 3 === 0 ? 'w-1' : idx % 2 === 0 ? 'w-0.5' : 'w-1.5'}`}
                    />
                  ))}
                </div>
                <span className="text-[8px] text-slate-500 tracking-widest block mt-0.5">
                  {booking.bookingId}
                </span>
              </div>
            </div>

          </div>

          <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 px-2">
            <span>NextTrip Helpline: 1800-NEXT-TRIP</span>
            <span>Emergency SOS on board: Press Red Button</span>
          </div>
        </div>

      </div>
    </div>
  );
}

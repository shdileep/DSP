import React, { useState } from 'react';
import { 
  Booking, 
  ActiveTab 
} from './types';
import { 
  Bus as BusIcon, 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Ticket, 
  Download, 
  Eye, 
  XCircle, 
  CheckCircle2, 
  AlertCircle, 
  Share2, 
  Plus,
  ShieldCheck,
  Building
} from 'lucide-react';
import TicketModal from './TicketModal';

interface MyBookingsViewProps {
  bookings: Booking[];
  onNavigate: (tab: ActiveTab) => void;
  onCancelBooking: (bookingId: string) => void;
}

export default function MyBookingsView({
  bookings,
  onNavigate,
  onCancelBooking
}: MyBookingsViewProps) {
  const [selectedTicket, setSelectedTicket] = useState<Booking | null>(null);
  const [cancelingBookingId, setCancelingBookingId] = useState<string | null>(null);
  const [filterTab, setFilterTab] = useState<'all' | 'confirmed' | 'completed' | 'cancelled'>('all');

  const filtered = bookings.filter(b => {
    if (filterTab === 'all') return true;
    if (filterTab === 'confirmed') return b.bookingStatus === 'Confirmed';
    if (filterTab === 'completed') return b.bookingStatus === 'Completed';
    if (filterTab === 'cancelled') return b.bookingStatus === 'Cancelled';
    return true;
  });

  const handleConfirmCancel = (id: string) => {
    onCancelBooking(id);
    setCancelingBookingId(null);
  };

  return (
    <div className="space-y-4 text-left">
      {/* ── Top Section Header ── */}
      <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
            <Ticket className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-black text-white">My Bus Bookings & E-Tickets</h2>
            <p className="text-[11px] text-slate-400 font-mono">
              Manage your confirmed journeys, download tickets, and track live status
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('search')}
          className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-sky-500/20 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Book New Bus Ticket</span>
        </button>
      </div>

      {/* ── Filter Tabs (All, Confirmed, Completed, Cancelled) ── */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'all', label: 'All Bookings', count: bookings.length },
          { id: 'confirmed', label: 'Active & Confirmed', count: bookings.filter(b => b.bookingStatus === 'Confirmed').length },
          { id: 'completed', label: 'Completed Trips', count: bookings.filter(b => b.bookingStatus === 'Completed').length },
          { id: 'cancelled', label: 'Cancelled', count: bookings.filter(b => b.bookingStatus === 'Cancelled').length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              filterTab === tab.id
                ? 'bg-sky-500/20 border border-sky-400 text-sky-300 shadow-sm'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span>{tab.label}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[9px] font-mono">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* ── Bookings List ── */}
      {filtered.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-10 text-center space-y-3">
          <Ticket className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No bookings found in this category</h3>
          <p className="text-xs text-slate-400">Book your first trip now and get up to 50% discount with NextTrip.</p>
          <button
            onClick={() => onNavigate('search')}
            className="px-5 py-2.5 rounded-xl bg-sky-500 text-slate-950 font-black text-xs inline-flex items-center gap-2 mt-2"
          >
            <BusIcon className="w-4 h-4" />
            <span>Search Buses</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(booking => (
            <div
              key={booking.bookingId}
              className={`bg-slate-900/90 border rounded-2xl p-4 sm:p-5 shadow-lg transition-all ${
                booking.bookingStatus === 'Confirmed'
                  ? 'border-slate-800 hover:border-slate-700'
                  : 'border-slate-850 opacity-80'
              }`}
            >
              {/* Card Top: Operator, Route & Booking Status Badges */}
              <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-800 pb-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-black text-white">
                      {booking.bus.operator}
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-sky-500/15 text-sky-400 border border-sky-500/30 font-bold">
                      {booking.bus.busType}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Booking ID: <strong className="text-slate-300">{booking.bookingId}</strong> • Booked on {booking.bookedAt}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[9.5px] font-mono font-bold border flex items-center gap-1 ${
                    booking.bookingStatus === 'Confirmed'
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                      : booking.bookingStatus === 'Cancelled'
                      ? 'bg-rose-500/15 border-rose-500/30 text-rose-400'
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}>
                    {booking.bookingStatus === 'Confirmed' && <CheckCircle2 className="w-3 h-3" />}
                    {booking.bookingStatus === 'Cancelled' && <XCircle className="w-3 h-3" />}
                    <span>Status: {booking.bookingStatus}</span>
                  </span>

                  <span className="px-2 py-1 rounded-full text-[9px] font-mono font-bold bg-slate-950 text-slate-400 border border-slate-800">
                    Paid via {booking.paymentMethod}
                  </span>
                </div>
              </div>

              {/* Main Info Grid: Journey details + Passenger + Actions */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                
                {/* Route, Timing & Date (Left 6 cols) */}
                <div className="md:col-span-6 space-y-2">
                  <div className="flex items-center justify-between text-left">
                    <div>
                      <span className="text-base font-black text-white block">
                        {booking.bus.departureTime}
                      </span>
                      <span className="text-xs font-bold text-slate-300">
                        {booking.route.from}
                      </span>
                      <span className="text-[9px] text-slate-400 block font-mono">
                        {booking.pickupPoint.location}
                      </span>
                    </div>

                    <div className="flex flex-col items-center px-2">
                      <span className="text-[9px] font-mono text-slate-400 mb-0.5">{booking.bus.duration}</span>
                      <div className="w-16 h-0.5 bg-sky-500/60 relative flex items-center justify-center">
                        <BusIcon className="w-3 h-3 text-sky-400" />
                      </div>
                      <span className="text-[8px] font-mono text-slate-500 mt-0.5">{booking.travelDate}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-black text-white block">
                        {booking.bus.arrivalTime}
                      </span>
                      <span className="text-xs font-bold text-slate-300">
                        {booking.route.to}
                      </span>
                      <span className="text-[9px] text-slate-400 block font-mono">
                        {booking.dropPoint.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Seats & Passenger Details (Middle 3 cols) */}
                <div className="md:col-span-3 border-t md:border-t-0 md:border-l border-slate-800 md:pl-4 space-y-1 text-[11px] font-mono">
                  <div>
                    <span className="text-[8.5px] text-slate-500 uppercase block font-bold">SEATS</span>
                    <span className="text-xs font-black text-sky-400">
                      {booking.selectedSeats.map(s => s.number).join(', ')} ({booking.selectedSeats[0]?.berthType || 'Sleeper'})
                    </span>
                  </div>

                  <div>
                    <span className="text-[8.5px] text-slate-500 uppercase block font-bold">PRIMARY PASSENGER</span>
                    <span className="font-bold text-slate-200">{booking.passengers[0]?.name || 'Passenger'}</span>
                  </div>

                  <div>
                    <span className="text-[8.5px] text-slate-500 uppercase block font-bold">TOTAL AMOUNT PAID</span>
                    <span className="text-xs font-black text-emerald-400">₹{booking.fare.totalPayable.toLocaleString()}</span>
                  </div>
                </div>

                {/* Actions (Right 3 cols) */}
                <div className="md:col-span-3 flex flex-col sm:flex-row md:flex-col gap-2 justify-center pt-3 md:pt-0 border-t md:border-t-0 md:border-l border-slate-800 md:pl-4">
                  {/* VIEW / SHOW TICKET */}
                  <button
                    onClick={() => setSelectedTicket(booking)}
                    className="w-full py-2 px-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-sky-500/20 active:scale-95 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Ticket</span>
                  </button>

                  {/* DOWNLOAD / PRINT */}
                  <button
                    onClick={() => setSelectedTicket(booking)}
                    className="w-full py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-[11px] flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download PDF</span>
                  </button>

                  {/* CANCEL TICKET */}
                  {booking.bookingStatus === 'Confirmed' && (
                    <button
                      onClick={() => setCancelingBookingId(booking.bookingId)}
                      className="w-full py-1.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-[10.5px] font-bold flex items-center justify-center gap-1 border border-rose-500/20 transition-colors"
                    >
                      <XCircle className="w-3 h-3" />
                      <span>Cancel Booking</span>
                    </button>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── TICKET MODAL VIEW ── */}
      {selectedTicket && (
        <TicketModal
          booking={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}

      {/* ── CANCEL BOOKING CONFIRMATION MODAL ── */}
      {cancelingBookingId && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-500/40 rounded-3xl p-6 max-w-md w-full shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-black text-white">Cancel Bus Booking?</h3>
              <p className="text-xs text-slate-300">
                Are you sure you want to cancel booking <strong className="text-sky-400 font-mono">{cancelingBookingId}</strong>?
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[10.5px] font-mono text-left space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Refund Policy:</span>
                <span className="text-emerald-400 font-bold">100% Instant Refund</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Refund Credit to:</span>
                <span className="text-white">Original Source Account</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setCancelingBookingId(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
              >
                No, Keep Booking
              </button>
              <button
                onClick={() => handleConfirmCancel(cancelingBookingId)}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-lg shadow-rose-600/25"
              >
                Yes, Cancel & Refund
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

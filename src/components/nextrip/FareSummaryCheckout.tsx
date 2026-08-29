import React, { useState } from 'react';
import { 
  Bus as BusIcon, 
  ArrowLeft, 
  CheckCircle2, 
  CreditCard, 
  QrCode, 
  ShieldCheck, 
  Tag, 
  Lock, 
  Sparkles, 
  Zap, 
  Smartphone,
  Building2,
  Wallet,
  Check,
  AlertCircle
} from 'lucide-react';
import { Bus, BoardingDroppingPoint, Seat, PassengerInfo, FareBreakdown, Coupon } from './types';
import { AVAILABLE_COUPONS } from './mockData';

interface FareSummaryCheckoutProps {
  bus: Bus;
  selectedSeats: Seat[];
  travelDate: string;
  pickupPoint: BoardingDroppingPoint;
  dropPoint: BoardingDroppingPoint;
  passengers: PassengerInfo[];
  appliedCoupon: Coupon | null;
  onApplyCoupon: (coupon: Coupon | null) => void;
  onBack: () => void;
  onPaymentSuccess: (bookingDetails: {
    fare: FareBreakdown;
    paymentMethod: string;
    couponCode?: string;
  }) => void;
}

export default function FareSummaryCheckout({
  bus,
  selectedSeats,
  travelDate,
  pickupPoint,
  dropPoint,
  passengers,
  appliedCoupon,
  onApplyCoupon,
  onBack,
  onPaymentSuccess
}: FareSummaryCheckoutProps) {
  const [couponInput, setCouponInput] = useState(appliedCoupon?.code || '');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState(appliedCoupon ? 'Coupon applied successfully!' : '');
  
  // Payment methods
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [processingStage, setProcessingStage] = useState('');

  // Card form state
  const [cardNumber, setCardNumber] = useState('4532 8821 9012 4432');
  const [cardHolder, setCardHolder] = useState(passengers[0]?.name || 'Dileep Sai Galla');
  const [cardExp, setCardExp] = useState('09/30');
  const [cardCvv, setCardCvv] = useState('821');

  // Calculate itemized fare
  const baseSeatSum = selectedSeats.reduce((acc, s) => acc + s.price, 0);
  const regularDiscount = (bus.originalPrice - bus.basePrice) > 0 ? (bus.originalPrice - bus.basePrice) * selectedSeats.length : 0;
  
  let couponDiscountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      const calc = (baseSeatSum * appliedCoupon.discountPercent) / 100;
      couponDiscountAmount = appliedCoupon.maxDiscount ? Math.min(calc, appliedCoupon.maxDiscount) : calc;
    } else if (appliedCoupon.flatDiscount) {
      couponDiscountAmount = appliedCoupon.flatDiscount;
    }
  }

  const taxableAmount = Math.max(0, baseSeatSum - couponDiscountAmount);
  const gstAmount = Math.round(taxableAmount * 0.05); // 5% GST
  const convenienceFee = 29; // Standard nominal fee
  const finalTotal = Math.max(0, taxableAmount + gstAmount + convenienceFee);

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponInput).trim().toUpperCase();
    if (!code) {
      setCouponError('Please enter a valid promo code');
      return;
    }

    const found = AVAILABLE_COUPONS.find(c => c.code.toUpperCase() === code);
    if (!found) {
      setCouponError('Invalid promo code. Try NEXTRIP50 or FIRSTBUS');
      setCouponSuccess('');
      onApplyCoupon(null);
      return;
    }

    if (baseSeatSum < found.minBooking) {
      setCouponError(`Minimum booking amount of ₹${found.minBooking} required`);
      setCouponSuccess('');
      onApplyCoupon(null);
      return;
    }

    onApplyCoupon(found);
    setCouponInput(found.code);
    setCouponError('');
    setCouponSuccess(`Coupon ${found.code} applied! Saved ₹${
      found.discountPercent ? Math.min((baseSeatSum * found.discountPercent) / 100, found.maxDiscount || 500) : found.flatDiscount
    }`);
  };

  const handleRemoveCoupon = () => {
    onApplyCoupon(null);
    setCouponInput('');
    setCouponError('');
    setCouponSuccess('');
  };

  const handleProcessPayment = () => {
    setIsProcessingPayment(true);
    setProcessingStage('Connecting to 256-Bit SSL Payment Gateway...');

    setTimeout(() => {
      setProcessingStage('Verifying transaction token & acquiring locks...');
    }, 1000);

    setTimeout(() => {
      setProcessingStage('Authorizing payment with bank server...');
    }, 2000);

    setTimeout(() => {
      setProcessingStage('Payment Successful! Generating E-Ticket...');
    }, 3000);

    setTimeout(() => {
      const fareBreakdown: FareBreakdown = {
        baseFare: baseSeatSum,
        seatSpecificPrice: baseSeatSum,
        gstAmount,
        convenienceFee,
        discountAmount: regularDiscount,
        couponDiscount: couponDiscountAmount,
        totalPayable: finalTotal
      };

      onPaymentSuccess({
        fare: fareBreakdown,
        paymentMethod: paymentMethod === 'upi' ? 'UPI (Google Pay / PhonePe)' : paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'netbanking' ? 'Net Banking' : 'Mobile Wallet',
        couponCode: appliedCoupon?.code
      });
    }, 3600);
  };

  return (
    <div className="space-y-4 text-left">
      {/* ── Top Header Bar ── */}
      <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base font-black text-white">Payment & Final Confirmation</h2>
            <p className="text-[11px] text-slate-400 font-mono">
              Secure 256-Bit Encrypted Checkout Gateway
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          <Lock className="w-3.5 h-3.5" />
          <span>PCI-DSS Level 1 Certified</span>
        </div>
      </div>

      {/* ── Main Layout: Payment Gateways (Left 7 cols) + Itemized Fare Breakdown (Right 5 cols) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* ── PAYMENT METHODS SECTION (Left 7 cols) ── */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
            <h3 className="text-xs font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2.5 flex items-center justify-between">
              <span>Select Payment Method</span>
              <span className="text-[9.5px] font-mono text-sky-400">Instant Confirmation</span>
            </h3>

            {/* Payment Method Selector Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'upi' as const, label: 'UPI / QR', icon: QrCode },
                { id: 'card' as const, label: 'Cards', icon: CreditCard },
                { id: 'netbanking' as const, label: 'NetBanking', icon: Building2 },
                { id: 'wallet' as const, label: 'Wallets', icon: Wallet }
              ].map(m => {
                const Icon = m.icon;
                const isSelected = paymentMethod === m.id;

                return (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-black shadow-md shadow-sky-500/10'
                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs">{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* ── UPI / QR CODE VIEW ── */}
            {paymentMethod === 'upi' && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner">
                <div className="flex flex-col items-center p-3 bg-white rounded-xl shadow-lg shrink-0">
                  <QrCode className="w-28 h-28 text-slate-950" />
                  <span className="text-[8px] font-mono text-slate-600 font-bold mt-1">Scan via any UPI App</span>
                </div>

                <div className="space-y-2 text-left flex-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-emerald-400">Live QR Session Active (10:00)</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Scan with Google Pay, PhonePe, Paytm, BHIM, or any banking app to complete payment of <strong className="text-white">₹{finalTotal.toLocaleString()}</strong>.
                  </p>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800 text-[10px] text-slate-400 font-mono">
                    <span>VPA:</span>
                    <span className="bg-slate-900 px-2 py-0.5 rounded text-sky-400 font-bold border border-slate-700">
                      nextrip.pay@icici
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ── CREDIT / DEBIT CARD VIEW WITH 3D CARD PREVIEW ── */}
            {paymentMethod === 'card' && (
              <div className="space-y-3">
                {/* 3D Holographic Card Mockup */}
                <div className="w-full h-36 bg-gradient-to-tr from-sky-900 via-indigo-950 to-slate-950 border border-sky-500/40 rounded-2xl p-4 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-5 bg-amber-400/90 rounded flex items-center justify-center font-black text-[8px] text-slate-950">
                        CHIP
                      </div>
                      <span className="text-[9px] font-mono text-sky-300 font-black uppercase tracking-widest">
                        NEXTRIP TITANIUM
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 font-bold">VISA PLATINUM</span>
                  </div>

                  <p className="text-white text-base font-mono tracking-widest font-black text-center">
                    {cardNumber || '•••• •••• •••• ••••'}
                  </p>

                  <div className="flex justify-between items-center text-[9px] font-mono text-slate-300">
                    <div>
                      <span className="text-[7px] text-slate-500 uppercase block">CARDHOLDER</span>
                      <span className="font-bold">{cardHolder || 'PASSENGER NAME'}</span>
                    </div>
                    <div>
                      <span className="text-[7px] text-slate-500 uppercase block">EXPIRES</span>
                      <span className="font-bold">{cardExp || 'MM/YY'}</span>
                    </div>
                  </div>
                </div>

                {/* Card Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 text-left">
                  <div className="sm:col-span-12">
                    <label className="text-[9px] font-mono font-bold text-slate-400 uppercase block mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      placeholder="4532 8821 9012 4432"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs font-mono font-bold focus:outline-none focus:border-sky-400"
                    />
                  </div>
                  <div className="sm:col-span-6">
                    <label className="text-[9px] font-mono font-bold text-slate-400 uppercase block mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={e => setCardHolder(e.target.value)}
                      placeholder="Dileep Sai Galla"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs font-bold focus:outline-none focus:border-sky-400"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="text-[9px] font-mono font-bold text-slate-400 uppercase block mb-1">Expiry</label>
                    <input
                      type="text"
                      value={cardExp}
                      onChange={e => setCardExp(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs font-mono font-bold focus:outline-none focus:border-sky-400 text-center"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="text-[9px] font-mono font-bold text-slate-400 uppercase block mb-1">CVV</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={e => setCardCvv(e.target.value)}
                      placeholder="•••"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs font-mono font-bold focus:outline-none focus:border-sky-400 text-center"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ── NETBANKING VIEW ── */}
            {paymentMethod === 'netbanking' && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <p className="text-xs font-bold text-white">Popular Indian Banks</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-bold">
                  {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank'].map((b, i) => (
                    <button
                      key={b}
                      className={`p-2.5 rounded-lg border text-center ${i === 0 ? 'bg-sky-500/20 border-sky-400 text-sky-300' : 'bg-slate-900 border-slate-800 text-slate-300'}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── WALLETS VIEW ── */}
            {paymentMethod === 'wallet' && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <p className="text-xs font-bold text-white">Available Mobile Wallets</p>
                <div className="grid grid-cols-3 gap-2 text-[11px] font-bold">
                  {['Paytm Wallet', 'Amazon Pay', 'Mobikwik'].map((w, i) => (
                    <button
                      key={w}
                      className={`p-2.5 rounded-lg border text-center ${i === 0 ? 'bg-sky-500/20 border-sky-400 text-sky-300' : 'bg-slate-900 border-slate-800 text-slate-300'}`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── FARE SUMMARY & COUPON SECTION (Right 5 cols - Section 10 Requirements) ── */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3.5 sticky top-2">
            <h3 className="text-xs font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Fare Summary & Tax Invoice
            </h3>

            {/* Itemized Fare List */}
            <div className="space-y-2 text-[11px] font-mono">
              <div className="flex justify-between text-slate-300">
                <span>Base Ticket Price ({selectedSeats.length} Seat{selectedSeats.length !== 1 ? 's' : ''}):</span>
                <span className="font-bold text-white">₹{baseSeatSum.toLocaleString()}</span>
              </div>

              {selectedSeats.map(seat => (
                <div key={seat.id} className="flex justify-between text-[10px] text-slate-400 pl-2 border-l border-slate-800">
                  <span>Seat {seat.number} ({seat.berthType}):</span>
                  <span>₹{seat.price}</span>
                </div>
              ))}

              <div className="flex justify-between text-slate-300 pt-1 border-t border-slate-800">
                <span>Applicable GST (5%):</span>
                <span className="text-emerald-400 font-bold">+₹{gstAmount}</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Convenience & Platform Charges:</span>
                <span className="text-slate-400 font-bold">+₹{convenienceFee}</span>
              </div>

              {couponDiscountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/20">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3 h-3" /> Coupon ({appliedCoupon?.code}):
                  </span>
                  <span>-₹{couponDiscountAmount}</span>
                </div>
              )}

              {/* FINAL PAYABLE AMOUNT */}
              <div className="flex justify-between items-baseline text-white font-black text-sm pt-2 border-t-2 border-slate-800">
                <span className="font-sans">Final Payable Amount:</span>
                <span className="text-xl text-sky-400 font-mono">₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* ── COUPON CODE SECTION (Section 10 Requirement) ── */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[9px] font-mono text-slate-400 uppercase font-bold flex items-center gap-1">
                <Tag className="w-3 h-3 text-sky-400" /> Apply Coupon Code
              </span>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={e => setCouponInput(e.target.value.toUpperCase())}
                  placeholder="e.g. NEXTRIP50"
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white text-xs font-mono font-black focus:outline-none focus:border-sky-400 uppercase"
                />
                {appliedCoupon ? (
                  <button
                    onClick={handleRemoveCoupon}
                    className="px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 text-[10px] font-bold rounded-xl border border-rose-500/30"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={() => handleApplyCoupon()}
                    className="px-4 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-black rounded-xl shadow transition-all"
                  >
                    Apply
                  </button>
                )}
              </div>

              {/* Coupon Feedback Messages */}
              {couponError && (
                <p className="text-[9px] text-rose-400 flex items-center gap-1 font-mono">
                  <AlertCircle className="w-3 h-3" /> {couponError}
                </p>
              )}
              {couponSuccess && (
                <p className="text-[9px] text-emerald-400 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3" /> {couponSuccess}
                </p>
              )}

              {/* Quick Coupon Suggestions */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                {AVAILABLE_COUPONS.slice(0, 2).map(c => (
                  <button
                    key={c.code}
                    onClick={() => handleApplyCoupon(c.code)}
                    className="px-2 py-0.5 rounded bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 text-[9px] font-mono font-bold"
                  >
                    {c.code}
                  </button>
                ))}
              </div>
            </div>

            {/* PAY NOW BUTTON */}
            <button
              disabled={isProcessingPayment}
              onClick={handleProcessPayment}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 active:scale-98 transition-all"
            >
              <Lock className="w-4 h-4 text-slate-950" />
              <span>PAY NOW • ₹{finalTotal.toLocaleString()}</span>
            </button>
          </div>
        </div>

      </div>

      {/* ── MODAL: LIVE PAYMENT PROCESSING SCREEN ── */}
      {isProcessingPayment && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-sky-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 mx-auto flex items-center justify-center text-white shadow-xl shadow-sky-500/30 animate-pulse">
              <Zap className="w-8 h-8 text-yellow-300 fill-yellow-300" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-black text-white">Securing Your Bus Tickets</h3>
              <p className="text-xs font-mono text-sky-400 font-bold">{processingStage}</p>
            </div>

            <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div className="h-full bg-gradient-to-r from-sky-400 via-indigo-500 to-emerald-400 w-full animate-pulse" />
            </div>

            <p className="text-[10px] text-slate-400 font-mono">
              Do not refresh or close this window. Your optimistic transaction is being confirmed with NextTrip Ledger.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

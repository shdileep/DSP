import React, { useState } from 'react';
import { 
  Tag, 
  Copy, 
  Check, 
  Sparkles, 
  Percent, 
  Calendar, 
  ShieldCheck, 
  ArrowRight,
  Flame
} from 'lucide-react';
import { AVAILABLE_COUPONS } from './mockData';
import { Coupon, ActiveTab } from './types';

interface OffersViewProps {
  onSelectCoupon: (coupon: Coupon) => void;
  onNavigate: (tab: ActiveTab) => void;
}

export default function OffersView({ onSelectCoupon, onNavigate }: OffersViewProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="space-y-4 text-left">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600/20 via-slate-900 to-sky-900/20 border border-amber-500/30 rounded-2xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold flex items-center gap-1 border border-amber-500/30">
              <Flame className="w-3.5 h-3.5 text-amber-400" /> FESTIVE SEASON OFFERS
            </span>
            <span className="text-xs text-slate-400">Save up to ₹500 today</span>
          </div>
          <h2 className="text-base font-black text-white">NextTrip Exclusive Bus Deals & Coupon Vault</h2>
          <p className="text-xs text-slate-300">
            Apply these verified coupons during checkout for instant fare discounts and cashback.
          </p>
        </div>

        <button
          onClick={() => onNavigate('search')}
          className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-amber-400/20 transition-all"
        >
          <span>Book with Deal</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {AVAILABLE_COUPONS.map(coupon => (
          <div
            key={coupon.code}
            className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden transition-all duration-200 group"
          >
            {/* Notch cutouts */}
            <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-slate-950 rounded-full border-r border-slate-800" />
            <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-slate-950 rounded-full border-l border-slate-800" />

            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/20">
                    <Tag className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-black text-white">{coupon.title}</h3>
                </div>
                <p className="text-xs text-slate-300">{coupon.description}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-lg font-black text-amber-400 font-mono block">
                  {coupon.discountPercent ? `${coupon.discountPercent}% OFF` : `₹${coupon.flatDiscount} OFF`}
                </span>
                <span className="text-[8.5px] font-mono text-slate-500">Min. ₹{coupon.minBooking}</span>
              </div>
            </div>

            {/* Code Box and Copy Button */}
            <div className="mt-4 pt-3 border-t border-dashed border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black tracking-widest text-sky-300 bg-sky-500/10 px-3 py-1 rounded-lg border border-sky-500/20">
                  {coupon.code}
                </span>
                <span className="text-[9px] font-mono text-slate-500">Valid till {coupon.validTill}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCopy(coupon.code)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10.5px] font-bold flex items-center gap-1 border border-slate-700 transition-colors"
                >
                  {copiedCode === coupon.code ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    onSelectCoupon(coupon);
                    onNavigate('search');
                  }}
                  className="px-3 py-1 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-[10.5px] font-black shadow transition-all"
                >
                  Apply Deal
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

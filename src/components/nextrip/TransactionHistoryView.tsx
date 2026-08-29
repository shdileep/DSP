import React from 'react';
import { 
  Receipt, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Download, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Building,
  CreditCard
} from 'lucide-react';
import { Booking } from './types';

interface TransactionHistoryViewProps {
  bookings: Booking[];
}

export default function TransactionHistoryView({ bookings }: TransactionHistoryViewProps) {
  const transactions = [
    {
      id: 'TXN-2026-9041',
      date: '28 Aug 2026, 10:14 PM',
      type: 'Booking Payment',
      operator: 'Vinayaka Travels',
      route: 'Hyderabad ➔ Pune',
      amount: 1680,
      mode: 'UPI (Google Pay)',
      status: 'Success'
    },
    {
      id: 'TXN-2026-4432',
      date: '24 Aug 2026, 04:30 PM',
      type: 'Booking Payment',
      operator: 'Kumaran Travels',
      route: 'Secunderabad ➔ Guntur',
      amount: 1833,
      mode: 'Credit Card (Visa •••• 8821)',
      status: 'Success'
    },
    {
      id: 'TXN-2026-1102',
      date: '10 Aug 2026, 02:15 PM',
      type: 'Booking Payment',
      operator: 'Orange Tours & Travels',
      route: 'Bengaluru ➔ Chennai',
      amount: 2499,
      mode: 'NetBanking (HDFC Bank)',
      status: 'Success'
    }
  ];

  return (
    <div className="space-y-4 text-left">
      <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-black text-white">Transaction History & Tax Invoices</h2>
            <p className="text-[11px] text-slate-400 font-mono">
              Complete audit ledger of all booking debits, GST invoices, and refunds
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-[11px] font-mono">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[9px] font-bold border-b border-slate-800">
              <tr>
                <th className="p-3.5">Txn ID / Date</th>
                <th className="p-3.5">Service Details</th>
                <th className="p-3.5">Payment Method</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {transactions.map(t => (
                <tr key={t.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5">
                    <span className="text-white font-bold block">{t.id}</span>
                    <span className="text-[9px] text-slate-400 font-sans">{t.date}</span>
                  </td>
                  <td className="p-3.5">
                    <span className="text-sky-400 font-bold block font-sans">{t.operator}</span>
                    <span className="text-[10px] text-slate-300 font-sans">{t.route}</span>
                  </td>
                  <td className="p-3.5 text-slate-300">
                    {t.mode}
                  </td>
                  <td className="p-3.5">
                    <span className="text-xs font-black text-emerald-400">₹{t.amount.toLocaleString()}</span>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 inline-flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" /> {t.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => alert(`Downloading GST Tax Invoice for ${t.id}`)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] font-bold inline-flex items-center gap-1 border border-slate-700"
                    >
                      <Download className="w-3 h-3" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  Wallet, 
  CreditCard, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Download, 
  Search, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Check, 
  X,
  Printer
} from 'lucide-react';
import { PayrollRecord } from './types';
import { INITIAL_PAYROLL } from './mockData';

export default function PayrollView() {
  const [records, setRecords] = useState<PayrollRecord[]>(INITIAL_PAYROLL);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<PayrollRecord | null>(null);
  const [payoutSuccess, setPayoutSuccess] = useState<string | null>(null);

  const handleProcessPayout = (id: string) => {
    setRecords(prev => prev.map(r => {
      if (r.id === id) {
        return { ...r, status: 'Paid', paymentDate: 'Today' };
      }
      return r;
    }));
    setPayoutSuccess(`Payout processed successfully for ${id}`);
    setTimeout(() => setPayoutSuccess(null), 3000);
  };

  const filteredRecords = records.filter(r => 
    r.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPayroll = records.reduce((acc, r) => acc + r.netSalary, 0);
  const processedCount = records.filter(r => r.status === 'Processed' || r.status === 'Paid').length;

  return (
    <div className="space-y-4 text-left font-sans animate-in fade-in duration-200">
      
      {/* ── Top Header & Metrics Bar ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-2xl backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 text-[8px] font-mono uppercase">
            <span>Total Monthly Disbursal</span>
            <Wallet className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-xl font-black text-white">₹{totalPayroll.toLocaleString('en-IN')}</span>
            <span className="text-[7.5px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              August 2026
            </span>
          </div>
        </div>

        <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-2xl backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 text-[8px] font-mono uppercase">
            <span>Processed Records</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-xl font-black text-cyan-400">{processedCount} / {records.length}</span>
            <span className="text-[7.5px] font-mono text-slate-400">92% Completed</span>
          </div>
        </div>

        <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-2xl backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 text-[8px] font-mono uppercase">
            <span>Next Settlement Date</span>
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-xl font-black text-white">01 Sep 2026</span>
            <span className="text-[7.5px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
              Direct Bank Transfer
            </span>
          </div>
        </div>
      </div>

      {/* Payout feedback banner */}
      {payoutSuccess && (
        <div className="p-2.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 font-mono text-[9px] flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {payoutSuccess}
          </span>
          <span className="text-[7.5px] text-emerald-400">NEFT / IMPS Reference Generated</span>
        </div>
      )}

      {/* Search and Table Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-900/70 border border-slate-800 p-2.5 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-extrabold text-white">Driver Salary &amp; Attendance Roster</span>
        </div>

        <div className="relative w-full sm:w-56">
          <Search className="w-3 h-3 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Search driver, employee ID..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-7 pr-2.5 py-1 text-[8.5px] text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Payroll Records Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredRecords.map(rec => (
          <div
            key={rec.id}
            className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all backdrop-blur-md space-y-2.5"
          >
            {/* Top row */}
            <div className="flex items-start justify-between pb-2 border-b border-slate-800">
              <div>
                <h4 className="font-extrabold text-white text-xs">{rec.driverName}</h4>
                <div className="flex items-center gap-1.5 font-mono text-[7.5px] text-slate-400 mt-0.5">
                  <span className="bg-slate-950 px-1.5 py-0.2 rounded border border-slate-850 font-bold text-slate-300">{rec.empId}</span>
                  <span>•</span>
                  <span>{rec.role}</span>
                </div>
              </div>

              <div className="text-right">
                <span className={`px-2 py-0.5 rounded-full text-[7.5px] font-mono font-bold uppercase ${
                  rec.status === 'Paid' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                  rec.status === 'Processed' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' :
                  'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                }`}>
                  {rec.status}
                </span>
                <span className="text-[7px] font-mono text-slate-500 block mt-0.5">
                  Payout: {rec.paymentDate}
                </span>
              </div>
            </div>

            {/* Attendance & Overtime Specs */}
            <div className="grid grid-cols-4 gap-1.5 text-[7.5px] font-mono">
              <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-850">
                <span className="text-slate-500 block text-[6px] uppercase">Working Days</span>
                <span className="text-white font-extrabold block mt-0.5">{rec.workingDays} / {rec.totalDays}</span>
              </div>
              <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-850">
                <span className="text-slate-500 block text-[6px] uppercase">Attendance</span>
                <span className="text-emerald-400 font-extrabold block mt-0.5">{rec.attendancePercent}%</span>
              </div>
              <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-850">
                <span className="text-slate-500 block text-[6px] uppercase">Overtime</span>
                <span className="text-cyan-400 font-extrabold block mt-0.5">{rec.overtimeHours} hrs</span>
              </div>
              <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-850">
                <span className="text-slate-500 block text-[6px] uppercase">Leave</span>
                <span className="text-amber-400 font-extrabold block mt-0.5">{rec.leaveDays} days</span>
              </div>
            </div>

            {/* Financial Breakdown & Actions */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[8px] font-mono">
              <div>
                <span className="text-slate-500 text-[7px] block">Net Take-Home Salary:</span>
                <span className="text-white font-black text-sm">₹{rec.netSalary.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSelectedRecord(rec)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl font-bold flex items-center gap-1 transition-colors"
                >
                  <FileText className="w-3 h-3 text-cyan-400" />
                  Payslip
                </button>
                {rec.status !== 'Paid' && (
                  <button
                    onClick={() => handleProcessPayout(rec.id)}
                    className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-extrabold transition-colors shadow"
                  >
                    Disburse
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Payslip Modal */}
      {selectedRecord && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in duration-150"
          onClick={() => setSelectedRecord(null)}
        >
          <div 
            className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full p-5 shadow-2xl text-left font-sans"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-3 border-b border-slate-800 mb-3">
              <div>
                <span className="text-[8px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                  Ujjwal Hub City Logistics Ltd.
                </span>
                <h3 className="font-extrabold text-white text-base">Salary Payslip • Aug 2026</h3>
              </div>
              <button 
                onClick={() => setSelectedRecord(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-[9px] font-mono">
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-850 flex justify-between">
                <div>
                  <span className="text-slate-500 block text-[7px]">EMPLOYEE NAME</span>
                  <span className="text-white font-bold">{selectedRecord.driverName}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block text-[7px]">EMPLOYEE ID</span>
                  <span className="text-cyan-400 font-bold">{selectedRecord.empId}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>Base Salary (26 Days):</span>
                  <span className="text-white">₹{selectedRecord.baseSalary.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Overtime Pay ({selectedRecord.overtimeHours} hrs):</span>
                  <span className="text-emerald-400">+ ₹{selectedRecord.overtimePay.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Fuel &amp; Route Allowance:</span>
                  <span className="text-emerald-400">+ ₹{selectedRecord.allowances.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>PF &amp; Insurance Deductions:</span>
                  <span className="text-red-400">- ₹{selectedRecord.deductions.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between text-white font-bold text-xs">
                  <span>Total Net Disbursed:</span>
                  <span className="text-emerald-400">₹{selectedRecord.netSalary.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-slate-950 border border-slate-850 text-[8px] text-slate-400 flex justify-between">
                <span>Bank: {selectedRecord.bankAccount}</span>
                <span className="text-cyan-400">{selectedRecord.upiId}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
              >
                Close
              </button>
              <button
                onClick={() => alert(`Payslip for ${selectedRecord.driverName} downloaded.`)}
                className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 shadow"
              >
                <Download className="w-3 h-3" />
                Download Slip
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

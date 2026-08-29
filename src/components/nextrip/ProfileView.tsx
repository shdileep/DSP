import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  Bookmark, 
  Heart, 
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { SavedPassenger } from './types';

interface ProfileViewProps {
  savedPassengers: SavedPassenger[];
  onAddSavedPassenger: (p: SavedPassenger) => void;
  onDeleteSavedPassenger: (id: string) => void;
}

export default function ProfileView({
  savedPassengers,
  onAddSavedPassenger,
  onDeleteSavedPassenger
}: ProfileViewProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newGender, setNewGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleAdd = () => {
    if (!newName.trim() || !newAge) return;
    onAddSavedPassenger({
      id: `sp-${Date.now()}`,
      name: newName.trim(),
      age: Number(newAge),
      gender: newGender,
      phone: newPhone || '+91 98765 43210',
      email: newEmail || 'user@example.com'
    });
    setShowAddModal(false);
    setNewName('');
    setNewAge('');
    setNewPhone('');
    setNewEmail('');
  };

  return (
    <div className="space-y-4 text-left">
      {/* Profile Header */}
      <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-sky-500/20">
            D
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-white">Dileep Sai Galla</h2>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Verified Account
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              dileepgalla200056@gmail.com • +91 98765 43210
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-sky-500/20 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Passenger</span>
        </button>
      </div>

      {/* Saved Passengers List */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-sky-400" />
            <h3 className="text-xs font-black text-white uppercase tracking-wider">
              Saved Co-Passengers Directory ({savedPassengers.length})
            </h3>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Autofills during booking</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {savedPassengers.map(sp => (
            <div
              key={sp.id}
              className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors group shadow-inner"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-black text-xs text-sky-400">
                  {sp.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors">
                      {sp.name}
                    </span>
                    {sp.isPrimary && (
                      <span className="px-1.5 py-0.2 rounded bg-sky-500/15 text-sky-400 text-[8px] font-mono font-bold">
                        Primary
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {sp.age} yrs • {sp.gender} • {sp.phone}
                  </p>
                </div>
              </div>

              {!sp.isPrimary && (
                <button
                  onClick={() => onDeleteSavedPassenger(sp.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Delete Passenger"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add Passenger Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-left animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-sm font-black text-white">Add New Passenger to Directory</h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[9px] font-mono text-slate-400 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="Passenger Name"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] font-mono text-slate-400 uppercase mb-1">Age</label>
                  <input
                    type="number"
                    value={newAge}
                    onChange={e => setNewAge(e.target.value)}
                    placeholder="25"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-mono text-slate-400 uppercase mb-1">Gender</label>
                  <select
                    value={newGender}
                    onChange={e => setNewGender(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-sky-400"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-mono text-slate-400 uppercase mb-1">Mobile Number</label>
                <input
                  type="tel"
                  value={newPhone}
                  onChange={e => setNewPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-sky-400"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 py-2 rounded-xl bg-sky-500 text-slate-950 font-black text-xs shadow"
              >
                Save Passenger
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

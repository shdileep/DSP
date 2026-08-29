import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Bell, 
  ShieldCheck, 
  Moon, 
  Smartphone, 
  HelpCircle, 
  Lock,
  Globe
} from 'lucide-react';

export default function SettingsView() {
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [promoOffers, setPromoOffers] = useState(true);
  const [womenSafetyPriority, setWomenSafetyPriority] = useState(true);

  return (
    <div className="space-y-4 text-left">
      <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
            <SettingsIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-black text-white">System Settings & Security</h2>
            <p className="text-[11px] text-slate-400 font-mono">
              Configure communication preferences, notifications, and security protocols
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Notifications */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Bell className="w-4 h-4 text-sky-400" />
            <h3 className="text-xs font-black text-white uppercase tracking-wider">
              Transit Notifications & Alerts
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-bold">SMS Live Bus Tracking</p>
                <p className="text-[10px] text-slate-400">Receive driver GPS link 1 hour before departure</p>
              </div>
              <button
                onClick={() => setSmsAlerts(!smsAlerts)}
                className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${smsAlerts ? 'bg-sky-500' : 'bg-slate-800'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${smsAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-bold">WhatsApp Ticket Dispatch</p>
                <p className="text-[10px] text-slate-400">Instant PDF & boarding pass over WhatsApp</p>
              </div>
              <button
                onClick={() => setWhatsappUpdates(!whatsappUpdates)}
                className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${whatsappUpdates ? 'bg-sky-500' : 'bg-slate-800'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${whatsappUpdates ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-bold">Fare Drop & Deal Alerts</p>
                <p className="text-[10px] text-slate-400">Get notified when ticket prices decrease on your frequent routes</p>
              </div>
              <button
                onClick={() => setPromoOffers(!promoOffers)}
                className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${promoOffers ? 'bg-sky-500' : 'bg-slate-800'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${promoOffers ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Security and Trust */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-black text-white uppercase tracking-wider">
              Safety & Security
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-bold">Women Safety Seat Allocation Preference</p>
                <p className="text-[10px] text-slate-400">Default to verified female-friendly buses</p>
              </div>
              <button
                onClick={() => setWomenSafetyPriority(!womenSafetyPriority)}
                className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${womenSafetyPriority ? 'bg-pink-500' : 'bg-slate-800'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${womenSafetyPriority ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">APP VERSION</span>
              <p className="text-white font-mono text-xs font-bold">NextTrip PC Edition v3.8.2-PRO</p>
              <p className="text-[9px] text-slate-400 font-mono">React 19 • Express Solver • PostgreSQL Layer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

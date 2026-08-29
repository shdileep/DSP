import React, { useState } from 'react';
import NextTripPCApp from '../nextrip/NextTripPCApp';
import { ActiveTab } from '../nextrip/types';
import { X } from 'lucide-react';

export default function NextTripPreview() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('search');

  return (
    <div className="relative w-full h-full min-h-[420px] flex flex-col bg-[#070d18] select-none overflow-hidden">
      {/* Standard embedded PC application view */}
      <div className="flex-1 w-full h-full overflow-hidden">
        <NextTripPCApp 
          isFullscreen={isFullscreen}
          onToggleFullscreen={() => setIsFullscreen(true)}
          activeTabProp={activeTab}
          onTabChangeProp={setActiveTab}
        />
      </div>

      {/* Expanded Full-Screen PC Modal View when user clicks expand */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-2xl flex flex-col p-2 sm:p-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-t border-x border-slate-700/80 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                NextTrip PC Application — Full Desktop Experience
              </span>
            </div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="px-3 py-1 bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Exit Fullscreen</span>
            </button>
          </div>
          <div className="flex-1 overflow-hidden border-b border-x border-slate-700/80 rounded-b-2xl shadow-2xl bg-slate-950">
            <NextTripPCApp 
              isFullscreen={true}
              onToggleFullscreen={() => setIsFullscreen(false)}
              activeTabProp={activeTab}
              onTabChangeProp={setActiveTab}
            />
          </div>
        </div>
      )}
    </div>
  );
}

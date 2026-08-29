import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Sparkles } from 'lucide-react';
import { UjjwalTab, NotificationItem, DriverItem, BinItem } from './types';
import { INITIAL_NOTIFICATIONS, INITIAL_DRIVERS } from './mockData';

// Subcomponents
import UjjwalHeader from './UjjwalHeader';
import UjjwalBottomNav from './UjjwalBottomNav';
import ActiveDriversView from './ActiveDriversView';
import BinsMonitoringView from './BinsMonitoringView';
import DriverTrackingView from './DriverTrackingView';
import PayrollView from './PayrollView';
import NewsEventsView from './NewsEventsView';
import ManagementView from './ManagementView';

interface UjjwalHubPCAppProps {
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  activeTabProp?: UjjwalTab;
  onTabChangeProp?: (tab: UjjwalTab) => void;
}

export default function UjjwalHubPCApp({
  isFullscreen,
  onToggleFullscreen,
  activeTabProp,
  onTabChangeProp
}: UjjwalHubPCAppProps) {
  // Navigation State (Bins monitoring is default primary operational hub)
  const [internalTab, setInternalTab] = useState<UjjwalTab>('bins');
  const activeTab = activeTabProp !== undefined ? activeTabProp : internalTab;
  const setActiveTab = (tab: UjjwalTab) => {
    setInternalTab(tab);
    if (onTabChangeProp) onTabChangeProp(tab);
  };
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [drivers, setDrivers] = useState<DriverItem[]>(INITIAL_DRIVERS);

  // Automated Exploration Tour State
  const [isAutoTouring, setIsAutoTouring] = useState<boolean>(true);
  const allTabs: UjjwalTab[] = ['bins', 'drivers', 'tracking', 'payroll', 'news', 'management'];

  useEffect(() => {
    if (!isAutoTouring) return;

    const interval = setInterval(() => {
      setInternalTab(prev => {
        const currentIdx = allTabs.indexOf(prev);
        const nextIdx = (currentIdx + 1) % allTabs.length;
        const nextTab = allTabs[nextIdx];
        if (onTabChangeProp) onTabChangeProp(nextTab);
        return nextTab;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isAutoTouring, onTabChangeProp]);

  // Dispatch driver handler
  const handleDispatchDriver = (driver: DriverItem) => {
    alert(`Dispatcher Alert: Turn-by-turn route dispatch sent to ${driver.name} (${driver.assignedTruck}).`);
  };

  // Dispatch bin task handler
  const handleDispatchBinTask = (bin: BinItem) => {
    alert(`Priority Waste Pickup task for ${bin.id} (${bin.name}) scheduled to TRK-204.`);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="w-full h-full min-h-[580px] bg-[#020617] text-slate-100 flex flex-col font-sans select-none overflow-hidden rounded-xl border border-slate-800/90 shadow-2xl relative">
      
      {/* Background Subtle Cyber-Grid Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b9810a_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      {/* ── 1. TOP HEADER (Section 1 Requirements) ── */}
      <UjjwalHeader
        notifications={notifications}
        onMarkAllRead={handleMarkAllNotificationsRead}
        onNavigate={setActiveTab}
        isFullscreen={isFullscreen}
        onToggleFullscreen={onToggleFullscreen}
      />

      {/* ── 2. MAIN CONTENT VIEWPORT (Scrollable) ── */}
      <main className="flex-1 p-3 sm:p-4 lg:p-5 overflow-y-auto no-scrollbar bg-slate-950/70 relative z-10">
        {activeTab === 'drivers' && (
          <ActiveDriversView 
            drivers={drivers} 
            onDispatchDriver={handleDispatchDriver}
          />
        )}

        {activeTab === 'bins' && (
          <BinsMonitoringView 
            onDispatchTask={handleDispatchBinTask}
          />
        )}

        {activeTab === 'tracking' && (
          <DriverTrackingView />
        )}

        {activeTab === 'payroll' && (
          <PayrollView />
        )}

        {activeTab === 'news' && (
          <NewsEventsView />
        )}

        {activeTab === 'management' && (
          <ManagementView />
        )}
      </main>

      {/* ── 3. BOTTOM NAVIGATION BAR & AUTO-EXPLORATION STATUS ── */}
      <div className="relative shrink-0 flex items-center justify-between px-3 py-1 bg-slate-950/90 border-t border-slate-800/80 z-20">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsAutoTouring(!isAutoTouring)}
            className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900 hover:bg-slate-800 border border-emerald-500/30 text-emerald-400 text-[8px] font-mono cursor-pointer transition-colors"
            title={isAutoTouring ? "Pause Auto Exploration" : "Resume Auto Exploration"}
          >
            {isAutoTouring ? <Pause className="w-2.5 h-2.5 text-emerald-400" /> : <Play className="w-2.5 h-2.5 text-emerald-400" />}
            <span className="font-bold">{isAutoTouring ? "AUTO-TOUR ON" : "TOUR PAUSED"}</span>
          </button>
          <span className="text-[7.5px] font-mono text-slate-400 hidden xs:inline">
            Viewing: <strong className="text-white uppercase">{activeTab}</strong>
          </span>
        </div>

        <UjjwalBottomNav
          activeTab={activeTab}
          onSelectTab={(t) => {
            setActiveTab(t);
            setIsAutoTouring(false);
          }}
          fullBinsCount={2}
          leaveRequestsCount={1}
        />

        <div className="w-20 hidden sm:block" />
      </div>

    </div>
  );
}

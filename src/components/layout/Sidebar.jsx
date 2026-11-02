import React from 'react';
import {
  LayoutDashboard,
  Trophy,
  Calendar,
  Radio,
  Users,
  MapPin,
  TrendingUp,
  FileText,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { useSports } from '../../context/SportsContext';

export default function Sidebar({ activeTab, setActiveTab }) {
  const { currentRole, detectConflicts, activeTournament } = useSports();
  const conflicts = detectConflicts();

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'tournaments', label: 'Tournaments', icon: Trophy, badge: null },
    { id: 'fixtures', label: 'Fixtures & Brackets', icon: Calendar, badge: null },
    { id: 'scorer', label: 'Live Scorer Console', icon: Radio, badge: 'LIVE', badgeColor: 'bg-red-500/20 text-red-400 border border-red-500/30' },
    { id: 'teams', label: 'Teams & Rosters', icon: Users, badge: null },
    { 
      id: 'venues', 
      label: 'Venue Scheduling', 
      icon: MapPin, 
      badge: conflicts.length > 0 ? `${conflicts.length} Alert` : null, 
      badgeColor: 'bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse' 
    },
    { id: 'analytics', label: 'Performance Analytics', icon: TrendingUp, badge: null },
    { id: 'reports', label: 'Reports & Export', icon: FileText, badge: null }
  ];

  return (
    <aside className="w-64 bg-slate-900/60 border-r border-slate-800 flex flex-col shrink-0 min-h-[calc(100vh-4rem)]">
      
      {/* Current Active Tournament Context Card */}
      <div className="p-4 border-b border-slate-800">
        <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/60">
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center justify-between">
            <span>ACTIVE TOURNAMENT</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          </div>
          <div className="text-sm font-bold text-white mt-1 line-clamp-1">
            {activeTournament?.name}
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-1">
            <span className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 font-mono text-[10px]">
              {activeTournament?.sport}
            </span>
            <span>•</span>
            <span className="text-[11px] text-emerald-400 font-medium">
              {activeTournament?.status}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer group ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-300 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon
                  className={`w-4 h-4 transition ${
                    isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-300'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Role capabilities indicator at bottom */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/80">
        <div className="text-[11px] text-slate-400">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-slate-300">Role Mode</span>
            <span className="capitalize text-emerald-400 font-medium">{currentRole}</span>
          </div>
          <p className="text-[10px] leading-relaxed text-slate-500">
            {currentRole === 'admin' && 'Full administrator rights: generate fixtures, manage venues & rules.'}
            {currentRole === 'scorer' && 'Authorized to operate live score clocks and event logging.'}
            {currentRole === 'coach' && 'Authorized to set starting lineups and roster sheets.'}
            {currentRole === 'athlete' && 'Viewing personal athletic radar, stats & player profile.'}
            {currentRole === 'spectator' && 'Viewing public tournament brackets, scores & tables.'}
          </p>
        </div>
      </div>

    </aside>
  );
}

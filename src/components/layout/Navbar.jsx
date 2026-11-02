import React, { useState } from 'react';
import {
  Trophy,
  Activity,
  Bell,
  UserCheck,
  RefreshCw,
  ChevronDown,
  Clock,
  Sparkles,
  Shield,
  Layers,
  Award
} from 'lucide-react';
import { useSports } from '../../context/SportsContext';

export default function Navbar({ onNavigateToScorer }) {
  const {
    currentRole,
    setCurrentRole,
    activeTournamentId,
    setActiveTournamentId,
    tournaments,
    activeTournament,
    matches,
    notifications,
    resetToDefaults
  } = useSports();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  // Find any current live match
  const liveMatch = matches.find(m => m.status === 'Live');

  const roles = [
    { id: 'admin', label: 'Tournament Director', icon: Trophy, desc: 'Full control over fixtures, venues & rules' },
    { id: 'scorer', label: 'Match Scorer / Referee', icon: Clock, desc: 'Live scoring console, event logs & clock' },
    { id: 'coach', label: 'Team Coach / Manager', icon: Shield, desc: 'Roster management & tactical lineup' },
    { id: 'athlete', label: 'Athlete / Player', icon: Award, desc: 'Personal stats, radar card & schedule' },
    { id: 'spectator', label: 'Fan / Spectator', icon: Layers, desc: 'Public scoreboard, brackets & tables' }
  ];

  const currentRoleObj = roles.find(r => r.id === currentRole) || roles[0];
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Trophy className="w-6 h-6 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                SPORTNEXUS
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                PRO PLATFORM
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Centralized Operations, Live Scoring & Athlete Analytics</p>
          </div>
        </div>

        {/* Center: Active Tournament Switcher & Live Match Pulse */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Tournament Dropdown */}
          <div className="relative">
            <select
              value={activeTournamentId}
              onChange={(e) => setActiveTournamentId(e.target.value)}
              className="bg-slate-800/90 text-sm text-slate-200 border border-slate-700 rounded-lg px-3 py-1.5 pr-8 focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer font-medium hover:border-slate-600 transition"
            >
              {tournaments.map(t => (
                <option key={t.id} value={t.id}>
                  {t.sport === 'Soccer' ? '⚽' : t.sport === 'Basketball' ? '🏀' : '🏏'} {t.name} ({t.format})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Live Match Ticker */}
          {liveMatch && (
            <button
              onClick={() => onNavigateToScorer && onNavigateToScorer(liveMatch.id)}
              className="flex items-center space-x-2 bg-red-950/60 border border-red-500/40 text-red-300 text-xs px-3 py-1.5 rounded-full hover:bg-red-900/50 transition cursor-pointer live-pulse group"
              title="Click to open Live Scorer console"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span className="font-semibold uppercase tracking-wider text-[11px] text-red-400">LIVE</span>
              <span className="font-mono font-medium text-slate-200 group-hover:text-white">
                {liveMatch.currentMinute}' : RFC {liveMatch.homeScore} - {liveMatch.awayScore} TIT
              </span>
            </button>
          )}
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-3">
          
          {/* Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer"
            >
              <currentRoleObj.icon className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">{currentRoleObj.label}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl py-2 z-50">
                <div className="px-3 py-1.5 border-b border-slate-700 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Active Role Experience
                </div>
                {roles.map(r => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setCurrentRole(r.id);
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-start space-x-3 transition hover:bg-slate-700/50 ${
                      currentRole === r.id ? 'bg-emerald-500/10 text-emerald-300' : 'text-slate-300'
                    }`}
                  >
                    <r.icon className={`w-4 h-4 mt-0.5 ${currentRole === r.id ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <div>
                      <div className="text-xs font-semibold">{r.label}</div>
                      <div className="text-[11px] text-slate-400">{r.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Drawer */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-700">
                  <span className="text-xs font-semibold text-slate-200">System Activity & Alerts</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                    {notifications.length} events
                  </span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-700/50 mt-1">
                  {notifications.map(n => (
                    <div key={n.id} className="py-2.5 text-xs">
                      <div className="flex items-center justify-between text-slate-400 text-[10px]">
                        <span className={`font-semibold ${n.type === 'warning' ? 'text-amber-400' : n.type === 'goal' ? 'text-emerald-400' : 'text-cyan-400'}`}>
                          {n.title}
                        </span>
                        <span>{n.time}</span>
                      </div>
                      <p className="text-slate-300 mt-1">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reset Demo State button */}
          <button
            onClick={() => {
              if (window.confirm("Reset all tournament, match, team, and venue data to fresh demo state?")) {
                resetToDefaults();
              }
            }}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition cursor-pointer"
            title="Reset to Initial Demo State"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

        </div>

      </div>
    </header>
  );
}

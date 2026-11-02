import React from 'react';
import {
  Trophy,
  Users,
  Calendar,
  MapPin,
  Activity,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  Award,
  Play
} from 'lucide-react';
import { useSports } from '../../context/SportsContext';

export default function OverviewDashboard({ onNavigate }) {
  const {
    tournaments,
    teams,
    players,
    venues,
    matches,
    activeTournament,
    getPointsTable,
    detectConflicts,
    notifications
  } = useSports();

  const conflicts = detectConflicts();
  const pointsTable = getPointsTable(activeTournament?.id || 'tourn-1');
  const liveMatch = matches.find(m => m.status === 'Live');
  const upcomingMatches = matches.filter(m => m.status === 'Scheduled').slice(0, 3);

  const homeTeam = liveMatch ? teams.find(t => t.id === liveMatch.homeTeamId) : null;
  const awayTeam = liveMatch ? teams.find(t => t.id === liveMatch.awayTeamId) : null;
  const venue = liveMatch ? venues.find(v => v.id === liveMatch.venueId) : null;

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner & Overview Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950/40 border border-slate-800 p-6 md:p-8">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Centralized Tournament Management & Analytics Hub</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Welcome to {activeTournament?.name || 'Tournament Operations'}
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-2 leading-relaxed">
            Manage registrations, generate conflict-free fixtures, track real-time live scoring, and analyze athlete performance across all competitive sports events.
          </p>

          <div className="flex flex-wrap gap-3 mt-5">
            <button
              onClick={() => onNavigate('fixtures')}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs md:text-sm flex items-center space-x-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Manage Fixtures & Brackets</span>
            </button>
            <button
              onClick={() => onNavigate('scorer')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs md:text-sm flex items-center space-x-2 transition cursor-pointer"
            >
              <Activity className="w-4 h-4 text-red-400" />
              <span>Live Scoring Console</span>
            </button>
            <button
              onClick={() => onNavigate('analytics')}
              className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-slate-300 hover:text-white font-semibold text-xs md:text-sm flex items-center space-x-2 transition cursor-pointer"
            >
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span>Athlete Radar Analytics</span>
            </button>
          </div>
        </div>

        {/* Decorative backdrop shapes */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-20 -bottom-20 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Conflict Warning Banner (if detected by automated engine) */}
      {conflicts.length > 0 && (
        <div className="bg-gradient-to-r from-amber-950/40 via-amber-900/30 to-slate-900 border border-amber-500/40 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg shadow-amber-950/20">
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-200">
                {conflicts.length} Venue / Time-Slot Scheduling Conflict Detected!
              </h4>
              <p className="text-xs text-amber-300/80 mt-0.5 leading-relaxed">
                {conflicts[0].description}
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('venues')}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 shrink-0 transition cursor-pointer"
          >
            <span>Resolve Conflicts</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Metric Cards KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Tournaments</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white mt-2">{tournaments.length}</div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center space-x-1">
            <span className="text-emerald-400 font-semibold">{tournaments.filter(t => t.status === 'Ongoing').length} Active</span>
            <span>•</span>
            <span>{tournaments.filter(t => t.status === 'Upcoming').length} Upcoming</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Registered Teams</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white mt-2">{teams.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">
            Across {new Set(teams.map(t => t.sport)).size} Sports Disciplines
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Matches Fixtured</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white mt-2">{matches.length}</div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center space-x-1">
            <span className="text-red-400 font-semibold">{matches.filter(m => m.status === 'Live').length} Live</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">{matches.filter(m => m.status === 'Completed').length} Final</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Athletes Profiled</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white mt-2">{players.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">
            With Individual Radar Stats
          </div>
        </div>

      </div>

      {/* Main Grid: Live Match Spotlight + Points Standings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Live Match Spotlight (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {liveMatch ? (
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-2 border-red-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </span>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-red-400">
                    MATCHDAY LIVE IN PROGRESS
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-slate-800/90 px-3 py-1 rounded-full border border-slate-700 text-xs font-mono text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{liveMatch.currentMinute}' MIN ({liveMatch.period})</span>
                </div>
              </div>

              {/* Scoreboard Big Display */}
              <div className="grid grid-cols-3 items-center py-4 text-center">
                {/* Home */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-4xl">{homeTeam?.logo}</div>
                  <div className="font-bold text-white text-base md:text-lg">{homeTeam?.name}</div>
                  <div className="text-xs text-slate-400">{homeTeam?.shortName}</div>
                </div>

                {/* Score */}
                <div className="flex flex-col items-center">
                  <div className="text-4xl md:text-5xl font-black tracking-tight text-white font-mono bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700">
                    {liveMatch.homeScore} : {liveMatch.awayScore}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{venue?.name}</span>
                  </div>
                </div>

                {/* Away */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-4xl">{awayTeam?.logo}</div>
                  <div className="font-bold text-white text-base md:text-lg">{awayTeam?.name}</div>
                  <div className="text-xs text-slate-400">{awayTeam?.shortName}</div>
                </div>
              </div>

              {/* Match Events Ticker */}
              <div className="mt-4 pt-4 border-t border-slate-800">
                <div className="text-xs font-semibold text-slate-400 mb-2">Live Timeline Events:</div>
                <div className="space-y-1.5 max-h-28 overflow-y-auto pr-2">
                  {(liveMatch.events || []).slice(-3).reverse().map((ev, idx) => (
                    <div key={idx} className="flex items-center text-xs space-x-2 text-slate-300 bg-slate-800/40 px-3 py-1.5 rounded-lg border border-slate-800">
                      <span className="font-mono text-emerald-400 font-bold">{ev.minute}'</span>
                      <span>•</span>
                      <span className="font-medium text-white">{ev.player || 'Event'}</span>
                      <span className="text-slate-400 text-[11px]">({ev.description})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Open Console button */}
              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => onNavigate('scorer')}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-red-600/30 transition cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Open Scorer Console</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-center text-slate-400">
              <Clock className="w-8 h-8 mx-auto text-slate-600 mb-2" />
              <p className="text-sm font-semibold text-slate-300">No match currently active live.</p>
              <p className="text-xs text-slate-500 mt-1">You can launch a live match from the Fixtures tab.</p>
            </div>
          )}

          {/* Upcoming Matches Preview */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Upcoming Scheduled Fixtures</span>
              </h3>
              <button
                onClick={() => onNavigate('fixtures')}
                className="text-xs text-emerald-400 hover:underline font-medium"
              >
                View All Brackets & Fixtures →
              </button>
            </div>

            <div className="space-y-3">
              {upcomingMatches.map(m => {
                const h = teams.find(t => t.id === m.homeTeamId);
                const a = teams.find(t => t.id === m.awayTeamId);
                const v = venues.find(ven => ven.id === m.venueId);

                return (
                  <div
                    key={m.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 transition"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-center px-2 py-1 bg-slate-800 rounded-lg border border-slate-700 text-[10px]">
                        <div className="text-emerald-400 font-bold">{m.date.slice(5)}</div>
                        <div className="text-slate-400 font-mono">{m.time}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center space-x-2">
                          <span>{h?.name || 'TBD'}</span>
                          <span className="text-slate-500">vs</span>
                          <span>{a?.name || 'TBD'}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center space-x-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>{v?.name || 'Assigned Venue'}</span>
                          <span>•</span>
                          <span className="text-slate-400">{m.round}</span>
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-semibold px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {m.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Col: Tournament Standings Preview */}
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Points Table / Standings</span>
              </h3>
              <span className="text-[10px] text-slate-400">Top 5</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800 text-[11px]">
                    <th className="pb-2 font-medium">#</th>
                    <th className="pb-2 font-medium">Club</th>
                    <th className="pb-2 font-medium text-center">P</th>
                    <th className="pb-2 font-medium text-center">GD</th>
                    <th className="pb-2 font-bold text-right text-emerald-400">PTS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {pointsTable.slice(0, 5).map((row, idx) => (
                    <tr key={row.teamId} className="hover:bg-slate-800/30 transition">
                      <td className="py-2.5 font-bold text-slate-400 text-[11px]">{idx + 1}</td>
                      <td className="py-2.5">
                        <div className="flex items-center space-x-2">
                          <span className="text-base">{row.logo}</span>
                          <span className="font-semibold text-white truncate max-w-[100px]">{row.name}</span>
                        </div>
                      </td>
                      <td className="py-2.5 text-center text-slate-300 font-mono">{row.played}</td>
                      <td className={`py-2.5 text-center font-mono ${row.gd > 0 ? 'text-emerald-400' : row.gd < 0 ? 'text-red-400' : 'text-slate-400'}`}>
                        {row.gd > 0 ? `+${row.gd}` : row.gd}
                      </td>
                      <td className="py-2.5 text-right font-black text-white font-mono text-sm">
                        {row.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-500 text-[11px]">Win: 3pts • Draw: 1pt</span>
              <button
                onClick={() => onNavigate('fixtures')}
                className="text-emerald-400 hover:underline font-semibold"
              >
                Full Standings →
              </button>
            </div>
          </div>

          {/* Quick Operations Actions */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white mb-3">Quick Event Operations</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onNavigate('tournaments')}
                className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-left transition cursor-pointer"
              >
                <div className="font-semibold text-white">Create Tournament</div>
                <div className="text-[10px] text-slate-400 mt-0.5">New league or cup</div>
              </button>

              <button
                onClick={() => onNavigate('teams')}
                className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-left transition cursor-pointer"
              >
                <div className="font-semibold text-white">Register Team</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Enroll roster & players</div>
              </button>

              <button
                onClick={() => onNavigate('venues')}
                className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-left transition cursor-pointer"
              >
                <div className="font-semibold text-white">Check Conflicts</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Venue slot analyzer</div>
              </button>

              <button
                onClick={() => onNavigate('reports')}
                className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-left transition cursor-pointer"
              >
                <div className="font-semibold text-white">Export Reports</div>
                <div className="text-[10px] text-slate-400 mt-0.5">PDF & CSV downloads</div>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

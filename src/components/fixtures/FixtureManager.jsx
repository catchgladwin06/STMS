import React, { useState } from 'react';
import {
  Calendar,
  Trophy,
  Play,
  CheckCircle,
  Clock,
  Sparkles,
  MapPin,
  Plus,
  GitBranch,
  ListFilter,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useSports } from '../../context/SportsContext';

export default function FixtureManager({ onNavigateToScorer }) {
  const {
    activeTournament,
    matches,
    teams,
    venues,
    generateFixtures,
    addMatch,
    getPointsTable,
    setMatchLiveStatus
  } = useSports();

  const [viewMode, setViewMode] = useState('list'); // 'list', 'bracket', 'table'
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'Live', 'Scheduled', 'Completed'
  const [showAddMatchModal, setShowAddMatchModal] = useState(false);

  // New Match Form State
  const [newMatchData, setNewMatchData] = useState({
    homeTeamId: '',
    awayTeamId: '',
    venueId: venues[0]?.id || '',
    date: '2026-10-08',
    time: '18:00',
    round: 'Regular Match'
  });

  const tournamentMatches = matches.filter(
    m => m.tournamentId === activeTournament?.id
  );

  const filteredMatches = tournamentMatches.filter(m => {
    if (filterStatus === 'all') return true;
    return m.status === filterStatus;
  });

  const pointsTable = getPointsTable(activeTournament?.id || 'tourn-1');

  const handleCreateMatch = (e) => {
    e.preventDefault();
    if (!newMatchData.homeTeamId || !newMatchData.awayTeamId) {
      alert("Please select both home and away teams");
      return;
    }
    if (newMatchData.homeTeamId === newMatchData.awayTeamId) {
      alert("Home and away teams must be different");
      return;
    }

    const startH = Number(newMatchData.time.split(':')[0]);
    const startM = Number(newMatchData.time.split(':')[1]);
    const endH = startH + 1 + Math.floor((startM + 50) / 60);
    const endM = (startM + 50) % 60;
    const formattedEnd = `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;

    const createdMatch = {
      id: `match-custom-${Date.now()}`,
      tournamentId: activeTournament.id,
      sport: activeTournament.sport,
      round: newMatchData.round,
      homeTeamId: newMatchData.homeTeamId,
      awayTeamId: newMatchData.awayTeamId,
      venueId: newMatchData.venueId,
      date: newMatchData.date,
      time: newMatchData.time,
      endTime: formattedEnd,
      status: 'Scheduled',
      homeScore: 0,
      awayScore: 0,
      referee: 'Designated Official',
      events: []
    };

    addMatch(createdMatch);
    setShowAddMatchModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-emerald-400" />
            <span>Fixtures, Brackets & Results</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            {activeTournament?.name} • Format: <span className="text-emerald-400 font-semibold">{activeTournament?.format}</span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* View mode toggle */}
          <div className="bg-slate-800/80 p-1 rounded-xl border border-slate-700 flex items-center space-x-1 text-xs">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer flex items-center space-x-1.5 ${
                viewMode === 'list'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>Timeline</span>
            </button>
            <button
              onClick={() => setViewMode('bracket')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer flex items-center space-x-1.5 ${
                viewMode === 'bracket'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Brackets</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer flex items-center space-x-1.5 ${
                viewMode === 'table'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Standings</span>
            </button>
          </div>

          {/* Automated Fixture Generator Button */}
          <button
            onClick={() => {
              if (window.confirm(`Generate automated conflict-free fixtures for "${activeTournament.name}" based on its ${activeTournament.format} format?`)) {
                generateFixtures(activeTournament.id, activeTournament.format);
              }
            }}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-500/20 transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Auto-Generate Draws</span>
          </button>

          {/* Add Match Button */}
          <button
            onClick={() => setShowAddMatchModal(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs flex items-center space-x-1.5 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Schedule Match</span>
          </button>
        </div>
      </div>

      {/* Mode 1: List / Timeline View */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          
          {/* Status filter tabs */}
          <div className="flex items-center space-x-2 text-xs">
            {['all', 'Live', 'Scheduled', 'Completed'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                  filterStatus === status
                    ? 'bg-slate-700 text-emerald-400 border border-slate-600'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {status === 'all' ? 'All Matches' : status}
                <span className="ml-1.5 text-[10px] opacity-75">
                  ({status === 'all' ? tournamentMatches.length : tournamentMatches.filter(m => m.status === status).length})
                </span>
              </button>
            ))}
          </div>

          {/* Matches List */}
          <div className="space-y-3">
            {filteredMatches.length === 0 ? (
              <div className="p-8 text-center bg-slate-900/60 rounded-2xl border border-slate-800 text-slate-400">
                <Calendar className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                <p className="text-sm font-semibold text-slate-300">No matches found in this category.</p>
                <p className="text-xs text-slate-500 mt-1">Click "Auto-Generate Draws" to generate tournament fixtures instantly.</p>
              </div>
            ) : (
              filteredMatches.map(m => {
                const home = teams.find(t => t.id === m.homeTeamId);
                const away = teams.find(t => t.id === m.awayTeamId);
                const venue = venues.find(v => v.id === m.venueId);

                return (
                  <div
                    key={m.id}
                    className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      m.status === 'Live'
                        ? 'bg-gradient-to-r from-red-950/30 via-slate-900 to-slate-900 border-red-500/50 shadow-lg shadow-red-950/20'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Left: Timing & Round */}
                    <div className="flex items-center space-x-3 min-w-[160px]">
                      <div className="p-2 rounded-xl bg-slate-800 text-center border border-slate-700">
                        <div className="text-[10px] font-bold text-emerald-400">{m.date}</div>
                        <div className="text-xs font-mono font-bold text-white">{m.time}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-300">{m.round}</div>
                        <div className="text-[11px] text-slate-400 flex items-center space-x-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span className="truncate max-w-[140px]">{venue?.name || 'TBD Venue'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Center: Teams & Score */}
                    <div className="flex-1 flex items-center justify-center space-x-4 sm:space-x-8">
                      {/* Home */}
                      <div className="flex items-center space-x-2 text-right justify-end flex-1">
                        <span className="font-bold text-xs sm:text-sm text-white">{home?.name || 'TBD Team'}</span>
                        <span className="text-2xl">{home?.logo || '🛡️'}</span>
                      </div>

                      {/* Score Badge */}
                      <div className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-center min-w-[75px]">
                        {m.status === 'Completed' || m.status === 'Live' ? (
                          <div className="font-black font-mono text-base text-white">
                            {m.homeScore} : {m.awayScore}
                          </div>
                        ) : (
                          <div className="text-xs font-bold text-slate-400 font-mono">VS</div>
                        )}
                        <div className="text-[9px] uppercase tracking-wider font-extrabold mt-0.5">
                          {m.status === 'Live' && <span className="text-red-400 animate-pulse">{m.currentMinute}' LIVE</span>}
                          {m.status === 'Completed' && <span className="text-slate-400">FINAL</span>}
                          {m.status === 'Scheduled' && <span className="text-cyan-400">UPCOMING</span>}
                        </div>
                      </div>

                      {/* Away */}
                      <div className="flex items-center space-x-2 text-left justify-start flex-1">
                        <span className="text-2xl">{away?.logo || '🛡️'}</span>
                        <span className="font-bold text-xs sm:text-sm text-white">{away?.name || 'TBD Team'}</span>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center justify-end space-x-2 shrink-0">
                      {m.status === 'Live' && (
                        <button
                          onClick={() => onNavigateToScorer && onNavigateToScorer(m.id)}
                          className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center space-x-1 shadow-md shadow-red-600/30 transition cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Scorer Console</span>
                        </button>
                      )}

                      {m.status === 'Scheduled' && (
                        <button
                          onClick={() => {
                            setMatchLiveStatus(m.id, 'Live', 1);
                            if (onNavigateToScorer) onNavigateToScorer(m.id);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center space-x-1 transition cursor-pointer"
                        >
                          <Play className="w-3 h-3" />
                          <span>Start Match</span>
                        </button>
                      )}

                      {m.status === 'Completed' && (
                        <button
                          onClick={() => onNavigateToScorer && onNavigateToScorer(m.id)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
                        >
                          Match Details
                        </button>
                      )}
                    </div>

                  </div>
                );
              })
            )}
          </div>

        </div>
      )}

      {/* Mode 2: Interactive Tournament Bracket View */}
      {viewMode === 'bracket' && (
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 overflow-x-auto">
          <div className="min-w-[800px] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <GitBranch className="w-5 h-5 text-emerald-400" />
                  <span>Championship Knockout Bracket</span>
                </h3>
                <p className="text-xs text-slate-400">Single elimination tree with seed progression</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                8-Team Single Elimination
              </span>
            </div>

            {/* Bracket Columns */}
            <div className="grid grid-cols-3 gap-8 py-4 items-center">
              
              {/* Quarter Finals */}
              <div className="space-y-6">
                <div className="text-xs font-extrabold text-slate-400 uppercase tracking-widest text-center">
                  Quarter-Finals
                </div>

                {/* Match 1 */}
                <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-3 shadow-md space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">🦅 Red Falcons FC</span>
                    <span className="font-mono font-bold text-emerald-400">3</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-400 border-t border-slate-700 pt-1.5">
                    <span>🐍 Viper City</span>
                    <span className="font-mono">1</span>
                  </div>
                </div>

                {/* Match 2 */}
                <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-3 shadow-md space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">⚔️ Golden Knights</span>
                    <span className="font-mono font-bold text-emerald-400">2</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-400 border-t border-slate-700 pt-1.5">
                    <span>⚙️ Ironclad Athletic</span>
                    <span className="font-mono">0</span>
                  </div>
                </div>

                {/* Match 3 */}
                <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-3 shadow-md space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">🛡️ Titan United</span>
                    <span className="font-mono font-bold text-emerald-400">4</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-400 border-t border-slate-700 pt-1.5">
                    <span>🌊 Coastal Wave FC</span>
                    <span className="font-mono">2</span>
                  </div>
                </div>

                {/* Match 4 */}
                <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-3 shadow-md space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">🌅 Horizon Stars</span>
                    <span className="font-mono font-bold text-emerald-400">2</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-400 border-t border-slate-700 pt-1.5">
                    <span>🔥 Shadow Phoenix</span>
                    <span className="font-mono">1</span>
                  </div>
                </div>

              </div>

              {/* Semi Finals */}
              <div className="space-y-16">
                <div className="text-xs font-extrabold text-slate-400 uppercase tracking-widest text-center">
                  Semi-Finals
                </div>

                {/* Semi 1 */}
                <div className="bg-slate-800/90 border-2 border-emerald-500/40 rounded-xl p-3 shadow-xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">🦅 Red Falcons FC</span>
                    <span className="font-mono font-bold text-emerald-400">2</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-400 border-t border-slate-700 pt-1.5">
                    <span>⚔️ Golden Knights</span>
                    <span className="font-mono">1</span>
                  </div>
                </div>

                {/* Semi 2 */}
                <div className="bg-slate-800/90 border-2 border-emerald-500/40 rounded-xl p-3 shadow-xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">🛡️ Titan United</span>
                    <span className="font-mono font-bold text-emerald-400">3</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-400 border-t border-slate-700 pt-1.5">
                    <span>🌅 Horizon Stars</span>
                    <span className="font-mono">1</span>
                  </div>
                </div>

              </div>

              {/* Championship Final */}
              <div className="space-y-8">
                <div className="text-xs font-extrabold text-amber-400 uppercase tracking-widest text-center flex items-center justify-center space-x-1">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Grand Final</span>
                </div>

                <div className="bg-gradient-to-br from-amber-950/40 via-slate-800 to-slate-900 border-2 border-amber-500/60 rounded-2xl p-5 shadow-2xl space-y-4 text-center">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                    CHAMPIONSHIP TROPHY MATCH
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm font-bold text-white bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                      <span>🦅 Red Falcons FC</span>
                      <span className="font-mono text-emerald-400 text-base">2</span>
                    </div>
                    <div className="flex items-center justify-between text-sm font-bold text-white bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                      <span>🛡️ Titan United</span>
                      <span className="font-mono text-amber-400 text-base">1</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-700/80">
                    Olympic Grand Arena • Oct 10, 2026
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* Mode 3: Standings Points Table */}
      {viewMode === 'table' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span>Full League Table & Standings</span>
              </h3>
              <p className="text-xs text-slate-400">Automated points computation with Goal Differential & Form</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800 text-[11px]">
                  <th className="py-3 font-semibold">POS</th>
                  <th className="py-3 font-semibold">CLUB / TEAM</th>
                  <th className="py-3 font-semibold text-center">P</th>
                  <th className="py-3 font-semibold text-center">W</th>
                  <th className="py-3 font-semibold text-center">D</th>
                  <th className="py-3 font-semibold text-center">L</th>
                  <th className="py-3 font-semibold text-center">GF</th>
                  <th className="py-3 font-semibold text-center">GA</th>
                  <th className="py-3 font-semibold text-center">GD</th>
                  <th className="py-3 font-bold text-center text-emerald-400">PTS</th>
                  <th className="py-3 font-semibold text-center">RECENT FORM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {pointsTable.map((row, idx) => (
                  <tr key={row.teamId} className="hover:bg-slate-800/30 transition">
                    <td className="py-3.5 font-mono font-bold text-slate-400">{idx + 1}</td>
                    <td className="py-3.5">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{row.logo}</span>
                        <div>
                          <span className="font-bold text-white text-sm">{row.name}</span>
                          <span className="ml-2 text-[10px] text-slate-400 font-mono">({row.shortName})</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 text-center font-mono text-slate-300">{row.played}</td>
                    <td className="py-3.5 text-center font-mono text-slate-300">{row.won}</td>
                    <td className="py-3.5 text-center font-mono text-slate-300">{row.drawn}</td>
                    <td className="py-3.5 text-center font-mono text-slate-300">{row.lost}</td>
                    <td className="py-3.5 text-center font-mono text-slate-300">{row.gf}</td>
                    <td className="py-3.5 text-center font-mono text-slate-300">{row.ga}</td>
                    <td className={`py-3.5 text-center font-mono font-semibold ${row.gd > 0 ? 'text-emerald-400' : row.gd < 0 ? 'text-red-400' : 'text-slate-400'}`}>
                      {row.gd > 0 ? `+${row.gd}` : row.gd}
                    </td>
                    <td className="py-3.5 text-center font-mono font-black text-white text-sm bg-slate-800/40 rounded-lg">
                      {row.points}
                    </td>
                    <td className="py-3.5 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        {(row.form || ['W', 'D', 'W']).map((f, i) => (
                          <span
                            key={i}
                            className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-black ${
                              f === 'W'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                : f === 'D'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                                : 'bg-red-500/20 text-red-400 border border-red-500/40'
                            }`}
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Match Modal */}
      {showAddMatchModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-emerald-400" />
                <span>Schedule New Fixture</span>
              </h3>
              <button onClick={() => setShowAddMatchModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateMatch} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Home Team</label>
                <select
                  required
                  value={newMatchData.homeTeamId}
                  onChange={(e) => setNewMatchData({ ...newMatchData, homeTeamId: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="">Select Home Team</option>
                  {teams.filter(t => t.sport === activeTournament.sport).map(t => (
                    <option key={t.id} value={t.id}>{t.logo} {t.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Away Team</label>
                <select
                  required
                  value={newMatchData.awayTeamId}
                  onChange={(e) => setNewMatchData({ ...newMatchData, awayTeamId: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="">Select Away Team</option>
                  {teams.filter(t => t.sport === activeTournament.sport).map(t => (
                    <option key={t.id} value={t.id}>{t.logo} {t.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Match Date</label>
                  <input
                    type="date"
                    required
                    value={newMatchData.date}
                    onChange={(e) => setNewMatchData({ ...newMatchData, date: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Kick-off / Start Time</label>
                  <input
                    type="time"
                    required
                    value={newMatchData.time}
                    onChange={(e) => setNewMatchData({ ...newMatchData, time: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Venue Assignment</label>
                <select
                  value={newMatchData.venueId}
                  onChange={(e) => setNewMatchData({ ...newMatchData, venueId: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                >
                  {venues.map(v => (
                    <option key={v.id} value={v.id}>{v.name} ({v.sport})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Round / Stage</label>
                <input
                  type="text"
                  value={newMatchData.round}
                  onChange={(e) => setNewMatchData({ ...newMatchData, round: e.target.value })}
                  placeholder="e.g. Matchday 9 or Semi Final"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddMatchModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold"
                >
                  Confirm & Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

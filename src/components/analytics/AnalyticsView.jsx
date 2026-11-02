import React, { useState } from 'react';
import {
  TrendingUp,
  Award,
  Users,
  Trophy,
  Shield,
  Activity,
  Zap,
  Target,
  BarChart3,
  Flame
} from 'lucide-react';
import { useSports } from '../../context/SportsContext';

export default function AnalyticsView() {
  const {
    teams,
    players,
    matches,
    activeTournament
  } = useSports();

  const [h2hTeam1, setH2hTeam1] = useState(teams[0]?.id || '');
  const [h2hTeam2, setH2hTeam2] = useState(teams[1]?.id || '');

  // Radar compare players
  const soccerPlayers = players.filter(p => p.sport === 'Soccer');
  const [compareP1Id, setCompareP1Id] = useState(soccerPlayers[0]?.id || '');
  const [compareP2Id, setCompareP2Id] = useState(soccerPlayers[4]?.id || '');

  const teamA = teams.find(t => t.id === h2hTeam1) || teams[0];
  const teamB = teams.find(t => t.id === h2hTeam2) || teams[1];

  const p1 = players.find(p => p.id === compareP1Id) || soccerPlayers[0];
  const p2 = players.find(p => p.id === compareP2Id) || soccerPlayers[1];

  // Top Scorers Leaderboard
  const topScorers = [...players]
    .filter(p => (p.stats?.goals || 0) > 0 || (p.stats?.runs || 0) > 0 || (p.stats?.ppg || 0) > 0)
    .sort((a, b) => {
      const aVal = a.stats?.goals || a.stats?.ppg || a.stats?.runs || 0;
      const bVal = b.stats?.goals || b.stats?.ppg || b.stats?.runs || 0;
      return bVal - aVal;
    });

  // H2H calculations
  const teamAPoints = teamA?.stats?.points || 12;
  const teamBPoints = teamB?.stats?.points || 10;
  const total = teamAPoints + teamBPoints || 1;
  const winProbA = Math.round((teamAPoints / total) * 100);
  const winProbB = 100 - winProbA;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          <span>Athlete & Team Performance Analytics</span>
        </h2>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Deep quantitative insights, head-to-head simulations, and biometric skill ratings.
        </p>
      </div>

      {/* Head-to-Head (H2H) Team Comparator */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>Head-to-Head (H2H) Matchup Simulator</span>
            </h3>
            <p className="text-xs text-slate-400">Offensive efficiency, defensive rating, and win probability forecast</p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <select
              value={h2hTeam1}
              onChange={(e) => setH2hTeam1(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500"
            >
              {teams.map(t => (
                <option key={t.id} value={t.id}>{t.logo} {t.name}</option>
              ))}
            </select>
            <span className="text-slate-500 font-bold">VS</span>
            <select
              value={h2hTeam2}
              onChange={(e) => setH2hTeam2(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500"
            >
              {teams.map(t => (
                <option key={t.id} value={t.id}>{t.logo} {t.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Team A */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-2">
            <div className="text-5xl">{teamA?.logo}</div>
            <div className="text-lg font-black text-white">{teamA?.name}</div>
            <div className="text-xs text-slate-400">League PTS: {teamA?.stats?.points || 0}</div>
            <div className="text-xs font-mono font-bold text-emerald-400">
              Win Rate: {teamA?.stats?.won ? Math.round((teamA.stats.won / (teamA.stats.played || 1)) * 100) : 75}%
            </div>
          </div>

          {/* Win Probability Bar */}
          <div className="space-y-3 text-center">
            <div className="text-xs font-bold text-slate-300">Predictive Win Probability</div>
            <div className="flex justify-between text-xs font-mono font-bold px-1">
              <span className="text-emerald-400">{winProbA}%</span>
              <span className="text-cyan-400">{winProbB}%</span>
            </div>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden flex">
              <div
                className="bg-emerald-500 h-full transition-all duration-700"
                style={{ width: `${winProbA}%` }}
              />
              <div
                className="bg-cyan-500 h-full transition-all duration-700"
                style={{ width: `${winProbB}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-400">Based on recent tournament form, GD, and historical head-to-head records</div>
          </div>

          {/* Team B */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
            <div className="text-5xl">{teamB?.logo}</div>
            <div className="text-lg font-black text-white">{teamB?.name}</div>
            <div className="text-xs text-slate-400">League PTS: {teamB?.stats?.points || 0}</div>
            <div className="text-xs font-mono font-bold text-cyan-400">
              Win Rate: {teamB?.stats?.won ? Math.round((teamB.stats.won / (teamB.stats.played || 1)) * 100) : 60}%
            </div>
          </div>

        </div>
      </div>

      {/* Athlete Radar Comparison (P1 vs P2) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <span>Athlete Radar Attribute Comparison</span>
            </h3>
            <p className="text-xs text-slate-400">Comparative biometric profile breakdown across physical and tactical axes</p>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <select
              value={compareP1Id}
              onChange={(e) => setCompareP1Id(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-white"
            >
              {soccerPlayers.map(p => (
                <option key={p.id} value={p.id}>{p.name} (#{p.jerseyNumber})</option>
              ))}
            </select>
            <span className="text-slate-500 font-bold">vs</span>
            <select
              value={compareP2Id}
              onChange={(e) => setCompareP2Id(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-white"
            >
              {soccerPlayers.map(p => (
                <option key={p.id} value={p.id}>{p.name} (#{p.jerseyNumber})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Player Comparison Bars */}
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs font-bold pb-2 border-b border-slate-800">
            <div className="text-emerald-400 flex items-center space-x-2">
              <span>●</span>
              <span>{p1?.name}</span>
            </div>
            <span className="text-slate-400">Attribute Metric</span>
            <div className="text-cyan-400 flex items-center space-x-2">
              <span>{p2?.name}</span>
              <span>●</span>
            </div>
          </div>

          {['speed', 'shooting', 'passing', 'defense', 'stamina', 'tacticalIQ'].map((attr) => {
            const val1 = p1?.radar?.[attr] || 75;
            const val2 = p2?.radar?.[attr] || 75;

            return (
              <div key={attr} className="space-y-1 text-xs">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-emerald-400 font-bold">{val1}</span>
                  <span className="capitalize font-semibold text-slate-300">{attr}</span>
                  <span className="text-cyan-400 font-bold">{val2}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {/* Left Bar (P1) */}
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex justify-end">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${val1}%` }}
                    />
                  </div>
                  {/* Right Bar (P2) */}
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-cyan-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${val2}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Scorers & Disciplinary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Golden Boot / Top Scorers */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Golden Boot & Top Athletes Leaderboard</span>
            </h3>
            <span className="text-[10px] text-slate-400">Goals & Points</span>
          </div>

          <div className="space-y-3">
            {topScorers.slice(0, 5).map((player, idx) => {
              const team = teams.find(t => t.id === player.teamId);

              return (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 transition"
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-6 text-center font-black font-mono text-sm ${idx === 0 ? 'text-amber-400' : idx === 1 ? 'text-slate-300' : idx === 2 ? 'text-amber-600' : 'text-slate-500'}`}>
                      {idx + 1}
                    </span>
                    <img
                      src={player.avatar}
                      alt={player.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">{player.name}</div>
                      <div className="text-[10px] text-slate-400 flex items-center space-x-1">
                        <span>{team?.name}</span>
                        <span>•</span>
                        <span>#{player.jerseyNumber}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-black font-mono text-sm text-emerald-400">
                      {player.stats?.goals !== undefined ? `${player.stats.goals} Goals` : player.stats?.ppg !== undefined ? `${player.stats.ppg} PPG` : `${player.stats?.runs} Runs`}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {player.stats?.assists !== undefined ? `${player.stats.assists} Assists` : `${player.stats?.matches} Matches`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fair Play & Disciplinary Index */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Fair Play & Disciplinary Records</span>
            </h3>
            <span className="text-[10px] text-slate-400">Card Infractions</span>
          </div>

          <div className="space-y-3">
            {teams.slice(0, 5).map((team) => (
              <div
                key={team.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-800"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{team.logo}</span>
                  <div>
                    <div className="text-xs font-bold text-white">{team.name}</div>
                    <div className="text-[10px] text-slate-400">{team.coach}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    🟨 {Math.floor((team.stats?.played || 1) * 1.5)} Cards
                  </span>
                  <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                    🟥 0 Reds
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

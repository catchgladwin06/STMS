import React, { useState } from 'react';
import {
  Radio,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Clock,
  Shield,
  Award,
  AlertCircle,
  Plus,
  Volume2,
  ChevronDown
} from 'lucide-react';
import { useSports } from '../../context/SportsContext';

export default function LiveScorerConsole({ selectedMatchId }) {
  const {
    matches,
    teams,
    players,
    venues,
    addMatchEvent,
    undoLastMatchEvent,
    finishMatch,
    setMatchLiveStatus,
    activeTournament
  } = useSports();

  // Find match to score: selectedMatchId or current Live match or first scheduled match
  const liveMatch = matches.find(m => m.id === selectedMatchId) ||
                    matches.find(m => m.status === 'Live') ||
                    matches.find(m => m.tournamentId === activeTournament?.id) ||
                    matches[0];

  const [activeMatchId, setActiveMatchId] = useState(liveMatch?.id || '');
  const match = matches.find(m => m.id === activeMatchId) || liveMatch;

  const homeTeam = teams.find(t => t.id === match?.homeTeamId);
  const awayTeam = teams.find(t => t.id === match?.awayTeamId);
  const venue = venues.find(v => v.id === match?.venueId);

  const homePlayers = players.filter(p => p.teamId === homeTeam?.id);
  const awayPlayers = players.filter(p => p.teamId === awayTeam?.id);

  // Quick state for modal or scorer options
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [selectedAssist, setSelectedAssist] = useState('');

  if (!match) {
    return (
      <div className="p-8 text-center bg-slate-900/60 rounded-2xl border border-slate-800 text-slate-400">
        <Radio className="w-8 h-8 mx-auto text-slate-600 mb-2" />
        <p className="text-sm font-semibold text-slate-300">No match selected for scoring.</p>
      </div>
    );
  }

  // Scoring Action Handlers
  const handleSoccerGoal = (teamId, teamName) => {
    const isHome = teamId === match.homeTeamId;
    const playerObj = (isHome ? homePlayers : awayPlayers).find(p => p.id === selectedPlayer);
    const assistObj = (isHome ? homePlayers : awayPlayers).find(p => p.id === selectedAssist);
    const playerName = playerObj ? playerObj.name : `${teamName} Forward`;

    addMatchEvent(match.id, {
      minute: match.currentMinute || 68,
      type: 'goal',
      teamId: teamId,
      player: playerName,
      assist: assistObj ? assistObj.name : null,
      description: `GOAL! ${playerName} scores into the net for ${teamName}!${assistObj ? ` Assist by ${assistObj.name}.` : ''}`
    });

    setSelectedPlayer('');
    setSelectedAssist('');
  };

  const handleYellowCard = (teamId, teamName) => {
    const isHome = teamId === match.homeTeamId;
    const playerObj = (isHome ? homePlayers : awayPlayers).find(p => p.id === selectedPlayer);
    const playerName = playerObj ? playerObj.name : `${teamName} Player`;

    addMatchEvent(match.id, {
      minute: match.currentMinute || 68,
      type: 'yellow_card',
      teamId: teamId,
      player: playerName,
      description: `Yellow Card shown to ${playerName} (${teamName}) for reckless challenge.`
    });

    setSelectedPlayer('');
  };

  const handleRedCard = (teamId, teamName) => {
    const isHome = teamId === match.homeTeamId;
    const playerObj = (isHome ? homePlayers : awayPlayers).find(p => p.id === selectedPlayer);
    const playerName = playerObj ? playerObj.name : `${teamName} Player`;

    addMatchEvent(match.id, {
      minute: match.currentMinute || 68,
      type: 'red_card',
      teamId: teamId,
      player: playerName,
      description: `RED CARD! ${playerName} (${teamName}) is sent off by the referee!`
    });

    setSelectedPlayer('');
  };

  const handleBasketballPoints = (teamId, points) => {
    addMatchEvent(match.id, {
      minute: match.currentMinute || 12,
      type: 'basket',
      teamId: teamId,
      points: points,
      description: `+${points} points scored!`
    });
  };

  const handleCricketRun = (teamId, runs) => {
    addMatchEvent(match.id, {
      minute: match.currentMinute || 1,
      type: 'cricket_run',
      battingTeamId: teamId,
      runs: runs,
      description: runs === 4 ? 'FOUR! Ball races to boundary.' : runs === 6 ? 'SIX! Maximum over long-on!' : `${runs} run(s) taken.`
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Match Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Radio className="w-5 h-5 text-red-500 animate-pulse" />
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
              Live Match Scorer Console
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Official digital scorekeeper & event logger with instant points sync.
          </p>
        </div>

        {/* Match Select dropdown */}
        <div className="flex items-center space-x-3">
          <select
            value={match.id}
            onChange={(e) => setActiveMatchId(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            {matches.map(m => {
              const h = teams.find(t => t.id === m.homeTeamId);
              const a = teams.find(t => t.id === m.awayTeamId);
              return (
                <option key={m.id} value={m.id}>
                  [{m.status}] {h?.name || 'TBD'} vs {a?.name || 'TBD'} ({m.round})
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Main Scoreboard Display */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Top bar info */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6 text-xs">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-semibold border border-slate-700">
              {match.sport} • {match.round}
            </span>
            <span className="text-slate-400 hidden sm:inline">{venue?.name}</span>
          </div>

          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase ${
              match.status === 'Live'
                ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
                : match.status === 'Completed'
                ? 'bg-slate-800 text-slate-400'
                : 'bg-cyan-500/20 text-cyan-400'
            }`}>
              {match.status === 'Live' ? '● LIVE IN PLAY' : match.status}
            </span>
          </div>
        </div>

        {/* Central Scoreboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Home Team */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-2">
            <div className="text-5xl">{homeTeam?.logo}</div>
            <div className="text-xl md:text-2xl font-black text-white">{homeTeam?.name}</div>
            <div className="text-xs text-slate-400 font-medium">Manager: {homeTeam?.coach}</div>
            <div className="flex items-center space-x-1 mt-1">
              <span className="text-[10px] uppercase font-bold text-slate-500">HOME</span>
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: homeTeam?.primaryColor || '#ef4444' }}></span>
            </div>
          </div>

          {/* Big Score Numbers & Clock Control */}
          <div className="flex flex-col items-center space-y-4">
            
            {/* Score */}
            <div className="flex items-center space-x-4 bg-slate-800/80 px-8 py-4 rounded-3xl border border-slate-700 shadow-inner">
              <span className="font-mono text-5xl md:text-6xl font-black text-white tracking-tighter">
                {match.homeScore}
              </span>
              <span className="font-mono text-3xl font-bold text-slate-500">:</span>
              <span className="font-mono text-5xl md:text-6xl font-black text-white tracking-tighter">
                {match.awayScore}
              </span>
            </div>

            {/* Match Minute & Clock Management */}
            <div className="flex items-center space-x-2 bg-slate-800/60 p-1.5 rounded-2xl border border-slate-700/80 text-xs">
              <div className="px-3 py-1 font-mono font-bold text-emerald-400 flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>{match.currentMinute || 68}' MIN</span>
              </div>

              {match.status === 'Live' && (
                <>
                  <button
                    onClick={() => {
                      setMatchLiveStatus(match.id, 'Live', (match.currentMinute || 68) + 1);
                    }}
                    className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition cursor-pointer"
                    title="Advance Clock +1 min"
                  >
                    +1'
                  </button>
                  <button
                    onClick={() => finishMatch(match.id)}
                    className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold transition cursor-pointer"
                  >
                    End Match
                  </button>
                </>
              )}

              {match.status === 'Scheduled' && (
                <button
                  onClick={() => setMatchLiveStatus(match.id, 'Live', 1)}
                  className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold transition cursor-pointer flex items-center space-x-1"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Kick-off</span>
                </button>
              )}

              {match.status === 'Completed' && (
                <span className="px-3 py-1 text-slate-400 font-semibold">
                  Match Concluded
                </span>
              )}
            </div>

          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
            <div className="text-5xl">{awayTeam?.logo}</div>
            <div className="text-xl md:text-2xl font-black text-white">{awayTeam?.name}</div>
            <div className="text-xs text-slate-400 font-medium">Manager: {awayTeam?.coach}</div>
            <div className="flex items-center space-x-1 mt-1">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: awayTeam?.primaryColor || '#3b82f6' }}></span>
              <span className="text-[10px] uppercase font-bold text-slate-500">AWAY</span>
            </div>
          </div>

        </div>

      </div>

      {/* Official Scorer Action Pads & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Scorer Controls (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Soccer Scoring Controls */}
          {match.sport === 'Soccer' && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Soccer Official Actions</span>
                </h3>
                <span className="text-xs text-slate-400">Click to record instant official event</span>
              </div>

              {/* Player selection for goal / card attribution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-800/40 rounded-xl border border-slate-800 text-xs">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Select Event Player:</label>
                  <select
                    value={selectedPlayer}
                    onChange={(e) => setSelectedPlayer(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="">Default / Team Action</option>
                    <optgroup label={`${homeTeam?.name} (Home)`}>
                      {homePlayers.map(p => (
                        <option key={p.id} value={p.id}>#{p.jerseyNumber} {p.name} ({p.position})</option>
                      ))}
                    </optgroup>
                    <optgroup label={`${awayTeam?.name} (Away)`}>
                      {awayPlayers.map(p => (
                        <option key={p.id} value={p.id}>#{p.jerseyNumber} {p.name} ({p.position})</option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Assist Attribution (Goals only):</label>
                  <select
                    value={selectedAssist}
                    onChange={(e) => setSelectedAssist(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="">No Assist / Solo Strike</option>
                    {[...homePlayers, ...awayPlayers].map(p => (
                      <option key={p.id} value={p.id}>#{p.jerseyNumber} {p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Buttons for Home vs Away */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Home Actions */}
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-3">
                  <div className="font-bold text-xs text-slate-300 flex items-center space-x-1.5">
                    <span>{homeTeam?.logo}</span>
                    <span>{homeTeam?.name} (HOME)</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => handleSoccerGoal(match.homeTeamId, homeTeam?.name)}
                      className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black flex items-center justify-center space-x-1 transition cursor-pointer shadow-md shadow-emerald-500/20"
                    >
                      <span>⚽ +1 GOAL</span>
                    </button>

                    <button
                      onClick={() => handleYellowCard(match.homeTeamId, homeTeam?.name)}
                      className="p-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold transition cursor-pointer"
                    >
                      🟨 Yellow Card
                    </button>

                    <button
                      onClick={() => handleRedCard(match.homeTeamId, homeTeam?.name)}
                      className="p-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 font-bold transition cursor-pointer"
                    >
                      🟥 Red Card
                    </button>

                    <button
                      onClick={() => {
                        addMatchEvent(match.id, {
                          minute: match.currentMinute || 68,
                          type: 'corner',
                          teamId: match.homeTeamId,
                          description: `Corner kick awarded to ${homeTeam?.name}.`
                        });
                      }}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold border border-slate-700 transition cursor-pointer"
                    >
                      ⛳ Corner Kick
                    </button>
                  </div>
                </div>

                {/* Away Actions */}
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-3">
                  <div className="font-bold text-xs text-slate-300 flex items-center space-x-1.5">
                    <span>{awayTeam?.logo}</span>
                    <span>{awayTeam?.name} (AWAY)</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => handleSoccerGoal(match.awayTeamId, awayTeam?.name)}
                      className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black flex items-center justify-center space-x-1 transition cursor-pointer shadow-md shadow-emerald-500/20"
                    >
                      <span>⚽ +1 GOAL</span>
                    </button>

                    <button
                      onClick={() => handleYellowCard(match.awayTeamId, awayTeam?.name)}
                      className="p-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold transition cursor-pointer"
                    >
                      🟨 Yellow Card
                    </button>

                    <button
                      onClick={() => handleRedCard(match.awayTeamId, awayTeam?.name)}
                      className="p-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 font-bold transition cursor-pointer"
                    >
                      🟥 Red Card
                    </button>

                    <button
                      onClick={() => {
                        addMatchEvent(match.id, {
                          minute: match.currentMinute || 68,
                          type: 'corner',
                          teamId: match.awayTeamId,
                          description: `Corner kick awarded to ${awayTeam?.name}.`
                        });
                      }}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold border border-slate-700 transition cursor-pointer"
                    >
                      ⛳ Corner Kick
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Basketball Scoring Controls */}
          {match.sport === 'Basketball' && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-white">Basketball Quick Scorer Pads</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-800/40 rounded-xl space-y-2 text-xs">
                  <div className="font-bold text-white">{homeTeam?.name} (Home)</div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleBasketballPoints(match.homeTeamId, 1)} className="flex-1 py-2 bg-slate-700 rounded-lg font-bold text-white hover:bg-slate-600">+1 FT</button>
                    <button onClick={() => handleBasketballPoints(match.homeTeamId, 2)} className="flex-1 py-2 bg-emerald-600 rounded-lg font-bold text-white hover:bg-emerald-500">+2 FG</button>
                    <button onClick={() => handleBasketballPoints(match.homeTeamId, 3)} className="flex-1 py-2 bg-amber-600 rounded-lg font-bold text-white hover:bg-amber-500">+3 3PT</button>
                  </div>
                </div>

                <div className="p-4 bg-slate-800/40 rounded-xl space-y-2 text-xs">
                  <div className="font-bold text-white">{awayTeam?.name} (Away)</div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleBasketballPoints(match.awayTeamId, 1)} className="flex-1 py-2 bg-slate-700 rounded-lg font-bold text-white hover:bg-slate-600">+1 FT</button>
                    <button onClick={() => handleBasketballPoints(match.awayTeamId, 2)} className="flex-1 py-2 bg-emerald-600 rounded-lg font-bold text-white hover:bg-emerald-500">+2 FG</button>
                    <button onClick={() => handleBasketballPoints(match.awayTeamId, 3)} className="flex-1 py-2 bg-amber-600 rounded-lg font-bold text-white hover:bg-amber-500">+3 3PT</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cricket Scoring Controls */}
          {match.sport === 'Cricket' && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-white">Cricket Delivery Ball-by-Ball</h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {[0, 1, 2, 3, 4, 6].map(runs => (
                  <button
                    key={runs}
                    onClick={() => handleCricketRun(match.homeTeamId, runs)}
                    className="w-12 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 font-bold text-white text-sm"
                  >
                    {runs}
                  </button>
                ))}
                <button
                  onClick={() => {
                    addMatchEvent(match.id, {
                      minute: match.currentMinute || 1,
                      type: 'cricket_wicket',
                      battingTeamId: match.homeTeamId,
                      description: 'WICKET! Batsman caught behind.'
                    });
                  }}
                  className="px-3 h-10 rounded-xl bg-red-600 hover:bg-red-500 font-bold text-white"
                >
                  Wicket OUT
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Live Match Commentary / Event Timeline (Right Col) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Live Event Commentary Feed</span>
              </h3>
              
              {/* Undo Last Action */}
              <button
                onClick={() => undoLastMatchEvent(match.id)}
                className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 cursor-pointer"
                title="Undo last recorded event"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Undo</span>
              </button>
            </div>

            {/* Events Stream */}
            <div className="mt-4 space-y-3 max-h-[380px] overflow-y-auto pr-1 text-xs">
              {(match.events || []).length === 0 ? (
                <div className="p-6 text-center text-slate-500">
                  No events recorded yet. Use the action buttons on the left to record goals, cards, and fouls.
                </div>
              ) : (
                [...(match.events || [])].reverse().map(ev => (
                  <div
                    key={ev.id}
                    className="p-3 rounded-xl bg-slate-800/60 border border-slate-800 flex items-start space-x-3"
                  >
                    <div className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 font-mono font-bold text-emerald-400 text-[10px] mt-0.5">
                      {ev.minute}'
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {ev.type === 'goal' && '⚽ GOAL!'}
                        {ev.type === 'yellow_card' && '🟨 Yellow Card'}
                        {ev.type === 'red_card' && '🟥 Red Card'}
                        {ev.type === 'basket' && '🏀 Points Scored'}
                        {ev.type === 'corner' && '⛳ Corner Kick'}
                        {ev.type === 'cricket_run' && '🏏 Run Scored'}
                        {ev.type === 'cricket_wicket' && '🎯 Wicket'}
                      </div>
                      <p className="text-slate-300 mt-0.5 text-[11px] leading-relaxed">
                        {ev.description}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 text-center">
            Events instantly update standings, athlete statistics, and spectator views.
          </div>
        </div>

      </div>

    </div>
  );
}

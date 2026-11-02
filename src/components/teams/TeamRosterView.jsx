import React, { useState } from 'react';
import {
  Users,
  Plus,
  Shield,
  Award,
  ChevronRight,
  UserPlus,
  Trophy,
  Zap,
  Activity,
  Heart,
  Calendar
} from 'lucide-react';
import { useSports } from '../../context/SportsContext';

export default function TeamRosterView() {
  const {
    teams,
    players,
    venues,
    activeTournament,
    addTeam,
    addPlayer
  } = useSports();

  const [selectedTeamId, setSelectedTeamId] = useState(teams[0]?.id || '');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);

  // New Team Form
  const [newTeamData, setNewTeamData] = useState({
    name: '',
    shortName: '',
    sport: activeTournament?.sport || 'Soccer',
    logo: '🦁',
    coach: '',
    captain: '',
    primaryColor: '#10b981',
    homeVenueId: venues[0]?.id || ''
  });

  // New Player Form
  const [newPlayerData, setNewPlayerData] = useState({
    name: '',
    teamId: selectedTeamId,
    jerseyNumber: 9,
    position: 'Forward',
    age: 22,
    height: '182 cm',
    weight: '76 kg',
    nationality: 'United States',
    sport: activeTournament?.sport || 'Soccer'
  });

  const selectedTeam = teams.find(t => t.id === selectedTeamId) || teams[0];
  const teamRoster = players.filter(p => p.teamId === selectedTeam?.id);

  const handleCreateTeam = (e) => {
    e.preventDefault();
    if (!newTeamData.name.trim()) return;

    const created = {
      id: `team-custom-${Date.now()}`,
      name: newTeamData.name,
      shortName: newTeamData.shortName || newTeamData.name.slice(0, 3).toUpperCase(),
      sport: newTeamData.sport,
      logo: newTeamData.logo,
      coach: newTeamData.coach || 'Head Coach',
      captain: newTeamData.captain || 'Team Captain',
      primaryColor: newTeamData.primaryColor,
      secondaryColor: '#0f172a',
      homeVenueId: newTeamData.homeVenueId,
      founded: 2024,
      rosterSize: 1,
      stats: { played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, form: ['W', 'D', 'W'] }
    };

    addTeam(created);
    setSelectedTeamId(created.id);
    setShowAddTeamModal(false);
  };

  const handleCreatePlayer = (e) => {
    e.preventDefault();
    if (!newPlayerData.name.trim()) return;

    const createdPlayer = {
      id: `p-${Date.now()}`,
      name: newPlayerData.name,
      teamId: selectedTeam.id,
      jerseyNumber: Number(newPlayerData.jerseyNumber) || 10,
      position: newPlayerData.position,
      age: Number(newPlayerData.age) || 24,
      height: newPlayerData.height,
      weight: newPlayerData.weight,
      nationality: newPlayerData.nationality,
      sport: selectedTeam.sport,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      stats: {
        matches: 0,
        goals: 0,
        assists: 0,
        minutesPlayed: 0,
        passAccuracy: 85,
        mvpAwards: 0
      },
      radar: {
        speed: 80,
        shooting: 75,
        passing: 80,
        defense: 70,
        stamina: 82,
        tacticalIQ: 80
      }
    };

    addPlayer(createdPlayer);
    setShowAddPlayerModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <Users className="w-6 h-6 text-emerald-400" />
            <span>Teams, Squads & Athlete Rosters</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Registered club profiles, tactical squad rosters, and athlete performance cards.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddTeamModal(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs flex items-center space-x-1.5 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Register Team</span>
          </button>
          <button
            onClick={() => setShowAddPlayerModal(true)}
            className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-500/20 transition cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Athlete</span>
          </button>
        </div>
      </div>

      {/* Team Selection Cards Horizontal Ribbon */}
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {teams.map(team => {
          const isSelected = team.id === selectedTeam?.id;

          return (
            <button
              key={team.id}
              onClick={() => setSelectedTeamId(team.id)}
              className={`p-3.5 rounded-2xl border text-left shrink-0 transition cursor-pointer min-w-[200px] flex items-center space-x-3 ${
                isSelected
                  ? 'bg-slate-800 border-emerald-500 ring-1 ring-emerald-500/40 shadow-lg'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-3xl">{team.logo}</div>
              <div className="truncate">
                <div className="font-bold text-xs text-white truncate">{team.name}</div>
                <div className="text-[10px] text-slate-400 flex items-center space-x-1.5 mt-0.5">
                  <span className="font-mono text-emerald-400 font-semibold">{team.shortName}</span>
                  <span>•</span>
                  <span>{team.sport}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Team Profile & Roster Grid */}
      {selectedTeam && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Team Overview Card (Left Col) */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="text-5xl p-3 rounded-2xl bg-slate-800 border border-slate-700">
                {selectedTeam.logo}
              </div>
              <div>
                <h3 className="text-lg font-black text-white">{selectedTeam.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700 font-semibold">
                  {selectedTeam.sport} Official Club
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-800 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Head Coach:</span>
                <span className="font-semibold text-white">{selectedTeam.coach}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Team Captain:</span>
                <span className="font-semibold text-white">{selectedTeam.captain}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Founded:</span>
                <span className="font-mono text-slate-300">{selectedTeam.founded}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Roster Capacity:</span>
                <span className="font-mono text-emerald-400 font-bold">{teamRoster.length} Players</span>
              </div>
            </div>

            {/* Form Guide */}
            <div className="pt-3 border-t border-slate-800">
              <div className="text-xs text-slate-400 mb-2">Recent Form (Last 5 Games):</div>
              <div className="flex space-x-1.5">
                {(selectedTeam.stats?.form || ['W', 'D', 'W', 'W', 'L']).map((res, i) => (
                  <span
                    key={i}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black ${
                      res === 'W'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : res === 'D'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-red-500/20 text-red-400 border border-red-500/40'
                    }`}
                  >
                    {res}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Roster Athletes Table (2 Cols) */}
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span>{selectedTeam.name} Official Squad List</span>
                </h3>
                <p className="text-xs text-slate-400">Click any athlete to inspect their 360° performance radar card</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                {teamRoster.length} Athletes
              </span>
            </div>

            {teamRoster.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">
                No players registered yet for this team. Click "Add Athlete" to enroll a player.
              </div>
            ) : (
              <div className="divide-y divide-slate-800/60">
                {teamRoster.map(player => (
                  <div
                    key={player.id}
                    onClick={() => setSelectedPlayer(player)}
                    className="py-3 px-2 flex items-center justify-between hover:bg-slate-800/40 rounded-xl transition cursor-pointer group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-black text-xs text-emerald-400 group-hover:border-emerald-500">
                        #{player.jerseyNumber}
                      </div>

                      <img
                        src={player.avatar}
                        alt={player.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-700"
                      />

                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition flex items-center space-x-1.5">
                          <span>{player.name}</span>
                          {player.stats?.mvpAwards > 0 && (
                            <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/20 text-amber-400 rounded border border-amber-500/30">
                              ★ {player.stats.mvpAwards} MVP
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {player.position} • {player.nationality} • {player.age} yrs
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-xs">
                      <div className="text-right hidden sm:block">
                        <div className="font-bold text-white font-mono">
                          {player.stats?.goals !== undefined ? `${player.stats.goals} Goals` : player.stats?.ppg !== undefined ? `${player.stats.ppg} PPG` : `${player.stats?.runs || 0} Runs`}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {player.stats?.matches || 0} Matches
                        </div>
                      </div>

                      <div className="p-1 rounded-lg bg-slate-800 text-slate-400 group-hover:text-emerald-400">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* Athlete Radar Card / Profile Modal */}
      {selectedPlayer && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedPlayer.avatar}
                  alt={selectedPlayer.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-black text-white">{selectedPlayer.name}</h3>
                    <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                      #{selectedPlayer.jerseyNumber}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{selectedPlayer.position} • {selectedPlayer.nationality}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedPlayer(null)}
                className="text-slate-400 hover:text-white text-sm p-1"
              >
                ✕
              </button>
            </div>

            {/* Physical Attributes Bar */}
            <div className="grid grid-cols-3 gap-3 p-3 bg-slate-800/40 rounded-2xl border border-slate-800 text-xs text-center">
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold">Age</div>
                <div className="font-bold text-white font-mono mt-0.5">{selectedPlayer.age} yrs</div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold">Height</div>
                <div className="font-bold text-white font-mono mt-0.5">{selectedPlayer.height}</div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold">Weight</div>
                <div className="font-bold text-white font-mono mt-0.5">{selectedPlayer.weight}</div>
              </div>
            </div>

            {/* Performance Radar Breakdown */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>Athletic Skill Breakdown (0 - 100)</span>
                <span className="text-[10px] text-emerald-400 font-mono">Biometric Analytics</span>
              </div>

              {selectedPlayer.radar && (
                <div className="space-y-2 text-xs">
                  {Object.entries(selectedPlayer.radar).map(([metric, value]) => (
                    <div key={metric} className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="capitalize text-slate-400">{metric}</span>
                        <span className="font-mono font-bold text-emerald-400">{value} / 100</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Career / Tournament Stats */}
            <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-800 text-xs space-y-2">
              <div className="font-bold text-white flex items-center space-x-1.5">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Tournament Track Record</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
                <div>Matches: <span className="text-white font-mono font-bold">{selectedPlayer.stats?.matches || 0}</span></div>
                <div>Goals / Pts: <span className="text-emerald-400 font-mono font-bold">{selectedPlayer.stats?.goals || selectedPlayer.stats?.runs || 0}</span></div>
                <div>Pass Acc: <span className="text-cyan-400 font-mono font-bold">{selectedPlayer.stats?.passAccuracy || 85}%</span></div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Add Team Modal */}
      {showAddTeamModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Register Club / Team</h3>
              <button onClick={() => setShowAddTeamModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateTeam} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Club Name</label>
                <input
                  type="text"
                  required
                  value={newTeamData.name}
                  onChange={(e) => setNewTeamData({ ...newTeamData, name: e.target.value })}
                  placeholder="e.g. Thunder Bay FC"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Short Tag</label>
                  <input
                    type="text"
                    required
                    value={newTeamData.shortName}
                    onChange={(e) => setNewTeamData({ ...newTeamData, shortName: e.target.value.toUpperCase() })}
                    placeholder="e.g. TBF"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Crest Icon / Emoji</label>
                  <input
                    type="text"
                    value={newTeamData.logo}
                    onChange={(e) => setNewTeamData({ ...newTeamData, logo: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-center text-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Head Coach</label>
                  <input
                    type="text"
                    value={newTeamData.coach}
                    onChange={(e) => setNewTeamData({ ...newTeamData, coach: e.target.value })}
                    placeholder="Coach name"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Team Captain</label>
                  <input
                    type="text"
                    value={newTeamData.captain}
                    onChange={(e) => setNewTeamData({ ...newTeamData, captain: e.target.value })}
                    placeholder="Captain name"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setShowAddTeamModal(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold">Register Team</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Player Modal */}
      {showAddPlayerModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Enroll Athlete to {selectedTeam.name}</h3>
              <button onClick={() => setShowAddPlayerModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreatePlayer} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Athlete Full Name</label>
                <input
                  type="text"
                  required
                  value={newPlayerData.name}
                  onChange={(e) => setNewPlayerData({ ...newPlayerData, name: e.target.value })}
                  placeholder="e.g. Leo Henderson"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Jersey Number</label>
                  <input
                    type="number"
                    required
                    value={newPlayerData.jerseyNumber}
                    onChange={(e) => setNewPlayerData({ ...newPlayerData, jerseyNumber: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Position</label>
                  <input
                    type="text"
                    required
                    value={newPlayerData.position}
                    onChange={(e) => setNewPlayerData({ ...newPlayerData, position: e.target.value })}
                    placeholder="e.g. Striker, Point Guard"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Age</label>
                  <input
                    type="number"
                    value={newPlayerData.age}
                    onChange={(e) => setNewPlayerData({ ...newPlayerData, age: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nationality</label>
                  <input
                    type="text"
                    value={newPlayerData.nationality}
                    onChange={(e) => setNewPlayerData({ ...newPlayerData, nationality: e.target.value })}
                    placeholder="e.g. Spain, USA"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setShowAddPlayerModal(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold">Save Athlete</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

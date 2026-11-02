import React, { useState } from 'react';
import { api } from '../../services/api';
import {
  Trophy,
  Plus,
  Calendar,
  MapPin,
  Users,
  Award,
  Filter,
  CheckCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useSports } from '../../context/SportsContext';

export default function TournamentList({ onNavigateToFixtures }) {
  const {
    tournaments,
    activeTournamentId,
    setActiveTournamentId,
    venues,
    teams,
    addTournament,
    currentRole
  } = useSports();

  const [selectedSport, setSelectedSport] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Tournament Form State
  const [formData, setFormData] = useState({
    name: '',
    sport: 'Soccer',
    format: 'Round Robin',
    category: 'Open Championship',
    startDate: '2026-10-15',
    endDate: '2026-11-20',
    prizePool: '$25,000',
    primaryVenueId: venues[0]?.id || '',
    description: '',
    banner: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80'
  });

  const filteredTournaments = tournaments.filter(t => {
    if (selectedSport === 'All') return true;
    return t.sport === selectedSport;
  });

  const handleCreateTournament = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const availableTeamsForSport = teams.filter(t => t.sport === formData.sport).map(t => t.id);

    const newTournament = {
      id: `tourn-${Date.now()}`,
      name: formData.name,
      sport: formData.sport,
      format: formData.format,
      category: formData.category,
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: 'Upcoming',
      prizePool: formData.prizePool,
      primaryVenueId: formData.primaryVenueId,
      description: formData.description || 'Newly organized tournament.',
      banner: formData.banner,
      teamsCount: availableTeamsForSport.length,
      participatingTeamIds: availableTeamsForSport,
      rules: {
        pointsWin: 3,
        pointsDraw: 1,
        pointsLoss: 0
      }
    };

    await api.createTournament(newTournament);
addTournament(newTournament);
setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header with Title and Create Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-emerald-400" />
            <span>Tournament Management</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Centralized registry for leagues, knockouts, brackets, and multi-sport championships.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Create Button (Admin or any role for demo purposes) */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs md:text-sm flex items-center space-x-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Tournament</span>
          </button>
        </div>
      </div>

      {/* Sport Category Filters */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {['All', 'Soccer', 'Basketball', 'Cricket'].map(sport => (
          <button
            key={sport}
            onClick={() => setSelectedSport(sport)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer shrink-0 ${
              selectedSport === sport
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700'
            }`}
          >
            {sport === 'Soccer' && '⚽ '}
            {sport === 'Basketball' && '🏀 '}
            {sport === 'Cricket' && '🏏 '}
            {sport}
          </button>
        ))}
      </div>

      {/* Tournament Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTournaments.map(tournament => {
          const isActive = tournament.id === activeTournamentId;
          const venue = venues.find(v => v.id === tournament.primaryVenueId);

          return (
            <div
              key={tournament.id}
              className={`rounded-2xl border overflow-hidden flex flex-col bg-slate-900/80 transition-all duration-300 ${
                isActive
                  ? 'border-emerald-500 shadow-xl shadow-emerald-950/30 ring-1 ring-emerald-500/30'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Card Banner Image */}
              <div className="h-36 relative overflow-hidden bg-slate-800">
                <img
                  src={tournament.banner}
                  alt={tournament.name}
                  className="w-full h-full object-cover object-center filter brightness-90 hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                
                {/* Badges on image */}
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-900/80 backdrop-blur-md text-white border border-slate-700">
                    {tournament.sport}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md ${
                    tournament.status === 'Ongoing'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  }`}>
                    {tournament.status}
                  </span>
                </div>

                {isActive && (
                  <div className="absolute top-3 right-3 bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-black tracking-wide flex items-center space-x-1 shadow-lg">
                    <CheckCircle className="w-3 h-3" />
                    <span>ACTIVE</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {tournament.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {tournament.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                    <div className="flex items-center space-x-2 text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-[11px] truncate">{tournament.startDate}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-slate-300">
                      <Users className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="text-[11px]">{tournament.participatingTeamIds?.length || 0} Teams</span>
                    </div>

                    <div className="flex items-center space-x-2 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-[11px] truncate">{venue?.name || 'Multiple Venues'}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-slate-300">
                      <Award className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="text-[11px] font-semibold text-purple-300">{tournament.prizePool}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  {!isActive ? (
                    <button
                      onClick={() => setActiveTournamentId(tournament.id)}
                      className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition cursor-pointer border border-slate-700"
                    >
                      Set as Active
                    </button>
                  ) : (
                    <button
                      onClick={() => onNavigateToFixtures && onNavigateToFixtures()}
                      className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold transition cursor-pointer flex items-center justify-center space-x-1.5"
                    >
                      <span>Manage Fixtures</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* Create Tournament Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-emerald-400" />
                <span>Create New Tournament</span>
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTournament} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tournament Title</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Continental Youth Cup 2026"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Sport Discipline</label>
                  <select
                    value={formData.sport}
                    onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Soccer">⚽ Soccer / Football</option>
                    <option value="Basketball">🏀 Basketball</option>
                    <option value="Cricket">🏏 Cricket</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Competition Format</label>
                  <select
                    value={formData.format}
                    onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Round Robin">Round Robin League</option>
                    <option value="Single Elimination">Single Elimination (Knockout)</option>
                    <option value="League & Knockout">Group Stage + Knockout</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Prize Pool</label>
                  <input
                    type="text"
                    value={formData.prizePool}
                    onChange={(e) => setFormData({ ...formData, prizePool: e.target.value })}
                    placeholder="e.g. $30,000"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Primary Venue</label>
                  <select
                    value={formData.primaryVenueId}
                    onChange={(e) => setFormData({ ...formData, primaryVenueId: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    {venues.map(v => (
                      <option key={v.id} value={v.id}>{v.name} ({v.sport})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description / Overview</label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide brief tournament details and rules..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold"
                >
                  Create & Initialize
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

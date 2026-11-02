import React, { useState } from 'react';
import {
  MapPin,
  AlertTriangle,
  CheckCircle,
  Plus,
  Clock,
  Calendar,
  Users,
  Wrench,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useSports } from '../../context/SportsContext';

export default function VenueScheduler() {
  const {
    venues,
    matches,
    teams,
    detectConflicts,
    resolveConflict,
    addVenue
  } = useSports();

  const conflicts = detectConflicts();
  const [selectedDate, setSelectedDate] = useState('2026-10-02');
  const [showAddVenueModal, setShowAddVenueModal] = useState(false);

  // New Venue Form State
  const [newVenueData, setNewVenueData] = useState({
    name: '',
    sport: 'Soccer',
    location: '',
    capacity: 10000,
    surface: 'Natural Grass',
    amenities: 'Floodlights, Locker Rooms, Medical Bay'
  });

  const handleCreateVenue = (e) => {
    e.preventDefault();
    if (!newVenueData.name.trim()) return;

    const createdVenue = {
      id: `v-${Date.now()}`,
      name: newVenueData.name,
      sport: newVenueData.sport,
      location: newVenueData.location || 'Central Complex',
      capacity: Number(newVenueData.capacity) || 5000,
      surface: newVenueData.surface,
      amenities: newVenueData.amenities.split(',').map(s => s.trim()),
      status: 'Available'
    };

    addVenue(createdVenue);
    setShowAddVenueModal(false);
  };

  // Filter matches scheduled for the selected calendar date
  const matchesOnSelectedDate = matches.filter(m => m.date === selectedDate);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <MapPin className="w-6 h-6 text-emerald-400" />
            <span>Smart Venue Scheduling & Conflict Engine</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Real-time conflict detection, pitch allocation, and automated resolution algorithms.
          </p>
        </div>

        <button
          onClick={() => setShowAddVenueModal(true)}
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs md:text-sm flex items-center space-x-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Facility / Venue</span>
        </button>
      </div>

      {/* Conflict Detection Banner */}
      {conflicts.length > 0 ? (
        <div className="bg-gradient-to-r from-red-950/50 via-slate-900 to-amber-950/40 border-2 border-red-500/50 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-start space-x-3">
            <div className="p-2.5 rounded-xl bg-red-500/20 text-red-400 shrink-0 mt-0.5">
              <AlertTriangle className="w-6 h-6 animate-bounce" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-black text-red-300 uppercase tracking-wider">
                  ⚠️ ALGORITHM ALERT: {conflicts.length} CRITICAL SCHEDULING CONFLICT(S) DETECTED
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                The automated slot conflict engine identified an overlapping venue or team reservation that violates fair scheduling constraints.
              </p>

              {/* Conflict Cards */}
              <div className="mt-4 space-y-3">
                {conflicts.map((c) => {
                  const m1Home = teams.find(t => t.id === c.match1.homeTeamId)?.name;
                  const m1Away = teams.find(t => t.id === c.match1.awayTeamId)?.name;
                  const m2Home = teams.find(t => t.id === c.match2.homeTeamId)?.name;
                  const m2Away = teams.find(t => t.id === c.match2.awayTeamId)?.name;

                  return (
                    <div
                      key={c.id}
                      className="p-4 rounded-xl bg-slate-950/80 border border-red-500/40 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1 text-xs">
                        <div className="font-bold text-red-400">
                          {c.type === 'VENUE_DOUBLE_BOOKING' ? '🏟️ Double-Booked Venue' : '👥 Team Overlap'}
                        </div>
                        <div className="text-slate-300">{c.description}</div>
                        <div className="text-[11px] text-slate-400 flex items-center space-x-2">
                          <span className="text-amber-400">Match 1: {m1Home} vs {m1Away} ({c.time1})</span>
                          <span>vs</span>
                          <span className="text-amber-400">Match 2: {m2Home} vs {m2Away} ({c.time2})</span>
                        </div>
                      </div>

                      {c.suggestedFix && (
                        <button
                          onClick={() => {
                            resolveConflict(
                              c.suggestedFix.matchIdToMove,
                              c.suggestedFix.suggestedVenueId,
                              c.suggestedFix.suggestedNewTime
                            );
                          }}
                          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center space-x-2 shadow-md shadow-emerald-500/20 shrink-0 transition cursor-pointer"
                        >
                          <ShieldCheck className="w-4 h-4" />
                          <span>1-Click Auto-Resolve Conflict</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4 flex items-center space-x-3 text-emerald-300 text-xs">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            <strong>Zero Conflicts:</strong> All matches across stadiums and courts are conflict-free with appropriate transition windows!
          </span>
        </div>
      )}

      {/* Date Matrix & Timeline Browser */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Venue Schedule Visual Matrix</span>
            </h3>
            <p className="text-xs text-slate-400">Inspect pitch allocations by calendar date</p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400">Select Date:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Matrix Grid */}
        <div className="space-y-4">
          {venues.map(v => {
            const venueBookings = matchesOnSelectedDate.filter(m => m.venueId === v.id);
            const isConflicted = conflicts.some(c => c.venueName === v.name && c.date === selectedDate);

            return (
              <div
                key={v.id}
                className={`p-4 rounded-xl border transition ${
                  isConflicted
                    ? 'bg-red-950/30 border-red-500/50'
                    : 'bg-slate-800/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-emerald-400 font-bold text-xs">
                      {v.sport}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center space-x-2">
                        <span>{v.name}</span>
                        {isConflicted && (
                          <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold border border-red-500/40 animate-pulse">
                            Overlap Conflict
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Capacity: {v.capacity.toLocaleString()} • Surface: {v.surface} • {v.location}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-slate-300">
                    {venueBookings.length} Scheduled Booking(s) on {selectedDate}
                  </div>
                </div>

                {/* Bookings inside this venue on this day */}
                <div className="mt-3 pt-3 border-t border-slate-800/80">
                  {venueBookings.length === 0 ? (
                    <div className="text-xs text-slate-500 italic">
                      Venue is completely free on this date.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {venueBookings.map(b => {
                        const h = teams.find(t => t.id === b.homeTeamId)?.name;
                        const a = teams.find(t => t.id === b.awayTeamId)?.name;

                        return (
                          <div
                            key={b.id}
                            className={`p-2.5 rounded-lg border flex items-center justify-between ${
                              isConflicted
                                ? 'bg-red-950/50 border-red-500/40 text-red-200'
                                : 'bg-slate-800 border-slate-700 text-slate-200'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <Clock className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="font-mono font-bold">{b.time} - {b.endTime}</span>
                              <span className="font-medium truncate max-w-[150px]">{h} vs {a}</span>
                            </div>
                            <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-900 text-slate-300">
                              {b.status}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Venues Directory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {venues.map(venue => (
          <div key={venue.id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-base">{venue.name}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-emerald-400 font-semibold border border-slate-700">
                {venue.sport}
              </span>
            </div>

            <p className="text-xs text-slate-400">{venue.location}</p>

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div>Capacity: <span className="text-white font-mono">{venue.capacity.toLocaleString()}</span></div>
              <div>Surface: <span className="text-white">{venue.surface}</span></div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {(venue.amenities || []).map((am, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                  {am}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Venue Modal */}
      {showAddVenueModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span>Add Stadium / Venue Facility</span>
              </h3>
              <button onClick={() => setShowAddVenueModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateVenue} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Facility Name</label>
                <input
                  type="text"
                  required
                  value={newVenueData.name}
                  onChange={(e) => setNewVenueData({ ...newVenueData, name: e.target.value })}
                  placeholder="e.g. Westside Multipurpose Arena"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Sport Discipline</label>
                  <select
                    value={newVenueData.sport}
                    onChange={(e) => setNewVenueData({ ...newVenueData, sport: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Soccer">Soccer</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Cricket">Cricket</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Spectator Capacity</label>
                  <input
                    type="number"
                    value={newVenueData.capacity}
                    onChange={(e) => setNewVenueData({ ...newVenueData, capacity: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Location / Address</label>
                <input
                  type="text"
                  value={newVenueData.location}
                  onChange={(e) => setNewVenueData({ ...newVenueData, location: e.target.value })}
                  placeholder="e.g. 500 Championship Blvd, Sector 8"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Surface Type</label>
                <input
                  type="text"
                  value={newVenueData.surface}
                  onChange={(e) => setNewVenueData({ ...newVenueData, surface: e.target.value })}
                  placeholder="e.g. Hybrid Natural Turf, Maple Hardwood"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Amenities (comma-separated)</label>
                <input
                  type="text"
                  value={newVenueData.amenities}
                  onChange={(e) => setNewVenueData({ ...newVenueData, amenities: e.target.value })}
                  placeholder="Floodlights, VAR Video, Locker Rooms"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddVenueModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold"
                >
                  Save Facility
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

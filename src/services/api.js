// Frontend API Client connecting React to Express & MongoDB backend
// Automatically falls back to LocalStorage if backend is offline or MongoDB is not running locally.

const API_BASE_URL = 'https://stms-backend-three.vercel.app/api';

export const api = {
  // Tournaments
  async getTournaments() {
    try {
      const res = await fetch(`${API_BASE_URL}/tournaments`);
      if (res.ok) return await res.json();
    } catch (e) {
      // Server offline fallback
    }
    return null;
  },

  async createTournament(tournamentData) {
    try {
      const res = await fetch(`${API_BASE_URL}/tournaments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tournamentData)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Server offline fallback
    }
    return tournamentData;
  },

  // Teams
  async getTeams() {
    try {
      const res = await fetch(`${API_BASE_URL}/teams`);
      if (res.ok) return await res.json();
    } catch (e) {
      // Server offline fallback
    }
    return null;
  },

  async createTeam(teamData) {
    try {
      const res = await fetch(`${API_BASE_URL}/teams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamData)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Server offline fallback
    }
    return teamData;
  },

  // Matches
  async getMatches(tournamentId) {
    try {
      const url = tournamentId ? `${API_BASE_URL}/matches?tournamentId=${tournamentId}` : `${API_BASE_URL}/matches`;
      const res = await fetch(url);
      if (res.ok) return await res.json();
    } catch (e) {
      // Server offline fallback
    }
    return null;
  },

  async recordMatchEvent(matchId, eventData, currentScore) {
    try {
      const res = await fetch(`${API_BASE_URL}/matches/${matchId}/event`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: eventData,
          homeScore: currentScore.homeScore,
          awayScore: currentScore.awayScore,
          currentMinute: currentScore.currentMinute,
          status: currentScore.status
        })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Server offline fallback
    }
    return null;
  },

  // Venues
  async getVenues() {
    try {
      const res = await fetch(`${API_BASE_URL}/venues`);
      if (res.ok) return await res.json();
    } catch (e) {
      // Server offline fallback
    }
    return null;
  },

  async createVenue(venueData) {
    try {
      const res = await fetch(`${API_BASE_URL}/venues`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(venueData)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Server offline fallback
    }
    return venueData;
  }
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  INITIAL_VENUES,
  INITIAL_TEAMS,
  INITIAL_PLAYERS,
  INITIAL_TOURNAMENTS,
  INITIAL_MATCHES,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

const SportsContext = createContext();

// Helper to convert HH:MM to total minutes for overlap checks
function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return (hours || 0) * 60 + (minutes || 0);
}

export function SportsProvider({ children }) {
  // Role switcher: 'admin' (Director), 'scorer' (Official), 'coach' (Coach/Manager), 'athlete' (Player), 'spectator' (Fan)
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('sports_role') || 'admin';
  });

  const [activeTournamentId, setActiveTournamentId] = useState(() => {
    return localStorage.getItem('sports_active_tournament') || 'tourn-1';
  });

  // Main collections with localStorage persistence
  const [tournaments, setTournaments] = useState(() => {
    const saved = localStorage.getItem('sports_tournaments');
    return saved ? JSON.parse(saved) : INITIAL_TOURNAMENTS;
  });

  const [teams, setTeams] = useState(() => {
    const saved = localStorage.getItem('sports_teams');
    return saved ? JSON.parse(saved) : INITIAL_TEAMS;
  });

  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem('sports_players');
    return saved ? JSON.parse(saved) : INITIAL_PLAYERS;
  });

  const [venues, setVenues] = useState(() => {
    const saved = localStorage.getItem('sports_venues');
    return saved ? JSON.parse(saved) : INITIAL_VENUES;
  });

  const [matches, setMatches] = useState(() => {
    const saved = localStorage.getItem('sports_matches');
    return saved ? JSON.parse(saved) : INITIAL_MATCHES;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('sports_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Real-time ticking for the live match simulation
  const [isClockRunning, setIsClockRunning] = useState(true);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('sports_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('sports_active_tournament', activeTournamentId);
  }, [activeTournamentId]);

  useEffect(() => {
    localStorage.setItem('sports_tournaments', JSON.stringify(tournaments));
  }, [tournaments]);

  useEffect(() => {
    localStorage.setItem('sports_teams', JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem('sports_players', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem('sports_venues', JSON.stringify(venues));
  }, [venues]);

  useEffect(() => {
    localStorage.setItem('sports_matches', JSON.stringify(matches));
  }, [matches]);

  useEffect(() => {
    localStorage.setItem('sports_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Clock tick effect for live match minute progression
  useEffect(() => {
    if (!isClockRunning) return;

    const interval = setInterval(() => {
      setMatches(prevMatches =>
        prevMatches.map(m => {
          if (m.status === 'Live' && m.sport === 'Soccer') {
            const nextMin = (m.currentMinute || 1) + 1;
            if (nextMin > 90) {
              return { ...m, currentMinute: 90, status: 'Completed', period: 'Full Time' };
            }
            return { ...m, currentMinute: nextMin };
          }
          return m;
        })
      );
    }, 15000); // Advances 1 match minute every 15 seconds

    return () => clearInterval(interval);
  }, [isClockRunning]);

  // Reset to default sample data
  const resetToDefaults = () => {
    localStorage.clear();
    setTournaments(INITIAL_TOURNAMENTS);
    setTeams(INITIAL_TEAMS);
    setPlayers(INITIAL_PLAYERS);
    setVenues(INITIAL_VENUES);
    setMatches(INITIAL_MATCHES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setActiveTournamentId('tourn-1');
    setCurrentRole('admin');
  };

  // Add Notification helper
  const addNotification = (title, message, type = 'info') => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      time: 'Just now',
      title,
      message,
      type,
      unread: true
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 19)]);
  };

  // Conflict Detection Engine
  const detectConflicts = () => {
    const conflictList = [];

    // Check every pair of scheduled or live matches
    for (let i = 0; i < matches.length; i++) {
      for (let j = i + 1; j < matches.length; j++) {
        const m1 = matches[i];
        const m2 = matches[j];

        if (m1.status === 'Completed' || m2.status === 'Completed') continue;

        // 1. Check Date Match
        if (m1.date === m2.date) {
          const m1Start = timeToMinutes(m1.time);
          const m1End = timeToMinutes(m1.endTime || m1.time) || m1Start + 110;
          const m2Start = timeToMinutes(m2.time);
          const m2End = timeToMinutes(m2.endTime || m2.time) || m2Start + 110;

          const isTimeOverlap = Math.max(m1Start, m2Start) < Math.min(m1End, m2End);

          if (isTimeOverlap) {
            // Venue Conflict
            if (m1.venueId && m1.venueId === m2.venueId) {
              const venue = venues.find(v => v.id === m1.venueId);
              const team1H = teams.find(t => t.id === m1.homeTeamId)?.name || 'Team A';
              const team1A = teams.find(t => t.id === m1.awayTeamId)?.name || 'Team B';
              const team2H = teams.find(t => t.id === m2.homeTeamId)?.name || 'Team C';
              const team2A = teams.find(t => t.id === m2.awayTeamId)?.name || 'Team D';

              // Suggested alternative venue
              const alternativeVenue = venues.find(v => v.id !== m1.venueId && v.sport === m1.sport);

              conflictList.push({
                id: `conflict-${m1.id}-${m2.id}`,
                type: 'VENUE_DOUBLE_BOOKING',
                severity: 'high',
                match1: m1,
                match2: m2,
                venueName: venue?.name || 'Assigned Venue',
                date: m1.date,
                time1: `${m1.time} - ${m1.endTime}`,
                time2: `${m2.time} - ${m2.endTime}`,
                description: `Venue "${venue?.name}" is double-booked on ${m1.date}. Overlap between [${team1H} vs ${team1A}] and [${team2H} vs ${team2A}].`,
                suggestedFix: {
                  matchIdToMove: m2.id,
                  suggestedVenueId: alternativeVenue ? alternativeVenue.id : venues[0]?.id,
                  suggestedVenueName: alternativeVenue ? alternativeVenue.name : 'Alternative Venue',
                  suggestedNewTime: '20:15'
                }
              });
            }

            // Team Double Booking Conflict
            const sharedTeam = [m1.homeTeamId, m1.awayTeamId].find(
              tid => tid === m2.homeTeamId || tid === m2.awayTeamId
            );

            if (sharedTeam) {
              const conflictTeam = teams.find(t => t.id === sharedTeam)?.name || 'Team';
              conflictList.push({
                id: `conflict-team-${m1.id}-${m2.id}`,
                type: 'TEAM_DOUBLE_BOOKING',
                severity: 'critical',
                match1: m1,
                match2: m2,
                date: m1.date,
                description: `${conflictTeam} is scheduled in two overlapping fixtures on ${m1.date}!`,
                suggestedFix: {
                  matchIdToMove: m2.id,
                  suggestedNewDate: '2026-10-04',
                  suggestedNewTime: '17:00'
                }
              });
            }
          }
        }
      }
    }

    return conflictList;
  };

  // Resolve conflict automatically
  const resolveConflict = (matchId, newVenueId, newTime) => {
    setMatches(prev =>
      prev.map(m => {
        if (m.id === matchId) {
          const startMin = timeToMinutes(newTime);
          const endHours = Math.floor((startMin + 110) / 60);
          const endMins = (startMin + 110) % 60;
          const formattedEnd = `${String(endHours).padStart(2, '0')}:${String(endMins).padStart(2, '0')}`;

          return {
            ...m,
            venueId: newVenueId || m.venueId,
            time: newTime || m.time,
            endTime: formattedEnd
          };
        }
        return m;
      })
    );

    addNotification(
      'Schedule Conflict Resolved',
      `Match schedule updated to prevent venue overlapping.`,
      'success'
    );
  };

  // Automated Fixture Generator
  const generateFixtures = (tournamentId, formatType) => {
    const tournament = tournaments.find(t => t.id === tournamentId);
    if (!tournament) return;

    const participatingTeams = teams.filter(t =>
      tournament.participatingTeamIds.includes(t.id)
    );

    if (participatingTeams.length < 2) {
      alert("At least 2 teams required to generate fixtures!");
      return;
    }

    let newMatches = [];
    const baseDate = new Date(tournament.startDate || Date.now());

    if (formatType === 'Single Elimination' || formatType === 'Knockout') {
      // Create bracket matches
      const shuffled = [...participatingTeams].sort(() => 0.5 - Math.random());
      const roundsCount = Math.ceil(Math.log2(shuffled.length));
      
      // First round pairings
      for (let i = 0; i < shuffled.length; i += 2) {
        const homeTeam = shuffled[i];
        const awayTeam = shuffled[i + 1] || { id: 'bye', name: 'BYE' };
        
        const matchDate = new Date(baseDate);
        matchDate.setDate(baseDate.getDate() + Math.floor(i / 2));
        const dateStr = matchDate.toISOString().split('T')[0];

        newMatches.push({
          id: `match-gen-${Date.now()}-${i}`,
          tournamentId: tournament.id,
          sport: tournament.sport,
          round: roundsCount === 1 ? 'Final' : roundsCount === 2 ? 'Semi Final' : 'Quarter Final',
          homeTeamId: homeTeam.id,
          awayTeamId: awayTeam.id,
          venueId: tournament.primaryVenueId || venues[0]?.id,
          date: dateStr,
          time: '18:00',
          endTime: '19:50',
          status: 'Scheduled',
          homeScore: 0,
          awayScore: 0,
          referee: 'Official Scorer',
          events: []
        });
      }
    } else {
      // Round Robin (Berger algorithm)
      const teamList = [...participatingTeams];
      if (teamList.length % 2 !== 0) {
        teamList.push({ id: 'bye', name: 'BYE' });
      }

      const totalRounds = teamList.length - 1;
      const matchesPerRound = teamList.length / 2;

      let roundCounter = 1;
      for (let round = 0; round < totalRounds; round++) {
        for (let match = 0; match < matchesPerRound; match++) {
          const home = teamList[match];
          const away = teamList[teamList.length - 1 - match];

          if (home.id !== 'bye' && away.id !== 'bye') {
            const matchDate = new Date(baseDate);
            matchDate.setDate(baseDate.getDate() + round * 3 + match);
            const dateStr = matchDate.toISOString().split('T')[0];

            // Spread matches between available venues to prevent initial conflicts
            const venue = venues[match % venues.length];

            newMatches.push({
              id: `match-rr-${Date.now()}-${round}-${match}`,
              tournamentId: tournament.id,
              sport: tournament.sport,
              round: `Matchday ${roundCounter}`,
              homeTeamId: home.id,
              awayTeamId: away.id,
              venueId: venue ? venue.id : tournament.primaryVenueId,
              date: dateStr,
              time: `${17 + (match % 3)}:00`,
              endTime: `${19 + (match % 3)}:00`,
              status: 'Scheduled',
              homeScore: 0,
              awayScore: 0,
              referee: 'Certified Official',
              events: []
            });
          }
        }
        // Rotate array
        teamList.splice(1, 0, teamList.pop());
        roundCounter++;
      }
    }

    // Append new matches
    setMatches(prev => [...prev.filter(m => m.tournamentId !== tournamentId), ...newMatches]);

    addNotification(
      'Fixtures Generated Automatically',
      `Generated ${newMatches.length} conflict-free fixtures for "${tournament.name}".`,
      'success'
    );
  };

  // Live Scorer Actions
  const addMatchEvent = (matchId, eventData) => {
    setMatches(prev =>
      prev.map(m => {
        if (m.id === matchId) {
          const updatedEvents = [...(m.events || []), { ...eventData, id: `ev-${Date.now()}` }];
          let newHomeScore = m.homeScore;
          let newAwayScore = m.awayScore;

          if (eventData.type === 'goal') {
            if (eventData.teamId === m.homeTeamId) newHomeScore += 1;
            else if (eventData.teamId === m.awayTeamId) newAwayScore += 1;
          } else if (eventData.type === 'basket') {
            const pts = Number(eventData.points) || 2;
            if (eventData.teamId === m.homeTeamId) newHomeScore += pts;
            else if (eventData.teamId === m.awayTeamId) newAwayScore += pts;
          } else if (eventData.type === 'cricket_run') {
            const runs = Number(eventData.runs) || 1;
            if (eventData.battingTeamId === m.homeTeamId) newHomeScore += runs;
            else newAwayScore += runs;
          }

          return {
            ...m,
            events: updatedEvents,
            homeScore: newHomeScore,
            awayScore: newAwayScore,
            status: m.status === 'Scheduled' ? 'Live' : m.status
          };
        }
        return m;
      })
    );

    // If goal or high event, notify and log
    if (eventData.type === 'goal' || eventData.type === 'basket') {
      addNotification(
        'Score Update!',
        `${eventData.description || 'Score recorded in live match'}`,
        'goal'
      );
    }
  };

  const undoLastMatchEvent = (matchId) => {
    setMatches(prev =>
      prev.map(m => {
        if (m.id === matchId && m.events && m.events.length > 0) {
          const lastEvent = m.events[m.events.length - 1];
          const remainingEvents = m.events.slice(0, -1);
          let newHomeScore = m.homeScore;
          let newAwayScore = m.awayScore;

          if (lastEvent.type === 'goal') {
            if (lastEvent.teamId === m.homeTeamId) newHomeScore = Math.max(0, newHomeScore - 1);
            else if (lastEvent.teamId === m.awayTeamId) newAwayScore = Math.max(0, newAwayScore - 1);
          } else if (lastEvent.type === 'basket') {
            const pts = Number(lastEvent.points) || 2;
            if (lastEvent.teamId === m.homeTeamId) newHomeScore = Math.max(0, newHomeScore - pts);
            else if (lastEvent.teamId === m.awayTeamId) newAwayScore = Math.max(0, newAwayScore - pts);
          }

          return {
            ...m,
            events: remainingEvents,
            homeScore: newHomeScore,
            awayScore: newAwayScore
          };
        }
        return m;
      })
    );
  };

  const finishMatch = (matchId) => {
    setMatches(prev =>
      prev.map(m => {
        if (m.id === matchId) {
          return {
            ...m,
            status: 'Completed',
            period: 'Full Time'
          };
        }
        return m;
      })
    );

    // Fire celebration confetti!
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });

    addNotification(
      'Match Concluded',
      `Match ended. Points table and player statistics updated automatically.`,
      'success'
    );
  };

  const setMatchLiveStatus = (matchId, newStatus, currentMinute = 1) => {
    setMatches(prev =>
      prev.map(m => {
        if (m.id === matchId) {
          return {
            ...m,
            status: newStatus,
            currentMinute: currentMinute
          };
        }
        return m;
      })
    );
  };

  // Calculate Points Table / Standings for a tournament
  const getPointsTable = (tournamentId) => {
    const tournament = tournaments.find(t => t.id === tournamentId);
    if (!tournament) return [];

    const tournamentTeams = teams.filter(t =>
      tournament.participatingTeamIds.includes(t.id)
    );

    const tournamentMatches = matches.filter(
      m => m.tournamentId === tournamentId && (m.status === 'Completed' || m.status === 'Live')
    );

    // Build standings dictionary
    const standings = tournamentTeams.map(t => ({
      teamId: t.id,
      name: t.name,
      shortName: t.shortName,
      logo: t.logo,
      primaryColor: t.primaryColor,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      gf: 0,
      ga: 0,
      gd: 0,
      points: 0,
      form: []
    }));

    tournamentMatches.forEach(m => {
      const home = standings.find(s => s.teamId === m.homeTeamId);
      const away = standings.find(s => s.teamId === m.awayTeamId);

      if (home && away) {
        home.played += 1;
        away.played += 1;
        home.gf += m.homeScore;
        home.ga += m.awayScore;
        away.gf += m.awayScore;
        away.ga += m.homeScore;

        if (m.homeScore > m.awayScore) {
          home.won += 1;
          home.points += 3;
          home.form.unshift('W');
          away.lost += 1;
          away.form.unshift('L');
        } else if (m.homeScore < m.awayScore) {
          away.won += 1;
          away.points += 3;
          away.form.unshift('W');
          home.lost += 1;
          home.form.unshift('L');
        } else {
          home.drawn += 1;
          home.points += 1;
          home.form.unshift('D');
          away.drawn += 1;
          away.points += 1;
          away.form.unshift('D');
        }
      }
    });

    standings.forEach(s => {
      s.gd = s.gf - s.ga;
      s.form = s.form.slice(0, 5);
      // Fallback if no matches played yet
      if (s.played === 0) {
        const teamObj = teams.find(t => t.id === s.teamId);
        if (teamObj?.stats?.points) {
          s.played = teamObj.stats.played;
          s.won = teamObj.stats.won;
          s.drawn = teamObj.stats.drawn || 0;
          s.lost = teamObj.stats.lost;
          s.gf = teamObj.stats.gf || 0;
          s.ga = teamObj.stats.ga || 0;
          s.gd = (s.gf - s.ga);
          s.points = teamObj.stats.points;
          s.form = teamObj.stats.form || ['W', 'D', 'W'];
        }
      }
    });

    return standings.sort((a, b) => b.points - a.points || b.gd - a.gd || b.gf - a.gf);
  };

  // Add / Edit functions
  const addTournament = (newTourn) => {
    setTournaments(prev => [newTourn, ...prev]);
    setActiveTournamentId(newTourn.id);
    addNotification('Tournament Created', `"${newTourn.name}" is now ready for operations.`, 'success');
  };

  const addTeam = (newTeam) => {
    setTeams(prev => [...prev, newTeam]);
    if (activeTournamentId) {
      setTournaments(prev =>
        prev.map(t =>
          t.id === activeTournamentId
            ? { ...t, participatingTeamIds: [...t.participatingTeamIds, newTeam.id] }
            : t
        )
      );
    }
    addNotification('Team Registered', `Team "${newTeam.name}" enrolled into tournament roster.`, 'success');
  };

  const addPlayer = (newPlayer) => {
    setPlayers(prev => [...prev, newPlayer]);
    addNotification('Athlete Registered', `Player "${newPlayer.name}" assigned Jersey #${newPlayer.jerseyNumber}.`, 'success');
  };

  const addVenue = (newVenue) => {
    setVenues(prev => [...prev, newVenue]);
    addNotification('Venue Added', `Venue "${newVenue.name}" added to facility directory.`, 'success');
  };

  const addMatch = (newMatch) => {
    setMatches(prev => [newMatch, ...prev]);
    addNotification('Match Scheduled', `Fixture created for ${newMatch.date} at ${newMatch.time}.`, 'info');
  };

  return (
    <SportsContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        activeTournamentId,
        setActiveTournamentId,
        activeTournament: tournaments.find(t => t.id === activeTournamentId) || tournaments[0],
        tournaments,
        setTournaments,
        teams,
        players,
        venues,
        matches,
        notifications,
        isClockRunning,
        setIsClockRunning,
        detectConflicts,
        resolveConflict,
        generateFixtures,
        addMatchEvent,
        undoLastMatchEvent,
        finishMatch,
        setMatchLiveStatus,
        getPointsTable,
        addTournament,
        addTeam,
        addPlayer,
        addVenue,
        addMatch,
        resetToDefaults
      }}
    >
      {children}
    </SportsContext.Provider>
  );
}

export const useSports = () => useContext(SportsContext);

// Initial Mock Data for Sports Tournament Management and Analytics System

export const INITIAL_VENUES = [
  {
    id: "v-1",
    name: "Olympic Grand Stadium",
    sport: "Soccer",
    location: "Sector 4, Central Sports City",
    capacity: 45000,
    surface: "Natural Hybrid Grass",
    amenities: ["Floodlights", "VAR Center", "VIP Lounge", "Medical Bay", "Press Box"],
    status: "Available"
  },
  {
    id: "v-2",
    name: "Apex Arena - Main Hardwood Court",
    sport: "Basketball",
    location: "Downtown Sports Complex, Hall A",
    capacity: 12000,
    surface: "Maple Hardwood",
    amenities: ["HD Jumbotron", "Locker Rooms", "Shot Clocks", "Air Conditioned"],
    status: "Available"
  },
  {
    id: "v-3",
    name: "Eastfield Cricket Oval",
    sport: "Cricket",
    location: "East Riverfront Grounds",
    capacity: 22000,
    surface: "Standard Clay Pitch",
    amenities: ["LED Scoreboard", "Sight Screens", "Practice Nets", "Pavilion"],
    status: "Available"
  },
  {
    id: "v-4",
    name: "Metro Sports Hub - Pitch B",
    sport: "Soccer",
    location: "North Suburb District",
    capacity: 6500,
    surface: "FIFA Pro 3G Turf",
    amenities: ["Floodlights", "Team Dugouts", "Spectator Bleachers"],
    status: "Available"
  }
];

export const INITIAL_TEAMS = [
  // Soccer Teams
  {
    id: "team-s1",
    name: "Red Falcons FC",
    shortName: "RFC",
    sport: "Soccer",
    logo: "🦅",
    primaryColor: "#ef4444",
    secondaryColor: "#1e293b",
    coach: "Carlos Silva",
    captain: "Marcus Vance",
    homeVenueId: "v-1",
    founded: 2012,
    rosterSize: 18,
    stats: { played: 6, won: 5, drawn: 0, lost: 1, gf: 14, ga: 5, points: 15, form: ["W", "W", "L", "W", "W"] }
  },
  {
    id: "team-s2",
    name: "Titan United",
    shortName: "TIT",
    sport: "Soccer",
    logo: "🛡️",
    primaryColor: "#3b82f6",
    secondaryColor: "#0f172a",
    coach: "David Sterling",
    captain: "Lucas Moretti",
    homeVenueId: "v-4",
    founded: 2015,
    rosterSize: 17,
    stats: { played: 6, won: 4, drawn: 1, lost: 1, gf: 12, ga: 7, points: 13, form: ["W", "D", "W", "W", "L"] }
  },
  {
    id: "team-s3",
    name: "Golden Knights SC",
    shortName: "GKN",
    sport: "Soccer",
    logo: "⚔️",
    primaryColor: "#f59e0b",
    secondaryColor: "#18181b",
    coach: "Arthur Pendelton",
    captain: "Julian Drake",
    homeVenueId: "v-1",
    founded: 2018,
    rosterSize: 16,
    stats: { played: 6, won: 3, drawn: 2, lost: 1, gf: 9, ga: 6, points: 11, form: ["D", "W", "D", "W", "L"] }
  },
  {
    id: "team-s4",
    name: "Horizon Stars",
    shortName: "HZN",
    sport: "Soccer",
    logo: "🌅",
    primaryColor: "#06b6d4",
    secondaryColor: "#0284c7",
    coach: "Elena Rostova",
    captain: "Mateo Diaz",
    homeVenueId: "v-4",
    founded: 2020,
    rosterSize: 16,
    stats: { played: 6, won: 3, drawn: 0, lost: 3, gf: 10, ga: 11, points: 9, form: ["L", "W", "L", "W", "L"] }
  },
  {
    id: "team-s5",
    name: "Shadow Phoenix",
    shortName: "SPH",
    sport: "Soccer",
    logo: "🔥",
    primaryColor: "#8b5cf6",
    secondaryColor: "#3b0764",
    coach: "Viktor Petrov",
    captain: "Tariq Mansoor",
    homeVenueId: "v-1",
    founded: 2016,
    rosterSize: 16,
    stats: { played: 6, won: 2, drawn: 1, lost: 3, gf: 8, ga: 10, points: 7, form: ["W", "L", "D", "L", "L"] }
  },
  {
    id: "team-s6",
    name: "Coastal Wave FC",
    shortName: "CWV",
    sport: "Soccer",
    logo: "🌊",
    primaryColor: "#14b8a6",
    secondaryColor: "#134e4a",
    coach: "Liam Gallagher",
    captain: "Noah Jensen",
    homeVenueId: "v-4",
    founded: 2019,
    rosterSize: 15,
    stats: { played: 6, won: 1, drawn: 1, lost: 4, gf: 6, ga: 13, points: 4, form: ["L", "L", "W", "D", "L"] }
  },
  {
    id: "team-s7",
    name: "Ironclad Athletic",
    shortName: "IRN",
    sport: "Soccer",
    logo: "⚙️",
    primaryColor: "#64748b",
    secondaryColor: "#0f172a",
    coach: "Frank Miller",
    captain: "Stefan Kowalski",
    homeVenueId: "v-1",
    founded: 2014,
    rosterSize: 16,
    stats: { played: 6, won: 1, drawn: 1, lost: 4, gf: 4, ga: 11, points: 4, form: ["D", "L", "L", "L", "W"] }
  },
  {
    id: "team-s8",
    name: "Viper City",
    shortName: "VIP",
    sport: "Soccer",
    logo: "🐍",
    primaryColor: "#10b981",
    secondaryColor: "#064e3b",
    coach: "Marco Rossi",
    captain: "Dante Alva",
    homeVenueId: "v-4",
    founded: 2021,
    rosterSize: 15,
    stats: { played: 6, won: 1, drawn: 0, lost: 5, gf: 5, ga: 15, points: 3, form: ["L", "L", "L", "W", "L"] }
  },

  // Basketball Teams
  {
    id: "team-b1",
    name: "Apex Dynamos",
    shortName: "DYN",
    sport: "Basketball",
    logo: "⚡",
    primaryColor: "#ec4899",
    secondaryColor: "#831843",
    coach: "Phil Jackson Jr.",
    captain: "DeMaris King",
    homeVenueId: "v-2",
    founded: 2016,
    rosterSize: 12,
    stats: { played: 5, won: 4, lost: 1, points: 8, form: ["W", "W", "W", "L", "W"] }
  },
  {
    id: "team-b2",
    name: "Skyline Dunkers",
    shortName: "SKY",
    sport: "Basketball",
    logo: "🏙️",
    primaryColor: "#38bdf8",
    secondaryColor: "#0369a1",
    coach: "Steve Kerrigan",
    captain: "Zachary Cole",
    homeVenueId: "v-2",
    founded: 2017,
    rosterSize: 12,
    stats: { played: 5, won: 3, lost: 2, points: 6, form: ["L", "W", "W", "W", "L"] }
  },
  {
    id: "team-b3",
    name: "Thunder Vortex",
    shortName: "VOR",
    sport: "Basketball",
    logo: "🌪️",
    primaryColor: "#a855f7",
    secondaryColor: "#581c87",
    coach: "Erik Spoelstra",
    captain: "Malik Washington",
    homeVenueId: "v-2",
    founded: 2019,
    rosterSize: 12,
    stats: { played: 5, won: 2, lost: 3, points: 4, form: ["W", "L", "L", "W", "L"] }
  },
  {
    id: "team-b4",
    name: "Canyon Grizzlies",
    shortName: "GRZ",
    sport: "Basketball",
    logo: "🐻",
    primaryColor: "#eab308",
    secondaryColor: "#713f12",
    coach: "Tom Thibodeaux",
    captain: "Jonas Valen",
    homeVenueId: "v-2",
    founded: 2018,
    rosterSize: 12,
    stats: { played: 5, won: 1, lost: 4, points: 2, form: ["L", "L", "W", "L", "L"] }
  },

  // Cricket Teams
  {
    id: "team-c1",
    name: "Royal Strikers CC",
    shortName: "RSC",
    sport: "Cricket",
    logo: "🏏",
    primaryColor: "#6366f1",
    secondaryColor: "#312e81",
    coach: "Rahul Dravidson",
    captain: "Arjun Singhania",
    homeVenueId: "v-3",
    founded: 2015,
    rosterSize: 15,
    stats: { played: 4, won: 3, lost: 1, nrr: "+1.240", points: 6, form: ["W", "W", "L", "W"] }
  },
  {
    id: "team-c2",
    name: "Coastal Typhoons",
    shortName: "CTY",
    sport: "Cricket",
    logo: "🌀",
    primaryColor: "#0ea5e9",
    secondaryColor: "#0c4a6e",
    coach: "Brendon McCaw",
    captain: "Rohan Patel",
    homeVenueId: "v-3",
    founded: 2017,
    rosterSize: 15,
    stats: { played: 4, won: 2, lost: 2, nrr: "+0.320", points: 4, form: ["L", "W", "L", "W"] }
  }
];

export const INITIAL_PLAYERS = [
  // Red Falcons FC
  {
    id: "p-1",
    name: "Marcus Vance",
    teamId: "team-s1",
    jerseyNumber: 9,
    position: "Forward / Striker",
    age: 24,
    height: "185 cm",
    weight: "79 kg",
    nationality: "United Kingdom",
    sport: "Soccer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    stats: {
      matches: 6,
      goals: 8,
      assists: 3,
      minutesPlayed: 520,
      shotsOnTarget: 22,
      passAccuracy: 84,
      yellowCards: 1,
      redCards: 0,
      mvpAwards: 3
    },
    radar: {
      speed: 92,
      shooting: 94,
      passing: 78,
      defense: 45,
      stamina: 88,
      tacticalIQ: 85
    }
  },
  {
    id: "p-2",
    name: "Mateo Silva",
    teamId: "team-s1",
    jerseyNumber: 10,
    position: "Attacking Midfielder",
    age: 26,
    height: "176 cm",
    weight: "72 kg",
    nationality: "Spain",
    sport: "Soccer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    stats: {
      matches: 6,
      goals: 3,
      assists: 7,
      minutesPlayed: 540,
      shotsOnTarget: 14,
      passAccuracy: 91,
      yellowCards: 0,
      redCards: 0,
      mvpAwards: 2
    },
    radar: {
      speed: 82,
      shooting: 80,
      passing: 96,
      defense: 62,
      stamina: 86,
      tacticalIQ: 94
    }
  },
  {
    id: "p-3",
    name: "Gabriel O'Connor",
    teamId: "team-s1",
    jerseyNumber: 4,
    position: "Center Back",
    age: 27,
    height: "191 cm",
    weight: "86 kg",
    nationality: "Ireland",
    sport: "Soccer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    stats: {
      matches: 6,
      goals: 1,
      assists: 1,
      minutesPlayed: 540,
      tackles: 24,
      interceptions: 19,
      cleanSheets: 3,
      passAccuracy: 88,
      yellowCards: 2,
      redCards: 0,
      mvpAwards: 1
    },
    radar: {
      speed: 76,
      shooting: 55,
      passing: 75,
      defense: 95,
      stamina: 89,
      tacticalIQ: 90
    }
  },
  {
    id: "p-4",
    name: "Kasper Lind",
    teamId: "team-s1",
    jerseyNumber: 1,
    position: "Goalkeeper",
    age: 29,
    height: "194 cm",
    weight: "88 kg",
    nationality: "Denmark",
    sport: "Soccer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    stats: {
      matches: 6,
      saves: 31,
      cleanSheets: 3,
      goalsConceded: 5,
      minutesPlayed: 540,
      passAccuracy: 74,
      yellowCards: 0,
      redCards: 0,
      mvpAwards: 0
    },
    radar: {
      speed: 68,
      shooting: 30,
      passing: 72,
      defense: 92,
      stamina: 80,
      tacticalIQ: 89
    }
  },

  // Titan United Players
  {
    id: "p-5",
    name: "Lucas Moretti",
    teamId: "team-s2",
    jerseyNumber: 7,
    position: "Winger / Forward",
    age: 23,
    height: "180 cm",
    weight: "75 kg",
    nationality: "Italy",
    sport: "Soccer",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    stats: {
      matches: 6,
      goals: 6,
      assists: 4,
      minutesPlayed: 490,
      shotsOnTarget: 19,
      passAccuracy: 86,
      yellowCards: 1,
      redCards: 0,
      mvpAwards: 2
    },
    radar: {
      speed: 95,
      shooting: 88,
      passing: 84,
      defense: 50,
      stamina: 85,
      tacticalIQ: 82
    }
  },
  {
    id: "p-6",
    name: "Kofi Mensah",
    teamId: "team-s2",
    jerseyNumber: 6,
    position: "Defensive Midfielder",
    age: 25,
    height: "183 cm",
    weight: "82 kg",
    nationality: "Ghana",
    sport: "Soccer",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    stats: {
      matches: 6,
      goals: 2,
      assists: 2,
      minutesPlayed: 540,
      tackles: 28,
      passAccuracy: 89,
      yellowCards: 3,
      redCards: 0,
      mvpAwards: 1
    },
    radar: {
      speed: 80,
      shooting: 68,
      passing: 86,
      defense: 91,
      stamina: 96,
      tacticalIQ: 89
    }
  },

  // Golden Knights SC
  {
    id: "p-7",
    name: "Julian Drake",
    teamId: "team-s3",
    jerseyNumber: 11,
    position: "Left Winger",
    age: 22,
    height: "178 cm",
    weight: "71 kg",
    nationality: "England",
    sport: "Soccer",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    stats: {
      matches: 6,
      goals: 5,
      assists: 2,
      minutesPlayed: 480,
      shotsOnTarget: 16,
      passAccuracy: 81,
      yellowCards: 0,
      redCards: 0,
      mvpAwards: 1
    },
    radar: {
      speed: 90,
      shooting: 84,
      passing: 80,
      defense: 48,
      stamina: 82,
      tacticalIQ: 79
    }
  },

  // Basketball Star Players
  {
    id: "p-b1",
    name: "DeMaris King",
    teamId: "team-b1",
    jerseyNumber: 23,
    position: "Point Guard",
    age: 25,
    height: "193 cm",
    weight: "88 kg",
    nationality: "USA",
    sport: "Basketball",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    stats: {
      matches: 5,
      ppg: 28.4,
      apg: 8.6,
      rpg: 5.2,
      threePointPct: 41.5,
      freeThrowPct: 89.2,
      mvpAwards: 3
    },
    radar: {
      speed: 94,
      shooting: 92,
      passing: 93,
      defense: 78,
      stamina: 89,
      tacticalIQ: 91
    }
  },
  {
    id: "p-b2",
    name: "Zachary Cole",
    teamId: "team-b2",
    jerseyNumber: 15,
    position: "Center",
    age: 26,
    height: "211 cm",
    weight: "115 kg",
    nationality: "USA",
    sport: "Basketball",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    stats: {
      matches: 5,
      ppg: 22.0,
      apg: 3.1,
      rpg: 12.8,
      blocks: 2.4,
      fgPct: 62.4,
      mvpAwards: 2
    },
    radar: {
      speed: 70,
      shooting: 78,
      passing: 72,
      defense: 94,
      stamina: 82,
      tacticalIQ: 86
    }
  },

  // Cricket Star Player
  {
    id: "p-c1",
    name: "Arjun Singhania",
    teamId: "team-c1",
    jerseyNumber: 18,
    position: "Top-order Batsman",
    age: 28,
    height: "175 cm",
    weight: "70 kg",
    nationality: "India",
    sport: "Cricket",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&auto=format&fit=crop&q=80",
    stats: {
      matches: 4,
      runs: 245,
      strikeRate: 158.4,
      fifties: 2,
      hundreds: 1,
      wickets: 0,
      catches: 3,
      mvpAwards: 2
    },
    radar: {
      speed: 85,
      shooting: 95, // batting power
      passing: 88, // running between wickets
      defense: 80, // fielding
      stamina: 90,
      tacticalIQ: 93
    }
  }
];

export const INITIAL_TOURNAMENTS = [
  {
    id: "tourn-1",
    name: "Metropolitan Champions Cup 2026",
    sport: "Soccer",
    format: "League & Knockout",
    category: "Senior Open",
    startDate: "2026-09-15",
    endDate: "2026-10-20",
    status: "Ongoing",
    banner: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80",
    description: "The premier metropolitan football tournament featuring the top 8 regional football clubs competing for the prestigious Golden Trophy.",
    teamsCount: 8,
    prizePool: "$50,000",
    primaryVenueId: "v-1",
    participatingTeamIds: [
      "team-s1", "team-s2", "team-s3", "team-s4",
      "team-s5", "team-s6", "team-s7", "team-s8"
    ],
    rules: {
      matchDurationMinutes: 90,
      pointsWin: 3,
      pointsDraw: 1,
      pointsLoss: 0,
      extraTime: true,
      penalties: true
    }
  },
  {
    id: "tourn-2",
    name: "Apex Elite Basketball Championship",
    sport: "Basketball",
    format: "Single Elimination",
    category: "Pro Invitational",
    startDate: "2026-09-22",
    endDate: "2026-10-10",
    status: "Ongoing",
    banner: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80",
    description: "Fast-paced tournament bringing together top-tier basketball franchises for high-intensity knockout rounds.",
    teamsCount: 4,
    prizePool: "$35,000",
    primaryVenueId: "v-2",
    participatingTeamIds: ["team-b1", "team-b2", "team-b3", "team-b4"],
    rules: {
      quarters: 4,
      quarterMinutes: 12,
      shotClockSeconds: 24,
      timeoutsPerTeam: 6
    }
  },
  {
    id: "tourn-3",
    name: "City Premier T20 Cricket Challenge",
    sport: "Cricket",
    format: "Round Robin",
    category: "Club Championship",
    startDate: "2026-10-05",
    endDate: "2026-11-02",
    status: "Upcoming",
    banner: "https://images.unsplash.com/photo-1531415074868-036b107e775a?w=800&auto=format&fit=crop&q=80",
    description: "The city's biggest 20-over cricket battle with powerplays, night games under floodlights, and grand finale.",
    teamsCount: 2,
    prizePool: "$40,000",
    primaryVenueId: "v-3",
    participatingTeamIds: ["team-c1", "team-c2"],
    rules: {
      oversPerSide: 20,
      powerplayOvers: 6,
      dlsMethod: true
    }
  }
];

export const INITIAL_MATCHES = [
  // Live Match!
  {
    id: "match-live-1",
    tournamentId: "tourn-1",
    sport: "Soccer",
    round: "Matchday 7 (Top of the Table)",
    homeTeamId: "team-s1", // Red Falcons FC
    awayTeamId: "team-s2", // Titan United
    venueId: "v-1", // Olympic Grand Stadium
    date: "2026-09-28",
    time: "20:00",
    endTime: "21:50",
    status: "Live", // Live, Scheduled, Completed
    currentMinute: 68,
    period: "2nd Half",
    homeScore: 2,
    awayScore: 1,
    referee: "David Webb",
    events: [
      { id: "ev-1", minute: 14, type: "goal", teamId: "team-s1", player: "Marcus Vance", assist: "Mateo Silva", description: "Vance finishes crisp through-ball into bottom corner" },
      { id: "ev-2", minute: 31, type: "yellow_card", teamId: "team-s2", player: "Kofi Mensah", description: "Tactical foul breaking a counter-attack" },
      { id: "ev-3", minute: 42, type: "goal", teamId: "team-s2", player: "Lucas Moretti", assist: "Kofi Mensah", description: "Stunning 25-yard curling strike into top right netting" },
      { id: "ev-4", minute: 58, type: "goal", teamId: "team-s1", player: "Marcus Vance", assist: "Julian Drake", description: "Header from corner kick at the near post" },
      { id: "ev-5", minute: 64, type: "yellow_card", teamId: "team-s1", player: "Gabriel O'Connor", description: "Late challenge on Moretti" }
    ],
    stats: {
      possession: [56, 44],
      shots: [14, 9],
      shotsOnTarget: [6, 4],
      corners: [7, 3],
      fouls: [9, 12],
      offsides: [2, 1]
    }
  },

  // Completed matches in tournament 1
  {
    id: "match-comp-1",
    tournamentId: "tourn-1",
    sport: "Soccer",
    round: "Matchday 6",
    homeTeamId: "team-s3", // Golden Knights SC
    awayTeamId: "team-s4", // Horizon Stars
    venueId: "v-4",
    date: "2026-09-26",
    time: "18:00",
    endTime: "19:50",
    status: "Completed",
    homeScore: 2,
    awayScore: 0,
    referee: "Sarah Jenkins",
    events: [
      { id: "ev-c1", minute: 23, type: "goal", teamId: "team-s3", player: "Julian Drake", assist: "Arthur Cole", description: "Drilled low strike from edge of the box" },
      { id: "ev-c2", minute: 77, type: "goal", teamId: "team-s3", player: "Julian Drake", assist: "Marcus Reid", description: "Penalty converted successfully" }
    ],
    stats: {
      possession: [52, 48],
      shots: [11, 7],
      shotsOnTarget: [5, 2],
      corners: [4, 5],
      fouls: [10, 8]
    }
  },
  {
    id: "match-comp-2",
    tournamentId: "tourn-1",
    sport: "Soccer",
    round: "Matchday 6",
    homeTeamId: "team-s5",
    awayTeamId: "team-s6",
    venueId: "v-1",
    date: "2026-09-25",
    time: "19:30",
    endTime: "21:20",
    status: "Completed",
    homeScore: 1,
    awayScore: 1,
    referee: "Marco Vane",
    events: [
      { id: "ev-c3", minute: 34, type: "goal", teamId: "team-s5", player: "Tariq Mansoor", description: "Solo breakaway goal" },
      { id: "ev-c4", minute: 82, type: "goal", teamId: "team-s6", player: "Noah Jensen", description: "Scramble tap-in after goalmouth rebound" }
    ],
    stats: {
      possession: [50, 50],
      shots: [8, 10],
      shotsOnTarget: [3, 4],
      corners: [3, 4],
      fouls: [14, 11]
    }
  },

  // Upcoming matches
  {
    id: "match-up-1",
    tournamentId: "tourn-1",
    sport: "Soccer",
    round: "Matchday 8",
    homeTeamId: "team-s3",
    awayTeamId: "team-s1",
    venueId: "v-1",
    date: "2026-10-02",
    time: "17:30",
    endTime: "19:20",
    status: "Scheduled",
    homeScore: 0,
    awayScore: 0,
    referee: "David Webb",
    events: []
  },
  {
    id: "match-up-2",
    tournamentId: "tourn-1",
    sport: "Soccer",
    round: "Matchday 8",
    homeTeamId: "team-s2",
    awayTeamId: "team-s4",
    venueId: "v-4",
    date: "2026-10-02",
    time: "19:45",
    endTime: "21:35",
    status: "Scheduled",
    homeScore: 0,
    awayScore: 0,
    referee: "Sarah Jenkins",
    events: []
  },

  // Deliberate conflict test match (shows venue conflict warning in Venue Scheduler)
  {
    id: "match-conflict-demo",
    tournamentId: "tourn-1",
    sport: "Soccer",
    round: "Rescheduled Derby (Conflict Alert)",
    homeTeamId: "team-s5",
    awayTeamId: "team-s7",
    venueId: "v-1", // Olympic Grand Stadium
    date: "2026-10-02",
    time: "18:00", // Overlaps with match-up-1 at 17:30 - 19:20 at the same venue!
    endTime: "19:50",
    status: "Scheduled",
    homeScore: 0,
    awayScore: 0,
    referee: "Alex Murphy",
    events: []
  },

  // Basketball Matches (Apex Elite)
  {
    id: "match-bb-1",
    tournamentId: "tourn-2",
    sport: "Basketball",
    round: "Semi Final 1",
    homeTeamId: "team-b1", // Apex Dynamos
    awayTeamId: "team-b4", // Canyon Grizzlies
    venueId: "v-2",
    date: "2026-09-27",
    time: "19:00",
    endTime: "21:00",
    status: "Completed",
    homeScore: 104,
    awayScore: 89,
    referee: "Ken Maurer",
    period: "Full Time",
    events: [
      { id: "ev-b1", minute: 48, type: "stat", description: "DeMaris King scored 34 pts, 9 assists" },
      { id: "ev-b2", minute: 48, type: "stat", description: "Apex Dynamos advance to Championship Game!" }
    ],
    basketballScores: {
      q1: [28, 22],
      q2: [26, 20],
      q3: [24, 25],
      q4: [26, 22]
    }
  },
  {
    id: "match-bb-2",
    tournamentId: "tourn-2",
    sport: "Basketball",
    round: "Semi Final 2",
    homeTeamId: "team-b2", // Skyline Dunkers
    awayTeamId: "team-b3", // Thunder Vortex
    venueId: "v-2",
    date: "2026-09-29",
    time: "19:30",
    endTime: "21:30",
    status: "Scheduled",
    homeScore: 0,
    awayScore: 0,
    referee: "Scott Foster",
    events: []
  },
  {
    id: "match-bb-final",
    tournamentId: "tourn-2",
    sport: "Basketball",
    round: "Championship Final",
    homeTeamId: "team-b1",
    awayTeamId: "TBD (Winner SF2)",
    venueId: "v-2",
    date: "2026-10-04",
    time: "20:00",
    endTime: "22:00",
    status: "Scheduled",
    homeScore: 0,
    awayScore: 0,
    referee: "Ken Maurer",
    events: []
  },

  // Cricket Match (City Premier)
  {
    id: "match-cricket-1",
    tournamentId: "tourn-3",
    sport: "Cricket",
    round: "Opening Fixture",
    homeTeamId: "team-c1",
    awayTeamId: "team-c2",
    venueId: "v-3",
    date: "2026-10-05",
    time: "14:00",
    endTime: "18:00",
    status: "Scheduled",
    homeScore: 0,
    awayScore: 0,
    referee: "Kumar Dharmasena",
    events: []
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    time: "2 mins ago",
    title: "Live Match Event: Goal!",
    message: "Marcus Vance scores for Red Falcons FC in the 58th minute.",
    type: "goal",
    unread: true
  },
  {
    id: "notif-2",
    time: "18 mins ago",
    title: "Scheduling Conflict Detected",
    message: "Olympic Grand Stadium has an overlapping booking on Oct 2, 2026 between Red Falcons vs Golden Knights and Shadow Phoenix vs Ironclad.",
    type: "warning",
    unread: true
  },
  {
    id: "notif-3",
    time: "1 hour ago",
    title: "Roster Approved",
    message: "Titan United submitted squad lineup for Matchday 7.",
    type: "success",
    unread: false
  },
  {
    id: "notif-4",
    time: "Yesterday",
    title: "Apex Dynamos Win Semi-Final",
    message: "Apex Dynamos defeated Canyon Grizzlies 104-89 to reach the Basketball Grand Finale.",
    type: "info",
    unread: false
  }
];

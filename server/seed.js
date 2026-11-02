import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { Tournament } from './models/Tournament.js';
import { Team } from './models/Team.js';
import { Player } from './models/Player.js';
import { Match } from './models/Match.js';
import { Venue } from './models/Venue.js';

dotenv.config();

const INITIAL_VENUES = [
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
  }
];

const INITIAL_TOURNAMENTS = [
  {
    id: "tourn-1",
    name: "Metropolitan Champions Cup 2026",
    sport: "Soccer",
    format: "League & Knockout",
    category: "Senior Open",
    startDate: "2026-09-15",
    endDate: "2026-10-20",
    status: "Ongoing",
    description: "The premier metropolitan football tournament featuring the top 8 regional clubs.",
    teamsCount: 8,
    prizePool: "$50,000",
    primaryVenueId: "v-1",
    participatingTeamIds: ["team-s1", "team-s2", "team-s3", "team-s4"]
  }
];

async function seedData() {
  const connected = await connectDB();
  if (!connected) {
    console.log("Could not connect to MongoDB for seeding.");
    process.exit(1);
  }

  try {
    console.log("Clearing existing collections...");
    await Tournament.deleteMany({});
    await Venue.deleteMany({});

    console.log("Inserting initial mock collections...");
    await Tournament.insertMany(INITIAL_TOURNAMENTS);
    await Venue.insertMany(INITIAL_VENUES);

    console.log("✅ MongoDB successfully seeded with initial tournament records!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seedData();

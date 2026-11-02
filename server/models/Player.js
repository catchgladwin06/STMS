import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    name: { type: String, required: true },
    teamId: { type: String, required: true },
    jerseyNumber: { type: Number, required: true },
    position: { type: String, required: true },
    age: { type: Number, default: 22 },
    height: { type: String, default: '180 cm' },
    weight: { type: String, default: '75 kg' },
    nationality: { type: String, default: 'International' },
    sport: { type: String, default: 'Soccer' },
    avatar: { type: String },
    stats: {
      matches: { type: Number, default: 0 },
      goals: { type: Number, default: 0 },
      assists: { type: Number, default: 0 },
      minutesPlayed: { type: Number, default: 0 },
      passAccuracy: { type: Number, default: 80 },
      yellowCards: { type: Number, default: 0 },
      redCards: { type: Number, default: 0 },
      mvpAwards: { type: Number, default: 0 },
      ppg: { type: Number, default: 0 },
      runs: { type: Number, default: 0 }
    },
    radar: {
      speed: { type: Number, default: 80 },
      shooting: { type: Number, default: 80 },
      passing: { type: Number, default: 80 },
      defense: { type: Number, default: 70 },
      stamina: { type: Number, default: 85 },
      tacticalIQ: { type: Number, default: 80 }
    }
  },
  { timestamps: true }
);

export const Player = mongoose.models.Player || mongoose.model('Player', playerSchema);

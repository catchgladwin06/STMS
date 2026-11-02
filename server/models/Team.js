import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    sport: { type: String, required: true },
    logo: { type: String, default: '🛡️' },
    primaryColor: { type: String, default: '#ef4444' },
    secondaryColor: { type: String, default: '#1e293b' },
    coach: { type: String, default: 'Head Coach' },
    captain: { type: String, default: 'Captain' },
    homeVenueId: { type: String },
    founded: { type: Number, default: 2020 },
    rosterSize: { type: Number, default: 16 },
    stats: {
      played: { type: Number, default: 0 },
      won: { type: Number, default: 0 },
      drawn: { type: Number, default: 0 },
      lost: { type: Number, default: 0 },
      gf: { type: Number, default: 0 },
      ga: { type: Number, default: 0 },
      points: { type: Number, default: 0 },
      form: [{ type: String }]
    }
  },
  { timestamps: true }
);

export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);

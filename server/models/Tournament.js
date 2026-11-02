import mongoose from 'mongoose';

const tournamentSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    name: { type: String, required: true },
    sport: { type: String, required: true, enum: ['Soccer', 'Basketball', 'Cricket', 'Tennis'] },
    format: { type: String, required: true }, // Round Robin, Single Elimination, League & Knockout
    category: { type: String, default: 'Open Championship' },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    status: { type: String, enum: ['Upcoming', 'Ongoing', 'Completed'], default: 'Upcoming' },
    banner: { type: String },
    description: { type: String },
    prizePool: { type: String, default: '$25,000' },
    primaryVenueId: { type: String },
    participatingTeamIds: [{ type: String }],
    rules: {
      matchDurationMinutes: { type: Number, default: 90 },
      pointsWin: { type: Number, default: 3 },
      pointsDraw: { type: Number, default: 1 },
      pointsLoss: { type: Number, default: 0 },
      extraTime: { type: Boolean, default: true },
      penalties: { type: Boolean, default: true }
    }
  },
  { timestamps: true }
);

export const Tournament = mongoose.models.Tournament || mongoose.model('Tournament', tournamentSchema);

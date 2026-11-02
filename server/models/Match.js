import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    tournamentId: { type: String, required: true },
    sport: { type: String, required: true },
    round: { type: String, default: 'Matchday' },
    homeTeamId: { type: String, required: true },
    awayTeamId: { type: String, required: true },
    venueId: { type: String },
    date: { type: String, required: true },
    time: { type: String, required: true },
    endTime: { type: String },
    status: { type: String, enum: ['Scheduled', 'Live', 'Completed'], default: 'Scheduled' },
    currentMinute: { type: Number, default: 0 },
    period: { type: String, default: '1st Half' },
    homeScore: { type: Number, default: 0 },
    awayScore: { type: Number, default: 0 },
    referee: { type: String, default: 'Official Scorer' },
    events: [
      {
        id: { type: String },
        minute: { type: Number },
        type: { type: String },
        teamId: { type: String },
        player: { type: String },
        assist: { type: String },
        description: { type: String }
      }
    ]
  },
  { timestamps: true }
);

export const Match = mongoose.models.Match || mongoose.model('Match', matchSchema);

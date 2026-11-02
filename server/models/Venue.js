import mongoose from 'mongoose';

const venueSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    name: { type: String, required: true },
    sport: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, default: 5000 },
    surface: { type: String, default: 'Standard' },
    amenities: [{ type: String }],
    status: { type: String, default: 'Available' }
  },
  { timestamps: true }
);

export const Venue = mongoose.models.Venue || mongoose.model('Venue', venueSchema);

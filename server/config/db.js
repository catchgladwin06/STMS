import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sports_tournament_db';
    console.log(`Connecting to MongoDB at: ${mongoURI}...`);
    
    // Connect with a reasonable timeout so server can still serve if MongoDB isn't running locally
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 4000
    });

    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ Warning: MongoDB connection failed (${error.message}).`);
    console.warn(`Server will operate with built-in in-memory fallback store so APIs remain 100% functional.`);
    return false;
  }
};

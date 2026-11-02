import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Healthcheck Route
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    server: 'Sports Tournament Management & Analytics API',
    stack: 'MERN (MongoDB, Express, React, Node.js)',
    timestamp: new Date().toISOString()
  });
});

// Start Server and Connect DB
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 SportNexus Backend Server running on port ${PORT}`);
    console.log(`🔗 API Base: http://localhost:${PORT}/api`);
    console.log(`🩺 Healthcheck: http://localhost:${PORT}/health`);
  });
}

startServer();

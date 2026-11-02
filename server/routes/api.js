import express from 'express';
import mongoose from 'mongoose';
import { Tournament } from '../models/Tournament.js';
import { Team } from '../models/Team.js';
import { Player } from '../models/Player.js';
import { Match } from '../models/Match.js';
import { Venue } from '../models/Venue.js';

const router = express.Router();

// Helper to check if MongoDB is connected
const isDbConnected = () => mongoose.connection.readyState === 1;

// --- TOURNAMENTS ---
router.get('/tournaments', async (req, res) => {
  try {
    if (isDbConnected()) {
      const tournaments = await Tournament.find().sort({ createdAt: -1 });
      return res.json(tournaments);
    }
    res.json([]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/tournaments', async (req, res) => {
  try {
    if (isDbConnected()) {
      const tournament = new Tournament(req.body);
      await tournament.save();
      return res.status(201).json(tournament);
    }
    res.status(201).json({ ...req.body, id: req.body.id || `tourn-${Date.now()}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- TEAMS ---
router.get('/teams', async (req, res) => {
  try {
    if (isDbConnected()) {
      const teams = await Team.find();
      return res.json(teams);
    }
    res.json([]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/teams', async (req, res) => {
  try {
    if (isDbConnected()) {
      const team = new Team(req.body);
      await team.save();
      return res.status(201).json(team);
    }
    res.status(201).json({ ...req.body, id: req.body.id || `team-${Date.now()}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- PLAYERS ---
router.get('/players', async (req, res) => {
  try {
    if (isDbConnected()) {
      const filter = req.query.teamId ? { teamId: req.query.teamId } : {};
      const players = await Player.find(filter);
      return res.json(players);
    }
    res.json([]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/players', async (req, res) => {
  try {
    if (isDbConnected()) {
      const player = new Player(req.body);
      await player.save();
      return res.status(201).json(player);
    }
    res.status(201).json({ ...req.body, id: req.body.id || `p-${Date.now()}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- MATCHES ---
router.get('/matches', async (req, res) => {
  try {
    if (isDbConnected()) {
      const filter = req.query.tournamentId ? { tournamentId: req.query.tournamentId } : {};
      const matches = await Match.find(filter).sort({ date: 1, time: 1 });
      return res.json(matches);
    }
    res.json([]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/matches', async (req, res) => {
  try {
    if (isDbConnected()) {
      const match = new Match(req.body);
      await match.save();
      return res.status(201).json(match);
    }
    res.status(201).json({ ...req.body, id: req.body.id || `match-${Date.now()}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Record Live Event / Score Update
router.put('/matches/:id/event', async (req, res) => {
  try {
    const { id } = req.params;
    const { event, homeScore, awayScore, status, currentMinute } = req.body;

    if (isDbConnected()) {
      const match = await Match.findOne({ id });
      if (!match) return res.status(404).json({ error: 'Match not found' });

      if (event) match.events.push(event);
      if (homeScore !== undefined) match.homeScore = homeScore;
      if (awayScore !== undefined) match.awayScore = awayScore;
      if (status) match.status = status;
      if (currentMinute !== undefined) match.currentMinute = currentMinute;

      await match.save();
      return res.json(match);
    }
    res.json({ id, ...req.body });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- VENUES ---
router.get('/venues', async (req, res) => {
  try {
    if (isDbConnected()) {
      const venues = await Venue.find();
      return res.json(venues);
    }
    res.json([]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/venues', async (req, res) => {
  try {
    if (isDbConnected()) {
      const venue = new Venue(req.body);
      await venue.save();
      return res.status(201).json(venue);
    }
    res.status(201).json({ ...req.body, id: req.body.id || `v-${Date.now()}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;

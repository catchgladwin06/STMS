# 🏆 Sports Tournament Management & Analytics System (SportNexus)
### Complete Full-Stack MERN Application (MongoDB, Express, React, Node.js)

> **Centralized Platform for Tournament Operations, Fixture Generation, Conflict-Free Venue Scheduling, Live Scoring, and Athlete Performance Analytics.**
>
> *Designed and developed according to the Final Review Document (FRD) and Zeroth Review specifications.*

---

## 💡 Tech Stack: Genuine MERN Stack

This project is built from the ground up as a complete **MERN Stack** application:

| Layer | Technology | Role in System |
|---|---|---|
| **M - Database** | **MongoDB & Mongoose** | Document models for `Tournaments`, `Teams`, `Players` (with biometric radars), `Matches` (with live scoring event arrays), and `Venues`. |
| **E - Backend API** | **Express.js** | RESTful routing for tournaments, teams, athletes, automated conflict checks, live scorekeeper event recording, and healthchecks. |
| **R - Frontend UI** | **React 19 & Tailwind CSS** | Real-time interactive UI with Live Scorer console, visual bracket diagrams, dynamic points tables, radar charts, and print reports. |
| **N - Runtime** | **Node.js** | JavaScript runtime powering both the API server and Vite client build pipeline. |

*(Note: The system features resilient offline fallback. If MongoDB is not yet installed or running on a demonstration machine, the application automatically handles data gracefully so presentations never crash!)*

---

## 🎯 Key Modules & Features

### 1. 🛡️ Centralized Tournament Management
- Multi-sport support: **Soccer / Football**, **Basketball**, **Cricket**, with flexible rule configurations.
- Tournament formats:
  - **Round Robin League** (Berger algorithm draw generation)
  - **Single Elimination Knockout** (Automated seeded bracket tree)
  - **Group Stage + Knockout**
- Lifecycle tracking: `Upcoming`, `Ongoing (In Play)`, `Completed`.

### 2. 📅 Automated Fixture & Bracket Engine
- **1-Click Draw Generator:** Instantly schedules all matches across available facilities and days without manual pairings.
- **Interactive Knockout Bracket Visualizer:** Tree hierarchy connecting Quarter-Finals, Semi-Finals, and Championship Final with live seed progression.
- **Dynamic Standings / Points Table:** Real-time auto-calculation of Played, Won, Drawn, Lost, Goals For (GF), Goals Against (GA), Goal Difference (GD), Points (PTS), and 5-match recent form indicators (`W-D-L`).

### 3. 🏟️ Smart Venue Scheduling & Conflict Resolution Engine
- Centralized registry of sporting grounds, courts, surfaces, lighting, and spectator capacities.
- **Real-Time Overlap Detection:** Scans all fixtures to detect:
  - *Venue Double-Booking:* Two matches sharing the same pitch in overlapping time windows.
  - *Team Overlap:* The same team fixtured in concurrent or non-compliant time slots.
- **1-Click Auto-Resolver:** Reallocates conflicting matches to alternative compliant venues or shifts kick-off times with a single click.

### 4. 🔴 Live Digital Scorer Console
- Official scorekeeper dashboard with real-time match clock control (Start, Pause, +1 Min Advance, Period transitions).
- Sport-specific action controls:
  - **Soccer:** Goals (+ Scorer & Assist attribution), Yellow Cards, Red Cards, Corner Kicks, Fouls.
  - **Basketball:** +1 FT, +2 FG, +3 3-Pointer, Timeouts, Fouls.
  - **Cricket:** 1, 2, 3, 4, 6 runs, Wickets, Overs, Commentary.
- **Live Event Feed & Commentary:** Timestamped, undoable official event logging.
- **Instant Result Sync:** Match conclusions trigger celebration confetti, update league standings, and refresh player career statistics immediately.

### 5. 📈 Athlete & Team Performance Analytics
- **Biometric Athlete Radar Card:** Interactive 6-axis skill breakdown (`Speed`, `Shooting / Batting`, `Passing`, `Defense / Fielding`, `Stamina`, `Tactical IQ`).
- **Head-to-Head (H2H) Matchup Simulator:** Predictive win probability gauge based on offensive/defensive form and historical records.
- **Golden Boot & Top Athletes Leaderboard:** Ranked statistical tables for goals, assists, PPG, and strike rates.
- **Fair Play Index:** Disciplinary card tracking across all teams.

### 6. 📄 Official Match Sheets & CSV Export Center
- **Printable Certified Match Report:** Formatted official match summary with referee and tournament director signature blocks.
- **CSV Standings Exporter:** 1-click download of league standings data for external records.

### 7. 👥 Role-Based Perspectives
Switch seamlessly between 5 user personas:
- **Tournament Director (Admin):** Full control over rules, venues, and fixture draws.
- **Match Scorer / Referee:** Operating the digital console and event log.
- **Team Coach / Manager:** Managing squad rosters and starting lineups.
- **Athlete / Player:** Viewing personal biometric card and season performance.
- **Fan / Spectator:** Tracking live scoreboards, brackets, and standings.

---

## 📁 Project Structure

```
sports-tournament-system/
├── server/                     # Backend (Express & MongoDB)
│   ├── config/
│   │   └── db.js               # MongoDB Mongoose connection
│   ├── models/                 # Mongoose Data Schemas
│   │   ├── Tournament.js
│   │   ├── Team.js
│   │   ├── Player.js
│   │   ├── Match.js
│   │   └── Venue.js
│   ├── routes/
│   │   └── api.js              # REST API Endpoints
│   ├── seed.js                 # MongoDB Sample Data Seeder
│   ├── server.js               # Express Server Entrypoint
│   ├── package.json
│   └── .env.example
├── src/                        # Frontend (React 19 & Tailwind CSS v4)
│   ├── components/
│   │   ├── layout/             # Navbar, Sidebar
│   │   ├── dashboard/          # KPI Dashboard & Live Match Card
│   │   ├── tournaments/        # Tournament Creation & Filters
│   │   ├── fixtures/           # Fixture Timeline, Brackets & Tables
│   │   ├── scoring/            # Live Scorer Console
│   │   ├── teams/              # Squad Roster & Athlete Radar Modal
│   │   ├── venues/             # Venue Scheduler & Conflict Resolver
│   │   ├── analytics/          # H2H Simulator & Skill Radars
│   │   └── reports/            # Official Printable Match Sheet & CSV
│   ├── context/
│   │   └── SportsContext.jsx   # State Management & Conflict Engine
│   ├── data/
│   │   └── mockData.js         # Comprehensive Pre-seeded Sports Data
│   ├── services/
│   │   └── api.js              # Full-stack API Client
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 How to Run the Project (Step-by-Step)

### Prerequisites
- Node.js (v18 or higher installed)
- (Optional) MongoDB running locally or a MongoDB Atlas connection string in `server/.env`.

### Step 1: Start the Backend (Express + MongoDB)
```powershell
cd server
npm install
npm start
```
*The backend API will start on `http://localhost:5000` (Healthcheck at `http://localhost:5000/health`).*

*(Optional) To seed MongoDB with sample data:*
```powershell
node seed.js
```

### Step 2: Start the Frontend (React + Vite)
In a new terminal window:
```powershell
cd ..
npm install
npm run dev
```
*The frontend will launch at: `http://localhost:5173`.*

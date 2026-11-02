import React, { useState } from 'react';
import { SportsProvider } from './context/SportsContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import OverviewDashboard from './components/dashboard/OverviewDashboard';
import TournamentList from './components/tournaments/TournamentList';
import FixtureManager from './components/fixtures/FixtureManager';
import LiveScorerConsole from './components/scoring/LiveScorerConsole';
import TeamRosterView from './components/teams/TeamRosterView';
import VenueScheduler from './components/venues/VenueScheduler';
import AnalyticsView from './components/analytics/AnalyticsView';
import ReportsView from './components/reports/ReportsView';

function AppContent() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedScorerMatchId, setSelectedScorerMatchId] = useState(null);

  const handleNavigateToScorer = (matchId) => {
    setSelectedScorerMatchId(matchId);
    setActiveTab('scorer');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar onNavigateToScorer={handleNavigateToScorer} />

      {/* Main Workspace with Sidebar and Content View */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Left Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dynamic Main Body Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {activeTab === 'overview' && (
            <OverviewDashboard
              onNavigate={(tab) => {
                if (tab === 'scorer') {
                  handleNavigateToScorer(null);
                } else {
                  setActiveTab(tab);
                }
              }}
            />
          )}

          {activeTab === 'tournaments' && (
            <TournamentList
              onNavigateToFixtures={() => setActiveTab('fixtures')}
            />
          )}

          {activeTab === 'fixtures' && (
            <FixtureManager
              onNavigateToScorer={handleNavigateToScorer}
            />
          )}

          {activeTab === 'scorer' && (
            <LiveScorerConsole
              selectedMatchId={selectedScorerMatchId}
            />
          )}

          {activeTab === 'teams' && (
            <TeamRosterView />
          )}

          {activeTab === 'venues' && (
            <VenueScheduler />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView />
          )}

          {activeTab === 'reports' && (
            <ReportsView />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900/60 border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <span className="font-bold text-slate-400">SportNexus Centralized Management System</span> • Capstone / Review Project
          </div>
          <div className="text-[11px] text-slate-500">
            Automated Fixtures • Conflict-Free Venues • Real-Time Scoring • Athlete Radar Analytics
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <SportsProvider>
      <AppContent />
    </SportsProvider>
  );
}

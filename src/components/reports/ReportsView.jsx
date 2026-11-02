import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  Trophy,
  CheckCircle,
  Calendar,
  Share2
} from 'lucide-react';
import { useSports } from '../../context/SportsContext';

export default function ReportsView() {
  const {
    activeTournament,
    matches,
    teams,
    venues,
    players,
    getPointsTable
  } = useSports();

  const [selectedMatchId, setSelectedMatchId] = useState(matches[0]?.id || '');
  const match = matches.find(m => m.id === selectedMatchId) || matches[0];

  const homeTeam = teams.find(t => t.id === match?.homeTeamId);
  const awayTeam = teams.find(t => t.id === match?.awayTeamId);
  const venue = venues.find(v => v.id === match?.venueId);

  const pointsTable = getPointsTable(activeTournament?.id || 'tourn-1');

  // CSV Export Handler
  const exportStandingsCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,Position,Club,Played,Won,Drawn,Lost,GF,GA,GD,Points\n";
    pointsTable.forEach((row, idx) => {
      csvContent += `${idx + 1},"${row.name}",${row.played},${row.won},${row.drawn},${row.lost},${row.gf},${row.ga},${row.gd},${row.points}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${activeTournament.name.replace(/\s+/g, '_')}_Standings.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <FileText className="w-6 h-6 text-emerald-400" />
            <span>Reports, Match Sheets & Export Center</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Generate printable official match reports, export tournament CSVs, and audit documentation.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={exportStandingsCSV}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs flex items-center space-x-1.5 transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export Standings CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-500/20 transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Match Report</span>
          </button>
        </div>
      </div>

      {/* Select Match to Generate Official Scorecard */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs text-slate-300 font-semibold">
          Select Match for Official Certification Sheet:
        </div>
        <select
          value={selectedMatchId}
          onChange={(e) => setSelectedMatchId(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
        >
          {matches.map(m => {
            const h = teams.find(t => t.id === m.homeTeamId)?.name || 'Team A';
            const a = teams.find(t => t.id === m.awayTeamId)?.name || 'Team B';
            return (
              <option key={m.id} value={m.id}>
                {m.date} - {h} vs {a} ({m.round})
              </option>
            );
          })}
        </select>
      </div>

      {/* Official Match Sheet (Printable Document Card) */}
      <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-8 space-y-6 shadow-2xl printable-document">
        
        {/* Document Header */}
        <div className="border-b-2 border-slate-700 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">
              OFFICIAL CERTIFIED MATCH REPORT
            </div>
            <h1 className="text-2xl font-black text-white mt-1">
              {activeTournament.name}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Sanctioned Competition Document • Match ID: {match.id}
            </p>
          </div>

          <div className="text-right text-xs space-y-1">
            <div className="text-slate-400">Date: <span className="font-mono text-white">{match.date}</span></div>
            <div className="text-slate-400">Venue: <span className="font-semibold text-white">{venue?.name}</span></div>
            <div className="text-slate-400">Referee: <span className="text-emerald-400">{match.referee}</span></div>
          </div>
        </div>

        {/* Big Score Box */}
        <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 grid grid-cols-3 items-center text-center">
          <div>
            <div className="text-4xl">{homeTeam?.logo}</div>
            <div className="text-lg font-bold text-white mt-1">{homeTeam?.name}</div>
            <div className="text-xs text-slate-400">Manager: {homeTeam?.coach}</div>
          </div>

          <div>
            <div className="font-mono text-5xl font-black text-white">
              {match.homeScore} - {match.awayScore}
            </div>
            <div className="text-xs uppercase font-bold text-emerald-400 mt-1 tracking-wider">
              {match.status === 'Completed' ? 'FINAL OFFICIAL RESULT' : `${match.currentMinute || 68}' IN PLAY`}
            </div>
          </div>

          <div>
            <div className="text-4xl">{awayTeam?.logo}</div>
            <div className="text-lg font-bold text-white mt-1">{awayTeam?.name}</div>
            <div className="text-xs text-slate-400">Manager: {awayTeam?.coach}</div>
          </div>
        </div>

        {/* Official Events Log Table */}
        <div className="space-y-3">
          <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
            Chronological Match Events Log
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                  <th className="py-2">MIN</th>
                  <th className="py-2">EVENT TYPE</th>
                  <th className="py-2">PARTICIPANT</th>
                  <th className="py-2">OFFICIAL NOTES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {(match.events || []).length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-slate-500">
                      No disciplinary or scoring infractions recorded.
                    </td>
                  </tr>
                ) : (
                  (match.events || []).map(ev => (
                    <tr key={ev.id} className="text-slate-300">
                      <td className="py-2 font-mono font-bold text-emerald-400">{ev.minute}'</td>
                      <td className="py-2 uppercase font-semibold text-white text-[11px]">{ev.type.replace('_', ' ')}</td>
                      <td className="py-2 font-medium">{ev.player || 'Team'}</td>
                      <td className="py-2 text-slate-400 text-[11px]">{ev.description}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Signatures & Certification Footer */}
        <div className="pt-8 border-t-2 border-slate-800 grid grid-cols-3 gap-6 text-center text-xs">
          <div className="space-y-4">
            <div className="h-10 border-b border-slate-700 mx-auto w-36"></div>
            <div className="text-slate-400">Lead Match Official (Referee)</div>
          </div>
          <div className="space-y-4">
            <div className="h-10 border-b border-slate-700 mx-auto w-36"></div>
            <div className="text-slate-400">Tournament Operations Director</div>
          </div>
          <div className="space-y-4">
            <div className="h-10 border-b border-slate-700 mx-auto w-36"></div>
            <div className="text-slate-400">Venue Commissioner</div>
          </div>
        </div>

      </div>

    </div>
  );
}

import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function About() {
  const aboutInfo = {
    teamNumber: 10,
    teamName: "Team 10",
    chosenTech: "React, TypeScript, PostgreSQL, Express, Prisma",
    sprintNumber: 1
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl p-4 relative">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 backdrop-blur-sm">
          <h1 className="text-4xl font-bold text-center text-white mb-8">About Driver Rewards</h1>
          <div className="space-y-6 text-gray-300">
            <p className="flex justify-between border-b border-slate-700 pb-4">
              <span className="font-semibold">Team Number:</span>
              <span>{aboutInfo.teamNumber}</span>
            </p>
            <p className="flex justify-between border-b border-slate-700 pb-4">
              <span className="font-semibold">Team Name:</span>
              <span>{aboutInfo.teamName}</span>
            </p>
            <p className="flex justify-between border-b border-slate-700 pb-4">
              <span className="font-semibold">Technology Stack:</span>
              <span>{aboutInfo.chosenTech}</span>
            </p>
            <p className="flex justify-between border-b border-slate-700 pb-4">
              <span className="font-semibold">Sprint Number:</span>
              <span>{aboutInfo.sprintNumber}</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
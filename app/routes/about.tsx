import { Link } from 'react-router-dom';
import { ArrowLeft, Database, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

// Define the API base URL
const API_BASE_URL = 'http://localhost:3001'; // Make sure this matches your backend port

interface DatabaseStats {
  about: {
    teamNumber: number;
    teamName: string;
    chosenTech: string;
    sprintNumber: number;
  };
  stats: {
    totalDrivers: number;
    totalSponsors: number;
    totalProducts: number;
    lastUpdated: string;
  };
  dbConnection: {
    status: 'connected' | 'error';
    timestamp: string;
  };
}

export default function About() {
  const [data, setData] = useState<DatabaseStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/about/stats`);
        if (!response.ok) {
          throw new Error('Failed to fetch database stats');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
          
          {loading ? (
            <div className="text-center text-gray-400 py-8">
              <Database className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p>Connecting to database...</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-400 py-8">
              <AlertCircle className="h-8 w-8 mx-auto mb-4" />
              <p>{error}</p>
              <p className="text-sm mt-2">Make sure the backend server is running on port 3001</p>
            </div>
          ) : data ? (
            <>
              {/* Team Information */}
              <div className="space-y-6 text-gray-300 mb-8">
                <p className="flex justify-between border-b border-slate-700 pb-4">
                  <span className="font-semibold">Team Number:</span>
                  <span>{data.about.teamNumber}</span>
                </p>
                <p className="flex justify-between border-b border-slate-700 pb-4">
                  <span className="font-semibold">Team Name:</span>
                  <span>{data.about.teamName}</span>
                </p>
                <p className="flex justify-between border-b border-slate-700 pb-4">
                  <span className="font-semibold">Technology Stack:</span>
                  <span>{data.about.chosenTech}</span>
                </p>
                <p className="flex justify-between border-b border-slate-700 pb-4">
                  <span className="font-semibold">Sprint Number:</span>
                  <span>{data.about.sprintNumber}</span>
                </p>
              </div>

              {/* Live Database Statistics */}
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-600">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-white">Live Database Statistics</h2>
                  <div className={`flex items-center px-3 py-1 rounded-full ${
                    data.dbConnection.status === 'connected' 
                      ? 'bg-green-500/10 text-green-400' 
                      : 'bg-red-500/10 text-red-400'
                  }`}>
                    <Database className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {data.dbConnection.status === 'connected' ? 'Connected' : 'Error'}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 text-gray-300">
                  <p className="flex justify-between">
                    <span className="font-semibold">Total Drivers:</span>
                    <span>{data.stats.totalDrivers}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-semibold">Total Sponsors:</span>
                    <span>{data.stats.totalSponsors}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-semibold">Total Products:</span>
                    <span>{data.stats.totalProducts}</span>
                  </p>
                  <p className="flex justify-between text-sm text-gray-400 mt-4 pt-4 border-t border-slate-700">
                    <span>Last Updated:</span>
                    <span>{new Date(data.stats.lastUpdated).toLocaleString()}</span>
                  </p>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </main>
  );
}
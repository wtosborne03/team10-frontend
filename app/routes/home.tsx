import { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { ArrowRight, Shield, Truck, Award, BarChart, Gift, Users } from 'lucide-react';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-start p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-700"></div>
      </div>

      <div className={`max-w-6xl w-full text-center space-y-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Hero Section */}
        <div className="space-y-6 pt-12">
          <h1 className="text-6xl font-bold text-white tracking-tight">
            Driver Incentive Program
          </h1>
          <p className="text-2xl text-gray-300">
            Elevating Professional Driving Through Recognition and Incentives
          </p>
        </div>

        {/* Key Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 px-4">
          <div className="bg-slate-800/50 border-slate-700 rounded-lg shadow-lg p-4">
            <div className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Truck className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Driver Performance</h3>
              <p className="text-gray-400">Track and reward excellent driving behavior with our comprehensive point system</p>
            </div>
          </div>

          <div className="bg-slate-800/50 border-slate-700 rounded-lg shadow-lg p-4">
            <div className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Gift className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Exclusive Rewards</h3>
              <p className="text-gray-400">Redeem points for products through sponsor-specific catalogs updated in real-time</p>
            </div>
          </div>

          <div className="bg-slate-800/50 border-slate-700 rounded-lg shadow-lg p-4">
            <div className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Secure Platform</h3>
              <p className="text-gray-400">Enterprise-grade security with encrypted data and comprehensive audit logging</p>
            </div>
          </div>
        </div>


        {/* User Types Section */}
        <div className="space-y-8 pt-12">
          <h2 className="text-3xl font-bold text-white">Who Can Participate?</h2>
          <div className="grid md:grid-cols-3 gap-6 px-4">
            <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700">
              <Users className="h-8 w-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Drivers</h3>
              <ul className="text-left text-gray-400 space-y-2">
                <li>• Earn points for good driving</li>
                <li>• Browse reward catalogs</li>
                <li>• Track performance</li>
                <li>• Redeem rewards</li>
              </ul>
            </div>

            <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700">
              <Award className="h-8 w-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Sponsors</h3>
              <ul className="text-left text-gray-400 space-y-2">
                <li>• Manage driver programs</li>
                <li>• Customize reward catalogs</li>
                <li>• Track driver performance</li>
                <li>• Generate reports</li>
              </ul>
            </div>

            <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700">
              <BarChart className="h-8 w-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Administrators</h3>
              <ul className="text-left text-gray-400 space-y-2">
                <li>• System management</li>
                <li>• User administration</li>
                <li>• Comprehensive reporting</li>
                <li>• Security oversight</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-12 pb-8">
          <a 
            href="/login" 
            className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50 flex items-center justify-center"
          >
            Sign In <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <a 
            href="/register" 
            className="px-8 py-4 bg-transparent border-2 border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400/10 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            Create Account <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </main>
  );
}
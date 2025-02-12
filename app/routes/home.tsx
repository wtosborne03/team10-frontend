import { useState, useEffect } from 'react';
import { ArrowRight, Shield, Truck, Award, BarChart, Gift, Users, Menu, X, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const signIn = async () => {
    await auth.signin
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-start p-4 relative overflow-hidden">
      {/* Menu Button */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-full bg-slate-800/50 border border-slate-700 hover:bg-slate-700/50 transition-colors"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-lg bg-slate-800 border border-slate-700 shadow-lg py-1 animate-fadeIn">
            <Link
              to="/about"
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-slate-700/50 transition-colors"
            >
              <Info className="h-4 w-4 mr-2" />
              About Us
            </Link>
          </div>
        )}
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-700"></div>
      </div>

      <div className={`max-w-6xl w-full text-center space-y-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Hero Section */}
        <div className="space-y-6 pt-12">
          <h1 className="text-6xl font-bold text-white tracking-tight">
            Good (Truck) Driver Incentive Program
          </h1>
          <p className="text-2xl text-gray-300">
          </p>
        </div>

        {/* Key Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 px-4">
          <div className="bg-slate-800/50 border-slate-700 rounded-lg shadow-lg p-4">
            <div className="p-6 space-y-4">
              <div className="w-full flex items-center justify-center gap-3">
                <Truck className="h-12 w-12 rounded-lg text-blue-400 bg-blue-500/10 p-3" />
                <h3 className="text-xl font-semibold text-white">Driver Performance</h3>
              </div>
              <p className="text-gray-400">Track and reward excellent driving behavior with our comprehensive point system</p>
            </div>
          </div>

          <div className="bg-slate-800/50 border-slate-700 rounded-lg shadow-lg p-4">
            <div className="p-6 space-y-4">
              <div className="w-full flex items-center justify-center gap-3">
                <Gift className="h-12 w-12 rounded-lg text-blue-400 bg-blue-500/10 p-3" />
                <h3 className="text-xl font-semibold text-white">Exclusive Rewards</h3>
              </div>
              <p className="text-gray-400">Redeem points for products through sponsor-specific catalogs updated in real-time</p>
            </div>
          </div>

          <div className="bg-slate-800/50 border-slate-700 rounded-lg shadow-lg p-4">
            <div className="p-6 space-y-4">
              <div className="w-full flex items-center justify-center gap-3">
                <Shield className="h-12 w-12 rounded-lg text-blue-400 bg-blue-500/10 p-3" />
                <h3 className="text-xl font-semibold text-white">Secure Platform</h3>
              </div>
              <p className="text-gray-400">Enterprise-grade security with encrypted data and comprehensive audit logging</p>
            </div>
          </div>
        </div>

        {/* User Types Section */}
        <div className="space-y-8 pt-12">
          <h2 className="text-3xl font-bold text-white">Who Can Participate?</h2>
          <div className="grid md:grid-cols-3 gap-6 px-4">
            <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700">
              <div className="w-full mb-3 flex items-center justify-center gap-3">
                <Users className="h-8 w-8 text-blue-400" />
                <h3 className="text-xl font-semibold text-white">Drivers</h3>
              </div>
              <ul className="text-left text-gray-400 space-y-2">
                <li>• Earn points for good driving</li>
                <li>• Browse reward catalogs</li>
                <li>• Track performance</li>
                <li>• Redeem rewards</li>
              </ul>
            </div>

            <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700">
              <div className="w-full mb-3 flex items-center justify-center gap-3">
                <Award className="h-8 w-8 text-blue-400" />
                <h3 className="text-xl font-semibold text-white">Sponsors</h3>
              </div>
              <ul className="text-left text-gray-400 space-y-2">
                <li>• Manage driver programs</li>
                <li>• Customize reward catalogs</li>
                <li>• Track driver performance</li>
                <li>• Generate reports</li>
              </ul>
            </div>

            <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700">
              <div className="w-full mb-3 flex items-center justify-center gap-3">
                <BarChart className="h-8 w-8 text-blue-400" />
                <h3 className="text-xl font-semibold text-white">Administrators</h3>
              </div>
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
          <button
            onClick={ }
            className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50 flex items-center justify-center"
          >
            Sign In <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <Link
            to="/register"
            className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50 flex items-center justify-center"
          >
            Sign Up <ArrowRight className="ml-2 h-5 w-5" />
          </Link>

        </div>
      </div>
    </main>
  );
}
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, KeyRound, Mail, AlertTriangle, ArrowLeft } from 'lucide-react';

interface FormEvent extends React.FormEvent<HTMLFormElement> {
    preventDefault(): void;
  }
  
  export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loginAttempt, setLoginAttempt] = useState({ error: false, message: '' });
  
    const handleLogin = async (e: FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      // Simulated login delay
      setTimeout(() => {
        setIsLoading(false);
        // Add actual login logic here
        setLoginAttempt({
          error: true,
          message: 'Invalid credentials. Please try again.'
        });
      }, 1000);
    };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-700"></div>
      </div>

      <div className="w-full max-w-md p-4 relative z-10">
        {/* Back to home link */}
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg backdrop-blur-sm p-6">
          <div className="flex flex-col items-center space-y-2 mb-8">
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-2">
              <KeyRound className="h-6 w-6 text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-gray-400 text-center">
              Sign in to access your Driver Rewards account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginAttempt.error && (
              <div className="bg-red-900/20 border border-red-900 text-red-400 p-3 rounded-lg flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <p>{loginAttempt.message}</p>
              </div>
            )}

            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full pl-10 p-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  className="w-full pl-10 pr-10 p-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-600 bg-slate-900/50 text-blue-500"
                />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-all duration-300 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="border-t border-slate-700 mt-6 pt-6">
            <div className="text-sm text-gray-400 text-center">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Create one now
              </Link>
            </div>
            <div className="text-xs text-gray-500 text-center mt-2">
              Protected by enterprise-grade security
            </div>
          </div>
        </div>
      </div>

      {/* Security features notice */}
      <div className="mt-8 max-w-md text-center text-sm text-gray-500">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center">
            <KeyRound className="h-4 w-4 mr-1" />
            <span>Encrypted Connection</span>
          </div>
          <div className="flex items-center">
            <AlertTriangle className="h-4 w-4 mr-1" />
            <span>Fraud Protection</span>
          </div>
        </div>
      </div>
    </main>
  );
}
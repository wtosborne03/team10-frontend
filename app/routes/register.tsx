import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, KeyRound, Mail, AlertTriangle, ArrowLeft, User, Building2, Phone, Truck, Award, Shield } from 'lucide-react';

interface FormEvent extends React.FormEvent<HTMLFormElement> {
  preventDefault(): void;
}

type UserRole = 'driver' | 'sponsor' | 'admin';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [registerAttempt, setRegisterAttempt] = useState({ error: false, message: '' });

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulated registration delay
    setTimeout(() => {
      setIsLoading(false);
      setRegisterAttempt({
        error: true,
        message: 'Registration service temporarily unavailable.'
      });
    }, 1000);
  };

  const roleCards = [
    {
      role: 'driver' as UserRole,
      icon: Truck,
      title: 'Driver',
      description: 'Join as a professional driver and earn rewards'
    },
    {
      role: 'sponsor' as UserRole,
      icon: Award,
      title: 'Sponsor',
      description: 'Register your company as a sponsor'
    },
    {
      role: 'admin' as UserRole,
      icon: Shield,
      title: 'Admin',
      description: 'System administrator access'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background animations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-700"></div>
      </div>

      <div className="w-full max-w-4xl p-4 relative z-10">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg backdrop-blur-sm p-6">
          <div className="flex flex-col items-center space-y-2 mb-8">
            <h1 className="text-2xl font-bold text-white">Create Account</h1>
            <p className="text-gray-400 text-center">
              Select your role to get started
            </p>
          </div>

          {/* Role Selection */}
          {!selectedRole && (
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {roleCards.map(({ role, icon: Icon, title, description }) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className="p-6 bg-slate-900/50 border border-slate-700 rounded-lg hover:border-blue-500 transition-all duration-300 text-left"
                >
                  <Icon className="h-8 w-8 text-blue-400 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                  <p className="text-sm text-gray-400">{description}</p>
                </button>
              ))}
            </div>
          )}

          {selectedRole && (
            <div className="max-w-md mx-auto">
              <button
                onClick={() => setSelectedRole(null)}
                className="mb-6 text-gray-400 hover:text-white transition-colors flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Choose different role
              </button>

              <form onSubmit={handleRegister} className="space-y-4">
                {registerAttempt.error && (
                  <div className="bg-red-900/20 border border-red-900 text-red-400 p-3 rounded-lg flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    <p>{registerAttempt.message}</p>
                  </div>
                )}

                {/* Common Fields */}
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      className="w-full pl-10 p-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      className="w-full pl-10 p-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Role-specific fields */}
                  {selectedRole === 'sponsor' && (
                    <>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Company Name"
                          required
                          className="w-full pl-10 p-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          placeholder="Business Phone"
                          required
                          className="w-full pl-10 p-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </>
                  )}

                  {/* Password Fields */}
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

                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      required
                      className="w-full pl-10 pr-10 p-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {/* Driver Info Box */}
                  {selectedRole === 'driver' && (
                    <div className="bg-blue-900/20 border border-blue-800 text-blue-200 p-4 rounded-lg">
                      <p className="text-sm">After registration, you'll be able to apply to sponsor companies. 
                      Once a sponsor accepts your application, you can start earning and redeeming points for rewards.</p>
                    </div>
                  )}

                  {/* Terms and Conditions */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      required
                      className="rounded border-gray-600 bg-slate-900/50 text-blue-500"
                    />
                    <span className="text-sm text-gray-400">
                      I agree to the{' '}
                      <Link to="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">
                        Terms and Conditions
                      </Link>
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-all duration-300 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating Account...
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>
            </div>
          )}

          <div className="border-t border-slate-700 mt-6 pt-6">
            <div className="text-sm text-gray-400 text-center">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Sign in
              </Link>
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
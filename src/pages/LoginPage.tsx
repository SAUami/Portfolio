import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ArrowRight, ArrowLeft, Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { brandConfig } from '../config/brand.config';
import { SEOHead } from '../components/common/SEOHead';
import { Button } from '../components/common/button';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const result = await login(email, password);

    if (result.success) {
      navigate('/admin', { replace: true });
    } else {
      setErrorMessage(result.message || 'Login failed.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <SEOHead
        title="Founder Portal Login | Saurabh Sharma"
        description="Secure admin login for Saurabh Sharma to access incoming project enquiries."
        noIndex={true}
      />

      {/* Background Ambient Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-electric-600/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio</span>
          </Link>
        </div>

        <div className="text-center">
          <div className="relative mx-auto w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-electric-500 to-violetAccent-500 shadow-xl shadow-electric-600/20 mb-3">
            <img
              src={brandConfig.founder.image}
              alt={brandConfig.founder.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight">
            Founder & Admin Portal
          </h2>
          <p className="mt-1 text-xs text-slate-400 font-mono">
            {brandConfig.founder.name} • {brandConfig.founder.role}
          </p>
        </div>

        <div className="mt-6 glass-panel rounded-3xl p-6 sm:p-8 border border-navy-700/80 shadow-2xl space-y-6">
          {errorMessage && (
            <div
              className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/50 flex items-start gap-2.5 text-rose-200 text-xs animate-in fade-in duration-200"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-900 border border-navy-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-electric-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your admin password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-navy-900 border border-navy-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-electric-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                className="w-full justify-center"
                rightIcon={!isSubmitting && <ArrowRight className="w-4 h-4" />}
              >
                Enter Admin Portal
              </Button>
            </div>
          </form>

          {/* Secure Admin Portal Notice */}
          <div className="pt-4 border-t border-navy-850 bg-navy-900/40 -mx-6 -mb-6 p-4 rounded-b-3xl text-center">
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              <span>Authorized Founder Portal • Session protected with encrypted JWT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

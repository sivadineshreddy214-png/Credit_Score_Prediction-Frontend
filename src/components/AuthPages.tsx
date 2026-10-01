import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { useAuth } from '../services/auth';
import { Eye, EyeOff, Lock, Mail, User, CheckCircle2, RefreshCw, KeyRound, AlertCircle } from 'lucide-react';

interface AuthPagesProps {
  mode: 'signin' | 'signup';
  setActiveTab: (tab: ActiveTab) => void;
  onSuccess?: () => void;
}

export const AuthPages: React.FC<AuthPagesProps> = ({ mode: initialMode, setActiveTab, onSuccess }) => {
  const { signInWithEmail, signUpWithEmail, loading, error, clearError } = useAuth();

  const [currentMode, setCurrentMode] = useState<'signin' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setSuccessNotice(null);
    clearError();

    if (currentMode === 'signup') {
      if (password !== confirmPassword) {
        setLocalError('Passwords do not match. Please verify your password.');
        return;
      }
      const success = await signUpWithEmail(name, email, password);
      if (success) {
        // Switch to sign in and prompt user to enter their credentials manually
        setSuccessNotice('Account created successfully! Please enter your password to log in.');
        setPassword('');
        setConfirmPassword('');
        setCurrentMode('signin');
      }
    } else {
      const success = await signInWithEmail(email, password);
      if (success) {
        if (onSuccess) onSuccess();
        setActiveTab('dashboard');
      }
    }
  };

  const handleFillDemoCredentials = () => {
    setEmail('user@creditscore.com');
    setPassword('Password123');
    setLocalError(null);
    setSuccessNotice(null);
    clearError();
  };

  const isSignUp = currentMode === 'signup';

  return (
    <div className="max-w-md mx-auto my-12 px-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm mx-auto mb-3 shadow-2xs">
            <KeyRound className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            {isSignUp ? 'Create an Account' : 'Sign In with Credentials'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isSignUp
              ? 'Register with your name, email, and password'
              : 'Enter your registered email and password to access your account'}
          </p>
        </div>

        {/* Success message after sign up */}
        {successNotice && (
          <div className="p-3 mb-4 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-200 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Error message */}
        {(error || localError) && (
          <div className="p-3 mb-4 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{error || localError}</span>
          </div>
        )}

        {/* Helper Box: Sample Credentials */}
        {!isSignUp && (
          <div className="mb-5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">Sample Credentials:</span>
              <button
                type="button"
                onClick={handleFillDemoCredentials}
                className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 underline"
              >
                Auto-fill
              </button>
            </div>
            <div className="font-mono text-[11px] text-slate-600 space-y-0.5">
              <p>Email: <strong className="text-slate-800">user@creditscore.com</strong></p>
              <p>Password: <strong className="text-slate-800">Password123</strong></p>
            </div>
          </div>
        )}

        {/* Credential Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-9 pr-9 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-2xs mt-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <span>{isSignUp ? 'Create Account' : 'Sign In with Credentials'}</span>
            )}
          </button>
        </form>

        {/* Switcher */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          {isSignUp ? (
            <p>
              Already registered?{' '}
              <button
                onClick={() => { clearError(); setSuccessNotice(null); setCurrentMode('signin'); }}
                className="font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account yet?{' '}
              <button
                onClick={() => { clearError(); setSuccessNotice(null); setCurrentMode('signup'); }}
                className="font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Create an account
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import { X, Lock } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const { login, language, t } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isSignUp ? '/api/auth/register' : '/api/auth/login';
    const payload = isSignUp 
      ? { username, email, password, language } 
      : { usernameOrEmail: email, password };

    try {
      const res = await axios.post(endpoint, payload);
      login(res.data.user, res.data.token);
      onClose();
      // Reset fields
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative glass-card">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="text-center mb-6">
          <div className="inline-flex p-3 bg-emerald-500/10 rounded-2xl text-emerald-500 mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold font-outfit text-slate-800 dark:text-white">
            {isSignUp ? 'Create EcoSort Account' : 'Sign In to EcoSort'}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isSignUp ? 'Register to save history and join leaderboard!' : 'Unlock statistics, history, and rewards!'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label htmlFor="react-auth-username" class="block text-xs font-semibold text-slate-500 uppercase mb-1">Username</label>
              <input 
                type="text" 
                id="react-auth-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-sm transition-colors text-slate-800 dark:text-white"
              />
            </div>
          )}
          <div>
            <label htmlFor="react-auth-email" class="block text-xs font-semibold text-slate-500 uppercase mb-1">
              {isSignUp ? 'Email Address' : 'Email or Username'}
            </label>
            <input 
              type={isSignUp ? 'email' : 'text'} 
              id="react-auth-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-sm transition-colors text-slate-800 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="react-auth-password" class="block text-xs font-semibold text-slate-500 uppercase mb-1">Password</label>
            <input 
              type="password" 
              id="react-auth-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-sm transition-colors text-slate-800 dark:text-white"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/15 hover:shadow-emerald-500/25 transition-all text-sm disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isSignUp ? 'Register' : 'Sign In')}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          <span>{isSignUp ? 'Already have an account?' : "Don't have an account?"}</span>
          <button 
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }} 
            className="text-emerald-500 hover:underline font-semibold ml-1 focus:outline-none"
          >
            {isSignUp ? 'Sign In' : 'Create account'}
          </button>
        </div>
      </div>
    </div>
  );
}

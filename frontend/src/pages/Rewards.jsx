import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import { Trophy, Award, Loader2 } from 'lucide-react';

export default function Rewards() {
  const { token, user, t } = useApp();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRewardsData();
  }, []);

  const fetchRewardsData = async () => {
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const res = await axios.get('/api/rewards', { headers });
      setData(res.data);
    } catch (err) {
      console.error('Error fetching rewards:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
        <p className="text-sm font-medium text-slate-500">Loading achievements...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20 text-slate-400">
        <p>Could not retrieve rewards. Ensure Flask server is running.</p>
      </div>
    );
  }

  const { badges, leaderboard, levelProgress } = data;

  let levelTitle = "Eco-Sorter Novice";
  if (levelProgress.level >= 2 && levelProgress.level < 4) levelTitle = "Sort Specialist";
  else if (levelProgress.level >= 4 && levelProgress.level < 7) levelTitle = "Recycle Knight";
  else if (levelProgress.level >= 7) levelTitle = "Carbon Crusader";

  return (
    <div className="space-y-8 fade-in">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-extrabold font-outfit text-slate-800 dark:text-white">{t('rewards_title')}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('rewards_desc')}</p>
      </div>

      {/* Gamification profile progress card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/10 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 text-slate-100 dark:text-slate-900/15 text-8xl font-black select-none pointer-events-none">GP</div>
        <div className="flex items-center space-x-5">
          <div className="w-20 h-20 rounded-full border-4 border-emerald-500 flex items-center justify-center bg-emerald-500/10 text-emerald-500 font-extrabold text-3xl font-outfit shadow-lg shadow-emerald-500/20">
            {levelProgress.level}
          </div>
          <div>
            <h3 className="text-2xl font-bold font-outfit text-slate-800 dark:text-white">
              {user ? user.username : 'Guest User'}
            </h3>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              {t('level_label')} {levelProgress.level} {levelTitle}
            </p>
          </div>
        </div>
        
        <div className="w-full md:w-96 space-y-2">
          <div className="flex justify-between text-xs font-semibold text-slate-400">
            <span>{levelProgress.currentPoints} GP</span>
            <span>Level Up at +100 GP</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-950/50 rounded-full h-4 overflow-hidden border border-slate-200/50 dark:border-slate-800">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-green-600 h-full rounded-full transition-all duration-1000" 
              style={{ width: `${levelProgress.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Achievements & Leaderboard side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto">
        
        {/* Unlocked Achievements */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 border border-emerald-500/10 space-y-6">
          <h3 className="text-xl font-bold font-outfit text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">{t('badges_title')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {badges.map((badge) => (
              <div 
                key={badge.id}
                className={`p-4 border rounded-2xl flex items-center space-x-3 transition-all 
                  ${badge.unlocked 
                    ? 'border-emerald-500/25 bg-emerald-500/5 opacity-100' 
                    : 'border-slate-100 dark:border-slate-800/40 opacity-40 grayscale'
                  }`}
              >
                <div className="text-3xl p-2 bg-slate-50 dark:bg-slate-950 rounded-xl">{badge.icon}</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white flex items-center space-x-1.5">
                    <span>{badge.title}</span> 
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-extrabold 
                      ${badge.unlocked 
                        ? 'bg-emerald-500/10 text-emerald-500' 
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                      }`}
                    >
                      {badge.unlocked ? 'Unlocked' : 'Locked'}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-tight">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Leaderboard */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 border border-emerald-500/10 space-y-6">
          <h3 className="text-xl font-bold font-outfit text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">{t('leaderboard_title')}</h3>
          <div className="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950 text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800">
                  <th className="py-3 px-4 text-center w-12">{t('rank')}</th>
                  <th className="py-3 px-4">{t('user')}</th>
                  <th className="py-3 px-4 text-right">{t('points')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50 dark:divide-slate-800/50">
                {leaderboard.map((row) => {
                  let rankColor = "text-slate-400";
                  if (row.rank === 1) rankColor = "text-amber-500 font-extrabold text-base";
                  else if (row.rank === 2) rankColor = "text-slate-300 font-extrabold text-base";
                  else if (row.rank === 3) rankColor = "text-amber-700 font-extrabold text-base";

                  const isCurrentUser = user && user.id === row.id;

                  return (
                    <tr 
                      key={row.id} 
                      className={`hover:bg-slate-500/5 transition-colors ${isCurrentUser ? 'bg-emerald-500/5 font-semibold' : ''}`}
                    >
                      <td className={`py-3 px-4 text-center ${rankColor}`}>{row.rank}</td>
                      <td className="py-3 px-4 flex items-center space-x-2">
                        <span className="font-bold text-slate-700 dark:text-slate-200">{row.username}</span>
                        <span className="text-[9px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-semibold text-slate-400 uppercase tracking-widest">
                          Lvl {row.level}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-emerald-500 font-outfit">{row.points} GP</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

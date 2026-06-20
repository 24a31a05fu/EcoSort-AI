import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Scan, Trophy, BarChart2, MessageSquare } from 'lucide-react';

export default function Home() {
  const { setActivePage, t } = useApp();

  return (
    <div className="space-y-16 fade-in">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto space-y-6 pt-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-outfit tracking-tight leading-tight">
          <span class="bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-500 bg-clip-text text-transparent">
            {t('slogan')}
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-normal">
          {t('hero_desc')}
        </p>
        <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button 
            onClick={() => setActivePage('classify')} 
            className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/35 transition-all text-base transform hover:-translate-y-0.5 cursor-pointer"
          >
            {t('btn_cta')}
          </button>
          <button 
            onClick={() => setActivePage('about')} 
            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-semibold rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-base cursor-pointer"
          >
            {t('nav_about')}
          </button>
        </div>
      </section>

      {/* SDG Highlights */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold font-outfit text-center text-slate-800 dark:text-white">
          {t('sdg_title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* SDG 11 */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-emerald-500/10 hover:border-emerald-500/20 hover:shadow-xl transition-all duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-amber-500/20">11</div>
              <h3 className="text-xl font-bold font-outfit text-slate-800 dark:text-white">{t('sdg_11_title')}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{t('sdg_11_desc')}</p>
            </div>
            <a 
              href="https://sdgs.un.org/goals/goal11" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-6 text-emerald-500 hover:text-emerald-600 text-sm font-semibold flex items-center space-x-1"
            >
              <span>Learn More</span> <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          {/* SDG 12 */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-emerald-500/10 hover:border-emerald-500/20 hover:shadow-xl transition-all duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-amber-600/20">12</div>
              <h3 className="text-xl font-bold font-outfit text-slate-800 dark:text-white">{t('sdg_12_title')}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{t('sdg_12_desc')}</p>
            </div>
            <a 
              href="https://sdgs.un.org/goals/goal12" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-6 text-emerald-500 hover:text-emerald-600 text-sm font-semibold flex items-center space-x-1"
            >
              <span>Learn More</span> <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          {/* SDG 13 */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-emerald-500/10 hover:border-emerald-500/20 hover:shadow-xl transition-all duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-emerald-600/20">13</div>
              <h3 class="text-xl font-bold font-outfit text-slate-800 dark:text-white">{t('sdg_13_title')}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{t('sdg_13_desc')}</p>
            </div>
            <a 
              href="https://sdgs.un.org/goals/goal13" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-6 text-emerald-500 hover:text-emerald-600 text-sm font-semibold flex items-center space-x-1"
            >
              <span>Learn More</span> <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Statistics Section --> */}
      <section className="glass-card rounded-3xl p-8 border border-emerald-500/10 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 text-slate-100 dark:text-slate-900/10 text-9xl font-extrabold select-none pointer-events-none">ECO</div>
        <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-center text-slate-800 dark:text-white mb-8">
          {t('stats_heading')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-outfit">18,520+</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase mt-1">{t('stats_analyzed')}</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-outfit">12,410+</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase mt-1">{t('stats_recycled')}</p>
          </div>
          <div className="space-y-1">
            <p class="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-outfit">9,800 kg</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase mt-1">{t('stats_carbon')}</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-outfit">94.2%</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase mt-1">{t('stats_score')}</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold font-outfit text-center text-slate-800 dark:text-white">
          {t('features_heading')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card rounded-2xl p-6 border border-emerald-500/5 hover:border-emerald-500/20 hover:-translate-y-1 transition-all duration-300">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500 w-fit mb-4">
              <Scan className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-outfit mb-2 text-slate-800 dark:text-white">{t('feature_ai_title')}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t('feature_ai_desc')}</p>
          </div>
          <div className="glass-card rounded-2xl p-6 border border-emerald-500/5 hover:border-emerald-500/20 hover:-translate-y-1 transition-all duration-300">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500 w-fit mb-4">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-outfit mb-2 text-slate-800 dark:text-white">{t('feature_gamify_title')}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t('feature_gamify_desc')}</p>
          </div>
          <div className="glass-card rounded-2xl p-6 border border-emerald-500/5 hover:border-emerald-500/20 hover:-translate-y-1 transition-all duration-300">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500 w-fit mb-4">
              <BarChart2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-outfit mb-2 text-slate-800 dark:text-white">{t('feature_analytics_title')}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t('feature_analytics_desc')}</p>
          </div>
          <div className="glass-card rounded-2xl p-6 border border-emerald-500/5 hover:border-emerald-500/20 hover:-translate-y-1 transition-all duration-300">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500 w-fit mb-4">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-outfit mb-2 text-slate-800 dark:text-white">{t('feature_chatbot_title')}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t('feature_chatbot_desc')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

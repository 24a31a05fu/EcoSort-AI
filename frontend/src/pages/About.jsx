import React from 'react';
import { useApp } from '../context/AppContext';
import { Info, Users, Milestone } from 'lucide-react';

export default function About() {
  const { t } = useApp();

  const teamMembers = [
    "SHYAM",
    "DHANUSH VENKAT KUMAR",
    "CHARAN KUSUMANCHI",
    "OJESWITHA MANJU"
  ];

  const getInitials = (name) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 fade-in">
      {/* Project Header */}
      <section className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold font-outfit text-slate-800 dark:text-white">{t('about_title')}</h2>
        <div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full"></div>
      </section>

      {/* Project Overview */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/10 space-y-4">
        <h3 className="text-2xl font-bold font-outfit text-slate-800 dark:text-white flex items-center space-x-2">
          <Info className="w-6 h-6 text-emerald-500" />
          <span>{t('about_project_heading')}</span>
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          {t('about_project_body')}
        </p>
      </section>

      {/* SDG alignment details */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold font-outfit text-slate-800 dark:text-white text-center">{t('sdg_title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-emerald-500/5 text-center space-y-4">
            <div className="w-16 h-16 bg-amber-500 text-white rounded-2xl flex items-center justify-center font-extrabold text-2xl mx-auto shadow-lg shadow-amber-500/20">11</div>
            <h4 className="font-bold text-slate-800 dark:text-white">{t('sdg_11_title')}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">By promoting local recycling bins and raising awareness of community drop-off sites, we help cities become cleaner and decrease municipal waste density.</p>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-emerald-500/5 text-center space-y-4">
            <div className="w-16 h-16 bg-amber-600 text-white rounded-2xl flex items-center justify-center font-extrabold text-2xl mx-auto shadow-lg shadow-amber-600/20">12</div>
            <h4 class="font-bold text-slate-800 dark:text-white">{t('sdg_12_title')}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">By educating users on biodegradable food scraps composting, plastics segregation guidelines, and heavy toxic battery management, we encourage circular economies.</p>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-emerald-500/5 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-extrabold text-2xl mx-auto shadow-lg shadow-emerald-600/20">13</div>
            <h4 className="font-bold text-slate-800 dark:text-white">{t('sdg_13_title')}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Segregating recyclables and wet food waste reduces massive landfill dump sizes, directly stopping organic matter from creating high volumes of harmful methane gas.</p>
          </div>
        </div>
      </section>

      {/* Team & Future Scope Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Team Card */}
        <div className="glass-card rounded-3xl p-6 border border-emerald-500/10 space-y-4">
          <h3 className="text-xl font-bold font-outfit text-slate-800 dark:text-white flex items-center space-x-2">
            <Users className="w-5 h-5 text-emerald-500" />
            <span>{t('about_team_heading')}</span>
          </h3>
          <div className="space-y-4">
            {teamMembers.map((name) => (
              <div key={name} className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {getInitials(name)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-700 dark:text-white">{name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Scope Card */}
        <div className="glass-card rounded-3xl p-6 border border-emerald-500/10 space-y-4">
          <h3 className="text-xl font-bold font-outfit text-slate-800 dark:text-white flex items-center space-x-2">
            <Milestone className="w-5 h-5 text-emerald-500" />
            <span>{t('about_future_heading')}</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400 pl-4 list-disc">
            <li>{t('future_item_1')}</li>
            <li>{t('future_item_2')}</li>
            <li>{t('future_item_3')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

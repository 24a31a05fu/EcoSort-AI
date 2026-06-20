import React from 'react';
import { useApp } from '../context/AppContext';
import { Leaf } from 'lucide-react';

export default function Footer() {
  const { setActivePage, t } = useApp();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <Leaf className="text-emerald-500 w-5 h-5" />
          <span className="font-outfit font-bold text-lg text-slate-700 dark:text-slate-300">EcoSort AI</span>
          <span className="text-xs text-slate-400 dark:text-slate-500">© 2026. All Rights Reserved.</span>
        </div>
        
        <div className="flex space-x-6 text-sm text-slate-500 dark:text-slate-400">
          <button onClick={() => setActivePage('about')} className="hover:text-emerald-600 transition-colors cursor-pointer">SDGs</button>
          <button onClick={() => setActivePage('classify')} className="hover:text-emerald-600 transition-colors cursor-pointer">AI Sorter</button>
          <button onClick={() => setActivePage('rewards')} className="hover:text-emerald-600 transition-colors cursor-pointer">Leaderboard</button>
        </div>
        
        <div className="text-xs text-slate-400 dark:text-slate-500">
          Supporting UN SDGs 11, 12, 13
        </div>
      </div>
    </footer>
  );
}

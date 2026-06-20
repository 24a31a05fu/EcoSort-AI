import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Leaf, Sun, Moon, Languages, Menu, X, LogOut } from 'lucide-react';

export default function Navbar({ onOpenAuth }) {
  const { theme, setTheme, language, setLanguage, activePage, setActivePage, token, user, logout, t } = useApp();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const selectLanguage = (lang) => {
    setLanguage(lang);
    setLangOpen(false);
  };

  const navItems = [
    { id: 'home', label: t('nav_home') },
    { id: 'classify', label: t('nav_classify') },
    { id: 'dashboard', label: t('nav_dashboard'), auth: true },
    { id: 'chatbot', label: t('nav_chatbot') },
    { id: 'rewards', label: t('nav_rewards') },
    { id: 'about', label: t('nav_about') },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-950/70 border-b border-emerald-500/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActivePage('home')}>
            <div className="p-2 bg-gradient-to-tr from-emerald-500 to-green-600 rounded-xl shadow-md shadow-emerald-500/20 text-white">
              <Leaf className="w-6 h-6 animate-pulse" />
            </div>
            <span className="text-2xl font-extrabold font-outfit tracking-tight bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
              EcoSort<span className="text-emerald-500 font-normal">AI</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-4" aria-label="Main Navigation">
            {navItems
              .filter(item => !item.auth || token)
              .map(item => (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activePage === item.id
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
                      : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-500/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
          </nav>

          {/* Action Controls */}
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-all flex items-center space-x-1"
                aria-label="Select Language"
              >
                <Languages className="w-5 h-5" />
                <span className="text-xs font-semibold uppercase">{language}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden">
                  <button
                    onClick={() => selectLanguage('en')}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm font-medium"
                  >
                    English
                  </button>
                  <button
                    onClick={() => selectLanguage('hi')}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm font-medium"
                  >
                    हिंदी
                  </button>
                  <button
                    onClick={() => selectLanguage('te')}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm font-medium"
                  >
                    తెలుగు
                  </button>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-all"
              aria-label="Toggle dark/light mode"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* User Account / Auth Section */}
            <div id="auth-section">
              {token && user ? (
                <div className="flex items-center space-x-2 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 bg-slate-50 dark:bg-slate-900/50">
                  <div className="flex flex-col items-end leading-none text-right">
                    <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200 font-outfit">
                      {user.username}
                    </span>
                    <span className="text-[9px] text-emerald-500 font-bold font-outfit mt-0.5">
                      {user.points} GP (Lvl {user.level})
                    </span>
                  </div>
                  <button onClick={logout} className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors" aria-label="Sign Out">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-500/15 hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                >
                  {t('btn_signin')}
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-all"
              aria-label="Open main menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-4 space-y-1">
          {navItems
            .filter(item => !item.auth || token)
            .map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium transition-all ${
                  activePage === item.id
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/5'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
        </div>
      )}
    </header>
  );
}

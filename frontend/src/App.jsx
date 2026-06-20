import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Home from './pages/Home';
import Classifier from './pages/Classifier';
import Dashboard from './pages/Dashboard';
import Chatbot from './pages/Chatbot';
import Rewards from './pages/Rewards';
import About from './pages/About';

export default function App() {
  const { activePage } = useApp();
  const [authOpen, setAuthOpen] = useState(false);

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'classify':
        return <Classifier />;
      case 'dashboard':
        return <Dashboard />;
      case 'chatbot':
        return <Chatbot />;
      case 'rewards':
        return <Rewards />;
      case 'about':
        return <About />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {/* Leaf Micro-animation Backgrounds */}
      <div className="leaf-bg pointer-events-none fixed inset-0 overflow-hidden z-0 opacity-40 dark:opacity-20">
        <div className="leaf leaf-1 absolute top-[15%] left-[8%] text-4xl">🍃</div>
        <div className="leaf leaf-2 absolute bottom-[20%] right-[5%] text-5xl">🌿</div>
        <div className="leaf leaf-3 absolute top-[50%] left-[88%] text-3xl">🌱</div>
      </div>

      <Navbar onOpenAuth={() => setAuthOpen(true)} />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {renderActivePage()}
      </main>

      <Footer />

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}

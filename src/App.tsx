/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ViewState, UserStats } from "./types";
import { Navigation } from "./components/Navigation";
import { Dashboard } from "./views/Dashboard";
import { Factions } from "./views/Factions";
import { Roadmap } from "./views/Roadmap";
import { Tasks } from "./views/Tasks";
import { Profile } from "./views/Profile";
import { Market } from "./views/Market";
import { Events } from "./views/Events";
import { Admin } from "./views/Admin";
import { Login } from "./views/Login";
import { WalletModal } from "./components/WalletModal";
import { Wallet } from "lucide-react";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<'user' | 'admin' | 'manager'>('user');
  const [currentView, setCurrentView] = useState<ViewState>("dashboard");
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const boundsRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState<UserStats>({
    username: "Commander _Zero",
    avatar: "OX",
    balance: 142.55,
    miningPower: 125,
    efficiency: 1.4,
    energy: 65,
    maxEnergy: 100,
    reactorHeat: 30,
    reactorStability: 95,
    reputation: 450,
    activityScore: 1200,
    streak: 4,
    streakMultiplier: 1.4,
    isStreakFrozen: true,
    rank: "Vanguard",
    rankTier: 3,
    xp: 4500,
    nextRankXp: 10000,
    activeDrones: 0,
    lastCheckIn: Date.now() - (40 * 60 * 60 * 1000), // 40 hours ago, simulating an active check-in cycle
    trustScore: 850,
    verified: true,
    securityStatus: 'green',
    isPrime: true,
    primeTier: 'elite'
  });

  const handleLogin = (role: 'user' | 'admin' | 'manager', username: string) => {
     setUserRole(role);
     setStats(prev => ({ ...prev, username }));
     setIsAuthenticated(true);
  };

  const handleLogout = () => {
     setIsAuthenticated(false);
     setCurrentView("dashboard");
  };

  // Simulated live mining
  useEffect(() => {
    if (stats.energy > 0 && stats.reactorHeat < 100) {
      const interval = setInterval(() => {
        setStats((prev) => {
          // Heat increases when mining
          const newHeat = Math.min(100, prev.reactorHeat + 0.1);
          // Stability drops if heat is high
          const newStability = newHeat > 80 ? Math.max(0, prev.reactorStability - 0.2) : Math.min(100, prev.reactorStability + 0.1);
          
          // Effective mining rate depends on power, efficiency, and stability
          const effectiveRate = (prev.miningPower * prev.efficiency * (newStability / 100)) / 3600;

          return {
            ...prev,
            balance: prev.balance + effectiveRate, 
            energy: Math.max(0, prev.energy - 0.2), // Base energy drain
            reactorHeat: newHeat,
            reactorStability: newStability
          };
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [stats.energy, stats.reactorHeat]);

  if (!isAuthenticated) {
     return <Login onLogin={handleLogin} />;
  }

  return (
    <div ref={boundsRef} className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-slate-950">
         {/* Deep space background with subtle grid */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
         
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-600/10 rounded-full blur-[120px] mix-blend-screen" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen" />
         
         {/* Subtle animated scanline */}
         <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] pointer-events-none mix-blend-overlay opacity-30" />
      </div>

      {/* Floating Wallet Button */}
      <motion.div 
        drag
        dragConstraints={boundsRef}
        dragMomentum={false}
        className="fixed top-4 right-4 z-40 touch-none"
      >
        <button 
          onClick={() => setIsWalletOpen(true)}
          className="w-12 h-12 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:scale-105 active:scale-95 transition-all"
        >
          <Wallet size={24} />
        </button>
      </motion.div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full h-full pb-32">
        {currentView === "dashboard" && <Dashboard stats={stats} setStats={setStats} />}
        {currentView === "factions" && <Factions />}
        {currentView === "roadmap" && <Roadmap />}
        {currentView === "tasks" && <Tasks />}
        {currentView === "profile" && <Profile stats={stats} setStats={setStats} onAdminDashboard={() => setCurrentView('admin')} onLogout={handleLogout} userRole={userRole} />}
        {currentView === "market" && <Market stats={stats} />}
        {currentView === "events" && <Events />}
        {currentView === "admin" && <Admin stats={stats} userRole={userRole} />}
      </div>

      <Navigation currentView={currentView} onChange={setCurrentView} isAdmin={userRole === 'admin' || userRole === 'manager'} />
      
      <WalletModal isOpen={isWalletOpen} onClose={() => setIsWalletOpen(false)} balance={stats.balance} />
    </div>
  );
}

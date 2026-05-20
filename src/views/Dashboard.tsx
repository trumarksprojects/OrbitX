import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UserStats } from "../types";
import { Zap, Battery, Trophy, Users, Crosshair, Calendar, X, CheckCircle, Clock } from "lucide-react";

export function Dashboard({ stats, setStats }: { stats: UserStats, setStats: Dispatch<SetStateAction<UserStats>> }) {
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  const ONE_DAY = 24 * 60 * 60 * 1000;
  const TWO_DAYS = 48 * 60 * 60 * 1000;
  
  const lastCheckIn = stats.lastCheckIn || 0;
  const timeSinceLastCheckIn = Date.now() - lastCheckIn;
  const canCheckIn = timeSinceLastCheckIn >= ONE_DAY;

  useEffect(() => {
    const updateTime = () => {
      const last = stats.lastCheckIn || 0;
      const diff = Date.now() - last;
      if (diff >= ONE_DAY) {
        setTimeLeft("");
      } else {
        const remaining = ONE_DAY - diff;
        const h = Math.floor(remaining / (60 * 60 * 1000));
        const m = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
        setTimeLeft(`${h}h ${m}m`);
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [stats.lastCheckIn]);

  useEffect(() => {
    const checkFrozen = () => {
      const last = stats.lastCheckIn || 0;
      const diff = Date.now() - last;
      if (diff >= TWO_DAYS && !stats.isStreakFrozen && last !== 0) {
        setStats(prev => ({ ...prev, isStreakFrozen: true }));
      }
    };
    checkFrozen();
  }, [stats.lastCheckIn, stats.isStreakFrozen, setStats]);

  const handleRevive = () => {
    if (stats.balance >= 10) {
      setStats((prev) => ({
        ...prev,
        balance: prev.balance - 10,
        isStreakFrozen: false,
        lastCheckIn: Date.now() - ONE_DAY // Allow checking in right away
      }));
    }
  };

  const handleCheckIn = () => {
    if (!canCheckIn) return;

    setStats((prev) => {
      const timeSince = Date.now() - (prev.lastCheckIn || 0);
      let newStreak = prev.streak;

      if (timeSince >= TWO_DAYS && prev.lastCheckIn !== 0) {
        // Missed a cycle completely, reset streak
        newStreak = 1;
      } else {
        newStreak = prev.streak + 1;
      }

      return {
        ...prev,
        streak: newStreak,
        lastCheckIn: Date.now(),
        isStreakFrozen: false,
      };
    });
    setIsCheckInOpen(false);
  };

  return (
    <div className="pb-24 pt-16 px-4 max-w-md mx-auto space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div>
           <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              ORBITAL COMMAND
           </h2>
           <div className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> NETWORK ONLINE
           </div>
        </div>
      </div>

      {/* Header Profile */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center bg-slate-900/60 p-2.5 rounded-2xl border border-white/5"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 p-[2px]">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-bold text-white text-xs">
              {stats.avatar}
            </div>
          </div>
          <div>
            <div className="text-white font-bold text-sm opacity-90 leading-tight">{stats.username}</div>
            <div className="text-cyan-400 text-[10px] font-mono tracking-widest uppercase flex items-center gap-2">
              Rank: {stats.rank}
              {stats.activeDrones > 0 && <span className="text-purple-400">({stats.activeDrones} Drones)</span>}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Solar Surge Alert */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, yoyo: Infinity, duration: 2 }}
        className="bg-purple-900/40 border border-purple-500/50 p-3 rounded-2xl flex items-center justify-between"
      >
        <div className="flex items-center gap-2 text-purple-400">
           <Zap size={16} className="fill-purple-500" />
           <span className="text-xs font-bold uppercase tracking-widest">Solar Surge Active</span>
        </div>
        <div className="text-xs font-mono font-bold text-white bg-purple-500/30 px-2 py-1 rounded-lg">
          1.5x YIELD <span className="text-white/50">| 1h 45m left</span>
        </div>
      </motion.div>

      {/* Header / Streak Status */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`flex justify-between items-center p-4 rounded-3xl border ${stats.isStreakFrozen ? 'bg-orange-950/40 border-orange-500/30' : 'bg-slate-900/60 border-white/5'}`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${stats.isStreakFrozen ? 'bg-orange-500/20 text-orange-500' : 'bg-gradient-to-br from-orange-400 to-red-500 text-white'}`}>
            <Zap size={24} className={stats.isStreakFrozen ? 'opacity-50' : 'fill-white opacity-90'} />
          </div>
          <div>
            <div className="text-white font-black text-lg flex items-center gap-2">
              {stats.streak} Day Streak
              {!stats.isStreakFrozen && (
                <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full font-mono border border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                  x{stats.streakMultiplier} Rate
                </span>
              )}
            </div>
            <div className="text-slate-400 text-xs mt-0.5">
              {stats.isStreakFrozen 
                ? <span className="text-orange-400">Streak frozen! You missed a day.</span>
                : 'Log in tomorrow to boost multiplier.'}
            </div>
          </div>
        </div>
        
        {stats.isStreakFrozen && (
          <button 
            onClick={handleRevive}
            className="shrink-0 bg-orange-500 hover:bg-orange-400 text-white text-[10px] uppercase tracking-wider font-bold px-3 py-2 rounded-xl transition-colors shadow-[0_0_15px_rgba(249,115,22,0.3)] text-center leading-tight"
          >
            Revive<br/>(10 ORBX)
          </button>
        )}
      </motion.div>

      {/* Check In CTA */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full flex"
      >
         <button 
           onClick={() => { if (canCheckIn) setIsCheckInOpen(true) }}
           disabled={!canCheckIn}
           className={`w-full bg-slate-900 border ${canCheckIn ? 'border-white/5 hover:border-cyan-500/50' : 'border-white/5 opacity-80 cursor-not-allowed'} p-4 rounded-3xl flex items-center justify-between transition-all`}
         >
           <div className="flex items-center gap-3">
             <div className={`w-10 h-10 rounded-xl ${canCheckIn ? 'bg-cyan-500/10 text-cyan-400' : 'bg-slate-800 text-slate-500'} flex items-center justify-center`}>
               {canCheckIn ? <Calendar size={20} /> : <Clock size={20} />}
             </div>
             <div className="text-left">
                <div className="text-white font-bold tracking-tight">Daily Login</div>
                <div className={`text-[10px] ${canCheckIn ? 'text-slate-400' : 'text-slate-500'} font-mono`}>
                  {canCheckIn ? "Claim today's OXP & rewards" : "Next check-in available soon"}
                </div>
             </div>
           </div>
           {canCheckIn ? (
              <div className="bg-cyan-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:bg-cyan-400">
                Check-In
              </div>
           ) : (
              <div className="bg-slate-800 text-slate-400 font-mono font-bold px-4 py-2 rounded-xl text-xs">
                {timeLeft}
              </div>
           )}
         </button>
      </motion.div>

      {/* Main Mining Reactor */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative aspect-square w-full max-w-[300px] mx-auto flex items-center justify-center"
      >
        {/* Animated Rings */}
        <div className="absolute inset-0 rounded-full border border-cyan-500/20 shadow-[0_0_50px_rgba(34,211,238,0.1)] animate-[spin_10s_linear_infinite]" />
        <div className="absolute inset-4 rounded-full border border-purple-500/30 border-dashed animate-[spin_15s_linear_infinite_reverse]" />
        <div className="absolute inset-8 rounded-full border border-cyan-400/40 opacity-50 animate-[ping_3s_ease-in-out_infinite]" />

        {/* Core Button */}
        <button className="relative z-10 w-44 h-44 rounded-full bg-slate-950 border border-cyan-500 shadow-[0_0_30px_rgba(34,211,238,0.3)] flex flex-col items-center justify-center overflow-hidden group active:scale-95 transition-transform duration-200">
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-cyan-400 text-sm font-mono mb-1">MINING</div>
          <div className="text-4xl font-black text-white tracking-tighter">
            {stats.balance.toFixed(2)}
          </div>
          <div className="text-cyan-200/50 text-xs mt-1 uppercase tracking-widest font-mono">
            ORBX
          </div>
        </button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-4"
      >
        <div className="bg-slate-900/50 p-4 rounded-3xl border border-white/5 space-y-2">
          <div className="flex justify-between items-center">
            <div className="text-slate-400 text-xs flex items-center gap-2">
              <Crosshair size={14} className="text-purple-400" /> Power
            </div>
            <div className="text-xs font-mono text-purple-400">{stats.miningPower} MP</div>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 w-full rounded-full" />
          </div>
          <div className="text-[10px] text-slate-500 leading-tight">
            Efficiency: x{stats.efficiency.toFixed(2)} | Streak Active
          </div>
        </div>

        <div className="bg-slate-900/50 p-4 rounded-3xl border border-white/5 space-y-2">
          <div className="flex justify-between items-center">
            <div className="text-slate-400 text-xs flex items-center gap-2">
              <Battery size={14} className="text-cyan-400" /> Heat
            </div>
            <div className="text-xs font-mono text-cyan-400">{stats.reactorHeat.toFixed(1)}%</div>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div 
               className={`h-full rounded-full transition-all duration-300 ${stats.reactorHeat > 80 ? 'bg-red-500' : stats.reactorHeat > 50 ? 'bg-orange-500' : 'bg-cyan-400'}`}
               style={{ width: `${stats.reactorHeat}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-500 leading-tight">
            Stability: {stats.reactorStability.toFixed(1)}%
          </div>
        </div>
      </motion.div>

      {/* Refuel CTA */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="bg-slate-900 border border-cyan-900/50 p-4 rounded-3xl flex items-center justify-between shadow-[0_0_15px_rgba(34,211,238,0.05)]"
      >
         <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
               <Battery size={20} />
             </div>
             <div>
               <div className="text-sm font-bold text-white tracking-widest uppercase">Cooling Flush</div>
               <div className="text-[10px] text-slate-500">Restore stability & reduce heat</div>
             </div>
         </div>
         <button 
           onClick={() => {
              if (stats.balance >= 5 && stats.reactorHeat > 0) {
                setStats(s => ({...s, balance: Math.max(0, s.balance - 5), reactorHeat: 0, reactorStability: 100}));
              }
           }}
           disabled={stats.balance < 5 || stats.reactorHeat === 0}
           className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(34,211,238,0.4)] flex items-center gap-2"
         >
           <Zap size={14} /> 5 ORBX
         </button>
      </motion.div>

      {/* Quick Missions */}
      <motion.div
         initial={{ y: 20, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ delay: 0.3 }}
      >
        <h3 className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
           <Trophy size={14} /> Active Directives
        </h3>
        <div className="space-y-3">
          {[
            { title: "Recruit 2 Operatives", rw: "1.5x Multiplier", done: 1, total: 2 },
            { title: "Hold Sector 9", rw: "50 ORBX", done: 0, total: 1 },
          ].map((mission, i) => (
             <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 flex-row border border-cyan-900/30">
               <div className="flex flex-col gap-1">
                 <span className="text-sm font-medium text-slate-200">{mission.title}</span>
                 <span className="text-xs text-orange-400 font-mono">Reward: {mission.rw}</span>
               </div>
               <div className="flex text-xs font-mono text-cyan-500">
                  {mission.done} / {mission.total}
               </div>
             </div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {isCheckInOpen && (
           <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
              <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 onClick={() => setIsCheckInOpen(false)}
                 className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              />
              <motion.div
                 initial={{ opacity: 0, scale: 0.95, y: 20 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.95, y: 20 }}
                 className="relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-3xl p-6 overflow-hidden"
              >
                 <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] pointer-events-none" />
                 
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                      <Calendar className="text-cyan-400" /> Standard Cycle
                    </h3>
                    <button onClick={() => setIsCheckInOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                      <X size={20} />
                    </button>
                 </div>

                 <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                   Complete continuous orbital cycles to earn exponential OXP and rare evolution cores. Missed days freeze the multiplier.
                 </p>

                 <div className="grid grid-cols-5 gap-2 mb-6">
                    {Array.from({ length: 30 }).map((_, i) => {
                       const isPast = i < stats.streak;
                       const isToday = i === stats.streak;
                       return (
                         <div 
                           key={i} 
                           className={`aspect-square rounded-xl flex items-center justify-center border relative overflow-hidden ${
                             isPast ? 'bg-cyan-500/10 border-cyan-500/30' : 
                             isToday ? 'bg-orange-500/10 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.2)]' : 
                             'bg-slate-950 border-white/5 opacity-50'
                           }`}
                         >
                           {isPast ? (
                             <CheckCircle size={14} className="text-cyan-400" />
                           ) : (
                             <span className={`text-xs font-mono font-bold ${isToday ? 'text-orange-400' : 'text-slate-500'}`}>{i + 1}</span>
                           )}
                           {isToday && <div className="absolute inset-0 bg-orange-500/5 animate-pulse" />}
                         </div>
                       )
                    })}
                 </div>

                 <button
                    onClick={handleCheckIn}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] relative overflow-hidden"
                 >
                    <div className="absolute inset-0 bg-white/20 hover:opacity-0 transition-opacity" />
                    CONFIRM CHECK-IN
                 </button>
              </motion.div>
           </div>
        )}
      </AnimatePresence>
    </div>
  );
}

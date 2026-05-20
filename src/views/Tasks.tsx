import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Trophy, Clock, Share2, Target, Globe, AlertTriangle, Zap, Star } from "lucide-react";
import { Task } from "../types";

const mockMissions: Task[] = [
  { id: "1", title: "Refuel Reactor 2 times", reward: 5, xpReward: 200, completed: false, type: 'daily', rarity: 'common' },
  { id: "2", title: "Achieve 85% reactor stability", reward: 15, xpReward: 500, energyCost: 5, completed: true, type: 'daily', rarity: 'rare' },
  { id: "3", title: "Retweet OrbitX Dispatch", reward: 10, xpReward: 100, completed: false, type: 'social', rarity: 'common' },
  { id: "4", title: "Survive reactor overload", reward: 250, xpReward: 1500, energyCost: 20, completed: false, type: 'advanced', rarity: 'epic', expiresIn: '2h 15m' },
  { id: "5", title: "Quantum Instability in Sector 9", reward: 500, xpReward: 5000, completed: false, type: 'emergency', rarity: 'legendary', expiresIn: '14m 30s' },
  { id: "6", title: "Defend Orbital Mining Sectors", reward: 100, xpReward: 1000, completed: false, type: 'global', rarity: 'rare', expiresIn: '12h 00m' },
];

export function Tasks() {
  const [activeTab, setActiveTab] = useState<'daily' | 'advanced' | 'emergency' | 'global'>('daily');
  const filteredTasks = mockMissions.filter(t => t.type === activeTab || (activeTab === 'daily' && t.type === 'social')); // Group social into daily for now

  return (
    <div className="pb-24 pt-16 px-4 max-w-md mx-auto space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-black text-white tracking-tight">Mission Hub</h2>
        <div className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-xs font-bold border border-cyan-500/20 flex items-center gap-1">
          <Zap size={12} /> SIGNAL ACTIVE
        </div>
      </div>
      <p className="text-sm text-slate-400 leading-relaxed mb-6">
        Complete orbital directives to earn ORBX, increase your Commander XP, and expand the civilization.
      </p>

      {/* Daily Combo Streak */}
      <div className="bg-slate-900/60 p-4 rounded-3xl border border-white/5 mb-6 shadow-inner">
        <div className="flex justify-between items-end mb-3">
           <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1">
             <Star size={12} className="text-yellow-500" /> Mission Combo
           </div>
           <div className="text-xs font-bold text-yellow-500">Day 4 / 7</div>
        </div>
        <div className="flex gap-2 w-full">
           {[1, 2, 3, 4, 5, 6, 7].map((day) => (
             <div key={day} className={`flex-1 h-2 rounded-full ${day <= 4 ? 'bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.5)]' : 'bg-slate-800'}`} />
           ))}
        </div>
        <div className="text-center mt-3 text-[10px] text-slate-400">Complete 7 days for a <span className="text-yellow-500 font-bold">Rare Loot Crate</span></div>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-slate-900 rounded-2xl border border-white/5 mb-6 overflow-x-auto hide-scrollbar">
        <button 
          onClick={() => setActiveTab('daily')}
          className={`flex-1 py-3 px-2 min-w-[70px] text-[10px] uppercase tracking-widest font-bold rounded-xl transition-all ${activeTab === 'daily' ? 'bg-slate-800 text-white shadow-md border border-white/5' : 'text-slate-500 hover:text-slate-300'}`}
        >
          Daily
        </button>
        <button 
          onClick={() => setActiveTab('advanced')}
          className={`flex-1 py-3 px-2 min-w-[70px] text-[10px] uppercase tracking-widest font-bold rounded-xl transition-all ${activeTab === 'advanced' ? 'bg-slate-800 text-cyan-400 shadow-md border border-cyan-500/20' : 'text-slate-500 hover:text-cyan-500/50'}`}
        >
          Advanced
        </button>
        <button 
          onClick={() => setActiveTab('global')}
          className={`flex-1 py-3 px-2 min-w-[70px] text-[10px] uppercase tracking-widest font-bold rounded-xl flex items-center justify-center gap-1 transition-all ${activeTab === 'global' ? 'bg-orange-500/10 text-orange-400 shadow-md border border-orange-500/20' : 'text-orange-500/50 hover:text-orange-400'}`}
        >
          <Globe size={12} /> Global
        </button>
        <button 
          onClick={() => setActiveTab('emergency')}
          className={`flex-1 py-3 px-2 min-w-[70px] text-[10px] uppercase tracking-widest font-bold rounded-xl flex items-center justify-center gap-1 transition-all ${activeTab === 'emergency' ? 'bg-red-500/10 text-red-500 shadow-md border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'text-red-500/50 hover:text-red-400'}`}
        >
          <AlertTriangle size={12} /> Crisis
        </button>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredTasks.length === 0 ? (
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="text-center py-12 text-slate-500 text-xs font-bold uppercase tracking-widest bg-slate-900/30 rounded-3xl border border-dashed border-white/10"
             >
               No active directives in this sector
             </motion.div>
          ) : (
            filteredTasks.map((task, i) => {
              const borderColors: Record<string, string> = {
                 common: 'border-slate-500/30',
                 rare: 'border-blue-500/50',
                 epic: 'border-purple-500/50',
                 legendary: 'border-orange-500/60 shadow-[0_0_10px_rgba(249,115,22,0.1)]',
                 mythic: 'border-red-500/60 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
              };
              const bgColors: Record<string, string> = {
                 common: 'bg-slate-900/60',
                 rare: 'bg-blue-950/20',
                 epic: 'bg-purple-950/20',
                 legendary: 'bg-orange-950/20',
                 mythic: 'bg-red-950/20'
              };
              const textRarityColors: Record<string, string> = {
                 common: 'text-slate-400',
                 rare: 'text-blue-400',
                 epic: 'text-purple-400',
                 legendary: 'text-orange-400',
                 mythic: 'text-red-500'
              };

              return (
                <motion.div
                  layout
                  key={task.id}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className={`p-4 rounded-[2rem] border flex flex-col gap-4 relative overflow-hidden group ${
                    task.completed 
                      ? 'bg-green-950/20 border-green-500/30' 
                      : `${bgColors[task.rarity]} ${borderColors[task.rarity]}`
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 relative z-10">
                     <div className="flex items-start gap-3">
                      <div className={`mt-0.5 ${task.completed ? 'text-green-500' : task.type === 'global' ? 'text-orange-400' : task.type === 'emergency' ? 'text-red-500' : 'text-cyan-400'}`}>
                        {task.completed ? <CheckCircle2 size={18} /> : (task.type === 'global' ? <Target size={18} /> : task.type === 'emergency' ? <AlertTriangle size={18} /> : <Clock size={18} />)}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[9px] uppercase tracking-widest font-black ${textRarityColors[task.rarity]}`}>
                            {task.rarity} {task.type}
                          </span>
                          {task.expiresIn && !task.completed && (
                            <span className="text-[9px] font-mono bg-slate-950 px-1.5 py-0.5 rounded text-red-400 border border-red-500/20 flex items-center gap-1 shadow-sm">
                               <Clock size={8} /> {task.expiresIn}
                            </span>
                          )}
                        </div>
                        <span className={`text-sm font-bold leading-tight pr-4 ${task.completed ? 'text-slate-500 line-through decoration-slate-600' : 'text-slate-200'}`}>
                          {task.title}
                        </span>
                        
                        <div className="flex items-center gap-3 mt-3">
                            <span className={`text-xs font-mono flex items-center gap-1 font-bold ${task.completed ? 'text-slate-600' : 'text-cyan-400'}`}>
                              <Trophy size={10} /> +{task.reward} ORBX
                            </span>
                            <span className={`text-xs font-mono flex items-center gap-1 font-bold ${task.completed ? 'text-slate-600' : 'text-purple-400'}`}>
                              <Star size={10} /> +{task.xpReward} XP
                            </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {!task.completed && (
                    <button className={`w-full py-3 rounded-xl text-xs font-bold transition-all relative z-10 flex items-center justify-center gap-2 ${
                      task.type === 'emergency' ? 'bg-red-500 hover:bg-red-400 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]' :
                      task.type === 'global' ? 'bg-orange-500 hover:bg-orange-400 text-slate-950 shadow-[0_0_10px_rgba(249,115,22,0.3)]' : 
                      'bg-slate-950 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 shadow-inner'
                    }`}>
                      {task.energyCost && <span className="flex items-center gap-1 text-[10px] bg-black/30 px-1.5 py-0.5 rounded mr-1"><Zap size={10} /> -{task.energyCost} Core</span>}
                      Execute Directive
                    </button>
                  )}
                  {task.completed && <div className="absolute right-[-10px] bottom-[-10px] opacity-10"><CheckCircle2 size={100} /></div>}
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

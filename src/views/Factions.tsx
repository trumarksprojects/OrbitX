import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Users, Target, Zap, Rocket, Crosshair, Cpu, Award } from "lucide-react";
import { Faction, Squad } from "../types";

const mockFactions: Faction[] = [
  { id: "1", name: "Solar Dominion", members: 14205, totalMined: 2500000, color: "bg-yellow-500", theme: "Order & Stability", bonus: "+10% Energy Regen", desc: "For commanders who value discipline, order, and solar energy supremacy." },
  { id: "2", name: "Void Syndicate", members: 12100, totalMined: 1900000, color: "bg-purple-500", theme: "Chaos & Sabotage", bonus: "Rare Loot +5%", desc: "The chaotic rebellion. High-risk, high-reward dark matter extraction." },
  { id: "3", name: "Quantum Union", members: 8900, totalMined: 1200000, color: "bg-cyan-500", theme: "Research & AI", bonus: "+15% Efficiency", desc: "Scientific collective focused on AI optimization and precision." },
  { id: "4", name: "Nova Corps", members: 11000, totalMined: 1500000, color: "bg-red-500", theme: "Military Expansion", bonus: "Combat Event Boosts", desc: "Tactical military organization focused on territory domination." },
];

const mockSquad: Squad = {
  id: "s1",
  name: "Alpha Vanguard",
  level: 4,
  members: 12,
  maxMembers: 30,
  activeMembers: 8,
  synergyMultiplier: 1.15,
  vaultBalance: 24500,
};

export function Factions() {
  const [activeTab, setActiveTab] = useState<'factions' | 'squad'>('factions');

  return (
    <div className="pb-24 pt-16 px-4 max-w-md mx-auto space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-black text-white tracking-tight">Social Command</h2>
        <div className="bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full text-[10px] uppercase font-bold border border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.2)]">
          Season 1 Active
        </div>
      </div>

      <p className="text-sm text-slate-400 leading-relaxed mb-6">
        Join specialized factions and squads to multiply your efficiency and secure orbital resources.
      </p>

      {/* Tabs */}
      <div className="flex p-1 bg-slate-900 rounded-2xl border border-white/5 mb-6 overflow-hidden">
        <button 
           onClick={() => setActiveTab('factions')}
           className={`flex-1 py-3 text-xs uppercase tracking-widest font-bold rounded-xl transition-all ${activeTab === 'factions' ? 'bg-slate-800 text-white shadow-md border border-white/5' : 'text-slate-500 hover:text-slate-300'}`}
        >
          Factions
        </button>
        <button 
           onClick={() => setActiveTab('squad')}
           className={`flex-1 py-3 text-xs uppercase tracking-widest font-bold rounded-xl transition-all ${activeTab === 'squad' ? 'bg-slate-800 text-white shadow-md border border-white/5' : 'text-slate-500 hover:text-slate-300'}`}
        >
          My Squad
        </button>
      </div>

      <AnimatePresence mode="popLayout">
        {activeTab === 'factions' && (
          <motion.div
            key="factions"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            {/* Global Map Preview / Conceptual */}
            <div className="w-full h-32 bg-slate-900 rounded-3xl border border-cyan-500/20 overflow-hidden relative mb-6">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-luminosity" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
               
               <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <div className="text-[10px] text-cyan-400 font-mono mb-1 tracking-widest font-bold">SECTOR 9 CONFLICT</div>
                    <div className="text-lg font-bold text-white leading-tight">Solar Dominion<br/><span className="text-xs text-slate-400 font-normal">Holding majority control (45%)</span></div>
                  </div>
                  <Target size={24} className="text-cyan-400 opacity-80" />
               </div>
            </div>

            <h3 className="text-slate-400 text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 mt-4 mb-2">
               <Shield size={14} /> Global Leaderboard
            </h3>
            
            {mockFactions.map((faction, i) => {
              const borderColors: Record<string, string> = {
                "bg-yellow-500": "border-yellow-500/30",
                "bg-purple-500": "border-purple-500/30",
                "bg-cyan-500": "border-cyan-500/30",
                "bg-red-500": "border-red-500/30"
              };
              const textColors: Record<string, string> = {
                "bg-yellow-500": "text-yellow-500",
                "bg-purple-500": "text-purple-400",
                "bg-cyan-500": "text-cyan-400",
                "bg-red-500": "text-red-400"
              };

              return (
                <motion.div
                  key={faction.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-slate-900/60 p-5 rounded-3xl border border-white/5 relative overflow-hidden group hover:${borderColors[faction.color]} transition-colors`}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${faction.color}`} />
                  
                  <div className="flex justify-between items-start relative z-10 mb-2">
                    <div className="flex flex-col">
                      <span className="font-black text-white text-lg tracking-tight">{faction.name}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${textColors[faction.color]} flex items-center gap-1 mt-0.5`}>
                        {faction.theme}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-mono font-bold ${textColors[faction.color]}`}>
                        {(faction.totalMined / 1000000).toFixed(1)}M ORBX
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-bold">Total Yield</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mb-4 leading-relaxed pr-8">
                    {faction.desc}
                  </p>

                  <div className="flex items-center gap-3">
                     <span className="text-[10px] bg-slate-950 px-2 py-1 flex items-center gap-1 rounded text-white border border-white/10 opacity-80 font-bold tracking-widest uppercase">
                       <Crosshair size={10} className={textColors[faction.color]} /> {faction.bonus}
                     </span>
                     <span className="text-[10px] text-slate-500 flex items-center gap-1 font-bold uppercase tracking-widest">
                       <Users size={10} /> {faction.members.toLocaleString()}
                     </span>
                  </div>

                  <button className="w-full mt-5 bg-slate-950 border border-white/10 hover:border-white/30 text-white text-xs font-bold py-3.5 rounded-[1rem] transition-all shadow-inner relative overflow-hidden flex items-center justify-center gap-2">
                    Join Faction
                  </button>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {activeTab === 'squad' && (
          <motion.div
            key="squad"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
             <div className="bg-slate-900/60 p-6 rounded-[2rem] border border-cyan-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] pointer-events-none" />
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                   <div>
                     <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-1"><Users size={10} /> Squad Command</div>
                     <div className="text-2xl font-black text-white">{mockSquad.name}</div>
                     <div className="text-xs text-slate-400 mt-1">Level {mockSquad.level} Elite Squad</div>
                   </div>
                   <div className="w-12 h-12 bg-slate-950 rounded-2xl border border-white/10 flex items-center justify-center shadow-inner">
                      <Shield className="text-cyan-400" size={24} />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
                   <div className="bg-slate-950 p-4 rounded-[1.5rem] border border-white/5">
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Squad Synergy</div>
                      <div className="text-lg font-mono text-cyan-400 font-bold flex items-center gap-2">
                        +{(mockSquad.synergyMultiplier - 1) * 100}%
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">From active members</div>
                   </div>
                   <div className="bg-slate-950 p-4 rounded-[1.5rem] border border-white/5 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-yellow-500/5 group-hover:bg-yellow-500/10 transition-colors" />
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Squad Vault</div>
                      <div className="text-lg font-mono text-yellow-500 font-bold">
                        {mockSquad.vaultBalance.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-yellow-500/50 mt-1 font-bold">Shared ORBX Reserve</div>
                   </div>
                </div>

                <div className="relative z-10">
                   <div className="flex justify-between items-center mb-2">
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold flex items-center gap-1">
                        <Zap size={10} className={mockSquad.activeMembers >= 5 ? 'text-green-500' : 'text-slate-500'} /> 
                        Active Operatives
                      </div>
                      <div className="text-xs font-mono text-white font-bold">{mockSquad.activeMembers} / {mockSquad.members}</div>
                   </div>
                   <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-white/5">
                      <div className="bg-cyan-500 h-full rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]" style={{ width: `${(mockSquad.activeMembers / mockSquad.members) * 100}%` }} />
                   </div>
                   <div className="text-[10px] text-slate-500 mt-2 italic text-center">
                     Need {Math.max(0, 10 - mockSquad.activeMembers)} more active for Level 2 Synergy (+20%)
                   </div>
                </div>
             </div>

             {/* Cooperative Missions */}
             <div className="space-y-3">
                <h3 className="text-[10px] text-slate-500 uppercase tracking-widest font-bold flex items-center gap-1 ml-1">
                  <Target size={12} /> Active Cooperative Missions
                </h3>
                
                <div className="bg-slate-900/60 p-4 rounded-[1.5rem] border border-orange-500/20 flex flex-col gap-3">
                   <div className="flex items-start justify-between">
                     <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/20 flex flex-col items-center justify-center shrink-0">
                           <Target size={14} className="text-orange-400" />
                        </div>
                        <div>
                          <div className="text-[9px] text-orange-400 font-black uppercase tracking-widest mb-0.5 flex items-center gap-1"><Shield size={8} /> SQUAD RAID</div>
                          <div className="text-sm font-bold text-white leading-tight">Stabilize Planetary Reactor</div>
                        </div>
                     </div>
                   </div>
                   
                   <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-white/5 text-xs text-slate-400 font-mono">
                      <Zap size={12} className="text-cyan-400" /> Goal: 50,000 Energy Contributed
                   </div>
                   
                   <div className="flex items-center justify-between mt-1">
                      <div className="text-[10px] text-slate-500">Progress: <span className="text-white font-bold">24,500</span> / 50,000</div>
                      <div className="text-[10px] font-bold text-orange-400 uppercase">2h 15m remaining</div>
                   </div>

                   <button className="w-full bg-orange-500 hover:bg-orange-400 text-slate-950 py-3 rounded-xl text-xs font-bold transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] flex items-center justify-center gap-2 mt-2">
                      Contribute 100 Energy
                   </button>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

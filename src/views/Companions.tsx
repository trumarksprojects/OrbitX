import { useState } from "react";
import { motion } from "motion/react";
import { Companion } from "../types";
import { Bot, Cpu, Zap, Activity, Navigation, Crosshair, Sparkles } from "lucide-react";

const mockCompanions: Companion[] = [
  {
    id: "c1",
    name: "Extractor Drone V2",
    class: "mining",
    type: "drone",
    rarity: "common",
    level: 4,
    energy: 90,
    maxEnergy: 100,
    passiveAbility: "+5% Mining Output",
    activeAbility: "Resource Ping (Finds rare materials nearby)"
  },
  {
    id: "c2",
    name: "ORA AI Core",
    class: "reactor",
    type: "core",
    rarity: "epic",
    level: 12,
    energy: 250,
    maxEnergy: 300,
    passiveAbility: "Reduces Reactor Heat by 15%",
    activeAbility: "Emergency Cooling Flush"
  },
  {
    id: "c3",
    name: "Void Panther",
    class: "combat",
    type: "synthetic",
    rarity: "legendary",
    level: 8,
    energy: 150,
    maxEnergy: 150,
    passiveAbility: "+12% Faction War Damage",
    activeAbility: "Dark Matter Pulse (Stuns enemy drones)"
  }
];

export function Companions() {
  const [fleet] = useState(mockCompanions);

  return (
    <div className="pb-24 pt-16 px-4 max-w-md mx-auto space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
           <Bot className="text-cyan-400" /> AI Fleet
        </h2>
        <div className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-[10px] uppercase font-bold border border-cyan-500/20">
          3 Actives
        </div>
      </div>

      <p className="text-sm text-slate-400 leading-relaxed mb-6">
        Manage your autonomous companions and AI cores. Upgrade their abilities to maximize your efficiency and sector control.
      </p>

      {/* Fleet Stats Overview */}
      <div className="grid grid-cols-2 gap-3 mb-6">
         <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/5 shadow-inner">
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1 mb-1">
              <Zap size={10} className="text-yellow-500" /> Shared Fleet Power
            </div>
            <div className="text-lg font-mono text-white">490 AI-PWR</div>
         </div>
         <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/5 shadow-inner">
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1 mb-1">
              <Activity size={10} className="text-green-500" /> Synergy Bonus
            </div>
            <div className="text-lg font-mono text-green-400">+17.5%</div>
         </div>
      </div>

      {/* Roster */}
      <div className="space-y-4">
         {fleet.map((comp, i) => {
            const classColors: Record<string, string> = {
              mining: 'text-yellow-500',
              reactor: 'text-cyan-400',
              exploration: 'text-blue-400',
              combat: 'text-red-500',
              utility: 'text-purple-400'
            };
            
            const borderColors: Record<string, string> = {
              common: 'border-slate-500/30',
              rare: 'border-blue-500/40',
              epic: 'border-purple-500/50',
              legendary: 'border-orange-500/60 shadow-[0_0_15px_rgba(249,115,22,0.1)]',
              mythic: 'border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
            };

            const rarityColors: Record<string, string> = {
              common: 'text-slate-400 bg-slate-500/10',
              rare: 'text-blue-400 bg-blue-500/10',
              epic: 'text-purple-400 bg-purple-500/10',
              legendary: 'text-orange-400 bg-orange-500/10',
              mythic: 'text-red-500 bg-red-500/10'
            };

            return (
              <motion.div
                 key={comp.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className={`bg-slate-900/60 p-5 rounded-[2rem] border relative overflow-hidden group ${borderColors[comp.rarity]}`}
              >
                  <div className="flex justify-between items-start mb-4">
                     <div className="flex gap-3">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner bg-slate-950`}>
                           {comp.class === 'mining' && <Activity size={24} className={classColors[comp.class]} />}
                           {comp.class === 'reactor' && <Cpu size={24} className={classColors[comp.class]} />}
                           {comp.class === 'exploration' && <Navigation size={24} className={classColors[comp.class]} />}
                           {comp.class === 'combat' && <Crosshair size={24} className={classColors[comp.class]} />}
                           {comp.class === 'utility' && <Sparkles size={24} className={classColors[comp.class]} />}
                        </div>
                        <div>
                           <div className="flex items-center gap-2 mb-1">
                              <span className={`text-[9px] uppercase font-black tracking-widest px-1.5 py-0.5 rounded ${rarityColors[comp.rarity]}`}>
                                {comp.rarity} {comp.type}
                              </span>
                              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1">
                                Lvl {comp.level}
                              </span>
                           </div>
                           <h3 className="text-base font-bold text-white leading-tight">{comp.name}</h3>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                     <div className="bg-slate-950 p-3 rounded-xl border border-white/5">
                        <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1">Passive</div>
                        <div className="text-xs text-slate-300 font-medium leading-tight">{comp.passiveAbility}</div>
                     </div>
                     <div className="bg-slate-950 p-3 rounded-xl border border-white/5">
                        <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1">Active</div>
                        <div className="text-xs text-cyan-400 font-medium leading-tight">{comp.activeAbility}</div>
                     </div>
                  </div>

                  <div className="flex justify-between items-center bg-slate-950/50 p-2 pl-3 rounded-xl border border-white/5">
                     <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold flex items-center gap-1">
                        <Zap size={10} className="text-cyan-500" /> AI Energy
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                           <div className="h-full bg-cyan-400 rounded-full shadow-[0_0_5px_rgba(34,211,238,0.5)]" style={{ width: `${(comp.energy / comp.maxEnergy) * 100}%` }} />
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">{comp.energy}/{comp.maxEnergy}</span>
                     </div>
                  </div>
              </motion.div>
            )
         })}
      </div>
    </div>
  )
}

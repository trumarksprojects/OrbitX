import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LiveEvent } from "../types";
import { AlertTriangle, Zap, Target, ShieldAlert, Clock, ChevronRight } from "lucide-react";

const mockEvents: LiveEvent[] = [
  {
    id: "e1",
    title: "Quantum Storm in Sector 7",
    type: "emergency",
    theme: "quantum_storm",
    description: "Massive temporal instability detected. Reactors require immediate stabilization to prevent global efficiency drops.",
    expiresIn: "00:14:27",
    participants: 12400,
    rewardPool: "250,000 ORBX",
    isActive: true
  },
  {
    id: "e2",
    title: "Solar Surge: Phase II",
    type: "global",
    theme: "solar_surge",
    description: "A coronal mass ejection is temporarily amplifying energy regeneration rates across all sectors.",
    expiresIn: "2h 45m",
    participants: 34200,
    rewardPool: "+40% Energy Regen",
    isActive: true
  },
  {
    id: "e3",
    title: "Void Syndicate Invasion",
    type: "faction",
    theme: "crisis",
    description: "The Void Syndicate is attempting to hijack primary extractors in the Nova Grid.",
    expiresIn: "11h 20m",
    participants: 8900,
    rewardPool: "Legendary Modules",
    isActive: true
  }
];

export function Events() {
  const [events, setEvents] = useState(mockEvents);

  // Simulate countdown ticking
  useEffect(() => {
    const interval = setInterval(() => {
       setEvents(prev => prev.map(ev => {
         if (ev.expiresIn.includes(':')) {
           const parts = ev.expiresIn.split(':');
           if (parts.length === 3) {
             let h = parseInt(parts[0]);
             let m = parseInt(parts[1]);
             let s = parseInt(parts[2]);
             s--;
             if (s < 0) { s = 59; m--; }
             if (m < 0) { m = 59; h--; }
             if (h < 0) return { ...ev, expiresIn: "EXPIRED", isActive: false };
             return { ...ev, expiresIn: `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}` };
           }
         }
         return ev;
       }))
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pb-24 pt-16 px-4 max-w-md mx-auto space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <AlertTriangle className="text-red-500" /> Sector Alerts
          </h2>
          <div className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-1">Live Threat Feed</div>
        </div>
      </div>

      <p className="text-sm text-slate-400 leading-relaxed mb-6">
        Respond to global crises and orbital events to secure massive reward pools and defend your faction's control fields.
      </p>

      <div className="space-y-4">
        <AnimatePresence>
          {events.map((ev, i) => {
            const isEmergency = ev.type === 'emergency' || ev.type === 'mythic';
            return (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.1 }}
                className={`p-5 rounded-[2rem] border relative overflow-hidden ${
                   isEmergency 
                     ? 'bg-red-950/20 border-red-500/30' 
                     : ev.type === 'global' ? 'bg-orange-950/20 border-orange-500/30' : 'bg-purple-950/20 border-purple-500/30'
                }`}
              >
                {/* Background effects */}
                {isEmergency && <div className="absolute inset-0 bg-red-500/5 animate-pulse mix-blend-screen" />}
                
                <div className="flex justify-between items-start relative z-10 mb-3">
                   <div className="flex flex-col">
                      <div className={`text-[10px] uppercase font-black tracking-widest mb-1 flex items-center gap-1 ${
                         isEmergency ? 'text-red-500' : ev.type === 'global' ? 'text-orange-400' : 'text-purple-400'
                      }`}>
                         {isEmergency ? <AlertTriangle size={10} /> : ev.type === 'global' ? <Zap size={10} /> : <Target size={10} />}
                         {ev.type} EVENT
                      </div>
                      <h3 className="text-lg font-bold text-white leading-tight">{ev.title}</h3>
                   </div>
                   <div className="text-right">
                      {ev.isActive ? (
                         <div className={`text-xs font-mono font-bold flex items-center gap-1 px-2 py-1 rounded bg-black/40 border ${
                           isEmergency ? 'text-red-400 border-red-500/30' : ev.type === 'global' ? 'text-orange-400 border-orange-500/30' : 'text-purple-400 border-purple-500/30'
                         }`}>
                           <Clock size={12} /> {ev.expiresIn}
                         </div>
                      ) : (
                         <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Concluded</div>
                      )}
                   </div>
                </div>

                <p className="text-xs text-slate-400 mb-4 pr-4 leading-relaxed relative z-10">
                  {ev.description}
                </p>

                <div className="grid grid-cols-2 gap-2 mb-4 relative z-10">
                   <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
                      <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-1">Active Operatives</div>
                      <div className="text-sm font-mono text-cyan-400 font-bold">{ev.participants.toLocaleString()}</div>
                   </div>
                   <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
                      <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-1">Total Reward Pool</div>
                      <div className="text-sm font-bold text-yellow-500">{ev.rewardPool}</div>
                   </div>
                </div>

                {ev.isActive && (
                  <button className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 relative z-10 shadow-inner ${
                    isEmergency ? 'bg-red-500 hover:bg-red-400 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 
                    ev.type === 'global' ? 'bg-orange-500 hover:bg-orange-400 text-slate-950 shadow-[0_0_15px_rgba(249,115,22,0.4)]' :
                    'bg-slate-950 border border-purple-500/30 text-purple-400 hover:bg-slate-900'
                  }`}>
                    Join Operation <ChevronRight size={14} />
                  </button>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

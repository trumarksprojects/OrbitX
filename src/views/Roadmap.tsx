import { motion } from "motion/react";
import { CheckCircle2, Circle, Clock } from "lucide-react";

const phases = [
  {
    title: "Phase 1: Genesis Base",
    status: "active", // active, completed, upcoming
    items: ["Core Mining Systems", "Basic Onboarding", "Referral Network", "Daily Directives"]
  },
  {
    title: "Phase 2: Social Economy",
    status: "upcoming",
    items: ["Factions & Squads", "Sector Wars Event", "Cosmetic Marketplace", "Premium AI Assistants"]
  },
  {
    title: "Phase 3: Scarcity & Expansion",
    status: "upcoming",
    items: ["Staking Protocol", "DAO Governance Prep", "Token Burn Mechanics", "Cross-chain Partnerships"]
  },
  {
    title: "Phase 4: Token Generation",
    status: "upcoming",
    items: ["TGE (Token Launch)", "Liquidity Pools", "Airdrop Claim Window", "Post-Launch Utility"]
  }
];

export function Roadmap() {
  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-white tracking-tight">Ecosystem Map</h2>
        <div className="text-xs font-mono text-cyan-400">18-MONTH PLAN</div>
      </div>

      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-purple-500 before:to-slate-800">
        
        {phases.map((phase, i) => (
          <motion.div 
            key={i} 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.15 }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
          >
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-950 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:Math.translate-x-1/2 shadow-[0_0_0_2px_rgba(255,255,255,0.05)] ${phase.status === 'active' ? 'bg-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.5)]' : phase.status === 'completed' ? 'bg-purple-500' : 'bg-slate-800'}`}>
              {phase.status === 'active' ? (
                <ActivityIcon />
              ) : phase.status === 'completed' ? (
                <CheckCircle2 size={16} className="text-white" />
              ) : (
                <Clock size={16} className="text-slate-500" />
              )}
            </div>

            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-3xl bg-slate-900/50 border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <h3 className={`font-bold text-sm ${phase.status === 'active' ? 'text-cyan-400' : 'text-slate-200'}`}>
                  {phase.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {phase.items.map((item, j) => (
                  <li key={j} className="text-xs text-slate-400 flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-slate-600 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}

      </div>
    </div>
  );
}

function ActivityIcon() {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <div className="absolute w-2 h-2 bg-slate-950 rounded-full z-10" />
      <div className="absolute w-4 h-4 bg-white rounded-full animate-ping" />
    </div>
  )
}

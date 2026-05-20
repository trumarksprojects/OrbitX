import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Copy, ShoppingCart, Target, Zap, ShieldAlert, DollarSign, Crown } from "lucide-react";
import { MarketItem, UserStats } from "../types";

const mockMarket: MarketItem[] = [
  { id: "1", name: "Alpha Mining Drone", type: 'drone', price: 500, rarity: 'rare', description: "Automates 10% of reactor refueling per 24 hours." },
  { id: "2", name: "Crimson Reactor Core", type: 'skin', price: 250, rarity: 'common', description: "Cosmetic override: Changes core glow to crimson." },
  { id: "3", name: "OrbitX Premium Pass", type: 'pass', price: 1500, rarity: 'legendary', description: "Unlocks Season 1 premium cosmetic track and ad-free tasks." },
];

const mockUsdtCompanions = [
  { id: "u1", name: "Cyber Pup", type: "companion", price: 2, rarity: "rare", description: "A loyal cybernetic pup. Increases daily OXP gain by 5%." },
  { id: "u2", name: "Astro Fox", type: "companion", price: 5, rarity: "epic", description: "Agile and cunning. Finds hidden resources during sector events." },
  { id: "u3", name: "Void Panther", type: "companion", price: 5, rarity: "legendary", description: "A stealthy apex predator. Increases faction war damage by 10%." }
];

const mockPrimeOptions = [
  { id: "p1", name: "Prime Basic", type: "subscription", price: 4.99, rarity: "rare", description: "30 Days. Entry tier with small boosts, daily energy cap increase, extra missions." },
  { id: "p2", name: "Prime Elite", type: "subscription", price: 14.99, rarity: "epic", description: "30 Days. Mid-tier with elite cosmetics, advanced AI analysis tools, and larger energy reserves." },
  { id: "p3", name: "Prime Mythic", type: "subscription", price: 29.99, rarity: "legendary", description: "30 Days. Mythic visuals, exclusive sectors, and permanent legendary profile status." }
];

export function Market({ stats }: { stats: UserStats }) {
  const [activeTab, setActiveTab] = useState<'orbx' | 'usdt' | 'prime'>('orbx');

  return (
    <div className="pb-24 pt-16 px-4 max-w-md mx-auto space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-black text-white tracking-tight">Hub Market</h2>
        <div className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-[10px] uppercase font-bold border border-purple-500/20">
          Global Trading
        </div>
      </div>
      <p className="text-sm text-slate-400 leading-relaxed mb-6">
        Purchase cosmetics, upgrades, and AI companions. ORBX spent is permanently burned. USDT purchases run on BSC.
      </p>

      {/* Stats summary */}
      <div className="bg-slate-900/60 p-4 rounded-3xl border border-cyan-500/20 flex gap-4">
        <div className="flex-1">
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Available ORBX</div>
          <div className="text-xl font-mono text-cyan-400 mt-1">{stats.balance.toFixed(2)}</div>
        </div>
        <div className="w-px bg-white/10" />
        <div className="flex-1">
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Global Burn</div>
          <div className="text-xl font-mono text-orange-400 mt-1">1.2M</div>
        </div>
      </div>

      <div className="flex p-1 bg-slate-900 rounded-2xl border border-white/5 mb-2 overflow-hidden">
        <button 
           onClick={() => setActiveTab('orbx')}
           className={`flex-1 py-3 text-[10px] uppercase tracking-widest font-bold rounded-xl transition-all ${activeTab === 'orbx' ? 'bg-slate-800 text-cyan-400 shadow-md border border-white/5' : 'text-slate-500 hover:text-slate-300'}`}
        >
          ORBX Core
        </button>
        <button 
           onClick={() => setActiveTab('usdt')}
           className={`flex-1 py-3 text-[10px] uppercase tracking-widest font-bold rounded-xl transition-all ${activeTab === 'usdt' ? 'bg-slate-800 text-green-400 shadow-md border border-white/5' : 'text-slate-500 hover:text-slate-300'}`}
        >
          USDT Store
        </button>
        <button 
           onClick={() => setActiveTab('prime')}
           className={`flex-1 py-3 flex items-center justify-center gap-1 text-[10px] uppercase tracking-widest font-bold rounded-xl transition-all ${activeTab === 'prime' ? 'bg-slate-800 text-purple-400 shadow-md border border-white/5' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <Crown size={12}/> Prime
        </button>
      </div>

      <AnimatePresence mode="popLayout">
        {activeTab === 'orbx' && (
          <motion.div
             key="orbx"
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: 20 }}
             className="space-y-4 pt-2"
          >
            {mockMarket.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`p-4 rounded-[2rem] border relative overflow-hidden group ${item.rarity === 'legendary' ? 'bg-orange-950/20 border-orange-500/30' : item.rarity === 'rare' ? 'bg-purple-950/20 border-purple-500/30' : 'bg-slate-900/60 border-white/5'}`}
              >
                {/* Background flair */}
            {item.rarity === 'legendary' && <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-2xl rounded-full" />}
            {item.rarity === 'rare' && <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-2xl rounded-full" />}
            
            <div className="flex justify-between items-start mb-3 relative z-10">
              <div>
                <h3 className="font-bold text-white text-lg">{item.name}</h3>
                <span className={`text-[10px] uppercase font-bold tracking-widest ${item.rarity === 'legendary' ? 'text-orange-400' : item.rarity === 'rare' ? 'text-purple-400' : 'text-slate-400'}`}>
                  {item.rarity} {item.type}
                </span>
              </div>
              <div className="flex items-center gap-1 bg-slate-950 px-3 py-1.5 rounded-full border border-white/5">
                <span className="font-mono text-cyan-400 text-sm font-bold">{item.price}</span>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 mb-4 relative z-10 max-w-[85%] leading-relaxed">
              {item.description}
            </p>

                <button className={`w-full text-xs font-bold py-3 rounded-xl transition-colors relative z-10 flex items-center justify-center gap-2 ${
                  stats.balance >= item.price 
                    ? (item.rarity === 'legendary' ? 'bg-orange-500 hover:bg-orange-400 text-slate-950' : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950')
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}>
                   <ShoppingCart size={14} /> Buy Now
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'usdt' && (
          <motion.div
             key="usdt"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -20 }}
             className="space-y-4 pt-2"
          >
            <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-2xl flex items-center justify-between mb-4">
               <div>
                  <div className="flex items-center gap-1 text-green-400 font-bold uppercase tracking-widest text-[10px] mb-0.5"><DollarSign size={12}/> BSC NETWORK</div>
                  <div className="text-xs text-slate-300">Purchase Premium AI Pets via USDT (BEP-20)</div>
               </div>
            </div>

            {mockUsdtCompanions.map((pet, i) => {
               const borderColors: Record<string, string> = {
                  rare: 'bg-blue-950/20 border-blue-500/30',
                  epic: 'bg-purple-950/20 border-purple-500/30',
                  legendary: 'bg-orange-950/20 border-orange-500/30',
               };
               const textColors: Record<string, string> = {
                  rare: 'text-blue-400',
                  epic: 'text-purple-400',
                  legendary: 'text-orange-400',
               };

               return (
                  <motion.div
                     key={pet.id}
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: i * 0.1 }}
                     className={`p-4 rounded-[2rem] border relative overflow-hidden group ${borderColors[pet.rarity] || 'bg-slate-900/60 border-white/5'}`}
                  >
                     <div className="flex justify-between items-start mb-3 relative z-10">
                        <div>
                           <h3 className="font-bold text-white text-lg">{pet.name}</h3>
                           <span className={`text-[10px] uppercase font-bold tracking-widest ${textColors[pet.rarity]}`}>
                              {pet.rarity} {pet.type}
                           </span>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-950 px-3 py-1.5 rounded-full border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                           <span className="font-mono text-green-400 text-sm font-bold flex items-center gap-1"><DollarSign size={14}/>{pet.price}</span>
                        </div>
                     </div>
                     
                     <p className="text-xs text-slate-400 mb-4 relative z-10 max-w-[85%] leading-relaxed">
                        {pet.description}
                     </p>

                     <button className="w-full bg-green-500 hover:bg-green-400 text-slate-950 font-black py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] relative z-10 flex items-center justify-center gap-2">
                        <ShoppingCart size={14} /> Buy with USDT
                     </button>
                  </motion.div>
               )
            })}
          </motion.div>
        )}

        {activeTab === 'prime' && (
          <motion.div
             key="prime"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -20 }}
             className="space-y-4 pt-2"
          >
            <div className="bg-purple-500/10 border border-purple-500/20 p-3 rounded-2xl flex items-center justify-between mb-4">
               <div>
                  <div className="flex items-center gap-1 text-purple-400 font-bold uppercase tracking-widest text-[10px] mb-0.5"><Crown size={12}/> ORBITX PRIME</div>
                  <div className="text-xs text-slate-300">Premium monthly membership for elite operatives</div>
               </div>
            </div>

            {mockPrimeOptions.map((prime, i) => {
               const borderColors: Record<string, string> = {
                  rare: 'bg-blue-950/20 border-blue-500/30',
                  epic: 'bg-purple-950/20 border-purple-500/30',
                  legendary: 'bg-orange-950/20 border-orange-500/30',
               };
               const textColors: Record<string, string> = {
                  rare: 'text-blue-400',
                  epic: 'text-purple-400',
                  legendary: 'text-orange-400',
               };

               return (
                  <motion.div
                     key={prime.id}
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: i * 0.1 }}
                     className={`p-4 rounded-[2rem] border relative overflow-hidden group ${borderColors[prime.rarity] || 'bg-slate-900/60 border-white/5'}`}
                  >
                     {prime.rarity === 'legendary' && <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-2xl rounded-full" />}
                     {prime.rarity === 'epic' && <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-2xl rounded-full" />}

                     <div className="flex justify-between items-start mb-3 relative z-10">
                        <div>
                           <h3 className="font-bold text-white text-lg">{prime.name}</h3>
                           <span className={`text-[10px] uppercase font-bold tracking-widest ${textColors[prime.rarity]}`}>
                              {prime.rarity} {prime.type}
                           </span>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-950 px-3 py-1.5 rounded-full border border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.1)]">
                           <span className="font-mono text-purple-400 text-sm font-bold flex items-center gap-1"><DollarSign size={14}/>{prime.price}<span className="text-[10px] text-slate-500">/mo</span></span>
                        </div>
                     </div>
                     
                     <p className="text-xs text-slate-400 mb-4 relative z-10 max-w-[85%] leading-relaxed">
                        {prime.description}
                     </p>

                     <button className="w-full bg-purple-500 hover:bg-purple-400 text-white font-black py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] relative z-10 flex items-center justify-center gap-2">
                        <Crown size={14} /> Subscribe
                     </button>
                  </motion.div>
               )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { motion } from "motion/react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, YAxis } from "recharts";
import { Activity, Flame, Shield, ArrowDownToLine } from "lucide-react";

const emissionData = [
  { month: 'M1', amount: 10000 },
  { month: 'M3', amount: 8500 },
  { month: 'M6', amount: 6000 },
  { month: 'M9', amount: 4200 },
  { month: 'M12', amount: 2500 },
  { month: 'M15', amount: 1200 },
  { month: 'M18', amount: 500 },
];

export function Economics() {
  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-black text-white tracking-tight">Tokenomics</h2>
        <div className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/20">
          ORBX PROTOCOL
        </div>
      </div>

      <div className="bg-slate-900/50 p-5 rounded-3xl border border-cyan-900/30">
        <h3 className="text-sm font-bold text-white mb-1">Controlled Emissions</h3>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          The global mining pool decreases systematically over 18 months to build scarcity ahead of the TGE (Token Generation Event).
        </p>
        
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={emissionData}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                itemStyle={{ color: '#22d3ee', fontSize: '12px', fontWeight: 'bold' }}
                labelStyle={{ color: '#94a3b8', fontSize: '10px' }}
              />
              <Area type="monotone" dataKey="amount" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#colorAmount)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: Flame, title: "Burn Mechanics", desc: "Upgrades & premium skins burn ORBX.", color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/20" },
          { icon: Shield, title: "Anti-Bot Net", desc: "AI behavior analysis protecting yields.", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
          { icon: ArrowDownToLine, title: "Scarcity Lock", desc: "Staking required for governance.", color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20" },
          { icon: Activity, title: "Yield Halving", desc: "Difficulty adjusts dynamically based on DAU.", color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" },
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * i }}
            className={`p-4 rounded-3xl border ${item.border} bg-slate-900/40`}
          >
            <div className={`w-8 h-8 rounded-full ${item.bg} flex items-center justify-center mb-3`}>
              <item.icon size={16} className={item.color} />
            </div>
            <h4 className="text-sm font-bold text-slate-200 mb-1">{item.title}</h4>
            <p className="text-[10px] text-slate-500 leading-tight">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

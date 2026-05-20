import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Users, Zap, AlertTriangle, TrendingUp, Cpu, Server, Lock, Filter, Search, Ban, DollarSign, PlusCircle, Activity, LayoutDashboard, Crown, CalendarClock, User, X } from "lucide-react";
import { UserStats } from "../types";

export function Admin({ stats, userRole }: { stats: UserStats, userRole: string }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'economy' | 'events' | 'infrastructure' | 'staff'>('overview');
  
  // Modals state
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [showAddManagerModal, setShowAddManagerModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [adjustOrbxData, setAdjustOrbxData] = useState<{userId: string} | null>(null);

  const isAdmin = userRole === 'admin';

  return (
    <div className="pb-24 pt-16 px-4 max-w-md mx-auto space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
           <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Shield className="text-purple-500" /> SYSTEM OVERRIDE
           </h2>
           <div className="text-[10px] text-purple-400 font-mono tracking-widest uppercase mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" /> {isAdmin ? "ADMIN" : "MANAGER"} CLEARANCE ACTIVE
           </div>
        </div>
      </div>

      {/* TABS */}
      <div className="flex p-1 bg-slate-900 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar sticky top-4 z-20">
        <button 
           onClick={() => setActiveTab('overview')}
           className={`px-4 py-3 flex-shrink-0 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-widest font-bold rounded-xl transition-all ${activeTab === 'overview' ? 'bg-slate-800 text-purple-400 shadow-md border border-white/5' : 'text-slate-500 hover:text-slate-300'}`}
        >
          Overview
        </button>
        <button 
           onClick={() => setActiveTab('users')}
           className={`px-4 py-3 flex-shrink-0 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-widest font-bold rounded-xl transition-all ${activeTab === 'users' ? 'bg-slate-800 text-purple-400 shadow-md border border-white/5' : 'text-slate-500 hover:text-slate-300'}`}
        >
          Users
        </button>
        <button 
           onClick={() => setActiveTab('economy')}
           className={`px-4 py-3 flex-shrink-0 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-widest font-bold rounded-xl transition-all ${activeTab === 'economy' ? 'bg-slate-800 text-purple-400 shadow-md border border-white/5' : 'text-slate-500 hover:text-slate-300'}`}
        >
          Economy
        </button>
        <button 
           onClick={() => setActiveTab('events')}
           className={`px-4 py-3 flex-shrink-0 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-widest font-bold rounded-xl transition-all ${activeTab === 'events' ? 'bg-slate-800 text-purple-400 shadow-md border border-white/5' : 'text-slate-500 hover:text-slate-300'}`}
        >
          Events
        </button>
        <button 
           onClick={() => setActiveTab('infrastructure')}
           className={`px-4 py-3 flex-shrink-0 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-widest font-bold rounded-xl transition-all ${activeTab === 'infrastructure' ? 'bg-slate-800 text-purple-400 shadow-md border border-white/5' : 'text-slate-500 hover:text-slate-300'}`}
        >
          Infra
        </button>
        {isAdmin && (
           <button 
              onClick={() => setActiveTab('staff')}
              className={`px-4 py-3 flex-shrink-0 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-widest font-bold rounded-xl transition-all ${activeTab === 'staff' ? 'bg-slate-800 text-purple-400 shadow-md border border-white/5' : 'text-slate-500 hover:text-slate-300'}`}
           >
             Staff
           </button>
        )}
      </div>

      <AnimatePresence mode="wait">
      {activeTab === 'overview' && (
        <motion.div
           key="overview"
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: 20 }}
           className="space-y-4 pt-2"
        >
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-slate-900 border border-white/5 p-4 rounded-[2rem]">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1 flex items-center gap-1"><Users size={12}/> Global Active</div>
                <div className="text-2xl font-black text-white">1.2M</div>
                <div className="text-xs text-emerald-400 mt-1 font-bold">+12,500 today</div>
             </div>
             <div className="bg-slate-900 border border-white/5 p-4 rounded-[2rem]">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1 flex items-center gap-1"><Zap size={12}/> Total Mined</div>
                <div className="text-2xl font-black text-white">450M</div>
                <div className="text-xs text-purple-400 mt-1 font-bold">Max: 3.5B</div>
             </div>
          </div>

          <div className="bg-slate-900 border border-white/5 p-5 rounded-[2rem]">
             <h3 className="text-sm font-bold text-white mb-4">Ecosystem Integrity</h3>
             <div className="space-y-4">
                <div>
                   <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Bot Mitigation Confidence</span>
                      <span className="text-emerald-400">98%</span>
                   </div>
                   <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[98%]" />
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Economy Inflation Stress</span>
                      <span className="text-emerald-400">Low (4%)</span>
                   </div>
                   <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[4%]" />
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Server Capacity</span>
                      <span className="text-yellow-400">72%</span>
                   </div>
                   <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 w-[72%]" />
                   </div>
                </div>
             </div>
          </div>
          
          <button className="w-full bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl flex items-center justify-between hover:bg-red-500/20 transition-colors mt-4">
             <div className="flex items-center gap-3">
                <AlertTriangle size={18}/>
                <div className="text-left">
                   <div className="text-sm font-bold">Emergency Lockdown</div>
                   <div className="text-[10px] opacity-80 font-mono">Pause all ecosystem activity</div>
                </div>
             </div>
          </button>
        </motion.div>
      )}

      {activeTab === 'users' && (
        <motion.div
           key="users"
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           className="space-y-4 pt-2"
        >
          <div className="bg-slate-900 border border-white/5 p-4 rounded-3xl">
             <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  type="text" 
                  placeholder="Search user ID or wallet..."
                  className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-purple-500/50 transition-colors text-white placeholder:text-slate-600"
                />
             </div>

             <div className="space-y-3">
                {/* Mock User 1 */}
                <div className="bg-slate-950 rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-colors">
                   <div className="flex justify-between items-start mb-3">
                      <div>
                         <div className="text-sm font-bold text-white mb-0.5">Player_7721</div>
                         <div className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase">Status: Active</div>
                      </div>
                      <div className="text-right">
                         <div className="text-xs font-mono text-cyan-400">12,450 ORBX</div>
                         <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Trust: 95%</div>
                      </div>
                   </div>
                   {isAdmin && (
                      <div className="flex gap-2">
                         <button className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-widest py-2 rounded-lg transition-colors border border-red-500/20 flex items-center justify-center gap-1">
                            <Ban size={12} /> Ban
                         </button>
                         <button onClick={() => setAdjustOrbxData({userId: 'Player_7721'})} className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold uppercase tracking-widest py-2 rounded-lg transition-colors border border-white/5 flex items-center justify-center gap-1">
                            <DollarSign size={12} /> Adjust ORBX
                         </button>
                      </div>
                   )}
                </div>

                {/* Mock User 2 */}
                <div className="bg-slate-950 rounded-2xl p-4 border border-red-500/20 hover:border-red-500/40 transition-colors">
                   <div className="flex justify-between items-start mb-3">
                      <div>
                         <div className="text-sm font-bold text-white mb-0.5">FarmBot_99x</div>
                         <div className="text-[10px] text-red-400 font-mono tracking-widest uppercase">Status: Suspended</div>
                      </div>
                      <div className="text-right">
                         <div className="text-xs font-mono text-cyan-400">450 ORBX</div>
                         <div className="text-[10px] text-red-500 uppercase tracking-widest font-bold">Trust: 12%</div>
                      </div>
                   </div>
                    {isAdmin && (
                      <div className="flex gap-2">
                         <button className="flex-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest py-2 rounded-lg transition-colors border border-emerald-500/20 flex items-center justify-center gap-1">
                            <Shield size={12} /> Unban
                         </button>
                      </div>
                   )}
                </div>
             </div>
          </div>

          <div className="bg-slate-900 border border-white/5 p-5 rounded-[2rem]">
             <h3 className="text-sm font-bold text-white mb-4">Anti-Cheat Engine</h3>
             <div className="space-y-3">
                <div className="bg-slate-950 rounded-xl p-3 flex justify-between items-center border border-white/5">
                  <div className="flex items-center gap-2">
                     <Cpu size={14} className="text-slate-400" />
                     <span className="text-xs font-bold text-white">AI Behavior Analysis</span>
                  </div>
                  <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] rounded uppercase font-bold">Active</span>
                </div>
                <div className="bg-slate-950 rounded-xl p-3 flex justify-between items-center border border-white/5">
                  <div className="flex items-center gap-2">
                     <Lock size={14} className="text-slate-400" />
                     <span className="text-xs font-bold text-white">Device Fingerprinting</span>
                  </div>
                  <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] rounded uppercase font-bold">Strict</span>
                </div>
             </div>
             
             <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex justify-between items-center mb-2">
                   <div className="text-xs text-slate-400 font-bold uppercase">Recent Actions</div>
                </div>
                <div className="text-[10px] text-slate-500 space-y-1 font-mono">
                   <div>&gt; Banned 4,201 bot accounts (Cluster: SA-4)</div>
                   <div>&gt; Flagged 120 suspicious referral chains</div>
                </div>
             </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'economy' && (
        <motion.div
           key="economy"
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           className="space-y-4 pt-2"
        >
          <div className="bg-slate-900 border border-white/5 p-5 rounded-[2rem]">
             <h3 className="text-sm font-bold text-white mb-4">Tokenomics Control</h3>
             
             <div className="space-y-4 mb-6">
                <div>
                   <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Dynamic Emission Target</span>
                      <span className="text-cyan-400">12 ORBX / Hr</span>
                   </div>
                   <input type="range" min="1" max="50" defaultValue="12" disabled={!isAdmin} className="w-full accent-cyan-500 disabled:opacity-50" />
                   <div className="text-[9px] text-slate-500 mt-1 flex items-center justify-between">
                     <span>Adjusting base emission affects global mining rate.</span>
                     {!isAdmin && <span className="text-red-400 ml-2">Admin Only</span>}
                   </div>
                </div>
                
                <div>
                   <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Marketplace Fee Burn %</span>
                      <span className="text-orange-400">2.5%</span>
                   </div>
                   <input type="range" min="0" max="10" step="0.5" defaultValue="2.5" disabled={!isAdmin} className="w-full accent-orange-500 disabled:opacity-50" />
                   <div className="text-[9px] text-slate-500 mt-1 flex items-center justify-between">
                     <span>Fee percentage removed from circulation permanently.</span>
                     {!isAdmin && <span className="text-red-400 ml-2">Admin Only</span>}
                   </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="bg-slate-950 p-2 rounded-xl text-center border border-white/5">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Staking Ratio</div>
                    <div className="text-lg font-mono text-emerald-400">42.5%</div>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-xl text-center border border-white/5">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Burn Rate</div>
                    <div className="text-lg font-mono text-orange-400">1.2M/d</div>
                  </div>
                </div>
             </div>

             <h3 className="text-sm font-bold text-white mb-4 border-t border-white/5 pt-4">Treasury Reserves</h3>
             <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-950 border border-white/5 p-3 rounded-xl">
                   <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Marketing</div>
                   <div className="text-lg font-mono text-white mt-1">100M</div>
                   {isAdmin && <button className="w-full mt-2 bg-slate-800 hover:bg-slate-700 text-[10px] font-bold uppercase tracking-widest py-1 rounded transition-colors text-slate-300">Allocate</button>}
                </div>
                <div className="bg-slate-950 border border-white/5 p-3 rounded-xl">
                   <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Liquidity</div>
                   <div className="text-lg font-mono text-white mt-1">250M</div>
                   {isAdmin && <button className="w-full mt-2 bg-slate-800 hover:bg-slate-700 text-[10px] font-bold uppercase tracking-widest py-1 rounded transition-colors text-slate-300">Allocate</button>}
                </div>
             </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'events' && (
        <motion.div
           key="events"
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           className="space-y-4 pt-2"
        >
          <div className="bg-slate-900 border border-white/5 p-5 rounded-[2rem]">
             <div className="flex items-center justify-between mb-4">
               <h3 className="text-sm font-bold text-white">Live Event Control</h3>
               {isAdmin && (
                  <button onClick={() => setShowNewEventModal(true)} className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                     <PlusCircle size={12} /> New Event
                  </button>
               )}
             </div>

             <div className="space-y-4">
                <div className="bg-slate-950 rounded-2xl p-4 border border-blue-500/30">
                   <div className="flex items-start justify-between mb-2">
                     <div>
                       <div className="flex items-center gap-2 mb-1">
                         <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                         <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Active: Quantum Storm</span>
                       </div>
                       <div className="text-[10px] text-slate-400 font-mono">Ends in 24h 5m</div>
                     </div>
                     <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded">Global multiplier 1.5x</span>
                   </div>
                   
                   {isAdmin && (
                     <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
                       <button className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-widest py-2 rounded-lg transition-colors border border-red-500/20">
                          Force Stop
                       </button>
                       <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold uppercase tracking-widest py-2 rounded-lg transition-colors border border-white/5">
                          Edit Params
                       </button>
                     </div>
                   )}
                </div>

                <div className="bg-slate-950 rounded-2xl p-4 border border-white/5 opacity-70">
                   <div className="flex items-start justify-between mb-2">
                     <div>
                       <div className="flex items-center gap-2 mb-1">
                         <CalendarClock size={12} className="text-slate-400" />
                         <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Scheduled: Syndicate Raid</span>
                       </div>
                       <div className="text-[10px] text-slate-500 font-mono">Starts in 3d 12h</div>
                     </div>
                   </div>
                   
                   {isAdmin && (
                     <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
                       <button className="flex-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest py-2 rounded-lg transition-colors border border-emerald-500/20">
                          Start Early
                       </button>
                     </div>
                   )}
                </div>
             </div>
          </div>
        </motion.div>
      )}
      
      {activeTab === 'infrastructure' && (
        <motion.div
           key="infrastructure"
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           className="space-y-4 pt-2"
        >
          <div className="grid grid-cols-2 gap-4 mb-4">
             <div className="bg-slate-900 border border-white/5 p-4 rounded-[2rem]">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1 flex items-center gap-1"><Activity size={12}/> Server Load</div>
                <div className="text-2xl font-black text-white">72%</div>
                <div className="text-xs text-emerald-400 mt-1 font-bold">Stable</div>
             </div>
             <div className="bg-slate-900 border border-white/5 p-4 rounded-[2rem]">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1 flex items-center gap-1"><Users size={12}/> Active Conns</div>
                <div className="text-2xl font-black text-white">2.4M</div>
                <div className="text-xs text-purple-400 mt-1 font-bold">Peak: 3.1M</div>
             </div>
          </div>

          <div className="bg-slate-900 border border-white/5 p-5 rounded-[2rem]">
             <h3 className="text-sm font-bold text-white mb-4">Server Regions & Status</h3>
             <div className="space-y-2">
                <div className="bg-slate-950 rounded-xl p-3 flex justify-between items-center border border-white/5">
                  <div className="flex items-center gap-2">
                     <Server size={14} className="text-slate-400" />
                     <span className="text-xs font-bold text-white">US-East (Primary)</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] text-slate-400 font-mono">12ms latency</span>
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                </div>
                <div className="bg-slate-950 rounded-xl p-3 flex justify-between items-center border border-white/5">
                  <div className="flex items-center gap-2">
                     <Server size={14} className="text-slate-400" />
                     <span className="text-xs font-bold text-white">EU-Central</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] text-slate-400 font-mono">24ms latency</span>
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                </div>
                <div className="bg-slate-950 rounded-xl p-3 flex justify-between items-center border border-white/5">
                  <div className="flex items-center gap-2">
                     <Server size={14} className="text-slate-400" />
                     <span className="text-xs font-bold text-white">AP-Southeast</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] text-slate-400 font-mono">45ms latency</span>
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                </div>
                <div className="bg-slate-950/50 rounded-xl p-3 flex justify-between items-center border border-white/5 opacity-60">
                  <div className="flex items-center gap-2">
                     <Server size={14} className="text-slate-400" />
                     <span className="text-xs font-bold text-white">SA-East (Backup)</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Standby</span>
                     <div className="w-2 h-2 rounded-full bg-slate-600" />
                  </div>
                </div>
             </div>
          </div>
          
          <button className="w-full bg-slate-900 border border-white/5 p-4 rounded-2xl flex items-center justify-between hover:border-cyan-500/30 transition-colors">
             <div className="flex items-center gap-3">
                <Zap size={18} className="text-cyan-400" />
                <div className="text-left">
                   <div className="text-sm font-bold text-white">Force WebSocket Sync</div>
                   <div className="text-[10px] text-slate-500 font-mono">Resync all connected clients</div>
                </div>
             </div>
          </button>
        </motion.div>
      )}

      {activeTab === 'staff' && isAdmin && (
        <motion.div
           key="staff"
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           className="space-y-4 pt-2"
        >
          <div className="bg-slate-900 border border-white/5 p-5 rounded-[2rem]">
             <div className="flex items-center justify-between mb-4">
               <h3 className="text-sm font-bold text-white">Staff Management</h3>
               <div className="flex gap-2">
                 <button onClick={() => setShowSecurityModal(true)} className="bg-slate-800 text-slate-300 hover:bg-slate-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                     <Lock size={12} /> Security
                 </button>
                 <button onClick={() => setShowAddManagerModal(true)} className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                     <PlusCircle size={12} /> New
                 </button>
               </div>
             </div>

             <div className="text-[10px] font-mono text-slate-400 mb-6 border border-purple-500/20 bg-purple-500/5 px-3 py-2 rounded-lg">
               Managers have limited permissions: Ban/Unban, Read-only Econ & Infra.
             </div>

             <div className="space-y-3">
                <div className="bg-slate-950 rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center">
                         <Shield size={14} />
                      </div>
                      <div>
                         <div className="text-sm font-bold text-white mb-0.5">Commander Admin</div>
                         <div className="text-[10px] text-purple-400 font-mono tracking-widest uppercase">Role: Super Admin</div>
                      </div>
                   </div>
                </div>

                <div className="bg-slate-950 rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center">
                         <User size={14} />
                      </div>
                      <div>
                         <div className="text-sm font-bold text-white mb-0.5">Ops Manager</div>
                         <div className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">Role: Manager</div>
                      </div>
                   </div>
                   <button className="text-[10px] uppercase font-bold tracking-widest text-red-400 hover:text-red-300 transition-colors p-2 bg-red-500/10 rounded-lg">
                      Revoke
                   </button>
                </div>
             </div>
          </div>
        </motion.div>
      )}

      </AnimatePresence>

      <AnimatePresence>
        {showNewEventModal && (
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-sm"
          >
            <motion.div
               initial={{ scale: 0.95 }}
               animate={{ scale: 1 }}
               exit={{ scale: 0.95 }}
               className="bg-slate-900 border border-white/10 p-6 rounded-3xl w-full max-w-sm relative"
            >
              <button 
                onClick={() => setShowNewEventModal(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <h3 className="text-xl font-black text-white mb-6">New Live Event</h3>
              <div className="space-y-4">
                <div>
                   <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Event Title</label>
                   <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-white text-sm outline-none focus:border-purple-500/50" placeholder="e.g. Quantum Storm" />
                </div>
                <div>
                   <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Description</label>
                   <textarea className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-white text-sm outline-none focus:border-purple-500/50 resize-none h-20" placeholder="Event details..."></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Duration (Hrs)</label>
                     <input type="number" className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-white text-sm outline-none focus:border-purple-500/50" placeholder="24" />
                  </div>
                  <div>
                     <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Reward Pool</label>
                     <input type="number" className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-white text-sm outline-none focus:border-purple-500/50" placeholder="100000" />
                  </div>
                </div>
                <div>
                   <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Status</label>
                   <select className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-white text-sm outline-none focus:border-purple-500/50 appearance-none">
                     <option>Active Now</option>
                     <option>Scheduled</option>
                   </select>
                </div>
                <button onClick={() => setShowNewEventModal(false)} className="w-full mt-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black uppercase tracking-wider py-3 rounded-xl transition-all">
                  Deploy Event
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {adjustOrbxData && (
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-sm"
          >
            <motion.div
               initial={{ scale: 0.95 }}
               animate={{ scale: 1 }}
               exit={{ scale: 0.95 }}
               className="bg-slate-900 border border-white/10 p-6 rounded-3xl w-full max-w-sm relative"
            >
              <button 
                onClick={() => setAdjustOrbxData(null)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <h3 className="text-xl font-black text-white mb-1">Adjust ORBX</h3>
              <p className="text-xs text-slate-400 mb-6 font-mono">Target: {adjustOrbxData.userId}</p>
              
              <div className="space-y-4">
                <div>
                   <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Adjustment Amount (+ or -)</label>
                   <input type="number" className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 px-4 text-white text-lg font-mono outline-none focus:border-purple-500/50" placeholder="-1500 or 500" />
                </div>
                <div>
                   <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Audit Reason (Required)</label>
                   <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-white text-sm outline-none focus:border-purple-500/50" placeholder="e.g. Exploit reversal" />
                </div>
                <button onClick={() => setAdjustOrbxData(null)} className="w-full mt-4 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black uppercase tracking-wider py-3 rounded-xl transition-all">
                  Confirm Override
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showAddManagerModal && (
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-sm"
          >
            <motion.div
               initial={{ scale: 0.95 }}
               animate={{ scale: 1 }}
               exit={{ scale: 0.95 }}
               className="bg-slate-900 border border-white/10 p-6 rounded-3xl w-full max-w-sm relative"
            >
              <button 
                onClick={() => setShowAddManagerModal(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <h3 className="text-xl font-black text-white mb-6">Create Staff Account</h3>
              
              <div className="space-y-4">
                <div>
                   <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Username</label>
                   <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-white text-sm outline-none focus:border-purple-500/50" placeholder="e.g. Mod_Alice" />
                </div>
                <div>
                   <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Password</label>
                   <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-white text-sm font-mono outline-none focus:border-purple-500/50" placeholder="Generate secure key..." />
                </div>
                <button onClick={() => setShowAddManagerModal(false)} className="w-full mt-4 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black uppercase tracking-wider py-3 rounded-xl transition-all">
                  Generate Credential
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showSecurityModal && (
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-sm"
          >
            <motion.div
               initial={{ scale: 0.95 }}
               animate={{ scale: 1 }}
               exit={{ scale: 0.95 }}
               className="bg-slate-900 border border-white/10 p-6 rounded-3xl w-full max-w-sm relative"
            >
              <button 
                onClick={() => setShowSecurityModal(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <h3 className="text-xl font-black text-white mb-6">Access Control</h3>
              
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                   <div>
                     <div className="text-sm font-bold text-white mb-0.5">Two-Factor Auth</div>
                     <div className="text-[10px] text-slate-500 font-mono">Enforce for all staff</div>
                   </div>
                   <div className="relative inline-block w-10 h-6">
                     <input type="checkbox" className="peer sr-only" id="tfa" defaultChecked />
                     <label htmlFor="tfa" className="block w-10 h-6 bg-slate-700 rounded-full cursor-pointer peer-checked:bg-emerald-500 transition-colors"></label>
                     <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-4"></div>
                   </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                   <div>
                     <div className="text-sm font-bold text-white mb-0.5">Session Timeout</div>
                     <div className="text-[10px] text-slate-500 font-mono">Auto-logout duration</div>
                   </div>
                   <select className="bg-slate-900 border border-white/10 rounded-lg py-1 px-2 text-white text-xs outline-none">
                     <option>15 mins</option>
                     <option>30 mins</option>
                     <option>1 Hour</option>
                   </select>
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/5">
                   <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-3">Audit Logs</div>
                   <div className="text-[10px] font-mono text-slate-400 space-y-2 max-h-24 overflow-y-auto">
                     <div>[11:04] Manager Bob logged in (IP: 192.168.1.1)</div>
                     <div>[10:45] Admin Alice toggled 2FA</div>
                     <div>[09:12] Manager Bob session timeout</div>
                   </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

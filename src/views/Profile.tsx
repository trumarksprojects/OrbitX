import { useState, Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UserStats } from "../types";
import { Copy, Users, LogOut, Settings, Award, X, Zap, Bot, TrendingUp, User, ShieldCheck, Volume2, Monitor, Bell, Shield } from "lucide-react";
import { Companions } from "./Companions";
import { Economics } from "./Economics";

export function Profile({ stats, setStats, onAdminDashboard, onLogout, userRole }: { stats: UserStats, setStats: Dispatch<SetStateAction<UserStats>>, onAdminDashboard: () => void, onLogout: () => void, userRole?: string }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editForm, setEditForm] = useState({ username: stats.username, avatar: stats.avatar, rank: stats.rank });
  const [activeTab, setActiveTab] = useState<'profile' | 'fleet' | 'economy' | 'security'>('profile');

  const handleSave = () => {
    setStats(prev => ({ ...prev, ...editForm }));
    setIsEditOpen(false);
  };
  return (
    <div className="pb-24 pt-16 px-4 max-w-md mx-auto space-y-6">
      <div className="flex p-1 bg-slate-900 rounded-2xl border border-white/5 overflow-hidden sticky top-4 z-20">
        <button 
           onClick={() => setActiveTab('profile')}
           className={`flex-1 py-3 flex items-center justify-center gap-1.5 text-xs uppercase tracking-widest font-bold rounded-xl transition-all ${activeTab === 'profile' ? 'bg-slate-800 text-cyan-400 shadow-md border border-white/5' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <User size={14}/> ID
        </button>
        <button 
           onClick={() => setActiveTab('fleet')}
           className={`flex-1 py-3 flex items-center justify-center gap-1.5 text-xs uppercase tracking-widest font-bold rounded-xl transition-all ${activeTab === 'fleet' ? 'bg-slate-800 text-cyan-400 shadow-md border border-white/5' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <Bot size={14}/> Fleet
        </button>
        <button 
           onClick={() => setActiveTab('economy')}
           className={`flex-1 py-3 flex items-center justify-center gap-1.5 text-xs uppercase tracking-widest font-bold rounded-xl transition-all ${activeTab === 'economy' ? 'bg-slate-800 text-cyan-400 shadow-md border border-white/5' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <TrendingUp size={14}/> Econ
        </button>
        <button 
           onClick={() => setActiveTab('security')}
           className={`flex-1 py-3 flex items-center justify-center gap-1.5 text-xs uppercase tracking-widest font-bold rounded-xl transition-all ${activeTab === 'security' ? 'bg-slate-800 text-emerald-400 shadow-md border border-white/5' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <ShieldCheck size={14}/> Trust
        </button>
      </div>

      {activeTab === 'profile' && (
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: 20 }}
           className="space-y-6 pt-2"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-white tracking-tight">Operative ID</h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsEditOpen(true)}
                className="text-xs font-bold text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 px-4 py-2 rounded-xl transition-colors border border-cyan-500/20"
              >
                Edit Profile
              </button>
              <button 
                onClick={() => setIsSettingsOpen(true)} 
                className="w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-colors shadow-inner"
              >
                <Settings size={18} />
              </button>
            </div>
          </div>

          {/* Main Identity */}
          <div className="bg-slate-900/60 p-6 rounded-[2rem] border border-cyan-500/20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" />
            
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 p-1 relative z-10">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                <span className="text-2xl font-black text-white">{stats.avatar}</span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-slate-900 border border-cyan-500 flex items-center justify-center text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                <Award size={14} />
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-1">
              <h3 className="text-xl font-bold text-white">{stats.username}</h3>
              {stats.verified && (
                <div className="bg-emerald-500/20 text-emerald-400 p-0.5 rounded-full border border-emerald-500/30">
                  <ShieldCheck size={14} />
                </div>
              )}
            </div>
            {stats.isPrime && (
               <div className="text-[10px] font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 inline-block px-3 py-1 rounded-full border border-purple-500/20 mb-4">
                 OrbitX Prime {stats.primeTier}
               </div>
            )}
            <p className="text-cyan-400 text-sm font-mono uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
              Rank: {stats.rank} <span className="text-white bg-slate-800 px-2 py-0.5 rounded text-xs">Tier {stats.rankTier}</span>
            </p>

            {/* OXP Progression */}
            <div className="mb-6 px-2">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">OXP Progress</span>
                <span className="text-xs font-mono text-cyan-400">{stats.xp.toLocaleString()} / {stats.nextRankXp.toLocaleString()}</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-white/5 relative mb-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats.xp / stats.nextRankXp) * 100}%` }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                />
              </div>
              <div className="text-[9px] text-slate-500 font-mono text-center">
                 {(stats.nextRankXp - stats.xp).toLocaleString()} OXP to Titanium Rank
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 bg-slate-950 py-3 rounded-2xl border border-white/5">
                 <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1 flex items-center justify-center gap-1"><Award size={10} className="text-orange-400" /> Reputation</div>
                 <div className="text-lg font-mono text-white">{stats.reputation}</div>
              </div>
              <div className="flex-1 bg-slate-950 py-3 rounded-2xl border border-white/5">
                 <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1 flex items-center justify-center gap-1"><Zap size={10} className="text-cyan-400" /> Activity Score</div>
                 <div className="text-lg font-mono text-cyan-400">{stats.activityScore}</div>
              </div>
            </div>
          </div>

          {/* Pre-launch Staking */}
          <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 p-5 rounded-3xl border border-orange-500/30 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-32 h-32 bg-orange-500/20 blur-3xl" />
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <div className="text-xs font-bold text-orange-400 uppercase tracking-widest flex items-center gap-2 mb-1">
                   Staking Protocol
                </div>
                <div className="text-[10px] text-slate-300 max-w-[90%] leading-relaxed">
                  Lock ORBX before TGE for a 3x multiplier on final airdrop allocation. Reduces dilution.
                </div>
              </div>
            </div>
            
            <button className="w-full bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold py-3 rounded-xl text-xs transition-colors shadow-[0_0_15px_rgba(249,115,22,0.3)] relative z-10">
              Initialize Lock Contract
            </button>
          </div>

          {/* Referral Program */}
          <div className="bg-purple-900/10 p-5 rounded-3xl border border-purple-500/20 space-y-4">
            <div className="flex items-center gap-3 text-purple-400">
               <Users size={18} />
               <span className="font-bold">Referral Network</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Invite active operatives to increase your base mining rate by 10% per active user.
            </p>

            <div className="flex items-center bg-slate-950 rounded-xl p-1 border border-white/5">
               <div className="flex-1 px-3 text-sm font-mono text-slate-300">
                  ORBX-9A0B2X
               </div>
               <button className="bg-purple-500 hover:bg-purple-400 text-white p-3 rounded-lg transition-colors shadow-lg">
                 <Copy size={16} />
               </button>
            </div>
          </div>
          
          {/* Logout */}
          <button className="w-full flex justify-center items-center gap-2 py-4 text-sm font-bold text-red-400 hover:bg-red-400/10 rounded-2xl transition-colors">
             <LogOut size={16} /> Secure Disconnect
          </button>
        </motion.div>
      )}

      {activeTab === 'fleet' && (
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           className="-mx-4 -mt-16"
        >
          <Companions />
        </motion.div>
      )}

      {activeTab === 'economy' && (
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           className="-mx-4 -mt-16"
        >
          <Economics />
        </motion.div>
      )}

      {activeTab === 'security' && (
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           className="space-y-6 pt-2 pb-10"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black text-white tracking-tight">Trust & Security</h2>
          </div>

          <div className="bg-slate-900 border border-white/5 p-6 rounded-3xl relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 ${stats.securityStatus === 'green' ? 'bg-emerald-500/10' : stats.securityStatus === 'yellow' ? 'bg-yellow-500/10' : 'bg-red-500/10'} blur-2xl rounded-full`} />
            
            <div className="flex justify-between items-center mb-6 relative z-10">
              <div className="flex items-center gap-3">
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stats.securityStatus === 'green' ? 'bg-emerald-500/20 text-emerald-400' : stats.securityStatus === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                    <Users size={24} />
                 </div>
                 <div>
                    <h3 className="font-bold text-white text-lg">Trust Score</h3>
                    <div className="text-[10px] uppercase tracking-widest text-slate-400">Ecosystem Protection</div>
                 </div>
              </div>
              <div className={`text-3xl font-mono font-black ${stats.securityStatus === 'green' ? 'text-emerald-400' : stats.securityStatus === 'yellow' ? 'text-yellow-400' : 'text-red-400'}`}>
                 {stats.trustScore}
              </div>
            </div>

            <div className="space-y-3">
               <div className="bg-slate-950 rounded-xl p-3 flex justify-between items-center border border-white/5">
                 <span className="text-xs font-bold text-slate-400 uppercase">Device Fingerprint</span>
                 <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">Validated <Zap size={10}/></span>
               </div>
               <div className="bg-slate-950 rounded-xl p-3 flex justify-between items-center border border-white/5">
                 <span className="text-xs font-bold text-slate-400 uppercase">Bot/Script Detection</span>
                 <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">Clear <Zap size={10}/></span>
               </div>
               <div className="bg-slate-950 rounded-xl p-3 flex justify-between items-center border border-white/5">
                 <span className="text-xs font-bold text-slate-400 uppercase">Active Referrals</span>
                 <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">Verified <Zap size={10}/></span>
               </div>
            </div>
            
            <p className="text-[10px] text-slate-500 mt-4 leading-relaxed">
               A high trust score grants multiplier bonuses to governance and unlocks Mythic marketplace tiers. OrbitX uses AI behavioral modeling to prevent botting, farming, and referral spam. 
            </p>
          </div>

          <div className="bg-blue-900/10 p-5 rounded-3xl border border-blue-500/20 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">
                   Creator Ambassador
                </div>
                <div className="text-[10px] text-slate-300 max-w-[90%] leading-relaxed mb-3">
                  You have invited {Math.floor((stats.activityScore / 100))} active operatives. Quality referrals grant you Ambassador status and ecosystem payouts.
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-4 bg-slate-950 p-2 rounded-xl">
               <div className="h-2 flex-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[45%]" />
               </div>
               <div className="text-[10px] font-mono text-blue-400">45% to Tier 2</div>
            </div>
          </div>

        </motion.div>
      )}

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditOpen(false)}
              className="fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-[90%] max-w-sm bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Edit Profile</h3>
                <button onClick={() => setIsEditOpen(false)} className="text-slate-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Username</label>
                  <input 
                    type="text" 
                    value={editForm.username}
                    onChange={e => setEditForm({...editForm, username: e.target.value})}
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Avatar Text (2 chars)</label>
                  <input 
                    type="text" 
                    maxLength={2}
                    value={editForm.avatar}
                    onChange={e => setEditForm({...editForm, avatar: e.target.value})}
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-white uppercase focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Preferred Rank</label>
                  <select 
                    value={editForm.rank}
                    onChange={e => setEditForm({...editForm, rank: e.target.value})}
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 appearance-none"
                  >
                    <option value="Vanguard">Vanguard</option>
                    <option value="Elite">Elite</option>
                    <option value="Commander">Commander</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={handleSave}
                className="w-full mt-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 rounded-xl transition-colors"
              >
                Save Changes
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSettingsOpen && (
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
                onClick={() => setIsSettingsOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                 <Settings className="text-cyan-400" size={24} /> System Settings
              </h3>
              
              <div className="space-y-3">
                 <button className="w-full bg-slate-950 border border-white/5 p-4 rounded-2xl flex items-center justify-between hover:border-cyan-500/30 transition-colors">
                    <div className="flex items-center gap-3">
                       <div className="text-slate-400"><Volume2 size={18}/></div>
                       <div className="text-left">
                          <div className="text-sm font-bold text-white">Audio Settings</div>
                          <div className="text-[10px] text-slate-500 font-mono">BGM, SFX, Voice</div>
                       </div>
                    </div>
                 </button>
                 
                 <button className="w-full bg-slate-950 border border-white/5 p-4 rounded-2xl flex items-center justify-between hover:border-cyan-500/30 transition-colors">
                    <div className="flex items-center gap-3">
                       <div className="text-slate-400"><Monitor size={18}/></div>
                       <div className="text-left">
                          <div className="text-sm font-bold text-white">Display & UI</div>
                          <div className="text-[10px] text-slate-500 font-mono">Quality, FPS, Effects</div>
                       </div>
                    </div>
                 </button>

                 <button className="w-full bg-slate-950 border border-white/5 p-4 rounded-2xl flex items-center justify-between hover:border-cyan-500/30 transition-colors">
                    <div className="flex items-center gap-3">
                       <div className="text-slate-400"><Bell size={18}/></div>
                       <div className="text-left">
                          <div className="text-sm font-bold text-white">Notifications</div>
                          <div className="text-[10px] text-slate-500 font-mono">Alerts, Events, News</div>
                       </div>
                    </div>
                 </button>
                 
                 <div className="h-px w-full bg-white/5 my-2" />
                 
                 {(userRole === 'admin' || userRole === 'manager') && (
                   <button 
                      onClick={() => {
                          setIsSettingsOpen(false);
                          onAdminDashboard();
                      }}
                      className="w-full bg-purple-500/10 border border-purple-500/30 p-4 rounded-2xl flex items-center justify-between hover:bg-purple-500/20 transition-colors"
                   >
                      <div className="flex items-center gap-3">
                         <div className="text-purple-400"><Shield size={18}/></div>
                         <div className="text-left">
                            <div className="text-sm font-bold text-purple-400">Admin Console</div>
                            <div className="text-[10px] text-purple-400/70 font-mono">Ecosystem Management</div>
                         </div>
                      </div>
                   </button>
                 )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

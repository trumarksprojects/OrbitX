import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, User, Lock, ArrowRight, Target } from "lucide-react";

export function Login({ onLogin }: { onLogin: (role: 'user' | 'admin' | 'manager', username: string) => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || (!isLogin && !email)) {
      setError("All fields required.");
      return;
    }
    
    // Mock authentication logic
    if (isLogin) {
      if (username === "admin" && password === "admin") {
        onLogin('admin', "Commander Admin");
      } else if (username === "manager" && password === "manager") {
        onLogin('manager', "Ops Manager");
      } else {
        onLogin('user', username);
      }
    } else {
      // Mock registration success
      onLogin('user', username);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute inset-0 pointer-events-none z-0">
         <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-600/10 rounded-full blur-[100px]" />
         <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="w-full max-w-sm relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
             <Target className="text-cyan-400" size={32} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-widest uppercase mb-1">OrbitX</h1>
          <p className="text-xs text-slate-400 uppercase tracking-widest font-mono">Orbital Command Network</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-900/50 backdrop-blur-xl border border-white/5 p-6 rounded-[2rem] shadow-2xl relative">
           <h2 className="text-lg font-bold text-white mb-6">
             {isLogin ? "Authenticate Session" : "Create Link Profile"}
           </h2>
           
           <AnimatePresence>
             {error && (
               <motion.div 
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 exit={{ opacity: 0, height: 0 }}
                 className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-xl mb-4 font-mono flex items-center gap-2"
               >
                 <Shield size={14} /> {error}
               </motion.div>
             )}
           </AnimatePresence>

           <div className="space-y-4">
              <AnimatePresence>
                {!isLogin && (
                  <motion.div
                     initial={{ opacity: 0, height: 0 }}
                     animate={{ opacity: 1, height: 'auto' }}
                     exit={{ opacity: 0, height: 0 }}
                  >
                     <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Comms Address / Email</label>
                     <div className="relative mb-4">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-slate-950 border border-white/10 focus:border-cyan-500/50 rounded-xl py-3 pl-10 pr-4 text-white text-sm outline-none transition-all placeholder:text-slate-600"
                          placeholder="Transmission email..."
                        />
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                 <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Operative ID / Username</label>
                 <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 focus:border-cyan-500/50 rounded-xl py-3 pl-10 pr-4 text-white text-sm outline-none transition-all placeholder:text-slate-600"
                      placeholder="Enter ID..."
                    />
                 </div>
              </div>

              <div>
                 <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Access Code / Password</label>
                 <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 focus:border-cyan-500/50 rounded-xl py-3 pl-10 pr-4 text-white text-sm outline-none transition-all placeholder:text-slate-600"
                      placeholder="••••••••"
                    />
                 </div>
              </div>
           </div>

           <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-wider py-4 rounded-xl mt-6 transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] flex items-center justify-center gap-2">
              {isLogin ? "Initialize Link" : "Register Matrix"} <ArrowRight size={18} />
           </button>
           
           <div className="mt-4 text-center">
             <button 
               type="button" 
               onClick={() => setIsLogin(!isLogin)}
               className="text-cyan-400 hover:text-cyan-300 text-xs font-mono tracking-wider transition-colors"
             >
               {isLogin ? "Request New Operative Link" : "Back to Authorization"}
             </button>
           </div>
           
           {isLogin && (
             <div className="mt-4 pt-4 border-t border-white/5 text-center flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 font-mono">Demo Admin: admin / admin</span>
                <span className="text-[10px] text-slate-500 font-mono">Demo Manager: manager / manager</span>
             </div>
           )}
        </form>
      </motion.div>
    </div>
  );
}

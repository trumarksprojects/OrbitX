import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowDownLeft, ArrowUpRight, Copy, History, Link as LinkIcon, Unlink } from "lucide-react";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
}

export function WalletModal({ isOpen, onClose, balance }: WalletModalProps) {
  const [wallet, setWallet] = useState<{name: string, address: string} | null>(null);

  const handleConnect = (name: string) => {
    setWallet({
      name,
      address: name === 'Phantom' ? 'HN7c...9X1q' : '0x71C...9739'
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-[70] h-[85vh] bg-slate-900 border-t border-cyan-500/30 rounded-t-[2.5rem] p-6 flex flex-col shadow-[0_-20px_50px_rgba(34,211,238,0.1)] max-w-md mx-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8 shrink-0">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Secure Wallet
              </h2>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Balance Card */}
            <div className="shrink-0 bg-gradient-to-br from-cyan-900/40 to-slate-900 p-6 rounded-[2rem] border border-cyan-500/20 relative overflow-hidden mb-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 blur-3xl rounded-full" />
              
              <div className="text-xs text-cyan-400 font-mono tracking-widest uppercase mb-2 relative z-10">
                Available Capital
              </div>
              <div className="text-5xl font-black text-white tracking-tighter mb-1 relative z-10">
                {balance.toFixed(2)}
              </div>
              <div className="text-slate-400 text-sm relative z-10">
                ≈ $0.00 USD (Pre-launch)
              </div>

              <div className="flex gap-3 mt-6 relative z-10">
                <button className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  <ArrowDownLeft size={18} /> Deposit
                </button>
                <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors border border-white/5">
                  <ArrowUpRight size={18} /> Withdraw
                </button>
              </div>
            </div>

            {/* Network Connection */}
            <div className="mb-8 shrink-0">
              <div className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-bold flex items-center justify-between">
                <span>Network Connection (BSC / Polygon)</span>
              </div>
              
              {wallet ? (
                <div className="space-y-3">
                  <div className="flex items-center bg-slate-950 p-4 rounded-2xl border border-cyan-500/20">
                    <div className="flex-1 font-mono text-sm text-slate-300 truncate">
                      {wallet.address}
                    </div>
                    <button className="text-slate-400 hover:text-cyan-400 transition-colors p-1">
                      <Copy size={16} />
                    </button>
                  </div>
                  <button 
                    onClick={() => setWallet(null)}
                    className="w-full flex items-center justify-center gap-2 text-xs font-bold text-slate-500 hover:text-red-400 py-2 transition-colors"
                  >
                    <Unlink size={14} /> Disconnect {wallet.name}
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleConnect('Web3 Wallet')}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-colors border border-white/5 shadow-lg"
                  >
                    <LinkIcon size={18} /> Connect Wallet
                  </button>
                </div>
              )}
            </div>

            {/* Transanction History UI placeholder */}
            <div className="flex-1 min-h-0 flex flex-col">
              <div className="text-xs text-slate-500 uppercase tracking-widest mb-4 font-bold flex items-center gap-2 shrink-0">
                <History size={14} /> Recent Activity
              </div>
              <div className="flex-1 overflow-y-auto no-scrollbar pb-4 space-y-3">
                {[
                  { type: 'Mining Yield', amt: '+14.50', time: '2h ago', color: 'text-cyan-400' },
                  { type: 'Streak Revive', amt: '-10.00', time: '1d ago', color: 'text-red-400' },
                  { type: 'Task Reward', amt: '+25.00', time: '3d ago', color: 'text-cyan-400' },
                ].map((tx, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-slate-800/30 rounded-2xl">
                     <div>
                       <div className="text-sm text-slate-200 font-medium">{tx.type}</div>
                       <div className="text-xs text-slate-500">{tx.time}</div>
                     </div>
                     <div className={`font-mono text-sm ${tx.color}`}>
                       {tx.amt} ORBX
                     </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

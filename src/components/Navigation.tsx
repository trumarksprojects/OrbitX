import { Activity, Shield, TrendingUp, Map, CheckSquare, User, ShoppingCart, Radio, Bot, ShieldAlert } from "lucide-react";
import { ViewState } from "../types";
import { cn } from "../lib/utils";

interface NavigationProps {
  currentView: ViewState;
  onChange: (view: ViewState) => void;
  isAdmin?: boolean;
}

export function Navigation({ currentView, onChange, isAdmin }: NavigationProps) {
  const navItems: { id: ViewState; label: string; icon: any }[] = [
    { id: "dashboard", label: "Core", icon: Activity },
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "factions", label: "Factions", icon: Shield },
    { id: "market", label: "Market", icon: ShoppingCart },
    { id: "profile", label: "Profile", icon: User },
    { id: "events", label: "Events", icon: Radio },
  ];
  
  if (isAdmin) {
    navItems.push({ id: "admin", label: "Admin", icon: ShieldAlert });
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-t border-cyan-500/20 shadow-[0_-10px_40px_rgba(34,211,238,0.05)]">
      <div className="flex justify-between items-center h-20 max-w-md mx-auto px-2 overflow-x-auto no-scrollbar gap-1 custom-scroll">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300",
                isActive
                  ? "text-cyan-400 bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                  : "text-slate-500 hover:text-cyan-200 hover:bg-slate-800"
              )}
            >
              <Icon
                size={22}
                className={cn(
                  "mb-1.5 transition-transform duration-300",
                  isActive && "scale-110"
                )}
              />
              <span className="text-[10px] font-medium tracking-wider uppercase">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Activity, 
  MapPin, 
  TrendingUp, 
  Cpu, 
  Navigation, 
  Sliders, 
  Bot,
  Menu,
  X
} from "lucide-react";
import { PortFlowLogo } from "../common/PortFlowLogo";
import { cn } from "../../utils/cn";

export function TopNav() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Command Center", icon: Activity },
    { to: "/map", label: "Port Map", icon: MapPin },
    { to: "/predictions", label: "Predictions", icon: TrendingUp },
    { to: "/optimization", label: "Optimization", icon: Cpu },
    { to: "/routing", label: "Route Advisor", icon: Navigation },
    { to: "/simulator", label: "Simulator", icon: Sliders },
    { to: "/copilot", label: "Copilot", icon: Bot, isAIBadge: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-subtle font-sans select-none">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        
        {/* Left: Custom Bespoke Logo & Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <NavLink 
            to="/" 
            className="flex items-center gap-2.5 group focus:outline-none"
            onClick={() => setMobileOpen(false)}
          >
            <PortFlowLogo size={32} />
            <span className="font-extrabold text-base tracking-tight text-slate-900">
              PortFlow <span className="text-sky-600">AI</span>
            </span>
          </NavLink>

          <div className="hidden xl:flex items-center gap-2 pl-3 border-l border-slate-200 text-sm text-slate-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-slate-700">Pacific Gateway</span>
            <span>/</span>
            <span>Terminal 01</span>
          </div>
        </div>

        {/* Center: Minimal, Refined Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-[13.5px] font-medium transition-all whitespace-nowrap",
                  isActive
                    ? "bg-slate-100 text-slate-900 font-bold border border-slate-200/80 shadow-subtle"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 stroke-[1.8]",
                    isActive ? "text-slate-900" : "text-slate-400"
                  )}
                />
                <span>{item.label}</span>
                {item.isAIBadge && (
                  <span
                    className={cn(
                      "px-1.5 py-0.5 rounded text-[10px] font-bold font-mono",
                      isActive
                        ? "bg-sky-100 text-sky-800"
                        : "bg-slate-200/70 text-slate-600"
                    )}
                  >
                    BOB
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 shadow-dropdown space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-slate-900 text-white font-bold"
                    : "text-slate-700 hover:bg-slate-100"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.isAIBadge && (
                  <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-sky-100 text-sky-800">
                    BOB RAG
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      )}
    </header>
  );
}

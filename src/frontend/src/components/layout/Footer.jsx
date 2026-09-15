import React from "react";
import { Link } from "react-router-dom";
import { PortFlowLogo } from "../common/PortFlowLogo";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  const quickLinks = [
    { to: "/", label: "Command Center" },
    { to: "/map", label: "Port Map" },
    { to: "/predictions", label: "Predictions" },
    { to: "/optimization", label: "Optimization" },
    { to: "/routing", label: "Route Advisor" },
    { to: "/simulator", label: "Simulator" },
    { to: "/copilot", label: "Copilot" },
  ];

  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-auto font-sans text-sm select-none">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
        
        {/* Top Row: Brand, Calibration Notice & Live Status */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          
          {/* Brand + Context */}
          <div className="flex items-center gap-3">
            <PortFlowLogo size={28} />
            <span className="font-extrabold text-slate-900 text-base tracking-tight shrink-0">
              PortFlow <span className="text-sky-600">AI</span>
            </span>
            <span className="text-slate-300 hidden sm:inline select-none">•</span>
            <div className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Simulated operational data calibrated to real-world port constraints</span>
            </div>
          </div>

          {/* Engine Health Status */}
          <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
            <div className="flex items-center gap-1.5 font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>All Systems Operational</span>
            </div>
            <span className="text-slate-300 hidden md:inline">•</span>
            <span className="font-mono text-slate-600 hidden md:inline font-medium">
              FastAPI + MongoDB Atlas + OR-Tools
            </span>
          </div>

        </div>

        {/* Bottom Row: Attribution, Nav Links & Copyright */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-600">
          
          {/* Hackathon Attribution */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-800 font-semibold">IBM Hackathon</span>
            <span>•</span>
            <span>AI Track</span>
            <span>•</span>
            <span className="font-mono text-slate-700 font-bold">Team: L1 TEAM Y</span>
          </div>

          {/* Minimal Quick Links */}
          <nav className="flex items-center gap-3 sm:gap-5 flex-wrap">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-slate-600 hover:text-slate-950 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <div className="text-slate-500 font-medium">
            © 2026 PortFlow AI
          </div>

        </div>

      </div>
    </footer>
  );
}

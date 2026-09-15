import React from "react";
import { Anchor, Layers, Cpu, Navigation, AlertCircle } from "lucide-react";
import { RiskBadge } from "../common/Badge";
import { cn } from "../../utils/cn";

export function HotspotRow({ hotspot, className = "" }) {
  const typeConfigs = {
    berth: {
      icon: Anchor,
      style: "bg-sky-50 text-sky-800 border-sky-200",
      label: "Berth Quay",
    },
    yard: {
      icon: Layers,
      style: "bg-amber-50 text-amber-800 border-amber-200",
      label: "Yard Stacking",
    },
    crane: {
      icon: Cpu,
      style: "bg-purple-50 text-purple-800 border-purple-200",
      label: "Gantry Crane",
    },
    gate: {
      icon: Navigation,
      style: "bg-emerald-50 text-emerald-800 border-emerald-200",
      label: "Truck Gate",
    },
  };

  const typeConfig = typeConfigs[hotspot.type?.toLowerCase()] || {
    icon: AlertCircle,
    style: "bg-slate-50 text-slate-700 border-slate-200",
    label: hotspot.type || "Facility",
  };

  const Icon = typeConfig.icon;
  const riskPct = Math.round(hotspot.risk * 100);

  return (
    <div
      className={cn(
        "p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-slate-300 transition-all select-none",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2.5">
          <div className={cn("p-2 rounded-lg border", typeConfig.style)}>
            <Icon className="w-4 h-4 stroke-[2]" />
          </div>
          <div>
            <span className="font-bold text-sm text-slate-900 font-sans block">
              {hotspot.zone}
            </span>
            <span className="text-xs font-mono uppercase text-slate-500 font-semibold">
              {typeConfig.label}
            </span>
          </div>
        </div>

        <RiskBadge
          level={hotspot.status || (riskPct >= 70 ? "HIGH" : riskPct >= 40 ? "MEDIUM" : "LOW")}
          size="sm"
        />
      </div>

      {/* Progress Bar & Telemetry */}
      <div className="space-y-1.5 mt-2">
        <div className="flex items-center justify-between text-sm font-sans">
          <span className="text-slate-600 font-medium">Risk Score:</span>
          <span className="font-bold text-slate-900 font-mono text-sm">{riskPct}%</span>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              riskPct >= 80
                ? "bg-rose-500"
                : riskPct >= 60
                ? "bg-amber-500"
                : riskPct >= 40
                ? "bg-yellow-500"
                : "bg-emerald-500"
            )}
            style={{ width: `${riskPct}%` }}
          />
        </div>
      </div>

      {/* Diagnostic Detail Footer */}
      <div className="flex items-center justify-between text-xs text-slate-600 mt-2.5 pt-2 border-t border-slate-200/60 font-sans">
        <span className="font-mono">
          {hotspot.expected_extra_queue !== undefined && (
            <span>Queue: +{hotspot.expected_extra_queue} vessels</span>
          )}
          {hotspot.utilization !== undefined && (
            <span>Util: {Math.round(hotspot.utilization * 100)}%</span>
          )}
        </span>
        {hotspot.eta_hours !== undefined && (
          <span className="text-amber-800 font-bold font-mono bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            Impact: ~{hotspot.eta_hours}h
          </span>
        )}
      </div>
    </div>
  );
}

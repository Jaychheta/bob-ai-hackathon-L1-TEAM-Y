import React from "react";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Minus, 
  ShieldCheck, 
  AlertCircle, 
  AlertTriangle, 
  AlertOctagon 
} from "lucide-react";
import { cn } from "../../utils/cn";

export function MetricCard({
  title,
  value,
  unit = "",
  delta,
  deltaText = "vs. 6h prior",
  deltaInvert = false,
  icon: Icon,
  subtext,
  status, // "NORMAL" | "ELEVATED" | "HIGH" | "CRITICAL"
  className = "",
}) {
  const isPositive = delta > 0;
  const isZero = delta === 0 || delta === undefined;

  let trendColor = "text-slate-700 bg-slate-100 border border-slate-200";
  let TrendIcon = Minus;

  if (!isZero) {
    if (isPositive) {
      TrendIcon = ArrowUpRight;
      trendColor = deltaInvert
        ? "text-rose-900 bg-rose-50 border border-rose-300 font-bold"
        : "text-emerald-900 bg-emerald-50 border border-emerald-300 font-bold";
    } else {
      TrendIcon = ArrowDownRight;
      trendColor = deltaInvert
        ? "text-emerald-900 bg-emerald-50 border border-emerald-300 font-bold"
        : "text-rose-900 bg-rose-50 border border-rose-300 font-bold";
    }
  }

  // Status mapping
  const statusConfig = {
    NORMAL: {
      bg: "bg-emerald-50",
      text: "text-emerald-900",
      border: "border-emerald-300",
      icon: ShieldCheck,
      iconColor: "text-emerald-700",
      label: "NORMAL",
    },
    ELEVATED: {
      bg: "bg-amber-50",
      text: "text-amber-950",
      border: "border-amber-300",
      icon: AlertCircle,
      iconColor: "text-amber-700",
      label: "ELEVATED",
    },
    HIGH: {
      bg: "bg-rose-50",
      text: "text-rose-950",
      border: "border-rose-300",
      icon: AlertTriangle,
      iconColor: "text-rose-700",
      label: "HIGH LOAD",
    },
    CRITICAL: {
      bg: "bg-red-50",
      text: "text-red-950",
      border: "border-red-400",
      icon: AlertOctagon,
      iconColor: "text-red-700",
      label: "CRITICAL",
    },
  };

  const statusItem = status ? statusConfig[status.toUpperCase()] : null;
  const StatusIcon = statusItem?.icon;

  return (
    <div
      className={cn(
        "p-5 rounded-xl bg-white border border-slate-200/90 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-sm font-bold text-slate-600 tracking-wide uppercase font-sans">
          {title}
        </span>
        
        <div className="flex items-center gap-1.5">
          {statusItem && (
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-bold tracking-wider border",
                statusItem.bg,
                statusItem.text,
                statusItem.border
              )}
            >
              <StatusIcon className={cn("w-3.5 h-3.5 shrink-0 stroke-[2.2]", statusItem.iconColor)} />
              <span>{statusItem.label}</span>
            </span>
          )}

          {Icon && (
            <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-700">
              <Icon className="w-4 h-4 stroke-[1.8]" />
            </div>
          )}
        </div>
      </div>

      {/* Main Metric Value */}
      <div className="flex items-baseline gap-1.5 mb-3">
        <span className="text-4xl font-extrabold tracking-tight text-slate-900 font-sans">
          {value}
        </span>
        {unit && (
          <span className="text-base font-semibold text-slate-500 font-sans">
            {unit}
          </span>
        )}
      </div>

      {/* Footer / Delta Readout */}
      <div className="flex items-center justify-between text-sm pt-3 border-t border-slate-100">
        {delta !== undefined ? (
          <div className="flex items-center gap-1.5 font-medium">
            <span
              className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-bold",
                trendColor
              )}
            >
              <TrendIcon className="w-3.5 h-3.5 stroke-[2.5]" />
              {isPositive ? `+${delta}` : delta}
              {typeof value === "string" && value.includes("%") ? "%" : ""}
            </span>
            <span className="text-slate-500 text-sm font-sans">
              {deltaText}
            </span>
          </div>
        ) : (
          <span className="text-slate-600 font-sans text-sm">{subtext}</span>
        )}

        {subtext && delta !== undefined && (
          <span className="text-sm font-medium text-slate-600 font-mono hidden sm:inline">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
}

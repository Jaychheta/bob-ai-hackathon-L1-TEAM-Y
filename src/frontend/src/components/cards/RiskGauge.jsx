import React from "react";
import { Clock, TrendingUp } from "lucide-react";
import { RiskBadge } from "../common/Badge";
import { cn } from "../../utils/cn";

export function RiskGauge({
  probability = 0.79,
  riskLevel = "HIGH",
  expectedWaitHours = 14.7,
  peakWindow = "In +18 to +24 hours",
  windows = {
    next_6h: 0.28,
    next_12h: 0.54,
    next_24h: 0.79,
    next_48h: 0.88,
    next_72h: 0.92,
  },
  className = "",
}) {
  const percentage = Math.round(probability * 100);

  // Clean, non-neon colors
  let strokeColor = "#10b981"; // Low (emerald)
  if (percentage >= 70) {
    strokeColor = "#e11d48"; // High / Critical (rose/crimson)
  } else if (percentage >= 40) {
    strokeColor = "#d97706"; // Medium (amber)
  }

  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const arcLength = (circumference * 240) / 360;
  const strokeDashoffset = arcLength - (arcLength * percentage) / 100;

  return (
    <div
      className={cn(
        "p-6 rounded-xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-sans tracking-tight">
            Congestion Risk Forecast
          </h3>
          <p className="text-sm text-slate-500 font-sans mt-0.5">
            Composite terminal bottleneck probability index
          </p>
        </div>
        <RiskBadge level={riskLevel} size="lg" />
      </div>

      {/* Center Gauge */}
      <div className="flex flex-col items-center justify-center my-4 relative">
        <div className="relative w-48 h-40 flex items-center justify-center">
          <svg
            className="w-48 h-48 transform -rotate-[210deg] overflow-visible"
            viewBox="0 0 200 200"
          >
            {/* Background Arc */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="12"
              strokeDasharray={`${arcLength} ${circumference}`}
              strokeLinecap="round"
            />
            {/* Clean Progress Arc */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={strokeColor}
              strokeWidth="12"
              strokeDasharray={`${arcLength} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          </svg>

          {/* Data Readout in Center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
            <div className="flex items-baseline">
              <span className="text-5xl font-black tracking-tight text-slate-900 font-sans">
                {percentage}
              </span>
              <span className="text-2xl font-bold text-slate-400 font-sans ml-0.5">
                %
              </span>
            </div>
            <span className="text-xs font-bold tracking-wider uppercase text-slate-500 mt-1">
              RISK INDEX
            </span>
            <div className="flex items-center gap-1.5 text-sm text-amber-900 font-semibold mt-1.5 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              <span>+{expectedWaitHours}h wait</span>
            </div>
          </div>
        </div>

        {/* Peak Severity Notice */}
        <div className="w-full mt-2 py-2.5 px-3.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between text-sm font-sans">
          <span className="text-slate-700 flex items-center gap-1.5 font-medium">
            <TrendingUp className="w-4 h-4 text-rose-600" />
            Projected Peak Severity:
          </span>
          <span className="text-slate-900 font-bold">{peakWindow}</span>
        </div>
      </div>

      {/* Multi-Window Risk Breakdown Strip */}
      <div className="pt-4 border-t border-slate-100">
        <span className="text-sm font-bold text-slate-600 uppercase tracking-wider block mb-2.5">
          Prediction Horizon Breakdown
        </span>
        <div className="grid grid-cols-5 gap-2">
          {Object.entries(windows).map(([windowKey, prob]) => {
            const label = windowKey.replace("next_", "").toUpperCase();
            const pct = Math.round(prob * 100);
            const isHigh = pct >= 70;
            const isMed = pct >= 40 && pct < 70;

            const barColor = isHigh
              ? "bg-rose-500"
              : isMed
              ? "bg-amber-500"
              : "bg-emerald-500";

            return (
              <div
                key={windowKey}
                className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70 text-center"
              >
                <span className="text-xs font-semibold text-slate-600 block mb-0.5">
                  +{label}
                </span>
                <span className="text-sm font-bold text-slate-900 block font-mono">
                  {pct}%
                </span>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all duration-500", barColor)}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

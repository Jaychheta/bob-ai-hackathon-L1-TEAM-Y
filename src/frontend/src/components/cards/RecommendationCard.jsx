import React, { useState } from "react";
import { CheckCircle2, Clock, Sparkles, TrendingDown, ArrowRight } from "lucide-react";
import { PriorityBadge, StatusBadge } from "../common/Badge";
import { cn } from "../../utils/cn";

export function RecommendationCard({
  item,
  onApply,
  isApplied = false,
  className = "",
}) {
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(isApplied || item.status === "applied");

  const handleApply = async () => {
    if (applied || loading) return;
    setLoading(true);
    try {
      if (onApply) {
        await onApply(item.id);
      }
      setApplied(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "p-5 rounded-xl border transition-all flex flex-col justify-between",
        applied
          ? "bg-emerald-50/40 border-emerald-300 shadow-sm"
          : "bg-white border-slate-200/90 shadow-sm hover:border-slate-300",
        className
      )}
    >
      <div>
        {/* Top Meta Strip */}
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <PriorityBadge priority={item.priority} />
            <span className="flex items-center gap-1.5 text-sm font-mono text-slate-500 font-semibold">
              <Clock className="w-4 h-4 text-slate-400" />
              {item.time_window}
            </span>
          </div>

          <StatusBadge status={applied ? "applied" : "pending"} size="sm" />
        </div>

        {/* Action Title */}
        <h4 className="text-base font-bold text-slate-900 tracking-tight mb-2 leading-snug">
          {item.action}
        </h4>

        {/* Justification */}
        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
          {item.reason}
        </p>
      </div>

      {/* Bottom Impact & Action CTA */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
        {/* Expected Impact Badges */}
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          {item.expected_impact?.queue_reduction_pct && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 text-emerald-900 border border-emerald-300 font-bold">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-700" />
              -{item.expected_impact.queue_reduction_pct}% Queue
            </span>
          )}
          {item.expected_impact?.wait_time_reduction_pct && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-sky-50 text-sky-900 border border-sky-300 font-bold">
              <TrendingDown className="w-3.5 h-3.5 text-sky-700" />
              -{item.expected_impact.wait_time_reduction_pct}% Wait
            </span>
          )}
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          disabled={applied || loading}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-sm select-none",
            applied
              ? "bg-slate-100 text-slate-500 border border-slate-200 cursor-default"
              : "bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white"
          )}
        >
          {loading ? (
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Applying...
            </span>
          ) : applied ? (
            <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              Active in Schedule
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              Apply Action
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

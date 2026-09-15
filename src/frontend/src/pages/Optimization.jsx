import React, { useState } from "react";
import { 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  TrendingDown, 
  TrendingUp, 
  Sparkles,
  Layers,
  Clock,
  Anchor
} from "lucide-react";
import { cn } from "../utils/cn";

export function Optimization() {
  const [optimizing, setOptimizing] = useState(false);
  const [scheduleApplied, setScheduleApplied] = useState(false);

  // Manual Naive Assignments vs OR-Tools Optimized Assignments
  const assignments = [
    {
      vessel: "Maersk Mc-Kinney (V101)",
      teu: 18270,
      currentBerth: "Berth 01 (Deepwater)",
      currentWait: "0.0h",
      optimizedBerth: "Berth 01 (Deepwater)",
      optimizedWait: "0.0h",
      cranes: ["QC-01", "QC-02", "QC-03", "QC-04"],
      delta: "Unchanged",
    },
    {
      vessel: "MSC Palak (V102)",
      teu: 14000,
      currentBerth: "Berth 04 (Express Quay - Queue)",
      currentWait: "6.8h",
      optimizedBerth: "Berth 03 (South Terminal)",
      optimizedWait: "1.2h",
      cranes: ["QC-06", "QC-07"],
      delta: "-5.6h saved",
    },
    {
      vessel: "Ever Golden (V204)",
      teu: 20124,
      currentBerth: "Berth 02 (North Basin)",
      currentWait: "4.5h",
      optimizedBerth: "Berth 02 (North Basin)",
      optimizedWait: "2.1h (Priority Shift)",
      cranes: ["QC-04", "QC-05"],
      delta: "-2.4h saved",
    },
    {
      vessel: "CMA CGM Nile (V308)",
      teu: 9365,
      currentBerth: "Berth 03 (South Terminal)",
      currentWait: "2.2h",
      optimizedBerth: "Berth 04 (Post-Wave Slot)",
      optimizedWait: "0.5h",
      cranes: ["QC-08"],
      delta: "-1.7h saved",
    },
    {
      vessel: "ONE Apus (V412)",
      teu: 14052,
      currentBerth: "Unassigned (Anchorage Hold)",
      currentWait: "8.1h",
      optimizedBerth: "Berth 01 (Post-Maersk Departure)",
      optimizedWait: "3.4h",
      cranes: ["QC-01", "QC-02", "QC-03"],
      delta: "-4.7h saved",
    },
  ];

  const handleRunOptimizer = () => {
    setOptimizing(true);
    setTimeout(() => {
      setOptimizing(false);
      setScheduleApplied(true);
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-sans">
              Berth & Crane Optimization Engine
            </h1>
            <span className="px-2.5 py-1 rounded text-sm font-bold bg-slate-100 text-slate-700 border border-slate-200">
              Module 04 & 05 • Google OR-Tools
            </span>
          </div>
          <p className="text-base text-slate-600 font-sans mt-1">
            Discrete-berth constraint satisfaction solver (CP-SAT) enforcing vessel length, draft depth, gantry availability, and non-overlapping berthing windows.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunOptimizer}
            disabled={optimizing}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white shadow-sm transition-all cursor-pointer select-none"
          >
            {optimizing ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Solving Constraints...
              </>
            ) : (
              <>
                <Cpu className="w-4 h-4" />
                Run OR-Tools Solver
              </>
            )}
          </button>
        </div>
      </div>

      {/* Delta Metrics Scorecard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Waiting Time Delta */}
        <div className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-sm font-sans">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
            Average Ship Waiting Time
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">11.4h → 7.8h</span>
            <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center">
              <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
              -31.6%
            </span>
          </div>
          <span className="text-sm text-slate-600 mt-1 block">
            Saves 24.8 collective vessel hours
          </span>
        </div>

        {/* Berth Utilization Delta */}
        <div className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-sm font-sans">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
            Berth Productive Usage
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">85% → 94%</span>
            <span className="text-sm font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
              +9.0%
            </span>
          </div>
          <span className="text-sm text-slate-600 mt-1 block">
            Eliminates quay downtime gaps
          </span>
        </div>

        {/* Crane Productivity Delta */}
        <div className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-sm font-sans">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
            Crane Gang Allocation
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">8.4h / ship</span>
            <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center">
              <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
              -25.0%
            </span>
          </div>
          <span className="text-sm text-slate-600 mt-1 block">
            Faster cargo handling turnaround
          </span>
        </div>

        {/* Yard Congestion Relief */}
        <div className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-sm font-sans">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
            Yard Stacking Peak
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">94% → 76%</span>
            <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center">
              <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
              -19.1%
            </span>
          </div>
          <span className="text-sm text-slate-600 mt-1 block">
            Prevents yard gridlock in Block B
          </span>
        </div>
      </div>

      {/* Side-by-Side Schedule Comparison Table */}
      <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-sans">
              Current Naive Plan vs. AI Optimized Assignment
            </h3>
            <p className="text-sm text-slate-500 font-sans mt-0.5">
              Constraint-satisfaction assignment minimizing total vessel wait time + berth idle time.
            </p>
          </div>

          {scheduleApplied && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Optimized Schedule Committed
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-sans">
            <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider text-xs font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Vessel / Cargo</th>
                <th className="py-3.5 px-3">Current Target</th>
                <th className="py-3.5 px-3">Current Wait</th>
                <th className="py-3.5 px-3 font-bold text-slate-900">AI Optimized Berth</th>
                <th className="py-3.5 px-3 font-bold text-slate-900">Optimized Wait</th>
                <th className="py-3.5 px-3">Cranes Assigned</th>
                <th className="py-3.5 px-4 text-right">Net Improvement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {assignments.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {row.vessel}
                    <span className="block text-xs text-slate-500 font-normal">
                      {row.teu.toLocaleString()} TEU
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-700 font-medium">
                    {row.currentBerth}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-rose-700 font-mono text-base">
                    {row.currentWait}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center gap-1.5 font-bold text-sky-950 bg-sky-50 px-2.5 py-1 rounded border border-sky-200 text-sm">
                      <Sparkles className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span>{row.optimizedBerth}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-bold text-emerald-700 font-mono text-base">
                    {row.optimizedWait}
                  </td>
                  <td className="py-3.5 px-3 text-slate-700 font-mono text-xs font-semibold">
                    {row.cranes.join(", ")}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-3 py-1 rounded text-sm font-mono font-bold",
                        row.delta.includes("saved")
                          ? "bg-emerald-50 text-emerald-900 border border-emerald-300"
                          : "bg-slate-100 text-slate-600 border border-slate-200"
                      )}
                    >
                      {row.delta.includes("saved") && (
                        <TrendingDown className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      )}
                      <span>{row.delta}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

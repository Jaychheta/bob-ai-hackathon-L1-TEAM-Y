import React from "react";
import { 
  TrendingUp, 
  BrainCircuit, 
  Clock, 
  Layers, 
  Database,
  Cpu
} from "lucide-react";
import { CongestionTrendChart } from "../components/charts/CongestionTrendChart";
import { RiskMatrixTable } from "../components/charts/RiskMatrixTable";
import { RiskBadge } from "../components/common/Badge";
import predictionsMock from "../mocks/predictions.json";

export function Predictions() {
  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-sans">
              AI Congestion Forecast & Temporal Heatmap
            </h1>
            <span className="px-2.5 py-1 rounded text-sm font-bold bg-slate-100 text-slate-700 border border-slate-200">
              Module 01 & 02
            </span>
          </div>
          <p className="text-base text-slate-600 font-sans mt-1">
            Multi-horizon predictive modeling (6h, 12h, 24h, 48h, 72h) calibrated to terminal berthing constraints and historical trends.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <RiskBadge level={predictionsMock.risk_level} size="lg" />
        </div>
      </div>

      {/* Model Benchmark Accuracy Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-sm font-sans">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-500">
              XGBoost ROC-AUC
            </span>
            <BrainCircuit className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">0.942</div>
          <span className="text-sm text-emerald-700 font-semibold block mt-1">Validated on 80/20 chronological split</span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-sm font-sans">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Wait Time RMSE
            </span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">1.18 hrs</div>
          <span className="text-sm text-slate-600 block mt-1">Regressor test set error margin</span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-sm font-sans">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Dataset Calibration
            </span>
            <Database className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">7,000 Rows</div>
          <span className="text-sm text-slate-600 block mt-1">Calibrated operational data</span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-sm font-sans">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Inference Latency
            </span>
            <Cpu className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">&lt; 4.2 ms</div>
          <span className="text-sm text-emerald-700 font-semibold block mt-1">FastAPI C-accelerated model</span>
        </div>
      </div>

      {/* Row 1 — 72-Hour Congestion Trajectory Chart */}
      <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-sans flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sky-600" />
              72-Hour Congestion Risk Trajectory
            </h3>
            <p className="text-sm text-slate-500 font-sans mt-0.5">
              Forecasted probability of terminal congestion exceeding operational queue thresholds over 72 hours.
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm font-sans">
            <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
              <span className="w-3.5 h-1.5 bg-sky-600 rounded-full" />
              Predicted Congestion Probability (%)
            </span>
            <span className="flex items-center gap-1.5 text-rose-700 font-semibold">
              <span className="w-3.5 h-1 border-t-2 border-dashed border-rose-500" />
              Critical Boundary Threshold (75%)
            </span>
          </div>
        </div>

        <CongestionTrendChart height={280} />
      </div>

      {/* Row 2 — Spatial Hotspots Across Time Horizons Table */}
      <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-sans flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-600" />
              Spatial Bottleneck Heatmap Across Time Windows
            </h3>
            <p className="text-sm text-slate-500 font-sans mt-0.5">
              Breakdown of individual berths, gantry crane groups, yard stacking zones, and truck gates across expanding windows.
            </p>
          </div>
        </div>

        <RiskMatrixTable />
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Ship, 
  Anchor, 
  Layers, 
  Cpu, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  Clock
} from "lucide-react";
import { MetricCard } from "../components/cards/MetricCard";
import { RiskGauge } from "../components/cards/RiskGauge";
import { RecommendationCard } from "../components/cards/RecommendationCard";
import { HotspotRow } from "../components/cards/HotspotRow";
import portStatusMock from "../mocks/portStatus.json";
import predictionsMock from "../mocks/predictions.json";
import hotspotsMock from "../mocks/hotspots.json";
import planMock from "../mocks/plan72h.json";

export function CommandCenter() {
  const [planItems, setPlanItems] = useState(planMock);
  const [toastMessage, setToastMessage] = useState(null);

  const handleApplyAction = (id) => {
    setPlanItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "applied" } : item
      )
    );
    const appliedItem = planItems.find((i) => i.id === id);
    setToastMessage(`Action confirmed in active schedule: ${appliedItem?.action}`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 text-white text-xs font-sans shadow-dropdown border border-slate-700">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-sans">
              Command Center
            </h1>
            <span className="px-2.5 py-1 rounded text-sm font-bold bg-slate-100 text-slate-700 border border-slate-200">
              Terminal 01
            </span>
          </div>
          <p className="text-base text-slate-600 font-sans mt-1">
            Real-time terminal operations telemetry, predictive congestion forecasting, and 72-hour automated interventions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/copilot"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100 active:bg-sky-200 transition-colors shadow-subtle select-none cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span>Consult Copilot</span>
          </Link>
          <Link
            to="/optimization"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white shadow-subtle transition-colors select-none cursor-pointer"
          >
            <span>OR-Tools Optimization</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Row 1 — Live Metric Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Ships Waiting in Queue"
          value={portStatusMock.ships_waiting}
          delta={portStatusMock.ships_waiting_delta}
          deltaInvert={true}
          deltaText="vs. 6h prior"
          icon={Ship}
          status="HIGH"
          subtext={`Avg Queue Delay: ${portStatusMock.average_wait_time_h}h`}
        />
        <MetricCard
          title="Berth Quay Occupancy"
          value={`${Math.round(portStatusMock.berth_utilization * 100)}%`}
          delta={Math.round(portStatusMock.berth_utilization_delta * 100)}
          deltaInvert={true}
          icon={Anchor}
          status="HIGH"
          subtext={`${portStatusMock.active_berths_count} of ${portStatusMock.total_berths_count} active`}
        />
        <MetricCard
          title="Container Yard Capacity"
          value={`${Math.round(portStatusMock.yard_utilization * 100)}%`}
          delta={Math.round(portStatusMock.yard_utilization_delta * 100)}
          deltaInvert={true}
          icon={Layers}
          status="ELEVATED"
          subtext="Reefer Block B: 94%"
        />
        <MetricCard
          title="Crane Fleet Utilization"
          value={`${Math.round(portStatusMock.crane_load * 100)}%`}
          delta={Math.round(portStatusMock.crane_load_delta * 100)}
          icon={Cpu}
          status="CRITICAL"
          subtext={`${portStatusMock.active_cranes_count} of ${portStatusMock.total_cranes_count} operational`}
        />
      </div>

      {/* Row 2 — Congestion Risk Gauge & Hotspots */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Risk Radar Gauge (Left 7 Cols) */}
        <div className="lg:col-span-7">
          <RiskGauge
            probability={predictionsMock.congestion_probability.next_24h}
            riskLevel={predictionsMock.risk_level}
            expectedWaitHours={predictionsMock.expected_waiting_time_hours}
            peakWindow={predictionsMock.peak_congestion_window}
            windows={predictionsMock.congestion_probability}
          />
        </div>

        {/* Bottleneck Hotspots (Right 5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-sans tracking-tight">
                  Active Bottleneck Hotspots
                </h3>
                <p className="text-sm text-slate-500 font-sans mt-0.5">
                  Ranked by spatial risk pressure
                </p>
              </div>
              <span className="text-sm font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                5 Monitored
              </span>
            </div>

            <div className="space-y-2.5">
              {hotspotsMock.slice(0, 4).map((hotspot) => (
                <HotspotRow key={hotspot.zone} hotspot={hotspot} />
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-sm font-sans">
            <span className="text-slate-500">View complete geospatial layout</span>
            <Link to="/map" className="text-sky-700 font-bold hover:text-sky-800 flex items-center gap-1">
              Live Map View <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Row 3 — Prioritized 72-Hour Operations Plan */}
      <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-5">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-sans">
              Prioritized 72-Hour Operations Plan
            </h3>
            <p className="text-sm text-slate-500 font-sans mt-0.5">
              Multi-horizon operational directives combining Congestion Prediction, Hotspot Detection, and OR-Tools scheduling.
            </p>
          </div>

          <span className="text-sm font-semibold text-slate-600 bg-slate-50 px-3.5 py-1.5 rounded-md border border-slate-200">
            Sorted by Risk Severity × Action Urgency
          </span>
        </div>

        {/* 3 Actionable Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {planItems.slice(0, 3).map((item) => (
            <RecommendationCard
              key={item.id}
              item={item}
              onApply={handleApplyAction}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

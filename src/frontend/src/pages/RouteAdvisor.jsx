import React, { useState } from "react";
import { 
  Navigation, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  ArrowRight,
  Ship
} from "lucide-react";
import { RiskBadge } from "../components/common/Badge";
import { cn } from "../utils/cn";
import vesselsMock from "../mocks/vessels.json";

const routeAdvisorData = {
  V102: {
    vessel: "MSC Palak (V102)",
    imo: "IMO 9735206",
    currentBerth: "Berth-04",
    recommended: "Berth-03",
    reason: "Lowest expected total turnaround time (26h vs 32h at current target). Berth 03 depth safely accommodates 15.2m draft requirement with zero queue delay.",
    hoursSaved: 6.0,
    options: [
      {
        option: "Berth-04 (Current Target)",
        risk: "HIGH",
        eta_h: 14,
        port_delay_h: 18,
        handling_h: 8.0,
        total_h: 40,
        notes: "Heavy gantry queue; 2 Post-Panamax container ships ahead.",
        isCurrent: true,
      },
      {
        option: "Berth-02 (North Basin)",
        risk: "MEDIUM",
        eta_h: 15,
        port_delay_h: 9,
        handling_h: 8.0,
        total_h: 32,
        notes: "Requires waiting for Ever Golden departure.",
      },
      {
        option: "Berth-03 (South Terminal)",
        risk: "LOW",
        eta_h: 16,
        port_delay_h: 2,
        handling_h: 8.0,
        total_h: 26,
        notes: "Quay is clear; 2 gantry cranes pre-positioned.",
        isRecommended: true,
      },
    ],
  },
  V204: {
    vessel: "Ever Golden (V204)",
    imo: "IMO 9811000",
    currentBerth: "Berth-02",
    recommended: "Berth-02",
    reason: "Current berth allocation remains optimal. Alternates do not exceed the >2.0h improvement threshold required for transit diversion.",
    hoursSaved: 0.0,
    options: [
      {
        option: "Berth-02 (Current Target)",
        risk: "MEDIUM",
        eta_h: 15,
        port_delay_h: 4.5,
        handling_h: 10.0,
        total_h: 29.5,
        notes: "Acceptable turn window; priority shift applied.",
        isCurrent: true,
        isRecommended: true,
      },
      {
        option: "Berth-01 (Deepwater)",
        risk: "LOW",
        eta_h: 18,
        port_delay_h: 2.0,
        handling_h: 9.0,
        total_h: 29.0,
        notes: "Transit diversion saves only 0.5h (below 2h threshold).",
      },
    ],
  },
};

export function RouteAdvisor() {
  const [selectedVesselId, setSelectedVesselId] = useState("V102");
  const [activeAdvisory, setActiveAdvisory] = useState(routeAdvisorData["V102"]);
  const [diverted, setDiverted] = useState(false);

  const handleVesselChange = (id) => {
    setSelectedVesselId(id);
    setActiveAdvisory(routeAdvisorData[id] || routeAdvisorData["V102"]);
    setDiverted(false);
  };

  const handleApplyDivert = () => {
    setDiverted(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-sans">
              Dynamic Route & Berth Advisor
            </h1>
            <span className="px-2.5 py-1 rounded text-sm font-bold bg-slate-100 text-slate-700 border border-slate-200">
              Module 03
            </span>
          </div>
          <p className="text-base text-slate-600 font-sans mt-1">
            Evaluates candidate berthing options and recommends transit diversion only when turnaround savings exceed the 2.0-hour threshold.
          </p>
        </div>

        {/* Vessel Picker */}
        <div className="flex items-center gap-2.5 text-sm font-sans">
          <span className="text-slate-600 font-medium">Select Inbound Vessel:</span>
          <select
            value={selectedVesselId}
            onChange={(e) => handleVesselChange(e.target.value)}
            className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 shadow-subtle focus:outline-none focus:border-slate-400 cursor-pointer font-semibold text-sm"
          >
            {vesselsMock.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} ({v.id})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Advisory Recommendation Hero Banner */}
      {activeAdvisory && (
        <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-sky-50 text-sky-900 text-sm font-bold border border-sky-200">
                <Sparkles className="w-4 h-4 text-sky-600" />
                Recommended Action: Assign to {activeAdvisory.recommended}
              </span>
              {activeAdvisory.hoursSaved > 0 && (
                <span className="px-3 py-1.5 rounded-md text-sm font-bold bg-emerald-50 text-emerald-900 border border-emerald-300">
                  +{activeAdvisory.hoursSaved} Hours Saved
                </span>
              )}
            </div>

            <button
              onClick={handleApplyDivert}
              disabled={diverted}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer shadow-sm select-none",
                diverted
                  ? "bg-slate-100 text-slate-500 border border-slate-200 cursor-default"
                  : "bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white"
              )}
            >
              {diverted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Diversion Order Confirmed
                </>
              ) : (
                <>
                  <span>Confirm Vessel Diversion</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <p className="text-base text-slate-700 leading-relaxed font-sans font-medium">
            {activeAdvisory.reason}
          </p>
        </div>
      )}

      {/* Route Options Comparison Cards */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
          Evaluated Berthing Alternatives (Total Time = Transit Time + Queue Delay + Handling Duration)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {activeAdvisory?.options.map((option, idx) => (
            <div
              key={idx}
              className={cn(
                "p-6 rounded-xl border transition-all flex flex-col justify-between",
                option.isRecommended
                  ? "bg-white border-sky-400 ring-2 ring-sky-100 shadow-sm"
                  : "bg-white border-slate-200/90 shadow-sm"
              )}
            >
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-slate-900 text-base">
                      {option.option}
                    </span>
                    {option.isRecommended && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        RECOMMENDED
                      </span>
                    )}
                    {option.isCurrent && !option.isRecommended && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        CURRENT TARGET
                      </span>
                    )}
                  </div>
                  <RiskBadge level={option.risk} size="sm" />
                </div>

                {/* Total Time Headline */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-black text-slate-900 font-mono">
                      {option.total_h}
                    </span>
                    <span className="text-base font-semibold text-slate-500">hours total</span>
                  </div>
                  {option.isRecommended && (
                    <span className="text-sm font-bold text-emerald-700 block mt-0.5">
                      ✓ Optimal Turnaround Option
                    </span>
                  )}
                  {option.isCurrent && !option.isRecommended && (
                    <span className="text-sm font-bold text-rose-700 block mt-0.5">
                      ⚠ Suboptimal Congestion Delay
                    </span>
                  )}
                </div>

                {/* Time Breakdown Matrix */}
                <div className="space-y-2.5 py-3.5 border-y border-slate-100 text-sm font-sans">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Transit ETA Window:</span>
                    <span className="text-slate-900 font-bold font-mono">{option.eta_h}h</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Projected Berth Wait:</span>
                    <span className={cn("font-bold font-mono", option.port_delay_h > 10 ? "text-rose-700" : "text-amber-700")}>
                      +{option.port_delay_h}h
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Crane Unload Duration:</span>
                    <span className="text-slate-900 font-bold font-mono">{option.handling_h}h</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <p className="text-sm text-slate-600 mt-3.5 italic">
                {option.notes}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

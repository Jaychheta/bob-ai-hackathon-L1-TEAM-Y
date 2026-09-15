import React, { useState } from "react";
import { 
  Sliders, 
  AlertTriangle, 
  ArrowRight,
  Sparkles,
  ShieldAlert,
  Wrench,
  Ship,
  Flame,
  AlertOctagon,
  Layers
} from "lucide-react";
import { RiskBadge } from "../components/common/Badge";
import { cn } from "../utils/cn";

const scenarioData = {
  crane_failure: {
    name: "Crane QC-03 Mechanical Failure",
    badge: "Equipment Downtime",
    severity: "HIGH",
    description: "Quay Crane QC-03 at Berth 04 experiences emergency hoist failure, reducing berth container offloading capacity by 50%.",
    before: {
      shipsWaiting: 7,
      avgWaitTime: 11.4,
      berthUtil: 85,
      congestionRisk: 79,
      yardUtil: 78,
    },
    after: {
      shipsWaiting: 11,
      avgWaitTime: 18.2,
      berthUtil: 96,
      congestionRisk: 93,
      yardUtil: 84,
    },
    recoveryActions: [
      {
        step: 1,
        action: "Mobilize mobile gantry crane MC-01 to Berth 04 to restore 60% handling throughput.",
        impact: "Reduces expected queue buildup by 4.2 hours.",
      },
      {
        step: 2,
        action: "Divert inbound vessel MSC Palak (V102) to Berth 03 South Basin immediately.",
        impact: "Prevents 8-hour gridlock at Berth 04.",
      },
      {
        step: 3,
        action: "Notify technical maintenance team to initiate thermal overhaul protocol on QC-03.",
        impact: "Target repair completion window: 14 hours.",
      },
    ],
  },
  surge_10: {
    name: "+10 Vessels Arrival Surge",
    badge: "Traffic Influx",
    severity: "HIGH",
    description: "Regional weather clearing injects 10 unscheduled feeder vessels within an accelerated 24-hour arrival window.",
    before: {
      shipsWaiting: 7,
      avgWaitTime: 11.4,
      berthUtil: 85,
      congestionRisk: 79,
      yardUtil: 78,
    },
    after: {
      shipsWaiting: 17,
      avgWaitTime: 22.5,
      berthUtil: 100,
      congestionRisk: 96,
      yardUtil: 91,
    },
    recoveryActions: [
      {
        step: 1,
        action: "Open Emergency Anchorage Holding Zones 4 & 5 with designated bunker resupply tugs.",
        impact: "Safely organizes holding queue without blocking navigation channel.",
      },
      {
        step: 2,
        action: "Enact priority berth sequencing: offload highest-velocity container vessels first.",
        impact: "Maximizes berth throughput turnover by 22%.",
      },
      {
        step: 3,
        action: "Trigger 24/7 continuous yard gate intake with 4 additional truck lane inspections.",
        impact: "Prevents yard container dwell bottleneck.",
      },
    ],
  },
  surge_20: {
    name: "+20 Vessels Crisis Influx",
    badge: "Severe Surge",
    severity: "CRITICAL",
    description: "Major maritime canal bottleneck clearance delivers 20 vessels simultaneously to terminal approaches.",
    before: {
      shipsWaiting: 7,
      avgWaitTime: 11.4,
      berthUtil: 85,
      congestionRisk: 79,
      yardUtil: 78,
    },
    after: {
      shipsWaiting: 27,
      avgWaitTime: 34.0,
      berthUtil: 100,
      congestionRisk: 99,
      yardUtil: 98,
    },
    recoveryActions: [
      {
        step: 1,
        action: "Invoke Port Master Emergency Contingency Order: activate outer offshore standby buoys.",
        impact: "Absorbs 15 container ships safely outside main fairway channel.",
      },
      {
        step: 2,
        action: "Re-assign secondary bulk berths B5 & B6 for emergency container offloading.",
        impact: "Unlocks 4,000 TEU/day supplementary handling capacity.",
      },
      {
        step: 3,
        action: "Mobilize auxiliary maritime pilots for round-the-clock docking shifts.",
        impact: "Cuts pilotage queue wait time by 45%.",
      },
    ],
  },
  berth_closure: {
    name: "Berth B2 Emergency Structural Closure",
    badge: "Quay Closure",
    severity: "HIGH",
    description: "Quay wall sensor detects 18mm displacement, forcing immediate berthing suspension at Berth 02 for geotechnical dive inspection.",
    before: {
      shipsWaiting: 7,
      avgWaitTime: 11.4,
      berthUtil: 85,
      congestionRisk: 79,
      yardUtil: 78,
    },
    after: {
      shipsWaiting: 12,
      avgWaitTime: 19.5,
      berthUtil: 100,
      congestionRisk: 94,
      yardUtil: 86,
    },
    recoveryActions: [
      {
        step: 1,
        action: "Divert Ever Golden (V204) to Berth 01 immediately after Maersk departure window.",
        impact: "Avoids 12-hour anchorage stall.",
      },
      {
        step: 2,
        action: "Relocate Berth 02 gantry cranes QC-04 & QC-05 to Berths 01 & 03 to boost dual-crane productivity.",
        impact: "Increases remaining berths crane handling rate by 35%.",
      },
    ],
  },
  yard_minus_20: {
    name: "Yard Capacity -20% Ground Failure",
    badge: "Stacking Reduction",
    severity: "MEDIUM",
    description: "Pavement subsidence in Yard Block B closes 3 container bays, reducing total terminal storage volume by 20%.",
    before: {
      shipsWaiting: 7,
      avgWaitTime: 11.4,
      berthUtil: 85,
      congestionRisk: 79,
      yardUtil: 78,
    },
    after: {
      shipsWaiting: 9,
      avgWaitTime: 15.2,
      berthUtil: 88,
      congestionRisk: 87,
      yardUtil: 97,
    },
    recoveryActions: [
      {
        step: 1,
        action: "Activate off-dock dry port intermodal rail transfer to evacuate 800 TEU per 12 hours.",
        impact: "Prevents yard saturation lockdown.",
      },
    ],
  },
  weather_delay: {
    name: "Weather & Monsoon Delay (+12h)",
    badge: "Weather Disruption",
    severity: "MEDIUM",
    description: "Sustained 45-knot tropical squalls require suspending high-boom quay crane operations for 12 hours.",
    before: {
      shipsWaiting: 7,
      avgWaitTime: 11.4,
      berthUtil: 85,
      congestionRisk: 79,
      yardUtil: 78,
    },
    after: {
      shipsWaiting: 14,
      avgWaitTime: 21.0,
      berthUtil: 75,
      congestionRisk: 89,
      yardUtil: 82,
    },
    recoveryActions: [
      {
        step: 1,
        action: "Order cranes boomed down and locked into storm pins.",
        impact: "Guarantees zero equipment structural damage.",
      },
      {
        step: 2,
        action: "Pre-stage tug fleet for rapid synchronized docking once wind subsides below 25 knots.",
        impact: "Reduces post-storm berthing delay by 3.5 hours.",
      },
    ],
  },
};

export function Simulator() {
  const [selectedScenarioKey, setSelectedScenarioKey] = useState("crane_failure");
  const scenario = scenarioData[selectedScenarioKey];

  const scenariosList = [
    { key: "crane_failure", label: "Crane QC-03 Offline", icon: Wrench, severity: "HIGH" },
    { key: "surge_10", label: "+10 Vessels Surge", icon: Ship, severity: "HIGH" },
    { key: "surge_20", label: "+20 Vessels Crisis Influx", icon: Flame, severity: "CRITICAL" },
    { key: "berth_closure", label: "Berth B2 Closure", icon: AlertOctagon, severity: "HIGH" },
    { key: "yard_minus_20", label: "Yard Capacity -20%", icon: Layers, severity: "MEDIUM" },
    { key: "weather_delay", label: "Weather Delay (+12h)", icon: AlertTriangle, severity: "MEDIUM" },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-sans">
              What-If Crisis Simulation Sandbox
            </h1>
            <span className="px-2.5 py-1 rounded text-sm font-bold bg-slate-100 text-slate-700 border border-slate-200">
              Stress Testing Engine
            </span>
          </div>
          <p className="text-base text-slate-600 font-sans mt-1">
            Simulate operational disruptions in-memory without altering persistent database records. Computes cascading queue deltas & recovery protocols.
          </p>
        </div>
      </div>

      {/* Scenario Selector Chips */}
      <div className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-sm">
        <span className="text-sm font-bold uppercase tracking-wider text-slate-500 block mb-3">
          Select Disruption Scenario:
        </span>
        <div className="flex flex-wrap gap-2.5">
          {scenariosList.map((s) => {
            const Icon = s.icon;
            const isSelected = selectedScenarioKey === s.key;
            return (
              <button
                key={s.key}
                onClick={() => setSelectedScenarioKey(s.key)}
                className={cn(
                  "flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer select-none border",
                  isSelected
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm font-bold"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border-slate-200"
                )}
              >
                <Icon className={cn("w-4 h-4 stroke-[2]", isSelected ? "text-white" : "text-slate-500")} />
                <span>{s.label}</span>
                <span
                  className={cn(
                    "text-xs font-mono px-1.5 py-0.5 rounded font-bold uppercase",
                    isSelected
                      ? "bg-slate-800 text-white"
                      : s.severity === "CRITICAL"
                      ? "bg-red-100 text-red-800"
                      : s.severity === "HIGH"
                      ? "bg-rose-100 text-rose-800"
                      : "bg-amber-100 text-amber-800"
                  )}
                >
                  {s.severity}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Scenario Title & Description */}
      <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-sm">
        <div className="flex items-center gap-2.5 mb-2">
          <RiskBadge level={scenario.severity} size="sm" />
          <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
            {scenario.badge}
          </span>
          <h2 className="text-xl font-bold text-slate-900 font-sans">
            {scenario.name}
          </h2>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed font-sans">
          {scenario.description}
        </p>
      </div>

      {/* Before vs After Impact Metric Matrix */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
          Impact Telemetry Comparison (Baseline vs. Injected Disruption)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
          {/* Ships Waiting */}
          <div className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-sm">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              Ships Waiting Queue
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-lg text-slate-500 font-mono">{scenario.before.shipsWaiting}</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
              <span className="text-3xl sm:text-4xl font-black text-rose-700 font-mono">{scenario.after.shipsWaiting}</span>
            </div>
            <span className="text-sm text-rose-700 font-bold block mt-1">
              +{scenario.after.shipsWaiting - scenario.before.shipsWaiting} vessels in holding queue
            </span>
          </div>

          {/* Average Wait Time */}
          <div className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-sm">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              Avg Vessel Wait Time
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-lg text-slate-500 font-mono">{scenario.before.avgWaitTime}h</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
              <span className="text-3xl sm:text-4xl font-black text-rose-700 font-mono">{scenario.after.avgWaitTime}h</span>
            </div>
            <span className="text-sm text-rose-700 font-bold block mt-1">
              +{(scenario.after.avgWaitTime - scenario.before.avgWaitTime).toFixed(1)}h added delay
            </span>
          </div>

          {/* Berth Utilization */}
          <div className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-sm">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              Berth Capacity Load
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-lg text-slate-500 font-mono">{scenario.before.berthUtil}%</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
              <span className="text-3xl sm:text-4xl font-black text-amber-700 font-mono">{scenario.after.berthUtil}%</span>
            </div>
            <span className="text-sm text-amber-700 font-bold block mt-1">
              +{scenario.after.berthUtil - scenario.before.berthUtil}% saturation
            </span>
          </div>

          {/* Congestion Threat Index */}
          <div className="p-5 rounded-xl bg-white border border-rose-200 shadow-sm">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              Congestion Risk Index
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-lg text-slate-500 font-mono">{scenario.before.congestionRisk}%</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
              <span className="text-3xl sm:text-4xl font-black text-rose-700 font-mono">{scenario.after.congestionRisk}%</span>
            </div>
            <span className="text-sm text-rose-700 font-bold block mt-1">
              Critical Congestion Warning
            </span>
          </div>
        </div>
      </div>

      {/* AI Automated Recovery Action Playbook */}
      <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-sm">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
          <Sparkles className="w-5 h-5 text-sky-600" />
          <h3 className="text-xl font-bold text-slate-900 font-sans">
            Automated Recovery Playbook
          </h3>
          <span className="text-sm text-slate-500 font-sans">
            (Module 06 Crisis Protocol)
          </span>
        </div>

        <div className="space-y-3">
          {scenario.recoveryActions.map((rec) => (
            <div
              key={rec.step}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5"
            >
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-mono text-sm font-bold flex items-center justify-center shrink-0">
                {rec.step}
              </span>
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-900 leading-relaxed font-sans">
                  {rec.action}
                </p>
                <p className="text-sm text-emerald-700 font-semibold font-sans">
                  Expected Impact: {rec.impact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

# ⚓ Solution Overview — PortFlow AI Platform

## What We Built

**PortFlow AI** is an autonomous maritime terminal operations intelligence platform that predicts quayside congestion, identifies bottleneck hotspots, optimizes berth and crane allocation, and synthesizes 72-hour operational recovery playbooks through an interactive IBM Bob RAG-powered Copilot.

Instead of waiting for ship queues to back up beyond the harbor breakwater, PortFlow AI gives port operations directors and harbor masters an intuitive, real-time digital twin that continuously anticipates terminal throughput, simulates "what-if" disruptions, and outputs actionable dispatch recommendations.

## How It Works

1. **Live Telemetry & AIS Ingestion:** Continuous streams of vessel AIS coordinates, vessel dimensions (LOA, beam, draft), berth status, crane operational availability, and intermodal gate queue lengths are ingested.
2. **Multi-Horizon ML Congestion Forecasting:** XGBoost and gradient-boosted time-series forecasting models compute expected quayside occupancy and congestion risk indices across **6h, 12h, 24h, 48h, and 72h** horizons.
3. **Automated Hotspot Diagnostics:** An anomaly-detection engine continuously correlates crane move rates, tidal windows, and vessel ETAs to flag active and emerging bottleneck hotspots (e.g., Berth 02 crane density deficits, East Channel high-draft restrictions).
4. **OR-Tools Dynamic Berth Optimization:** When conflicting vessel ETAs or crane maintenance events arise, a Google OR-Tools constraint satisfaction solver calculates an optimized berth and crane schedule that minimizes overall vessel wait time and total demurrage penalty exposure.
5. **Interactive What-If Simulator:** Operators can simulate catastrophic disruption scenarios (e.g., 2 gantry cranes failing during a storm) and immediately see the revised congestion curve, delta metrics, and step-by-step recovery playbook.
6. **IBM Bob RAG Copilot:** An interactive AI copilot grounded directly in the live operational telemetry provides natural language answers, tactical pilotage recommendations, and one-click operational interventions.

## Architecture Flow

```
[Vessel AIS & Terminal Telemetry]
             │
             ▼
[PortFlow Telemetry Aggregation Layer]
             │
   ┌─────────┴───────────────────────────────┐
   ▼                                         ▼
[Multi-Horizon ML Forecasters]   [OR-Tools Constraint Solver]
(6h, 12h, 24h, 48h, 72h Risk)   (Dynamic Berth & Crane Dispatch)
   │                                         │
   └─────────┬───────────────────────────────┘
             ▼
[IBM Bob AI RAG Engine] ── Grounded in live terminal telemetry & recovery playbooks
             │
             ▼
[PortFlow Operational Console (React 18 + Canvas GIS Digital Twin)]
```

## Key Design Decisions

| Decision | Rationale |
|---|---|
| **Canvas-Based Interactive Digital Twin** | High-performance HTML5 Canvas allows rendering dozens of dynamic vessels, navigation channels, berth gantries, and interactive HUD drawers at 60 FPS without DOM thrashing. |
| **Multi-Horizon Forecasting (6h–72h)** | Port operations change rhythm across shifts: 6h affects immediate gang deployment, 24h affects rail dispatch, and 72h dictates harbor pilot and vessel slow-steaming advisories. |
| **Google OR-Tools for Optimization** | Mixed-Integer Linear Programming (MILP) provides mathematically provable optimal berth assignments with exact constraint guarantees (draft limits, crane reach, turnaround deadlines). |
| **IBM Bob RAG Telemetry Copilot** | Operators in high-stress maritime environments need instant synthesis, not hunting through 50 raw data tables. RAG grounding prevents hallucination and guarantees operational accuracy. |
| **Apple-Inspired Professional Dark/Light System** | Clean, high-contrast maritime aesthetics reduce visual fatigue during long 12-hour harbor master shifts and ensure critical risk states (Critical, High, Medium, Low) are unmistakable. |

## IBM Technologies Used

- **IBM Bob AI Engine:** Acts as the conversational operations copilot. Grounded in live terminal state vectors and SOP recovery playbooks, it answers operational questions, assesses what-if scenarios, and drafts automated vessel redirection advisories.
- **IBM watsonx.ai:** Powers the prompt engineering and semantic classification pipelines that transform raw numerical telemetry into structured operational action recommendations.
- **IBM Cloud:** Target cloud hosting platform for scalable microservices, containerized deployment, and MongoDB Atlas cloud database peering.


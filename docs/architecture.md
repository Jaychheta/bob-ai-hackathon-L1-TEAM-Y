# ⚓ System Architecture — PortFlow AI Platform

## High-Level System Architecture

PortFlow AI is structured as a decoupled, reactive event-driven architecture designed for high-throughput maritime telemetry processing, real-time spatial digital twin rendering, and low-latency operational guidance.

```mermaid
graph TD
    subgraph ClientLayer ["Client Layer"]
        A["Harbor Master / Operations Console"] -->|HTML5 Canvas + React 18| B["Interactive Port Digital Twin"]
        A -->|Tactical Chat / Prompt| C["IBM Bob Copilot UI"]
        A -->|What-if Sandbox Sliders| D["Disruption Simulator"]
    end

    subgraph IntelligenceLayer ["Intelligence & Optimization Layer"]
        E["FastAPI Telemetry Gateway"] -->|Feature Vectors| F["Multi-Horizon ML Forecasters"]
        E -->|Constraint Matrix| G["Google OR-Tools MILP Solver"]
        E -->|Telemetry Context Vectors| H["IBM Bob AI RAG Engine"]
        H -->|Grounded LLM Ingestion| I["IBM watsonx.ai Granite Models"]
    end

    subgraph DataLayer ["Data & Persistence Layer"]
        J[("MongoDB Atlas Cloud")] -->|Berth Specs & Historic Moves| E
        K["AIS Transponder Ingestion Hub"] -->|Vessel Vectors & ETAs| E
        L["Tidal & Weather Feeds"] -->|Depth & Surge Constraints| G
    end

    F -->|6h - 72h Risk Curves| B
    G -->|Optimized Berth & Crane Plan| B
    H -->|Structured Recovery SOPs| C
```

## System Components

| Component | Technology Stack | Core Operational Responsibility |
|---|---|---|
| **Digital Twin GIS Map** | React 18, HTML5 2D Canvas | Real-time 60-FPS rendering of maritime channels, vessel coordinates, AIS vectors, quay cranes, and berth occupancy indicators. |
| **Operational Consoles** | Tailwind CSS, Lucide Icons, Recharts | 7 dedicated views: Command Center, Port Map, Predictions, Optimization, Route Advisor, Simulator, and Copilot. |
| **Multi-Horizon Predictor** | Gradient-Boosted Time Series (XGBoost) | Evaluates quayside congestion, crane utilization, and anchorage queue lengths across 6h, 12h, 24h, 48h, and 72h horizons. |
| **Berth & Crane Optimizer** | Google OR-Tools (MILP) | Solves continuous berth allocation problems (BAP) and quay crane assignment problems (QCAP) under tidal window constraints. |
| **AI Copilot (RAG Engine)** | IBM Bob AI, watsonx.ai Granite | Ingests real-time terminal telemetry into dynamic context embeddings to provide grounded, hallucination-free tactical recovery recommendations. |
| **Data Persistence** | MongoDB Atlas Cloud | Scalable NoSQL storage for vessel registries, berth metadata, operational logs, and historical crane moves. |

## End-to-End Data Flow

```mermaid
sequenceDiagram
    autonumber
    participant V as Vessel AIS & Quay Telemetry
    participant API as Telemetry Gateway
    participant ML as ML Congestion Forecaster
    participant Solver as OR-Tools Optimizer
    participant BOB as IBM Bob RAG Copilot
    participant UI as Harbor Master Dashboard

    V->>API: Stream live vessel positions, ETAs, and crane move rates
    API->>ML: Pass normalized operational state vectors
    ML-->>API: Return 72h congestion probability & hotspot warnings
    API->>Solver: Trigger schedule rebalancing on ETA conflicts
    Solver-->>API: Return optimal berth allocations & crane gang assignments
    API->>UI: Stream live updates to Canvas map and metric gauges
    UI->>BOB: Operator requests recovery action for Berth 02 crane failure
    BOB->>API: Fetch current telemetry snapshot and active 72h plan
    BOB-->>UI: Deliver structured recovery playbook with 1-click action buttons
```

## Security Considerations

- **Zero Credential Exposure:** All API keys (`IBM_BOB_API_KEY`, `WATSONX_API_KEY`, `MONGODB_URI`) are injected via environment variables and strictly excluded from git tracking via `.gitignore`.
- **CORS Restricted Endpoints:** Cross-Origin Resource Sharing is locked to authorized terminal operator domains and local development ports.
- **Client-Side Data Sanitization:** All user prompts in the Copilot console are sanitized before payload transmission.

## Scalability & Production Readiness

- **Canvas Rendering Efficiency:** By utilizing procedural Canvas 2D rendering rather than heavy DOM-based SVG map layers, the terminal map effortlessly scales to display hundreds of simultaneous vessels, buoys, and gantries with zero framerate degradation.
- **Stateless Intelligence Microservices:** The ML forecaster and OR-Tools optimization engines are stateless and can scale horizontally across Kubernetes/OpenShift pods behind an ingress load balancer.
- **Asynchronous Telemetry Ingestion:** The architecture is designed for non-blocking I/O, allowing continuous high-frequency AIS transponder telemetry ingestion without stalling client dashboard updates.


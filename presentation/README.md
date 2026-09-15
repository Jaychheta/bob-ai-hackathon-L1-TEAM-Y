# ⚓ PortFlow AI — Executive Presentation & Pitch Deck

This folder contains the presentation structure for the **IBM Innovation Hackathon** (Team L1 TEAM Y).

## Deck Structure: PortFlow AI

### Slide 1: Title & Executive Summary
- **Project:** PortFlow AI — Autonomous Maritime Terminal Operations Intelligence
- **Team:** L1 TEAM Y (Track: AI)
- **Members:** Jay Chheta (Lead), Manan Vasani

### Slide 2: The Multi-Billion Dollar Maritime Crisis
- 80% of global trade moves through marine container terminals.
- Extreme quayside congestion causes vessel dwell times of 4–7 days.
- Anchored ships incur demurrage fees exceeding **$50,000/day per vessel**.
- Legacy Terminal Operating Systems (TOS) are reactive, siloed, and spreadsheet-driven.

### Slide 3: The PortFlow AI Solution
- A proactive operational intelligence cockpit for terminal directors and harbor masters.
- Predicts quayside congestion across **6h, 12h, 24h, 48h, and 72h** horizons.
- Autonomous hotspot diagnostics across berths, cranes, gates, and railheads.
- Mixed-integer constraint programming (OR-Tools) for dynamic berth/crane allocation.
- Grounded conversational operations copilot powered by **IBM Bob AI (RAG Engine)**.

### Slide 4: System Architecture & Data Flow
- Decoupled, event-driven reactive architecture.
- Real-time 60 FPS HTML5 Canvas digital twin GIS map.
- Statistical ML Forecasters + Google OR-Tools optimization engine.
- IBM Bob RAG Engine grounding LLM recommendations in live terminal telemetry vectors.

### Slide 5: Core Feature Demonstrations
- **Interactive Digital Twin:** Live vessel AIS telemetry, draft limits, and berth HUD.
- **Congestion Gauge & Matrix:** Multi-horizon predictive risk curves with historical comparison.
- **Dynamic Berth Optimizer:** Before-and-after dwell time reduction (eliminating demurrage overlap).

### Slide 6: What-If Crisis Simulator & IBM Bob Copilot
- Simulates unexpected disruption scenarios (e.g., 2 gantry cranes failing during high tide).
- Evaluates real-time mitigation impact with instant metric delta readouts.
- IBM Bob Copilot synthesizes structured 72-hour recovery interventions with 1-click execution.

### Slide 7: Business Impact & Sustainability
- **38% Reduction** in average vessel anchorage waiting dwell time.
- **$2.4M+ Annual Savings** in avoided container ship demurrage penalties per terminal.
- **Tons of CO2 & NOx eliminated** by preventing idling bunker fuel consumption in harbor basins.

### Slide 8: Technical Roadmap & Cloud Enterprise Deployment
- Live NMEA/satellite AIS hardware transponder ingest pipelines.
- Direct MongoDB Atlas change-stream triggers.
- Enterprise multi-tenant deployment on IBM Cloud / Red Hat OpenShift.


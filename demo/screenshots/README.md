# ⚓ PortFlow AI — Application Screenshots

This directory catalogues the operational modules of PortFlow AI running live on `http://localhost:5173`.

## Module Screenshots Index

| File | Module / Console | Key Operational Capability Shown |
|---|---|---|
| `01-command-center.png` | **Command Center** | Real-time terminal KPIs, 72-hour operational intervention plan, and bottleneck alerts |
| `02-port-map-digital-twin.png` | **Live Port Map** | Interactive 60-FPS HTML5 Canvas GIS digital twin with vessel AIS telemetry and berth HUD |
| `03-predictions-risk-matrix.png` | **Predictions Matrix** | Multi-horizon ML risk forecasting comparing 6h, 12h, 24h, 48h, and 72h horizons |
| `04-or-tools-optimization.png` | **OR-Tools Optimization** | Dynamic berth and crane gang allocations minimizing vessel dwell time and demurrage |
| `05-route-advisor.png` | **Route Advisor** | Harbor queue management, anchorage vessel guidance, and pilotage slow-steaming |
| `06-disruption-simulator.png` | **What-If Simulator** | Equipment failure & storm crisis sandbox with real-time delta recovery metrics |
| `07-ibm-bob-copilot.png` | **IBM Bob Copilot** | Conversational AI copilot grounded in live terminal telemetry for automated playbooks |

## Reproduction

All screens can be explored live by starting the development server:

```bash
cd src/frontend
npm install
npm run dev
# Open http://localhost:5173
```


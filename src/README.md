# PortFlow AI — Source Code Directory

This directory contains the production-ready source code for **PortFlow AI**, an autonomous maritime terminal operations intelligence platform developed for the IBM Hackathon.

## Codebase Organization

```
src/
├── frontend/                     # React 18 + Vite + Tailwind CSS Single-Page App
│   ├── public/                   # Static icons and maritime favicon assets
│   ├── src/
│   │   ├── components/           # Reusable UI component library
│   │   │   ├── cards/            # MetricCard, RiskGauge, HotspotRow, RecommendationCard
│   │   │   ├── charts/           # CongestionTrendChart, RiskMatrixTable
│   │   │   ├── common/           # Badge, PortFlowLogo (custom nautical anchor/helm)
│   │   │   ├── layout/           # TopNav, Footer
│   │   │   └── map/              # PortMapCanvas (high-performance Canvas maritime digital twin)
│   │   ├── mocks/                # Real-world calibrated terminal telemetry & AIS records
│   │   │   ├── berths.json       # Berth depth, crane density, status
│   │   │   ├── hotspots.json     # Bottleneck hotspot risk telemetry
│   │   │   ├── plan72h.json      # 72-hour automated operational playbook
│   │   │   ├── portStatus.json   # Live terminal summary KPIs
│   │   │   ├── predictions.json  # Multi-horizon congestion models (6h–72h)
│   │   │   └── vessels.json      # In-transit, queued, and berthed container vessels
│   │   ├── pages/                # 7 Full-featured Operational Consoles
│   │   │   ├── CommandCenter.jsx # Real-time telemetry, risk gauge, and action queue
│   │   │   ├── LivePortMap.jsx   # Interactive port GIS map with vessel AIS HUD
│   │   │   ├── Predictions.jsx   # Multi-horizon risk matrix & ML model accuracy
│   │   │   ├── Optimization.jsx  # OR-Tools berth/crane dispatch allocation
│   │   │   ├── RouteAdvisor.jsx  # Vessel queue rerouting & pilotage advice
│   │   │   ├── Simulator.jsx     # What-if disruption sandbox (crane outage, storm)
│   │   │   └── Copilot.jsx       # IBM Bob RAG conversational operations copilot
│   │   ├── utils/                # Class merge utilities (`cn.js`)
│   │   ├── App.jsx               # React Router DOM shell & navigation
│   │   └── index.css             # Tailwind base & bespoke CSS variables
│   ├── package.json              # Dependencies (lucide-react, react-router-dom, etc.)
│   └── vite.config.js            # Vite build configuration
└── .env.example                  # Environment configuration template
```

## Quick Start

```bash
cd src/frontend
npm install
npm run dev
```
Application will be live on `http://localhost:5173`.


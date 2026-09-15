# ⚓ PortFlow AI — Autonomous Maritime Terminal Intelligence Platform

> **Predictive Congestion Forecasting, Hotspot Diagnostics, Dynamic Berth Scheduling & IBM Bob RAG Copilot for Modern Deepwater Ports**

---

## 👥 Team

| Field | Value |
|---|---|
| **Team Name** | L1 TEAM Y |
| **Track** | AI |
| **Team Lead** | Jay Chheta — jaychheta947@gmail.com |
| **Members** | Jay Chheta, Manan Vasani, Yug Bhimani, Manav Italiya |

---

## 🎯 Problem Statement

Global maritime container terminals lose hundreds of millions of dollars annually due to quayside congestion, berth delays, and crane dispatch bottlenecks. Waiting container vessels incur demurrage penalties exceeding **$50,000 per vessel daily**, while cascading harbor delays paralyze intermodal rail and truck gate networks.

Port operations managers currently rely on fragmented, reactive terminal operating systems (TOS) and manual spreadsheets. They lack unified, real-time predictive visibility to anticipate vessel queues, equipment failures, and tidal depth constraints across a proactive 72-hour planning horizon.

---

## 💡 Solution

**PortFlow AI** is a next-generation maritime terminal operations platform that fuses live vessel AIS telemetry, crane capacity metrics, and multi-horizon machine learning models into an interactive, high-performance operational cockpit.

The platform continuously predicts quayside congestion across **6h, 12h, 24h, 48h, and 72h** horizons, detects localized bottleneck hotspots (berths, gantry cranes, railheads, gates), uses **Google OR-Tools** constraint optimization to dynamically schedule berths and cranes, and synthesizes 72-hour operational playbooks through an **IBM Bob RAG-powered Copilot**.

---

## ✨ Key Features

- **Interactive Port GIS Digital Twin:** High-performance Canvas-based real-time terminal map showing live vessel AIS positions, heading vectors, berth assignments, crane allocations, and interactive HUD vessel inspectors.
- **Multi-Horizon Congestion Forecasting:** Machine learning predictive risk gauge tracking quayside occupancy, queue length, and crane utilization across 6h, 12h, 24h, 48h, and 72h operational horizons with XGBoost-calibrated confidence intervals.
- **Automated Hotspot Diagnostics:** Real-time root-cause analysis identifying quayside bottlenecks (e.g., Berth 02 crane density deficits, East Channel tidal draft limits, Gate 3 drayage surge).
- **OR-Tools Dynamic Berth Optimization:** Mixed-integer linear programming optimizer that calculates optimal berth and crane allocations, minimizing vessel dwell time and eliminating demurrage conflicts.
- **Interactive Disruption Sandbox:** What-if simulation engine allowing operations directors to inject catastrophic scenarios (crane outages, tidal storms, vessel delays) and evaluate mitigation strategies in real time.
- **IBM Bob RAG Operations Copilot:** Conversational AI copilot grounded directly in live terminal telemetry, providing tactical guidance, vessel rerouting advice, and structured 72-hour recovery interventions.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Languages** | JavaScript (ESNext), HTML5 Canvas, CSS3, Python 3.11 |
| **Frameworks** | React 18, Vite, Tailwind CSS |
| **IBM Technologies** | IBM Bob AI RAG Engine, IBM watsonx.ai, IBM Cloud |
| **Optimization & ML** | Google OR-Tools, Multi-Horizon Time-Series Forecasters |
| **Databases** | MongoDB Atlas (Cloud Cluster) |
| **Other** | Lucide Icons, Recharts, Docker, GitHub Actions |

---

## 📁 Repository Structure

```
├── .github/                  # GitHub Actions CI validation workflows
│   └── workflows/validate.yml
├── src/                      # Production source code
│   ├── frontend/             # React 18 + Vite + Tailwind CSS application
│   │   ├── src/
│   │   │   ├── components/   # Cards, charts, Canvas map, layout
│   │   │   ├── pages/        # 7 full operational consoles
│   │   │   └── mocks/        # Real-world calibrated telemetry data
│   │   ├── package.json
│   │   └── vite.config.js
│   ├── .env.example          # Environment variables template
│   └── README.md             # Source code guide
├── docs/                     # Comprehensive documentation
│   ├── problem-statement.md  # Detailed problem depth and market economics
│   ├── solution-overview.md  # Core solution mechanism and user journey
│   ├── architecture.md       # Mermaid architecture & data flow diagrams
│   ├── setup-guide.md        # Exact step-by-step installation instructions
│   └── template-guide.md     # Hackathon submission template reference
├── demo/                     # Demonstration artifacts
│   ├── screenshots/          # High-resolution screenshots of the 7 consoles
│   ├── demo-video-link.txt   # Video demonstration link
│   └── live-demo-url.txt     # Live deployment URL / local reproduction guide
├── presentation/             # Executive slide deck & presentation assets
│   └── README.md
├── submission.yaml           # Automated evaluation metadata manifest
├── CONTRIBUTING.md           # Submission guidelines
└── .gitignore                # Pre-configured build & credential exclusions
```

---

## ⚡ How to Run

> **Full setup instructions available in [`docs/setup-guide.md`](docs/setup-guide.md)**

```bash
# 1. Clone the repository
git clone https://github.com/Jaychheta/bob-ai-hackathon-L1-TEAM-Y.git
cd bob-ai-hackathon-L1-TEAM-Y

# 2. Navigate to frontend source directory
cd src/frontend

# 3. Install dependencies
npm install

# 4. Configure environment (optional - defaults preconfigured)
cp ../.env.example .env

# 5. Launch the application
npm run dev
```

The application will be live at: **`http://localhost:5173`**

---

## 🖥️ Demo

| Artifact | Link |
|---|---|
| 📹 Demo Video | [See demo/demo-video-link.txt](demo/demo-video-link.txt) |
| 🌐 Live Demo | [See demo/live-demo-url.txt](demo/live-demo-url.txt) |
| 🖼️ Screenshots | [See demo/screenshots/](demo/screenshots/) |
| 📊 Presentation | [See presentation/README.md](presentation/) |

---

## ⚠️ Known Limitations

- **Simulated Hardware AIS Feeds:** The current deployment leverages calibrated, high-fidelity port telemetry and real-world Pacific Gateway maritime vessel records. Direct NMEA / satellite AIS hardware transponder ingest streams are architected for enterprise cloud deployment.
- **Browser Compatibility:** Tested and optimized for modern Chromium-based browsers (Google Chrome, Microsoft Edge, Brave) and Safari. Firefox is supported with hardware acceleration enabled.
- **MongoDB Atlas Webhooks:** Direct MongoDB Atlas change-stream triggers are scaffolded via environment variables and fallback to in-memory reactive telemetry during offline evaluation.

---

## 🏅 What We're Most Proud Of

We are most proud of building a **living digital twin** that transforms impenetrable maritime logistical telemetry into intuitive, sub-second operational clarity. Rather than offering static charts, PortFlow AI seamlessly orchestrates mathematical optimization (OR-Tools berth dispatch) with generative intelligence (IBM Bob AI Copilot), empowering port directors to resolve costly bottlenecks before ships even cross the harbor breakwater.


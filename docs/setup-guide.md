# ⚓ Setup Guide — PortFlow AI Platform

> **This file is read by the automated evaluation pipeline. Follow these exact steps to run PortFlow AI.**

## Prerequisites

Ensure you have the following installed on your evaluation environment:

- [x] **Node.js 18.x or higher** (`node -v`)
- [x] **npm 9.x or higher** (`npm -v`)
- [x] **Modern Web Browser** (Google Chrome, Microsoft Edge, Safari, or Firefox)
- [x] **Git** (`git --version`)

---

## Environment Variables

PortFlow AI comes pre-configured with realistic calibrated fallback telemetry for offline zero-configuration evaluation.

To configure custom backend or IBM Bob AI credentials, copy `.env.example`:

```bash
cd src/frontend
cp ../.env.example .env
```

| Variable | Description | Required | Default / Mock Fallback |
|---|---|---|---|
| `PORT` | Frontend dev server port | No | `5173` |
| `VITE_API_BASE_URL` | PortFlow Telemetry Gateway URL | No | `http://localhost:8000` |
| `IBM_BOB_API_KEY` | IBM Bob AI Engine API Key | No | Mock RAG Engine active |
| `IBM_BOB_ENDPOINT` | IBM Bob API Endpoint | No | `https://api.ibm.com/bob/v1` |
| `MONGODB_URI` | MongoDB Atlas Cluster connection URI | No | Calibrated offline mock dataset |

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/Jaychheta/bob-ai-hackathon-L1-TEAM-Y.git
cd bob-ai-hackathon-L1-TEAM-Y

# 2. Navigate to the frontend directory
cd src/frontend

# 3. Install dependencies
npm install
```

---

## Running the Application

```bash
# Launch the Vite development server
npm run dev
```

The application will start immediately and be accessible in your browser at:

👉 **`http://localhost:5173`**

---

## Verification & Key Pages to Inspect

Once the app is running at `http://localhost:5173`, navigate through the primary navigation bar to verify all modules:

1. **Command Center (`/`):** Real-time terminal summary, live congestion gauge, active bottleneck hotspots, and 72-hour operational intervention plan.
2. **Port Map (`/map`):** Interactive Canvas digital twin with draggable/zoomable maritime chart, AIS vessel markers, berth depths, crane densities, and clickable vessel inspectors.
3. **Predictions (`/predictions`):** Multi-horizon risk matrix comparing 6h, 12h, 24h, 48h, and 72h forecasts against historical ground truth.
4. **Optimization (`/optimization`):** OR-Tools berth allocation matrix and crane gang assignments with before-and-after dwell time comparisons.
5. **Route Advisor (`/routing`):** Queue management, anchorage guidance, and vessel speed adjustments to avoid high-tide demurrage.
6. **Simulator (`/simulator`):** Interactive what-if sandbox to inject equipment breakdowns or storm disruptions and view immediate recovery playbooks.
7. **Copilot (`/copilot`):** Interactive IBM Bob RAG chat interface grounded in live telemetry for natural-language crisis management.

---

## Running Tests & Linting

```bash
# Validate code formatting and linting
npm run lint

# Verify production build compilation
npm run build
```

---

## Troubleshooting

| Issue | Cause | Solution |
|---|---|---|
| `Port 5173 already in use` | Another process is occupying port 5173 | Run `npm run dev -- --port 5174` or terminate the existing process. |
| `Canvas blurry on high-DPI display` | High Retina pixel density | PortFlow automatically compensates with `window.devicePixelRatio`. Ensure browser zoom is 100%. |
| `Icons failing to render` | Missing `lucide-react` package | Run `npm install` inside `src/frontend`. |
| `Failed to load asset / MIME error` | Running from improper directory | Always execute `npm run dev` from inside `src/frontend`. |


import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TopNav } from "./components/layout/TopNav";
import { Footer } from "./components/layout/Footer";
import { CommandCenter } from "./pages/CommandCenter";
import { LivePortMap } from "./pages/LivePortMap";
import { Predictions } from "./pages/Predictions";
import { Optimization } from "./pages/Optimization";
import { RouteAdvisor } from "./pages/RouteAdvisor";
import { Simulator } from "./pages/Simulator";
import { Copilot } from "./pages/Copilot";
import { ShieldCheck, Anchor } from "lucide-react";

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
        {/* Fixed Top Navigation Bar */}
        <TopNav />

        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<CommandCenter />} />
            <Route path="/map" element={<LivePortMap />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="/optimization" element={<Optimization />} />
            <Route path="/routing" element={<RouteAdvisor />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/copilot" element={<Copilot />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Immersive Enterprise Maritime Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

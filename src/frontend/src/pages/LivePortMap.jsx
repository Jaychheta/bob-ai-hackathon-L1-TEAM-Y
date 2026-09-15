import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  MapPin, 
  Ship, 
  Anchor, 
  Search, 
  Navigation
} from "lucide-react";
import { PortMapCanvas } from "../components/map/PortMapCanvas";
import { RiskBadge, StatusBadge } from "../components/common/Badge";
import vesselsMock from "../mocks/vessels.json";
import berthsMock from "../mocks/berths.json";

export function LivePortMap() {
  const [vessels, setVessels] = useState(vesselsMock);
  const [selectedVessel, setSelectedVessel] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVessels = vessels.filter((v) => {
    const matchesFilter = filter === "all" ? true : v.status === filter;
    const matchesSearch =
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.imo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-sans">
              Live Port Map & Terminal Geometry
            </h1>
            <span className="px-2.5 py-1 rounded text-sm font-bold bg-slate-100 text-slate-700 border border-slate-200">
              Spatial Telemetry
            </span>
          </div>
          <p className="text-base text-slate-600 font-sans mt-1">
            Geospatial tracking of deepwater berths B1–B4, container crane gantries, storage stacks, and anchorage holding basin.
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm font-sans text-slate-600 bg-white px-3.5 py-2 rounded-lg border border-slate-200 shadow-subtle">
          <span className="flex items-center gap-1.5 font-medium">
            <Ship className="w-4 h-4 text-slate-700" />
            <span>{vessels.length} Vessels Monitored</span>
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1.5 font-medium">
            <Anchor className="w-4 h-4 text-emerald-600" />
            <span>4 Berths Active</span>
          </span>
        </div>
      </div>

      {/* Main Map Canvas */}
      <PortMapCanvas
        vessels={vessels}
        berths={berthsMock}
        selectedVessel={selectedVessel}
        onSelectVessel={(v) => setSelectedVessel(v)}
      />

      {/* Vessel Fleet Telemetry Grid */}
      <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-sm">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-sans">
              Monitored Vessel Fleet
            </h3>
            <p className="text-sm text-slate-500 font-sans">
              Showing {filteredVessels.length} active vessels in terminal vicinity
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search vessel name, IMO..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition-all w-72"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center rounded-lg bg-slate-100 p-1 border border-slate-200 text-sm">
              {["all", "waiting", "berthed"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3.5 py-1.5 rounded-md capitalize font-medium transition-all cursor-pointer select-none ${
                    filter === tab
                      ? "bg-white text-slate-900 shadow-sm font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Vessel Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-sans">
            <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider text-xs font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Vessel / IMO Identification</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Assigned Berth</th>
                <th className="py-3 px-3">Dimensions</th>
                <th className="py-3 px-3">Capacity</th>
                <th className="py-3 px-3">Congestion Risk</th>
                <th className="py-3 px-4 text-right">Operational Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVessels.map((vessel) => (
                <tr
                  key={vessel.id}
                  className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                  onClick={() => setSelectedVessel(vessel)}
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                        <Ship className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block text-sm">
                          {vessel.name}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">
                          {vessel.imo} • {vessel.id}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <StatusBadge status={vessel.status} />
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-900 text-sm">
                    {vessel.berth_name}
                  </td>
                  <td className="py-3.5 px-3 text-slate-700 text-sm">
                    {vessel.length_m}m × {vessel.draft_m}m draft
                  </td>
                  <td className="py-3.5 px-3 font-bold text-slate-900 text-sm">
                    {vessel.teu.toLocaleString()} TEU
                  </td>
                  <td className="py-3.5 px-3">
                    <RiskBadge level={vessel.risk_level} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      to={`/routing`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold border border-slate-200 shadow-subtle transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5 text-slate-500" />
                      <span>Reroute</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { 
  Anchor, 
  Ship, 
  Layers, 
  Maximize2, 
  Compass, 
  Eye, 
  Navigation, 
  Sparkles,
  Info,
  MapPin,
  Clock,
  Layers2
} from "lucide-react";
import { RiskBadge, StatusBadge } from "../common/Badge";
import { cn } from "../../utils/cn";

// Real-world berth coordinates along Pacific Gateway / Singapore Port Basin
const BERTH_LOCATIONS = [
  {
    id: "B1",
    name: "Berth 01 (Deepwater Quay)",
    lat: 1.2655,
    lng: 103.818,
    length_m: 420,
    depth_m: 17.5,
    status: "occupied",
    vessel: "Maersk Mc-Kinney (V101)",
    utilization: 85,
    risk: "LOW",
  },
  {
    id: "B2",
    name: "Berth 02 (North Basin)",
    lat: 1.2685,
    lng: 103.824,
    length_m: 380,
    depth_m: 16.0,
    status: "free",
    vessel: null,
    utilization: 58,
    risk: "MEDIUM",
  },
  {
    id: "B3",
    name: "Berth 03 (South Terminal)",
    lat: 1.2625,
    lng: 103.832,
    length_m: 350,
    depth_m: 15.5,
    status: "free",
    vessel: null,
    utilization: 42,
    risk: "LOW",
  },
  {
    id: "B4",
    name: "Berth 04 (Express Pier)",
    lat: 1.2595,
    lng: 103.841,
    length_m: 340,
    depth_m: 14.8,
    status: "occupied",
    vessel: "MSC Palak (V102)",
    utilization: 96,
    risk: "CRITICAL",
  },
];

// Anchorage polygon boundaries
const ANCHORAGE_POLYGON = [
  [1.248, 103.845],
  [1.242, 103.882],
  [1.222, 103.895],
  [1.225, 103.855],
];

// Shipping channel approach lines
const CHANNEL_POINTS = [
  [1.220, 103.830],
  [1.240, 103.835],
  [1.255, 103.825],
  [1.265, 103.815],
];

const TILE_PROVIDERS = {
  voyager: {
    name: "Maritime Voyager",
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
    maxZoom: 19,
  },
  satellite: {
    name: "Satellite Imagery",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: '&copy; Esri, Maxar, Earthstar Geographics',
    maxZoom: 18,
  },
  osm: {
    name: "OpenStreetMap",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  },
};

export function PortMapCanvas({ 
  vessels = [], 
  berths = [], 
  onSelectVessel,
  selectedVessel = null 
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersGroupRef = useRef(null);
  const berthsGroupRef = useRef(null);
  const zonesGroupRef = useRef(null);
  const activeTileLayerRef = useRef(null);

  const [activeTileKey, setActiveTileKey] = useState("voyager");
  const [activeFilter, setActiveFilter] = useState("all");
  const [mapHoverInfo, setMapHoverInfo] = useState(null);
  const [activeEntity, setActiveEntity] = useState(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Create Leaflet Map instance
    const map = L.map(mapContainerRef.current, {
      center: [1.258, 103.845],
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
    });

    // Add zoom control at top-right
    L.control.zoom({ position: "topright" }).addTo(map);

    // Add active base tile layer
    const initialTile = TILE_PROVIDERS[activeTileKey];
    const tileLayer = L.tileLayer(initialTile.url, {
      attribution: initialTile.attribution,
      maxZoom: initialTile.maxZoom,
    }).addTo(map);
    activeTileLayerRef.current = tileLayer;

    // Create layer groups
    zonesGroupRef.current = L.layerGroup().addTo(map);
    berthsGroupRef.current = L.layerGroup().addTo(map);
    markersGroupRef.current = L.layerGroup().addTo(map);

    // Draw Anchorage Zone Polygon
    const anchorage = L.polygon(ANCHORAGE_POLYGON, {
      color: "#0284c7",
      weight: 2,
      dashArray: "6, 6",
      fillColor: "#38bdf8",
      fillOpacity: 0.08,
    }).addTo(zonesGroupRef.current);

    anchorage.bindTooltip("Outer Anchorage Holding Basin (Zone A & B)", {
      permanent: false,
      direction: "center",
      className: "anchorage-tooltip",
    });

    // Draw Shipping Channel Fairway Line
    L.polyline(CHANNEL_POINTS, {
      color: "#f59e0b",
      weight: 3,
      dashArray: "8, 6",
      opacity: 0.7,
    }).addTo(zonesGroupRef.current);

    // Draw Berth Quay Indicators
    BERTH_LOCATIONS.forEach((b) => {
      const isOccupied = b.status === "occupied";
      const badgeColor = isOccupied ? "#ef4444" : "#10b981";

      const berthIcon = L.divIcon({
        className: "custom-berth-marker",
        html: `
          <div style="
            background: #ffffff;
            border: 2px solid ${badgeColor};
            border-radius: 6px;
            padding: 2px 6px;
            font-family: Inter, sans-serif;
            font-size: 11px;
            font-weight: 700;
            color: #0f172a;
            box-shadow: 0 2px 4px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 4px;
            white-space: nowrap;
          ">
            <span style="width: 6px; height: 6px; border-radius: 50%; background: ${badgeColor};"></span>
            <span>${b.id}</span>
            <span style="font-size: 9px; color: #64748b; font-weight: normal;">${b.depth_m}m</span>
          </div>
        `,
        iconSize: [60, 24],
        iconAnchor: [30, 12],
      });

      const berthMarker = L.marker([b.lat, b.lng], { icon: berthIcon })
        .addTo(berthsGroupRef.current);

      berthMarker.on("click", () => {
        setActiveEntity({ ...b, entityType: "berth" });
      });
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Switch Base Tiles
  useEffect(() => {
    if (!mapInstanceRef.current || !activeTileLayerRef.current) return;
    const tileConfig = TILE_PROVIDERS[activeTileKey];
    mapInstanceRef.current.removeLayer(activeTileLayerRef.current);

    const newTileLayer = L.tileLayer(tileConfig.url, {
      attribution: tileConfig.attribution,
      maxZoom: tileConfig.maxZoom,
    }).addTo(mapInstanceRef.current);
    newTileLayer.bringToBack();
    activeTileLayerRef.current = newTileLayer;
  }, [activeTileKey]);

  // Update Vessel Markers when vessels or filter changes
  useEffect(() => {
    if (!markersGroupRef.current || !mapInstanceRef.current) return;
    markersGroupRef.current.clearLayers();

    const filteredVessels = vessels.filter((v) => {
      if (activeFilter === "all") return true;
      if (activeFilter === "berthed") return v.status === "berthed";
      if (activeFilter === "waiting") return v.status === "waiting";
      if (activeFilter === "critical") return v.risk_level === "CRITICAL" || v.risk_level === "HIGH";
      return true;
    });

    filteredVessels.forEach((v) => {
      if (!v.coordinates || v.coordinates.length !== 2) return;
      const [lat, lng] = v.coordinates;

      const isCritical = v.risk_level === "CRITICAL";
      const isHigh = v.risk_level === "HIGH";
      const isBerthed = v.status === "berthed";

      let statusColor = "#0284c7"; // Berthed = Maritime Sky
      if (isCritical) statusColor = "#ef4444"; // Red
      else if (isHigh) statusColor = "#f59e0b"; // Amber
      else if (v.status === "waiting") statusColor = "#d97706";

      const isSelected = selectedVessel?.id === v.id;

      const vesselHtml = `
        <div style="position: relative; cursor: pointer;">
          ${(isCritical || isSelected) ? `
            <div style="
              position: absolute;
              top: -6px;
              left: -6px;
              width: 38px;
              height: 38px;
              border-radius: 50%;
              background: ${statusColor};
              opacity: 0.35;
              animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
            "></div>
          ` : ""}
          <div style="
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background: #ffffff;
            border: 2.5px solid ${statusColor};
            box-shadow: 0 2px 6px rgba(0,0,0,0.25);
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${statusColor};
            font-weight: bold;
            font-size: 11px;
            transform: ${isSelected ? "scale(1.2)" : "scale(1)"};
            transition: transform 0.2s ease;
          ">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
              <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/>
              <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/>
              <path d="M12 10v4"/>
              <path d="M12 2v3"/>
            </svg>
          </div>
          <div style="
            position: absolute;
            top: 28px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(15, 23, 42, 0.9);
            color: #ffffff;
            font-family: Inter, sans-serif;
            font-size: 10px;
            font-weight: 600;
            padding: 1px 5px;
            border-radius: 4px;
            white-space: nowrap;
            pointer-events: none;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
          ">
            ${v.name}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: "custom-leaflet-vessel-marker",
        html: vesselHtml,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(markersGroupRef.current);

      // Popup Content
      const popupHtml = `
        <div style="font-family: Inter, sans-serif; padding: 2px; min-width: 200px;">
          <div style="font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 2px;">${v.name}</div>
          <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">${v.imo} • ${v.teu.toLocaleString()} TEU</div>
          <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
            <span style="color: #64748b;">Status:</span>
            <span style="font-weight: 600; color: ${isBerthed ? "#0284c7" : "#d97706"}; text-transform: uppercase;">${v.status}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
            <span style="color: #64748b;">Assigned Berth:</span>
            <span style="font-weight: 600; color: #0f172a;">${v.berth_name || "Unassigned"}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
            <span style="color: #64748b;">Draft / Length:</span>
            <span style="font-weight: 600; color: #0f172a;">${v.draft_m}m / ${v.length_m}m</span>
          </div>
          ${v.expected_wait_h ? `
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-top: 6px; padding-top: 4px; border-top: 1px solid #e2e8f0; color: #b91c1c;">
              <span>Expected Queue Delay:</span>
              <span style="font-weight: 700;">+${v.expected_wait_h}h</span>
            </div>
          ` : ""}
        </div>
      `;
      marker.bindPopup(popupHtml);

      marker.on("click", () => {
        setActiveEntity({ ...v, entityType: "vessel" });
        if (onSelectVessel) onSelectVessel(v);
      });
    });
  }, [vessels, activeFilter, selectedVessel, onSelectVessel]);

  // Handle fly-to when selectedVessel changes
  useEffect(() => {
    if (!selectedVessel || !selectedVessel.coordinates || !mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo(selectedVessel.coordinates, 14, {
      duration: 1.2,
    });
    setActiveEntity({ ...selectedVessel, entityType: "vessel" });
  }, [selectedVessel]);

  // Recenter Handler
  const handleRecenter = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([1.258, 103.845], 13, { duration: 1.0 });
  };

  return (
    <div className="relative w-full rounded-xl bg-white border border-slate-200/90 shadow-sm overflow-hidden font-sans">
      {/* Top Map Header & Controls Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-white border-b border-slate-200 text-xs">
        {/* Left: Map Title & Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive Live Maritime Terminal GIS</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span className="text-slate-500 hidden sm:inline">
            Pacific Gateway Straits • Real GPS AIS Feeds
          </span>
        </div>

        {/* Right Controls: Filters, Base Tiles, Reset */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status Filter */}
          <div className="flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-[11px] font-medium">
            {[
              { key: "all", label: "All Vessels" },
              { key: "berthed", label: "Berthed" },
              { key: "waiting", label: "In Queue" },
              { key: "critical", label: "Critical Risk" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={cn(
                  "px-2.5 py-1 rounded-md transition-all cursor-pointer select-none",
                  activeFilter === tab.key
                    ? "bg-white text-slate-900 shadow-sm font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Basemap Switcher */}
          <div className="flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-[11px] font-medium">
            {Object.entries(TILE_PROVIDERS).map(([key, provider]) => (
              <button
                key={key}
                onClick={() => setActiveTileKey(key)}
                className={cn(
                  "px-2.5 py-1 rounded-md transition-all cursor-pointer select-none",
                  activeTileKey === key
                    ? "bg-white text-slate-900 shadow-sm font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                {provider.name}
              </button>
            ))}
          </div>

          {/* Recenter Button */}
          <button
            onClick={handleRecenter}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200 text-slate-700 text-sm font-semibold shadow-subtle transition-colors cursor-pointer select-none"
            title="Recenter Map View"
          >
            <Compass className="w-4 h-4 text-slate-600" />
            <span>Recenter</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Leaflet Map Div */}
      <div className="relative w-full h-[540px] bg-slate-100">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Floating Map Legend Overlay */}
        <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200 shadow-card text-xs text-slate-700 space-y-1.5 pointer-events-auto">
          <span className="font-bold text-slate-900 uppercase tracking-wider text-xs block mb-1">
            Map Legend
          </span>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
            <span>Berthed at Deepwater Quay</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Waiting at Outer Anchorage</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>Critical Congestion Bottleneck</span>
          </div>
          <div className="flex items-center gap-2 pt-1.5 border-t border-slate-100">
            <span className="w-3.5 h-0.5 border-t-2 border-dashed border-sky-500" />
            <span className="text-slate-500">Anchorage Basin Boundary</span>
          </div>
        </div>

        {/* Selected Entity Card HUD (Right Drawer) */}
        {activeEntity && (
          <div className="absolute top-4 right-4 z-[400] w-88 bg-white/95 backdrop-blur-md p-5 rounded-xl border border-slate-200 shadow-modal pointer-events-auto animate-in fade-in slide-in-from-right-4 duration-200">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                {activeEntity.entityType === "vessel" ? (
                  <Ship className="w-5 h-5 text-sky-600" />
                ) : (
                  <Anchor className="w-5 h-5 text-slate-700" />
                )}
                <span className="font-bold text-base text-slate-900">
                  {activeEntity.name}
                </span>
              </div>
              <button
                onClick={() => setActiveEntity(null)}
                className="text-slate-400 hover:text-slate-600 active:text-slate-900 text-xs px-2 py-1 rounded hover:bg-slate-100 cursor-pointer select-none font-bold"
              >
                ✕
              </button>
            </div>

            {activeEntity.entityType === "vessel" ? (
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">IMO / Code:</span>
                  <span className="font-mono font-semibold text-slate-800">{activeEntity.imo}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Status:</span>
                  <StatusBadge status={activeEntity.status} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Assigned Berth:</span>
                  <span className="font-semibold text-slate-900">{activeEntity.berth_name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Dimensions:</span>
                  <span className="text-slate-800 font-medium">{activeEntity.length_m}m × {activeEntity.draft_m}m draft</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Capacity:</span>
                  <span className="font-bold text-slate-900">{activeEntity.teu.toLocaleString()} TEU</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Risk Severity:</span>
                  <RiskBadge level={activeEntity.risk_level} size="sm" />
                </div>
                {activeEntity.expected_wait_h && (
                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-950 flex items-center justify-between mt-2.5 font-sans">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-4 h-4 text-amber-600" />
                      Queue Delay:
                    </span>
                    <span className="font-bold font-mono">+{activeEntity.expected_wait_h} hours</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Berth Code:</span>
                  <span className="font-bold text-slate-900">{activeEntity.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Status:</span>
                  <StatusBadge status={activeEntity.status} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Quay Dimensions:</span>
                  <span className="text-slate-800 font-medium">{activeEntity.length_m}m × {activeEntity.depth_m}m depth</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Utilization:</span>
                  <span className="font-bold text-slate-900">{activeEntity.utilization}%</span>
                </div>
                {activeEntity.vessel && (
                  <div className="p-2.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-950 mt-2.5">
                    <span className="text-xs text-sky-700 font-medium block mb-0.5">Currently Berthed:</span>
                    <span className="font-bold text-sm">{activeEntity.vessel}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

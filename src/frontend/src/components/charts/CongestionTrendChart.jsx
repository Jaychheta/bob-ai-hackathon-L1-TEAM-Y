import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const defaultData = [
  { time: "Now", probability: 28, waitTime: 4.2 },
  { time: "+6h", probability: 34, waitTime: 5.6 },
  { time: "+12h", probability: 54, waitTime: 8.8 },
  { time: "+18h", probability: 74, waitTime: 12.4 },
  { time: "+24h", probability: 79, waitTime: 14.7 },
  { time: "+36h", probability: 82, waitTime: 16.2 },
  { time: "+48h", probability: 88, waitTime: 18.0 },
  { time: "+60h", probability: 89, waitTime: 18.5 },
  { time: "+72h", probability: 92, waitTime: 19.8 },
];

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-dropdown text-sm font-sans">
        <p className="text-slate-500 font-bold mb-1.5 uppercase tracking-wider text-xs">
          Time Horizon: {label}
        </p>
        <div className="flex items-center gap-2 text-slate-900 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
          <span>Congestion Risk:</span>
          <span className="font-bold text-sky-700 font-mono">{data.probability}%</span>
        </div>
        <div className="flex items-center gap-2 text-amber-900 mt-1.5 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span>Projected Queue Wait:</span>
          <span className="font-bold font-mono">{data.waitTime} hrs</span>
        </div>
      </div>
    );
  }
  return null;
}

export function CongestionTrendChart({ data = defaultData, height = 300 }) {
  return (
    <div className="w-full h-full min-h-[260px] relative">
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          margin={{ top: 15, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="cleanAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0284c7" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#0284c7" stopOpacity={0.01} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f1f5f9"
            vertical={false}
          />

          <XAxis
            dataKey="time"
            stroke="#94a3b8"
            tick={{ fill: "#64748b", fontSize: 13, fontFamily: "Inter" }}
            tickLine={{ stroke: "#e2e8f0" }}
            axisLine={{ stroke: "#cbd5e1" }}
          />

          <YAxis
            domain={[0, 100]}
            stroke="#94a3b8"
            tick={{ fill: "#64748b", fontSize: 13, fontFamily: "Inter" }}
            tickLine={{ stroke: "#e2e8f0" }}
            axisLine={{ stroke: "#cbd5e1" }}
            tickFormatter={(val) => `${val}%`}
          />

          <Tooltip content={<CustomTooltip />} />

          {/* 75% Critical Threshold Reference Line */}
          <ReferenceLine
            y={75}
            stroke="#e11d48"
            strokeDasharray="4 4"
            strokeWidth={1.5}
            label={{
              value: "CRITICAL THRESHOLD (75%)",
              fill: "#e11d48",
              fontSize: 12,
              fontFamily: "Inter",
              fontWeight: 700,
              position: "top",
            }}
          />

          <Area
            type="monotone"
            dataKey="probability"
            stroke="#0284c7"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#cleanAreaGradient)"
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

import React, { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { cn } from "../../utils/cn";

const initialData = [
  { zone: "Berth-04 (Express Quay)", type: "berth", now: 91, h6: 94, h12: 96, h24: 92, h48: 85, h72: 78 },
  { zone: "Yard-B (Reefer / Dangerous Goods)", type: "yard", now: 78, h6: 82, h12: 89, h24: 94, h48: 88, h72: 80 },
  { zone: "Crane-Group-2 (Berth 4 Gantry)", type: "crane", now: 64, h6: 72, h12: 85, h24: 89, h48: 75, h72: 60 },
  { zone: "Berth-01 (Deepwater Quay)", type: "berth", now: 52, h6: 58, h12: 64, h24: 70, h48: 65, h72: 55 },
  { zone: "Berth-02 (North Basin)", type: "berth", now: 45, h6: 48, h12: 56, h24: 68, h48: 72, h72: 50 },
  { zone: "Yard-A (Standard Dry Stacking)", type: "yard", now: 42, h6: 46, h12: 50, h24: 58, h48: 52, h72: 44 },
  { zone: "Berth-03 (South Terminal)", type: "berth", now: 35, h6: 38, h12: 42, h24: 48, h48: 45, h72: 40 },
  { zone: "Gate-West (Truck Staging)", type: "gate", now: 32, h6: 36, h12: 40, h24: 42, h48: 38, h72: 30 },
];

function getCellBadge(val) {
  if (val >= 80) return "bg-red-100 text-red-900 border-red-200 font-bold";
  if (val >= 60) return "bg-rose-50 text-rose-800 border-rose-200 font-semibold";
  if (val >= 40) return "bg-amber-50 text-amber-800 border-amber-200 font-medium";
  return "bg-emerald-50 text-emerald-800 border-emerald-200 font-medium";
}

export function RiskMatrixTable({ className = "" }) {
  const [data, setData] = useState(initialData);
  const [sortAsc, setSortAsc] = useState(false);

  const toggleSort = () => {
    const sorted = [...data].sort((a, b) => (sortAsc ? a.now - b.now : b.now - a.now));
    setData(sorted);
    setSortAsc(!sortAsc);
  };

  return (
    <div className={cn("overflow-x-auto rounded-xl border border-slate-200 bg-white", className)}>
      <table className="w-full text-left text-sm font-sans">
        {/* Table Header */}
        <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 uppercase tracking-wider text-xs font-bold">
          <tr>
            <th className="py-3.5 px-4">Zone / Operational Resource</th>
            <th 
              className="py-3.5 px-3 text-center cursor-pointer hover:text-slate-900 select-none" 
              onClick={toggleSort}
            >
              <span className="inline-flex items-center gap-1.5">
                Now
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              </span>
            </th>
            <th className="py-3.5 px-3 text-center">+6 Hours</th>
            <th className="py-3.5 px-3 text-center">+12 Hours</th>
            <th className="py-3.5 px-3 text-center">+24 Hours</th>
            <th className="py-3.5 px-3 text-center">+48 Hours</th>
            <th className="py-3.5 px-3 text-center">+72 Hours</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-slate-100 font-mono">
          {data.map((row) => (
            <tr key={row.zone} className="hover:bg-slate-50/70 transition-colors">
              <td className="py-3.5 px-4 text-slate-900 font-sans font-semibold text-sm flex items-center justify-between gap-3">
                <span>{row.zone}</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase font-semibold">
                  {row.type}
                </span>
              </td>
              <td className="py-2.5 px-3 text-center">
                <span className={cn("inline-block px-3 py-1 rounded text-sm font-bold border", getCellBadge(row.now))}>
                  {row.now}%
                </span>
              </td>
              <td className="py-2.5 px-3 text-center">
                <span className={cn("inline-block px-3 py-1 rounded text-sm font-bold border", getCellBadge(row.h6))}>
                  {row.h6}%
                </span>
              </td>
              <td className="py-2.5 px-3 text-center">
                <span className={cn("inline-block px-3 py-1 rounded text-sm font-bold border", getCellBadge(row.h12))}>
                  {row.h12}%
                </span>
              </td>
              <td className="py-2.5 px-3 text-center">
                <span className={cn("inline-block px-3 py-1 rounded text-sm font-bold border", getCellBadge(row.h24))}>
                  {row.h24}%
                </span>
              </td>
              <td className="py-2.5 px-3 text-center">
                <span className={cn("inline-block px-3 py-1 rounded text-sm font-bold border", getCellBadge(row.h48))}>
                  {row.h48}%
                </span>
              </td>
              <td className="py-2.5 px-3 text-center">
                <span className={cn("inline-block px-3 py-1 rounded text-sm font-bold border", getCellBadge(row.h72))}>
                  {row.h72}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Legend Footer */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-sans">
        <span>Click 'NOW' column to toggle risk priority ranking</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-emerald-100 border border-emerald-400" />
            &lt;40% (Low)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-amber-100 border border-amber-400" />
            40–60% (Moderate)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-rose-100 border border-rose-400" />
            60–80% (Elevated)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-red-200 border border-red-500" />
            &gt;80% (Critical)
          </span>
        </div>
      </div>
    </div>
  );
}

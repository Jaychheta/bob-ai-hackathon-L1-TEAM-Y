import React from "react";

/**
 * PortFlow AI — Bespoke Marine Domain Brandmark
 *
 * Core Nautical Elements:
 * 1. Nautical Helm (Ship's Wheel / Navigational Compass) at the apex
 * 2. Deepwater Marine Anchor with hydrodynamic flukes
 * 3. Sweeping Ocean Waves (PortFlow current dynamics)
 * 4. Deep Oceanic Midnight chassis with cyan specular highlights
 */
export function PortFlowLogo({ size = 32, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="PortFlow AI Marine Logo"
    >
      <defs>
        {/* Deep Ocean Midnight Chassis Gradient */}
        <linearGradient
          id="marine_bg"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#08142c" />
          <stop offset="50%" stopColor="#040b19" />
          <stop offset="100%" stopColor="#01040f" />
        </linearGradient>

        {/* Chassis Specular Rim Highlight */}
        <linearGradient
          id="marine_border"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
          <stop offset="45%" stopColor="#0284c7" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
        </linearGradient>

        {/* Anchor & Marine Alloy Gradient */}
        <linearGradient
          id="anchor_gold_cyan"
          x1="16"
          y1="4"
          x2="16"
          y2="25"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="25%" stopColor="#38bdf8" />
          <stop offset="70%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>

        {/* Ocean Wave 1 Gradient */}
        <linearGradient
          id="marine_wave_top"
          x1="5"
          y1="22"
          x2="27"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#0284c7" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
        </linearGradient>

        {/* Ocean Wave 2 Gradient */}
        <linearGradient
          id="marine_wave_bottom"
          x1="8"
          y1="26"
          x2="24"
          y2="26"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#0369a1" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#0284c7" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0369a1" stopOpacity="0.1" />
        </linearGradient>

        {/* Ambient Oceanic Glow */}
        <radialGradient
          id="marine_glow"
          cx="16"
          cy="15"
          r="10"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
          <stop offset="65%" stopColor="#0284c7" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 1. Deep Ocean Squircle Chassis */}
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="8"
        fill="url(#marine_bg)"
        stroke="url(#marine_border)"
        strokeWidth="1"
      />

      {/* 2. Ambient Top Sheen */}
      <path
        d="M 1 8.5 C 1 4.35 4.35 1 8.5 1 L 23.5 1 C 27.65 1 31 4.35 31 8.5 L 31 12 C 24 10 14 10 1 13.5 Z"
        fill="#ffffff"
        opacity="0.06"
      />

      {/* 3. Oceanic Heart Glow */}
      <circle cx="16" cy="15" r="9" fill="url(#marine_glow)" />

      {/* 4. Ocean Flow Wave 1 (Mid current) */}
      <path
        d="M 5 21.5 C 9 19.8 13 19.8 16 21.5 C 19 23.2 23 23.2 27 21.5"
        stroke="url(#marine_wave_top)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* 5. Ocean Flow Wave 2 (Deep current) */}
      <path
        d="M 8 25 C 11 23.8 14 23.8 16 25 C 18 26.2 21 26.2 24 25"
        stroke="url(#marine_wave_bottom)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* 6. The Marine Anchor Structure */}
      <g>
        {/* Anchor Shank (Center Vertical Column) */}
        <rect
          x="14.6"
          y="8.5"
          width="2.8"
          height="14.5"
          rx="1.4"
          fill="url(#anchor_gold_cyan)"
        />

        {/* Anchor Stock (Horizontal Crossbar) */}
        <rect
          x="9"
          y="10.5"
          width="14"
          height="2.2"
          rx="1.1"
          fill="url(#anchor_gold_cyan)"
        />
        {/* Stock Rivet Caps */}
        <circle cx="9.8" cy="11.6" r="1.1" fill="#e0f2fe" />
        <circle cx="22.2" cy="11.6" r="1.1" fill="#e0f2fe" />

        {/* Anchor Arms & Flukes (Sweeping Maritime Crescent) */}
        <path
          d="M 7.5 16.5 C 7.5 22.2 11 25.2 16 25.2 C 21 25.2 24.5 22.2 24.5 16.5"
          stroke="url(#anchor_gold_cyan)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* Left Fluke Point (Arrow Head) */}
        <path
          d="M 6 17.5 L 7.5 14.8 L 9 17.5 Z"
          fill="#38bdf8"
        />

        {/* Right Fluke Point (Arrow Head) */}
        <path
          d="M 23 17.5 L 24.5 14.8 L 26 17.5 Z"
          fill="#38bdf8"
        />

        {/* Center Anchor Crown Node */}
        <circle cx="16" cy="24.8" r="1.3" fill="#38bdf8" />
      </g>

      {/* 7. Nautical Helm (Ship's Wheel Ring & Spokes) at Top */}
      <g>
        {/* Outer Wheel Ring */}
        <circle
          cx="16"
          cy="6.8"
          r="2.8"
          stroke="#e0f2fe"
          strokeWidth="1.3"
          fill="#061226"
        />
        {/* Helm Handles (4 Cardinal Spokes) */}
        <line x1="16" y1="3" x2="16" y2="4" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="16" y1="9.6" x2="16" y2="10.6" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="12.2" y1="6.8" x2="13.2" y2="6.8" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="18.8" y1="6.8" x2="19.8" y2="6.8" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />

        {/* Core Navigation Beacon / AI Spark */}
        <circle cx="16" cy="6.8" r="1.1" fill="#ffffff" />
      </g>
    </svg>
  );
}



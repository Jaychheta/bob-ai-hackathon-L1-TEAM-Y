import React from "react";
import { 
  ShieldCheck, 
  AlertCircle, 
  AlertTriangle, 
  AlertOctagon, 
  Anchor, 
  Clock, 
  Navigation, 
  Sparkles, 
  CheckCircle2, 
  Ship, 
  Wrench, 
  Flame,
  Check
} from "lucide-react";
import { cn } from "../../utils/cn";

/**
 * Risk Severity Badge
 * Instantly identifies risk levels using curated colors, standard icons, and bold mono font.
 */
export function RiskBadge({ level, size = "md", className = "" }) {
  const normalized = (level || "LOW").toUpperCase();

  const config = {
    LOW: {
      bg: "bg-emerald-50",
      text: "text-emerald-800",
      border: "border-emerald-300",
      icon: ShieldCheck,
      iconColor: "text-emerald-600",
      label: "LOW RISK",
    },
    MEDIUM: {
      bg: "bg-amber-50",
      text: "text-amber-900",
      border: "border-amber-300",
      icon: AlertCircle,
      iconColor: "text-amber-600",
      label: "MEDIUM",
    },
    HIGH: {
      bg: "bg-rose-50",
      text: "text-rose-900",
      border: "border-rose-300",
      icon: AlertTriangle,
      iconColor: "text-rose-600",
      label: "HIGH RISK",
    },
    CRITICAL: {
      bg: "bg-red-100",
      text: "text-red-950",
      border: "border-red-400",
      icon: AlertOctagon,
      iconColor: "text-red-700",
      label: "CRITICAL",
    },
  };

  const current = config[normalized] || config.LOW;
  const Icon = current.icon;

  const sizeStyles = {
    sm: "px-2.5 py-1 text-xs gap-1.5",
    md: "px-3 py-1 text-xs gap-1.5 font-bold",
    lg: "px-3.5 py-1.5 text-sm gap-2 font-bold",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-4.5 h-4.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border font-mono font-bold tracking-wider select-none shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
        current.bg,
        current.text,
        current.border,
        sizeStyles[size] || sizeStyles.md,
        className
      )}
    >
      <Icon className={cn("shrink-0 stroke-[2.2]", current.iconColor, iconSizes[size] || iconSizes.md)} />
      <span>{current.label}</span>
    </span>
  );
}

/**
 * Operational Status Badge
 * Instantly identifies vessel, berth, crane, or schedule states using dedicated icons and colors.
 */
export function StatusBadge({ status, size = "md", className = "" }) {
  const normalized = (status || "").toLowerCase();

  const config = {
    berthed: {
      bg: "bg-sky-50",
      text: "text-sky-900",
      border: "border-sky-300",
      icon: Anchor,
      iconColor: "text-sky-700",
      label: "Berthed",
    },
    waiting: {
      bg: "bg-amber-50",
      text: "text-amber-900",
      border: "border-amber-300",
      icon: Clock,
      iconColor: "text-amber-700",
      label: "In Queue",
    },
    departed: {
      bg: "bg-slate-100",
      text: "text-slate-800",
      border: "border-slate-300",
      icon: Navigation,
      iconColor: "text-slate-600",
      label: "Departed",
    },
    free: {
      bg: "bg-emerald-50",
      text: "text-emerald-900",
      border: "border-emerald-300",
      icon: CheckCircle2,
      iconColor: "text-emerald-700",
      label: "Available",
    },
    occupied: {
      bg: "bg-rose-50",
      text: "text-rose-900",
      border: "border-rose-300",
      icon: Ship,
      iconColor: "text-rose-700",
      label: "Occupied",
    },
    maintenance: {
      bg: "bg-orange-50",
      text: "text-orange-950",
      border: "border-orange-300",
      icon: Wrench,
      iconColor: "text-orange-700",
      label: "Maintenance",
    },
    applied: {
      bg: "bg-emerald-50",
      text: "text-emerald-950",
      border: "border-emerald-300",
      icon: CheckCircle2,
      iconColor: "text-emerald-700",
      label: "Applied",
    },
    pending: {
      bg: "bg-amber-50",
      text: "text-amber-900",
      border: "border-amber-300",
      icon: Clock,
      iconColor: "text-amber-700",
      label: "Pending",
    },
  };

  const current = config[normalized] || {
    bg: "bg-slate-100",
    text: "text-slate-800",
    border: "border-slate-300",
    icon: Sparkles,
    iconColor: "text-slate-600",
    label: status || "Unknown",
  };

  const Icon = current.icon;

  const sizeStyles = {
    sm: "px-2.5 py-1 text-xs gap-1.5",
    md: "px-3 py-1 text-xs gap-1.5 font-semibold",
    lg: "px-3.5 py-1.5 text-sm gap-2 font-semibold",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-4.5 h-4.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border font-sans font-semibold tracking-tight select-none shadow-[0_1px_2px_rgba(0,0,0,0.03)]",
        current.bg,
        current.text,
        current.border,
        sizeStyles[size] || sizeStyles.md,
        className
      )}
    >
      <Icon className={cn("shrink-0 stroke-[2.2]", current.iconColor, iconSizes[size] || iconSizes.md)} />
      <span>{current.label}</span>
    </span>
  );
}

/**
 * Operations Priority Badge
 * Highlights operational plan urgency (P1, P2, P3) with distinct alert icons and mono font.
 */
export function PriorityBadge({ priority = 1, className = "" }) {
  const config = {
    1: {
      bg: "bg-red-50",
      text: "text-red-950",
      border: "border-red-300",
      icon: Flame,
      iconColor: "text-red-700",
      label: "P1 • CRITICAL",
    },
    2: {
      bg: "bg-amber-50",
      text: "text-amber-950",
      border: "border-amber-300",
      icon: AlertTriangle,
      iconColor: "text-amber-700",
      label: "P2 • HIGH",
    },
    3: {
      bg: "bg-sky-50",
      text: "text-sky-950",
      border: "border-sky-300",
      icon: Clock,
      iconColor: "text-sky-700",
      label: "P3 • MEDIUM",
    },
    4: {
      bg: "bg-slate-100",
      text: "text-slate-800",
      border: "border-slate-300",
      icon: Check,
      iconColor: "text-slate-600",
      label: "P4 • ROUTINE",
    },
  };

  const current = config[priority] || config[4];
  const Icon = current.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-md border font-mono font-bold text-xs select-none tracking-wider shadow-[0_1px_2px_rgba(0,0,0,0.03)]",
        current.bg,
        current.text,
        current.border,
        className
      )}
    >
      <Icon className={cn("w-3.5 h-3.5 shrink-0 stroke-[2.2]", current.iconColor)} />
      <span>{current.label}</span>
    </span>
  );
}

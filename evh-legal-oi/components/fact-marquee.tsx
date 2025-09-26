"use client"

import type React from "react"

import { useState } from "react"
import { TrendingUp, TrendingDown, AlertTriangle, Shield, FileText, Users, Clock, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Fact {
  id: string
  text: string
  value: string
  trend?: "up" | "down" | "stable"
  change?: string
  icon: React.ComponentType<{ className?: string }>
  priority: "high" | "medium" | "low"
}

const facts: Fact[] = [
  {
    id: "1",
    text: "Active Compliance Issues",
    value: "3",
    trend: "down",
    change: "-2 from last week",
    icon: AlertTriangle,
    priority: "high",
  },
  {
    id: "2",
    text: "Entities Under Management",
    value: "47",
    trend: "up",
    change: "+3 this month",
    icon: Users,
    priority: "medium",
  },
  {
    id: "3",
    text: "Upcoming Filing Deadlines",
    value: "12",
    trend: "stable",
    change: "Next: March 15",
    icon: Clock,
    priority: "high",
  },
  {
    id: "4",
    text: "Documents Processed Today",
    value: "156",
    trend: "up",
    change: "+23% vs yesterday",
    icon: FileText,
    priority: "low",
  },
  {
    id: "5",
    text: "Compliance Score",
    value: "94%",
    trend: "up",
    change: "+2% this quarter",
    icon: Shield,
    priority: "medium",
  },
  {
    id: "6",
    text: "Completed Filings",
    value: "28",
    trend: "up",
    change: "100% on-time rate",
    icon: CheckCircle,
    priority: "low",
  },
]

export function FactMarquee() {
  const [isPaused, setIsPaused] = useState(false)

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-emerald-500" />
      case "down":
        return <TrendingDown className="h-3 w-3 text-red-500" />
      default:
        return null
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-200 bg-red-50/50 text-red-900"
      case "medium":
        return "border-amber-200 bg-amber-50/50 text-amber-900"
      default:
        return "border-emerald-200 bg-emerald-50/50 text-emerald-900"
    }
  }

  // Duplicate facts for seamless loop
  const duplicatedFacts = [...facts, ...facts]

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-surface-900 via-surface-800 to-surface-900 border border-border-weak rounded-lg shadow-sm">
      <div
        className={cn("flex gap-6 py-4 px-2", "animate-marquee", isPaused && "animation-paused")}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{
          animationDuration: "60s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {duplicatedFacts.map((fact, index) => {
          const Icon = fact.icon
          return (
            <div
              key={`${fact.id}-${index}`}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg border whitespace-nowrap min-w-fit",
                getPriorityColor(fact.priority),
                "hover:scale-105 transition-transform duration-200",
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{fact.text}:</span>
                <span className="text-lg font-bold">{fact.value}</span>
                {fact.trend && (
                  <div className="flex items-center gap-1">
                    {getTrendIcon(fact.trend)}
                    <span className="text-xs opacity-75">{fact.change}</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

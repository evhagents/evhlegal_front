"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Building2, AlertTriangle, CheckCircle, Clock } from "lucide-react"

interface ActivityItem {
  id: string
  type: "document" | "entity" | "compliance" | "filing"
  title: string
  description: string
  timestamp: string
  status: "success" | "warning" | "error" | "info"
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: "1",
      type: "document",
      title: "Document Analysis Complete",
      description: "Annual Report 2024 processed successfully",
      timestamp: "2 minutes ago",
      status: "success",
    },
    {
      id: "2",
      type: "compliance",
      title: "Compliance Alert",
      description: "Entity B requires updated filing by Dec 31",
      timestamp: "15 minutes ago",
      status: "warning",
    },
    {
      id: "3",
      type: "entity",
      title: "New Entity Added",
      description: "Entity C registered in Delaware",
      timestamp: "1 hour ago",
      status: "info",
    },
    {
      id: "4",
      type: "filing",
      title: "Filing Submitted",
      description: "Form 10-K submitted for Entity A",
      timestamp: "2 hours ago",
      status: "success",
    },
    {
      id: "5",
      type: "compliance",
      title: "Risk Assessment Updated",
      description: "Entity A compliance score improved to 95%",
      timestamp: "3 hours ago",
      status: "success",
    },
  ])

  const getIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4" />
      case "entity":
        return <Building2 className="h-4 w-4" />
      case "compliance":
        return <AlertTriangle className="h-4 w-4" />
      case "filing":
        return <Clock className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-primary"
      case "warning":
        return "text-yellow-500"
      case "error":
        return "text-red-500"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div
          key={activity.id}
          className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
        >
          <div className={`mt-0.5 ${getStatusColor(activity.status)}`}>{getIcon(activity.type)}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-brown text-foreground truncate border-popover-foreground">{activity.title}</h4>
              <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{activity.timestamp}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
          </div>
        </div>
      ))}

      <div className="flex justify-center pt-4">
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          Load more activities
        </Button>
      </div>
    </div>
  )
}

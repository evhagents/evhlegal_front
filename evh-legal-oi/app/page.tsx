"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import { EntityNodeTree } from "@/components/entity-node-tree"
import { ComplianceHeatMap } from "@/components/compliance-heat-map"
import { ActivityFeed } from "@/components/activity-feed"
import { ChatbotInterface } from "@/components/chatbot-interface"

export default function Dashboard() {
  const [isActivityCollapsed, setIsActivityCollapsed] = useState(false)

  return (
    <div className="p-6">
      <ChatbotInterface />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Compliance Heat Map */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-primary">Compliance Heat Map</CardTitle>
            <Button variant="ghost" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <ComplianceHeatMap />
          </CardContent>
        </Card>

        {/* Entity Relationship Tree */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-primary">Entity Relationships</CardTitle>
            <Button variant="ghost" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <EntityNodeTree />
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-primary">Recent Activity</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              Live
            </Badge>
            <Button variant="ghost" size="sm" onClick={() => setIsActivityCollapsed(!isActivityCollapsed)}>
              <ChevronRight className={`h-4 w-4 transition-transform ${isActivityCollapsed ? "rotate-90" : ""}`} />
            </Button>
          </div>
        </CardHeader>
        {!isActivityCollapsed && (
          <CardContent>
            <ActivityFeed />
          </CardContent>
        )}
      </Card>
    </div>
  )
}

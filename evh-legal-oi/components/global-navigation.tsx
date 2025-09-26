"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Building2,
  FileText,
  AlertTriangle,
  Users,
  Shield,
  Bell,
  Settings,
  Menu,
  X,
  Activity,
  Brain,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeChanger } from "./theme-changer"

export function GlobalNavigation() {
  const [timeRange, setTimeRange] = useState("Last 12 hours")
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <aside
      className={`${isSidebarCollapsed ? "w-16" : "w-64"} border-r border-border bg-card transition-all duration-300 fixed left-0 top-0 h-full z-50`}
    >
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-lg font-semibold text-foreground">EVH Legal</h1>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            </div>
          )}
          {isSidebarCollapsed && <Shield className="h-6 w-6 text-primary mx-auto" />}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="ml-auto"
          >
            {isSidebarCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>

        <div className="space-y-1 flex-1">
          <Link href="/">
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                isActive("/")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              } ${isSidebarCollapsed ? "justify-center" : ""}`}
            >
              <Activity className="h-4 w-4" />
              {!isSidebarCollapsed && <span className="text-sm font-medium">Overview</span>}
            </div>
          </Link>

          <Link href="/ai-risk-dashboard">
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                isActive("/ai-risk-dashboard")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              } ${isSidebarCollapsed ? "justify-center" : ""}`}
            >
              <Brain className="h-4 w-4" />
              {!isSidebarCollapsed && <span className="text-sm font-medium">AI Risk Dashboard</span>}
            </div>
          </Link>

          <Link href="/ai-doc-chat">
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                isActive("/ai-doc-chat")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              } ${isSidebarCollapsed ? "justify-center" : ""}`}
            >
              <FileText className="h-4 w-4" />
              {!isSidebarCollapsed && <span className="text-sm font-medium">AI Doc Chat</span>}
            </div>
          </Link>

          <Link href="/entities">
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                isActive("/entities")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              } ${isSidebarCollapsed ? "justify-center" : ""}`}
            >
              <Building2 className="h-4 w-4" />
              {!isSidebarCollapsed && <span className="text-sm font-medium">Entities</span>}
            </div>
          </Link>

          <Link href="/compliance">
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                isActive("/compliance")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              } ${isSidebarCollapsed ? "justify-center" : ""}`}
            >
              <AlertTriangle className="h-4 w-4" />
              {!isSidebarCollapsed && <span className="text-sm font-medium">Compliance</span>}
            </div>
          </Link>

          <Link href="/users">
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                isActive("/users")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              } ${isSidebarCollapsed ? "justify-center" : ""}`}
            >
              <Users className="h-4 w-4" />
              {!isSidebarCollapsed && <span className="text-sm font-medium">Users</span>}
            </div>
          </Link>

          <Button
            variant="ghost"
            className={`w-full text-muted-foreground hover:bg-secondary hover:text-foreground ${isSidebarCollapsed ? "justify-center px-2" : "justify-start"}`}
          >
            <AlertTriangle className="h-4 w-4" />
            {!isSidebarCollapsed && <span className="ml-2">Compliance</span>}
          </Button>
        </div>

        {!isSidebarCollapsed && (
          <div className="mt-auto space-y-3">
            <div className="flex justify-center">
              <ThemeChanger />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Production</span>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-secondary text-secondary-foreground border border-border rounded px-2 py-1 text-xs"
                >
                  <option>Last 12 hours</option>
                  <option>Last 24 hours</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

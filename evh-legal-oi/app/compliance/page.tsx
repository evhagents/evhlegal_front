"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Marquee from "react-fast-marquee"
import {
  AlertTriangle,
  Calendar,
  Clock,
  Search,
  Filter,
  Bell,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  TrendingUp,
  Shield,
} from "lucide-react"

// Mock data representing the transformation from vague requirements to sharp obligations
const filingRequirements = [
  {
    id: "req-001",
    vague_requirement: "Annual Report",
    entity: "EVH Legal",
    sharp_obligation: "Delaware Annual Report Filing",
    due_date: "2025-03-01",
    days_until_due: 157,
    status: "pending",
    priority: "high",
    estimated_hours: 8,
    assigned_to: "Legal Team",
    last_filed: "2024-03-01",
    penalty_risk: "$200 late fee + $50/month",
    alert_schedule: ["30 days", "15 days", "5 days"],
  },
  {
    id: "req-002",
    vague_requirement: "Tax Return",
    entity: "Entity A Corp",
    sharp_obligation: "Federal Corporate Tax Return (Form 1120)",
    due_date: "2025-04-15",
    days_until_due: 202,
    status: "in_progress",
    priority: "critical",
    estimated_hours: 24,
    assigned_to: "Tax Advisor",
    last_filed: "2024-04-15",
    penalty_risk: "5% of unpaid tax + interest",
    alert_schedule: ["60 days", "30 days", "15 days", "5 days"],
  },
  {
    id: "req-003",
    vague_requirement: "Quarterly Report",
    entity: "Entity B LLC",
    sharp_obligation: "Q4 2024 Financial Report to Members",
    due_date: "2025-01-31",
    days_until_due: 27,
    status: "overdue",
    priority: "critical",
    estimated_hours: 12,
    assigned_to: "CFO",
    last_filed: "2024-10-31",
    penalty_risk: "Member agreement violation",
    alert_schedule: ["15 days", "5 days", "1 day"],
  },
  {
    id: "req-004",
    vague_requirement: "State Registration",
    entity: "Entity C Partners",
    sharp_obligation: "California Partnership Registration Renewal",
    due_date: "2025-02-15",
    days_until_due: 42,
    status: "pending",
    priority: "high",
    estimated_hours: 4,
    assigned_to: "Compliance Officer",
    last_filed: "2024-02-15",
    penalty_risk: "$250 penalty + suspension risk",
    alert_schedule: ["30 days", "15 days", "5 days"],
  },
  {
    id: "req-005",
    vague_requirement: "Insurance Review",
    entity: "EVH Legal",
    sharp_obligation: "D&O Insurance Policy Renewal Decision",
    due_date: "2025-06-30",
    days_until_due: 278,
    status: "scheduled",
    priority: "medium",
    estimated_hours: 6,
    assigned_to: "Risk Manager",
    last_filed: "2024-06-30",
    penalty_risk: "Coverage gap exposure",
    alert_schedule: ["90 days", "60 days", "30 days"],
  },
  {
    id: "req-006",
    vague_requirement: "Employment Filing",
    entity: "Entity A Corp",
    sharp_obligation: "Quarterly Payroll Tax Report (Form 941)",
    due_date: "2025-01-31",
    days_until_due: 27,
    status: "filed",
    priority: "high",
    estimated_hours: 3,
    assigned_to: "Payroll Service",
    last_filed: "2025-01-28",
    penalty_risk: "2% of unpaid tax",
    alert_schedule: ["30 days", "15 days", "5 days"],
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "filed":
      return "text-green-600 bg-green-50 border-green-200"
    case "in_progress":
      return "text-blue-600 bg-blue-50 border-blue-200"
    case "pending":
      return "text-yellow-600 bg-yellow-50 border-yellow-200"
    case "scheduled":
      return "text-purple-600 bg-purple-50 border-purple-200"
    case "overdue":
      return "text-red-600 bg-red-50 border-red-200"
    default:
      return "text-gray-600 bg-gray-50 border-gray-200"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "critical":
      return "text-red-600 bg-red-50 border-red-200"
    case "high":
      return "text-orange-600 bg-orange-50 border-orange-200"
    case "medium":
      return "text-yellow-600 bg-yellow-50 border-yellow-200"
    case "low":
      return "text-green-600 bg-green-50 border-green-200"
    default:
      return "text-gray-600 bg-gray-50 border-gray-200"
  }
}

const getUrgencyColor = (days: number) => {
  if (days < 0) return "text-red-600 bg-red-50"
  if (days <= 7) return "text-orange-600 bg-orange-50"
  if (days <= 30) return "text-yellow-600 bg-yellow-50"
  return "text-green-600 bg-green-50"
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "filed":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "in_progress":
      return <Clock className="h-4 w-4 text-blue-600" />
    case "pending":
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    case "scheduled":
      return <Calendar className="h-4 w-4 text-purple-600" />
    case "overdue":
      return <XCircle className="h-4 w-4 text-red-600" />
    default:
      return <Clock className="h-4 w-4 text-gray-600" />
  }
}

export default function CompliancePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredRequirements = useMemo(() => {
    return filingRequirements.filter((req) => {
      const matchesSearch =
        req.vague_requirement.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.sharp_obligation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.entity.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "all" || req.status === statusFilter
      const matchesPriority = priorityFilter === "all" || req.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [searchQuery, statusFilter, priorityFilter])

  const stats = useMemo(() => {
    const total = filingRequirements.length
    const overdue = filingRequirements.filter((req) => req.status === "overdue").length
    const dueThisWeek = filingRequirements.filter((req) => req.days_until_due <= 7 && req.days_until_due >= 0).length
    const critical = filingRequirements.filter((req) => req.priority === "critical").length

    return { total, overdue, dueThisWeek, critical }
  }, [])

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Compliance Dashboard</h1>
          <p className="text-muted-foreground">
            Transforming vague requirements into sharp obligations. Foresight before panic.
          </p>
        </div>
        <div className="w-80">
          <Marquee
            speed={30}
            pauseOnHover={true}
            gradient={true}
            gradientColor="hsl(var(--background))"
            gradientWidth={20}
          >
            <Button variant="outline" size="sm" className="mx-2 bg-transparent">
              <Bell className="h-4 w-4 mr-2" />
              Alert Settings
            </Button>
            <Button variant="outline" size="sm" className="mx-2 bg-transparent">
              <FileText className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="sm" className="mx-2 bg-transparent">
              <Shield className="h-4 w-4 mr-2" />
              Audit Trail
            </Button>
            <Button variant="outline" size="sm" className="mx-2 bg-transparent">
              <TrendingUp className="h-4 w-4 mr-2" />
              Analytics
            </Button>
          </Marquee>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Requirements</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Due This Week</p>
                <p className="text-2xl font-bold text-orange-600">{stats.dueThisWeek}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Priority</p>
                <p className="text-2xl font-bold text-red-600">{stats.critical}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardContent className="p-4">
          <Marquee speed={40} pauseOnHover={true} gradient={true} gradientColor="rgb(255, 247, 237)" gradientWidth={30}>
            <div className="flex items-center gap-6 text-sm font-medium text-orange-800">
              <span className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Q4 2024 Financial Report overdue by 27 days
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Federal Tax Return due in 202 days
              </span>
              <span className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                California Partnership Registration due in 42 days
              </span>
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                D&O Insurance renewal decision needed in 278 days
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Quarterly Payroll Tax Report filed successfully
              </span>
            </div>
          </Marquee>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filing Requirements → Due Instances
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search requirements, obligations, or entities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="all">All Statuses</option>
              <option value="overdue">Overdue</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="scheduled">Scheduled</option>
              <option value="filed">Filed</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Requirements Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transformation</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequirements.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground line-through">"{req.vague_requirement}"</div>
                        <div className="font-medium text-foreground">{req.sharp_obligation}</div>
                        <div className="text-xs text-muted-foreground">
                          Est. {req.estimated_hours}h • {req.assigned_to}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {req.entity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{req.due_date}</div>
                        <Badge variant="outline" className={`text-xs ${getUrgencyColor(req.days_until_due)}`}>
                          {req.days_until_due < 0
                            ? `${Math.abs(req.days_until_due)} days overdue`
                            : `${req.days_until_due} days left`}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(req.status)}
                        <Badge variant="outline" className={`text-xs ${getStatusColor(req.status)}`}>
                          {req.status.replace("_", " ")}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs ${getPriorityColor(req.priority)}`}>
                        {req.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs text-muted-foreground max-w-32">{req.penalty_risk}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Bell className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredRequirements.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No filing requirements match your current filters.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Alert Philosophy */}
      <Card className="border-l-4 border-l-orange-500">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Compliance Philosophy</h3>
              <p className="text-sm text-muted-foreground">
                Compliance is boring until it's catastrophic. This dashboard transforms vague requirements into sharp,
                actionable obligations with automated alerts, audit trails, and penalty risk assessment. We provide
                foresight before panic, dashboards before fines.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

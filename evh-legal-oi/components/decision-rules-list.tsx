"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react"

interface DecisionRule {
  id: string // UUID PRIMARY KEY
  id_slug: string // stable identifier like 'liability-cap-saas-12mo-fees'
  version: string // semver-like string '1.3.0'
  status: "draft" | "active" | "pending" | "inactive" | "review"
  priority: "high" | "medium" | "low"
  rule_text: string // the actual rule content
  created_date: string
  last_updated: string
}

const mockDecisionRules: DecisionRule[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    id_slug: "entity-formation-docs-req",
    version: "2.1.0",
    status: "active",
    priority: "high",
    rule_text:
      "All new entity formations must include complete documentation package with articles of incorporation, bylaws, and initial board resolutions within 30 days of formation.",
    created_date: "2024-01-15",
    last_updated: "2024-01-20",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    id_slug: "insurance-policy-review-cycle",
    version: "1.5.2",
    status: "active",
    priority: "medium",
    rule_text:
      "Insurance policies must be reviewed quarterly for coverage adequacy and premium optimization opportunities. Reviews must be documented and approved by risk management.",
    created_date: "2024-01-12",
    last_updated: "2024-01-18",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    id_slug: "cap-table-update-notifications",
    version: "3.0.1",
    status: "pending",
    priority: "high",
    rule_text:
      "All cap table changes must be communicated to stakeholders within 5 business days of execution via secure notification system.",
    created_date: "2024-01-10",
    last_updated: "2024-01-16",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    id_slug: "bank-reconciliation-standards",
    version: "1.8.0",
    status: "active",
    priority: "medium",
    rule_text:
      "Monthly bank reconciliations must be completed within 10 days of month-end with documented variance explanations exceeding $1,000.",
    created_date: "2024-01-08",
    last_updated: "2024-01-14",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    id_slug: "filing-deadline-alert-system",
    version: "2.3.1",
    status: "review",
    priority: "high",
    rule_text:
      "Automated alerts must be configured 30, 15, and 5 days before any regulatory filing deadlines with escalation to compliance officer.",
    created_date: "2024-01-05",
    last_updated: "2024-01-12",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    id_slug: "contract-approval-workflow",
    version: "4.1.0",
    status: "active",
    priority: "high",
    rule_text:
      "All contracts exceeding $50,000 require legal review and C-level approval before execution. Emergency contracts may be approved retroactively within 48 hours.",
    created_date: "2024-01-03",
    last_updated: "2024-01-10",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    id_slug: "data-retention-policy-impl",
    version: "1.2.3",
    status: "draft",
    priority: "medium",
    rule_text:
      "Implement 7-year retention policy for financial records and 3-year policy for operational documents with automated deletion workflows.",
    created_date: "2024-01-01",
    last_updated: "2024-01-08",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440008",
    id_slug: "board-meeting-docs-standards",
    version: "2.0.5",
    status: "active",
    priority: "medium",
    rule_text:
      "Board meeting minutes must be prepared within 48 hours and distributed to all directors within 5 business days via secure portal.",
    created_date: "2023-12-28",
    last_updated: "2024-01-05",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440009",
    id_slug: "vendor-due-diligence-req",
    version: "1.0.8",
    status: "inactive",
    priority: "low",
    rule_text:
      "All new vendors must complete security questionnaire and provide insurance certificates before contract execution. Annual reviews required for active vendors.",
    created_date: "2023-12-25",
    last_updated: "2024-01-02",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440010",
    id_slug: "employee-stock-option-grants",
    version: "3.2.1",
    status: "active",
    priority: "high",
    rule_text:
      "Stock option grants require compensation committee approval and must be documented within equity management system within 24 hours of approval.",
    created_date: "2023-12-20",
    last_updated: "2023-12-28",
  },
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200"
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "low":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-600" />
    case "review":
      return <AlertTriangle className="h-4 w-4 text-orange-600" />
    case "draft":
      return <Clock className="h-4 w-4 text-blue-600" />
    case "inactive":
      return <XCircle className="h-4 w-4 text-gray-600" />
    default:
      return <Clock className="h-4 w-4 text-gray-600" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 border-green-200"
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "review":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "draft":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "inactive":
      return "bg-gray-100 text-gray-800 border-gray-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function DecisionRulesList() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRules = useMemo(() => {
    if (!searchQuery.trim()) return mockDecisionRules

    const query = searchQuery.toLowerCase()
    return mockDecisionRules.filter(
      (rule) =>
        rule.id_slug.toLowerCase().includes(query) ||
        rule.rule_text.toLowerCase().includes(query) ||
        rule.version.toLowerCase().includes(query) ||
        rule.status.toLowerCase().includes(query) ||
        rule.priority.toLowerCase().includes(query),
    )
  }, [searchQuery])

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search decision rules by slug, rule text, version, or status..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Rules List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredRules.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No decision rules found matching your search.</div>
        ) : (
          filteredRules.map((rule) => (
            <Card key={rule.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(rule.status)}
                      <h4 className="font-semibold text-sm truncate font-mono">{rule.id_slug}</h4>
                      <Badge variant="outline" className={`text-xs ${getPriorityColor(rule.priority)}`}>
                        {rule.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{rule.rule_text}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs font-mono">
                        v{rule.version}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${getStatusColor(rule.status)}`}>
                        {rule.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right text-xs text-muted-foreground whitespace-nowrap">
                    <div className="font-mono">{rule.id.slice(0, 8)}...</div>
                    <div>Updated: {new Date(rule.last_updated).toLocaleDateString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Results Summary */}
      {searchQuery && (
        <div className="text-xs text-muted-foreground text-center">
          Showing {filteredRules.length} of {mockDecisionRules.length} decision rules
        </div>
      )}
    </div>
  )
}

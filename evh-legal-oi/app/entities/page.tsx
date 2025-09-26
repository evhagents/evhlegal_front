"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  AlertTriangle,
  Shield,
  DollarSign,
  FileText,
  Calendar,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

// Mock data for entities with all requested information
const entitiesData = [
  {
    entity_id: "EVH-001",
    name: "EVH Legal",
    type: "Parent Company",
    risk_profile: {
      overall_score: 85,
      level: "Low",
      factors: ["Strong compliance history", "Adequate insurance coverage", "Regular filings"],
    },
    cap_tables_entries: [
      { shareholder: "Founders", percentage: 65, shares: 650000 },
      { shareholder: "Series A Investors", percentage: 25, shares: 250000 },
      { shareholder: "Employee Pool", percentage: 10, shares: 100000 },
    ],
    insurance_policies: [
      { type: "General Liability", provider: "AIG", coverage: "$2M", expiry: "2024-12-31", status: "Active" },
      { type: "Professional Liability", provider: "Chubb", coverage: "$5M", expiry: "2024-11-15", status: "Active" },
      {
        type: "Cyber Liability",
        provider: "Travelers",
        coverage: "$1M",
        expiry: "2024-10-30",
        status: "Expiring Soon",
      },
    ],
    bank_profiles: [
      { bank: "JPMorgan Chase", account_type: "Operating", balance: "$2.5M", status: "Active" },
      { bank: "Silicon Valley Bank", account_type: "Escrow", balance: "$500K", status: "Active" },
    ],
    filing_due_instances: [
      { form: "Form 10-K", due_date: "2024-03-15", status: "Pending", priority: "High" },
      { form: "State Annual Report", due_date: "2024-02-28", status: "Filed", priority: "Medium" },
      { form: "Tax Return", due_date: "2024-04-15", status: "In Progress", priority: "High" },
    ],
  },
  {
    entity_id: "ENT-A-002",
    name: "Entity A Corp",
    type: "Subsidiary",
    risk_profile: {
      overall_score: 72,
      level: "Medium",
      factors: ["Recent compliance issues", "Insurance gaps identified", "Delayed filings"],
    },
    cap_tables_entries: [
      { shareholder: "EVH Legal", percentage: 80, shares: 800000 },
      { shareholder: "Management", percentage: 15, shares: 150000 },
      { shareholder: "Advisors", percentage: 5, shares: 50000 },
    ],
    insurance_policies: [
      { type: "General Liability", provider: "Hartford", coverage: "$1M", expiry: "2024-09-30", status: "Active" },
      {
        type: "Workers Compensation",
        provider: "State Fund",
        coverage: "$500K",
        expiry: "2024-12-31",
        status: "Active",
      },
    ],
    bank_profiles: [
      { bank: "Bank of America", account_type: "Operating", balance: "$750K", status: "Active" },
      { bank: "Wells Fargo", account_type: "Savings", balance: "$200K", status: "Active" },
    ],
    filing_due_instances: [
      { form: "Quarterly Report", due_date: "2024-01-31", status: "Overdue", priority: "Critical" },
      { form: "Employment Tax", due_date: "2024-02-15", status: "Pending", priority: "High" },
    ],
  },
  {
    entity_id: "ENT-B-003",
    name: "Entity B LLC",
    type: "Subsidiary",
    risk_profile: {
      overall_score: 91,
      level: "Low",
      factors: ["Excellent compliance record", "Comprehensive insurance", "Timely filings"],
    },
    cap_tables_entries: [{ shareholder: "EVH Legal", percentage: 100, shares: 1000000 }],
    insurance_policies: [
      { type: "General Liability", provider: "Zurich", coverage: "$3M", expiry: "2024-08-15", status: "Active" },
      { type: "Property Insurance", provider: "FM Global", coverage: "$10M", expiry: "2024-07-01", status: "Active" },
      { type: "Directors & Officers", provider: "AIG", coverage: "$5M", expiry: "2024-12-31", status: "Active" },
    ],
    bank_profiles: [
      { bank: "Goldman Sachs", account_type: "Operating", balance: "$5.2M", status: "Active" },
      { bank: "Morgan Stanley", account_type: "Investment", balance: "$1.8M", status: "Active" },
    ],
    filing_due_instances: [
      { form: "Annual Report", due_date: "2024-03-01", status: "Filed", priority: "Medium" },
      { form: "Tax Return", due_date: "2024-03-15", status: "In Progress", priority: "Medium" },
    ],
  },
  {
    entity_id: "ENT-C-004",
    name: "Entity C Partners",
    type: "Partnership",
    risk_profile: {
      overall_score: 68,
      level: "Medium-High",
      factors: ["Partnership disputes", "Insurance coverage gaps", "Regulatory scrutiny"],
    },
    cap_tables_entries: [
      { shareholder: "Entity A Corp", percentage: 60, shares: 600000 },
      { shareholder: "External Partner", percentage: 40, shares: 400000 },
    ],
    insurance_policies: [
      {
        type: "General Liability",
        provider: "Liberty Mutual",
        coverage: "$1.5M",
        expiry: "2024-06-30",
        status: "Active",
      },
      {
        type: "Professional Liability",
        provider: "Beazley",
        coverage: "$2M",
        expiry: "2024-05-15",
        status: "Renewal Required",
      },
    ],
    bank_profiles: [{ bank: "Citibank", account_type: "Operating", balance: "$1.1M", status: "Active" }],
    filing_due_instances: [
      { form: "Partnership Return", due_date: "2024-03-15", status: "Pending", priority: "High" },
      { form: "State Registration", due_date: "2024-02-01", status: "Overdue", priority: "Critical" },
    ],
  },
]

const getRiskColor = (level: string) => {
  switch (level) {
    case "Low":
      return "text-green-600 bg-green-50"
    case "Medium":
      return "text-yellow-600 bg-yellow-50"
    case "Medium-High":
      return "text-orange-600 bg-orange-50"
    case "High":
      return "text-red-600 bg-red-50"
    default:
      return "text-gray-600 bg-gray-50"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "text-green-600 bg-green-50"
    case "Filed":
      return "text-blue-600 bg-blue-50"
    case "Pending":
      return "text-yellow-600 bg-yellow-50"
    case "In Progress":
      return "text-blue-600 bg-blue-50"
    case "Overdue":
      return "text-red-600 bg-red-50"
    case "Expiring Soon":
      return "text-orange-600 bg-orange-50"
    case "Renewal Required":
      return "text-orange-600 bg-orange-50"
    default:
      return "text-gray-600 bg-gray-50"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Critical":
      return "text-red-600 bg-red-50"
    case "High":
      return "text-orange-600 bg-orange-50"
    case "Medium":
      return "text-yellow-600 bg-yellow-50"
    case "Low":
      return "text-green-600 bg-green-50"
    default:
      return "text-gray-600 bg-gray-50"
  }
}

export default function EntitiesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Entities</h1>
          <p className="text-muted-foreground">Comprehensive view of all entities and their profiles</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            {entitiesData.length} Entities
          </Badge>
        </div>
      </div>

      <div className="grid gap-6">
        {entitiesData.map((entity) => (
          <Card key={entity.entity_id} className="w-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-xl">{entity.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {entity.entity_id} • {entity.type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getRiskColor(entity.risk_profile.level)}>{entity.risk_profile.level} Risk</Badge>
                  <div className="flex items-center gap-1">
                    {entity.risk_profile.overall_score >= 80 ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className="text-sm font-medium">{entity.risk_profile.overall_score}%</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Risk Profile */}
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
                  <AlertTriangle className="h-4 w-4" />
                  Risk Profile
                </h3>
                <div className="grid gap-2">
                  {entity.risk_profile.factors.map((factor, index) => (
                    <div key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                      {factor}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cap Table */}
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
                  <DollarSign className="h-4 w-4" />
                  Cap Table Entries
                </h3>
                <div className="grid gap-2">
                  {entity.cap_tables_entries.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-secondary/50 rounded">
                      <span className="text-sm font-medium">{entry.shareholder}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">{entry.shares.toLocaleString()} shares</span>
                        <Badge variant="outline" className="text-xs">
                          {entry.percentage}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insurance Policies */}
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
                  <Shield className="h-4 w-4" />
                  Insurance Policies
                </h3>
                <div className="grid gap-2">
                  {entity.insurance_policies.map((policy, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-secondary/50 rounded">
                      <div>
                        <span className="text-sm font-medium">{policy.type}</span>
                        <p className="text-xs text-muted-foreground">{policy.provider}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">{policy.coverage}</span>
                        <Badge className={getStatusColor(policy.status)} variant="outline">
                          {policy.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bank Profiles */}
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
                  <Building2 className="h-4 w-4" />
                  Bank Profiles
                </h3>
                <div className="grid gap-2">
                  {entity.bank_profiles.map((bank, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-secondary/50 rounded">
                      <div>
                        <span className="text-sm font-medium">{bank.bank}</span>
                        <p className="text-xs text-muted-foreground">{bank.account_type}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">{bank.balance}</span>
                        <Badge className={getStatusColor(bank.status)} variant="outline">
                          {bank.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Filing Due Instances */}
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
                  <FileText className="h-4 w-4" />
                  Filing Due Instances
                </h3>
                <div className="grid gap-2">
                  {entity.filing_due_instances.map((filing, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-secondary/50 rounded">
                      <div>
                        <span className="text-sm font-medium">{filing.form}</span>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Due: {filing.due_date}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(filing.priority)} variant="outline">
                          {filing.priority}
                        </Badge>
                        <Badge className={getStatusColor(filing.status)} variant="outline">
                          {filing.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AIRiskGauge } from "@/components/ai-risk-gauge"
import { OIChatbot } from "@/components/oi-chatbot"
import { Brain, Shield, TrendingUp, Database, Zap, AlertTriangle, CheckCircle, Clock, Activity } from "lucide-react"

export default function AIRiskDashboard() {
  const riskMetrics = [
    { title: "Overall Risk Score", value: 73, color: "#f59e0b", max: 100 },
    { title: "Compliance Rate", value: 87, color: "#10b981", max: 100 },
    { title: "AI Confidence", value: 94, color: "#8b5cf6", max: 100 },
    { title: "Data Quality", value: 91, color: "#06b6d4", max: 100 },
  ]

  const vectorQueries = [
    {
      id: "vq-001",
      query: "liability-cap-saas-12mo-fees",
      status: "completed",
      confidence: 94,
      results: 847,
      timestamp: "2 min ago",
    },
    {
      id: "vq-002",
      query: "entity-risk-correlation-analysis",
      status: "processing",
      confidence: null,
      results: null,
      timestamp: "5 min ago",
    },
    {
      id: "vq-003",
      query: "compliance-gap-detection",
      status: "completed",
      confidence: 89,
      results: 234,
      timestamp: "8 min ago",
    },
  ]

  const aiInsights = [
    {
      type: "risk",
      title: "Elevated Risk Pattern Detected",
      description: "Entity B LLC shows 23% increase in liability exposure over 30 days",
      confidence: 91,
      priority: "high",
    },
    {
      type: "compliance",
      title: "Decision Rule Optimization",
      description: "Rule v1.3.0 can be consolidated with v1.2.8 for better efficiency",
      confidence: 87,
      priority: "medium",
    },
    {
      type: "data",
      title: "Vector Data Lake Update",
      description: "New compliance patterns identified in recent filings",
      confidence: 95,
      priority: "low",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Brain className="h-6 w-6 text-ai-primary" />
                Experienced™ AI Risk Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">Operational Intelligence with Vector Data Lake Integration</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-ai-primary/10 text-ai-primary">
                <Zap className="h-3 w-3 mr-1" />
                AI Powered
              </Badge>
              <Badge variant="outline">
                <Activity className="h-3 w-3 mr-1" />
                Live Data
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Risk Gauges */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {riskMetrics.map((metric, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-4">
                    <AIRiskGauge
                      title={metric.title}
                      value={metric.value}
                      max={metric.max}
                      color={metric.color}
                      size="md"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Vector Data Lake Queries */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-ai-secondary" />
                  Vector Data Lake Queries
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {vectorQueries.map((query) => (
                  <div key={query.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <code className="text-sm font-mono bg-background px-2 py-1 rounded">{query.query}</code>
                        <Badge
                          variant={query.status === "completed" ? "secondary" : "outline"}
                          className={query.status === "completed" ? "bg-green-500/10 text-green-400" : ""}
                        >
                          {query.status === "completed" ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <Clock className="h-3 w-3 mr-1" />
                          )}
                          {query.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>{query.timestamp}</span>
                        {query.confidence && <span>{query.confidence}% confidence</span>}
                        {query.results && <span>{query.results.toLocaleString()} results</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-ai-accent" />
                  AI-Generated Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg border border-border/50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {insight.type === "risk" && <AlertTriangle className="h-4 w-4 text-risk-high" />}
                          {insight.type === "compliance" && <Shield className="h-4 w-4 text-ai-primary" />}
                          {insight.type === "data" && <Database className="h-4 w-4 text-ai-secondary" />}
                          <h4 className="font-medium">{insight.title}</h4>
                          <Badge
                            variant={
                              insight.priority === "high"
                                ? "destructive"
                                : insight.priority === "medium"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="text-xs"
                          >
                            {insight.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {insight.confidence}% confidence
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* OI Chatbot */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <OIChatbot />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

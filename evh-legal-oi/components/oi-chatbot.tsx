"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Send, Zap, Brain, Database, TrendingUp } from "lucide-react"
import Image from "next/image"

interface ChatMessage {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  metadata?: {
    confidence?: number
    sources?: string[]
    riskLevel?: "low" | "medium" | "high"
  }
}

export function OIChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm your Operational Intelligence™ assistant. I can help you analyze risk patterns, query vector data lakes, and provide insights from your legal entities. What would you like to explore?",
      timestamp: new Date(),
      metadata: {
        confidence: 95,
        sources: ["Vector DB", "Risk Engine"],
      },
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const quickActions = [
    { icon: TrendingUp, label: "Risk Analysis", query: "Analyze current risk trends across all entities" },
    { icon: Database, label: "Vector Query", query: "Query vector data lake for compliance patterns" },
    { icon: Brain, label: "AI Insights", query: "Generate AI insights from recent decision rules" },
    { icon: Zap, label: "Quick Summary", query: "Provide a quick summary of high-priority items" },
  ]

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: `Based on your query "${input}", I've analyzed the vector data lake and found several relevant patterns. The risk assessment shows medium-level exposure across 3 entities, with compliance gaps in liability-cap-saas-12mo-fees rules. Would you like me to dive deeper into specific areas?`,
        timestamp: new Date(),
        metadata: {
          confidence: 87,
          sources: ["Vector DB", "Decision Rules", "Entity Risk Profiles"],
          riskLevel: "medium",
        },
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const handleQuickAction = (query: string) => {
    setInput(query)
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bot className="h-5 w-5 text-ai-primary" />
          OI™ Assistant
          <Badge variant="secondary" className="ml-auto">
            <Zap className="h-3 w-3 mr-1" />
            Live
          </Badge>
        </CardTitle>
        <div className="flex items-center gap-3 mt-2 p-3 bg-muted/30 rounded-lg border border-border/50">
          <div className="relative w-12 h-12 flex-shrink-0">
            <Image
              src="/images/obey-portrait.jpg"
              alt="OI Assistant"
              fill
              className="object-cover rounded-md filter grayscale contrast-125"
            />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-foreground">Operational Intelligence™</p>
            <p className="text-xs text-muted-foreground">Advanced AI Risk Analysis</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-4">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction(action.query)}
              className="justify-start text-xs h-8"
            >
              <action.icon className="h-3 w-3 mr-1" />
              {action.label}
            </Button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto max-h-96">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              {message.type === "ai" && (
                <div className="relative w-8 h-8 mr-2 flex-shrink-0 mt-1">
                  <Image
                    src="/images/obey-portrait.jpg"
                    alt="OI Assistant"
                    fill
                    className="object-cover rounded-full filter grayscale contrast-125"
                  />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === "user" ? "bg-ai-primary text-white" : "bg-muted text-foreground"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                {message.metadata && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {message.metadata.confidence && (
                      <Badge variant="secondary" className="text-xs">
                        {message.metadata.confidence}% confidence
                      </Badge>
                    )}
                    {message.metadata.riskLevel && (
                      <Badge
                        variant={message.metadata.riskLevel === "high" ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {message.metadata.riskLevel} risk
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="relative w-8 h-8 mr-2 flex-shrink-0 mt-1">
                <Image
                  src="/images/obey-portrait.jpg"
                  alt="OI Assistant"
                  fill
                  className="object-cover rounded-full filter grayscale contrast-125"
                />
              </div>
              <div className="bg-muted rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-ai-primary border-t-transparent rounded-full" />
                  <span className="text-sm text-muted-foreground">Analyzing...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about risk patterns, entities, or compliance..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={isLoading} size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

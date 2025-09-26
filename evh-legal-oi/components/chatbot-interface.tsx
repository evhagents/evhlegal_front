"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, MessageSquare, Minimize2, ChevronUp, ChevronDown, FileText } from "lucide-react"

export function ChatbotInterface() {
  const [message, setMessage] = useState("")
  const [isMinimized, setIsMinimized] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [responses, setResponses] = useState<Array<{ id: string; question: string; answer: string }>>([])

  const handleSend = () => {
    if (message.trim()) {
      const mockResponse = {
        id: Date.now().toString(),
        question: message,
        answer: `Based on your query "${message}", here's what I found: This is a sample response that demonstrates the expanded chatbot functionality. In a real implementation, this would connect to your legal AI system to provide detailed analysis of entities, compliance status, and document insights.`,
      }
      setResponses((prev) => [mockResponse, ...prev])
      setMessage("")
      if (!isExpanded) setIsExpanded(true)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (isMinimized) {
    return (
      <Card className="mb-6">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">EVH Legal Assistant</span>
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsMinimized(false)} className="h-6 w-6 p-0">
              <MessageSquare className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <img src="/images/ai-avatar.png" alt="AI Assistant" className="w-6 h-6 rounded-full" />
            <MessageSquare className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">EVH Legal Assistant</span>
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-6 w-6 p-0"
              title={isExpanded ? "Collapse responses" : "Expand responses"}
            >
              {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsMinimized(true)} className="h-6 w-6 p-0">
              <Minimize2 className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {isExpanded && responses.length > 0 && (
          <div className="mb-4 max-h-64 overflow-y-auto border border-border rounded-md bg-secondary/20">
            <div className="p-3 space-y-3">
              {responses.map((response) => (
                <div key={response.id} className="space-y-2">
                  <div className="text-xs font-medium text-primary">Q: {response.question}</div>
                  <div className="flex gap-2">
                    <img
                      src="/images/ai-avatar.png"
                      alt="AI Assistant"
                      className="w-4 h-4 rounded-full flex-shrink-0 mt-0.5"
                    />
                    <div className="text-xs text-muted-foreground leading-relaxed pl-2 border-l-2 border-primary/30">
                      {response.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Input
            placeholder="Ask about entities, compliance, or documents..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 h-9 text-sm bg-secondary/50 border-border focus:border-primary"
          />
          <Button onClick={handleSend} disabled={!message.trim()} size="sm" className="h-9 px-3">
            <Send className="h-3 w-3" />
          </Button>
        </div>

        <div className="flex gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            className="h-6 text-xs px-2 bg-transparent"
            onClick={() => setMessage("Show compliance issues for Entity A")}
          >
            Compliance Status
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-6 text-xs px-2 bg-transparent"
            onClick={() => setMessage("List recent document filings")}
          >
            Recent Filings
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-6 text-xs px-2 bg-transparent"
            onClick={() => setMessage("Generate entity relationship summary")}
          >
            Entity Summary
          </Button>
          <Link href="/ai-doc-chat">
            <Button
              variant="outline"
              size="sm"
              className="h-6 text-xs px-2 bg-transparent hover:bg-primary/10 hover:border-primary"
            >
              <FileText className="h-3 w-3 mr-1" />
              AI Doc Chat
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

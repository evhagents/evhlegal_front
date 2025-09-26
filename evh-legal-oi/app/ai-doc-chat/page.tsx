"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Upload, FileText, Brain, AlertTriangle, CheckCircle, Clock, Zap, ChevronRight } from "lucide-react"
import { DecisionRulesList } from "@/components/decision-rules-list"

interface NDAAnalysis {
  party_disclosing?: string
  party_receiving?: string
  effective_date?: string
  definitions?: string
  confidential_information?: string
  exclusions?: string
  obligations?: string
  term?: string
  return_of_materials?: string
  remedies?: string
  governing_law?: string
  miscellaneous?: string
  risk_assessment?: {
    priority: "critical" | "high" | "medium" | "low"
    issues: string[]
    recommendations: string[]
  }
}

export default function AIDocChatPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [analysis, setAnalysis] = useState<NDAAnalysis | null>(null)
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([])
  const [currentMessage, setCurrentMessage] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isRulesCollapsed, setIsRulesCollapsed] = useState(false)

  const handleFileUpload = async (selectedFile: File) => {
    if (!selectedFile || selectedFile.type !== "application/pdf") {
      alert("Please select a PDF file")
      return
    }

    setFile(selectedFile)
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 200)

    try {
      // Convert file to base64 for processing
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.readAsDataURL(selectedFile)
      })

      setUploadProgress(100)
      setIsUploading(false)

      // Start AI analysis
      await analyzeDocument(base64, selectedFile.name)
    } catch (error) {
      console.error("Upload failed:", error)
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const analyzeDocument = async (fileData: string, fileName: string) => {
    setIsAnalyzing(true)

    try {
      const response = await fetch("/api/analyze-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileData,
          fileName,
          schema: "nda_anatomy",
        }),
      })

      if (!response.ok) throw new Error("Analysis failed")

      const result = await response.json()
      setAnalysis(result.analysis)

      // Add initial analysis to chat
      setChatMessages([
        {
          role: "assistant",
          content: `I've analyzed your NDA document "${fileName}". Here's what I found:\n\n**Key Parties:**\n- Disclosing: ${result.analysis.party_disclosing || "Not specified"}\n- Receiving: ${result.analysis.party_receiving || "Not specified"}\n\n**Term:** ${result.analysis.term || "Not specified"}\n\n**Risk Level:** ${result.analysis.risk_assessment?.priority || "medium"}\n\nYou can ask me specific questions about any aspect of this NDA.`,
        },
      ])
    } catch (error) {
      console.error("Analysis failed:", error)
      setChatMessages([
        {
          role: "assistant",
          content: "I encountered an error analyzing your document. Please try uploading again or contact support.",
        },
      ])
    } finally {
      setIsAnalyzing(false)
    }
  }

  const sendMessage = async () => {
    if (!currentMessage.trim() || !analysis) return

    const userMessage = currentMessage.trim()
    setCurrentMessage("")
    setChatMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsStreaming(true)

    try {
      const response = await fetch("/api/chat-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          analysis,
          context: "nda_analysis",
        }),
      })

      if (!response.ok) throw new Error("Chat failed")

      const reader = response.body?.getReader()
      if (!reader) throw new Error("No response stream")

      let assistantMessage = ""
      setChatMessages((prev) => [...prev, { role: "assistant", content: "" }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = new TextDecoder().decode(value)
        const lines = chunk.split("\n")

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6))
              if (data.content) {
                assistantMessage += data.content
                setChatMessages((prev) => {
                  const newMessages = [...prev]
                  newMessages[newMessages.length - 1].content = assistantMessage
                  return newMessages
                })
              }
            } catch (e) {
              // Ignore parsing errors
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat failed:", error)
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I encountered an error processing your question. Please try again.",
        },
      ])
    } finally {
      setIsStreaming(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "critical":
        return <AlertTriangle className="h-4 w-4" />
      case "high":
        return <AlertTriangle className="h-4 w-4" />
      case "medium":
        return <Clock className="h-4 w-4" />
      case "low":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Experienced™ AI Single Doc Chat</h1>
            <p className="text-muted-foreground mt-2">Upload and analyze legal documents with AI-powered insights</p>
          </div>
          <Badge variant="secondary" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            AI Powered
          </Badge>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Decision Rules</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                Last 10
              </Badge>
              <Button variant="ghost" size="sm" onClick={() => setIsRulesCollapsed(!isRulesCollapsed)}>
                <ChevronRight className={`h-4 w-4 transition-transform ${isRulesCollapsed ? "rotate-90" : ""}`} />
              </Button>
            </div>
          </CardHeader>
          {!isRulesCollapsed && (
            <CardContent>
              <DecisionRulesList />
            </CardContent>
          )}
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Document Upload
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PDF files only, up to 10MB</p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                />

                {file && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4" />
                      <span className="truncate">{file.name}</span>
                    </div>

                    {isUploading && (
                      <div className="space-y-2">
                        <Progress value={uploadProgress} />
                        <p className="text-xs text-muted-foreground">Uploading... {uploadProgress}%</p>
                      </div>
                    )}

                    {isAnalyzing && (
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <Brain className="h-4 w-4 animate-pulse" />
                        <span>Analyzing document...</span>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Analysis Summary */}
            {analysis && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Analysis Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysis.risk_assessment && (
                    <div className="flex items-center gap-2">
                      <Badge className={`${getPriorityColor(analysis.risk_assessment.priority)} text-white`}>
                        {getPriorityIcon(analysis.risk_assessment.priority)}
                        {analysis.risk_assessment.priority.toUpperCase()}
                      </Badge>
                    </div>
                  )}

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Parties:</span>
                      <p className="text-muted-foreground">
                        {analysis.party_disclosing} → {analysis.party_receiving}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Term:</span>
                      <p className="text-muted-foreground">{analysis.term || "Not specified"}</p>
                    </div>
                    <div>
                      <span className="font-medium">Effective Date:</span>
                      <p className="text-muted-foreground">{analysis.effective_date || "Not specified"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Document Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {chatMessages.length === 0 && !analysis && (
                      <div className="text-center text-muted-foreground py-8">
                        <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Upload a document to start the AI analysis</p>
                      </div>
                    )}

                    {chatMessages.map((message, index) => (
                      <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        {message.role === "assistant" && (
                          <div className="flex-shrink-0 mr-3">
                            <img src="/images/ai-avatar.png" alt="AI Assistant" className="w-8 h-8 rounded-full" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <pre className="whitespace-pre-wrap text-sm font-sans">{message.content}</pre>
                        </div>
                      </div>
                    ))}

                    {isStreaming && (
                      <div className="flex justify-start">
                        <div className="flex-shrink-0 mr-3">
                          <img src="/images/ai-avatar.png" alt="AI Assistant" className="w-8 h-8 rounded-full" />
                        </div>
                        <div className="bg-muted rounded-lg px-4 py-2">
                          <div className="flex items-center gap-2">
                            <div className="animate-pulse">●</div>
                            <span className="text-sm text-muted-foreground">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <Separator className="my-4" />

                <div className="flex gap-2">
                  <Textarea
                    placeholder={analysis ? "Ask me anything about this document..." : "Upload a document first"}
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    disabled={!analysis || isStreaming}
                    className="min-h-[60px]"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        sendMessage()
                      }
                    }}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!analysis || !currentMessage.trim() || isStreaming}
                    className="self-end"
                  >
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Analysis Tabs */}
        {analysis && (
          <Card>
            <CardHeader>
              <CardTitle>Detailed Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="structure" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="structure">Document Structure</TabsTrigger>
                  <TabsTrigger value="obligations">Obligations</TabsTrigger>
                  <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                </TabsList>

                <TabsContent value="structure" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Definitions</h4>
                      <p className="text-sm text-muted-foreground">
                        {analysis.definitions || "No specific definitions found"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Confidential Information</h4>
                      <p className="text-sm text-muted-foreground">
                        {analysis.confidential_information || "Standard confidential information clause"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Exclusions</h4>
                      <p className="text-sm text-muted-foreground">
                        {analysis.exclusions || "Standard exclusions apply"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Governing Law</h4>
                      <p className="text-sm text-muted-foreground">{analysis.governing_law || "Not specified"}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="obligations" className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Key Obligations</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      {analysis.obligations || "Standard confidentiality obligations"}
                    </p>

                    <h4 className="font-medium mb-2">Return of Materials</h4>
                    <p className="text-sm text-muted-foreground">
                      {analysis.return_of_materials || "Standard return requirements"}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="risks" className="space-y-4">
                  {analysis.risk_assessment && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Badge className={`${getPriorityColor(analysis.risk_assessment.priority)} text-white`}>
                          {getPriorityIcon(analysis.risk_assessment.priority)}
                          {analysis.risk_assessment.priority.toUpperCase()} RISK
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Identified Issues</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {analysis.risk_assessment.issues.map((issue, index) => (
                              <li key={index}>{issue}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="recommendations" className="space-y-4">
                  {analysis.risk_assessment?.recommendations && (
                    <div>
                      <h4 className="font-medium mb-2">AI Recommendations</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {analysis.risk_assessment.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium mb-2">Remedies</h4>
                    <p className="text-sm text-muted-foreground">
                      {analysis.remedies || "Standard legal remedies apply"}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Filter, Users, Brain, Target, Zap, AlertTriangle, TrendingUp, MessageCircle, Mail } from "lucide-react"
import { Person } from "@microsoft/mgt-react"
import { PersonalityRadarChart } from "@/components/personality-radar-chart"

// Persona data based on the provided DISC assessments
const personas = [
  {
    id: "paul-cowart",
    name: "Paul Cowart",
    title: "Product Manager",
    company: "Paul's Company",
    initials: "PC",
    discType: "Influencer (Id)",
    traits: ["ADVENTUROUS", "PIONEERING", "SOCIABLE"],
    description: "Paul is likely comfortable delivering important messages verbally and communicating a bold vision.",
    personalityTraits: {
      riskTolerance: 8,
      trust: 7,
      optimism: 9,
      pace: 8,
      expression: 8,
      collaboration: 7,
      dominance: 6,
    },
    energizers: ["Exploration & discovery", "Storytelling", "Public speaking", "Fun & excitement"],
    drainers: ["Using too much caution", "Overly factual discussions", "Rigid schedules", "Feeling micromanaged"],
    strengths: [
      "Taking action with limited information",
      "Telling vivid stories",
      "Searching for growth opportunities",
      "Actively engaging with others",
    ],
    blindSpots: [
      "May display impatience with detailed instruction",
      "May prioritize excitement over security",
      "May trust instinct over data",
      "May be overly idealistic",
    ],
    color: "bg-blue-500",
  },
  {
    id: "benjamin-cowart",
    name: "Benjamin Cowart",
    title: "CEO",
    company: "Benjamin's Company",
    initials: "BC",
    discType: "Architect (Dc)",
    traits: ["VIGOROUS", "COMPETITIVE", "FOCUSED"],
    description:
      "Benjamin likely approaches life like a driving force, focused on creating processes that improve results.",
    personalityTraits: {
      riskTolerance: 9,
      trust: 5,
      optimism: 6,
      pace: 9,
      expression: 4,
      collaboration: 3,
      dominance: 9,
    },
    energizers: ["Professional growth", "Competition & winning", "Challenges", "Leading the group"],
    drainers: [
      "Following inflexible rules",
      "Tangents unrelated to main conversation",
      "Slow pace of work",
      "People blindly supporting others",
    ],
    strengths: [
      "High tolerance for risk and bold decisions",
      "Persistently pursuing goals",
      "Committing to decisions quickly",
      "Motivating others with challenges",
    ],
    blindSpots: [
      "Working with urgency that may stress others",
      "Hard time in supporting roles",
      "Trouble accepting authority",
      "Making changes that disrupt others",
    ],
    color: "bg-red-500",
  },
  {
    id: "ayana-hill",
    name: "Ayana Hill",
    title: "Executive Director of Creative Strategy & Brand Innovation",
    company: "Ayana's Company",
    initials: "AH",
    discType: "Influencer (Id)",
    traits: ["ADVENTUROUS", "VISIONARY", "OUTGOING"],
    description: "Ayana is likely comfortable delivering important messages verbally and communicating a bold vision.",
    personalityTraits: {
      riskTolerance: 8,
      trust: 7,
      optimism: 9,
      pace: 8,
      expression: 9,
      collaboration: 8,
      dominance: 6,
    },
    energizers: ["Exploration & discovery", "Storytelling", "Public speaking", "Fun & excitement"],
    drainers: ["Using too much caution", "Overly factual discussions", "Rigid schedules", "Feeling micromanaged"],
    strengths: [
      "Taking action with limited information",
      "Telling vivid stories",
      "Searching for growth opportunities",
      "Actively engaging with others",
    ],
    blindSpots: [
      "May display impatience with detailed instruction",
      "May prioritize excitement over security",
      "May trust instinct over data",
      "May be overly idealistic",
    ],
    color: "bg-orange-500",
  },
  {
    id: "taylor-taylor",
    name: "Taylor Taylor",
    title: "Intern",
    company: "Taylor's Company",
    initials: "TT",
    discType: "Captain (D)",
    traits: ["DECISIVE", "FAST-PACED", "ASSERTIVE"],
    description: "Taylor tends to be confident and fast-paced, especially when achieving ambitious goals.",
    personalityTraits: {
      riskTolerance: 9,
      trust: 4,
      optimism: 5,
      pace: 9,
      expression: 3,
      collaboration: 2,
      dominance: 9,
    },
    energizers: ["Professional growth", "Competition & winning", "Challenges", "Leading the group"],
    drainers: [
      "Following inflexible rules",
      "Tangents unrelated to conversation",
      "Slow pace of work",
      "People blindly supporting others",
    ],
    strengths: [
      "High tolerance for risk and bold decisions",
      "Persistently pursuing goals",
      "Committing to decisions quickly",
      "Motivating others with challenges",
    ],
    blindSpots: [
      "Working with urgency that may stress others",
      "Hard time in supporting roles",
      "Trouble accepting authority",
      "Making changes that disrupt others",
    ],
    color: "bg-purple-500",
  },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [radarModalOpen, setRadarModalOpen] = useState(false)
  const [radarPersona, setRadarPersona] = useState<(typeof personas)[0] | null>(null)

  const filteredPersonas = personas.filter(
    (persona) =>
      persona.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      persona.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      persona.discType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedPersonaData = personas.find((p) => p.id === selectedPersona)

  const handleRadarHover = (persona: (typeof personas)[0]) => {
    setRadarPersona(persona)
    setRadarModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">User Personas</h1>
              <p className="text-muted-foreground mt-2">
                Comprehensive personality profiles and interaction guidelines
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search personas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Microsoft Graph Toolkit Examples */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Microsoft Graph Integration
              </CardTitle>
              <CardDescription>Live person cards using Microsoft Graph Toolkit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Person card Hover</div>
                  <Person personQuery="me" view="twolines" personCardInteraction="hover" />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Person card Click</div>
                  <Person personQuery="me" view="twolines" personCardInteraction="click" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Persona Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPersonas.map((persona) => (
              <Card
                key={persona.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 relative group"
                onClick={() => setSelectedPersona(persona.id)}
                onMouseEnter={() => handleRadarHover(persona)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className={`${persona.color} text-white font-semibold`}>
                        {persona.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{persona.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">{persona.title}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-primary" />
                    <Badge variant="secondary" className="text-xs">
                      {persona.discType}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {persona.traits.map((trait) => (
                      <Badge key={trait} variant="outline" className="text-xs">
                        {trait}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">{persona.description}</p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      {persona.strengths.length} strengths
                    </span>
                    <span className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {persona.blindSpots.length} blind spots
                    </span>
                  </div>
                </CardContent>

                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Badge variant="secondary" className="text-xs">
                    Hover for radar chart
                  </Badge>
                </div>
              </Card>
            ))}
          </div>

          <Dialog open={radarModalOpen} onOpenChange={setRadarModalOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  {radarPersona && (
                    <>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={`${radarPersona.color} text-white font-semibold text-sm`}>
                          {radarPersona.initials}
                        </AvatarFallback>
                      </Avatar>
                      {radarPersona.name} - Personality Radar
                    </>
                  )}
                </DialogTitle>
              </DialogHeader>
              {radarPersona && (
                <div className="space-y-4">
                  <PersonalityRadarChart
                    data={radarPersona.personalityTraits}
                    name={radarPersona.name}
                    color={radarPersona.color.replace("bg-", "#").replace("-500", "")}
                    size="lg"
                  />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold mb-2">Trait Scores (0-10)</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Risk Tolerance:</span>
                          <span className="font-medium">{radarPersona.personalityTraits.riskTolerance}/10</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Trust:</span>
                          <span className="font-medium">{radarPersona.personalityTraits.trust}/10</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Optimism:</span>
                          <span className="font-medium">{radarPersona.personalityTraits.optimism}/10</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pace:</span>
                          <span className="font-medium">{radarPersona.personalityTraits.pace}/10</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Additional Traits</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Expression:</span>
                          <span className="font-medium">{radarPersona.personalityTraits.expression}/10</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Collaboration:</span>
                          <span className="font-medium">{radarPersona.personalityTraits.collaboration}/10</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Dominance:</span>
                          <span className="font-medium">{radarPersona.personalityTraits.dominance}/10</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Detailed Persona View */}
          {selectedPersonaData && (
            <Card className="mt-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className={`${selectedPersonaData.color} text-white font-bold text-lg`}>
                        {selectedPersonaData.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl">{selectedPersonaData.name}</CardTitle>
                      <CardDescription className="text-lg">
                        {selectedPersonaData.title} at {selectedPersonaData.company}
                      </CardDescription>
                      <Badge className="mt-2">{selectedPersonaData.discType}</Badge>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedPersona(null)}>
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="traits">Traits</TabsTrigger>
                    <TabsTrigger value="behavior">Behavior</TabsTrigger>
                    <TabsTrigger value="interaction">Interaction</TabsTrigger>
                    <TabsTrigger value="communication">Communication</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Zap className="h-5 w-5 text-green-500" />
                            Energizers
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {selectedPersonaData.energizers.map((item, index) => (
                              <li key={index} className="text-sm flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <TrendingUp className="h-5 w-5 text-blue-500" />
                            Strengths
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {selectedPersonaData.strengths.map((item, index) => (
                              <li key={index} className="text-sm flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            Blind Spots
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {selectedPersonaData.blindSpots.map((item, index) => (
                              <li key={index} className="text-sm flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="traits" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Personality Trait Spectrum</CardTitle>
                        <CardDescription>Visual representation of personality dimensions</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {[
                          {
                            label: "Risk Tolerance",
                            value: selectedPersonaData.personalityTraits.riskTolerance,
                            left: "Risk Averse",
                            right: "Risk Tolerant",
                          },
                          {
                            label: "Trust",
                            value: selectedPersonaData.personalityTraits.trust,
                            left: "Skeptical",
                            right: "Trusting",
                          },
                          {
                            label: "Optimism",
                            value: selectedPersonaData.personalityTraits.optimism,
                            left: "Pragmatic",
                            right: "Optimistic",
                          },
                          {
                            label: "Pace",
                            value: selectedPersonaData.personalityTraits.pace,
                            left: "Deliberate",
                            right: "Fast-paced",
                          },
                          {
                            label: "Expression",
                            value: selectedPersonaData.personalityTraits.expression,
                            left: "Matter-of-fact",
                            right: "Expressive",
                          },
                          {
                            label: "Collaboration",
                            value: selectedPersonaData.personalityTraits.collaboration,
                            left: "Autonomous",
                            right: "Collaborative",
                          },
                          {
                            label: "Dominance",
                            value: selectedPersonaData.personalityTraits.dominance,
                            left: "Supporting",
                            right: "Dominant",
                          },
                        ].map((trait) => (
                          <div key={trait.label} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">{trait.left}</span>
                              <span className="font-medium">{trait.label}</span>
                              <span className="text-muted-foreground">{trait.right}</span>
                            </div>
                            <div className="relative h-2 bg-secondary rounded-full">
                              <div
                                className={`absolute top-0 left-0 h-full ${selectedPersonaData.color} rounded-full transition-all duration-300`}
                                style={{ width: `${trait.value * 10}%` }}
                              />
                              <div
                                className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-300 rounded-full shadow-sm"
                                style={{ left: `calc(${trait.value * 10}% - 8px)` }}
                              />
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="behavior" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-green-600">What Energizes Them</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {selectedPersonaData.energizers.map((item, index) => (
                              <li key={index} className="flex items-center gap-3">
                                <Zap className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span className="text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-red-600">What Drains Them</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {selectedPersonaData.drainers.map((item, index) => (
                              <li key={index} className="flex items-center gap-3">
                                <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                                <span className="text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="interaction" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Interaction Guidelines</CardTitle>
                        <CardDescription>How to effectively work with {selectedPersonaData.name}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <h4 className="font-semibold text-green-600">Do</h4>
                            <ul className="space-y-2 text-sm">
                              {selectedPersonaData.discType.includes("Influencer") ? (
                                <>
                                  <li>• Showcase your sense of humor</li>
                                  <li>• Use visual aids to support your pitch</li>
                                  <li>• Project enthusiasm and energy</li>
                                  <li>• Listen to their personal stories</li>
                                </>
                              ) : (
                                <>
                                  <li>• Be assertive and direct</li>
                                  <li>• Get right to the bottom line</li>
                                  <li>• Expect conversation to move quickly</li>
                                  <li>• Help them achieve their goals</li>
                                </>
                              )}
                            </ul>
                          </div>
                          <div className="space-y-3">
                            <h4 className="font-semibold text-red-600">Avoid</h4>
                            <ul className="space-y-2 text-sm">
                              {selectedPersonaData.discType.includes("Influencer") ? (
                                <>
                                  <li>• Moving at too slow a pace</li>
                                  <li>• Overly factual discussions</li>
                                  <li>• Rigid, inflexible schedules</li>
                                  <li>• Micromanaging their work</li>
                                </>
                              ) : (
                                <>
                                  <li>• Showing extra features they didn't ask for</li>
                                  <li>• Taking too long to get to the point</li>
                                  <li>• Being overly detailed in explanations</li>
                                  <li>• Challenging their authority unnecessarily</li>
                                </>
                              )}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="communication" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Mail className="h-5 w-5" />
                            Email Style
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {selectedPersonaData.discType.includes("Influencer") ? (
                            <ul className="space-y-2 text-sm">
                              <li>• Provide a quick, convenient call to action</li>
                              <li>• Invite them to a live conversation</li>
                              <li>• Make your message entertaining</li>
                              <li>• Use emotionally expressive language</li>
                            </ul>
                          ) : (
                            <ul className="space-y-2 text-sm">
                              <li>• Be straightforward and direct</li>
                              <li>• Write 3 sentences or less</li>
                              <li>• Avoid dragging it out</li>
                              <li>• Avoid being overly detailed</li>
                            </ul>
                          )}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <MessageCircle className="h-5 w-5" />
                            Meeting Style
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {selectedPersonaData.discType.includes("Influencer") ? (
                            <ul className="space-y-2 text-sm">
                              <li>• Keep the agenda fairly open-ended</li>
                              <li>• Be more spontaneous with scheduling</li>
                              <li>• Stay light-hearted and self-deprecating</li>
                              <li>• Appeal to their excitement</li>
                            </ul>
                          ) : (
                            <ul className="space-y-2 text-sm">
                              <li>• Make the meeting brief, if possible</li>
                              <li>• Mention what you will prepare beforehand</li>
                              <li>• Propose a specific time</li>
                              <li>• Provide deadlines for decisions</li>
                            </ul>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

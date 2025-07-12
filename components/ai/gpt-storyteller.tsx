"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Download, Play, Pause, Volume2, Brain, Shield, TrendingUp } from "lucide-react"

interface FraudStory {
  id: string
  title: string
  narrative: string
  timestamp: string
  impact: {
    stores_affected: number
    amount_saved: number
    response_time: string
    global_protection_time: string
  }
  threat_pattern: {
    name: string
    type: string
    sophistication: number
    geographic_spread: string[]
  }
  ai_analysis: {
    confidence: number
    risk_level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
    recommendations: string[]
  }
}

const fraudStories: FraudStory[] = [
  {
    id: "story-001",
    title: "The Hurricane Relief Scam Syndicate",
    narrative: `At 14:32 EST, Store #4587 in Miami detected an unusual pattern: customers purchasing large quantities of gift cards while claiming hurricane relief assistance. Our federated AI immediately recognized this as a variant of the "Disaster Exploitation" pattern first seen in Texas during Hurricane Harvey.

Within 8.3 seconds, the encrypted model update propagated to all 4,743 Walmart stores nationwide. The AI identified 23 similar attempts across Florida, Georgia, and the Carolinas - all blocked before completion.

The sophisticated scam involved fake FEMA representatives directing victims to purchase gift cards as "emergency fund transfers." Our privacy-preserving system detected the pattern without exposing any customer data, protecting an estimated $2.1M in potential losses.

Store managers received real-time alerts with specific indicators: unusual gift card quantities, disaster-related keywords, and suspicious payment patterns. The global protection was achieved through federated learning - each store's knowledge strengthening the entire network without compromising individual privacy.`,
    timestamp: "2024-01-15 14:32:18",
    impact: {
      stores_affected: 23,
      amount_saved: 2100000,
      response_time: "8.3 seconds",
      global_protection_time: "8.3 seconds",
    },
    threat_pattern: {
      name: "Hurricane Relief Scam Cluster",
      type: "Social Engineering + Gift Card Fraud",
      sophistication: 8.7,
      geographic_spread: ["FL", "GA", "SC", "NC"],
    },
    ai_analysis: {
      confidence: 94.7,
      risk_level: "CRITICAL",
      recommendations: [
        "Implement enhanced gift card purchase limits during disaster declarations",
        "Deploy additional social engineering detection algorithms",
        "Coordinate with FEMA for legitimate relief program verification",
      ],
    },
  },
  {
    id: "story-002",
    title: "The Phantom Receipt Network",
    narrative: `Store #2341 in Dallas flagged an anomaly at 09:15 CST: a customer attempting to return high-value electronics with a receipt showing microscopic inconsistencies in the thermal printing pattern. Our computer vision models, trained across thousands of stores, immediately identified this as part of a sophisticated counterfeit receipt operation.

The federated network revealed a coordinated attack spanning 12 states, with over 200 fraudulent receipts in circulation. Each receipt was nearly perfect - matching genuine Walmart formatting, using correct product codes, and even replicating store-specific receipt variations.

However, our privacy-preserving AI detected subtle patterns invisible to human inspection: thermal printer head wear signatures, paper batch variations, and timestamp anomalies. The distributed intelligence allowed us to track the network without centralizing sensitive transaction data.

Within minutes, all affected stores received encrypted alerts with the specific receipt signatures to watch for. The operation was neutralized before significant losses occurred, demonstrating the power of collaborative AI that protects both customers and the company.`,
    timestamp: "2024-01-14 09:15:42",
    impact: {
      stores_affected: 47,
      amount_saved: 890000,
      response_time: "12.7 seconds",
      global_protection_time: "4.2 minutes",
    },
    threat_pattern: {
      name: "Phantom Receipt Syndicate",
      type: "Document Forgery + Return Fraud",
      sophistication: 9.2,
      geographic_spread: ["TX", "OK", "AR", "LA", "NM", "AZ", "CO", "KS", "MO", "TN", "MS", "AL"],
    },
    ai_analysis: {
      confidence: 97.3,
      risk_level: "HIGH",
      recommendations: [
        "Enhance receipt verification with blockchain timestamping",
        "Deploy advanced computer vision at all return counters",
        "Implement cross-store receipt validation network",
      ],
    },
  },
]

export function GPTStoryteller() {
  const [selectedStory, setSelectedStory] = useState<FraudStory | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentNarration, setCurrentNarration] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateNewStory = async () => {
    setIsGenerating(true)

    // Simulate AI story generation
    setTimeout(() => {
      const newStory: FraudStory = {
        id: `story-${Date.now()}`,
        title: "The Digital Ghost Network",
        narrative: `Breaking: Store #7823 in Seattle just detected a new threat pattern. Advanced identity theft ring using AI-generated fake IDs combined with social media scraping. Our federated system identified the pattern and protected 156 stores within 6.7 seconds. Estimated prevention: $1.8M in fraudulent purchases.`,
        timestamp: new Date().toISOString(),
        impact: {
          stores_affected: 156,
          amount_saved: 1800000,
          response_time: "6.7 seconds",
          global_protection_time: "6.7 seconds",
        },
        threat_pattern: {
          name: "Digital Ghost Network",
          type: "AI-Generated Identity Theft",
          sophistication: 9.5,
          geographic_spread: ["WA", "OR", "CA", "NV", "ID"],
        },
        ai_analysis: {
          confidence: 96.1,
          risk_level: "CRITICAL",
          recommendations: [
            "Deploy deepfake detection algorithms",
            "Enhance biometric verification systems",
            "Coordinate with social media platforms",
          ],
        },
      }

      fraudStories.unshift(newStory)
      setSelectedStory(newStory)
      setIsGenerating(false)
    }, 3000)
  }

  const playNarration = (story: FraudStory) => {
    setIsPlaying(true)
    setCurrentNarration(story.narrative)

    // Simulate voice synthesis
    setTimeout(() => {
      setIsPlaying(false)
      setCurrentNarration("")
    }, 10000)
  }

  const exportReport = (story: FraudStory) => {
    const reportContent = `
WALMART FEDERATED FRAUD DETECTION REPORT
========================================

Incident: ${story.title}
Timestamp: ${story.timestamp}
Threat Level: ${story.ai_analysis.risk_level}
Confidence: ${story.ai_analysis.confidence}%

EXECUTIVE SUMMARY
-----------------
${story.narrative}

IMPACT ANALYSIS
---------------
Stores Protected: ${story.impact.stores_affected}
Amount Saved: $${story.impact.amount_saved.toLocaleString()}
Response Time: ${story.impact.response_time}
Global Protection: ${story.impact.global_protection_time}

THREAT PATTERN
--------------
Pattern Name: ${story.threat_pattern.name}
Type: ${story.threat_pattern.type}
Sophistication: ${story.threat_pattern.sophistication}/10
Geographic Spread: ${story.threat_pattern.geographic_spread.join(", ")}

AI RECOMMENDATIONS
------------------
${story.ai_analysis.recommendations.map((rec) => `• ${rec}`).join("\n")}

Generated by Walmart Federated Intelligence System
Confidential - For Internal Use Only
    `

    const blob = new Blob([reportContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `fraud-report-${story.id}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">🤖 AI Fraud Storyteller</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            GPT-powered investigative reports and threat narratives
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            onClick={generateNewStory}
            disabled={isGenerating}
            className="bg-[#0071CE] hover:bg-blue-700 flex items-center space-x-2"
          >
            <Brain className="w-4 h-4" />
            <span>{isGenerating ? "Generating..." : "Generate New Story"}</span>
          </Button>
        </div>
      </div>

      {/* Story Generation Status */}
      {isGenerating && (
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#0071CE]"></div>
              <div>
                <div className="font-semibold text-blue-900">AI Story Generation in Progress</div>
                <div className="text-sm text-blue-700">Analyzing recent fraud patterns and generating narrative...</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Voice Narration Status */}
      {isPlaying && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Volume2 className="w-6 h-6 text-green-600 animate-pulse" />
              <div>
                <div className="font-semibold text-green-900">Voice Narration Active</div>
                <div className="text-sm text-green-700">ElevenLabs AI voice synthesis in progress...</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Story List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Fraud Chronicles</span>
              </CardTitle>
              <CardDescription>AI-generated investigative reports</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                <div className="space-y-2 p-4">
                  {fraudStories.map((story) => (
                    <div
                      key={story.id}
                      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedStory?.id === story.id
                          ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => setSelectedStory(story)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Badge
                          className={
                            story.ai_analysis.risk_level === "CRITICAL"
                              ? "bg-red-100 text-red-800"
                              : story.ai_analysis.risk_level === "HIGH"
                                ? "bg-orange-100 text-orange-800"
                                : story.ai_analysis.risk_level === "MEDIUM"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                          }
                        >
                          {story.ai_analysis.risk_level}
                        </Badge>
                        <span className="text-xs text-gray-500">{new Date(story.timestamp).toLocaleString()}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{story.title}</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <div>
                          <span className="font-medium">Stores:</span> {story.impact.stores_affected}
                        </div>
                        <div>
                          <span className="font-medium">Saved:</span> $
                          {(story.impact.amount_saved / 1000000).toFixed(1)}M
                        </div>
                        <div>
                          <span className="font-medium">Response:</span> {story.impact.response_time}
                        </div>
                        <div>
                          <span className="font-medium">Confidence:</span> {story.ai_analysis.confidence}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Story Details */}
        <div className="lg:col-span-2">
          {selectedStory ? (
            <div className="space-y-6">
              {/* Story Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">{selectedStory.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {selectedStory.threat_pattern.name} • {selectedStory.threat_pattern.type}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => playNarration(selectedStory)}
                        disabled={isPlaying}
                        className="bg-transparent"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        <span className="ml-2">{isPlaying ? "Playing..." : "Narrate"}</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => exportReport(selectedStory)}
                        className="bg-transparent"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export PDF
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedStory.narrative}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Impact Metrics */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-800">
                      <Shield className="w-5 h-5 mr-2" />
                      Impact Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-100 rounded-lg">
                        <div className="text-2xl font-bold text-green-800">{selectedStory.impact.stores_affected}</div>
                        <div className="text-sm text-green-600">Stores Protected</div>
                      </div>
                      <div className="text-center p-3 bg-green-100 rounded-lg">
                        <div className="text-2xl font-bold text-green-800">
                          ${(selectedStory.impact.amount_saved / 1000000).toFixed(1)}M
                        </div>
                        <div className="text-sm text-green-600">Amount Saved</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-green-700">Response Time:</span>
                        <span className="font-semibold text-green-800">{selectedStory.impact.response_time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700">Global Protection:</span>
                        <span className="font-semibold text-green-800">
                          {selectedStory.impact.global_protection_time}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-800">
                      <Brain className="w-5 h-5 mr-2" />
                      AI Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-700">Confidence Level:</span>
                      <Badge className="bg-blue-100 text-blue-800">{selectedStory.ai_analysis.confidence}%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-700">Risk Level:</span>
                      <Badge
                        className={
                          selectedStory.ai_analysis.risk_level === "CRITICAL"
                            ? "bg-red-100 text-red-800"
                            : selectedStory.ai_analysis.risk_level === "HIGH"
                              ? "bg-orange-100 text-orange-800"
                              : selectedStory.ai_analysis.risk_level === "MEDIUM"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                        }
                      >
                        {selectedStory.ai_analysis.risk_level}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-700">Sophistication:</span>
                      <span className="font-semibold text-blue-800">
                        {selectedStory.threat_pattern.sophistication}/10
                      </span>
                    </div>
                    <div>
                      <span className="text-blue-700">Geographic Spread:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedStory.threat_pattern.geographic_spread.map((state) => (
                          <Badge key={state} variant="outline" className="text-xs">
                            {state}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* AI Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-800">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedStory.ai_analysis.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                        <div className="w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center text-purple-800 text-sm font-bold">
                          {index + 1}
                        </div>
                        <p className="text-purple-800 flex-1">{rec}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Select a Fraud Story</h3>
                <p className="text-gray-500">
                  Choose a story from the list to view the detailed AI-generated investigative report.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

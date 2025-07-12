"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { AlertTriangle, Shield, TrendingUp, Target, Zap } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Tooltip, Legend } from "recharts"

interface BiasMetric {
  category: string
  score: number
  threshold: number
  status: "SAFE" | "WARNING" | "CRITICAL"
  trend: "IMPROVING" | "STABLE" | "DEGRADING"
}

interface DemographicData {
  group: string
  accuracy: number
  falsePositiveRate: number
  falseNegativeRate: number
  representation: number
}

const biasMetrics: BiasMetric[] = [
  {
    category: "Gender Fairness",
    score: 0.92,
    threshold: 0.8,
    status: "SAFE",
    trend: "IMPROVING",
  },
  {
    category: "Age Discrimination",
    score: 0.88,
    threshold: 0.8,
    status: "SAFE",
    trend: "STABLE",
  },
  {
    category: "Geographic Bias",
    score: 0.75,
    threshold: 0.8,
    status: "WARNING",
    trend: "IMPROVING",
  },
  {
    category: "Income Level Fairness",
    score: 0.94,
    threshold: 0.8,
    status: "SAFE",
    trend: "IMPROVING",
  },
  {
    category: "Racial Equity",
    score: 0.89,
    threshold: 0.8,
    status: "SAFE",
    trend: "STABLE",
  },
]

const demographicData: DemographicData[] = [
  {
    group: "18-25 Years",
    accuracy: 94.2,
    falsePositiveRate: 2.1,
    falseNegativeRate: 3.7,
    representation: 18.5,
  },
  {
    group: "26-40 Years",
    accuracy: 95.8,
    falsePositiveRate: 1.8,
    falseNegativeRate: 2.4,
    representation: 35.2,
  },
  {
    group: "41-60 Years",
    accuracy: 96.1,
    falsePositiveRate: 1.6,
    falseNegativeRate: 2.3,
    representation: 32.1,
  },
  {
    group: "60+ Years",
    accuracy: 93.7,
    falsePositiveRate: 2.8,
    falseNegativeRate: 3.5,
    representation: 14.2,
  },
]

const fairnessHistory = [
  { time: "00:00", overall: 0.89, gender: 0.91, age: 0.87, geographic: 0.73, income: 0.92, racial: 0.88 },
  { time: "04:00", overall: 0.9, gender: 0.92, age: 0.88, geographic: 0.74, income: 0.93, racial: 0.89 },
  { time: "08:00", overall: 0.91, gender: 0.92, age: 0.88, geographic: 0.75, income: 0.94, racial: 0.89 },
  { time: "12:00", overall: 0.9, gender: 0.91, age: 0.87, geographic: 0.74, income: 0.93, racial: 0.88 },
  { time: "16:00", overall: 0.91, gender: 0.92, age: 0.88, geographic: 0.75, income: 0.94, racial: 0.89 },
  { time: "20:00", overall: 0.92, gender: 0.92, age: 0.88, geographic: 0.75, income: 0.94, racial: 0.89 },
]

export function BiasCockpit() {
  const [overallFairnessScore, setOverallFairnessScore] = useState(0.91)
  const [biasDetectionEnabled, setBiasDetectionEnabled] = useState(true)
  const [fairnessThreshold, setFairnessThreshold] = useState([0.8])
  const [autoMitigationEnabled, setAutoMitigationEnabled] = useState(true)
  const [selectedMetric, setSelectedMetric] = useState<BiasMetric | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SAFE":
        return "bg-green-100 text-green-800"
      case "WARNING":
        return "bg-yellow-100 text-yellow-800"
      case "CRITICAL":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "IMPROVING":
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case "STABLE":
        return <Target className="w-4 h-4 text-blue-500" />
      case "DEGRADING":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return <Target className="w-4 h-4 text-gray-500" />
    }
  }

  const triggerBiasMitigation = () => {
    // Simulate bias mitigation process
    console.log("Triggering automated bias mitigation...")
  }

  const exportFairnessReport = () => {
    const reportContent = `
WALMART FEDERATED LEARNING FAIRNESS AUDIT REPORT
===============================================

Generated: ${new Date().toISOString()}
Overall Fairness Score: ${overallFairnessScore.toFixed(3)}
Bias Detection: ${biasDetectionEnabled ? "ENABLED" : "DISABLED"}
Auto-Mitigation: ${autoMitigationEnabled ? "ENABLED" : "DISABLED"}
Fairness Threshold: ${fairnessThreshold[0].toFixed(2)}

BIAS METRICS ANALYSIS
--------------------
${biasMetrics
  .map(
    (metric) => `
${metric.category}:
  Score: ${metric.score.toFixed(3)}
  Status: ${metric.status}
  Trend: ${metric.trend}
  Above Threshold: ${metric.score >= metric.threshold ? "YES" : "NO"}
`,
  )
  .join("\n")}

DEMOGRAPHIC PERFORMANCE
----------------------
${demographicData
  .map(
    (demo) => `
${demo.group}:
  Accuracy: ${demo.accuracy.toFixed(1)}%
  False Positive Rate: ${demo.falsePositiveRate.toFixed(1)}%
  False Negative Rate: ${demo.falseNegativeRate.toFixed(1)}%
  Representation: ${demo.representation.toFixed(1)}%
`,
  )
  .join("\n")}

FAIRNESS RECOMMENDATIONS
-----------------------
• Monitor geographic bias - currently below threshold
• Maintain current gender fairness protocols
• Continue age-balanced training data collection
• Implement additional racial equity safeguards
• Regular bias auditing every 24 hours

Generated by Walmart AI Fairness System
Confidential - For Compliance Use Only
    `

    const blob = new Blob([reportContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `fairness-audit-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">⚖️ AI Fairness Cockpit</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Real-time bias detection and algorithmic fairness monitoring
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge
            className={`text-lg px-4 py-2 ${
              overallFairnessScore >= 0.9
                ? "bg-green-100 text-green-800"
                : overallFairnessScore >= 0.8
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
            }`}
          >
            Fairness Score: {overallFairnessScore.toFixed(3)}
          </Badge>
          <Button onClick={exportFairnessReport} className="bg-[#0071CE] hover:bg-blue-700">
            Export Report
          </Button>
        </div>
      </div>

      {/* Control Panel */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-800">
            <Shield className="w-5 h-5 mr-2" />
            Fairness Control Panel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-700">Bias Detection</label>
              <div className="flex items-center space-x-2">
                <Switch checked={biasDetectionEnabled} onCheckedChange={setBiasDetectionEnabled} />
                <span className="text-sm text-blue-600">{biasDetectionEnabled ? "Enabled" : "Disabled"}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-700">Auto-Mitigation</label>
              <div className="flex items-center space-x-2">
                <Switch checked={autoMitigationEnabled} onCheckedChange={setAutoMitigationEnabled} />
                <span className="text-sm text-blue-600">{autoMitigationEnabled ? "Enabled" : "Disabled"}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-700">
                Fairness Threshold: {fairnessThreshold[0].toFixed(2)}
              </label>
              <Slider
                value={fairnessThreshold}
                onValueChange={setFairnessThreshold}
                max={1}
                min={0.5}
                step={0.01}
                className="w-full"
              />
            </div>

            <div className="flex items-end">
              <Button onClick={triggerBiasMitigation} className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                <Zap className="w-4 h-4 mr-2" />
                Trigger Mitigation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="metrics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="metrics">Bias Metrics</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="trends">Fairness Trends</TabsTrigger>
          <TabsTrigger value="mitigation">Mitigation</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {biasMetrics.map((metric) => (
              <Card
                key={metric.category}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedMetric?.category === metric.category
                    ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
                onClick={() => setSelectedMetric(metric)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{metric.category}</CardTitle>
                    {getTrendIcon(metric.trend)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">{metric.score.toFixed(3)}</div>
                      <div className="text-sm text-gray-500">Fairness Score</div>
                    </div>

                    <Progress value={metric.score * 100} className="h-2" />

                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(metric.status)}>{metric.status}</Badge>
                      <span className="text-xs text-gray-500">Threshold: {metric.threshold.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Demographic Performance Analysis</CardTitle>
                <CardDescription>Model accuracy across different demographic groups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={demographicData}>
                      <XAxis dataKey="group" tick={{ fontSize: 12 }} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="accuracy" fill="#0071CE" name="Accuracy %" />
                      <Bar dataKey="falsePositiveRate" fill="#E31837" name="False Positive %" />
                      <Bar dataKey="falseNegativeRate" fill="#FFC220" name="False Negative %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Representation Analysis</CardTitle>
                <CardDescription>Data representation across demographic groups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {demographicData.map((demo) => (
                    <div key={demo.group} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{demo.group}</span>
                        <span className="text-sm text-gray-600">{demo.representation.toFixed(1)}%</span>
                      </div>
                      <Progress value={demo.representation} className="h-2" />
                      <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
                        <div>Accuracy: {demo.accuracy.toFixed(1)}%</div>
                        <div>FP Rate: {demo.falsePositiveRate.toFixed(1)}%</div>
                        <div>FN Rate: {demo.falseNegativeRate.toFixed(1)}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fairness Trends Over Time</CardTitle>
              <CardDescription>24-hour fairness score monitoring across all bias categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={fairnessHistory}>
                    <XAxis dataKey="time" />
                    <YAxis domain={[0.7, 1]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="overall" stroke="#0071CE" strokeWidth={3} name="Overall" />
                    <Line type="monotone" dataKey="gender" stroke="#10B981" strokeWidth={2} name="Gender" />
                    <Line type="monotone" dataKey="age" stroke="#F59E0B" strokeWidth={2} name="Age" />
                    <Line type="monotone" dataKey="geographic" stroke="#EF4444" strokeWidth={2} name="Geographic" />
                    <Line type="monotone" dataKey="income" stroke="#8B5CF6" strokeWidth={2} name="Income" />
                    <Line type="monotone" dataKey="racial" stroke="#06B6D4" strokeWidth={2} name="Racial" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mitigation" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-orange-800">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Active Bias Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-yellow-800">Geographic Bias Warning</h4>
                      <Badge className="bg-yellow-100 text-yellow-800">ACTIVE</Badge>
                    </div>
                    <p className="text-sm text-yellow-700 mb-3">
                      Rural store performance 7% below urban stores. Recommend additional training data collection.
                    </p>
                    <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white">
                      Apply Mitigation
                    </Button>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-green-800">Gender Fairness Optimal</h4>
                      <Badge className="bg-green-100 text-green-800">RESOLVED</Badge>
                    </div>
                    <p className="text-sm text-green-700">
                      Gender bias successfully mitigated. Performance parity achieved across all gender groups.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Shield className="w-5 h-5 mr-2" />
                  Mitigation Strategies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Data Augmentation</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Automatically balance training data across demographic groups
                    </p>
                    <div className="flex items-center justify-between">
                      <Switch defaultChecked />
                      <span className="text-sm text-blue-600">Enabled</span>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Adversarial Debiasing</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Use adversarial networks to remove demographic correlations
                    </p>
                    <div className="flex items-center justify-between">
                      <Switch defaultChecked />
                      <span className="text-sm text-blue-600">Enabled</span>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Fairness Constraints</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Apply mathematical fairness constraints during training
                    </p>
                    <div className="flex items-center justify-between">
                      <Switch />
                      <span className="text-sm text-blue-600">Disabled</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

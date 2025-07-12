"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Download, Upload, Play, Pause, TrendingUp, Activity, Zap, Eye, RefreshCw } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { useNotifications } from "@/components/notification-provider"

// Mock data for model management
const modelVersions = [
  {
    id: "v2.1.3",
    name: "Fraud Detection Model v2.1.3",
    status: "active",
    accuracy: 82.3,
    precision: 84.1,
    recall: 80.5,
    f1Score: 82.2,
    deployedAt: "2024-01-15",
    trainingRounds: 15,
    storesDeployed: 3,
    size: "45.2 MB",
    description: "Latest model with improved fake receipt detection",
  },
  {
    id: "v2.1.2",
    name: "Fraud Detection Model v2.1.2",
    status: "deprecated",
    accuracy: 78.9,
    precision: 80.2,
    recall: 77.6,
    f1Score: 78.9,
    deployedAt: "2024-01-10",
    trainingRounds: 12,
    storesDeployed: 1,
    size: "42.8 MB",
    description: "Previous stable version with card fraud improvements",
  },
  {
    id: "v2.1.1",
    name: "Fraud Detection Model v2.1.1",
    status: "archived",
    accuracy: 75.4,
    precision: 77.1,
    recall: 73.7,
    f1Score: 75.4,
    deployedAt: "2024-01-05",
    trainingRounds: 10,
    storesDeployed: 0,
    size: "40.1 MB",
    description: "Initial federated learning implementation",
  },
]

const trainingHistory = [
  { round: 1, accuracy: 65, loss: 0.45, participants: 3, duration: 120 },
  { round: 2, accuracy: 68, loss: 0.42, participants: 3, duration: 115 },
  { round: 3, accuracy: 72, loss: 0.38, participants: 3, duration: 118 },
  { round: 4, accuracy: 75, loss: 0.35, participants: 3, duration: 122 },
  { round: 5, accuracy: 78, loss: 0.32, participants: 3, duration: 119 },
  { round: 6, accuracy: 80, loss: 0.3, participants: 3, duration: 125 },
  { round: 7, accuracy: 82, loss: 0.28, participants: 3, duration: 121 },
]

const modelMetrics = [
  { metric: "Accuracy", current: 82.3, target: 85, improvement: "+3.4%" },
  { metric: "Precision", current: 84.1, target: 87, improvement: "+2.9%" },
  { metric: "Recall", current: 80.5, target: 83, improvement: "+4.1%" },
  { metric: "F1-Score", current: 82.2, target: 85, improvement: "+3.3%" },
  { metric: "Latency", current: 45, target: 40, improvement: "-8ms" },
  { metric: "Throughput", current: 1250, target: 1500, improvement: "+15%" },
]

const performanceComparison = [
  { subject: "Accuracy", current: 82, previous: 79, target: 85 },
  { subject: "Precision", current: 84, previous: 80, target: 87 },
  { subject: "Recall", current: 81, previous: 78, target: 83 },
  { subject: "F1-Score", current: 82, previous: 79, target: 85 },
  { subject: "Speed", current: 95, previous: 88, target: 98 },
  { subject: "Reliability", current: 98, previous: 95, target: 99 },
]

export function ModelManagement() {
  const [selectedModel, setSelectedModel] = useState(modelVersions[0])
  const [isTraining, setIsTraining] = useState(false)
  const [trainingProgress, setTrainingProgress] = useState(0)
  const { addNotification } = useNotifications()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "deprecated":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "archived":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const startTraining = () => {
    setIsTraining(true)
    setTrainingProgress(0)

    addNotification({
      type: "info",
      title: "Training Started",
      message: "New federated learning round has been initiated",
    })

    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsTraining(false)
          addNotification({
            type: "success",
            title: "Training Complete",
            message: "Model training completed successfully with improved accuracy",
          })
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 500)
  }

  const deployModel = (modelId: string) => {
    addNotification({
      type: "success",
      title: "Model Deployed",
      message: `Model ${modelId} has been deployed to all stores`,
    })
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Model Management</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Manage federated learning models, training, and deployment
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            onClick={startTraining}
            disabled={isTraining}
            className="bg-[#004b91] hover:bg-blue-700 flex items-center space-x-2"
          >
            {isTraining ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isTraining ? "Training..." : "Start Training"}</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
            <Upload className="w-4 h-4" />
            <span>Upload Model</span>
          </Button>
        </div>
      </div>

      {/* Training Progress */}
      {isTraining && (
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-blue-900">Training in Progress</h3>
                <p className="text-blue-700">Federated learning round 8 - Aggregating updates from stores</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-900">{Math.round(trainingProgress)}%</p>
                <p className="text-sm text-blue-600">Complete</p>
              </div>
            </div>
            <Progress value={trainingProgress} className="h-3" />
            <div className="flex justify-between text-sm text-blue-600 mt-2">
              <span>Collecting updates from stores...</span>
              <span>ETA: {Math.max(0, Math.round((100 - trainingProgress) / 10))} min</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Model Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Active Models</p>
                <p className="text-3xl font-bold text-green-900">
                  {modelVersions.filter((m) => m.status === "active").length}
                </p>
              </div>
              <Brain className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Training Rounds</p>
                <p className="text-3xl font-bold text-blue-900">15</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Best Accuracy</p>
                <p className="text-3xl font-bold text-purple-900">82.3%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Avg Latency</p>
                <p className="text-3xl font-bold text-orange-900">45ms</p>
              </div>
              <Zap className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="models" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="models">Model Versions</TabsTrigger>
          <TabsTrigger value="training">Training History</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Model List */}
            <div className="lg:col-span-2 space-y-4">
              {modelVersions.map((model) => (
                <Card
                  key={model.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedModel.id === model.id ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20" : ""
                  }`}
                  onClick={() => setSelectedModel(model)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{model.name}</CardTitle>
                        <CardDescription>{model.description}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(model.status)}>{model.status.toUpperCase()}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{model.accuracy}%</p>
                        <p className="text-xs text-gray-500">Accuracy</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">{model.precision}%</p>
                        <p className="text-xs text-gray-500">Precision</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-orange-600">{model.recall}%</p>
                        <p className="text-xs text-gray-500">Recall</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-purple-600">{model.f1Score}%</p>
                        <p className="text-xs text-gray-500">F1-Score</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                      <span>Deployed: {model.deployedAt}</span>
                      <span>Size: {model.size}</span>
                      <span>Stores: {model.storesDeployed}/3</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Model Details */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Model Details</CardTitle>
                  <CardDescription>Information about {selectedModel.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Performance Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Accuracy:</span>
                        <span className="font-semibold">{selectedModel.accuracy}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Precision:</span>
                        <span className="font-semibold">{selectedModel.precision}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Recall:</span>
                        <span className="font-semibold">{selectedModel.recall}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">F1-Score:</span>
                        <span className="font-semibold">{selectedModel.f1Score}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Deployment Info</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Version:</span>
                        <span className="font-mono text-sm">{selectedModel.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Status:</span>
                        <Badge className={getStatusColor(selectedModel.status)}>{selectedModel.status}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Training Rounds:</span>
                        <span className="font-semibold">{selectedModel.trainingRounds}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Model Size:</span>
                        <span className="font-semibold">{selectedModel.size}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      className="w-full"
                      onClick={() => deployModel(selectedModel.id)}
                      disabled={selectedModel.status === "active"}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Deploy Model
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Download Model
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Training History</CardTitle>
              <CardDescription>Federated learning training rounds and performance evolution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={trainingHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="round" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#004b91"
                    strokeWidth={3}
                    name="Accuracy %"
                    dot={{ fill: "#004b91", strokeWidth: 2, r: 6 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="loss"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="Loss"
                    dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Training Statistics</CardTitle>
                <CardDescription>Key metrics from recent training rounds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="font-medium">Total Rounds</span>
                    <span className="text-2xl font-bold text-blue-600">15</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="font-medium">Best Accuracy</span>
                    <span className="text-2xl font-bold text-green-600">82.3%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <span className="font-medium">Avg Duration</span>
                    <span className="text-2xl font-bold text-purple-600">120s</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <span className="font-medium">Participants</span>
                    <span className="text-2xl font-bold text-orange-600">3/3</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Round Duration</CardTitle>
                <CardDescription>Training time per round</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={trainingHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="round" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="duration" fill="#004b91" name="Duration (seconds)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Comparison</CardTitle>
                <CardDescription>Current vs Previous vs Target performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={performanceComparison}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Current" dataKey="current" stroke="#004b91" fill="#004b91" fillOpacity={0.2} />
                    <Radar name="Previous" dataKey="previous" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                    <Radar name="Target" dataKey="target" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
                <CardDescription>Current performance indicators and targets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {modelMetrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{metric.metric}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-green-600">{metric.improvement}</span>
                          <Badge variant="outline">
                            {metric.current}
                            {metric.metric === "Latency" ? "ms" : metric.metric === "Throughput" ? "/min" : "%"}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={(metric.current / metric.target) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>
                          Current: {metric.current}
                          {metric.metric === "Latency" ? "ms" : metric.metric === "Throughput" ? "/min" : "%"}
                        </span>
                        <span>
                          Target: {metric.target}
                          {metric.metric === "Latency" ? "ms" : metric.metric === "Throughput" ? "/min" : "%"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Deployment Status</CardTitle>
                <CardDescription>Model deployment across all stores</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">Store A - Dallas, TX</p>
                        <p className="text-sm text-gray-500">Model v2.1.3 • Deployed 2h ago</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">Store B - Houston, TX</p>
                        <p className="text-sm text-gray-500">Model v2.1.3 • Deployed 2h ago</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">Store C - Austin, TX</p>
                        <p className="text-sm text-gray-500">Model v2.1.2 • Updating...</p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Updating</Badge>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-3">Deployment Statistics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">100%</p>
                      <p className="text-sm text-blue-600">Success Rate</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">2.1 min</p>
                      <p className="text-sm text-green-600">Avg Deploy Time</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rollback & Recovery</CardTitle>
                <CardDescription>Model version control and rollback options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Current Deployment</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Version:</span>
                      <span className="font-mono text-sm">v2.1.3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Deployed:</span>
                      <span className="text-sm">2 hours ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Status:</span>
                      <Badge className="bg-green-100 text-green-800">Stable</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Rollback to v2.1.2
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Force Redeploy
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Eye className="w-4 h-4 mr-2" />
                    View Deployment Logs
                  </Button>
                </div>
                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-2">Deployment History</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>v2.1.3</span>
                      <span className="text-gray-500">2h ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>v2.1.2</span>
                      <span className="text-gray-500">1d ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>v2.1.1</span>
                      <span className="text-gray-500">3d ago</span>
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

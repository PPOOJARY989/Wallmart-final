"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Shield,
  Clock,
  Users,
  Download,
  Calendar,
  Eye,
  AlertTriangle,
} from "lucide-react"

// Mock data for analytics
const performanceData = [
  { month: "Jan", accuracy: 65, precision: 68, recall: 62, f1Score: 65 },
  { month: "Feb", accuracy: 68, precision: 70, recall: 66, f1Score: 68 },
  { month: "Mar", accuracy: 72, precision: 74, recall: 70, f1Score: 72 },
  { month: "Apr", accuracy: 75, precision: 77, recall: 73, f1Score: 75 },
  { month: "May", accuracy: 78, precision: 80, recall: 76, f1Score: 78 },
  { month: "Jun", accuracy: 82, precision: 84, recall: 80, f1Score: 82 },
]

const fraudTypeData = [
  { name: "Fake Receipts", value: 45, color: "#ef4444" },
  { name: "Card Fraud", value: 30, color: "#f97316" },
  { name: "Identity Theft", value: 15, color: "#eab308" },
  { name: "Phishing", value: 10, color: "#84cc16" },
]

const storeComparisonData = [
  { store: "Store A", accuracy: 82, fraudCases: 15, transactions: 1250 },
  { store: "Store B", accuracy: 79, fraudCases: 12, transactions: 980 },
  { store: "Store C", accuracy: 76, fraudCases: 8, transactions: 750 },
]

const timeSeriesData = [
  { time: "00:00", fraudAttempts: 5, blocked: 4, accuracy: 80 },
  { time: "04:00", fraudAttempts: 3, blocked: 3, accuracy: 100 },
  { time: "08:00", fraudAttempts: 12, blocked: 10, accuracy: 83 },
  { time: "12:00", fraudAttempts: 18, blocked: 15, accuracy: 83 },
  { time: "16:00", fraudAttempts: 22, blocked: 19, accuracy: 86 },
  { time: "20:00", fraudAttempts: 15, blocked: 13, accuracy: 87 },
]

const radarData = [
  { subject: "Accuracy", A: 82, B: 79, C: 76, fullMark: 100 },
  { subject: "Precision", A: 84, B: 81, C: 78, fullMark: 100 },
  { subject: "Recall", A: 80, B: 77, C: 74, fullMark: 100 },
  { subject: "F1-Score", A: 82, B: 79, C: 76, fullMark: 100 },
  { subject: "Speed", A: 95, B: 88, C: 82, fullMark: 100 },
  { subject: "Reliability", A: 98, B: 95, C: 92, fullMark: 100 },
]

export function Analytics() {
  const [timeRange, setTimeRange] = useState("7d")
  const [selectedMetric, setSelectedMetric] = useState("accuracy")

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics & Reports</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Comprehensive analytics for federated learning performance and fraud detection
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Global Accuracy</p>
                <p className="text-3xl font-bold text-green-900">82.3%</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+5.2% from last week</span>
                </div>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Fraud Blocked</p>
                <p className="text-3xl font-bold text-blue-900">1,247</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="text-sm text-blue-600">+12% this month</span>
                </div>
              </div>
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Avg Response Time</p>
                <p className="text-3xl font-bold text-purple-900">45ms</p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="w-4 h-4 text-purple-500 mr-1" />
                  <span className="text-sm text-purple-600">-8ms improved</span>
                </div>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Active Stores</p>
                <p className="text-3xl font-bold text-orange-900">3/3</p>
                <div className="flex items-center mt-2">
                  <Eye className="w-4 h-4 text-orange-500 mr-1" />
                  <span className="text-sm text-orange-600">100% uptime</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="fraud-analysis">Fraud Analysis</TabsTrigger>
          <TabsTrigger value="store-comparison">Store Comparison</TabsTrigger>
          <TabsTrigger value="real-time">Real-time</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Model Performance Over Time</CardTitle>
                <CardDescription>Track accuracy, precision, recall, and F1-score</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[60, 90]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="accuracy" stroke="#004b91" strokeWidth={3} name="Accuracy" />
                    <Line type="monotone" dataKey="precision" stroke="#10b981" strokeWidth={2} name="Precision" />
                    <Line type="monotone" dataKey="recall" stroke="#f59e0b" strokeWidth={2} name="Recall" />
                    <Line type="monotone" dataKey="f1Score" stroke="#ef4444" strokeWidth={2} name="F1-Score" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Store Performance Radar</CardTitle>
                <CardDescription>Multi-dimensional performance comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Store A" dataKey="A" stroke="#004b91" fill="#004b91" fillOpacity={0.1} />
                    <Radar name="Store B" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                    <Radar name="Store C" dataKey="C" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fraud-analysis" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Fraud Types Distribution</CardTitle>
                <CardDescription>Breakdown of detected fraud categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={fraudTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {fraudTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {fraudTypeData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">{item.name}</span>
                      <span className="text-sm font-semibold">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fraud Detection Timeline</CardTitle>
                <CardDescription>24-hour fraud detection activity</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={timeSeriesData}>
                    <defs>
                      <linearGradient id="fraudGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="blockedGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="fraudAttempts"
                      stackId="1"
                      stroke="#ef4444"
                      fill="url(#fraudGradient)"
                      name="Fraud Attempts"
                    />
                    <Area
                      type="monotone"
                      dataKey="blocked"
                      stackId="2"
                      stroke="#10b981"
                      fill="url(#blockedGradient)"
                      name="Blocked"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Fraud Detection Insights</CardTitle>
              <CardDescription>Key insights and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <h4 className="font-semibold text-red-800 dark:text-red-300">High Risk Period</h4>
                  </div>
                  <p className="text-sm text-red-700 dark:text-red-400">
                    Peak fraud attempts occur between 4-8 PM. Consider increasing monitoring during these hours.
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    <h4 className="font-semibold text-green-800 dark:text-green-300">Strong Defense</h4>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    86% average block rate shows excellent model performance across all fraud types.
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300">Improving Trend</h4>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    Model accuracy has improved by 12% over the past month through federated learning.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="store-comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Store Performance Comparison</CardTitle>
              <CardDescription>Compare key metrics across all participating stores</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={storeComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="store" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="accuracy" fill="#004b91" name="Accuracy %" />
                  <Bar yAxisId="right" dataKey="fraudCases" fill="#ef4444" name="Fraud Cases" />
                  <Bar yAxisId="right" dataKey="transactions" fill="#10b981" name="Transactions (100s)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {storeComparisonData.map((store, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {store.store}
                    <Badge
                      className={`${
                        store.accuracy >= 80
                          ? "bg-green-100 text-green-800"
                          : store.accuracy >= 75
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {store.accuracy >= 80 ? "Excellent" : store.accuracy >= 75 ? "Good" : "Needs Improvement"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{store.accuracy}%</p>
                      <p className="text-xs text-gray-500">Accuracy</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600">{store.fraudCases}</p>
                      <p className="text-xs text-gray-500">Fraud Cases</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">{store.transactions}</p>
                      <p className="text-xs text-gray-500">Transactions</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${store.accuracy}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="real-time" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Fraud Detection Activity</CardTitle>
              <CardDescription>Live monitoring of fraud detection across all stores</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="fraudAttempts"
                    stroke="#ef4444"
                    strokeWidth={3}
                    name="Fraud Attempts"
                    dot={{ fill: "#ef4444", strokeWidth: 2, r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="blocked"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Successfully Blocked"
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Statistics</CardTitle>
                <CardDescription>Current system performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="font-medium">Fraud Detection Rate</span>
                  <span className="text-2xl font-bold text-green-600">94.2%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="font-medium">Average Response Time</span>
                  <span className="text-2xl font-bold text-blue-600">42ms</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <span className="font-medium">Active Connections</span>
                  <span className="text-2xl font-bold text-purple-600">3/3</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <span className="font-medium">Data Privacy Score</span>
                  <span className="text-2xl font-bold text-orange-600">100%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Real-time system status indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Model Training</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Data Synchronization</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600">Synced</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Privacy Compliance</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600">Compliant</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Network Latency</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-yellow-600">Normal</span>
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

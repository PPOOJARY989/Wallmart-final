"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RefreshCw, Play, RotateCcw, Activity, Clock, Target, Users, TrendingUp, Zap, Database } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { useNotifications } from "@/components/notification-provider"

// Mock data
const accuracyData = [
  { round: 1, accuracy: 65, stores: 3 },
  { round: 2, accuracy: 68, stores: 3 },
  { round: 3, accuracy: 72, stores: 3 },
  { round: 4, accuracy: 75, stores: 3 },
  { round: 5, accuracy: 78, stores: 3 },
]

const previewData = [
  { name: "Jan", value: 65 },
  { name: "Feb", value: 72 },
  { name: "Mar", value: 78 },
  { name: "Apr", value: 82 },
  { name: "May", value: 85 },
]

const pieData = [
  { name: "Legitimate", value: 85, color: "#10b981" },
  { name: "Fraud", value: 15, color: "#ef4444" },
]

const initialLogs = [
  { id: 1, message: "Store A submitted model update", timestamp: "3:42 PM", type: "update" },
  { id: 2, message: "Global model aggregation completed", timestamp: "3:41 PM", type: "system" },
  { id: 3, message: "Store C submitted model update", timestamp: "3:40 PM", type: "update" },
  { id: 4, message: "Store B submitted model update", timestamp: "3:39 PM", type: "update" },
  { id: 5, message: "Training round 5 initiated", timestamp: "3:35 PM", type: "round" },
]

export function Dashboard() {
  const [logs, setLogs] = useState(initialLogs)
  const [currentRound, setCurrentRound] = useState(5)
  const [updatesReceived, setUpdatesReceived] = useState(2)
  const [globalAccuracy, setGlobalAccuracy] = useState(78)
  const [isTraining, setIsTraining] = useState(false)
  const { addNotification } = useNotifications()

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = {
        id: Date.now(),
        message: `Store ${String.fromCharCode(65 + Math.floor(Math.random() * 3))} heartbeat received`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "heartbeat",
      }
      setLogs((prev) => [newLog, ...prev.slice(0, 9)])
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const simulateStoreUpdate = () => {
    const stores = ["A", "B", "C"]
    const randomStore = stores[Math.floor(Math.random() * stores.length)]
    const newLog = {
      id: Date.now(),
      message: `Store ${randomStore} submitted model update`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "update",
    }
    setLogs((prev) => [newLog, ...prev.slice(0, 9)])
    setUpdatesReceived((prev) => Math.min(prev + 1, 3))

    addNotification({
      type: "success",
      title: "Store Update",
      message: `Store ${randomStore} successfully submitted model update`,
    })
  }

  const startTrainingRound = () => {
    setIsTraining(true)
    const newLog = {
      id: Date.now(),
      message: `Training round ${currentRound + 1} initiated`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "round",
    }
    setLogs((prev) => [newLog, ...prev.slice(0, 9)])

    addNotification({
      type: "info",
      title: "Training Started",
      message: `Training round ${currentRound + 1} has been initiated`,
    })

    setTimeout(() => {
      setCurrentRound((prev) => prev + 1)
      setUpdatesReceived(0)
      setGlobalAccuracy((prev) => Math.min(prev + Math.floor(Math.random() * 3) + 1, 95))
      setIsTraining(false)

      addNotification({
        type: "success",
        title: "Training Complete",
        message: `Training round ${currentRound + 1} completed successfully`,
      })
    }, 3000)
  }

  const resetSystem = () => {
    setCurrentRound(1)
    setUpdatesReceived(0)
    setGlobalAccuracy(65)
    setLogs(initialLogs)

    addNotification({
      type: "info",
      title: "System Reset",
      message: "System has been reset to initial state",
    })
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              Federated Learning
              <span className="block text-transparent bg-gradient-to-r from-[#004b91] to-cyan-600 bg-clip-text">
                Dashboard
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Monitor real-time federated learning across all Walmart stores with complete privacy preservation.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-gradient-to-r from-[#9df9ef] to-cyan-200 text-gray-800 px-3 py-1">
                <Activity className="w-4 h-4 mr-1" />
                Live Monitoring
              </Badge>
              <Badge className="bg-gradient-to-r from-green-200 to-green-300 text-gray-800 px-3 py-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                Real-time Analytics
              </Badge>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">System Overview</h3>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-[#9df9ef] to-cyan-100 p-3 rounded-xl">
                  <div className="flex items-center justify-between">
                    <Database className="w-5 h-5 text-gray-700" />
                    <span className="text-xs font-medium text-gray-600">Active</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mt-1">3</div>
                  <p className="text-xs text-gray-600">Stores</p>
                </div>
                <div className="bg-gradient-to-br from-green-200 to-green-100 p-3 rounded-xl">
                  <div className="flex items-center justify-between">
                    <Target className="w-5 h-5 text-gray-700" />
                    <span className="text-xs font-medium text-gray-600">Global</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mt-1">{globalAccuracy}%</div>
                  <p className="text-xs text-gray-600">Accuracy</p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <ResponsiveContainer width="100%" height={100}>
                  <AreaChart data={previewData}>
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#004b91" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#004b91" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="#004b91" fillOpacity={1} fill="url(#colorGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-[#9df9ef] to-cyan-100 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-gray-800">
              <Activity className="w-5 h-5 mr-2 animate-pulse" />
              Current Round
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-gray-800">
              {currentRound}
              {isTraining && <span className="text-lg ml-2 animate-pulse text-blue-600">Training...</span>}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-200 to-green-100 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-gray-800">
              <Users className="w-5 h-5 mr-2" />
              Updates Received
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-gray-800">{updatesReceived} / 3</div>
            <p className="text-sm text-gray-600 mt-1">stores</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-200 to-blue-100 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-gray-800">
              <Clock className="w-5 h-5 mr-2" />
              Last Update
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">
              {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
            <p className="text-sm text-gray-600 mt-1">just now</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-200 to-purple-100 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-gray-800">
              <Target className="w-5 h-5 mr-2" />
              Global Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-gray-800">{globalAccuracy}%</div>
            <p className="text-sm text-gray-600 mt-1">fraud detection</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* System Logs */}
        <div className="lg:col-span-1">
          <Card className="h-96 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>System Logs</span>
                <RefreshCw className="w-4 h-4 text-gray-500 animate-spin" />
              </CardTitle>
              <CardDescription>Real-time federated learning activity</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-80">
                <div className="p-4 space-y-2">
                  {logs.map((log, index) => (
                    <div
                      key={log.id}
                      className={`p-3 rounded-lg text-sm font-mono transition-all duration-300 hover:scale-102 ${
                        index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-700"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-gray-800 dark:text-gray-200">{log.message}</span>
                        <span className="text-xs text-gray-500 ml-2">{log.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Accuracy Chart */}
        <div className="lg:col-span-2">
          <Card className="h-96 shadow-xl">
            <CardHeader>
              <CardTitle>Model Accuracy Over Time</CardTitle>
              <CardDescription>Global fraud detection accuracy across training rounds</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={accuracyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="round" />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#004b91"
                    strokeWidth={4}
                    dot={{ fill: "#9df9ef", strokeWidth: 3, r: 8 }}
                    activeDot={{ r: 10, fill: "#004b91" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap justify-center gap-6">
        <Button
          onClick={simulateStoreUpdate}
          className="bg-gradient-to-r from-[#004b91] to-blue-700 hover:from-blue-700 hover:to-[#004b91] text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Zap className="w-5 h-5 mr-2" />
          Simulate Store Update
        </Button>
        <Button
          onClick={startTrainingRound}
          disabled={isTraining}
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
        >
          <Play className="w-5 h-5 mr-2" />
          {isTraining ? "Training..." : "Start Training Round"}
        </Button>
        <Button
          onClick={resetSystem}
          variant="outline"
          className="px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-100 dark:hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-transparent"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Reset System
        </Button>
      </div>
    </div>
  )
}

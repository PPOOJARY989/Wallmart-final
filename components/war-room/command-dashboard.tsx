"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  AlertTriangle,
  DollarSign,
  Target,
  Radar,
  Zap,
  TrendingUp,
  Clock,
  MapPin,
  Activity,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar as RechartsRadar,
} from "recharts"

interface ThreatAlert {
  id: string
  nickname: string
  type: string
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  location: string
  impact: number
  timestamp: string
  status: "ACTIVE" | "CONTAINED" | "NEUTRALIZED"
}

const threatAlerts: ThreatAlert[] = [
  {
    id: "threat-001",
    nickname: "Hurricane Scam Cluster",
    type: "Gift Card Fraud",
    severity: "CRITICAL",
    location: "Miami, FL",
    impact: 45000,
    timestamp: "2 min ago",
    status: "ACTIVE",
  },
  {
    id: "threat-002",
    nickname: "Phantom Receipt Syndicate",
    type: "Return Fraud",
    severity: "HIGH",
    location: "Dallas, TX",
    impact: 23000,
    timestamp: "8 min ago",
    status: "CONTAINED",
  },
  {
    id: "threat-003",
    nickname: "Digital Ghost Network",
    type: "Identity Theft",
    severity: "MEDIUM",
    location: "Seattle, WA",
    impact: 12000,
    timestamp: "15 min ago",
    status: "NEUTRALIZED",
  },
]

const savingsData = [
  { time: "00:00", saved: 1200, prevented: 8 },
  { time: "04:00", saved: 2100, prevented: 12 },
  { time: "08:00", saved: 3400, prevented: 18 },
  { time: "12:00", saved: 4800, prevented: 25 },
  { time: "16:00", saved: 6200, prevented: 31 },
  { time: "20:00", saved: 7500, prevented: 38 },
]

const radarData = [
  { subject: "Detection Speed", A: 95, fullMark: 100 },
  { subject: "Accuracy", A: 88, fullMark: 100 },
  { subject: "Coverage", A: 92, fullMark: 100 },
  { subject: "Response Time", A: 85, fullMark: 100 },
  { subject: "Prevention Rate", A: 94, fullMark: 100 },
  { subject: "Cost Efficiency", A: 89, fullMark: 100 },
]

export function WarRoomDashboard() {
  const [totalSaved, setTotalSaved] = useState(2847392)
  const [savingsPerSecond] = useState(12.47)
  const [activeThreats, setActiveThreats] = useState(threatAlerts.filter((t) => t.status === "ACTIVE").length)
  const [defconLevel, setDefconLevel] = useState(3)

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSaved((prev) => prev + savingsPerSecond)
    }, 1000)

    return () => clearInterval(interval)
  }, [savingsPerSecond])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-red-500 text-white animate-pulse"
      case "HIGH":
        return "bg-orange-500 text-white"
      case "MEDIUM":
        return "bg-yellow-500 text-black"
      case "LOW":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "text-red-500"
      case "CONTAINED":
        return "text-yellow-500"
      case "NEUTRALIZED":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  const getDefconColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-red-600 text-white"
      case 2:
        return "bg-orange-600 text-white"
      case 3:
        return "bg-yellow-600 text-black"
      case 4:
        return "bg-blue-600 text-white"
      case 5:
        return "bg-green-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-900 via-blue-900/10 to-black min-h-screen text-white">
      {/* Command Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#FFC220] mb-2">🛡️ FEDERATED COMMAND CENTER</h1>
          <p className="text-gray-300">Real-time fraud intelligence & threat mitigation</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className={`text-lg px-4 py-2 ${getDefconColor(defconLevel)}`}>DEFCON {defconLevel}</Badge>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#0071CE]">${totalSaved.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Total Saved</div>
          </div>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-900/50 to-green-800/30 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300 text-sm font-medium">SAVINGS/SEC</p>
                <p className="text-3xl font-bold text-green-100">${savingsPerSecond.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
            <div className="mt-2">
              <div className="flex items-center text-green-300 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +23% from last hour
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-900/50 to-red-800/30 border-red-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-300 text-sm font-medium">ACTIVE THREATS</p>
                <p className="text-3xl font-bold text-red-100">{activeThreats}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400 animate-pulse" />
            </div>
            <div className="mt-2">
              <div className="flex items-center text-red-300 text-sm">
                <Activity className="w-4 h-4 mr-1" />2 new in last 10min
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm font-medium">DETECTION RATE</p>
                <p className="text-3xl font-bold text-blue-100">94.7%</p>
              </div>
              <Target className="w-8 h-8 text-blue-400" />
            </div>
            <div className="mt-2">
              <div className="flex items-center text-blue-300 text-sm">
                <Zap className="w-4 h-4 mr-1" />
                8.3s avg response
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm font-medium">GLOBAL ROI</p>
                <p className="text-3xl font-bold text-purple-100">847%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-400" />
            </div>
            <div className="mt-2">
              <div className="flex items-center text-purple-300 text-sm">
                <DollarSign className="w-4 h-4 mr-1" />
                $8.47 saved per $1 invested
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Command Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Threat Radar */}
        <div className="lg:col-span-2">
          <Card className="bg-black/50 border-[#0071CE]/30">
            <CardHeader>
              <CardTitle className="flex items-center text-[#FFC220]">
                <Radar className="w-5 h-5 mr-2" />
                LIVE THREAT RADAR
              </CardTitle>
              <CardDescription className="text-gray-400">
                Real-time fraud pattern detection across all stores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threatAlerts.map((threat) => (
                  <div
                    key={threat.id}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700/50"
                  >
                    <div className="flex items-center space-x-4">
                      <Badge className={getSeverityColor(threat.severity)}>{threat.severity}</Badge>
                      <div>
                        <h4 className="font-bold text-white">{threat.nickname}</h4>
                        <p className="text-sm text-gray-400">{threat.type}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {threat.location}
                          <Clock className="w-3 h-3 ml-3 mr-1" />
                          {threat.timestamp}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-red-400">${threat.impact.toLocaleString()}</div>
                      <div className={`text-sm font-medium ${getStatusColor(threat.status)}`}>{threat.status}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Radar Visualization */}
              <div className="mt-6 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                    <RechartsRadar
                      name="System Performance"
                      dataKey="A"
                      stroke="#0071CE"
                      fill="#0071CE"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Strategic Impact Board */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-green-900/30 to-green-800/20 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-300">💰 IMPACT METRICS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-100 mb-2">${(totalSaved / 1000000).toFixed(2)}M</div>
                <div className="text-sm text-green-300">Total Fraud Prevented</div>
                <Progress value={75} className="mt-2 h-2" />
                <div className="text-xs text-green-400 mt-1">75% of monthly target</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center p-3 bg-green-800/20 rounded-lg">
                  <div className="text-xl font-bold text-green-100">1,247</div>
                  <div className="text-xs text-green-300">Scams Blocked</div>
                </div>
                <div className="text-center p-3 bg-green-800/20 rounded-lg">
                  <div className="text-xl font-bold text-green-100">98.3%</div>
                  <div className="text-xs text-green-300">Success Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/30 to-red-800/20 border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-orange-300">🚨 CODE RED ALERTS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-red-900/30 rounded-lg border border-red-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-red-300">New Pattern Detected</div>
                      <div className="text-xs text-red-400">Gift card + crypto combo</div>
                    </div>
                    <Badge className="bg-red-600 text-white animate-pulse">LIVE</Badge>
                  </div>
                </div>

                <div className="p-3 bg-yellow-900/30 rounded-lg border border-yellow-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-yellow-300">Anomaly Spike</div>
                      <div className="text-xs text-yellow-400">Store #4587 - 300% increase</div>
                    </div>
                    <Badge className="bg-yellow-600 text-black">WATCH</Badge>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white">
                <Shield className="w-4 h-4 mr-2" />
                INITIATE LOCKDOWN
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-300">⚡ REAL-TIME SAVINGS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={savingsData}>
                    <XAxis dataKey="time" tick={{ fill: "#9CA3AF", fontSize: 10 }} />
                    <YAxis tick={{ fill: "#9CA3AF", fontSize: 10 }} />
                    <Line
                      type="monotone"
                      dataKey="saved"
                      stroke="#0071CE"
                      strokeWidth={3}
                      dot={{ fill: "#0071CE", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center mt-2">
                <div className="text-lg font-bold text-blue-100">${savingsPerSecond.toFixed(2)}/sec</div>
                <div className="text-xs text-blue-300">Current savings rate</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

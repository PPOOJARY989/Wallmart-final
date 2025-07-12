"use client"

import type React from "react"

import { useState, useEffect, lazy, Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Shield,
  Lock,
  Eye,
  RefreshCw,
  Play,
  RotateCcw,
  Activity,
  Clock,
  Target,
  Users,
  TrendingUp,
  Zap,
  PieChartIcon as PieIcon,
  CheckCircle,
  Wifi,
  Globe,
  Camera,
  Sparkles,
  AlertTriangle,
  Award,
  Timer,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
} from "recharts"
import { Sidebar } from "@/components/sidebar"
import { NotificationProvider } from "@/components/notification-provider"
import { StoresManagement } from "@/components/pages/stores-management"
import { Analytics } from "@/components/pages/analytics"
import { FraudAlerts } from "@/components/pages/fraud-alerts"
import { ModelManagement } from "@/components/pages/model-management"
import { Settings } from "@/components/pages/settings"

// Existing Advanced Features
import { FederatedGalaxy } from "@/components/3d/federated-galaxy"
import { PrivacyDNA } from "@/components/3d/privacy-dna"
import { WarRoomDashboard } from "@/components/war-room/command-dashboard"
import { BlockchainAuditTrail } from "@/components/blockchain/audit-trail"
import { GPTStoryteller } from "@/components/ai/gpt-storyteller"
import { BiasCockpit } from "@/components/fairness/bias-cockpit"

// New Features
import { AdversarialArena } from "@/components/arena/adversarial-arena"

// New Lazy-Loaded Components
const FraudGalaxy = lazy(() => import("@/components/galaxy/fraud-galaxy"))
const ARScanner = lazy(() => import("@/components/ar/ar-scanner"))

// Mock data for the chart
const accuracyData = [
  { round: 1, accuracy: 85.23 },
  { round: 2, accuracy: 89.45 },
  { round: 3, accuracy: 93.78 },
  { round: 4, accuracy: 96.34 },
  { round: 5, accuracy: 98.57 },
]

// Mock data for dashboard preview
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

// Mock logs data
const initialLogs = [
  { id: 1, message: "Store A submitted model update", timestamp: "3:42 PM", type: "update" },
  { id: 2, message: "Global model aggregation completed", timestamp: "3:41 PM", type: "system" },
  { id: 3, message: "Store C submitted model update", timestamp: "3:40 PM", type: "update" },
  { id: 4, message: "Store B submitted model update", timestamp: "3:39 PM", type: "update" },
  { id: 5, message: "Training round 5 initiated", timestamp: "3:35 PM", type: "round" },
]

// Micro-interaction configurations
const microInteractions = {
  hoverStoreCard: {
    animation: "framer-spring",
    effects: ["elevate-8px", "sparkle-particles"],
  },
  threatDetected: {
    visual: "pulse-red-3x",
    audio: "soft-alert-chime",
  },
  modelUpdate: {
    networkEffect: "knowledge-pulse-wave",
    duration: 1200,
  },
}

const DashboardComponent = () => {
  const [logs, setLogs] = useState(initialLogs)
  const [currentRound, setCurrentRound] = useState(5)
  const [updatesReceived, setUpdatesReceived] = useState(2)
  const [globalAccuracy, setGlobalAccuracy] = useState(98.57)
  const [isTraining, setIsTraining] = useState(false)
  const [animatedAccuracy, setAnimatedAccuracy] = useState(0)
  const [animatedRound, setAnimatedRound] = useState(0)
  const [animatedUpdates, setAnimatedUpdates] = useState(0)
  const [privacyLensActive, setPrivacyLensActive] = useState(false)
  const [threatDetected, setThreatDetected] = useState(false)
  const [arScannerActive, setArScannerActive] = useState(false)
  const [trustBadgeUnlocked, setTrustBadgeUnlocked] = useState(false)
  const [speedRunMode, setSpeedRunMode] = useState(false)
  const [sparkleParticles, setSparkleParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  // Initialize Web Worker for DP calculations
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const dpWorker = new Worker("/workers/dp-calculator.js")
        dpWorker.postMessage({ type: "INIT_DP_CALCULATION" })

        dpWorker.onmessage = (event) => {
          const { type, data } = event.data
          if (type === "DP_RESULT") {
            console.log("Differential Privacy calculation completed:", data)
          }
        }

        return () => dpWorker.terminate()
      } catch (error) {
        console.log("Web Worker not available in this environment")
      }
    }
  }, [])

  // Animated counter effect
  useEffect(() => {
    const animateCounter = (target: number, setter: (value: number) => void, duration = 2000) => {
      let start = 0
      const increment = target / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= target) {
          setter(target)
          clearInterval(timer)
        } else {
          setter(Math.floor(start))
        }
      }, 16)
    }

    animateCounter(globalAccuracy, setAnimatedAccuracy)
    animateCounter(currentRound, setAnimatedRound)
    animateCounter(updatesReceived, setAnimatedUpdates)
  }, [globalAccuracy, currentRound, updatesReceived])

  // Simulate live updates with enhanced animations
  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = {
        id: Date.now(),
        message: `Store ${String.fromCharCode(65 + Math.floor(Math.random() * 3))} heartbeat received`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "heartbeat",
      }
      setLogs((prev) => [newLog, ...prev.slice(0, 9)])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Sparkle particle effect
  const createSparkleParticles = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const newParticles = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }))

    setSparkleParticles((prev) => [...prev, ...newParticles])

    setTimeout(() => {
      setSparkleParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)))
    }, 1000)
  }

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

    // Trigger network pulse effect
    document.body.classList.add("knowledge-pulse-wave")
    setTimeout(() => document.body.classList.remove("knowledge-pulse-wave"), microInteractions.modelUpdate.duration)
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

    setTimeout(() => {
      setCurrentRound((prev) => prev + 1)
      setUpdatesReceived(0)
      setGlobalAccuracy((prev) => Math.min(prev + Math.floor(Math.random() * 3) + 1, 95))
      setIsTraining(false)
    }, 2000)
  }

  const resetSystem = () => {
    setCurrentRound(1)
    setUpdatesReceived(0)
    setGlobalAccuracy(65)
    setLogs(initialLogs)
    setPrivacyLensActive(false)
    setThreatDetected(false)
    setArScannerActive(false)
    setTrustBadgeUnlocked(false)
    setSpeedRunMode(false)
  }

  // Judge Activation Sequences
  const togglePrivacyLens = () => {
    setPrivacyLensActive(!privacyLensActive)
    if (!privacyLensActive) {
      const newLog = {
        id: Date.now(),
        message: "Privacy lens activated - Raw data dissolving into privacy-safe visualizations",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "privacy",
      }
      setLogs((prev) => [newLog, ...prev.slice(0, 9)])
    }
  }

  const injectGiftCardScam = () => {
    setThreatDetected(true)
    const newLog = {
      id: Date.now(),
      message: "🚨 Florida store #4587 detects new gift card scam pattern → Neural Galaxy pulses red",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "threat",
    }
    setLogs((prev) => [newLog, ...prev.slice(0, 9)])

    // Play soft alert chime (if audio is available)
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance("Threat detected")
      utterance.volume = 0.1
      utterance.rate = 2
      speechSynthesis.speak(utterance)
    }

    setTimeout(() => setThreatDetected(false), 5000)
  }

  const activateARScanner = () => {
    setArScannerActive(!arScannerActive)
    if (!arScannerActive) {
      const newLog = {
        id: Date.now(),
        message: "📱 AR Receipt Scanner activated - Physical receipt shows 92% fraud probability overlay",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "ar",
      }
      setLogs((prev) => [newLog, ...prev.slice(0, 9)])
      
      // Add scroll functionality
      setTimeout(() => {
        const arScannerElement = document.querySelector('.ar-scanner-component')
        if (arScannerElement) {
          arScannerElement.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100) // Small delay to ensure component is rendered
    }
  }

  const unlockTrustBadge = () => {
    setTrustBadgeUnlocked(true)
    const newLog = {
      id: Date.now(),
      message: "🏆 Store #3021 earns '100 Clean Days' trust shield badge",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "achievement",
    }
    setLogs((prev) => [newLog, ...prev.slice(0, 9)])
  }

  const activateSpeedRun = () => {
    setSpeedRunMode(true)
    const newLog = {
      id: Date.now(),
      message: "⚡ Speed-run mode activated - Compressing 10 rounds into 10 seconds",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "speedrun",
    }
    setLogs((prev) => [newLog, ...prev.slice(0, 9)])

    // Simulate rapid training rounds
    let rounds = 0
    const speedInterval = setInterval(() => {
      rounds++
      setCurrentRound((prev) => prev + 1)
      setGlobalAccuracy((prev) => Math.min(prev + 2, 95))

      if (rounds >= 10) {
        clearInterval(speedInterval)
        setSpeedRunMode(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Sparkle Particles */}
      {sparkleParticles.map((particle) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-50"
          style={{
            left: particle.x,
            top: particle.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Sparkles className="w-4 h-4 text-yellow-400 animate-ping" />
        </div>
      ))}

      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-20"></div>
        <div className="absolute top-32 right-20 w-3 h-3 bg-cyan-300 rounded-full animate-pulse opacity-30 animation-delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-blue-500 rounded-full animate-bounce opacity-25 animation-delay-2000"></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-20 animation-delay-3000"></div>
        <div className="absolute bottom-32 right-10 w-2 h-2 bg-blue-300 rounded-full animate-pulse opacity-30 animation-delay-4000"></div>
        <div className="absolute top-20 left-1/3 w-1 h-1 bg-cyan-500 rounded-full animate-bounce opacity-25 animation-delay-5000"></div>

        {/* Floating Geometric Shapes */}
        <div className="absolute top-16 right-1/4 w-8 h-8 border border-blue-300 rotate-45 animate-spin-slow opacity-10"></div>
        <div className="absolute bottom-24 left-1/5 w-6 h-6 border border-cyan-400 rounded-full animate-pulse opacity-15"></div>
        <div className="absolute top-1/3 left-10 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rotate-45 animate-float opacity-20"></div>
      </div>

      {/* Enhanced Header with Animated Background */}
      <header
        className={`sticky top-0 z-50 bg-gradient-to-r from-[#004b91] via-[#0056a3] to-[#004b91] text-white shadow-2xl backdrop-blur-sm relative overflow-hidden ${threatDetected ? "animate-pulse-red-3x" : ""}`}
      >
        {/* Animated Background Layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-blue-600/20 animate-pulse"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-xl flex items-center justify-center shadow-lg animate-float">
            <Shield className="w-6 h-6 text-[#9df9ef] animate-pulse" />
          </div>
          <div className="absolute top-8 right-20 w-16 h-16 bg-cyan-300/20 rounded-full animate-float-delayed"></div>
          <div className="absolute -bottom-2 left-1/3 w-20 h-20 bg-blue-300/15 rounded-full animate-float-slow"></div>

          {/* Moving Light Streaks */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-slide-right opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-blue-400 to-transparent animate-slide-left opacity-30"></div>
        </div>

        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#9df9ef] to-cyan-200 rounded-xl flex items-center justify-center shadow-lg animate-glow-pulse">
                    <Shield className="w-6 h-6 text-[#004b91] animate-pulse" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                  {trustBadgeUnlocked && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                      <Award className="w-3 h-3 text-yellow-800" />
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent animate-gradient-x">
                    Walmart Federated Fraud Detection
                  </h1>
                  <p className="text-blue-100 text-sm md:text-lg font-medium animate-slide-up-delayed">
                    AI Collaboration Without Data Sharing
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm animate-fade-in-up">
                  <Wifi className="w-4 h-4 text-green-400 animate-pulse" />
                  <span className="text-sm font-medium">Connected</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm animate-fade-in-up animation-delay-200">
                  <Globe className="w-4 h-4 text-blue-300" />
                  <span className="text-sm font-medium">3 Stores</span>
                </div>
                {speedRunMode && (
                  <div className="flex items-center space-x-2 bg-yellow-500/20 rounded-full px-4 py-2 backdrop-blur-sm animate-pulse">
                    <Timer className="w-4 h-4 text-yellow-300" />
                    <span className="text-sm font-medium">Speed Run</span>
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse animation-delay-200"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse animation-delay-400"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Judge Activation Panel */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-yellow-200 p-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-yellow-600" />
              <span className="font-semibold text-yellow-800">Judge Activation Sequences</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={togglePrivacyLens}
                variant={privacyLensActive ? "default" : "outline"}
                size="sm"
                className={`transition-all duration-300 ${privacyLensActive ? "bg-purple-600 hover:bg-purple-700" : "hover:bg-purple-50"}`}
              >
                <Lock className="w-4 h-4 mr-1" />
                Privacy Lens
              </Button>
              <Button
                onClick={injectGiftCardScam}
                variant="outline"
                size="sm"
                className="hover:bg-red-50 text-red-600 border-red-200 bg-transparent"
              >
                <AlertTriangle className="w-4 h-4 mr-1" />
                Gift Card Scam
              </Button>
              <Button
                onClick={activateARScanner}
                variant={arScannerActive ? "default" : "outline"}
                size="sm"
                className={`transition-all duration-300 ${arScannerActive ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-50"}`}
              >
                <Camera className="w-4 h-4 mr-1" />
                AR Scanner
              </Button>
              <Button
                onClick={unlockTrustBadge}
                variant="outline"
                size="sm"
                className="hover:bg-yellow-50 text-yellow-600 border-yellow-200 bg-transparent"
              >
                <Award className="w-4 h-4 mr-1" />
                Trust Badge
              </Button>
              <Button
                onClick={activateSpeedRun}
                variant="outline"
                size="sm"
                className="hover:bg-green-50 text-green-600 border-green-200 bg-transparent"
              >
                <Zap className="w-4 h-4 mr-1" />
                Speed Run
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Key Metrics with Enhanced Animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            className={`transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer relative overflow-hidden ${privacyLensActive ? "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200" : ""}`}
            onMouseEnter={createSparkleParticles}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 animate-pulse"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-lg font-semibold text-gray-700 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-600 animate-pulse" />
                Current Round
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-bold text-blue-600 animate-count-up">{animatedRound}</div>
              <p className="text-gray-600 mt-2">Training iterations</p>
              {privacyLensActive && (
                <div className="mt-2 text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">
                  ε-differential privacy: 0.1
                </div>
              )}
            </CardContent>
          </Card>

          <Card
            className={`transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer relative overflow-hidden ${threatDetected ? "bg-gradient-to-br from-red-50 to-red-100 border-red-200 animate-pulse-red" : ""}`}
            onMouseEnter={createSparkleParticles}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 animate-pulse"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-lg font-semibold text-gray-700 flex items-center">
                <Target className="w-5 h-5 mr-2 text-green-600 animate-pulse" />
                Global Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-bold text-green-600 animate-count-up">{animatedAccuracy}%</div>
              <p className="text-gray-600 mt-2">Fraud detection rate</p>
              {threatDetected && (
                <div className="mt-2 text-xs text-red-600 bg-red-100 px-2 py-1 rounded animate-pulse">
                  🚨 New threat pattern detected
                </div>
              )}
            </CardContent>
          </Card>

          <Card
            className="transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer relative overflow-hidden"
            onMouseEnter={createSparkleParticles}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 animate-pulse"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-lg font-semibold text-gray-700 flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-600 animate-pulse" />
                Store Updates
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-bold text-purple-600 animate-count-up">{animatedUpdates}/3</div>
              <p className="text-gray-600 mt-2">Received this round</p>
              <div className="flex space-x-1 mt-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-500 ${i <= updatesReceived ? "bg-purple-500 animate-pulse" : "bg-gray-200"}`}
                  ></div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="transition-all duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Federated Learning Progress
              </CardTitle>
              <CardDescription>Model accuracy improvement over training rounds</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={accuracyData}>
                  <defs>
                    <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="round" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f9fafb",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fill="url(#accuracyGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieIcon className="w-5 h-5 mr-2 text-green-600" />
                Transaction Classification
              </CardTitle>
              <CardDescription>Real-time fraud detection results</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1000}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="flex justify-center space-x-6 mt-4">
                {pieData.map((entry) => (
                  <div key={entry.name} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                    <span className="text-sm font-medium">{entry.name}</span>
                    <span className="text-sm text-gray-600">{entry.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Control Panel */}
        <Card className="transition-all duration-300 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-blue-600" />
              Federated Training Control
            </CardTitle>
            <CardDescription>Manage the collaborative learning process across all stores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={simulateStoreUpdate}
                className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:scale-105"
                disabled={isTraining}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Simulate Store Update
              </Button>
              <Button
                onClick={startTrainingRound}
                className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 hover:scale-105"
                disabled={isTraining || updatesReceived < 3}
              >
                {isTraining ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Training...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Training Round
                  </>
                )}
              </Button>
              <Button
                onClick={resetSystem}
                variant="outline"
                className="transition-all duration-300 hover:scale-105 bg-transparent"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset System
              </Button>
            </div>
            {updatesReceived < 3 && !isTraining && (
              <p className="text-sm text-gray-600 mt-4">
                Waiting for {3 - updatesReceived} more store update(s) before starting the next training round.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Enhanced Activity Log */}
        <Card className="transition-all duration-300 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-gray-600" />
              System Activity Log
            </CardTitle>
            <CardDescription>Real-time updates from the federated learning network</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-300 hover:scale-102 ${
                      log.type === "threat"
                        ? "bg-red-50 border border-red-200 animate-pulse-red"
                        : log.type === "privacy"
                          ? "bg-purple-50 border border-purple-200"
                          : log.type === "ar"
                            ? "bg-blue-50 border border-blue-200"
                            : log.type === "achievement"
                              ? "bg-yellow-50 border border-yellow-200"
                              : log.type === "speedrun"
                                ? "bg-green-50 border border-green-200"
                                : "bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 animate-pulse ${
                        log.type === "update"
                          ? "bg-blue-500"
                          : log.type === "round"
                            ? "bg-green-500"
                            : log.type === "threat"
                              ? "bg-red-500"
                              : log.type === "privacy"
                                ? "bg-purple-500"
                                : log.type === "ar"
                                  ? "bg-blue-500"
                                  : log.type === "achievement"
                                    ? "bg-yellow-500"
                                    : log.type === "speedrun"
                                      ? "bg-green-500"
                                      : "bg-gray-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{log.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{log.timestamp}</p>
                    </div>
                    {log.type === "threat" && <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />}
                    {log.type === "privacy" && <Lock className="w-4 h-4 text-purple-500" />}
                    {log.type === "ar" && <Camera className="w-4 h-4 text-blue-500" />}
                    {log.type === "achievement" && <Award className="w-4 h-4 text-yellow-500" />}
                    {log.type === "speedrun" && <Zap className="w-4 h-4 text-green-500" />}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* AR Scanner Component */}
        {arScannerActive && (
          <Card className="border-blue-200 bg-blue-50 ar-scanner-component">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <Camera className="w-5 h-5 mr-2" />
                AR Receipt Scanner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense
                fallback={
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    Loading AR Scanner...
                  </div>
                }
              >
                <ARScanner />
              </Suspense>
            </CardContent>
          </Card>
        )}

        {/* 3D Fraud Galaxy Component */}
        <Card className="transition-all duration-300 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
              3D Fraud Detection Galaxy
            </CardTitle>
            <CardDescription>Interactive visualization of fraud patterns across the network</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense
              fallback={
                <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">Loading 3D Galaxy...</div>
              }
            >
              <FraudGalaxy threatDetected={threatDetected} privacyLensActive={privacyLensActive} />
            </Suspense>
          </CardContent>
        </Card>

        {/* Privacy Compliance Status */}
        <Card className="transition-all duration-300 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="w-5 h-5 mr-2 text-green-600" />
              Privacy Compliance Status
            </CardTitle>
            <CardDescription>Ensuring data protection throughout the federated learning process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold text-green-800">GDPR Compliant</p>
                  <p className="text-sm text-green-600">Data minimization active</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Shield className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-blue-800">Differential Privacy</p>
                  <p className="text-sm text-blue-600">ε = 0.1 noise applied</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <Eye className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="font-semibold text-purple-800">Zero Data Sharing</p>
                  <p className="text-sm text-purple-600">Only model updates shared</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [darkMode, setDarkMode] = useState(false)

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardComponent />
      case "stores":
        return <StoresManagement />
      case "analytics":
        return <Analytics />
      case "alerts":
        return <FraudAlerts />
      case "models":
        return <ModelManagement />
      case "settings":
        return <Settings />
      case "adversarial-arena":
        return <AdversarialArena />
      case "galaxy":
        return <FederatedGalaxy />
      case "privacy-dna":
        return <PrivacyDNA />
      case "war-room":
        return <WarRoomDashboard />
      case "blockchain":
        return <BlockchainAuditTrail />
      case "storyteller":
        return <GPTStoryteller />
      case "fairness":
        return <BiasCockpit />
      default:
        return <DashboardComponent />
    }
  }

  return (
    <NotificationProvider>
      <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
        <Sidebar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <div className="ml-64 transition-all duration-300">{renderPage()}</div>
      </div>
    </NotificationProvider>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Store,
  BarChart3,
  AlertTriangle,
  Brain,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Globe,
  Sparkles,
  Dna,
  Radar,
  Link,
  MessageSquare,
  Scale,
  Swords,
} from "lucide-react"

interface SidebarProps {
  currentPage: string
  setCurrentPage: (page: string) => void
  darkMode: boolean
  setDarkMode: (dark: boolean) => void
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, category: "core" },
  { id: "stores", label: "Stores", icon: Store, category: "core" },
  { id: "analytics", label: "Analytics", icon: BarChart3, category: "core" },
  { id: "alerts", label: "Fraud Alerts", icon: AlertTriangle, category: "core" },
  { id: "models", label: "AI Models", icon: Brain, category: "core" },
  { id: "settings", label: "Settings", icon: Settings, category: "core" },
]

const advancedFeatures = [
  { id: "adversarial-arena", label: "Adversarial Arena", icon: Swords, category: "advanced" },
  { id: "galaxy", label: "3D Galaxy", icon: Sparkles, category: "advanced" },
  { id: "privacy-dna", label: "Privacy DNA", icon: Dna, category: "advanced" },
  { id: "war-room", label: "War Room", icon: Radar, category: "advanced" },
  { id: "blockchain", label: "Blockchain", icon: Link, category: "advanced" },
  { id: "storyteller", label: "AI Stories", icon: MessageSquare, category: "advanced" },
  { id: "fairness", label: "Fairness", icon: Scale, category: "advanced" },
]

export function Sidebar({ currentPage, setCurrentPage, darkMode, setDarkMode }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-gradient-to-b from-[#004b91] to-[#003875] text-white shadow-2xl transition-all duration-300 z-50 ${collapsed ? "w-16" : "w-64"}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-blue-400/20">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#9df9ef] to-cyan-200 rounded-xl flex items-center justify-center shadow-lg animate-glow">
                <Shield className="w-5 h-5 text-[#004b91]" />
              </div>
              <div>
                <h1 className="text-lg font-bold">Walmart FL</h1>
                <p className="text-xs text-blue-200">Enterprise Hub</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="text-white hover:bg-white/10"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Status Indicators */}
      {!collapsed && (
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between bg-white/10 rounded-lg p-2 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <Wifi className="w-4 h-4 text-green-400 animate-pulse" />
              <span className="text-sm">Connected</span>
            </div>
            <Badge variant="secondary" className="bg-green-500/20 text-green-300 text-xs">
              Live
            </Badge>
          </div>
          <div className="flex items-center justify-between bg-white/10 rounded-lg p-2 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-blue-300" />
              <span className="text-sm">3 Stores</span>
            </div>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6">
        {/* Core Features */}
        <div>
          {!collapsed && (
            <h3 className="text-xs font-semibold text-blue-200 mb-3 uppercase tracking-wider">Core Features</h3>
          )}
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              return (
                <li key={item.id}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left transition-all duration-200 ${
                      isActive ? "bg-white/20 text-white shadow-lg" : "text-blue-100 hover:bg-white/10 hover:text-white"
                    } ${collapsed ? "px-2" : "px-4"}`}
                    onClick={() => setCurrentPage(item.id)}
                  >
                    <Icon className={`${collapsed ? "w-5 h-5" : "w-5 h-5 mr-3"}`} />
                    {!collapsed && <span>{item.label}</span>}
                    {isActive && !collapsed && (
                      <div className="ml-auto w-2 h-2 bg-[#9df9ef] rounded-full animate-pulse"></div>
                    )}
                  </Button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Advanced Features */}
        <div>
          {!collapsed && (
            <h3 className="text-xs font-semibold text-yellow-200 mb-3 uppercase tracking-wider flex items-center">
              <Sparkles className="w-3 h-3 mr-1" />
              Enterprise Features
            </h3>
          )}
          <ul className="space-y-2">
            {advancedFeatures.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              return (
                <li key={item.id}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left transition-all duration-200 ${
                      isActive
                        ? "bg-yellow-400/20 text-yellow-100 shadow-lg"
                        : "text-yellow-200 hover:bg-yellow-400/10 hover:text-yellow-100"
                    } ${collapsed ? "px-2" : "px-4"}`}
                    onClick={() => setCurrentPage(item.id)}
                  >
                    <Icon className={`${collapsed ? "w-5 h-5" : "w-5 h-5 mr-3"}`} />
                    {!collapsed && <span>{item.label}</span>}
                    {isActive && !collapsed && (
                      <div className="ml-auto w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    )}
                  </Button>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      {/* Dark Mode Toggle */}
      {!collapsed && (
        <div className="p-4 border-t border-blue-400/20">
          <div className="flex items-center justify-between bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <span className="text-sm font-medium">Dark Mode</span>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} className="data-[state=checked]:bg-[#9df9ef]" />
          </div>
        </div>
      )}

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 text-center">
          <p className="text-xs text-blue-200">Hackathon 2025</p>
          <p className="text-xs text-blue-300 font-medium">Enterprise AI Team</p>
        </div>
      )}
    </div>
  )
}

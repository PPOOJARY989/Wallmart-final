"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Store,
  Wifi,
  WifiOff,
  Activity,
  TrendingUp,
  Search,
  Filter,
  Download,
  RefreshCw,
  MapPin,
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const storesData = [
  {
    id: "store-001",
    name: "Walmart Supercenter #1",
    location: "Dallas, TX",
    status: "online",
    lastUpdate: "2 min ago",
    accuracy: 82,
    fraudDetected: 15,
    totalTransactions: 1250,
    modelVersion: "v2.1.3",
    uptime: "99.8%",
    latency: "45ms",
    dataPoints: [
      { time: "00:00", accuracy: 78, transactions: 120 },
      { time: "04:00", accuracy: 80, transactions: 95 },
      { time: "08:00", accuracy: 82, transactions: 180 },
      { time: "12:00", accuracy: 81, transactions: 220 },
      { time: "16:00", accuracy: 83, transactions: 195 },
      { time: "20:00", accuracy: 82, transactions: 160 },
    ],
  },
  {
    id: "store-002",
    name: "Walmart Supercenter #2",
    location: "Houston, TX",
    status: "online",
    lastUpdate: "1 min ago",
    accuracy: 79,
    fraudDetected: 12,
    totalTransactions: 980,
    modelVersion: "v2.1.3",
    uptime: "99.5%",
    latency: "52ms",
    dataPoints: [
      { time: "00:00", accuracy: 75, transactions: 100 },
      { time: "04:00", accuracy: 77, transactions: 85 },
      { time: "08:00", accuracy: 79, transactions: 150 },
      { time: "12:00", accuracy: 78, transactions: 190 },
      { time: "16:00", accuracy: 80, transactions: 175 },
      { time: "20:00", accuracy: 79, transactions: 140 },
    ],
  },
  {
    id: "store-003",
    name: "Walmart Supercenter #3",
    location: "Austin, TX",
    status: "maintenance",
    lastUpdate: "15 min ago",
    accuracy: 76,
    fraudDetected: 8,
    totalTransactions: 750,
    modelVersion: "v2.1.2",
    uptime: "98.2%",
    latency: "68ms",
    dataPoints: [
      { time: "00:00", accuracy: 72, transactions: 80 },
      { time: "04:00", accuracy: 74, transactions: 70 },
      { time: "08:00", accuracy: 76, transactions: 120 },
      { time: "12:00", accuracy: 75, transactions: 150 },
      { time: "16:00", accuracy: 77, transactions: 130 },
      { time: "20:00", accuracy: 76, transactions: 110 },
    ],
  },
]

export function StoresManagement() {
  const [selectedStore, setSelectedStore] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredStores = storesData.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || store.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <Wifi className="w-4 h-4 text-green-500" />
      case "offline":
        return <WifiOff className="w-4 h-4 text-red-500" />
      case "maintenance":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      default:
        return <Wifi className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Online</Badge>
      case "offline":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Offline</Badge>
      case "maintenance":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Maintenance</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Unknown</Badge>
    }
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Stores Management</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Monitor and manage federated learning across all store locations
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </Button>
          <Button className="bg-[#004b91] hover:bg-blue-700 flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh All</span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search stores by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stores</SelectItem>
            <SelectItem value="online">Online</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Online Stores</p>
                <p className="text-3xl font-bold text-green-900">
                  {storesData.filter((s) => s.status === "online").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Avg Accuracy</p>
                <p className="text-3xl font-bold text-blue-900">
                  {Math.round(storesData.reduce((acc, store) => acc + store.accuracy, 0) / storesData.length)}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Total Transactions</p>
                <p className="text-3xl font-bold text-purple-900">
                  {storesData.reduce((acc, store) => acc + store.totalTransactions, 0).toLocaleString()}
                </p>
              </div>
              <Activity className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Fraud Detected</p>
                <p className="text-3xl font-bold text-red-900">
                  {storesData.reduce((acc, store) => acc + store.fraudDetected, 0)}
                </p>
              </div>
              <Shield className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStores.map((store) => (
          <Card
            key={store.id}
            className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => setSelectedStore(selectedStore === store.id ? null : store.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#9df9ef] to-cyan-200 rounded-lg flex items-center justify-center">
                    <Store className="w-5 h-5 text-[#004b91]" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{store.name}</CardTitle>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      {store.location}
                    </div>
                  </div>
                </div>
                {getStatusBadge(store.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{store.accuracy}%</p>
                  <p className="text-xs text-gray-500">Accuracy</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{store.fraudDetected}</p>
                  <p className="text-xs text-gray-500">Fraud Cases</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(store.status)}
                  <span className="text-gray-600 dark:text-gray-300">Last update: {store.lastUpdate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-500">{store.uptime}</span>
                </div>
              </div>

              {selectedStore === store.id && (
                <div className="mt-4 space-y-4 border-t pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Model Version</p>
                      <p className="font-medium">{store.modelVersion}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Latency</p>
                      <p className="font-medium">{store.latency}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">24h Performance</p>
                    <ResponsiveContainer width="100%" height={120}>
                      <LineChart data={store.dataPoints}>
                        <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                        <YAxis hide />
                        <Tooltip />
                        <Line type="monotone" dataKey="accuracy" stroke="#004b91" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Store Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Store Performance Comparison</CardTitle>
          <CardDescription>Compare accuracy and transaction volume across all stores</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={storesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="accuracy" fill="#004b91" name="Accuracy %" />
              <Bar dataKey="fraudDetected" fill="#ef4444" name="Fraud Cases" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

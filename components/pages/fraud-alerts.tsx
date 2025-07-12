"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  AlertTriangle,
  Shield,
  Eye,
  Clock,
  MapPin,
  CreditCard,
  User,
  Search,
  Filter,
  Download,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { useNotifications } from "@/components/notification-provider"

interface FraudAlert {
  id: string
  type: "high" | "medium" | "low"
  category: "fake_receipt" | "card_fraud" | "identity_theft" | "phishing"
  store: string
  location: string
  timestamp: string
  amount: number
  status: "active" | "investigating" | "resolved" | "false_positive"
  confidence: number
  description: string
  customerInfo: {
    id: string
    name: string
    email: string
  }
  transactionDetails: {
    id: string
    method: string
    items: string[]
  }
}

const mockAlerts: FraudAlert[] = [
  {
    id: "alert-001",
    type: "high",
    category: "fake_receipt",
    store: "Store A",
    location: "Dallas, TX",
    timestamp: "2 min ago",
    amount: 299.99,
    status: "active",
    confidence: 94,
    description: "Suspicious receipt pattern detected with altered pricing",
    customerInfo: {
      id: "CUST-001",
      name: "John D.",
      email: "j***@email.com",
    },
    transactionDetails: {
      id: "TXN-12345",
      method: "Credit Card",
      items: ["Electronics", "Gift Cards"],
    },
  },
  {
    id: "alert-002",
    type: "medium",
    category: "card_fraud",
    store: "Store B",
    location: "Houston, TX",
    timestamp: "5 min ago",
    amount: 156.78,
    status: "investigating",
    confidence: 78,
    description: "Unusual spending pattern detected on payment card",
    customerInfo: {
      id: "CUST-002",
      name: "Sarah M.",
      email: "s***@email.com",
    },
    transactionDetails: {
      id: "TXN-12346",
      method: "Debit Card",
      items: ["Groceries", "Pharmacy"],
    },
  },
  {
    id: "alert-003",
    type: "low",
    category: "identity_theft",
    store: "Store C",
    location: "Austin, TX",
    timestamp: "12 min ago",
    amount: 89.45,
    status: "resolved",
    confidence: 65,
    description: "Potential identity verification mismatch",
    customerInfo: {
      id: "CUST-003",
      name: "Mike R.",
      email: "m***@email.com",
    },
    transactionDetails: {
      id: "TXN-12347",
      method: "Cash",
      items: ["Clothing", "Accessories"],
    },
  },
]

export function FraudAlerts() {
  const [alerts, setAlerts] = useState<FraudAlert[]>(mockAlerts)
  const [selectedAlert, setSelectedAlert] = useState<FraudAlert | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const { addNotification } = useNotifications()

  // Simulate new alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const newAlert: FraudAlert = {
        id: `alert-${Date.now()}`,
        type: ["high", "medium", "low"][Math.floor(Math.random() * 3)] as "high" | "medium" | "low",
        category: ["fake_receipt", "card_fraud", "identity_theft", "phishing"][Math.floor(Math.random() * 4)] as any,
        store: `Store ${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`,
        location: ["Dallas, TX", "Houston, TX", "Austin, TX"][Math.floor(Math.random() * 3)],
        timestamp: "Just now",
        amount: Math.floor(Math.random() * 500) + 50,
        status: "active",
        confidence: Math.floor(Math.random() * 30) + 70,
        description: "New suspicious activity detected",
        customerInfo: {
          id: `CUST-${Math.floor(Math.random() * 1000)}`,
          name: "Anonymous",
          email: "***@email.com",
        },
        transactionDetails: {
          id: `TXN-${Math.floor(Math.random() * 10000)}`,
          method: ["Credit Card", "Debit Card", "Cash"][Math.floor(Math.random() * 3)],
          items: ["Various Items"],
        },
      }

      setAlerts((prev) => [newAlert, ...prev.slice(0, 19)])

      addNotification({
        type: newAlert.type === "high" ? "error" : newAlert.type === "medium" ? "warning" : "info",
        title: "New Fraud Alert",
        message: `${newAlert.type.toUpperCase()} priority alert detected at ${newAlert.store}`,
      })
    }, 20000)

    return () => clearInterval(interval)
  }, [addNotification])

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter
    const matchesType = typeFilter === "all" || alert.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-800 border-red-200"
      case "investigating":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200"
      case "false_positive":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "fake_receipt":
        return <AlertTriangle className="w-4 h-4" />
      case "card_fraud":
        return <CreditCard className="w-4 h-4" />
      case "identity_theft":
        return <User className="w-4 h-4" />
      case "phishing":
        return <Shield className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const updateAlertStatus = (alertId: string, newStatus: FraudAlert["status"]) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, status: newStatus } : alert)))

    addNotification({
      type: "success",
      title: "Alert Updated",
      message: `Alert status changed to ${newStatus.replace("_", " ")}`,
    })
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Fraud Alerts</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Real-time fraud detection alerts and case management</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
            <Download className="w-4 h-4" />
            <span>Export Alerts</span>
          </Button>
          <Button className="bg-[#004b91] hover:bg-blue-700 flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>View Dashboard</span>
          </Button>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">High Priority</p>
                <p className="text-3xl font-bold text-red-900">{alerts.filter((a) => a.type === "high").length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Medium Priority</p>
                <p className="text-3xl font-bold text-yellow-900">{alerts.filter((a) => a.type === "medium").length}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Resolved</p>
                <p className="text-3xl font-bold text-green-900">
                  {alerts.filter((a) => a.status === "resolved").length}
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
                <p className="text-sm font-medium text-blue-600">Total Blocked</p>
                <p className="text-3xl font-bold text-blue-900">
                  ${alerts.reduce((sum, alert) => sum + alert.amount, 0).toLocaleString()}
                </p>
              </div>
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search alerts by store, location, or description..."
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
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="investigating">Investigating</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="false_positive">False Positive</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="low">Low Priority</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Alerts List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts ({filteredAlerts.length})</CardTitle>
              <CardDescription>Latest fraud detection alerts from all stores</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                <div className="space-y-2 p-4">
                  {filteredAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedAlert?.id === alert.id
                          ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "bg-white dark:bg-gray-800"
                      }`}
                      onClick={() => setSelectedAlert(alert)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="mt-1">{getCategoryIcon(alert.category)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge className={getAlertTypeColor(alert.type)}>{alert.type.toUpperCase()}</Badge>
                              <Badge className={getStatusColor(alert.status)}>
                                {alert.status.replace("_", " ").toUpperCase()}
                              </Badge>
                              <span className="text-sm text-gray-500">{alert.confidence}% confidence</span>
                            </div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{alert.description}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-3 h-3" />
                                <span>
                                  {alert.store} - {alert.location}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{alert.timestamp}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900 dark:text-white">${alert.amount.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Alert Details */}
        <div className="lg:col-span-1">
          {selectedAlert ? (
            <Card>
              <CardHeader>
                <CardTitle>Alert Details</CardTitle>
                <CardDescription>Detailed information about the selected alert</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Alert Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Alert ID:</span>
                      <span className="font-mono">{selectedAlert.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Priority:</span>
                      <Badge className={getAlertTypeColor(selectedAlert.type)}>
                        {selectedAlert.type.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Category:</span>
                      <span>{selectedAlert.category.replace("_", " ")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Confidence:</span>
                      <span>{selectedAlert.confidence}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Store Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Store:</span>
                      <span>{selectedAlert.store}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Location:</span>
                      <span>{selectedAlert.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Timestamp:</span>
                      <span>{selectedAlert.timestamp}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Transaction Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Transaction ID:</span>
                      <span className="font-mono">{selectedAlert.transactionDetails.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Amount:</span>
                      <span className="font-bold">${selectedAlert.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Payment Method:</span>
                      <span>{selectedAlert.transactionDetails.method}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Items:</span>
                      <div className="mt-1">
                        {selectedAlert.transactionDetails.items.map((item, index) => (
                          <Badge key={index} variant="outline" className="mr-1 mb-1">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Customer Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Customer ID:</span>
                      <span className="font-mono">{selectedAlert.customerInfo.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Name:</span>
                      <span>{selectedAlert.customerInfo.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email:</span>
                      <span>{selectedAlert.customerInfo.email}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Actions</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateAlertStatus(selectedAlert.id, "investigating")}
                      disabled={selectedAlert.status === "investigating"}
                    >
                      Investigate
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateAlertStatus(selectedAlert.id, "resolved")}
                      disabled={selectedAlert.status === "resolved"}
                    >
                      Resolve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateAlertStatus(selectedAlert.id, "false_positive")}
                      disabled={selectedAlert.status === "false_positive"}
                    >
                      False Positive
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateAlertStatus(selectedAlert.id, "active")}
                      disabled={selectedAlert.status === "active"}
                    >
                      Reactivate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Select an Alert</h3>
                <p className="text-gray-500">
                  Click on an alert from the list to view detailed information and take actions.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

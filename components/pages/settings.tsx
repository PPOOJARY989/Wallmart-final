"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  SettingsIcon,
  Shield,
  Bell,
  Users,
  Database,
  Lock,
  Eye,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Globe,
  Zap,
  Brain,
  Clock,
} from "lucide-react"
import { useNotifications } from "@/components/notification-provider"

export function Settings() {
  const [settings, setSettings] = useState({
    // General Settings
    systemName: "Walmart Federated Fraud Detection",
    description: "AI-powered fraud detection with privacy preservation",
    timezone: "America/Chicago",
    language: "en-US",

    // Privacy Settings
    dataRetention: 90,
    anonymization: true,
    encryptionLevel: "AES-256",
    privacyCompliance: true,

    // Training Settings
    trainingFrequency: "daily",
    minParticipants: 2,
    maxRounds: 20,
    convergenceThreshold: 0.01,
    learningRate: 0.001,

    // Alert Settings
    alertThreshold: 80,
    emailNotifications: true,
    smsNotifications: false,
    slackIntegration: true,

    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: 30,
    ipWhitelist: true,
    auditLogging: true,
  })

  const [users] = useState([
    { id: 1, name: "John Smith", email: "john@walmart.com", role: "Admin", status: "Active", lastLogin: "2 hours ago" },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@walmart.com",
      role: "Analyst",
      status: "Active",
      lastLogin: "1 day ago",
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike@walmart.com",
      role: "Viewer",
      status: "Inactive",
      lastLogin: "1 week ago",
    },
  ])

  const { addNotification } = useNotifications()

  const handleSave = (section: string) => {
    addNotification({
      type: "success",
      title: "Settings Saved",
      message: `${section} settings have been updated successfully`,
    })
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Configure system settings, privacy controls, and user management
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
            <RefreshCw className="w-4 h-4" />
            <span>Reset to Defaults</span>
          </Button>
          <Button className="bg-[#004b91] hover:bg-blue-700 flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save All Changes</span>
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <SettingsIcon className="w-5 h-5" />
                  <span>System Configuration</span>
                </CardTitle>
                <CardDescription>Basic system settings and configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="systemName">System Name</Label>
                  <Input
                    id="systemName"
                    value={settings.systemName}
                    onChange={(e) => handleSettingChange("systemName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={settings.description}
                    onChange={(e) => handleSettingChange("description", e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => handleSettingChange("timezone", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es-ES">Spanish</SelectItem>
                      <SelectItem value="fr-FR">French</SelectItem>
                      <SelectItem value="de-DE">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={() => handleSave("General")} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save General Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>System Status</span>
                </CardTitle>
                <CardDescription>Current system health and status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-semibold text-green-800 dark:text-green-300">System Health</span>
                    </div>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">Excellent</p>
                    <p className="text-sm text-green-700 dark:text-green-400">All systems operational</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center space-x-2 mb-2">
                      <Database className="w-5 h-5 text-blue-500" />
                      <span className="font-semibold text-blue-800 dark:text-blue-300">Storage Usage</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">2.4 GB</p>
                    <p className="text-sm text-blue-700 dark:text-blue-400">of 10 GB used</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">API Response Time</span>
                    <Badge className="bg-green-100 text-green-800">45ms</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Uptime</span>
                    <Badge className="bg-green-100 text-green-800">99.9%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Active Connections</span>
                    <Badge className="bg-blue-100 text-blue-800">3/3</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Last Backup</span>
                    <Badge className="bg-gray-100 text-gray-800">2 hours ago</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Privacy Controls</span>
                </CardTitle>
                <CardDescription>Configure data privacy and protection settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Data Anonymization</Label>
                    <p className="text-sm text-gray-500">Automatically anonymize sensitive data</p>
                  </div>
                  <Switch
                    checked={settings.anonymization}
                    onCheckedChange={(checked) => handleSettingChange("anonymization", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Privacy Compliance</Label>
                    <p className="text-sm text-gray-500">Enable GDPR/CCPA compliance features</p>
                  </div>
                  <Switch
                    checked={settings.privacyCompliance}
                    onCheckedChange={(checked) => handleSettingChange("privacyCompliance", checked)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataRetention">Data Retention (days)</Label>
                  <Input
                    id="dataRetention"
                    type="number"
                    value={settings.dataRetention}
                    onChange={(e) => handleSettingChange("dataRetention", Number.parseInt(e.target.value))}
                  />
                  <p className="text-sm text-gray-500">How long to retain training data</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="encryptionLevel">Encryption Level</Label>
                  <Select
                    value={settings.encryptionLevel}
                    onValueChange={(value) => handleSettingChange("encryptionLevel", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AES-128">AES-128</SelectItem>
                      <SelectItem value="AES-256">AES-256</SelectItem>
                      <SelectItem value="RSA-2048">RSA-2048</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={() => handleSave("Privacy")} className="w-full">
                  <Shield className="w-4 h-4 mr-2" />
                  Save Privacy Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="w-5 h-5" />
                  <span>Data Protection Status</span>
                </CardTitle>
                <CardDescription>Current privacy and security status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-medium">End-to-End Encryption</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-medium">Data Anonymization</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-medium">GDPR Compliance</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Eye className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">Audit Trail</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Logging</Badge>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold text-yellow-800 dark:text-yellow-300">Privacy Notice</span>
                  </div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    All federated learning operations maintain complete data privacy. Raw data never leaves individual
                    stores.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5" />
                  <span>Training Configuration</span>
                </CardTitle>
                <CardDescription>Configure federated learning parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="trainingFrequency">Training Frequency</Label>
                  <Select
                    value={settings.trainingFrequency}
                    onValueChange={(value) => handleSettingChange("trainingFrequency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minParticipants">Minimum Participants</Label>
                  <Input
                    id="minParticipants"
                    type="number"
                    value={settings.minParticipants}
                    onChange={(e) => handleSettingChange("minParticipants", Number.parseInt(e.target.value))}
                  />
                  <p className="text-sm text-gray-500">Minimum stores required for training</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxRounds">Maximum Training Rounds</Label>
                  <Input
                    id="maxRounds"
                    type="number"
                    value={settings.maxRounds}
                    onChange={(e) => handleSettingChange("maxRounds", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="learningRate">Learning Rate</Label>
                  <Input
                    id="learningRate"
                    type="number"
                    step="0.0001"
                    value={settings.learningRate}
                    onChange={(e) => handleSettingChange("learningRate", Number.parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="convergenceThreshold">Convergence Threshold</Label>
                  <Input
                    id="convergenceThreshold"
                    type="number"
                    step="0.001"
                    value={settings.convergenceThreshold}
                    onChange={(e) => handleSettingChange("convergenceThreshold", Number.parseFloat(e.target.value))}
                  />
                </div>
                <Button onClick={() => handleSave("Training")} className="w-full">
                  <Brain className="w-4 h-4 mr-2" />
                  Save Training Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Performance Optimization</span>
                </CardTitle>
                <CardDescription>Advanced training optimization settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Current Performance</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-blue-600 dark:text-blue-400">Avg Training Time</p>
                        <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">2.1 min</p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-600 dark:text-blue-400">Model Accuracy</p>
                        <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">82.3%</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Auto-scaling</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Early Stopping</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Adaptive Learning Rate</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Model Compression</span>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Alert Configuration</span>
                </CardTitle>
                <CardDescription>Configure fraud detection alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="alertThreshold">Alert Threshold (%)</Label>
                  <Input
                    id="alertThreshold"
                    type="number"
                    value={settings.alertThreshold}
                    onChange={(e) => handleSettingChange("alertThreshold", Number.parseInt(e.target.value))}
                  />
                  <p className="text-sm text-gray-500">Minimum confidence level to trigger alerts</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-500">Send alerts via email</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-gray-500">Send critical alerts via SMS</p>
                    </div>
                    <Switch
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Slack Integration</Label>
                      <p className="text-sm text-gray-500">Post alerts to Slack channels</p>
                    </div>
                    <Switch
                      checked={settings.slackIntegration}
                      onCheckedChange={(checked) => handleSettingChange("slackIntegration", checked)}
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave("Alerts")} className="w-full">
                  <Bell className="w-4 h-4 mr-2" />
                  Save Alert Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Alert Types</span>
                </CardTitle>
                <CardDescription>Configure different types of fraud alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">High Priority Alerts</span>
                      <Badge className="bg-red-100 text-red-800">Critical</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Confidence &gt; 90%, Immediate notification</p>
                    <div className="flex space-x-2">
                      <Badge variant="outline">Email</Badge>
                      <Badge variant="outline">SMS</Badge>
                      <Badge variant="outline">Slack</Badge>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Medium Priority Alerts</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Confidence 70-90%, Standard notification</p>
                    <div className="flex space-x-2">
                      <Badge variant="outline">Email</Badge>
                      <Badge variant="outline">Slack</Badge>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Low Priority Alerts</span>
                      <Badge className="bg-blue-100 text-blue-800">Info</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Confidence 50-70%, Log only</p>
                    <div className="flex space-x-2">
                      <Badge variant="outline">Dashboard</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="w-5 h-5" />
                  <span>Security Settings</span>
                </CardTitle>
                <CardDescription>Configure authentication and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Require 2FA for all users</p>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>IP Whitelist</Label>
                    <p className="text-sm text-gray-500">Restrict access to approved IPs</p>
                  </div>
                  <Switch
                    checked={settings.ipWhitelist}
                    onCheckedChange={(checked) => handleSettingChange("ipWhitelist", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Audit Logging</Label>
                    <p className="text-sm text-gray-500">Log all user activities</p>
                  </div>
                  <Switch
                    checked={settings.auditLogging}
                    onCheckedChange={(checked) => handleSettingChange("auditLogging", checked)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange("sessionTimeout", Number.parseInt(e.target.value))}
                  />
                </div>
                <Button onClick={() => handleSave("Security")} className="w-full">
                  <Lock className="w-4 h-4 mr-2" />
                  Save Security Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Security Status</span>
                </CardTitle>
                <CardDescription>Current security posture and recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-medium">SSL/TLS Encryption</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Secure</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-medium">API Authentication</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      <span className="font-medium">Password Policy</span>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Review</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-medium">Access Controls</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Configured</Badge>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Security Score</h4>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                    <span className="text-sm font-bold text-blue-800 dark:text-blue-300">85/100</span>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-2">Good security posture</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>User Management</span>
                    </div>
                    <Button size="sm" className="bg-[#004b91] hover:bg-blue-700">
                      Add User
                    </Button>
                  </CardTitle>
                  <CardDescription>Manage system users and their permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <h4 className="font-semibold">{user.name}</h4>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <p className="text-xs text-gray-400">Last login: {user.lastLogin}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge
                            className={
                              user.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }
                          >
                            {user.status}
                          </Badge>
                          <Badge variant="outline">{user.role}</Badge>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>User Activity</span>
                  </CardTitle>
                  <CardDescription>Recent user activities and sessions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm">John Smith</span>
                        <span className="text-xs text-gray-500">2h ago</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Logged in from Dallas office</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm">Sarah Johnson</span>
                        <span className="text-xs text-gray-500">1d ago</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Updated alert settings</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm">Mike Davis</span>
                        <span className="text-xs text-gray-500">1w ago</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Exported fraud report</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-3">Role Distribution</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Admin</span>
                        <Badge className="bg-red-100 text-red-800">1</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Analyst</span>
                        <Badge className="bg-blue-100 text-blue-800">1</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Viewer</span>
                        <Badge className="bg-gray-100 text-gray-800">1</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

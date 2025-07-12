"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react"

interface Notification {
  id: string
  type: "success" | "warning" | "info" | "error"
  title: string
  message: string
  duration?: number
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id">) => void
  removeNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider")
  }
  return context
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification = { ...notification, id }
    setNotifications((prev) => [...prev, newNotification])

    // Auto remove after duration
    setTimeout(() => {
      removeNotification(id)
    }, notification.duration || 5000)
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const notifications = [
        {
          type: "info" as const,
          title: "Store Update",
          message: "Store A submitted model update successfully",
        },
        {
          type: "success" as const,
          title: "Training Complete",
          message: "Global model training round completed",
        },
        {
          type: "warning" as const,
          title: "Fraud Detected",
          message: "Suspicious transaction detected at Store B",
        },
      ]

      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)]
      addNotification(randomNotification)
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
      case "warning":
        return "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800"
      case "error":
        return "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
      default:
        return "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
    }
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}

      {/* Notification Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border shadow-lg backdrop-blur-sm animate-slide-in-right ${getBackgroundColor(notification.type)}`}
          >
            <div className="flex items-start space-x-3">
              {getIcon(notification.type)}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{notification.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  )
}

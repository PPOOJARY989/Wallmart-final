"use client"

import { useState, useRef, useEffect } from "react"
import { Camera, Scan, CheckCircle, AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ScanResult {
  fraudProbability: number
  confidence: number
  riskFactors: string[]
  timestamp: Date
}

const ARScanner = () => {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [showOverlay, setShowOverlay] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (isScanning) {
      startCamera()
    } else {
      stopCamera()
    }

    return () => stopCamera()
  }, [isScanning])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.log("Camera not available, using mock mode")
      // Mock camera for demo
      setShowOverlay(true)
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }
  }

  const performScan = () => {
    // Simulate AI analysis
    const mockResult: ScanResult = {
      fraudProbability: Math.random() * 100,
      confidence: 85 + Math.random() * 15,
      riskFactors: [
        "Unusual transaction pattern",
        "High-value gift card purchase",
        "Multiple payment methods",
        "Customer behavior anomaly",
      ].slice(0, Math.floor(Math.random() * 4) + 1),
      timestamp: new Date(),
    }

    setScanResult(mockResult)
    setShowOverlay(true)

    // Auto-hide after 5 seconds
    setTimeout(() => {
      setShowOverlay(false)
    }, 5000)
  }

  const getRiskLevel = (probability: number) => {
    if (probability > 70) return { level: "HIGH", color: "text-red-500", bg: "bg-red-100" }
    if (probability > 40) return { level: "MEDIUM", color: "text-yellow-600", bg: "bg-yellow-100" }
    return { level: "LOW", color: "text-green-600", bg: "bg-green-100" }
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Camera View */}
      <div className="relative bg-black rounded-lg overflow-hidden aspect-[4/3]">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />

        {/* Mock camera view when camera is not available */}
        {!videoRef.current?.srcObject && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-center text-white">
              <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-sm opacity-75">Mock AR Camera View</p>
              <div className="mt-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                <p className="text-xs">Receipt Detection Active</p>
                <div className="mt-2 w-full bg-white/20 rounded-full h-1">
                  <div className="bg-cyan-400 h-1 rounded-full animate-pulse" style={{ width: "75%" }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scanning Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Corner brackets */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400"></div>
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400"></div>

          {/* Scanning line */}
          {isScanning && (
            <div className="absolute inset-x-4 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
          )}

          {/* AR Overlay Results */}
          {showOverlay && scanResult && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-4">
              <Card className="bg-white/95 backdrop-blur-sm max-w-xs w-full">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg">Scan Result</h3>
                    <Button variant="ghost" size="sm" onClick={() => setShowOverlay(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="text-center">
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getRiskLevel(scanResult.fraudProbability).bg} ${getRiskLevel(scanResult.fraudProbability).color}`}
                      >
                        {scanResult.fraudProbability > 50 ? (
                          <AlertTriangle className="w-4 h-4 mr-1" />
                        ) : (
                          <CheckCircle className="w-4 h-4 mr-1" />
                        )}
                        {getRiskLevel(scanResult.fraudProbability).level} RISK
                      </div>
                      <div className="mt-2 text-2xl font-bold">{scanResult.fraudProbability.toFixed(1)}%</div>
                      <div className="text-sm text-gray-600">Fraud Probability</div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-1">Confidence: {scanResult.confidence.toFixed(1)}%</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${scanResult.confidence}%` }}
                        ></div>
                      </div>
                    </div>

                    {scanResult.riskFactors.length > 0 && (
                      <div>
                        <div className="text-sm font-medium mb-2">Risk Factors:</div>
                        <ul className="text-xs space-y-1">
                          {scanResult.riskFactors.map((factor, index) => (
                            <li key={index} className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></div>
                              {factor}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="text-xs text-gray-500 text-center">
                      Scanned at {scanResult.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex justify-center space-x-4">
        <Button
          onClick={() => setIsScanning(!isScanning)}
          className={`${isScanning ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
        >
          <Camera className="w-4 h-4 mr-2" />
          {isScanning ? "Stop Camera" : "Start Camera"}
        </Button>

        <Button onClick={performScan} disabled={!isScanning} className="bg-blue-600 hover:bg-blue-700">
          <Scan className="w-4 h-4 mr-2" />
          Scan Receipt
        </Button>
      </div>

      {/* Status */}
      <div className="mt-2 text-center text-sm text-gray-600">
        {isScanning ? (
          <span className="flex items-center justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            AR Scanner Active
          </span>
        ) : (
          "AR Scanner Inactive"
        )}
      </div>
    </div>
  )
}

export default ARScanner

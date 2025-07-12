"use client"

import { useState, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Html, Environment } from "@react-three/drei"
import * as THREE from "three"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Shield,
  Zap,
  AlertTriangle,
  Target,
  Activity,
  TrendingUp,
  TrendingDown,
  Play,
  Pause,
  Eye,
  Brain,
  Network,
} from "lucide-react"

interface AttackMetric {
  name: string
  value: string
  trend: "up" | "down" | "stable"
  alert?: boolean
  color: string
}

interface VulnerabilityPoint {
  id: string
  position: [number, number, number]
  severity: number
  type: string
  description: string
}

interface AttackSimulation {
  id: string
  originalText: string
  adversarialText: string
  attackSuccess: boolean
  vulnerabilityScore: number
  defenseStrength: number
  timestamp: Date
}

// 3D Vulnerability Sphere Component
function VulnerabilitySphere({
  vulnerabilities,
  attackActive,
  defenseStrength,
}: {
  vulnerabilities: VulnerabilityPoint[]
  attackActive: boolean
  defenseStrength: number
}) {
  const sphereRef = useRef<THREE.Mesh>(null)
  const shieldRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.005
    }
    if (shieldRef.current) {
      shieldRef.current.rotation.y -= 0.01
      shieldRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1)
    }
  })

  return (
    <group>
      {/* Main Vulnerability Sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#0071CE" transparent opacity={0.3} wireframe />
      </mesh>

      {/* Defense Shield */}
      <mesh ref={shieldRef}>
        <sphereGeometry args={[2.5, 16, 16]} />
        <meshStandardMaterial
          color="#FFC220"
          transparent
          opacity={defenseStrength * 0.4}
          emissive="#FFC220"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Vulnerability Points */}
      {vulnerabilities.map((vuln) => (
        <VulnerabilityPoint key={vuln.id} vulnerability={vuln} attackActive={attackActive} />
      ))}

      {/* Attack Beams */}
      {attackActive &&
        vulnerabilities.map((vuln, index) => (
          <AttackBeam key={`beam-${vuln.id}`} target={vuln.position} delay={index * 0.2} />
        ))}

      {/* Floating Text Labels */}
      <Html position={[-3, 2, 0]} distanceFactor={10}>
        <div className="bg-[#0071CE] text-white px-3 py-1 rounded-lg text-sm font-bold">Original Model</div>
      </Html>

      <Html position={[3, 2, 0]} distanceFactor={10}>
        <div className="bg-[#E31837] text-white px-3 py-1 rounded-lg text-sm font-bold">Adversarial Attack</div>
      </Html>
    </group>
  )
}

function VulnerabilityPoint({
  vulnerability,
  attackActive,
}: {
  vulnerability: VulnerabilityPoint
  attackActive: boolean
}) {
  const pointRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (pointRef.current) {
      const intensity = attackActive ? 2 : 1
      pointRef.current.scale.setScalar(
        (0.1 + vulnerability.severity * 0.2) *
          (1 + Math.sin(state.clock.elapsedTime * 3 + vulnerability.position[0]) * 0.3 * intensity),
      )
    }
  })

  const getColor = () => {
    if (vulnerability.severity > 0.7) return "#E31837" // High severity - red
    if (vulnerability.severity > 0.4) return "#FFC220" // Medium severity - yellow
    return "#00B0F0" // Low severity - blue
  }

  return (
    <group position={vulnerability.position}>
      <mesh ref={pointRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={getColor()} emissive={getColor()} emissiveIntensity={attackActive ? 0.5 : 0.2} />
      </mesh>

      {hovered && (
        <Html distanceFactor={5}>
          <div className="bg-black/80 text-white p-2 rounded text-xs max-w-32">
            <div className="font-bold">{vulnerability.type}</div>
            <div className="text-gray-300">{vulnerability.description}</div>
            <div className="text-yellow-400">Severity: {(vulnerability.severity * 100).toFixed(0)}%</div>
          </div>
        </Html>
      )}
    </group>
  )
}

function AttackBeam({ target, delay }: { target: [number, number, number]; delay: number }) {
  const beamRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (beamRef.current) {
      const time = state.clock.elapsedTime - delay
      if (time > 0) {
        const opacity = Math.max(0, Math.sin(time * 2) * 0.8)
        beamRef.current.material.opacity = opacity
      }
    }
  })

  const direction = new THREE.Vector3(...target).normalize()
  const length = new THREE.Vector3(...target).length()

  return (
    <mesh ref={beamRef} position={[target[0] / 2, target[1] / 2, target[2] / 2]}>
      <cylinderGeometry args={[0.02, 0.02, length, 8]} />
      <meshBasicMaterial color="#E31837" transparent opacity={0} />
    </mesh>
  )
}

// Main Adversarial Arena Component
export function AdversarialArena() {
  const [isAttackActive, setIsAttackActive] = useState(false)
  const [currentSimulation, setCurrentSimulation] = useState<AttackSimulation | null>(null)
  const [defenseStrength, setDefenseStrength] = useState(0.75)
  const [attackMetrics, setAttackMetrics] = useState<AttackMetric[]>([
    { name: "Attack Success Rate", value: "12%", trend: "down", color: "#00B0F0" },
    { name: "Model Robustness", value: "88%", trend: "up", color: "#FFC220" },
    { name: "Zero-Day Threats", value: "3", trend: "stable", alert: true, color: "#E31837" },
    { name: "Defense Coverage", value: "94%", trend: "up", color: "#0071CE" },
  ])

  const [vulnerabilities] = useState<VulnerabilityPoint[]>([
    {
      id: "vuln-1",
      position: [1.5, 0.5, 0.8],
      severity: 0.8,
      type: "Word Substitution",
      description: "Vulnerable to synonym attacks",
    },
    {
      id: "vuln-2",
      position: [-1.2, 1.0, -0.5],
      severity: 0.6,
      type: "Character Flip",
      description: "Sensitive to typos",
    },
    {
      id: "vuln-3",
      position: [0.3, -1.5, 1.2],
      severity: 0.4,
      type: "Sentence Reorder",
      description: "Context confusion",
    },
    {
      id: "vuln-4",
      position: [-0.8, 0.2, -1.8],
      severity: 0.9,
      type: "Adversarial Noise",
      description: "Imperceptible perturbations",
    },
    {
      id: "vuln-5",
      position: [1.8, -0.8, 0.2],
      severity: 0.3,
      type: "Semantic Drift",
      description: "Meaning preservation issues",
    },
  ])

  // Simulate attack
  const simulateAttack = () => {
    setIsAttackActive(true)

    const simulation: AttackSimulation = {
      id: `attack-${Date.now()}`,
      originalText: "This transaction appears legitimate with standard purchase patterns.",
      adversarialText: "This transaction appears legitimate with standard purchase patterns.",
      attackSuccess: Math.random() > 0.7,
      vulnerabilityScore: Math.random() * 0.4 + 0.3,
      defenseStrength: defenseStrength,
      timestamp: new Date(),
    }

    setCurrentSimulation(simulation)

    // Update metrics
    setTimeout(() => {
      setAttackMetrics((prev) =>
        prev.map((metric) => {
          if (metric.name === "Attack Success Rate") {
            const newValue = simulation.attackSuccess
              ? Number.parseInt(metric.value) + Math.floor(Math.random() * 5) + 1
              : Math.max(0, Number.parseInt(metric.value) - Math.floor(Math.random() * 3) + 1)
            return { ...metric, value: `${newValue}%` }
          }
          if (metric.name === "Model Robustness") {
            const newValue = simulation.attackSuccess
              ? Math.max(70, Number.parseInt(metric.value) - Math.floor(Math.random() * 5) + 1)
              : Math.min(95, Number.parseInt(metric.value) + Math.floor(Math.random() * 3) + 1)
            return { ...metric, value: `${newValue}%` }
          }
          return metric
        }),
      )
    }, 2000)

    // Stop attack animation
    setTimeout(() => {
      setIsAttackActive(false)
    }, 5000)
  }

  const deployDefense = () => {
    setDefenseStrength(Math.min(1, defenseStrength + 0.1))
    // Simulate defense deployment
    const newLog = {
      id: Date.now(),
      message: "🛡️ Federated defense patch deployed across all stores",
      timestamp: new Date().toLocaleTimeString(),
      type: "defense",
    }
    console.log("Defense deployed:", newLog)
  }

  const requestAssistance = () => {
    // Simulate requesting help from other stores
    const newLog = {
      id: Date.now(),
      message: "🆘 Requesting defensive knowledge from high-performing stores",
      timestamp: new Date().toLocaleTimeString(),
      type: "assistance",
    }
    console.log("Assistance requested:", newLog)
  }

  const generatePatch = () => {
    // Simulate patch generation
    const newLog = {
      id: Date.now(),
      message: "🧩 AI-generated defense patch created and ready for deployment",
      timestamp: new Date().toLocaleTimeString(),
      type: "patch",
    }
    console.log("Patch generated:", newLog)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
              <Shield className="w-10 h-10 mr-3 text-[#0071CE]" />
              Adversarial Arena
            </h1>
            <p className="text-xl text-gray-600">Live fire exercise for fraud detection models</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-[#0071CE] text-white px-4 py-2 text-lg">
              <Activity className="w-4 h-4 mr-2" />
              {isAttackActive ? "Under Attack" : "Monitoring"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Attack Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {attackMetrics.map((metric, index) => (
          <Card
            key={metric.name}
            className={`transition-all duration-300 hover:scale-105 ${
              metric.alert ? "ring-2 ring-[#E31837] animate-pulse" : ""
            }`}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center justify-between">
                {metric.name}
                {metric.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
                {metric.trend === "down" && <TrendingDown className="w-4 h-4 text-red-500" />}
                {metric.trend === "stable" && <Activity className="w-4 h-4 text-gray-500" />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" style={{ color: metric.color }}>
                {metric.value}
              </div>
              {metric.alert && (
                <Alert className="mt-2 border-[#E31837]">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-xs">Requires immediate attention</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Arena Layout */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* 3D Vulnerability Visualization */}
        <div className="lg:col-span-2">
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-[#0071CE]" />
                3D Vulnerability Sphere
              </CardTitle>
              <CardDescription>Real-time visualization of model vulnerabilities and attack patterns</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] p-0">
              <Canvas camera={{ position: [5, 2, 5], fov: 60 }}>
                <Environment preset="studio" />
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#0071CE" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFC220" />

                <VulnerabilitySphere
                  vulnerabilities={vulnerabilities}
                  attackActive={isAttackActive}
                  defenseStrength={defenseStrength}
                />

                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
              </Canvas>
            </CardContent>
          </Card>
        </div>

        {/* Control Panel */}
        <div className="space-y-6">
          {/* Attack Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-[#E31837]" />
                Attack Simulation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={simulateAttack}
                disabled={isAttackActive}
                className="w-full bg-[#E31837] hover:bg-red-700 text-white"
                size="lg"
              >
                {isAttackActive ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Attack in Progress...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Launch Attack
                  </>
                )}
              </Button>

              {currentSimulation && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Latest Simulation</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Success:</span>{" "}
                      <Badge variant={currentSimulation.attackSuccess ? "destructive" : "secondary"}>
                        {currentSimulation.attackSuccess ? "Yes" : "No"}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium">Vulnerability Score:</span>{" "}
                      {(currentSimulation.vulnerabilityScore * 100).toFixed(1)}%
                    </div>
                    <div>
                      <span className="font-medium">Defense Strength:</span>
                      <Progress value={currentSimulation.defenseStrength * 100} className="mt-1" />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Defense Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-[#FFC220]" />
                Defense Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={deployDefense}
                className="w-full bg-[#0071CE] hover:bg-blue-700 text-white"
                variant="default"
              >
                <Shield className="w-4 h-4 mr-2" />
                Deploy Federated Defense
              </Button>

              <Button
                onClick={requestAssistance}
                className="w-full bg-[#FFC220] hover:bg-yellow-500 text-gray-900"
                variant="secondary"
              >
                <Network className="w-4 h-4 mr-2" />
                Request Store Assistance
              </Button>

              <Button
                onClick={generatePatch}
                className="w-full bg-[#00B0F0] hover:bg-sky-600 text-white"
                variant="default"
              >
                <Brain className="w-4 h-4 mr-2" />
                Generate Defense Patch
              </Button>
            </CardContent>
          </Card>

          {/* Defense Strength Indicator */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Defense Strength</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current Level</span>
                  <span className="font-bold">{(defenseStrength * 100).toFixed(0)}%</span>
                </div>
                <Progress value={defenseStrength * 100} className="h-3" />
                <div className="text-xs text-gray-500">Higher defense strength reduces attack success rate</div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <Eye className="w-4 h-4 mr-2" />
                Compliance Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">GDPR Compliance</span>
                <Badge className="bg-green-100 text-green-800">98%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">CCPA Alignment</span>
                <Badge className="bg-green-100 text-green-800">95%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">HIPAA Safeguards</span>
                <Badge className="bg-yellow-100 text-yellow-800">82%</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile-Responsive AR View Notice */}
      <div className="mt-8 lg:hidden">
        <Alert>
          <Eye className="h-4 w-4" />
          <AlertDescription>
            For the full AR threat visualization experience, use the mobile app or enable camera access.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}

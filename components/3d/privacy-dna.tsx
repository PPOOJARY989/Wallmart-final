"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Html } from "@react-three/drei"
import * as THREE from "three"

interface DNAStrand {
  id: string
  stage: "raw" | "noise" | "encrypted"
  progress: number
}

function DNAHelix({ strand }: { strand: DNAStrand }) {
  const groupRef = useRef<THREE.Group>(null)
  const [basePairs, setBasePairs] = useState<THREE.Vector3[]>([])

  useEffect(() => {
    const pairs = []
    for (let i = 0; i < 50; i++) {
      const y = (i - 25) * 0.2
      const angle = (i / 50) * Math.PI * 8
      pairs.push(new THREE.Vector3(Math.cos(angle) * 2, y, Math.sin(angle) * 2))
    }
    setBasePairs(pairs)
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01
    }
  })

  const getStageColor = () => {
    switch (strand.stage) {
      case "raw":
        return "#E31837" // Red - Raw Data
      case "noise":
        return "#FFC220" // Yellow - DP Noise
      case "encrypted":
        return "#0071CE" // Blue - Encrypted
      default:
        return "#ffffff"
    }
  }

  const getStageOpacity = () => {
    return strand.progress
  }

  return (
    <group ref={groupRef}>
      {/* DNA Backbone */}
      {basePairs.map((pos, i) => {
        const nextPos = basePairs[i + 1]
        if (!nextPos) return null

        return (
          <group key={i}>
            {/* Base Pair Spheres */}
            <mesh position={pos}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshStandardMaterial
                color={getStageColor()}
                emissive={getStageColor()}
                emissiveIntensity={0.2}
                transparent
                opacity={getStageOpacity()}
              />
            </mesh>

            {/* Connecting Lines */}
            <mesh position={[pos.x, pos.y, pos.z]}>
              <cylinderGeometry args={[0.02, 0.02, 4, 8]} />
              <meshStandardMaterial color={getStageColor()} transparent opacity={getStageOpacity() * 0.5} />
            </mesh>
          </group>
        )
      })}

      {/* Stage Label */}
      <Html position={[0, 6, 0]} center>
        <div className="bg-black/80 text-white px-3 py-2 rounded-lg text-center">
          <div className="text-lg font-bold" style={{ color: getStageColor() }}>
            {strand.stage.toUpperCase()}
          </div>
          <div className="text-sm text-gray-300">{(strand.progress * 100).toFixed(0)}% Complete</div>
        </div>
      </Html>
    </group>
  )
}

function PrivacyMutations() {
  const particlesRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(state.clock.elapsedTime + i) * 0.002
        positions[i + 1] += Math.cos(state.clock.elapsedTime + i) * 0.002
        positions[i + 2] += Math.sin(state.clock.elapsedTime + i * 0.5) * 0.002
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  const particleCount = 200
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10

    // Walmart colors
    const colorChoice = Math.random()
    if (colorChoice < 0.33) {
      colors[i * 3] = 0.0
      colors[i * 3 + 1] = 0.44
      colors[i * 3 + 2] = 0.81 // Blue
    } else if (colorChoice < 0.66) {
      colors[i * 3] = 1.0
      colors[i * 3 + 1] = 0.76
      colors[i * 3 + 2] = 0.13 // Yellow
    } else {
      colors[i * 3] = 0.89
      colors[i * 3 + 1] = 0.09
      colors[i * 3 + 2] = 0.22 // Red
    }
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.7} />
    </points>
  )
}

export function PrivacyDNA() {
  const [currentStage, setCurrentStage] = useState(0)
  const [strands, setStrands] = useState<DNAStrand[]>([
    { id: "raw", stage: "raw", progress: 1 },
    { id: "noise", stage: "noise", progress: 0 },
    { id: "encrypted", stage: "encrypted", progress: 0 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setStrands((prev) => {
        const newStrands = [...prev]
        const activeStrand = newStrands[currentStage]

        if (activeStrand && activeStrand.progress < 1) {
          activeStrand.progress += 0.02
        } else if (currentStage < 2) {
          setCurrentStage((prev) => prev + 1)
        } else {
          // Reset cycle
          setCurrentStage(0)
          newStrands.forEach((strand, i) => {
            strand.progress = i === 0 ? 1 : 0
          })
        }

        return newStrands
      })
    }, 100)

    return () => clearInterval(interval)
  }, [currentStage])

  return (
    <div className="w-full h-[500px] bg-gradient-to-b from-gray-900 via-blue-900/20 to-black rounded-xl overflow-hidden relative">
      <Canvas camera={{ position: [8, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#0071CE" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#FFC220" />

        <PrivacyMutations />

        {strands.map((strand, index) => (
          <group key={strand.id} position={[index * 6 - 6, 0, 0]}>
            <DNAHelix strand={strand} />
          </group>
        ))}

        <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
      </Canvas>

      {/* Privacy Parameter Controls */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/80 text-white p-4 rounded-lg">
        <h3 className="text-lg font-bold text-[#0071CE] mb-3">🧬 Differential Privacy Sequencer</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#E31837]">RAW DATA</div>
            <div className="text-sm text-gray-300">Customer transactions</div>
            <div className="text-xs text-gray-400">100% accuracy, 0% privacy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#FFC220]">DP NOISE</div>
            <div className="text-sm text-gray-300">Calibrated randomization</div>
            <div className="text-xs text-gray-400">ε = 0.1, δ = 10⁻⁵</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#0071CE]">ENCRYPTED</div>
            <div className="text-sm text-gray-300">Secure aggregation</div>
            <div className="text-xs text-gray-400">98% accuracy, 100% privacy</div>
          </div>
        </div>

        {/* Privacy Budget Meter */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Privacy Budget (ε)</span>
            <span>0.1 / 1.0</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-[#0071CE] h-2 rounded-full" style={{ width: "10%" }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Html, Environment } from "@react-three/drei"
import * as THREE from "three"

interface StoreNode {
  id: string
  name: string
  position: [number, number, number]
  threatLevel: number
  knowledgeContribution: number
  isActive: boolean
  connections: string[]
}

const storeNodes: StoreNode[] = [
  {
    id: "store-001",
    name: "Dallas TX",
    position: [0, 0, 0],
    threatLevel: 0.3,
    knowledgeContribution: 0.8,
    isActive: true,
    connections: ["store-002", "store-003"],
  },
  {
    id: "store-002",
    name: "Houston TX",
    position: [4, 2, -2],
    threatLevel: 0.7,
    knowledgeContribution: 0.6,
    isActive: true,
    connections: ["store-001", "store-003"],
  },
  {
    id: "store-003",
    name: "Austin TX",
    position: [-3, -1, 3],
    threatLevel: 0.2,
    knowledgeContribution: 0.9,
    isActive: true,
    connections: ["store-001", "store-002"],
  },
]

function StoreNodeComponent({ node }: { node: StoreNode }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.scale.setScalar(hovered ? 1.2 : 1)
    }
  })

  const nodeColor = node.threatLevel > 0.5 ? "#E31837" : "#FFC220"

  return (
    <group position={node.position}>
      <mesh ref={meshRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={nodeColor}
          emissive={nodeColor}
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Knowledge Contribution Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.7, 0.8, 32]} />
        <meshBasicMaterial color="#0071CE" transparent opacity={node.knowledgeContribution} />
      </mesh>

      {/* Store Label */}
      <Html distanceFactor={10}>
        <div className="bg-black/80 text-white px-2 py-1 rounded text-xs font-bold">
          {node.name}
          <div className="text-xs text-gray-300">Threat: {(node.threatLevel * 100).toFixed(0)}%</div>
        </div>
      </Html>
    </group>
  )
}

function KnowledgeStream({ from, to }: { from: [number, number, number]; to: [number, number, number] }) {
  const lineRef = useRef<THREE.BufferGeometry>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
    }
  })

  const points = []
  for (let i = 0; i <= 50; i++) {
    const t = i / 50
    const x = from[0] + (to[0] - from[0]) * t
    const y = from[1] + (to[1] - from[1]) * t + Math.sin(t * Math.PI * 2) * 0.2
    const z = from[2] + (to[2] - from[2]) * t
    points.push(new THREE.Vector3(x, y, z))
  }

  const curve = new THREE.CatmullRomCurve3(points)
  const tubeGeometry = new THREE.TubeGeometry(curve, 50, 0.02, 8, false)

  const vertexShader = `
    uniform float time;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform float time;
    varying vec2 vUv;
    void main() {
      float wave = sin(vUv.x * 10.0 - time * 5.0) * 0.5 + 0.5;
      vec3 color = mix(vec3(0.0, 0.44, 0.81), vec3(1.0, 0.76, 0.13), wave);
      gl_FragColor = vec4(color, 0.8);
    }
  `

  return (
    <mesh geometry={tubeGeometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: 0 },
        }}
        transparent
      />
    </mesh>
  )
}

function ThreatParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 1000

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.002
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20

    colors[i * 3] = Math.random() * 0.5 + 0.5 // R
    colors[i * 3 + 1] = Math.random() * 0.3 // G
    colors[i * 3 + 2] = Math.random() * 0.8 + 0.2 // B
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} vertexColors transparent opacity={0.6} />
    </points>
  )
}

export function FederatedGalaxy() {
  return (
    <div className="w-full h-[600px] bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden">
      <Canvas camera={{ position: [8, 5, 8], fov: 60 }}>
        <Environment preset="night" />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#0071CE" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFC220" />

        <ThreatParticles />

        {storeNodes.map((node) => (
          <StoreNodeComponent key={node.id} node={node} />
        ))}

        {storeNodes.map((node) =>
          node.connections.map((connectionId) => {
            const targetNode = storeNodes.find((n) => n.id === connectionId)
            if (targetNode) {
              return (
                <KnowledgeStream key={`${node.id}-${connectionId}`} from={node.position} to={targetNode.position} />
              )
            }
            return null
          }),
        )}

        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>

      {/* Overlay UI */}
      <div className="absolute top-4 left-4 bg-black/80 text-white p-4 rounded-lg">
        <h3 className="text-lg font-bold text-[#FFC220] mb-2">🌌 Federated Galaxy</h3>
        <div className="space-y-1 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#FFC220] rounded-full"></div>
            <span>Active Stores</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#E31837] rounded-full"></div>
            <span>High Threat Level</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#0071CE] rounded-full"></div>
            <span>Knowledge Streams</span>
          </div>
        </div>
      </div>
    </div>
  )
}

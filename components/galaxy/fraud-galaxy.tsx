"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, Text, Html, Environment, Stars } from "@react-three/drei"
import * as THREE from "three"

interface StoreNode {
  id: string
  position: [number, number, number]
  fraudLevel: number
  isActive: boolean
  connections: string[]
}

const FraudNode = ({ store, onClick }: { store: StoreNode; onClick: (store: StoreNode) => void }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1 * store.fraudLevel)
    }
  })

  const color = useMemo(() => {
    if (store.fraudLevel > 0.7) return "#ef4444" // High fraud - red
    if (store.fraudLevel > 0.4) return "#f59e0b" // Medium fraud - orange
    return "#10b981" // Low fraud - green
  }, [store.fraudLevel])

  return (
    <group position={store.position}>
      <Sphere
        ref={meshRef}
        args={[0.5, 32, 32]}
        onClick={() => onClick(store)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={store.isActive ? 0.3 : 0.1}
          transparent
          opacity={hovered ? 0.9 : 0.7}
        />
      </Sphere>

      {hovered && (
        <Html distanceFactor={10}>
          <div className="bg-black/80 text-white p-2 rounded text-sm pointer-events-none">
            <div>Store {store.id}</div>
            <div>Fraud Risk: {(store.fraudLevel * 100).toFixed(1)}%</div>
            <div>Status: {store.isActive ? "Active" : "Inactive"}</div>
          </div>
        </Html>
      )}

      <Text position={[0, 1, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
        {store.id}
      </Text>
    </group>
  )
}

const ConnectionLines = ({ stores }: { stores: StoreNode[] }) => {
  const linesRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y += 0.002
    }
  })

  const connections = useMemo(() => {
    const lines: Array<{ start: [number, number, number]; end: [number, number, number]; strength: number }> = []

    stores.forEach((store) => {
      store.connections.forEach((connId) => {
        const connectedStore = stores.find((s) => s.id === connId)
        if (connectedStore) {
          lines.push({
            start: store.position,
            end: connectedStore.position,
            strength: Math.random() * 0.5 + 0.5,
          })
        }
      })
    })

    return lines
  }, [stores])

  return (
    <group ref={linesRef}>
      {connections.map((conn, index) => (
        <line key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([...conn.start, ...conn.end])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#9df9ef" transparent opacity={conn.strength * 0.3} />
        </line>
      ))}
    </group>
  )
}

const FraudParticles = () => {
  const particlesRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const positions = new Float32Array(1000 * 3)
    const colors = new Float32Array(1000 * 3)

    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50

      const color = new THREE.Color()
      color.setHSL(Math.random() * 0.1 + 0.6, 0.8, 0.5)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001
      particlesRef.current.rotation.x += 0.0005
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={1000} array={particles.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={1000} array={particles.colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

const FraudGalaxyScene = () => {
  const [selectedStore, setSelectedStore] = useState<StoreNode | null>(null)
  const [stores, setStores] = useState<StoreNode[]>([])

  useEffect(() => {
    // Generate mock store data
    const mockStores: StoreNode[] = [
      {
        id: "A",
        position: [0, 0, 0],
        fraudLevel: 0.2,
        isActive: true,
        connections: ["B", "C"],
      },
      {
        id: "B",
        position: [5, 3, -2],
        fraudLevel: 0.8,
        isActive: true,
        connections: ["A", "C", "D"],
      },
      {
        id: "C",
        position: [-4, -2, 3],
        fraudLevel: 0.1,
        isActive: true,
        connections: ["A", "B", "E"],
      },
      {
        id: "D",
        position: [3, -4, 5],
        fraudLevel: 0.6,
        isActive: false,
        connections: ["B", "E"],
      },
      {
        id: "E",
        position: [-6, 2, -4],
        fraudLevel: 0.3,
        isActive: true,
        connections: ["C", "D"],
      },
    ]

    setStores(mockStores)
  }, [])

  return (
    <>
      <Environment preset="night" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9df9ef" />

      <FraudParticles />
      <ConnectionLines stores={stores} />

      {stores.map((store) => (
        <FraudNode key={store.id} store={store} onClick={setSelectedStore} />
      ))}

      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} autoRotate autoRotateSpeed={0.5} />

      {selectedStore && (
        <Html position={[8, 8, 0]}>
          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs">
            <h3 className="font-bold text-lg mb-2">Store {selectedStore.id}</h3>
            <div className="space-y-1 text-sm">
              <div>
                Fraud Risk: <span className="font-semibold">{(selectedStore.fraudLevel * 100).toFixed(1)}%</span>
              </div>
              <div>
                Status:{" "}
                <span className={`font-semibold ${selectedStore.isActive ? "text-green-600" : "text-red-600"}`}>
                  {selectedStore.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div>Connections: {selectedStore.connections.length}</div>
            </div>
            <button
              onClick={() => setSelectedStore(null)}
              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </Html>
      )}
    </>
  )
}

const FraudGalaxy = () => {
  return (
    <div className="w-full h-screen bg-black relative">
      <Canvas camera={{ position: [10, 10, 10], fov: 60 }}>
        <FraudGalaxyScene />
      </Canvas>

      <div className="absolute top-4 left-4 bg-black/50 text-white p-4 rounded-lg backdrop-blur-sm">
        <h2 className="font-bold text-lg mb-2">Fraud Detection Galaxy</h2>
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Low Risk (&lt;40%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Medium Risk (40-70%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>High Risk (&gt;70%)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FraudGalaxy

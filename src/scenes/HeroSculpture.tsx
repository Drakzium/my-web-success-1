import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface HeroSculptureProps {
  reduced?: boolean
}

export function HeroSculpture({ reduced = false }: HeroSculptureProps) {
  const group = useRef<THREE.Group>(null)
  const rings = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)
  const pointer = useRef({ x: 0, y: 0 })

  const orbitPositions = useMemo(() => {
    const count = reduced ? 8 : 16
    return Array.from({ length: count }, (_, i) => {
      const t = (i / count) * Math.PI * 2
      const radius = 1.55 + (i % 3) * 0.18
      return new THREE.Vector3(
        Math.cos(t) * radius,
        Math.sin(t * 2) * 0.35,
        Math.sin(t) * radius,
      )
    })
  }, [reduced])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const { x, y } = state.pointer
    pointer.current.x += (x - pointer.current.x) * 0.05
    pointer.current.y += (y - pointer.current.y) * 0.05

    if (group.current) {
      group.current.rotation.y = t * 0.12 + pointer.current.x * 0.35
      group.current.rotation.x = pointer.current.y * 0.2 + Math.sin(t * 0.4) * 0.05
      group.current.position.y = Math.sin(t * 0.6) * 0.08
    }

    if (rings.current) {
      rings.current.rotation.z = t * 0.25
      rings.current.rotation.x = t * 0.08
    }

    if (core.current) {
      const scale = 1 + Math.sin(t * 1.8) * 0.04
      core.current.scale.setScalar(scale)
    }
  })

  return (
    <group ref={group}>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.85}
          roughness={0.25}
          emissive="#122010"
          emissiveIntensity={0.6}
        />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[0.72, 0]} />
        <meshBasicMaterial
          color="#39FF14"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      <group ref={rings}>
        <mesh rotation={[Math.PI / 2.4, 0.2, 0]}>
          <torusGeometry args={[1.35, 0.018, 16, reduced ? 64 : 128]} />
          <meshStandardMaterial
            color="#39FF14"
            emissive="#39FF14"
            emissiveIntensity={0.8}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
        <mesh rotation={[Math.PI / 3, 0.8, 0.4]}>
          <torusGeometry args={[1.7, 0.012, 12, reduced ? 48 : 96]} />
          <meshStandardMaterial
            color="#6BFF6B"
            emissive="#2bc410"
            emissiveIntensity={0.5}
            metalness={0.5}
            roughness={0.35}
            transparent
            opacity={0.85}
          />
        </mesh>
        {!reduced && (
          <mesh rotation={[1.1, -0.4, 0.6]}>
            <torusGeometry args={[2.05, 0.008, 8, 80]} />
            <meshBasicMaterial color="#39FF14" transparent opacity={0.25} />
          </mesh>
        )}
      </group>

      {orbitPositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <octahedronGeometry args={[0.045 + (i % 3) * 0.015, 0]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#39FF14' : '#a3a3a3'}
            emissive={i % 2 === 0 ? '#39FF14' : '#111'}
            emissiveIntensity={i % 2 === 0 ? 0.7 : 0.1}
            metalness={0.7}
            roughness={0.25}
          />
        </mesh>
      ))}

      <mesh rotation={[0, 0, Math.PI / 5]} position={[0, 0, 0]}>
        <boxGeometry args={[0.12, 2.4, 0.12]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.2}
          emissive="#0d1a0a"
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh rotation={[0, 0, -Math.PI / 5]} position={[0, 0, 0]}>
        <boxGeometry args={[0.12, 2.4, 0.12]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.2}
          emissive="#0d1a0a"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  )
}

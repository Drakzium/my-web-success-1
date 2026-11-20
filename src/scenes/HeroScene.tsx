import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import { HeroSculpture } from './HeroSculpture'
import { Particles } from './Particles'
import { canUseWebGL, shouldReduce3D } from '../utils/device'
import './HeroScene.css'

function SceneContent({ reduced }: { reduced: boolean }) {
  return (
    <>
      <color attach="background" args={['#050505']} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 3]} intensity={1} color="#ffffff" />
      <pointLight position={[-3, 2, -2]} intensity={1.4} color="#39FF14" distance={12} />
      <pointLight position={[3, -1, 2]} intensity={0.6} color="#6BFF6B" distance={10} />
      <spotLight
        position={[0, 5, 2]}
        angle={0.45}
        penumbra={0.6}
        intensity={0.8}
        color="#39FF14"
      />
      <HeroSculpture reduced={reduced} />
      <Particles count={reduced ? 40 : 140} />
      <AdaptiveDpr pixelated />
    </>
  )
}

function FallbackVisual() {
  return (
    <div className="hero-fallback" aria-hidden="true">
      <div className="hero-fallback__orb" />
      <div className="hero-fallback__ring hero-fallback__ring--a" />
      <div className="hero-fallback__ring hero-fallback__ring--b" />
      <div className="hero-fallback__grid" />
    </div>
  )
}

export function HeroScene() {
  const [enabled, setEnabled] = useState(false)
  const [reduced, setReduced] = useState(true)

  useEffect(() => {
    const ok = canUseWebGL()
    setReduced(shouldReduce3D())
    setEnabled(ok)

    const onResize = () => setReduced(shouldReduce3D())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  if (!enabled) {
    return <FallbackVisual />
  }

  return (
    <div className="hero-scene">
      <Suspense fallback={<FallbackVisual />}>
        <Canvas
          dpr={reduced ? [1, 1.25] : [1, 1.75]}
          camera={{ position: [0, 0.2, 5.2], fov: 42, near: 0.1, far: 40 }}
          gl={{
            antialias: !reduced,
            alpha: true,
            powerPreference: reduced ? 'low-power' : 'high-performance',
          }}
          style={{ background: 'transparent' }}
        >
          <SceneContent reduced={reduced} />
        </Canvas>
      </Suspense>
    </div>
  )
}

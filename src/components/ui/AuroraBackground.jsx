'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const Aurora = dynamic(
  () => import('./Aurora'),
  { ssr: false }
)

const SoftAurora = dynamic(
  () => import('./SoftAurora'),
  { ssr: false }
)

export default function AuroraBackground() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleVisibility = () => {
      setShow(!document.hidden)
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  if (!show) {
    return (
      <div style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        zIndex: -1,
        background: '#011d3a',
      }} />
    )
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100vw', height: '100vh',
      zIndex: -1,
      pointerEvents: 'none',
      background: '#011d3a',
    }}>

      {/* Layer 1: SoftAurora (original) */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 1,
        opacity: 0.6,
      }}>
        <SoftAurora
          speed={0.25}
          scale={1.0}
          brightness={0.8}
          color1="#1a4a7a"
          color2="#e01f37"
          noiseFrequency={1.5}
          noiseAmplitude={0.5}
          bandHeight={0.5}
          bandSpread={0.6}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={0.25}
          enableMouseInteraction={false}
          mouseInfluence={0}
        />
      </div>

      {/* Layer 2: New Aurora (ReactBits) */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 2,
        opacity: 0.4,
      }}>
        <Aurora
          colorStops={["#0a3d6e", "#e01f37", "#1a4a7a"]}
          blend={0.6}
          amplitude={0.8}
          speed={0.5}
        />
      </div>
    </div>
  )
}
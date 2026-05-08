'use client'

import dynamic from 'next/dynamic'

const SoftAurora = dynamic(
  () => import('./SoftAurora').then((mod) => mod.default),
  { ssr: false }
)

export default function AuroraBackground() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      pointerEvents: 'none',
      background: '#011d3a',
    }}>
      <SoftAurora
        speed={0.5}
        scale={1}
        brightness={1.2}
        color1="#edf2f7"
        color2="#e01fcd"
        noiseFrequency={1.5}
        noiseAmplitude={1.2}
        bandHeight={0.5}
        bandSpread={1}
        octaveDecay={0.1}
        layerOffset={0}
        colorSpeed={0.8}
        enableMouseInteraction
        mouseInfluence={0.25}
      />
    </div>
  )
}
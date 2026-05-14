'use client'

import dynamic from 'next/dynamic'

const Prism = dynamic(() => import('./Prism'), { ssr: false })

export default function PrismBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        background: '#011d3a',
      }}
    >
      <Prism
        animationType="rotate"
        timeScale={0.15}
        height={3.5}
        baseWidth={5.5}
        scale={3.2}
        hueShift={0}
        colorFrequency={0.5}
        noise={0}
        glow={0.7}
        bloom={0.7}
        transparent={true}
        suspendWhenOffscreen={true}
      />
    </div>
  )
}
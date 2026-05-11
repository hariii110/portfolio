'use client'

import dynamic from 'next/dynamic'

const MagicRings = dynamic(
  () => import('./MagicRings'),
  { ssr: false }
)

export default function ProfileRings({ size = 200, shape = 'circle' }) {
  return (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: shape === 'circle' ? '50%' : '24px',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* MagicRings Background */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 1,
      }}>
        <MagicRings
          color="#e01f37"
          colorTwo="#1a4a7a"
          ringCount={5}
          speed={0.8}
          attenuation={8}
          lineThickness={2}
          baseRadius={0.25}
          radiusStep={0.08}
          scaleRate={0.08}
          opacity={0.9}
          blur={0}
          noiseAmount={0.05}
          rotation={0}
          ringGap={1.5}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse={true}
          mouseInfluence={0.15}
          hoverScale={1.1}
          parallax={0.03}
          clickBurst={true}
        />
      </div>

      {/* Profile Icon on top */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: `${size * 0.55}px`,
          height: `${size * 0.55}px`,
          borderRadius: shape === 'circle' ? '50%' : '16px',
          background: 'rgba(1, 29, 58, 0.7)',
          backdropFilter: 'blur(8px)',
          border: '2px solid rgba(240, 236, 227, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: `${size * 0.25}px`,
        }}>
          👨‍💻
        </div>
      </div>
    </div>
  )
}
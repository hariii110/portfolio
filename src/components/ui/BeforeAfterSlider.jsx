'use client'

import { useState, useRef } from 'react'

export default function BeforeAfterSlider({
  beforeLabel = 'Mobile',
  afterLabel = 'Desktop',
  beforeColor = '#e01f37',
  afterColor = '#1a4a7a',
  height = 300,
}) {
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef(null)
  const isDragging = useRef(false)

  const handleMove = (clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPos(percent)
  }

  const handleMouseDown = () => { isDragging.current = true }
  const handleMouseUp = () => { isDragging.current = false }
  const handleMouseMove = (e) => {
    if (isDragging.current) handleMove(e.clientX)
  }
  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX)
  }

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      style={{
        position: 'relative',
        width: '100%',
        height: `${height}px`,
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'ew-resize',
        userSelect: 'none',
        border: '1px solid rgba(10, 61, 110, 0.5)',
      }}
    >
      {/* After (Desktop) - Full background */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        background: afterColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        padding: '24px',
      }}>
        <div style={{
          width: '80%', maxWidth: '300px',
          aspectRatio: '16/10',
          borderRadius: '8px',
          border: '2px solid rgba(240, 236, 227, 0.2)',
          background: 'rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          padding: '8px',
          gap: '4px',
        }}>
          <div style={{ display: 'flex', gap: '3px', marginBottom: '4px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e01f37' }} />
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(240, 236, 227, 0.2)' }} />
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(240, 236, 227, 0.2)' }} />
          </div>
          <div style={{ width: '60%', height: '4px', borderRadius: '100px', background: 'rgba(240, 236, 227, 0.2)' }} />
          <div style={{ width: '80%', height: '3px', borderRadius: '100px', background: 'rgba(240, 236, 227, 0.1)' }} />
          <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
            <div style={{ width: '30%', height: '20px', borderRadius: '4px', background: 'rgba(240, 236, 227, 0.08)' }} />
            <div style={{ width: '30%', height: '20px', borderRadius: '4px', background: 'rgba(240, 236, 227, 0.08)' }} />
            <div style={{ width: '30%', height: '20px', borderRadius: '4px', background: 'rgba(240, 236, 227, 0.08)' }} />
          </div>
        </div>
        <span style={{
          fontSize: '0.75rem', fontWeight: 700,
          color: 'rgba(240, 236, 227, 0.5)',
          letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>{afterLabel}</span>
      </div>

      {/* Before (Mobile) - Clipped */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        background: beforeColor,
        clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        padding: '24px',
      }}>
        <div style={{
          width: '120px',
          height: '200px',
          borderRadius: '16px',
          border: '2px solid rgba(240, 236, 227, 0.3)',
          background: 'rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          padding: '8px',
          gap: '4px',
          alignItems: 'center',
        }}>
          <div style={{ width: '30px', height: '3px', borderRadius: '100px', background: 'rgba(240, 236, 227, 0.2)', marginBottom: '4px' }} />
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(240, 236, 227, 0.15)', marginBottom: '4px' }} />
          <div style={{ width: '70%', height: '3px', borderRadius: '100px', background: 'rgba(240, 236, 227, 0.2)' }} />
          <div style={{ width: '90%', height: '2px', borderRadius: '100px', background: 'rgba(240, 236, 227, 0.1)' }} />
          <div style={{ display: 'flex', gap: '3px', marginTop: '6px' }}>
            <div style={{ width: '35px', height: '14px', borderRadius: '4px', background: 'rgba(240, 236, 227, 0.15)' }} />
            <div style={{ width: '35px', height: '14px', borderRadius: '4px', background: 'rgba(240, 236, 227, 0.08)' }} />
          </div>
        </div>
        <span style={{
          fontSize: '0.75rem', fontWeight: 700,
          color: 'rgba(240, 236, 227, 0.6)',
          letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>{beforeLabel}</span>
      </div>

      {/* Slider Handle */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: `${sliderPos}%`,
        transform: 'translateX(-50%)',
        width: '3px',
        height: '100%',
        background: '#f0ece3',
        zIndex: 10,
      }}>
        {/* Handle circle */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: '#f0ece3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
          fontSize: '0.7rem',
          color: '#012c56',
          fontWeight: 700,
        }}>
          ↔
        </div>
      </div>
    </div>
  )
}
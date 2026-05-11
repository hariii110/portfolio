'use client'

import { useState, useEffect } from 'react'

export default function PageLoader() {
  const [loading, setLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => setLoading(false), 600)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: '#011d3a',
      zIndex: 999999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.6s ease',
    }}>

      {/* Name */}
      <div style={{
        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
        fontWeight: 700,
        color: '#f0ece3',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        animation: 'loaderFadeIn 0.6s ease',
      }}>
        <span>Hari</span>
        <span style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: '#e01f37',
          animation: 'loaderPulse 1s ease infinite',
        }} />
      </div>

      {/* Loading bar */}
      <div style={{
        width: '120px',
        height: '3px',
        borderRadius: '100px',
        background: 'rgba(240, 236, 227, 0.1)',
        overflow: 'hidden',
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: '100px',
          background: '#e01f37',
          animation: 'loaderBar 1.2s ease forwards',
        }} />
      </div>

      <style>{`
        @keyframes loaderFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes loaderPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }

        @keyframes loaderBar {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}
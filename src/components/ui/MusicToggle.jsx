'use client'

import { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = new Audio('/music/ambient.mp3')
    audio.loop = true
    audio.volume = 0.3
    audio.preload = 'auto'
    audioRef.current = audio

    audio.addEventListener('canplaythrough', () => {
      setIsLoaded(true)
    })

    // Pause when tab is hidden
    const handleVisibility = () => {
      if (document.hidden && audioRef.current) {
        audioRef.current.pause()
      } else if (!document.hidden && isPlaying && audioRef.current) {
        audioRef.current.play().catch(() => {})
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Update play state when isPlaying changes from visibility handler
  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false)
      })
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  const toggle = () => {
    setIsPlaying(prev => !prev)
  }

  if (!isLoaded) return null

  return (
    <button
      onClick={toggle}
      style={{
        position: 'fixed',
        bottom: '32px',
        left: '32px',
        zIndex: 9999,
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: isPlaying
          ? 'rgba(224, 31, 55, 0.9)'
          : 'rgba(1, 44, 86, 0.7)',
        border: '1px solid rgba(240, 236, 227, 0.15)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#f0ece3',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
        boxShadow: isPlaying
          ? '0 0 20px rgba(224, 31, 55, 0.3)'
          : '0 4px 15px rgba(0, 0, 0, 0.2)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
      }}
      title={isPlaying ? 'Mute Music' : 'Play Music'}
    >
      {isPlaying ? (
        <Volume2 size={18} />
      ) : (
        <VolumeX size={18} />
      )}

      {/* Sound wave animation when playing */}
      {isPlaying && (
        <div style={{
          position: 'absolute',
          top: '-4px',
          right: '-4px',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          border: '2px solid #e01f37',
          animation: 'musicPulse 1.5s ease infinite',
        }} />
      )}

      <style>{`
        @keyframes musicPulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </button>
  )
}
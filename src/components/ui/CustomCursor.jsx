'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.innerWidth < 768) return

    const dot = dotRef.current
    if (!dot) return

    let mouseX = 0
    let mouseY = 0
    let dotX = 0
    let dotY = 0

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })

    let animationId

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Smooth follow
      dotX += (mouseX - dotX) * 0.15
      dotY += (mouseY - dotY) * 0.15

      dot.style.transform = `translate(${dotX}px, ${dotY}px)`
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="hidden md:block"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 99999,
          pointerEvents: 'none',
          width: isHovering ? '40px' : '12px',
          height: isHovering ? '40px' : '12px',
          marginLeft: isHovering ? '-20px' : '-6px',
          marginTop: isHovering ? '-20px' : '-6px',
          borderRadius: '50%',
          background: isHovering ? 'rgba(224, 31, 55, 0.15)' : '#e01f37',
          border: isHovering ? '2px solid #e01f37' : 'none',
          transition: 'width 0.2s, height 0.2s, margin 0.2s, background 0.2s, border 0.2s',
        }}
      />

      <style>{`
        @media (min-width: 768px) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  )
}
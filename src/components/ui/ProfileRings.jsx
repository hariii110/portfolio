'use client'

import { useState, useEffect } from 'react'

const skillLogos = [
  { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/ffffff' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
]

export default function ProfileRings({ size = 200, shape = 'circle' }) {
  const [hovered, setHovered] = useState(-1)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const orbitR = size * 0.7
  const containerSize = isMobile ? size + 20 : size + orbitR * 2 + 80
  const center = containerSize / 2
  const iconSize = 30
  const borderRadius = shape === 'square' ? '20px' : '50%'
  const total = skillLogos.length

  return (
    <div style={{
      width: `${containerSize}px`,
      height: `${containerSize}px`,
      position: 'relative',
    }}>

      {/* Desktop only - orbit rings and icons */}
      {!isMobile && (
        <>
          {/* Orbit ring outer */}
          <div style={{
            position: 'absolute',
            width: `${orbitR * 2 + 30}px`,
            height: `${orbitR * 2 + 30}px`,
            borderRadius: '50%',
            border: '1px solid rgba(224, 31, 55, 0.06)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }} />

          {/* Orbit ring main */}
          <div style={{
            position: 'absolute',
            width: `${orbitR * 2}px`,
            height: `${orbitR * 2}px`,
            borderRadius: '50%',
            border: '1px dashed rgba(240, 236, 227, 0.08)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }} />

          {/* Orbit ring inner */}
          <div style={{
            position: 'absolute',
            width: `${orbitR * 2 - 30}px`,
            height: `${orbitR * 2 - 30}px`,
            borderRadius: '50%',
            border: '1px solid rgba(26, 74, 122, 0.08)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }} />

          {/* Glow */}
          <div style={{
            position: 'absolute',
            width: `${size + 50}px`,
            height: `${size + 50}px`,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(224, 31, 55, 0.08) 0%, rgba(26, 74, 122, 0.06) 40%, transparent 70%)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }} />

          {/* Rotating wrapper */}
          <div
            className="orbit-wrapper"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0, left: 0,
            }}
          >
            {skillLogos.map((skill, i) => {
              const angle = (360 / total) * i
              const radian = (angle * Math.PI) / 180
              const isHov = hovered === i

              const x = center + Math.cos(radian - Math.PI / 2) * orbitR - iconSize / 2
              const y = center + Math.sin(radian - Math.PI / 2) * orbitR - iconSize / 2

              return (
                <div
                  key={skill.name}
                  className="orbit-icon"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(-1)}
                  style={{
                    position: 'absolute',
                    left: `${x}px`,
                    top: `${y}px`,
                    width: `${iconSize}px`,
                    height: `${iconSize}px`,
                    borderRadius: '10px',
                    background: isHov
                      ? 'rgba(224, 31, 55, 0.15)'
                      : 'rgba(1, 44, 86, 0.7)',
                    border: isHov
                      ? '1.5px solid rgba(224, 31, 55, 0.4)'
                      : '1px solid rgba(10, 61, 110, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'background 0.3s, border 0.3s, box-shadow 0.3s, transform 0.3s',
                    zIndex: isHov ? 10 : 1,
                    boxShadow: isHov
                      ? '0 6px 20px rgba(224, 31, 55, 0.2)'
                      : '0 2px 6px rgba(0, 0, 0, 0.15)',
                    transform: isHov ? 'scale(1.25)' : 'scale(1)',
                  }}
                >
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    width={isHov ? 20 : 16}
                    height={isHov ? 20 : 16}
                    style={{ objectFit: 'contain', transition: 'all 0.3s' }}
                  />

                  {isHov && (
                    <div style={{
                      position: 'absolute',
                      bottom: `${iconSize + 8}px`,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: 'rgba(1, 29, 58, 0.9)',
                      border: '1px solid rgba(224, 31, 55, 0.3)',
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      color: '#f0ece3',
                      whiteSpace: 'nowrap',
                      zIndex: 20,
                    }}>
                      {skill.name}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* Mobile only - simple glow ring */}
      {isMobile && (
        <div style={{
          position: 'absolute',
          width: `${size + 16}px`,
          height: `${size + 16}px`,
          borderRadius: '50%',
          border: '2px solid rgba(224, 31, 55, 0.15)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 20px rgba(224, 31, 55, 0.08)',
          pointerEvents: 'none',
        }} />
      )}

      {/* Profile Image */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius,
        overflow: 'hidden',
        border: '3px solid rgba(240, 236, 227, 0.15)',
        zIndex: 5,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        background: 'rgba(1, 44, 86, 0.5)',
      }}>
        <img
          src="/images/profile.jpg"
          alt="Hari Narayan"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.parentElement.innerHTML = `
              <div style="
                width: 100%; height: 100%;
                display: flex; align-items: center; justify-content: center;
                background: linear-gradient(135deg, #012c56, #0a3d6e);
                font-size: 3rem; font-weight: 700; color: #f0ece3;
              ">HN</div>
            `
          }}
        />
      </div>

      <style>{`
        .orbit-wrapper {
          animation: orbitSpin 45s linear infinite;
          transform-origin: center center;
        }
        .orbit-icon {
          animation: counterSpin 45s linear infinite;
          transform-origin: center center;
        }
        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes counterSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  )
}
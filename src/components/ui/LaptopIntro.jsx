'use client'

import { useState, useEffect } from 'react'

export default function LaptopIntro({ onComplete }) {
  const [phase, setPhase] = useState('blank1')
  const [currentLetter, setCurrentLetter] = useState('')
  const [foundLetters, setFoundLetters] = useState([])
  const [colorPhase, setColorPhase] = useState('none')
  const [showLogo, setShowLogo] = useState(false)
  const [showLine, setShowLine] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [fadeText, setFadeText] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    let timeouts = []
    let letterInterval = null
    let t = 0

    function scrollLetters(letters, speed, onDone) {
      let idx = 0
      const arr = letters.split('')
      if (letterInterval) clearInterval(letterInterval)
      letterInterval = setInterval(() => {
        if (idx < arr.length) {
          setCurrentLetter(arr[idx])
          idx++
        } else {
          clearInterval(letterInterval)
          letterInterval = null
          if (onDone) onDone()
        }
      }, speed)
    }

    // Blank - 500ms
    t += 500
    timeouts.push(setTimeout(() => setPhase('alphabet'), t))

    // H: A→H at 80ms
    timeouts.push(setTimeout(() => {
      scrollLetters('ABCDEFGH', 80, () => {
        setFoundLetters(['H']); setCurrentLetter('')
      })
    }, t))
    t += 8 * 80 + 200

    // A: H→A at 80ms
    timeouts.push(setTimeout(() => {
      scrollLetters('HGFEDCBA', 80, () => {
        setFoundLetters(['H', 'A']); setCurrentLetter('')
      })
    }, t))
    t += 8 * 80 + 200

    // R: A→R at 50ms
    timeouts.push(setTimeout(() => {
      scrollLetters('ABCDEFGHIJKLMNOPQR', 50, () => {
        setFoundLetters(['H', 'A', 'R']); setCurrentLetter('')
      })
    }, t))
    t += 18 * 50 + 200

    // I: R→I at 60ms
    timeouts.push(setTimeout(() => {
      scrollLetters('RQPONMLKJI', 60, () => {
        setFoundLetters(['H', 'A', 'R', 'I'])
        setCurrentLetter('')
        setPhase('coloring')
      })
    }, t))
    t += 10 * 60 + 300

    // Colors
    timeouts.push(setTimeout(() => setColorPhase('I'), t)); t += 250
    timeouts.push(setTimeout(() => setColorPhase('IR'), t)); t += 250
    timeouts.push(setTimeout(() => setColorPhase('IRA'), t)); t += 250
    timeouts.push(setTimeout(() => setColorPhase('IRAH'), t)); t += 400

    // Logo
    timeouts.push(setTimeout(() => setShowLogo(true), t)); t += 500

    // Line
    timeouts.push(setTimeout(() => setShowLine(true), t)); t += 350

    // Subtitle
    timeouts.push(setTimeout(() => setShowSubtitle(true), t)); t += 800

    // Fade
    timeouts.push(setTimeout(() => setFadeText(true), t)); t += 400

    // Blank
    timeouts.push(setTimeout(() => setPhase('blank2'), t)); t += 350

    // Laptop
    timeouts.push(setTimeout(() => setPhase('falling'), t)); t += 800
    timeouts.push(setTimeout(() => setPhase('impact'), t)); t += 120
    timeouts.push(setTimeout(() => setPhase('bounce'), t)); t += 800
    timeouts.push(setTimeout(() => setPhase('settle'), t)); t += 300
    timeouts.push(setTimeout(() => setPhase('open'), t)); t += 700
    timeouts.push(setTimeout(() => setPhase('screen'), t)); t += 400
    timeouts.push(setTimeout(() => setPhase('zoom'), t)); t += 900
    timeouts.push(setTimeout(() => setPhase('done'), t)); t += 400

    // Complete
    timeouts.push(setTimeout(() => {
      document.body.style.overflow = ''
      if (onComplete) onComplete()
    }, t))

    return () => {
      timeouts.forEach(clearTimeout)
      if (letterInterval) clearInterval(letterInterval)
      document.body.style.overflow = ''
    }
  }, [onComplete])

  if (phase === 'done') {
    return (
      <div style={{
        position: 'fixed', inset: 0,
        background: '#011d3a',
        zIndex: 999999,
        opacity: 0,
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none',
      }} />
    )
  }

  const getLetterColor = (letter) => {
    if (colorPhase === 'none') return '#f0ece3'
    if (letter === 'H' && colorPhase.includes('H')) return '#1a4a7a'
    if (colorPhase.includes(letter)) return '#e01f37'
    return '#f0ece3'
  }

  const getLetterGlow = (letter) => {
    if (!colorPhase.includes(letter)) return 'none'
    if (letter === 'H') return '0 0 30px rgba(26, 74, 122, 0.5)'
    return '0 0 30px rgba(224, 31, 55, 0.5)'
  }

  const showNameSection = phase === 'alphabet' || phase === 'coloring'
  const showLaptop = ['falling', 'impact', 'bounce', 'settle', 'open', 'screen', 'zoom'].includes(phase)
  const isLidOpen = ['open', 'screen', 'zoom'].includes(phase)
  const showScreenContent = phase === 'screen' || phase === 'zoom'
  const showGlow = ['open', 'screen', 'zoom'].includes(phase)

  const getLaptopStyle = () => {
    switch (phase) {
      case 'falling': return { animation: 'laptopFall 0.6s cubic-bezier(0.55, 0, 1, 0.45) forwards' }
      case 'impact': return { transform: 'translateY(0)', animation: 'laptopImpact 0.12s ease forwards' }
      case 'bounce': return { animation: 'laptopBounce 0.8s ease forwards' }
      case 'settle': case 'open': case 'screen': return { transform: 'translateY(0)' }
      case 'zoom': return { transform: 'translateY(-20%) scale(10)', transition: 'all 0.9s cubic-bezier(0.4, 0, 0, 1)' }
      default: return { transform: 'translateY(-120vh)', opacity: 0 }
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#011d3a',
      zIndex: 999999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>

      {/* NAME */}
      <div style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: fadeText ? 0 : showNameSection ? 1 : 0,
        transform: fadeText ? 'scale(0.9) translateY(-20px)' : 'none',
        transition: fadeText ? 'all 0.5s ease' : 'opacity 0.3s ease',
        zIndex: 5,
      }}>
        {currentLetter && foundLetters.length < 4 && (
          <div style={{
            fontSize: 'clamp(0.9rem, 1.8vw, 1.3rem)',
            color: 'rgba(240, 236, 227, 0.2)',
            marginBottom: '12px',
            textAlign: 'center',
          }}>
            {currentLetter}
          </div>
        )}

        {(!currentLetter || foundLetters.length >= 4) && <div style={{ height: '32px' }} />}

        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', minHeight: '80px' }}>
          {foundLetters.map((letter, i) => (
            <div key={`${letter}-${i}`} style={{
              fontSize: 'clamp(2.8rem, 7vw, 5rem)',
              fontWeight: 700,
              color: getLetterColor(letter),
              transition: 'all 0.4s ease',
              transform: colorPhase.includes(letter) ? 'scale(1.08)' : 'scale(1)',
              textShadow: getLetterGlow(letter),
            }}>
              {letter}
            </div>
          ))}

          {currentLetter && foundLetters.length < 4 && (
            <div style={{
              fontSize: 'clamp(2.8rem, 7vw, 5rem)',
              fontWeight: 700, color: '#f0ece3', opacity: 0.4,
              minWidth: '55px', textAlign: 'center',
            }}>
              {currentLetter}
            </div>
          )}

          {showLogo && (
            <div style={{ marginLeft: '10px', animation: 'logoAppear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}>
              <div style={{
                width: 'clamp(14px, 2.5vw, 22px)',
                height: 'clamp(14px, 2.5vw, 22px)',
                borderRadius: '50%',
                background: '#e01f37',
                boxShadow: '0 0 20px rgba(224, 31, 55, 0.5)',
                animation: 'logoPulse 1.8s ease infinite',
              }} />
            </div>
          )}
        </div>

        <div style={{
          width: showLine ? '140px' : '0px', height: '3px',
          borderRadius: '100px',
          background: 'linear-gradient(90deg, #1a4a7a, #e01f37)',
          transition: 'width 0.5s ease',
          marginTop: '12px',
        }} />

        <div style={{
          fontSize: 'clamp(0.65rem, 1.4vw, 0.85rem)',
          fontWeight: 400, letterSpacing: '0.35em',
          textTransform: 'uppercase', marginTop: '16px',
          color: showSubtitle ? 'rgba(240, 236, 227, 0.4)' : 'rgba(240, 236, 227, 0)',
          transition: 'color 0.6s ease',
        }}>
          Full Stack Developer
        </div>
      </div>

      {/* LAPTOP */}
      {showLaptop && (
        <div style={{
          position: 'absolute',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', zIndex: 12,
          willChange: 'transform',
          ...getLaptopStyle(),
        }}>
          <div style={{
            position: 'relative',
            width: 'clamp(260px, 35vw, 380px)',
            perspective: '1200px',
          }}>
            {showGlow && (
              <div style={{
                position: 'absolute', top: '-80px', left: '50%',
                transform: 'translateX(-50%)',
                width: '200%', height: '120px',
                background: 'radial-gradient(ellipse at center bottom, rgba(14, 80, 140, 0.15) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />
            )}

            <div style={{
              width: '100%',
              transformOrigin: 'bottom center',
              transform: isLidOpen ? 'rotateX(0deg)' : 'rotateX(-175deg)',
              transition: isLidOpen ? 'transform 0.7s cubic-bezier(0.34, 1.3, 0.64, 1)' : 'none',
              position: 'relative', zIndex: 2,
              willChange: 'transform',
            }}>
              <div style={{
                width: '100%', aspectRatio: '16/10',
                borderRadius: '12px 12px 0 0',
                border: '3px solid #2a4a6e',
                borderBottom: 'none',
                background: '#0a1e36',
                overflow: 'hidden', position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: '6px', left: '50%',
                  transform: 'translateX(-50%)',
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: '#1a3456', border: '1px solid #2a4a6e', zIndex: 5,
                }} />

                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '20px', background: '#1a3456',
                  display: 'flex', alignItems: 'center', paddingLeft: '12px', gap: '4px', zIndex: 4,
                }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e01f37' }} />
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f0ece3', opacity: 0.2 }} />
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f0ece3', opacity: 0.2 }} />
                </div>

                <div style={{
                  padding: '28px 16px 16px', height: '100%',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: '6px',
                  opacity: showScreenContent ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }}>
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ width: '35px', height: '5px', borderRadius: '100px', background: '#f0ece3', opacity: 0.3 }} />
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} style={{ width: '16px', height: '3px', borderRadius: '100px', background: '#f0ece3', opacity: 0.15 }} />
                      ))}
                    </div>
                  </div>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, #f0ece3, #e01f37)', marginBottom: '6px' }} />
                  <div style={{ width: '70px', height: '5px', borderRadius: '100px', background: '#f0ece3', opacity: 0.4 }} />
                  <div style={{ width: '90px', height: '3px', borderRadius: '100px', background: '#e01f37', opacity: 0.6, marginTop: '2px' }} />
                  <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
                    <div style={{ width: '32px', height: '10px', borderRadius: '5px', background: '#e01f37' }} />
                    <div style={{ width: '32px', height: '10px', borderRadius: '5px', border: '1px solid rgba(240, 236, 227, 0.3)' }} />
                  </div>
                </div>
              </div>
            </div>

            <div style={{ width: '100%', height: '4px', background: 'linear-gradient(180deg, #3a5a7e, #2a4a6e)', position: 'relative', zIndex: 3 }} />
            <div style={{ width: '100%', height: '8px', background: 'linear-gradient(180deg, #2a4a6e, #1e3a56)', borderRadius: '0 0 2px 2px' }} />
            <div style={{ width: '110%', marginLeft: '-5%', height: '6px', borderRadius: '0 0 6px 6px', background: 'linear-gradient(180deg, #2a4a6e, #1a3456)' }} />
            <div style={{ width: '50px', height: '3px', borderRadius: '0 0 3px 3px', background: '#1a3456', margin: '0 auto' }} />
          </div>

          <div style={{
            width: '70%', height: '10px',
            borderRadius: '50%',
            background: showGlow ? 'rgba(14, 80, 140, 0.25)' : 'rgba(0, 0, 0, 0.4)',
            filter: 'blur(8px)',
            marginTop: '8px',
            opacity: phase === 'zoom' ? 0 : 0.6,
          }} />
        </div>
      )}

      {phase === 'impact' && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(240, 236, 227, 0.04)',
          animation: 'impactFlash 0.15s ease forwards',
          zIndex: 20, pointerEvents: 'none',
        }} />
      )}

      {phase === 'zoom' && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center 45%, rgba(14, 50, 90, 0.8) 0%, #011d3a 60%)',
          animation: 'fadeIn 0.6s ease forwards',
          zIndex: 0,
        }} />
      )}

      <style>{`
        @keyframes logoAppear {
          0% { transform: scale(0) rotate(-180deg); opacity: 0; }
          60% { transform: scale(1.15) rotate(10deg); opacity: 0.9; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes logoPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes laptopFall {
          0% { transform: translateY(-110vh) rotate(-3deg); }
          50% { transform: translateY(-30vh) rotate(-1deg); }
          80% { transform: translateY(-5vh) rotate(0); }
          100% { transform: translateY(0) rotate(0); }
        }
        @keyframes laptopImpact {
          0% { transform: scaleY(1) scaleX(1); }
          50% { transform: scaleY(0.85) scaleX(1.08); }
          100% { transform: scaleY(1) scaleX(1); }
        }
        @keyframes laptopBounce {
          0% { transform: translateY(0); }
          10% { transform: translateY(4px) scaleY(0.9); }
          25% { transform: translateY(-35px); }
          40% { transform: translateY(3px) scaleY(0.95); }
          55% { transform: translateY(-15px); }
          70% { transform: translateY(2px); }
          85% { transform: translateY(-5px); }
          100% { transform: translateY(0); }
        }
        @keyframes impactFlash {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
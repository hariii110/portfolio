

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
    let timeouts = []
    let t = 0

    // ================================
    // 1 SECOND BLANK
    // ================================
    t += 1000
    timeouts.push(setTimeout(() => setPhase('alphabet'), t))

    // ================================
    // FINDING H: A → H (slower - 120ms each)
    // ================================
    const lettersToH = 'ABCDEFGH'
    lettersToH.split('').forEach((letter, i) => {
      timeouts.push(setTimeout(() => {
        setCurrentLetter(letter)
      }, t + i * 120))
    })
    t += lettersToH.length * 120

    // Lock H
    timeouts.push(setTimeout(() => {
      setFoundLetters(['H'])
      setCurrentLetter('')
    }, t + 150))
    t += 400

    // ================================
    // FINDING A: H → A reverse (slower - 120ms)
    // ================================
    const lettersHtoA = 'HGFEDCBA'
    lettersHtoA.split('').forEach((letter, i) => {
      timeouts.push(setTimeout(() => {
        setCurrentLetter(letter)
      }, t + i * 120))
    })
    t += lettersHtoA.length * 120

    // Lock A
    timeouts.push(setTimeout(() => {
      setFoundLetters(['H', 'A'])
      setCurrentLetter('')
    }, t + 150))
    t += 400

    // ================================
    // FINDING R: A → R (slower - 90ms)
    // ================================
    const lettersAtoR = 'ABCDEFGHIJKLMNOPQR'
    lettersAtoR.split('').forEach((letter, i) => {
      timeouts.push(setTimeout(() => {
        setCurrentLetter(letter)
      }, t + i * 90))
    })
    t += lettersAtoR.length * 90

    // Lock R
    timeouts.push(setTimeout(() => {
      setFoundLetters(['H', 'A', 'R'])
      setCurrentLetter('')
    }, t + 150))
    t += 400

    // ================================
    // FINDING I: R → I reverse (slower - 100ms)
    // ================================
    const lettersRtoI = 'RQPONMLKJI'
    lettersRtoI.split('').forEach((letter, i) => {
      timeouts.push(setTimeout(() => {
        setCurrentLetter(letter)
      }, t + i * 100))
    })
    t += lettersRtoI.length * 100

    // Lock I
    timeouts.push(setTimeout(() => {
      setFoundLetters(['H', 'A', 'R', 'I'])
      setCurrentLetter('')
      setPhase('coloring')
    }, t + 150))
    t += 700

    // ================================
    // SLOW COLOR CHANGE
    // ================================
    timeouts.push(setTimeout(() => setColorPhase('I'), t))
    t += 500

    timeouts.push(setTimeout(() => setColorPhase('IR'), t))
    t += 500

    timeouts.push(setTimeout(() => setColorPhase('IRA'), t))
    t += 500

    timeouts.push(setTimeout(() => setColorPhase('IRAH'), t))
    t += 800

    // ================================
    // SLOW LOGO
    // ================================
    timeouts.push(setTimeout(() => setShowLogo(true), t))
    t += 900

    // ================================
    // LINE
    // ================================
    timeouts.push(setTimeout(() => setShowLine(true), t))
    t += 600

    // ================================
    // SUBTITLE
    // ================================
    timeouts.push(setTimeout(() => setShowSubtitle(true), t))
    t += 1400

    // ================================
    // FADE OUT
    // ================================
    timeouts.push(setTimeout(() => setFadeText(true), t))
    t += 700

    // ================================
    // 0.7s BLANK
    // ================================
    timeouts.push(setTimeout(() => setPhase('blank2'), t))
    t += 700

    // ================================
    // LAPTOP PHASES
    // ================================

    // Start falling
    timeouts.push(setTimeout(() => setPhase('falling'), t))
    t += 300

    // Hit ground
    timeouts.push(setTimeout(() => setPhase('impact'), t + 800))
    t += 800

    // Bounce
    timeouts.push(setTimeout(() => setPhase('bounce'), t))
    t += 1200

    // Settle
    timeouts.push(setTimeout(() => setPhase('settle'), t))
    t += 400

    // Open
    timeouts.push(setTimeout(() => setPhase('open'), t))
    t += 900

    // Screen
    timeouts.push(setTimeout(() => setPhase('screen'), t))
    t += 600

    // Zoom
    timeouts.push(setTimeout(() => setPhase('zoom'), t))
    t += 1300

    // Done
    timeouts.push(setTimeout(() => setPhase('done'), t))
    t += 700

    // Complete
    timeouts.push(setTimeout(() => {
      if (onComplete) onComplete()
    }, t))

    return () => timeouts.forEach(clearTimeout)
  }, [onComplete])

  if (phase === 'done') {
    return (
      <div style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        background: '#011d3a',
        zIndex: 999999,
        opacity: 0,
        transition: 'opacity 0.7s ease',
        pointerEvents: 'none',
      }} />
    )
  }

  // ================================
  // LETTER HELPERS
  // ================================
  const getLetterColor = (letter) => {
    if (colorPhase === 'none') return '#f0ece3'
    if (letter === 'H' && colorPhase.includes('H')) return '#1a4a7a'
    if (letter === 'A' && colorPhase.includes('A')) return '#e01f37'
    if (letter === 'R' && colorPhase.includes('R')) return '#e01f37'
    if (letter === 'I' && colorPhase.includes('I')) return '#e01f37'
    return '#f0ece3'
  }

  const getLetterGlow = (letter) => {
    if (!colorPhase.includes(letter)) return 'none'
    if (letter === 'H') return '0 0 30px rgba(26, 74, 122, 0.5)'
    return '0 0 30px rgba(224, 31, 55, 0.5)'
  }

  const getLetterScale = (letter) => {
    if (!colorPhase.includes(letter)) return 'scale(1)'
    return 'scale(1.08)'
  }

  // ================================
  // LAPTOP HELPERS
  // ================================
  const showNameSection = phase === 'alphabet' || phase === 'coloring'
  const showLaptop = phase === 'falling' || phase === 'impact' || phase === 'bounce' ||
                     phase === 'settle' || phase === 'open' || phase === 'screen' || phase === 'zoom'
  const isLidOpen = phase === 'open' || phase === 'screen' || phase === 'zoom'
  const showScreenContent = phase === 'screen' || phase === 'zoom'
  const showGlow = phase === 'open' || phase === 'screen' || phase === 'zoom'

  const getLaptopStyle = () => {
    switch (phase) {
      case 'falling':
        return {
          animation: 'laptopFall 0.8s cubic-bezier(0.55, 0, 1, 0.45) forwards',
        }
      case 'impact':
        return {
          transform: 'translateY(0) rotate(0deg)',
          opacity: 1,
          animation: 'laptopImpact 0.15s ease forwards',
        }
      case 'bounce':
        return {
          transform: 'translateY(0) rotate(0deg)',
          opacity: 1,
          animation: 'laptopBounce 1.2s ease forwards',
        }
      case 'settle':
      case 'open':
      case 'screen':
        return {
          transform: 'translateY(0) rotate(0deg)',
          opacity: 1,
        }
      case 'zoom':
        return {
          transform: 'translateY(-20%) scale(10)',
          opacity: 1,
          transition: 'all 1.3s cubic-bezier(0.4, 0, 0, 1)',
        }
      default:
        return {
          transform: 'translateY(-120vh) rotate(-5deg)',
          opacity: 0,
          transition: 'none',
        }
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100vw', height: '100vh',
      background: '#011d3a',
      zIndex: 999999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>

      {/* ================================
          NAME SECTION
      ================================ */}
      <div style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0px',
        opacity: fadeText ? 0 : (showNameSection ? 1 : 0),
        transform: fadeText ? 'scale(0.9) translateY(-20px)' : 'scale(1) translateY(0)',
        transition: fadeText ? 'all 0.6s ease' : 'all 0.3s ease',
        zIndex: 5,
      }}>

        {/* Scrolling letter */}
        {currentLetter && foundLetters.length < 4 && (
          <div style={{
            fontSize: 'clamp(0.9rem, 1.8vw, 1.3rem)',
            color: 'rgba(240, 236, 227, 0.2)',
            fontWeight: 400,
            letterSpacing: '0.2em',
            marginBottom: '12px',
            animation: 'letterFlicker 0.12s ease',
            textAlign: 'center',
          }}>
            {currentLetter}
          </div>
        )}

        {(!currentLetter || foundLetters.length >= 4) && (
          <div style={{ height: '32px' }} />
        )}

        {/* Found letters */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          minHeight: '80px',
        }}>
          {foundLetters.map((letter, i) => (
            <div
              key={`${letter}-${i}`}
              style={{
                fontSize: 'clamp(2.8rem, 7vw, 5rem)',
                fontWeight: 700,
                color: getLetterColor(letter),
                transition: 'all 0.45s ease',
                transform: getLetterScale(letter),
                textShadow: getLetterGlow(letter),
                animation: 'letterLock 0.4s ease',
                animationDelay: `${i * 0.05}s`,
              }}
            >
              {letter}
            </div>
          ))}

          {/* Scrolling position */}
          {currentLetter && foundLetters.length < 4 && (
            <div style={{
              fontSize: 'clamp(2.8rem, 7vw, 5rem)',
              fontWeight: 700,
              color: '#f0ece3',
              opacity: 0.4,
              animation: 'letterScroll 0.12s ease',
              minWidth: '55px',
              textAlign: 'center',
            }}>
              {currentLetter}
            </div>
          )}

          {/* Logo */}
          {showLogo && (
            <div style={{
              marginLeft: '10px',
              animation: 'logoAppear 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
            }}>
              <div style={{
                width: 'clamp(14px, 2.5vw, 22px)',
                height: 'clamp(14px, 2.5vw, 22px)',
                borderRadius: '50%',
                background: '#e01f37',
                boxShadow: '0 0 20px rgba(224, 31, 55, 0.5), 0 0 40px rgba(224, 31, 55, 0.2)',
                animation: 'logoPulse 1.8s ease infinite',
              }} />
            </div>
          )}
        </div>

        {/* Line */}
        <div style={{
          width: showLine ? '140px' : '0px',
          height: '3px',
          borderRadius: '100px',
          background: 'linear-gradient(90deg, #1a4a7a, #e01f37, #e01f37, #e01f37)',
          transition: 'width 0.7s ease',
          marginTop: '12px',
        }} />

        {/* Subtitle */}
        <div style={{
          fontSize: 'clamp(0.65rem, 1.4vw, 0.85rem)',
          color: 'rgba(240, 236, 227, 0)',
          fontWeight: 400,
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          marginTop: '16px',
          transition: 'all 0.8s ease',
          ...(showSubtitle && {
            color: 'rgba(240, 236, 227, 0.4)',
            animation: 'subtitleFadeIn 0.8s ease forwards',
          }),
        }}>
          Full Stack Developer
        </div>
      </div>

      {/* ================================
          LAPTOP
      ================================ */}
      {showLaptop && (
        <div style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 12,
          ...getLaptopStyle(),
        }}>
          <div style={{
            position: 'relative',
            width: 'clamp(260px, 35vw, 380px)',
            perspective: '1200px',
          }}>

            {/* Ambient glow */}
            {showGlow && (
              <>
                <div style={{
                  position: 'absolute',
                  top: '-80px', left: '50%',
                  transform: 'translateX(-50%)',
                  width: '200%', height: '120px',
                  background: 'radial-gradient(ellipse at center bottom, rgba(14, 80, 140, 0.15) 0%, transparent 70%)',
                  animation: 'ambientGlowIn 0.8s ease forwards',
                  pointerEvents: 'none', zIndex: 0,
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '-40px', left: '50%',
                  transform: 'translateX(-50%)',
                  width: '130%', height: '60px',
                  background: 'radial-gradient(ellipse at center top, rgba(14, 80, 140, 0.1) 0%, transparent 70%)',
                  animation: 'ambientGlowIn 1.2s ease forwards',
                  pointerEvents: 'none', zIndex: 0,
                }} />
              </>
            )}

            {/* Screen / Lid */}
            <div style={{
              width: '100%',
              transformOrigin: 'bottom center',
              transform: isLidOpen ? 'rotateX(0deg)' : 'rotateX(-175deg)',
              transition: isLidOpen
                ? 'transform 0.9s cubic-bezier(0.34, 1.3, 0.64, 1)'
                : 'none',
              position: 'relative', zIndex: 2,
            }}>
              <div style={{
                width: '100%',
                aspectRatio: '16/10',
                borderRadius: '12px 12px 0 0',
                border: '3px solid #2a4a6e',
                borderBottom: 'none',
                background: '#0a1e36',
                overflow: 'hidden',
                position: 'relative',
              }}>
                {/* Camera */}
                <div style={{
                  position: 'absolute', top: '6px', left: '50%',
                  transform: 'translateX(-50%)',
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: '#1a3456', border: '1px solid #2a4a6e', zIndex: 5,
                }} />

                {/* Bezel */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '20px', background: '#1a3456',
                  display: 'flex', alignItems: 'center', paddingLeft: '12px', gap: '4px', zIndex: 4,
                }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e01f37' }} />
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f0ece3', opacity: 0.2 }} />
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f0ece3', opacity: 0.2 }} />
                </div>

                {/* Screen content */}
                <div style={{
                  padding: '28px 16px 16px', height: '100%',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: '6px',
                  opacity: showScreenContent ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                }}>
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ width: '35px', height: '5px', borderRadius: '100px', background: '#f0ece3', opacity: 0.3 }} />
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} style={{ width: '16px', height: '3px', borderRadius: '100px', background: '#f0ece3', opacity: 0.15 }} />
                      ))}
                    </div>
                  </div>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, #f0ece3, #e01f37)', marginBottom: '6px', animation: showScreenContent ? 'screenGlow 1.5s ease infinite' : 'none' }} />
                  <div style={{ width: '70px', height: '5px', borderRadius: '100px', background: '#f0ece3', opacity: 0.4 }} />
                  <div style={{ width: '90px', height: '3px', borderRadius: '100px', background: '#e01f37', opacity: 0.6, marginTop: '2px' }} />
                  <div style={{ width: '80px', height: '3px', borderRadius: '100px', background: '#f0ece3', opacity: 0.12, marginTop: '2px' }} />
                  <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
                    <div style={{ width: '32px', height: '10px', borderRadius: '5px', background: '#e01f37' }} />
                    <div style={{ width: '32px', height: '10px', borderRadius: '5px', border: '1px solid rgba(240, 236, 227, 0.3)' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    {[1, 2, 3].map(i => (
                      <div key={i} style={{ width: '28px', height: '16px', borderRadius: '4px', background: i === 2 ? '#e01f37' : 'rgba(240, 236, 227, 0.1)' }} />
                    ))}
                  </div>
                </div>

                {showScreenContent && (
                  <>
                    <div style={{ position: 'absolute', top: '20px', left: 0, right: 0, bottom: 0, background: 'radial-gradient(ellipse at center, rgba(14, 50, 90, 0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: '-2px', left: '10%', right: '10%', height: '2px', background: 'rgba(71, 171, 210, 0.3)', borderRadius: '100px', animation: 'edgeGlow 2s ease infinite' }} />
                  </>
                )}
              </div>
            </div>

            {/* Hinge + Keyboard + Base */}
            <div style={{ width: '100%', height: '4px', background: 'linear-gradient(180deg, #3a5a7e, #2a4a6e)', position: 'relative', zIndex: 3 }} />
            <div style={{ width: '100%', height: '8px', background: 'linear-gradient(180deg, #2a4a6e, #1e3a56)', borderRadius: '0 0 2px 2px' }} />
            <div style={{ width: '110%', marginLeft: '-5%', height: '6px', borderRadius: '0 0 6px 6px', background: 'linear-gradient(180deg, #2a4a6e, #1a3456)' }} />
            <div style={{ width: '50px', height: '3px', borderRadius: '0 0 3px 3px', background: '#1a3456', margin: '0 auto' }} />
          </div>

          {/* Shadow */}
          <div style={{
            width: (phase === 'impact' || phase === 'bounce') ? '95%' : '70%',
            height: phase === 'impact' ? '14px' : '10px',
            borderRadius: '50%',
            background: showGlow ? 'rgba(14, 80, 140, 0.25)' : 'rgba(0, 0, 0, 0.4)',
            filter: (phase === 'impact' || phase === 'bounce') ? 'blur(16px)' : 'blur(8px)',
            marginTop: '8px',
            transition: 'all 0.3s ease',
            opacity: phase === 'zoom' ? 0 : phase === 'falling' ? 0.3 : 0.6,
          }} />
        </div>
      )}

      {/* Impact flash */}
      {phase === 'impact' && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100vw', height: '100vh',
          background: 'rgba(240, 236, 227, 0.04)',
          animation: 'impactFlash 0.2s ease forwards',
          zIndex: 20,
          pointerEvents: 'none',
        }} />
      )}

      {/* Zoom light */}
      {phase === 'zoom' && (
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '100vw', height: '100vh',
          background: 'radial-gradient(ellipse at center 45%, rgba(14, 50, 90, 0.8) 0%, #011d3a 60%)',
          animation: 'screenLight 0.8s ease forwards',
          zIndex: 0,
        }} />
      )}

      {/* ANIMATIONS */}
      <style>{`
        @keyframes letterFlicker {
          0% { opacity: 0.1; transform: translateY(6px); }
          50% { opacity: 0.25; }
          100% { opacity: 0.2; transform: translateY(0); }
        }
        @keyframes letterScroll {
          from { opacity: 0.15; transform: translateY(-8px); }
          to { opacity: 0.4; transform: translateY(0); }
        }
        @keyframes letterLock {
          0% { transform: scale(1.5); opacity: 0.3; }
          30% { transform: scale(0.9); }
          60% { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes logoAppear {
          0% { transform: scale(0) rotate(-180deg); opacity: 0; }
          50% { transform: scale(1.25) rotate(15deg); opacity: 0.8; }
          75% { transform: scale(0.95) rotate(-5deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes logoPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(224, 31, 55, 0.5); }
          50% { transform: scale(1.12); box-shadow: 0 0 30px rgba(224, 31, 55, 0.7); }
        }
        @keyframes subtitleFadeIn {
          from { opacity: 0; transform: translateY(10px); letter-spacing: 0.6em; }
          to { opacity: 0.4; transform: translateY(0); letter-spacing: 0.35em; }
        }

        @keyframes laptopFall {
          0% {
            transform: translateY(-110vh) rotate(-3deg);
            opacity: 1;
          }
          40% {
            transform: translateY(-40vh) rotate(-1.5deg);
          }
          70% {
            transform: translateY(-10vh) rotate(-0.5deg);
          }
          85% {
            transform: translateY(-2vh) rotate(0deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }

        @keyframes laptopImpact {
          0% {
            transform: translateY(0) scaleY(1) scaleX(1);
          }
          50% {
            transform: translateY(8px) scaleY(0.82) scaleX(1.1);
          }
          100% {
            transform: translateY(0) scaleY(1) scaleX(1);
          }
        }

        @keyframes laptopBounce {
          0% {
            transform: translateY(0) scaleY(1) scaleX(1);
          }
          5% {
            transform: translateY(6px) scaleY(0.88) scaleX(1.06);
          }
          15% {
            transform: translateY(-50px) scaleY(1.06) scaleX(0.97);
          }
          25% {
            transform: translateY(4px) scaleY(0.92) scaleX(1.04);
          }
          35% {
            transform: translateY(-25px) scaleY(1.03) scaleX(0.99);
          }
          45% {
            transform: translateY(3px) scaleY(0.96) scaleX(1.02);
          }
          55% {
            transform: translateY(-12px) scaleY(1.02) scaleX(0.99);
          }
          65% {
            transform: translateY(2px) scaleY(0.98) scaleX(1.01);
          }
          75% {
            transform: translateY(-5px) scaleY(1.01) scaleX(1);
          }
          85% {
            transform: translateY(1px) scaleY(0.99) scaleX(1);
          }
          92% {
            transform: translateY(-2px) scaleY(1);
          }
          100% {
            transform: translateY(0) scaleY(1) scaleX(1);
          }
        }

        @keyframes impactFlash {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes screenGlow {
          0%, 100% { opacity: 0.8; box-shadow: 0 0 10px rgba(224, 31, 55, 0.2); }
          50% { opacity: 1; box-shadow: 0 0 20px rgba(224, 31, 55, 0.4); }
        }
        @keyframes ambientGlowIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes edgeGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes screenLight {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
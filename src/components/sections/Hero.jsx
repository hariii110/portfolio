'use client'

import { useEffect, useState } from 'react'
import personal from '@/data/personal'

function useTypingEffect(words, speed = 80, pause = 2500) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPausing, setIsPausing] = useState(false)

  useEffect(() => {
    if (isPausing) return

    const current = words[wordIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, charIndex + 1))
        setCharIndex((prev) => prev + 1)

        if (charIndex + 1 === current.length) {
          setIsPausing(true)
          setTimeout(() => {
            setIsPausing(false)
            setIsDeleting(true)
          }, pause)
        }
      } else {
        setText(current.slice(0, charIndex - 1))
        setCharIndex((prev) => prev - 1)

        if (charIndex - 1 === 0) {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? 40 : speed)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, wordIndex, words, speed, pause, isPausing])

  return text
}

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  const roles = [
    'Full Stack Developer',
    'React.js Developer',
    'Node.js Developer',
    'MERN Stack Developer',
  ]

  const typedText = useTypingEffect(roles)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  if (!mounted) return null

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '140px 24px 100px',
        position: 'relative',
        overflow: 'hidden',
        background: 'transparent',
      }}
    >
      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '48px',
          }}
        >
          {/* Profile */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                padding: '4px',
                background: 'linear-gradient(135deg, #f0ece3, #e01f37)',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: '#012c56',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '5rem',
                }}
              >
                👨‍💻
              </div>
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: '8px',
                right: '-24px',
                background: '#e01f37',
                borderRadius: '100px',
                padding: '6px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 24px rgba(224,31,55,0.3)',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#f0ece3',
                  animation: 'pulse 2s infinite',
                }}
              />
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#ffffff',
                }}
              >
                Available
              </span>
            </div>
          </div>

          {/* Text */}
          <div style={{ textAlign: 'center', maxWidth: '800px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 22px',
                borderRadius: '100px',
                fontSize: '0.8rem',
                fontWeight: 700,
                background: 'rgba(240, 236, 227, 0.1)',
                color: '#f0ece3',
                border: '1px solid rgba(240, 236, 227, 0.2)',
                marginBottom: '36px',
              }}
            >
              <span>👋</span>
              <span>Hello, Welcome to my Portfolio</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '24px',
                color: '#f0ece3',
              }}
            >
              I&apos;m <span className="gradient-text">{personal.name}</span>
            </h1>

            <div
              style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
                fontWeight: 400,
                color: '#7a9abb',
                marginBottom: '28px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <span>I&apos;m a </span>
              <span style={{ color: '#e01f37', fontWeight: 700 }}>
                {typedText}
                <span
                  style={{
                    color: '#f0ece3',
                    animation: 'pulse 1s infinite',
                    fontWeight: 300,
                  }}
                >
                  |
                </span>
              </span>
            </div>

            <p
              style={{
                fontSize: '1.05rem',
                color: '#7a9abb',
                lineHeight: 2,
                maxWidth: '580px',
                margin: '0 auto 52px',
              }}
            >
              I love building clean, fast and user-friendly web applications.
              Turning ideas into real products with modern technologies.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '16px',
                marginBottom: '80px',
              }}
            >
              <button onClick={() => scrollTo('#projects')} className="btn-primary">
                View My Work 🚀
              </button>

              <button onClick={() => scrollTo('#contact')} className="btn-outline">
                Contact Me 📩
              </button>

              <a
                href={personal.resumeUrl}
                download
                className="btn-ghost"
                style={{ textDecoration: 'none' }}
              >
                Download CV 📄
              </a>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '48px',
                flexWrap: 'wrap',
              }}
            >
              {[
                { number: '1+', label: 'Years Learning' },
                { number: '5+', label: 'Projects Built' },
                { number: '1', label: 'Internship' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    textAlign: 'center',
                    padding: '24px 32px',
                    borderRadius: '20px',
                    background: i === 1 ? '#e01f37' : '#f0ece3',
                    minWidth: '140px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '2.2rem',
                      fontWeight: 700,
                      color: i === 1 ? '#ffffff' : '#012c56',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {stat.number}
                  </div>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      color: i === 1 ? '#f8d0d5' : '#3a5f85',
                      marginTop: '4px',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll */}
          <button
            onClick={() => scrollTo('#about')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#7a9abb',
              marginTop: '32px',
            }}
          >
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Scroll Down
            </span>
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ animation: 'bounce 2s infinite' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
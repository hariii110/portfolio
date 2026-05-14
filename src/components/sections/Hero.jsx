'use client'

import { useEffect, useState } from 'react'
import personal from '@/data/personal'
import ScrollReveal from '@/components/ui/ScrollReveal'
import CountUp from '@/components/ui/CountUp'
import MagnetButton from '@/components/ui/MagnetButton'
import ProfileRings from '@/components/ui/ProfileRings'
import {
  Rocket,
  Mail,
  FileDown,
  ChevronDown,
  Zap,
  MapPin,
  Code2,
  Terminal,
  Braces,
} from 'lucide-react'

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
          setTimeout(() => { setIsPausing(false); setIsDeleting(true) }, pause)
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

  useEffect(() => { setMounted(true) }, [])

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  if (!mounted) return null

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 24px 40px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Floating code decorations */}
      <div style={{
        position: 'absolute', top: '15%', left: '5%',
        opacity: 0.04, fontSize: '0.7rem', color: '#f0ece3',
        fontFamily: 'monospace', lineHeight: 1.8,
        pointerEvents: 'none', transform: 'rotate(-5deg)',
      }}>
        {'const dev = {\n  name: "Hari",\n  role: "Developer",\n  passion: true\n}'}
      </div>

      <div style={{
        position: 'absolute', bottom: '20%', right: '5%',
        opacity: 0.04, fontSize: '0.7rem', color: '#f0ece3',
        fontFamily: 'monospace', lineHeight: 1.8,
        pointerEvents: 'none', transform: 'rotate(3deg)',
      }}>
        {'function build() {\n  return ideas\n    .map(code)\n    .deploy()\n}'}
      </div>

      {/* Floating icons */}
      <div style={{
        position: 'absolute', top: '20%', right: '12%',
        animation: 'float1 6s ease-in-out infinite',
        opacity: 0.08, pointerEvents: 'none',
      }}>
        <Code2 size={30} color="#e01f37" />
      </div>
      <div style={{
        position: 'absolute', bottom: '25%', left: '10%',
        animation: 'float2 7s ease-in-out infinite',
        opacity: 0.08, pointerEvents: 'none',
      }}>
        <Terminal size={28} color="#1a4a7a" />
      </div>
      <div style={{
        position: 'absolute', top: '40%', left: '8%',
        animation: 'float3 5s ease-in-out infinite',
        opacity: 0.06, pointerEvents: 'none',
      }}>
        <Braces size={24} color="#f0ece3" />
      </div>

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}>

          {/* Profile with side panels */}
<ScrollReveal direction="scale" duration={0.8}>
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    position: 'relative',
  }} id="hero-profile-row">

    {/* Left side - Quick facts */}
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      alignItems: 'flex-end',
      opacity: 0.8,
    }} className="hero-side-panel">
      {[
        { label: 'Based in', value: 'Kochi, India', icon: '📍' },
        { label: 'Education', value: 'BCA Student', icon: '🎓' },
        { label: 'Focus', value: 'Full Stack', icon: '💻' },
      ].map((item) => (
        <div
          key={item.label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 14px',
            borderRadius: '10px',
            background: 'rgba(1, 44, 86, 0.4)',
            border: '1px solid rgba(10, 61, 110, 0.4)',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.3s ease',
            cursor: 'default',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(224, 31, 55, 0.4)'
            e.currentTarget.style.transform = 'translateX(-4px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(10, 61, 110, 0.4)'
            e.currentTarget.style.transform = 'translateX(0)'
          }}
        >
          <div>
            <p style={{
              fontSize: '0.55rem', fontWeight: 700,
              color: '#7a9abb', textTransform: 'uppercase',
              letterSpacing: '0.08em', textAlign: 'right',
            }}>
              {item.label}
            </p>
            <p style={{
              fontSize: '0.72rem', fontWeight: 700,
              color: '#f0ece3', textAlign: 'right',
            }}>
              {item.value}
            </p>
          </div>
          <div style={{
            width: '30px', height: '30px',
            borderRadius: '8px',
            background: 'rgba(224, 31, 55, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.85rem',
            flexShrink: 0,
          }}>
            {item.icon}
          </div>
        </div>
      ))}
    </div>

    {/* Center - Profile */}
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <ProfileRings size={170} shape="circle" />

      {/* Available */}
      <div style={{
        position: 'absolute',
        bottom: '10px', right: '-16px',
        background: 'rgba(34, 197, 94, 0.15)',
        border: '1px solid rgba(34, 197, 94, 0.4)',
        borderRadius: '100px',
        padding: '4px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        backdropFilter: 'blur(8px)',
        zIndex: 10,
      }}>
        <div style={{
          width: '5px', height: '5px', borderRadius: '50%',
          background: '#22c55e',
          animation: 'pulse 2s ease infinite',
        }} />
        <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#22c55e' }}>
          Available
        </span>
      </div>
    </div>

    {/* Right side - Experience highlights */}
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      alignItems: 'flex-start',
      opacity: 0.8,
    }} className="hero-side-panel">
      {[
        { label: 'Experience', value: 'MERN Stack', icon: '🚀' },
        { label: 'Intern at', value: 'Zeros & Ones', icon: '🏢' },
        { label: 'Passion', value: 'Clean Code', icon: '✨' },
      ].map((item) => (
        <div
          key={item.label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 14px',
            borderRadius: '10px',
            background: 'rgba(1, 44, 86, 0.4)',
            border: '1px solid rgba(10, 61, 110, 0.4)',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.3s ease',
            cursor: 'default',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(224, 31, 55, 0.4)'
            e.currentTarget.style.transform = 'translateX(4px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(10, 61, 110, 0.4)'
            e.currentTarget.style.transform = 'translateX(0)'
          }}
        >
          <div style={{
            width: '30px', height: '30px',
            borderRadius: '8px',
            background: 'rgba(224, 31, 55, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.85rem',
            flexShrink: 0,
          }}>
            {item.icon}
          </div>
          <div>
            <p style={{
              fontSize: '0.55rem', fontWeight: 700,
              color: '#7a9abb', textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}>
              {item.label}
            </p>
            <p style={{
              fontSize: '0.72rem', fontWeight: 700,
              color: '#f0ece3',
            }}>
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</ScrollReveal>

          {/* Text Content */}
          <div style={{ textAlign: 'center', maxWidth: '800px' }}>

            {/* Greeting */}
            <ScrollReveal delay={0.2}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '100px',
                fontSize: '0.75rem',
                fontWeight: 700,
                background: 'rgba(224, 31, 55, 0.08)',
                color: '#f0ece3',
                border: '1px solid rgba(224, 31, 55, 0.2)',
                marginBottom: '20px',
              }}>
                <span style={{
                  display: 'inline-block',
                  animation: 'wave 2s ease-in-out infinite',
                }}>
                  Hi
                </span>
                <span>Welcome to my Portfolio</span>
              </div>
            </ScrollReveal>

            {/* Name */}
            <ScrollReveal delay={0.3}>
              <h1 style={{
                fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '14px',
                color: '#f0ece3',
              }}>
                I&apos;m{' '}
                <span className="gradient-text">{personal.name}</span>
              </h1>
            </ScrollReveal>

            {/* Typing */}
            <ScrollReveal delay={0.4}>
              <div style={{
                fontSize: 'clamp(1rem, 2.2vw, 1.4rem)',
                fontWeight: 400,
                color: '#7a9abb',
                marginBottom: '16px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}>
                <span>I&apos;m a </span>
                <span style={{ color: '#e01f37', fontWeight: 700 }}>
                  {typedText}
                  <span style={{
                    color: '#f0ece3',
                    animation: 'blink 1s infinite',
                    fontWeight: 300,
                  }}>|</span>
                </span>
              </div>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal delay={0.5}>
              <p style={{
                fontSize: '0.92rem',
                color: '#7a9abb',
                lineHeight: 1.9,
                maxWidth: '520px',
                margin: '0 auto 24px',
              }}>
                I love building clean, fast and user-friendly web applications.
                Turning ideas into real products with modern technologies.
              </p>
            </ScrollReveal>

            {/* Social Links */}
            <ScrollReveal delay={0.55}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '20px',
              }}>
                {[
                  { icon: 'GH', url: personal.social?.github, label: 'GitHub' },
                  { icon: 'Li', url: personal.social?.linkedin, label: 'LinkedIn' },
                  { icon: 'Ig', url: personal.social?.instagram, label: 'Instagram' },
                ].map((social) => social.url && (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                    style={{
                      width: '40px', height: '40px',
                      borderRadius: '12px',
                      background: 'rgba(240, 236, 227, 0.06)',
                      border: '1px solid rgba(240, 236, 227, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      color: '#7a9abb',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(224, 31, 55, 0.15)'
                      e.currentTarget.style.borderColor = 'rgba(224, 31, 55, 0.4)'
                      e.currentTarget.style.color = '#e01f37'
                      e.currentTarget.style.transform = 'translateY(-3px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(240, 236, 227, 0.06)'
                      e.currentTarget.style.borderColor = 'rgba(240, 236, 227, 0.1)'
                      e.currentTarget.style.color = '#7a9abb'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal delay={0.6}>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '32px',
              }}>
                <MagnetButton
                  className="btn-primary"
                  onClick={() => scrollTo('#projects')}
                  strength={0.3}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    View My Work <Rocket size={15} />
                  </span>
                </MagnetButton>

                <MagnetButton
                  className="btn-outline"
                  onClick={() => scrollTo('#contact')}
                  strength={0.3}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Contact Me <Mail size={15} />
                  </span>
                </MagnetButton>

                <MagnetButton
                  className="btn-ghost"
                  href={personal.resumeUrl}
                  download
                  strength={0.3}
                  style={{ textDecoration: 'none' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Download CV <FileDown size={15} />
                  </span>
                </MagnetButton>
              </div>
            </ScrollReveal>

            {/* Tech Stack */}
            <ScrollReveal delay={0.65}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '28px',
                flexWrap: 'wrap',
              }}>
                <span style={{
                  fontSize: '0.62rem', fontWeight: 700,
                  color: '#7a9abb', letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  Tech Stack
                </span>
                <div style={{
                  width: '1px', height: '14px',
                  background: 'rgba(240, 236, 227, 0.15)',
                }} />
                {[
                  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
                  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/ffffff' },
                  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
                  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
                  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
                  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
                ].map((tech) => (
                  <div
                    key={tech.name}
                    title={tech.name}
                    style={{
                      width: '32px', height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(1, 44, 86, 0.5)',
                      border: '1px solid rgba(10, 61, 110, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '5px',
                      transition: 'all 0.3s ease',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#e01f37'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(10, 61, 110, 0.5)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <img src={tech.icon} alt={tech.name} width={18} height={18}
                      style={{ objectFit: 'contain' }} />
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal delay={0.7}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '14px',
                flexWrap: 'wrap',
              }}>
                {[
                  { number: 1, suffix: '+', label: 'Years Learning', bg: 'rgba(1, 44, 86, 0.5)', border: '1px solid rgba(10, 61, 110, 0.5)', numColor: '#f0ece3', labelColor: '#7a9abb' },
                  { number: 5, suffix: '+', label: 'Projects Built', bg: '#e01f37', border: 'none', numColor: '#ffffff', labelColor: '#f8d0d5' },
                  { number: 1, suffix: '', label: 'Internship', bg: 'rgba(240, 236, 227, 0.08)', border: '1px solid rgba(240, 236, 227, 0.15)', numColor: '#f0ece3', labelColor: '#7a9abb' },
                  { number: 10, suffix: '+', label: 'Technologies', bg: 'rgba(1, 44, 86, 0.5)', border: '1px solid rgba(10, 61, 110, 0.5)', numColor: '#e01f37', labelColor: '#7a9abb' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      textAlign: 'center',
                      padding: '16px 22px',
                      borderRadius: '14px',
                      background: stat.bg,
                      border: stat.border,
                      minWidth: '100px',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <div style={{
                      fontSize: '1.6rem',
                      fontWeight: 700,
                      color: stat.numColor,
                    }}>
                      <CountUp end={stat.number} suffix={stat.suffix} duration={2} />
                    </div>
                    <div style={{
                      fontSize: '0.6rem',
                      color: stat.labelColor,
                      marginTop: '3px',
                      fontWeight: 600,
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Scroll Down */}
          <ScrollReveal delay={0.9}>
            <button
              onClick={() => scrollTo('#about')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#7a9abb',
                marginTop: '10px',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#e01f37' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#7a9abb' }}
            >
              <span style={{
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}>
                Scroll Down
              </span>
              <ChevronDown size={16} style={{ animation: 'bounce 2s infinite' }} />
            </button>
          </ScrollReveal>
        </div>
      </div>

      <style>{`
  @keyframes wave {
    0%, 100% { transform: rotate(0); }
    25% { transform: rotate(12deg); }
    50% { transform: rotate(-5deg); }
    75% { transform: rotate(8deg); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  @keyframes float1 {
    0%, 100% { transform: translateY(0) rotate(0); }
    50% { transform: translateY(-15px) rotate(5deg); }
  }
  @keyframes float2 {
    0%, 100% { transform: translateY(0) rotate(0); }
    50% { transform: translateY(-12px) rotate(-3deg); }
  }
  @keyframes float3 {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.3); }
  }
  @media (max-width: 768px) {
    .hero-side-panel {
      display: none !important;
    }
  }
`}</style>
    </section>
  )
}
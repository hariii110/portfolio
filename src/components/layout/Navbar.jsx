'use client'

import { useState, useEffect } from 'react'
import personal from '@/data/personal'

const navLinks = [
  { label: 'Home',       href: '#home'       },
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Contact',    href: '#contact'    },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      navLinks.forEach(link => {
        const id = link.href.replace('#', '')
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120 && rect.bottom >= 120) setActiveSection(id)
        }
      })
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (e, href) => {
    e.preventDefault()
    setIsOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 1000, height: '80px',
        display: 'flex', alignItems: 'center',
        transition: 'all 0.4s ease',
        background: isScrolled ? 'rgba(1, 29, 58, 0.9)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(24px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(10, 61, 110, 0.5)' : 'none',
      }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto', width: '100%',
          padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          <a href="#home" onClick={(e) => scrollTo(e, '#home')}
            style={{
              fontSize: '1.5rem', fontWeight: 700,
              textDecoration: 'none', letterSpacing: '-0.02em',
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
            <span style={{ color: '#f0ece3' }}>
              {personal.name.split(' ')[0]}
            </span>
            <span style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#e01f37',
            }} />
          </a>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '32px',
          }} className="hidden md:flex">
            {navLinks.map(link => {
              const isActive = activeSection === link.href.replace('#', '')
              return (
                <a key={link.href} href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: isActive ? 700 : 400,
                    textDecoration: 'none',
                    color: isActive ? '#f0ece3' : '#7a9abb',
                    transition: 'all 0.2s ease',
                    position: 'relative', paddingBottom: '4px',
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#f0ece3'}
                  onMouseLeave={(e) => {
                    if (!isActive) e.target.style.color = '#7a9abb'
                  }}>
                  {link.label}
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '20px',
                      height: '3px',
                      borderRadius: '100px',
                      background: '#e01f37',
                      animation: 'navDotGrow 0.3s ease forwards',
                    }} />
                  )}
                </a>
              )
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a href={personal.resumeUrl} download
              className="btn-primary hidden md:flex"
              style={{ padding: '10px 24px', fontSize: '0.8rem', textDecoration: 'none' }}>
              Resume ↓
            </a>

            <button onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
              style={{
                width: '44px', height: '44px', borderRadius: '12px',
                border: '1px solid rgba(240, 236, 227, 0.2)',
                background: 'rgba(1, 44, 86, 0.5)',
                cursor: 'pointer', fontSize: '1.2rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#f0ece3',
              }}>
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden" style={{
          position: 'fixed', top: '80px', left: 0, right: 0,
          zIndex: 999, background: 'rgba(1, 29, 58, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(10, 61, 110, 0.5)',
          padding: '20px 16px',
        }}>
          {navLinks.map(link => {
            const isActive = activeSection === link.href.replace('#', '')
            return (
              <a key={link.href} href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                style={{
                  display: 'block', padding: '14px 16px',
                  borderRadius: '12px', fontSize: '0.9rem',
                  fontWeight: isActive ? 700 : 400,
                  textDecoration: 'none',
                  color: isActive ? '#f0ece3' : '#7a9abb',
                  background: isActive ? 'rgba(224, 31, 55, 0.15)' : 'transparent',
                  marginBottom: '4px',
                  borderLeft: isActive
                    ? '3px solid #e01f37' : '3px solid transparent',
                }}>
                {link.label}
              </a>
            )
          })}

          <a href={personal.resumeUrl} download className="btn-primary"
            style={{
              display: 'block', textAlign: 'center',
              marginTop: '16px', textDecoration: 'none',
            }}>
            Download Resume ↓
          </a>
        </div>
      )}

      <style>{`
        @keyframes navDotGrow {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 20px;
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}
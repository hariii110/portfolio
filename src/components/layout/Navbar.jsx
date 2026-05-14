'use client'

import { useState, useEffect } from 'react'
import personal from '@/data/personal'

const navLinks = [
  { label: 'Home',       href: '#home',       icon: '🏠' },
  { label: 'About',      href: '#about',      icon: '👤' },
  { label: 'Skills',     href: '#skills',     icon: '⚡' },
  { label: 'Experience', href: '#experience', icon: '💼' },
  { label: 'Projects',   href: '#projects',   icon: '🚀' },
  { label: 'Blog',       href: '#blog',       icon: '📝' },
  { label: 'Game',       href: '#game',       icon: '🎮' },
  
  { label: 'Contact',    href: '#contact',    icon: '📬' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Track scroll & active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      navLinks.forEach((link) => {
        const id = link.href.replace('#', '')
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120 && rect.bottom >= 120) setActiveSection(id)
        }
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close on scroll
  useEffect(() => {
    const close = () => setIsOpen(false)
    window.addEventListener('scroll', close, { passive: true })
    return () => window.removeEventListener('scroll', close)
  }, [])

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const scrollTo = (e, href) => {
    e.preventDefault()
    setIsOpen(false)

    setTimeout(() => {
      const el = document.querySelector(href)
      if (el) {
        const rect = el.getBoundingClientRect()
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const top = rect.top + scrollTop - 100
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }, 200)
  }

  return (
    <>
      {/* ================================
          TOP BAR
      ================================ */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.4s ease',
          background: isScrolled
            ? 'rgba(1, 29, 58, 0.95)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(24px)' : 'none',
          borderBottom: isScrolled
            ? '1px solid rgba(10, 61, 110, 0.5)'
            : 'none',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Left: Hamburger + Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                border: '1px solid rgba(240, 236, 227, 0.15)',
                background: isOpen
                  ? 'rgba(224, 31, 55, 0.2)'
                  : 'rgba(1, 44, 86, 0.4)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: isOpen ? '0px' : '5px',
                padding: '12px',
                transition: 'all 0.3s ease',
              }}
            >
              <span
                style={{
                  width: '20px',
                  height: '2px',
                  background: '#f0ece3',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease',
                  transform: isOpen
                    ? 'rotate(45deg) translateY(1px)'
                    : 'rotate(0)',
                }}
              />
              <span
                style={{
                  width: '20px',
                  height: '2px',
                  background: '#f0ece3',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease',
                  opacity: isOpen ? 0 : 1,
                  transform: isOpen ? 'scaleX(0)' : 'scaleX(1)',
                }}
              />
              <span
                style={{
                  width: '20px',
                  height: '2px',
                  background: '#f0ece3',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease',
                  transform: isOpen
                    ? 'rotate(-45deg) translateY(-1px)'
                    : 'rotate(0)',
                }}
              />
            </button>

            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => scrollTo(e, '#home')}
              style={{
                fontSize: '1.4rem',
                fontWeight: 700,
                textDecoration: 'none',
                letterSpacing: '-0.02em',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span style={{ color: '#f0ece3' }}>
                {personal.name.split(' ')[0]}
              </span>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#e01f37',
                }}
              />
            </a>
          </div>

          {/* Right: Resume */}
          <a
            href={personal.resumeUrl}
            download
            style={{
              padding: '8px 20px',
              borderRadius: '12px',
              fontSize: '0.78rem',
              fontWeight: 700,
              background: 'var(--red)',
              color: '#fff',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow =
                '0 8px 24px -6px rgba(224, 31, 55, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            📄 Resume
          </a>
        </div>
      </nav>

      {/* ================================
          OVERLAY
      ================================ */}
      <div
        onClick={() => setIsOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 998,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'all' : 'none',
          transition: 'opacity 0.35s ease',
        }}
      />

      {/* ================================
          LEFT SLIDE MENU
      ================================ */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '300px',
          maxWidth: '85vw',
          zIndex: 999,
          background: 'rgba(1, 22, 46, 0.98)',
          backdropFilter: 'blur(30px)',
          borderRight: '1px solid rgba(10, 61, 110, 0.5)',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {/* Menu Header */}
        <div
          style={{
            padding: '24px 24px 20px',
            borderBottom: '1px solid rgba(10, 61, 110, 0.4)',
          }}
        >
          {/* Profile */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '12px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, var(--red), #0a3d6e)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: '#fff',
              }}
            >
              {personal.name.charAt(0)}
            </div>
            <div>
              <p
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--cream)',
                  lineHeight: 1.2,
                }}
              >
                {personal.name}
              </p>
              <p
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--muted)',
                  marginTop: '2px',
                }}
              >
                {personal.role}
              </p>
            </div>
          </div>

          {/* Status */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              borderRadius: '10px',
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#22c55e',
                animation: 'pulse 2s ease infinite',
              }}
            />
            <span style={{ fontSize: '0.7rem', color: '#22c55e', fontWeight: 600 }}>
              Available for work
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ padding: '16px 12px', flex: 1 }}>
          <p
            style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              color: 'var(--muted)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              padding: '0 12px',
              marginBottom: '10px',
            }}
          >
            Navigation
          </p>

          {navLinks.map((link, index) => {
            const isActive = activeSection === link.href.replace('#', '')
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '13px 16px',
                  borderRadius: '14px',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 700 : 400,
                  textDecoration: 'none',
                  color: isActive ? '#f0ece3' : '#7a9abb',
                  background: isActive
                    ? 'rgba(224, 31, 55, 0.15)'
                    : 'transparent',
                  borderLeft: isActive
                    ? '3px solid #e01f37'
                    : '3px solid transparent',
                  marginBottom: '4px',
                  transition: 'all 0.25s ease',
                  animation: isOpen
                    ? `menuSlideIn 0.35s ease ${index * 0.04}s both`
                    : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background =
                      'rgba(240, 236, 227, 0.05)'
                    e.currentTarget.style.color = '#f0ece3'
                    e.currentTarget.style.paddingLeft = '20px'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#7a9abb'
                    e.currentTarget.style.paddingLeft = '16px'
                  }
                }}
              >
                <span style={{ fontSize: '1.1rem', width: '24px', textAlign: 'center' }}>
                  {link.icon}
                </span>
                <span>{link.label}</span>
                {isActive && (
                  <span
                    style={{
                      marginLeft: 'auto',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#e01f37',
                    }}
                  />
                )}
              </a>
            )
          })}
        </div>

        {/* Divider */}
        <div
          style={{
            width: 'calc(100% - 48px)',
            height: '1px',
            background: 'rgba(10, 61, 110, 0.4)',
            margin: '0 24px',
          }}
        />

        {/* Social Links */}
        <div style={{ padding: '16px 24px' }}>
          <p
            style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              color: 'var(--muted)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '12px',
            }}
          >
            Connect
          </p>

          <div style={{ display: 'flex', gap: '10px' }}>
            {[
              { label: 'GitHub', url: personal.social?.github, icon: '🐙' },
              { label: 'LinkedIn', url: personal.social?.linkedin, icon: '💼' },
              { label: 'Instagram', url: personal.social?.instagram, icon: '📸' },
            ].map(
              (social) =>
                social.url && (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'rgba(240, 236, 227, 0.06)',
                      border: '1px solid rgba(240, 236, 227, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        'rgba(224, 31, 55, 0.15)'
                      e.currentTarget.style.borderColor = 'var(--red)'
                      e.currentTarget.style.transform = 'translateY(-3px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        'rgba(240, 236, 227, 0.06)'
                      e.currentTarget.style.borderColor =
                        'rgba(240, 236, 227, 0.1)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    {social.icon}
                  </a>
                )
            )}
          </div>
        </div>

        {/* Resume Button */}
        <div style={{ padding: '8px 24px 16px' }}>
          <a
            href={personal.resumeUrl}
            download
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '14px',
              borderRadius: '14px',
              background: 'var(--red)',
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              width: '100%',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow =
                '0 10px 30px -8px rgba(224, 31, 55, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            📄 Download Resume
          </a>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '12px 24px 20px',
            borderTop: '1px solid rgba(10, 61, 110, 0.3)',
          }}
        >
          <p style={{ fontSize: '0.65rem', color: 'var(--muted)', opacity: 0.5, textAlign: 'center' }}>
            © 2025 {personal.name}
          </p>
        </div>
      </div>

      {/* ================================
          ANIMATIONS
      ================================ */}
      <style>{`
        @keyframes menuSlideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </>
  )
}
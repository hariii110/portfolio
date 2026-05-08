'use client'

import { useState } from 'react'
import personal from '@/data/personal'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  // ================================
  // FORM SUBMIT - FORMSPREE
  // ================================
  // ⚠️ Replace YOUR_FORM_ID with your actual Formspree ID
  // Example: https://formspree.io/f/xpwzegkn
  // ================================
const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('sent')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus(''), 5000)
      } else {
        console.error('Error:', data.error)
        setStatus('error')
        setTimeout(() => setStatus(''), 5000)
      }
    } catch (err) {
      console.error('Fetch error:', err)
      setStatus('error')
      setTimeout(() => setStatus(''), 5000)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 18px',
    borderRadius: '14px',
    fontSize: '0.88rem',
    fontWeight: 400,
    background: 'rgba(1, 44, 86, 0.5)',
    color: '#f0ece3',
    border: '1px solid rgba(10, 61, 110, 0.5)',
    outline: 'none',
    transition: 'all 0.3s ease',
  }

  return (
    <section className="section-wrapper" style={{ background: 'transparent' }}>
      <div className="section-container">

        {/* =====================
            HEADER
        ===================== */}
        <div className="section-header">
          <h2 className="section-title">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind or want to collaborate? Let&apos;s talk!
          </p>
          <div className="section-line" />
        </div>

        {/* =====================
            CONTENT GRID
        ===================== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '48px',
        }} id="contact-grid">

          {/* =====================
              LEFT - INFO CARDS
          ===================== */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}>

            {/* Main Info Card - Cream */}
            <div className="card-cream" style={{ padding: '40px' }}>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: 700,
                marginBottom: '16px',
                color: '#012c56',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <span className="dot-red" /> Let&apos;s Connect
              </h3>
              <p style={{
                fontSize: '0.92rem',
                color: '#3a5f85',
                lineHeight: 1.9,
                marginBottom: '32px',
              }}>
                I&apos;m always open to discussing new projects, creative ideas
                or opportunities to be part of your vision.
              </p>

              {/* Contact Items */}
              {[
                {
                  icon: '📧',
                  label: 'Email',
                  value: personal.email,
                  href: 'mailto:' + personal.email,
                },
                {
                  icon: '📱',
                  label: 'Phone',
                  value: personal.phone,
                  href: 'tel:' + personal.phone,
                },
                {
                  icon: '📍',
                  label: 'Location',
                  value: personal.location,
                  href: null,
                },
              ].map(item => (
                <div key={item.label} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px 0',
                  borderBottom: '1px solid rgba(1, 44, 86, 0.08)',
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: 'rgba(1, 44, 86, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      color: '#7a9abb',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}>
                      {item.label}
                    </div>
                    {item.href ? (
                      <a href={item.href} style={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        color: '#012c56',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}>
                        {item.value}
                      </a>
                    ) : (
                      <div style={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        color: '#012c56',
                      }}>
                        {item.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links Card - Red */}
            <div className="card-red" style={{ padding: '32px' }}>
              <h4 style={{
                fontSize: '1rem',
                fontWeight: 700,
                marginBottom: '20px',
                color: '#ffffff',
              }}>
                Follow Me
              </h4>
              <div style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
              }}>
                {Object.entries(personal.social).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '12px 20px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      background: 'rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      transition: 'all 0.2s ease',
                      textTransform: 'capitalize',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    {platform === 'github' ? '🐙' :
                     platform === 'linkedin' ? '💼' :
                     platform === 'instagram' ? '📸' : '🔗'}{' '}
                    {platform}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick CTA Card */}
            <div className="card" style={{
              padding: '32px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>💼</div>
              <h4 style={{
                fontSize: '1rem',
                fontWeight: 700,
                marginBottom: '8px',
                color: '#f0ece3',
              }}>
                Looking for my resume?
              </h4>
              <p style={{
                fontSize: '0.82rem',
                color: '#7a9abb',
                marginBottom: '20px',
                lineHeight: 1.7,
              }}>
                Download my resume to know more about my experience
              </p>
              <a
                href={personal.resumeUrl}
                download
                className="btn-accent"
                style={{
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  padding: '12px 28px',
                }}
              >
                📄 Download Resume
              </a>
            </div>
          </div>

          {/* =====================
              RIGHT - CONTACT FORM
          ===================== */}
          <div className="card" style={{ padding: '40px' }}>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: 700,
              marginBottom: '8px',
              color: '#f0ece3',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span className="dot-red" /> Send a Message
            </h3>
            <p style={{
              fontSize: '0.85rem',
              color: '#7a9abb',
              marginBottom: '32px',
              lineHeight: 1.7,
            }}>
              Fill out the form and I&apos;ll get back to you as soon as possible
            </p>

            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}>

              {/* Name & Email Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
              }} id="form-row">
                <div>
                  <label style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#7a9abb',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '8px',
                    display: 'block',
                  }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#e01f37'
                      e.target.style.boxShadow = '0 0 0 3px rgba(224, 31, 55, 0.15)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(10, 61, 110, 0.5)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#7a9abb',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '8px',
                    display: 'block',
                  }}>
                    Your Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#e01f37'
                      e.target.style.boxShadow = '0 0 0 3px rgba(224, 31, 55, 0.15)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(10, 61, 110, 0.5)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#7a9abb',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '8px',
                  display: 'block',
                }}>
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  required
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#e01f37'
                    e.target.style.boxShadow = '0 0 0 3px rgba(224, 31, 55, 0.15)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(10, 61, 110, 0.5)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* Message */}
              <div>
                <label style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#7a9abb',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '8px',
                  display: 'block',
                }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, idea or opportunity..."
                  required
                  rows={6}
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                    minHeight: '160px',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#e01f37'
                    e.target.style.boxShadow = '0 0 0 3px rgba(224, 31, 55, 0.15)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(10, 61, 110, 0.5)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary"
                disabled={status === 'sending'}
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '0.9rem',
                  marginTop: '8px',
                  opacity: status === 'sending' ? 0.7 : 1,
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                }}
              >
                {status === 'sending' ? '⏳ Sending...' :
                 status === 'sent' ? '✅ Message Sent Successfully!' :
                 status === 'error' ? '❌ Failed to Send. Try Again' :
                 'Send Message 🚀'}
              </button>

              {/* Success Message */}
              {status === 'sent' && (
                <div style={{
                  padding: '16px 20px',
                  borderRadius: '14px',
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  color: '#4ade80',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textAlign: 'center',
                }}>
                  ✅ Thank you! I will get back to you soon.
                </div>
              )}

              {/* Error Message */}
              {status === 'error' && (
                <div style={{
                  padding: '16px 20px',
                  borderRadius: '14px',
                  background: 'rgba(224, 31, 55, 0.1)',
                  border: '1px solid rgba(224, 31, 55, 0.3)',
                  color: '#e01f37',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textAlign: 'center',
                }}>
                  ❌ Something went wrong. Please try again or email me directly.
                </div>
              )}
            </form>
          </div>
        </div>

      </div>

      {/* Responsive */}
      <style jsx>{`
        @media (min-width: 1024px) {
          #contact-grid {
            grid-template-columns: 420px 1fr !important;
          }
        }
        @media (max-width: 640px) {
          #form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
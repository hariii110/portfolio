'use client'

import { useState } from 'react'
import personal from '@/data/personal'
import ScrollReveal from '@/components/ui/ScrollReveal'
import {
  Mail,
  Phone,
  MapPin,
  GitBranch,
  Briefcase,
  Camera,
  Link2,
  FileDown,
  Send,
  CheckCircle,
  XCircle,
  Loader2,
} from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('sent')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
        setTimeout(() => setStatus(''), 4000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus(''), 4000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus(''), 4000)
    }
  }

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'github':
        return <GitBranch size={16} />
      case 'linkedin':
        return <Briefcase size={16} />
      case 'instagram':
        return <Camera size={16} />
      default:
        return <Link2 size={16} />
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
        <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="section-subtitle">
              Have a project in mind or want to collaborate? Let&apos;s talk!
            </p>
            <div className="section-line" />
          </div>
        </ScrollReveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '48px',
          }}
          id="contact-grid"
        >
          <ScrollReveal direction="left" delay={0.1}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              <div className="card-cream" style={{ padding: '40px' }}>
                <h3
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    marginBottom: '16px',
                    color: '#012c56',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <span className="dot-red" /> Let&apos;s Connect
                </h3>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: '#3a5f85',
                    lineHeight: 1.9,
                    marginBottom: '32px',
                  }}
                >
                  I&apos;m always open to discussing new projects, creative ideas
                  or opportunities to be part of your vision.
                </p>

                {[
                  {
                    Icon: Mail,
                    label: 'Email',
                    value: personal.email,
                    href: `mailto:${personal.email}`,
                  },
                  {
                    Icon: Phone,
                    label: 'Phone',
                    value: personal.phone,
                    href: `tel:${personal.phone}`,
                  },
                  {
                    Icon: MapPin,
                    label: 'Location',
                    value: personal.location,
                    href: null,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '16px 0',
                      borderBottom: '1px solid rgba(1, 44, 86, 0.08)',
                    }}
                  >
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '14px',
                        background: 'rgba(1, 44, 86, 0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <item.Icon size={20} color="#012c56" />
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          color: '#7a9abb',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {item.label}
                      </div>

                      {item.href ? (
                        <a
                          href={item.href}
                          style={{
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            color: '#012c56',
                            textDecoration: 'none',
                          }}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div
                          style={{
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            color: '#012c56',
                          }}
                        >
                          {item.value}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="card-red" style={{ padding: '32px' }}>
                <h4
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    marginBottom: '20px',
                    color: '#ffffff',
                  }}
                >
                  Follow Me
                </h4>

                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
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
                        textTransform: 'capitalize',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      {getSocialIcon(platform)}
                      {platform}
                    </a>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: 'rgba(224, 31, 55, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <Briefcase size={24} color="#e01f37" />
                </div>

                <h4
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    marginBottom: '8px',
                    color: '#f0ece3',
                  }}
                >
                  Looking for my resume?
                </h4>

                <p
                  style={{
                    fontSize: '0.82rem',
                    color: '#7a9abb',
                    marginBottom: '20px',
                    lineHeight: 1.7,
                  }}
                >
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
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <FileDown size={16} />
                  Download Resume
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.18}>
            <div className="card" style={{ padding: '40px' }}>
              <h3
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  marginBottom: '8px',
                  color: '#f0ece3',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span className="dot-red" /> Send a Message
              </h3>

              <p
                style={{
                  fontSize: '0.85rem',
                  color: '#7a9abb',
                  marginBottom: '32px',
                  lineHeight: 1.7,
                }}
              >
                Fill out the form and I&apos;ll get back to you as soon as possible
              </p>

              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                  }}
                  id="form-row"
                >
                  <div>
                    <label
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#7a9abb',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '8px',
                        display: 'block',
                      }}
                    >
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
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#7a9abb',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '8px',
                        display: 'block',
                      }}
                    >
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
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#7a9abb',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '8px',
                      display: 'block',
                    }}
                  >
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
                  />
                </div>

                <div>
                  <label
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#7a9abb',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '8px',
                      display: 'block',
                    }}
                  >
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
                  />
                </div>

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
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                      Sending...
                    </>
                  ) : status === 'sent' ? (
                    <>
                      <CheckCircle size={16} />
                      Message Sent Successfully!
                    </>
                  ) : status === 'error' ? (
                    <>
                      <XCircle size={16} />
                      Failed to Send. Try Again
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </button>

                {status === 'sent' && (
                  <div
                    style={{
                      padding: '16px 20px',
                      borderRadius: '14px',
                      background: 'rgba(34, 197, 94, 0.1)',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      color: '#4ade80',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    <CheckCircle size={16} />
                    Thank you! I will get back to you soon.
                  </div>
                )}

                {status === 'error' && (
                  <div
                    style={{
                      padding: '16px 20px',
                      borderRadius: '14px',
                      background: 'rgba(224, 31, 55, 0.1)',
                      border: '1px solid rgba(224, 31, 55, 0.3)',
                      color: '#e01f37',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    <XCircle size={16} />
                    Something went wrong. Please try again.
                  </div>
                )}
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>

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
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  )
}
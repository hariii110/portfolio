'use client'

import experience from '@/data/experience'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { CheckCircle, Star, MapPin, Briefcase } from 'lucide-react'

export default function Experience() {
  return (
    <section className="section-wrapper" style={{ background: 'transparent' }}>
      <div className="section-container">

        <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">
              My <span className="gradient-text">Experience</span>
            </h2>
            <p className="section-subtitle">
              Real work experience and internships that shaped my skills
            </p>
            <div className="section-line" />
          </div>
        </ScrollReveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {experience.map((exp, index) => (
            <ScrollReveal key={exp.id} delay={0.12 + index * 0.08}>
              <div
                style={{
                  background: 'rgba(1, 44, 86, 0.5)',
                  border: '1px solid rgba(10, 61, 110, 0.8)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Header */}
                <div style={{
                  padding: '32px 36px',
                  background: 'linear-gradient(135deg, #012c56, #0a3d6e)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '1.3rem',
                      fontWeight: 700,
                      color: '#f0ece3',
                      marginBottom: '8px',
                    }}>
                      {exp.role}
                    </h3>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      flexWrap: 'wrap',
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}>
                        <Briefcase size={13} color="#a0b8d0" />
                        <span style={{
                          fontSize: '0.85rem',
                          color: '#a0b8d0',
                          fontWeight: 400,
                        }}>
                          {exp.company}
                        </span>
                      </div>

                      <span style={{
                        width: '4px', height: '4px',
                        borderRadius: '50%',
                        background: '#a0b8d0',
                      }} />

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}>
                        <MapPin size={13} color="#a0b8d0" />
                        <span style={{
                          fontSize: '0.82rem',
                          color: '#a0b8d0',
                          fontWeight: 400,
                        }}>
                          {exp.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '6px 16px',
                      borderRadius: '100px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      background: 'rgba(240, 236, 227, 0.12)',
                      color: '#f0ece3',
                      border: '1px solid rgba(240, 236, 227, 0.2)',
                    }}>
                      {exp.type}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: '36px' }}>
                  {/* Description */}
                  <p style={{
                    fontSize: '0.95rem',
                    lineHeight: 2,
                    marginBottom: '36px',
                    color: '#7a9abb',
                  }}>
                    {exp.description}
                  </p>

                  {/* Responsibilities & Achievements Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '32px',
                      marginBottom: '36px',
                    }}
                    id={`exp-grid-${exp.id}`}
                  >
                    {/* Responsibilities */}
                    <div>
                      <h4 style={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        marginBottom: '16px',
                        color: '#f0ece3',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}>
                        <CheckCircle size={15} color="#e01f37" />
                        Responsibilities
                      </h4>
                      <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                      }}>
                        {exp.responsibilities.map((item, i) => (
                          <li key={i} style={{
                            fontSize: '0.82rem',
                            lineHeight: 1.7,
                            color: '#7a9abb',
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'flex-start',
                          }}>
                            <CheckCircle
                              size={12}
                              color="#e01f37"
                              style={{ marginTop: '4px', flexShrink: 0 }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 style={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        marginBottom: '16px',
                        color: '#f0ece3',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}>
                        <Star size={15} color="#f59e0b" />
                        Achievements
                      </h4>
                      <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                      }}>
                        {exp.achievements.map((item, i) => (
                          <li key={i} style={{
                            fontSize: '0.82rem',
                            lineHeight: 1.7,
                            color: '#7a9abb',
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'flex-start',
                          }}>
                            <Star
                              size={12}
                              color="#f59e0b"
                              style={{ marginTop: '4px', flexShrink: 0 }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      marginBottom: '14px',
                      color: '#f0ece3',
                    }}>
                      Tech Stack
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {exp.tech.map((t) => (
                        <span key={t} style={{
                          padding: '6px 14px',
                          borderRadius: '100px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          background: 'rgba(224, 31, 55, 0.12)',
                          color: '#e01f37',
                          border: '1px solid rgba(224, 31, 55, 0.2)',
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[id^='exp-grid'] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
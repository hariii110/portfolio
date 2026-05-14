'use client'

import { useState, useEffect } from 'react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import RadarChart from '@/components/ui/RadarChart'
import { Code2, Layers, Braces, Palette, Server, Triangle } from 'lucide-react'

const skillDetails = {
  React: {
    Icon: Code2,
    level: 'Advanced',
    experience: '1+ year',
    description: 'Built multiple projects including this portfolio, e-commerce platform, and gift suggestion system using React.js with hooks, context, and modern patterns.',
    projects: ['E-Commerce Website', 'Portfolio', 'Gift Suggestion System'],
    highlights: ['Component Architecture', 'Hooks & Context', 'State Management', 'API Integration'],
    color: '#61dafb',
  },
  'Node.js': {
    Icon: Server,
    level: 'Intermediate',
    experience: '1+ year',
    description: 'Built backend APIs and server-side applications using Node.js with Express.js framework for RESTful services, authentication, and database operations.',
    projects: ['E-Commerce Backend', 'Portfolio Contact API'],
    highlights: ['REST APIs', 'JWT Auth', 'Express.js', 'Middleware'],
    color: '#68a063',
  },
  MongoDB: {
    Icon: Layers,
    level: 'Intermediate',
    experience: '1+ year',
    description: 'Designed and managed MongoDB databases with Mongoose ODM for schema modeling, CRUD operations, aggregation pipelines, and query optimization.',
    projects: ['E-Commerce Database', 'User Management'],
    highlights: ['Schema Design', 'CRUD Operations', 'Aggregation', 'Indexing'],
    color: '#47a248',
  },
  CSS: {
    Icon: Palette,
    level: 'Advanced',
    experience: '2+ years',
    description: 'Expert in modern CSS including Flexbox, Grid, animations, responsive design, and CSS-in-JS. Built complex layouts and smooth animations.',
    projects: ['All Projects'],
    highlights: ['Flexbox & Grid', 'Animations', 'Responsive Design', 'Tailwind CSS'],
    color: '#264de4',
  },
  JavaScript: {
    Icon: Braces,
    level: 'Advanced',
    experience: '2+ years',
    description: 'Strong foundation in JavaScript ES6+, async programming, DOM manipulation, and modern patterns. Used across all frontend and backend projects.',
    projects: ['All Projects'],
    highlights: ['ES6+ Features', 'Async/Await', 'DOM Manipulation', 'Event Handling'],
    color: '#f7df1e',
  },
  'Next.js': {
    Icon: Triangle,
    level: 'Intermediate',
    experience: '6+ months',
    description: 'Built this portfolio using Next.js 14 with App Router, server components, API routes, dynamic imports, and optimized performance.',
    projects: ['Portfolio Website'],
    highlights: ['App Router', 'API Routes', 'Dynamic Imports', 'Image Optimization'],
    color: '#ffffff',
  },
}

export default function SkillsRadar() {
  const [selectedSkill, setSelectedSkill] = useState(-1)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const radarData = [
    { label: 'React', value: 80 },
    { label: 'Node.js', value: 70 },
    { label: 'MongoDB', value: 70 },
    { label: 'CSS', value: 85 },
    { label: 'JavaScript', value: 82 },
    { label: 'Next.js', value: 72 },
  ]

  const activeDetail = selectedSkill >= 0
    ? skillDetails[radarData[selectedSkill].label]
    : null

  const activeData = selectedSkill >= 0
    ? radarData[selectedSkill]
    : null

  return (
    <section className="section-wrapper" style={{ background: 'transparent' }}>
      <div className="section-container">

        <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">
              Skill <span className="gradient-text">Overview</span>
            </h2>
            <p className="section-subtitle">
              Click on any skill to see detailed breakdown
            </p>
            <div className="section-line" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '40px',
          }}>

            {/* Radar + Detail */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '40px',
              width: '100%',
            }} id="radar-row">

              {/* Radar Chart */}
              <div style={{ position: 'relative', flexShrink: 0 }}>

                {/* Aurora glows - desktop only */}
                {!isMobile && (
                  <>
                    <div style={{
                      position: 'absolute',
                      width: '500px', height: '500px',
                      top: '50%', left: '50%',
                      transform: 'translate(-50%, -50%)',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(224,31,55,0.08) 0%, rgba(26,74,122,0.06) 40%, transparent 70%)',
                      animation: 'auroraRadar1 6s ease-in-out infinite',
                      pointerEvents: 'none',
                    }} />
                    <div style={{
                      position: 'absolute',
                      width: '450px', height: '450px',
                      top: '50%', left: '50%',
                      transform: 'translate(-50%, -50%)',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(26,74,122,0.12) 0%, rgba(224,31,55,0.05) 35%, transparent 65%)',
                      animation: 'auroraRadar2 5s ease-in-out infinite reverse',
                      pointerEvents: 'none',
                    }} />
                    <div style={{
                      position: 'absolute',
                      width: '420px', height: '420px',
                      top: '50%', left: '50%',
                      transform: 'translate(-50%, -50%)',
                      borderRadius: '50%',
                      background: 'conic-gradient(from 0deg, rgba(224,31,55,0.06), rgba(26,74,122,0.08), rgba(240,236,227,0.04), rgba(224,31,55,0.06))',
                      animation: 'auroraRotate 12s linear infinite',
                      pointerEvents: 'none',
                    }} />
                  </>
                )}

                {/* Card */}
                <div style={{
                  padding: isMobile ? '24px' : '48px',
                  borderRadius: '28px',
                  background: 'rgba(1, 29, 58, 0.6)',
                  border: '1px solid rgba(10, 61, 110, 0.4)',
                  backdropFilter: isMobile ? 'none' : 'blur(20px)',
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: selectedSkill >= 0
                    ? '0 0 80px rgba(224,31,55,0.1), 0 0 160px rgba(26,74,122,0.1)'
                    : '0 0 60px rgba(224,31,55,0.05)',
                  transition: 'box-shadow 0.5s ease',
                }}>
                  {!isMobile && (
                    <div style={{
                      position: 'absolute',
                      top: '-1px', left: '10%', right: '10%',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, rgba(224,31,55,0.3), rgba(26,74,122,0.3), transparent)',
                      borderRadius: '100px',
                      animation: 'topGlow 3s ease-in-out infinite',
                    }} />
                  )}
                  <RadarChart
                    data={radarData}
                    size={isMobile ? 260 : 350}
                    color="#e01f37"
                    labelColor="#7a9abb"
                    onSkillSelect={setSelectedSkill}
                    selectedSkill={selectedSkill}
                  />
                </div>
              </div>

              {/* Detail Panel */}
              {activeDetail && activeData && (
                <div style={{
                  width: '100%',
                  maxWidth: '400px',
                  animation: 'detailSlideIn 0.4s ease both',
                }}>
                  <div style={{
                    background: 'rgba(1, 44, 86, 0.5)',
                    border: '1px solid rgba(10, 61, 110, 0.6)',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    backdropFilter: isMobile ? 'none' : 'blur(10px)',
                  }}>
                    {/* Header */}
                    <div style={{
                      padding: '24px 28px',
                      background: 'linear-gradient(135deg, rgba(224,31,55,0.15), rgba(26,74,122,0.1))',
                      borderBottom: '1px solid rgba(10, 61, 110, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{
                          width: '44px', height: '44px',
                          borderRadius: '12px',
                          background: `${activeDetail.color}20`,
                          border: `1px solid ${activeDetail.color}40`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <activeDetail.Icon size={22} color={activeDetail.color} />
                        </div>
                        <div>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f0ece3', marginBottom: '3px' }}>
                            {activeData.label}
                          </h3>
                          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: activeDetail.color }}>
                            {activeDetail.level}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedSkill(-1)}
                        style={{
                          width: '30px', height: '30px',
                          borderRadius: '8px',
                          background: 'rgba(240,236,227,0.08)',
                          border: '1px solid rgba(240,236,227,0.1)',
                          color: '#7a9abb',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.9rem',
                        }}
                      >
                        x
                      </button>
                    </div>

                    {/* Body */}
                    <div style={{ padding: '24px 28px' }}>
                      {/* Meter */}
                      <div style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.7rem', color: '#7a9abb' }}>Proficiency</span>
                          <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e01f37' }}>{activeData.value}%</span>
                        </div>
                        <div style={{ width: '100%', height: '6px', borderRadius: '100px', background: 'rgba(240,236,227,0.08)', overflow: 'hidden' }}>
                          <div style={{
                            width: `${activeData.value}%`, height: '100%', borderRadius: '100px',
                            background: `linear-gradient(90deg, ${activeDetail.color}, #e01f37)`,
                            transition: 'width 0.8s ease',
                          }} />
                        </div>
                      </div>

                      {/* Experience */}
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '18px' }}>
                        <div style={{
                          flex: 1, padding: '10px 14px', borderRadius: '10px',
                          background: 'rgba(240,236,227,0.04)',
                          border: '1px solid rgba(240,236,227,0.08)',
                        }}>
                          <p style={{ fontSize: '0.55rem', color: '#7a9abb', marginBottom: '3px' }}>Experience</p>
                          <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f0ece3' }}>{activeDetail.experience}</p>
                        </div>
                        <div style={{
                          flex: 1, padding: '10px 14px', borderRadius: '10px',
                          background: 'rgba(240,236,227,0.04)',
                          border: '1px solid rgba(240,236,227,0.08)',
                        }}>
                          <p style={{ fontSize: '0.55rem', color: '#7a9abb', marginBottom: '3px' }}>Projects</p>
                          <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f0ece3' }}>{activeDetail.projects.length}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p style={{ fontSize: '0.78rem', lineHeight: 1.7, color: '#7a9abb', marginBottom: '18px' }}>
                        {activeDetail.description}
                      </p>

                      {/* Highlights */}
                      <div style={{ marginBottom: '16px' }}>
                        <p style={{ fontSize: '0.65rem', fontWeight: 700, color: '#7a9abb', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          Key Areas
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {activeDetail.highlights.map((h) => (
                            <span key={h} style={{
                              padding: '4px 10px', borderRadius: '100px',
                              fontSize: '0.63rem', fontWeight: 700,
                              background: 'rgba(224,31,55,0.1)',
                              color: '#e01f37',
                              border: '1px solid rgba(224,31,55,0.2)',
                            }}>
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Projects */}
                      <div>
                        <p style={{ fontSize: '0.65rem', fontWeight: 700, color: '#7a9abb', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          Used In
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          {activeDetail.projects.map((proj) => (
                            <div key={proj} style={{
                              padding: '7px 12px', borderRadius: '8px',
                              background: 'rgba(240,236,227,0.04)',
                              border: '1px solid rgba(240,236,227,0.06)',
                              fontSize: '0.72rem', color: '#f0ece3',
                              display: 'flex', alignItems: 'center', gap: '7px',
                            }}>
                              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: activeDetail.color }} />
                              {proj}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quote when no skill selected */}
              {selectedSkill < 0 && (
                <div style={{
                  maxWidth: '500px',
                  textAlign: 'center',
                  padding: '20px 28px',
                  borderRadius: '14px',
                  background: 'rgba(1, 44, 86, 0.3)',
                  border: '1px solid rgba(10, 61, 110, 0.3)',
                }}>
                  <p style={{
                    fontSize: '0.85rem', fontWeight: 700,
                    color: 'var(--cream)', lineHeight: 1.8,
                    marginBottom: '6px',
                  }}>
                    &ldquo;Any fool can write code that a computer can understand.
                    Good programmers write code that humans can understand.&rdquo;
                  </p>
                  <p style={{ fontSize: '0.68rem', color: 'var(--muted)' }}>
                    — Martin Fowler
                  </p>
                </div>
              )}
            </div>

            {/* Skill pills */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: isMobile ? '8px' : '12px',
              flexWrap: 'wrap',
            }}>
              {radarData.map((skill, i) => {
                const detail = skillDetails[skill.label]
                const isActive = selectedSkill === i
                return (
                  <button
                    key={skill.label}
                    onClick={() => setSelectedSkill(isActive ? -1 : i)}
                    style={{
                      padding: isMobile ? '8px 14px' : '10px 20px',
                      borderRadius: '14px',
                      background: isActive ? 'rgba(224,31,55,0.15)' : 'rgba(1, 44, 86, 0.4)',
                      border: isActive ? '1px solid rgba(224,31,55,0.4)' : '1px solid rgba(10, 61, 110, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: isMobile ? '6px' : '10px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      transform: isActive ? 'scale(1.05)' : 'scale(1)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.borderColor = '#e01f37'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.borderColor = 'rgba(10, 61, 110, 0.5)'
                        e.currentTarget.style.transform = 'scale(1)'
                      }
                    }}
                  >
                    <div style={{
                      width: '8px', height: '8px',
                      borderRadius: '50%',
                      background: isActive ? '#e01f37' : (detail?.color || '#7a9abb'),
                      boxShadow: isActive ? '0 0 8px rgba(224,31,55,0.5)' : 'none',
                    }} />
                    <span style={{
                      fontSize: isMobile ? '0.7rem' : '0.78rem',
                      fontWeight: 700,
                      color: isActive ? '#f0ece3' : 'var(--cream)',
                    }}>
                      {skill.label}
                    </span>
                    <span style={{
                      fontSize: isMobile ? '0.6rem' : '0.7rem',
                      fontWeight: 700,
                      color: isActive ? '#e01f37' : '#7a9abb',
                    }}>
                      {skill.value}%
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @keyframes auroraRadar1 {
          0%, 100% { opacity: 0.6; transform: translate(-50%,-50%) scale(1); }
          25% { opacity: 0.8; transform: translate(-50%,-50%) scale(1.05) translate(10px,-5px); }
          50% { opacity: 1; transform: translate(-50%,-50%) scale(1.08) translate(-5px,8px); }
          75% { opacity: 0.7; transform: translate(-50%,-50%) scale(1.03) translate(-8px,-3px); }
        }
        @keyframes auroraRadar2 {
          0%, 100% { opacity: 0.5; transform: translate(-50%,-50%) scale(1); }
          33% { opacity: 0.9; transform: translate(-50%,-50%) scale(1.06) translate(-8px,6px); }
          66% { opacity: 0.7; transform: translate(-50%,-50%) scale(1.03) translate(6px,-4px); }
        }
        @keyframes auroraRotate {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes topGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes detailSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (min-width: 1024px) {
          #radar-row {
            flex-direction: row !important;
            align-items: flex-start !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  )
}
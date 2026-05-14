'use client'

import { useState } from 'react'
import personal from '@/data/personal'
import ScrollReveal from '@/components/ui/ScrollReveal'
import ProfileRings from '@/components/ui/ProfileRings'
import dynamic from 'next/dynamic'
import {
  User, Briefcase, MapPin, Mail, FileDown,
  Code2, Rocket, Users, Target, GraduationCap,
  Lightbulb, Clock, Globe, CheckCircle,
} from 'lucide-react'

const GlobeComponent = dynamic(
  () => import('@/components/ui/Location'),
  { ssr: false }
)

export default function About() {
  const [activeTab, setActiveTab] = useState('intro')

  const tabs = [
    { id: 'intro',     label: 'About Me',  Icon: User },
    { id: 'education', label: 'Education', Icon: GraduationCap },
    { id: 'goals',     label: 'Goals',     Icon: Target },
  ]

  const highlights = [
    [
      { Icon: Code2,  title: 'Clean Code',    desc: 'I write readable, maintainable and well-structured code' },
      { Icon: Users,  title: 'Team Player',   desc: 'I work well in teams and communicate effectively' },
    ],
    [
      { Icon: Rocket, title: 'Fast Learner',  desc: 'I pick up new technologies and concepts quickly' },
      { Icon: Target, title: 'Problem Solver',desc: 'I enjoy breaking down complex problems into simple solutions' },
    ],
  ]

  const goalsList = [
    [
      { Icon: Target,       title: 'Short Term', desc: 'Land a full-time developer role and contribute to real products' },
      { Icon: GraduationCap,title: 'Learning',   desc: 'Master TypeScript, system design and cloud technologies' },
    ],
    [
      { Icon: Rocket,    title: 'Long Term', desc: 'Become a senior full-stack developer and lead my own projects' },
      { Icon: Lightbulb, title: 'Impact',    desc: 'Build products that solve real problems and help real people' },
    ],
  ]

  const infoItems = [
    { Icon: User,      label: 'Name',     value: personal.name },
    { Icon: Briefcase, label: 'Role',     value: personal.role },
    { Icon: MapPin,    label: 'Location', value: 'Kochi, Kerala' },
    { Icon: Mail,      label: 'Email',    value: personal.email },
  ]

  // Location info cards (right of globe)
  const locationInfo = [
    {
      Icon: MapPin,
      label: 'Location',
      value: 'Kochi, Kerala, India',
    },
    {
      Icon: Clock,
      label: 'Timezone',
      value: 'IST (UTC +5:30)',
    },
    {
      Icon: CheckCircle,
      label: 'Available For',
      value: 'Remote & On-site Work',
    },
  ]

  return (
    <section className="section-wrapper" style={{ background: 'transparent' }}>
      <div className="section-container">

        {/* Header */}
        <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="section-subtitle">
              Get to know me better — who I am, my education and my goals
            </p>
            <div className="section-line" />
          </div>
        </ScrollReveal>

        {/* Main Grid */}
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '60px' }}
          id="about-grid"
        >
          {/* Left Column */}
          <ScrollReveal direction="left" delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

             {/* Profile */}
<div style={{
  display: 'flex',
  justifyContent: 'center',
  overflow: 'hidden',
  maxWidth: '100%',
}}>
  <div style={{
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '3px solid rgba(240, 236, 227, 0.15)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    background: 'rgba(1, 44, 86, 0.5)',
    position: 'relative',
  }}>
    <img
      src="/images/profile.jpg"
      alt="Hari Narayan"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
      onError={(e) => {
        e.currentTarget.style.display = 'none'
        e.currentTarget.parentElement.innerHTML = `
          <div style="
            width: 100%; height: 100%;
            display: flex; align-items: center; justify-content: center;
            background: linear-gradient(135deg, #012c56, #0a3d6e);
            font-size: 2.5rem; font-weight: 700; color: #f0ece3;
          ">HN</div>
        `
      }}
    />
  </div>
</div>
              {/* Info Card */}
              <div className="card-cream" style={{ padding: '36px' }}>
                <h3 style={{
                  fontSize: '1.05rem', fontWeight: 700,
                  marginBottom: '24px',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  color: '#012c56',
                }}>
                  <span className="dot-red" /> Quick Info
                </h3>

                {infoItems.map((item) => (
                  <div key={item.label} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '16px',
                    padding: '14px 0',
                    borderBottom: '1px solid rgba(1, 44, 86, 0.1)',
                  }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '10px',
                      background: 'rgba(1, 44, 86, 0.06)',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', flexShrink: 0,
                    }}>
                      <item.Icon size={16} color="#012c56" />
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.65rem', fontWeight: 700, color: '#3a5f85',
                        textTransform: 'uppercase', letterSpacing: '0.08em',
                      }}>
                        {item.label}
                      </div>
                      <div style={{
                        fontSize: '0.82rem', fontWeight: 700,
                        marginTop: '4px', color: '#012c56',
                      }}>
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}

                <a href={personal.resumeUrl} download className="btn-primary"
                  style={{
                    width: '100%', marginTop: '24px', textDecoration: 'none',
                    textAlign: 'center', fontSize: '0.85rem',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: '8px',
                  }}
                >
                  <FileDown size={16} /> Download Resume
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column */}
          <ScrollReveal direction="right" delay={0.15}>
            <div>

              {/* Tabs */}
              <div style={{
                display: 'flex', gap: '6px', marginBottom: '40px',
                padding: '6px',
                background: 'rgba(1, 44, 86, 0.5)',
                borderRadius: '16px',
                border: '1px solid rgba(10, 61, 110, 0.5)',
                width: 'fit-content',
              }}>
                {tabs.map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    style={{
                      padding: '10px 20px', borderRadius: '12px',
                      fontSize: '0.8rem', fontWeight: 700, border: 'none',
                      cursor: 'pointer', transition: 'all 0.25s ease',
                      background: activeTab === tab.id ? '#e01f37' : 'transparent',
                      color: activeTab === tab.id ? '#ffffff' : '#7a9abb',
                      display: 'flex', alignItems: 'center', gap: '6px',
                    }}
                  >
                    <tab.Icon size={14} /> {tab.label}
                  </button>
                ))}
              </div>

              {/* About Tab */}
              {activeTab === 'intro' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <ScrollReveal delay={0.2}>
                    <div className="card" style={{ padding: '44px' }}>
                      <h3 style={{
                        fontSize: '1.4rem', fontWeight: 700, marginBottom: '20px',
                        display: 'flex', alignItems: 'center', gap: '10px',
                      }}>
                        <span className="dot-cream" /> Who am I?
                      </h3>
                      <p style={{ color: '#7a9abb', lineHeight: 2.1, fontSize: '0.95rem' }}>
                        {personal.about.intro}
                      </p>
                    </div>
                  </ScrollReveal>

                  {/* 2x2 Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {[0, 1].map((col) => (
                      <div key={col} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {highlights[col].map((item, i) => (
                          <ScrollReveal key={item.title} delay={0.25 + (col * 2 + i) * 0.08}>
                            <div className={(col === 0 && i === 0) || (col === 1 && i === 1) ? 'card-cream' : 'card-red'}>
                              <div style={{
                                width: '48px', height: '48px', borderRadius: '14px',
                                background: (col === 0 && i === 0) || (col === 1 && i === 1)
                                  ? 'rgba(1, 44, 86, 0.08)' : 'rgba(255,255,255,0.15)',
                                display: 'flex', alignItems: 'center',
                                justifyContent: 'center', marginBottom: '16px',
                              }}>
                                <item.Icon size={22}
                                  color={(col === 0 && i === 0) || (col === 1 && i === 1) ? '#012c56' : '#ffffff'}
                                />
                              </div>
                              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>
                                {item.title}
                              </h4>
                              <p style={{ fontSize: '0.85rem', lineHeight: 1.8 }}>{item.desc}</p>
                            </div>
                          </ScrollReveal>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education Tab */}
              {activeTab === 'education' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {personal.about.education.map((edu, i) => (
                    <ScrollReveal key={i} delay={0.2 + i * 0.1}>
                      <div className="card" style={{
                        display: 'flex', alignItems: 'flex-start',
                        gap: '24px', padding: '36px',
                      }}>
                        <div style={{
                          width: '52px', height: '52px', borderRadius: '14px',
                          background: 'rgba(224, 31, 55, 0.2)',
                          display: 'flex', alignItems: 'center',
                          justifyContent: 'center', flexShrink: 0,
                        }}>
                          <GraduationCap size={24} color="#e01f37" />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            display: 'flex', justifyContent: 'space-between',
                            alignItems: 'flex-start', flexWrap: 'wrap',
                            gap: '8px', marginBottom: '10px',
                          }}>
                            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{edu.degree}</h3>
                            <span className="badge">{edu.year}</span>
                          </div>
                          <p style={{ color: '#7a9abb', fontSize: '0.85rem', marginBottom: '12px' }}>
                            {edu.school}
                          </p>
                          <span className="badge-red">{edu.score}</span>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}

                  <ScrollReveal delay={0.5}>
                    <div className="card-cream" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '48px', height: '48px', borderRadius: '14px',
                        background: 'rgba(1, 44, 86, 0.08)',
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center', flexShrink: 0,
                      }}>
                        <Lightbulb size={22} color="#012c56" />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px', color: '#012c56' }}>
                          Self Learner
                        </h4>
                        <p style={{ fontSize: '0.85rem', lineHeight: 1.9, color: '#3a5f85' }}>
                          Apart from formal education, I continuously learn through
                          online courses, documentation, YouTube and building real projects.
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              )}

              {/* Goals Tab */}
              {activeTab === 'goals' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <ScrollReveal delay={0.2}>
                    <div className="card-red" style={{ padding: '44px' }}>
                      <h3 style={{
                        fontSize: '1.4rem', fontWeight: 700, marginBottom: '20px',
                        display: 'flex', alignItems: 'center', gap: '10px', color: '#ffffff',
                      }}>
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f0ece3', display: 'inline-block' }} />
                        My Goals
                      </h3>
                      <p style={{ color: '#f8d0d5', lineHeight: 2.1, fontSize: '0.95rem' }}>
                        {personal.about.goals}
                      </p>
                    </div>
                  </ScrollReveal>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {[0, 1].map((col) => (
                      <div key={col} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {goalsList[col].map((item, i) => (
                          <ScrollReveal key={item.title} delay={0.28 + (col * 2 + i) * 0.08}>
                            <div className={(col === 0 && i === 0) || (col === 1 && i === 1) ? 'card-cream' : 'card'}>
                              <div style={{
                                width: '48px', height: '48px', borderRadius: '14px',
                                background: (col === 0 && i === 0) || (col === 1 && i === 1)
                                  ? 'rgba(1, 44, 86, 0.08)' : 'rgba(224, 31, 55, 0.15)',
                                display: 'flex', alignItems: 'center',
                                justifyContent: 'center', marginBottom: '16px',
                              }}>
                                <item.Icon size={22}
                                  color={(col === 0 && i === 0) || (col === 1 && i === 1) ? '#012c56' : '#e01f37'}
                                />
                              </div>
                              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>{item.title}</h4>
                              <p style={{ fontSize: '0.85rem', lineHeight: 1.8 }}>{item.desc}</p>
                            </div>
                          </ScrollReveal>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* ================================
            GLOBE SECTION
        ================================ */}
        <ScrollReveal delay={0.2}>
          <div style={{
            marginTop: '80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}>
            <h3 style={{
              fontSize: '1.2rem', fontWeight: 700,
              color: 'var(--cream)', textAlign: 'center',
            }}>
              Where I&apos;m <span className="gradient-text">Based</span>
            </h3>

            {/* Globe + Info Side by Side */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '40px',
            }} id="globe-row">

              {/* Globe */}
              <div style={{ flexShrink: 0 }}>
                <GlobeComponent size={380} />
              </div>

              {/* Info Cards */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                width: '100%',
                maxWidth: '340px',
              }}>
                {locationInfo.map((item) => (
                  <div
                    key={item.label}
                    className="card"
                    style={{
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                    }}
                  >
                    <div style={{
                      width: '42px', height: '42px', borderRadius: '12px',
                      background: 'rgba(224, 31, 55, 0.15)',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', flexShrink: 0,
                    }}>
                      <item.Icon size={18} color="#e01f37" />
                    </div>
                    <div>
                      <p style={{
                        fontSize: '0.65rem', fontWeight: 700,
                        color: 'var(--muted)', textTransform: 'uppercase',
                        letterSpacing: '0.08em', marginBottom: '4px',
                      }}>
                        {item.label}
                      </p>
                      <p style={{
                        fontSize: '0.88rem', fontWeight: 700,
                        color: 'var(--cream)',
                      }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Available status */}
                <div className="card" style={{
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                }}>
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '12px',
                    background: 'rgba(34, 197, 94, 0.15)',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', flexShrink: 0,
                  }}>
                    <div style={{
                      width: '12px', height: '12px',
                      borderRadius: '50%', background: '#22c55e',
                      animation: 'pulse 2s ease infinite',
                    }} />
                  </div>
                  <div>
                    <p style={{
                      fontSize: '0.65rem', fontWeight: 700,
                      color: 'var(--muted)', textTransform: 'uppercase',
                      letterSpacing: '0.08em', marginBottom: '4px',
                    }}>
                      Status
                    </p>
                    <p style={{
                      fontSize: '0.88rem', fontWeight: 700,
                      color: '#22c55e',
                    }}>
                      Available for Work
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          #about-grid {
            grid-template-columns: 380px 1fr !important;
          }
          #globe-row {
            flex-direction: row !important;
            align-items: center !important;
            justify-content: center !important;
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>
    </section>
  )
}
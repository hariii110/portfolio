'use client'

import { useState } from 'react'
import skills from '@/data/skills'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { Monitor, Server, Database, Wrench } from 'lucide-react'

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('frontend')

  const categories = [
    { id: 'frontend', label: 'Frontend', Icon: Monitor },
    { id: 'backend', label: 'Backend', Icon: Server },
    { id: 'database', label: 'Database', Icon: Database },
    { id: 'tools', label: 'Tools', Icon: Wrench },
  ]

  const activeSkills = skills[activeCategory] || []

  return (
    <section className="section-wrapper" style={{ background: 'transparent' }}>
      <div className="section-container">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">
              My <span className="gradient-text">Skills</span>
            </h2>
            <p className="section-subtitle">
              Technologies and tools I use to build amazing web applications
            </p>
            <div className="section-line" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '60px' }}>
            <div
              style={{
                display: 'flex',
                gap: '6px',
                padding: '6px',
                background: 'rgba(1, 44, 86, 0.5)',
                borderRadius: '16px',
                border: '1px solid rgba(10, 61, 110, 0.5)',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '12px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    background: activeCategory === cat.id ? '#e01f37' : 'transparent',
                    color: activeCategory === cat.id ? '#ffffff' : '#7a9abb',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <cat.Icon size={16} />
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {activeSkills.map((skill, index) => (
            <ScrollReveal key={skill.name} delay={0.12 + index * 0.06}>
              <div
                className={
                  index === 0 ? 'card-cream' :
                  index === activeSkills.length - 1 ? 'card-red' : 'card'
                }
                style={{
                  padding: '28px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '18px',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: index === 0
                          ? 'rgba(1, 44, 86, 0.1)'
                          : index === activeSkills.length - 1
                          ? 'rgba(255, 255, 255, 0.15)'
                          : 'rgba(240, 236, 227, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        padding: '8px',
                      }}
                    >
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        width={28}
                        height={28}
                        style={{
                          objectFit: 'contain',
                          filter:
                            skill.name === 'Express.js' ||
                            skill.name === 'GitHub'
                              ? 'brightness(0) invert(1)'
                              : 'none',
                        }}
                      />
                    </div>

                    <div style={{ minWidth: 0 }}>
                      <h3
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 700,
                          marginBottom: '2px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {skill.name}
                      </h3>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          color: index === 0
                            ? '#3a5f85'
                            : index === activeSkills.length - 1
                            ? '#f8d0d5'
                            : '#7a9abb',
                        }}
                      >
                        {skill.level >= 80 ? 'Advanced' :
                         skill.level >= 60 ? 'Intermediate' : 'Learning'}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      flexShrink: 0,
                      color: index === 0
                        ? '#e01f37'
                        : index === activeSkills.length - 1
                        ? '#ffffff'
                        : '#e01f37',
                    }}
                  >
                    {skill.level}%
                  </div>
                </div>

                <div
                  style={{
                    width: '100%',
                    height: '6px',
                    borderRadius: '100px',
                    background: index === 0
                      ? 'rgba(1, 44, 86, 0.1)'
                      : index === activeSkills.length - 1
                      ? 'rgba(255, 255, 255, 0.2)'
                      : 'rgba(240, 236, 227, 0.1)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${skill.level}%`,
                      height: '100%',
                      borderRadius: '100px',
                      background: index === 0
                        ? '#e01f37'
                        : index === activeSkills.length - 1
                        ? '#f0ece3'
                        : 'linear-gradient(135deg, #e01f37, #f0ece3)',
                      transition: 'width 1s ease-out',
                    }}
                  />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
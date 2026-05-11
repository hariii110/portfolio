'use client'

import { useState } from 'react'
import skills from '@/data/skills'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { Globe, Server, Database, Wrench } from 'lucide-react'

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('frontend')

  const categories = [
    { id: 'frontend', label: 'Frontend',  Icon: Globe },
    { id: 'backend',  label: 'Backend',   Icon: Server },
    { id: 'database', label: 'Database',  Icon: Database },
    { id: 'tools',    label: 'Tools',     Icon: Wrench },
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
            <div style={{
              display: 'flex', gap: '6px', padding: '6px',
              background: 'rgba(1, 44, 86, 0.5)', borderRadius: '16px',
              border: '1px solid rgba(10, 61, 110, 0.5)',
              flexWrap: 'wrap', justifyContent: 'center',
            }}>
              {categories.map(cat => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: '12px 24px', borderRadius: '12px',
                    fontSize: '0.82rem', fontWeight: 700,
                    border: 'none', cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    background: activeCategory === cat.id ? '#e01f37' : 'transparent',
                    color: activeCategory === cat.id ? '#ffffff' : '#7a9abb',
                    display: 'flex', alignItems: 'center', gap: '8px',
                  }}>
                  <cat.Icon size={16} />
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {activeSkills.map((skill, index) => (
            <ScrollReveal key={skill.name} delay={0.12 + index * 0.06}>
              <div
                className={
                  index === 0 ? 'card-cream' :
                  index === activeSkills.length - 1 ? 'card-red' : 'card'
                }
                style={{ padding: '32px' }}
              >
                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', marginBottom: '20px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '14px',
                      background: index === 0 ? 'rgba(1, 44, 86, 0.1)' :
                                 index === activeSkills.length - 1 ? 'rgba(255, 255, 255, 0.15)' :
                                 'rgba(224, 31, 55, 0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.5rem',
                    }}>
                      {skill.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '2px' }}>{skill.name}</h3>
                      <span style={{
                        fontSize: '0.72rem', fontWeight: 700,
                        color: index === 0 ? '#3a5f85' :
                               index === activeSkills.length - 1 ? '#f8d0d5' : '#7a9abb',
                      }}>
                        {skill.level >= 80 ? 'Advanced' : skill.level >= 60 ? 'Intermediate' : 'Learning'}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    fontSize: '1.4rem', fontWeight: 700,
                    color: index === 0 ? '#e01f37' :
                           index === activeSkills.length - 1 ? '#ffffff' : '#e01f37',
                  }}>
                    {skill.level}%
                  </div>
                </div>

                <div style={{
                  width: '100%', height: '8px', borderRadius: '100px',
                  background: index === 0 ? 'rgba(1, 44, 86, 0.1)' :
                             index === activeSkills.length - 1 ? 'rgba(255, 255, 255, 0.2)' :
                             'rgba(240, 236, 227, 0.1)',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${skill.level}%`, height: '100%', borderRadius: '100px',
                    background: index === 0 ? '#e01f37' :
                               index === activeSkills.length - 1 ? '#f0ece3' :
                               'linear-gradient(135deg, #e01f37, #f0ece3)',
                    transition: 'width 1s ease-out',
                  }} />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
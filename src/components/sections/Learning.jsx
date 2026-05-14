'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import { Code2, Cloud, Box, Smartphone } from 'lucide-react'

export default function Learning() {
  const learning = [
    { Icon: Code2,       name: 'TypeScript',    status: 'In Progress', progress: 40 },
    { Icon: Cloud,       name: 'AWS / Cloud',   status: 'Starting',    progress: 15 },
    { Icon: Box,         name: 'Docker',        status: 'Learning',    progress: 25 },
    { Icon: Smartphone,  name: 'React Native',  status: 'Planned',     progress: 5  },
  ]

  return (
    <section className="section-wrapper" style={{ background: 'transparent' }}>
      <div className="section-container">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">
              Currently <span className="gradient-text">Learning</span>
            </h2>
            <p className="section-subtitle">Technologies I am exploring</p>
            <div className="section-line" />
          </div>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
          {learning.map((item, i) => (
            <ScrollReveal key={item.name} delay={0.12 + i * 0.08}>
              <div
                className={i === 0 ? 'card-cream' : i === 1 ? 'card-red' : 'card'}
                style={{ padding: '32px' }}
              >
                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', marginBottom: '20px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '12px',
                      background: i === 0
                        ? 'rgba(1,44,86,0.08)'
                        : i === 1
                        ? 'rgba(255,255,255,0.15)'
                        : 'rgba(224,31,55,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <item.Icon
                        size={22}
                        color={i === 0 ? '#012c56' : i === 1 ? '#ffffff' : '#e01f37'}
                      />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '2px' }}>
                        {item.name}
                      </h4>
                      <span style={{
                        fontSize: '0.7rem', fontWeight: 700,
                        color: i === 0 ? '#3a5f85' : i === 1 ? '#f8d0d5' : '#7a9abb',
                      }}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                  <span style={{
                    fontSize: '1.1rem', fontWeight: 700,
                    color: i === 0 ? '#e01f37' : i === 1 ? '#ffffff' : '#e01f37',
                  }}>
                    {item.progress}%
                  </span>
                </div>

                <div style={{
                  width: '100%', height: '6px', borderRadius: '100px',
                  background: i === 0
                    ? 'rgba(1,44,86,0.1)'
                    : i === 1
                    ? 'rgba(255,255,255,0.2)'
                    : 'rgba(240,236,227,0.1)',
                }}>
                  <div style={{
                    width: item.progress + '%',
                    height: '100%', borderRadius: '100px',
                    background: i === 0 ? '#e01f37' : i === 1 ? '#f0ece3' : '#e01f37',
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
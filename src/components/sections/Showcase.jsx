'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider'

export default function Showcase() {
  return (
    <section className="section-wrapper" style={{ background: 'transparent' }}>
      <div className="section-container">

        <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">
              Responsive <span className="gradient-text">Design</span>
            </h2>
            <p className="section-subtitle">
              Drag the slider to see mobile vs desktop views
            </p>
            <div className="section-line" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div style={{
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            <BeforeAfterSlider
              beforeLabel="Mobile View"
              afterLabel="Desktop View"
              beforeColor="#e01f37"
              afterColor="#012c56"
              height={350}
            />
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
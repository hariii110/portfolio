'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import AuroraBackground from '@/components/ui/AuroraBackground'
import ClientCursor from '@/components/ui/ClientCursor'
import LaptopIntro from '@/components/ui/LaptopIntro'
import BackToTop from '@/components/ui/BackToTop'

const About        = dynamic(() => import('@/components/sections/About'))
const Skills       = dynamic(() => import('@/components/sections/Skills'))
const Experience   = dynamic(() => import('@/components/sections/Experience'))
const Projects     = dynamic(() => import('@/components/sections/Projects'))
const Learning     = dynamic(() => import('@/components/sections/Learning'))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'))
const Contact      = dynamic(() => import('@/components/sections/Contact'))
const Footer       = dynamic(() => import('@/components/layout/Footer'))

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <>
      {/* Laptop Intro Animation */}
      {!introComplete && (
        <LaptopIntro onComplete={() => setIntroComplete(true)} />
      )}

      <AuroraBackground />
      <ClientCursor />
      <BackToTop />

      <main style={{
        position: 'relative',
        zIndex: 1,
        background: 'transparent',
      }}>
        <Navbar />

        <section id="home"         style={{ background: 'transparent' }}><Hero />         </section>
        <section id="about"        style={{ background: 'transparent' }}><About />        </section>
        <section id="skills"       style={{ background: 'transparent' }}><Skills />       </section>
        <section id="experience"   style={{ background: 'transparent' }}><Experience />   </section>
        <section id="projects"     style={{ background: 'transparent' }}><Projects />     </section>
        <section id="learning"     style={{ background: 'transparent' }}><Learning />     </section>
        <section id="testimonials" style={{ background: 'transparent' }}><Testimonials /> </section>
        <section id="contact"      style={{ background: 'transparent' }}><Contact />      </section>

        <Footer />
      </main>
    </>
  )
}
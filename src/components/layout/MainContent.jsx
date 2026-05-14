'use client'

import dynamic from 'next/dynamic'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import BackToTop from '@/components/ui/BackToTop'

const PrismBackground = dynamic(
  () => import('@/components/ui/PrismBackground'),
  { ssr: false }
)
const About       = dynamic(() => import('@/components/sections/About'))
const Skills      = dynamic(() => import('@/components/sections/Skills'))
const SkillsRadar = dynamic(() => import('@/components/sections/SkillsRadar'))
const Experience  = dynamic(() => import('@/components/sections/Experience'))
const Projects    = dynamic(() => import('@/components/sections/Projects'))
const Learning    = dynamic(() => import('@/components/sections/Learning'))
const Blog        = dynamic(() => import('@/components/sections/Blog'))
const Game        = dynamic(() => import('@/components/sections/Game'))
const Mario = dynamic(() => import('@/components/sections/Mario'))
const Contact     = dynamic(() => import('@/components/sections/Contact'))
const Footer      = dynamic(() => import('@/components/layout/Footer'))

export default function MainContent() {
  return (
    <div
      style={{
        opacity: 0,
        animation: 'contentFadeIn 0.8s ease 0.1s forwards',
      }}
    >
      <PrismBackground />
      <BackToTop />

      <main style={{
        position: 'relative',
        zIndex: 2,
      }}>
        <Navbar />

        <section id="home"><Hero /></section>
        <section id="about"><About /></section>
        <section id="skills"><Skills /></section>
        <section id="skills-radar"><SkillsRadar /></section>
        <section id="experience"><Experience /></section>
        <section id="projects"><Projects /></section>
        <section id="learning"><Learning /></section>
        <section id="blog"><Blog /></section>
        <section id="game"><Game /></section>
        
        <section id="contact"><Contact /></section>

        <Footer />
      </main>

      <style>{`
        @keyframes contentFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
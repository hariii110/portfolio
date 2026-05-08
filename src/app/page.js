import Navbar       from '@/components/layout/Navbar'
import Footer       from '@/components/layout/Footer'
import Hero         from '@/components/sections/Hero'
import About        from '@/components/sections/About'
import Skills       from '@/components/sections/Skills'
import Experience   from '@/components/sections/Experience'
import Projects     from '@/components/sections/Projects'
import Learning     from '@/components/sections/Learning'
import Testimonials from '@/components/sections/Testimonials'
import Social       from '@/components/sections/Social'
import Contact      from '@/components/sections/Contact'
import AuroraBackground from '@/components/ui/AuroraBackground'

export default function Home() {
  return (
    <>
      <AuroraBackground />
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
        <section id="social"       style={{ background: 'transparent' }}><Social />       </section>
        <section id="contact"      style={{ background: 'transparent' }}><Contact />      </section>
        <Footer />
      </main>
    </>
  )
}
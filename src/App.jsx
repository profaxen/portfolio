import { Suspense, lazy, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'

// Lazy load below-fold sections
const About = lazy(() => import('./components/sections/About'))
const Projects = lazy(() => import('./components/sections/Projects'))
const Skills = lazy(() => import('./components/sections/Skills'))
const Achievements = lazy(() => import('./components/sections/Achievements'))
const Contact = lazy(() => import('./components/sections/Contact'))

function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Disable on touch
    if (window.matchMedia('(hover: none)').matches) return

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 4)
      cursorY.set(e.clientY - 4)
    }
    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [cursorX, cursorY])

  return (
    <motion.div
      id="custom-cursor"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: '#7C3AED',
        boxShadow: '0 0 10px rgba(124,58,237,0.8)',
        top: 0,
        left: 0,
      }}
    />
  )
}

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-24">
      <motion.div
        className="w-8 h-8 rounded-full border-2"
        style={{ borderColor: 'rgba(124,58,237,0.3)', borderTopColor: '#7C3AED' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

export default function App() {
  return (
    <div className="bg-[#050510] text-slate-100 overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Achievements />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

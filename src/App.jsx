import { Suspense, lazy, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
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
  const cursorScale = useMotionValue(1)

  const springConfig = { damping: 20, stiffness: 400, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  const cursorScaleSpring = useSpring(cursorScale, { damping: 15, stiffness: 300 })

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 10)
      cursorY.set(e.clientY - 10)
    }

    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.style?.cursor === 'pointer'
      ) {
        cursorScale.set(2.5)
      }
    }

    const handleMouseOut = () => {
      cursorScale.set(1)
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [cursorX, cursorY, cursorScale])

  return (
    <motion.div
      id="custom-cursor"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        scale: cursorScaleSpring,
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.8), rgba(59,130,246,0.4))',
        boxShadow: '0 0 15px rgba(124,58,237,0.6), 0 0 30px rgba(124,58,237,0.2)',
        top: 0,
        left: 0,
      }}
    />
  )
}

function PageCurtain({ onComplete }) {
  return (
    <motion.div
      className="page-curtain"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <motion.span
          className="font-display text-3xl font-bold text-white"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.2, repeat: 1 }}
        >
          A<span style={{ color: '#7C3AED' }}>.</span>
        </motion.span>
      </motion.div>
    </motion.div>
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
  const [loading, setLoading] = useState(true)

  return (
    <div className="bg-[#050510] text-slate-100 overflow-x-hidden">
      <AnimatePresence>
        {loading && <PageCurtain onComplete={() => setLoading(false)} />}
      </AnimatePresence>

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

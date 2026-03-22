import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '../../constants'

function MagneticLink({ children, onClick, isActive }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { damping: 15, stiffness: 300 })
  const springY = useSpring(y, { damping: 15, stiffness: 300 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.3)
    y.set((e.clientY - centerY) * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative px-4 py-2 text-sm font-medium transition-colors duration-300"
    >
      {isActive && (
        <motion.div
          layoutId="nav-pill"
          className="absolute inset-0 rounded-full"
          style={{
            background: 'rgba(124, 58, 237, 0.15)',
            border: '1px solid rgba(124, 58, 237, 0.3)',
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
      <span
        className="relative z-10 transition-colors duration-300"
        style={{
          color: isActive ? '#c4b5fd' : '#94a3b8',
        }}
      >
        {children}
      </span>
    </motion.button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''))
    const observers = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  const logoLetters = 'Adarsh'.split('')

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          ...(scrolled
            ? {
                background: 'rgba(5, 5, 16, 0.8)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderBottom: '1px solid rgba(124, 58, 237, 0.1)',
                boxShadow: '0 4px 30px rgba(0,0,0,0.4), 0 0 40px rgba(124,58,237,0.05)',
                padding: '0',
              }
            : {
                background: 'transparent',
                padding: '8px 0',
              }),
        }}
      >
        <div
          className="max-w-6xl mx-auto px-6 flex items-center justify-between"
          style={{
            height: scrolled ? '60px' : '72px',
            transition: 'height 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Logo with letter-by-letter reveal */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display text-xl font-bold text-slate-100 hover:opacity-80 transition-opacity duration-200 flex items-center"
          >
            {logoLetters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  delay: 0.5 + i * 0.06,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
            <motion.span
              className="text-accent-purple"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.9,
                duration: 0.4,
                type: 'spring',
                stiffness: 500,
                damping: 15,
              }}
            >
              .
            </motion.span>
          </button>

          {/* Desktop Nav with magnetic links & animated pill */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.replace('#', '')
              return (
                <MagneticLink
                  key={label}
                  onClick={() => scrollTo(href)}
                  isActive={activeSection === id}
                >
                  {label}
                </MagneticLink>
              )
            })}
          </div>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => {
                const el = document.getElementById('contact')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl overflow-hidden relative"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(59,130,246,0.1))',
                border: '1px solid rgba(124,58,237,0.4)',
                color: '#c4b5fd',
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 20px rgba(124,58,237,0.4), 0 0 40px rgba(124,58,237,0.1)',
                borderColor: 'rgba(124,58,237,0.7)',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <span className="relative z-10">Hire Me →</span>
            </motion.button>

            {/* Mobile hamburger */}
            <motion.button
              className="md:hidden text-slate-300 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 32px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 32px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 32px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 md:hidden"
            style={{
              background: 'rgba(5, 5, 16, 0.98)',
              backdropFilter: 'blur(30px)',
            }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.button
                  key={label}
                  onClick={() => scrollTo(href)}
                  className="font-display text-4xl font-bold text-slate-300 hover:text-accent-purple transition-colors duration-300"
                  initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    delay: 0.15 + i * 0.08,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => {
                  const el = document.getElementById('contact')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                  setMobileOpen(false)
                }}
                className="mt-6 px-10 py-4 rounded-2xl text-white font-semibold text-lg"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)' }}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.15 + NAV_LINKS.length * 0.08 + 0.1,
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
                whileTap={{ scale: 0.95 }}
              >
                Hire Me →
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

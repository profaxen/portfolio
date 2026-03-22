import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '../../constants'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll spy using IntersectionObserver
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

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={
          scrolled
            ? {
                background: 'rgba(5, 5, 16, 0.85)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              }
            : { background: 'transparent' }
        }
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display text-xl font-bold text-slate-100 hover:opacity-80 transition-opacity duration-200"
          >
            Adarsh<span className="text-accent-purple">.</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.replace('#', '')
              const isActive = activeSection === id
              return (
                <button
                  key={label}
                  onClick={() => scrollTo(href)}
                  className="relative text-sm font-medium transition-colors duration-200 group"
                  style={{ color: isActive ? '#a78bfa' : '#94a3b8' }}
                >
                  {label}
                  <span
                    className="absolute -bottom-1 left-0 h-px bg-accent-purple transition-all duration-300"
                    style={{ width: isActive ? '100%' : '0%' }}
                  />
                </button>
              )
            })}
          </div>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => { const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }) }}
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-lg border transition-all duration-200"
              style={{
                border: '1px solid rgba(124,58,237,0.6)',
                color: '#a78bfa',
              }}
              whileHover={{
                background: 'rgba(124,58,237,0.15)',
                boxShadow: '0 0 12px rgba(124,58,237,0.4)',
                scale: 1.03,
              }}
              whileTap={{ scale: 0.97 }}
            >
              Hire Me →
            </motion.button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-slate-300 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{
              background: 'rgba(5, 5, 16, 0.97)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.button
                  key={label}
                  onClick={() => scrollTo(href)}
                  className="font-display text-3xl font-bold text-slate-300 hover:text-accent-purple transition-colors duration-200"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  {label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => { const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }); setMobileOpen(false) }}
                className="mt-4 px-8 py-3 rounded-xl text-white font-semibold text-lg"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.08 + 0.1 }}
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

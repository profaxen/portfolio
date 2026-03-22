import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react'
import ParticleBackground from '../ui/ParticleBackground'
import { useEffect, useState } from 'react'

const codeLines = [
  { tokens: [{ text: 'const ', color: '#7C3AED' }, { text: 'adarsh', color: '#93c5fd' }, { text: ' = {', color: '#e2e8f0' }] },
  { tokens: [{ text: '  role', color: '#6ee7b7' }, { text: ': ', color: '#e2e8f0' }, { text: '"Full Stack Dev"', color: '#fcd34d' }, { text: ',', color: '#e2e8f0' }] },
  { tokens: [{ text: '  stack', color: '#6ee7b7' }, { text: ': ', color: '#e2e8f0' }, { text: '["MERN", "AI"]', color: '#fcd34d' }, { text: ',', color: '#e2e8f0' }] },
  { tokens: [{ text: '  mission', color: '#6ee7b7' }, { text: ': ', color: '#e2e8f0' }, { text: '"Scale."', color: '#fcd34d' }] },
  { tokens: [{ text: '}', color: '#e2e8f0' }] },
  { tokens: [{ text: '', color: '' }] },
  { tokens: [{ text: 'adarsh', color: '#93c5fd' }, { text: '.', color: '#e2e8f0' }, { text: 'build', color: '#7C3AED' }, { text: '(', color: '#e2e8f0' }, { text: 'world', color: '#6ee7b7' }, { text: ')', color: '#e2e8f0' }] },
]

/* Smooth reveal mask for text lines */
const revealContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
}

const revealItem = {
  hidden: { opacity: 0, y: 60, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

const springTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
}

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  const scrollToAbout = () => {
    const el = document.getElementById('about')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToProjects = () => {
    const el = document.getElementById('projects')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#050510' }}
    >
      <ParticleBackground />

      {/* Grid background overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          zIndex: 1,
        }}
      />

      {/* Parallax background orbs */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)',
          top: '-150px',
          right: '-100px',
          zIndex: 2,
          filter: 'blur(40px)',
          x: mousePos.x * -30,
          y: mousePos.y * -20,
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)',
          bottom: '-100px',
          left: '-80px',
          zIndex: 2,
          filter: 'blur(50px)',
          x: mousePos.x * 20,
          y: mousePos.y * 15,
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
      />
      {/* Extra subtle orb */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)',
          top: '40%',
          left: '30%',
          zIndex: 2,
          filter: 'blur(60px)',
          x: mousePos.x * 15,
          y: mousePos.y * -10,
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity, delay: 1 }}
      />

      <div className="max-w-6xl mx-auto px-6 py-24 pt-32 relative z-10 w-full">
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
          variants={revealContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Left: Content */}
          <div className="flex-1 max-w-2xl">
            {/* Label */}
            <motion.div
              className="flex items-center gap-2 mb-6"
              variants={revealItem}
            >
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{
                  background: '#10B981',
                  boxShadow: '0 0 8px #10B981, 0 0 16px rgba(16,185,129,0.3)',
                  animation: 'pulse 2s ease-in-out infinite',
                }}
              />
              <span
                className="text-sm font-medium tracking-widest uppercase"
                style={{ color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}
              >
                Full Stack Developer
              </span>
            </motion.div>

            {/* H1 with reveal mask */}
            <motion.h1
              className="font-display font-extrabold leading-none mb-6"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
              }}
              variants={revealItem}
            >
              {['Building', 'Systems', 'That'].map((word, i) => (
                <motion.span
                  key={word}
                  className="inline-block mr-4 text-slate-100"
                  initial={{ opacity: 0, y: 50, rotateX: -40 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.4 + i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
              <br />
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 50, rotateX: -40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  background: 'linear-gradient(90deg, #7C3AED, #3B82F6, #06B6D4, #7C3AED)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmer 4s linear infinite',
                }}
              >
                Scale.
              </motion.span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="mb-8 leading-relaxed max-w-lg"
              style={{ color: '#94a3b8', fontSize: '1.125rem', lineHeight: 1.7 }}
              variants={revealItem}
            >
              I'm <span className="text-slate-100 font-medium">Adarsh Tiwari</span>. I build
              scalable full stack systems that solve real-world problems using modern technologies.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-wrap items-center gap-4 mb-10"
              variants={revealItem}
            >
              <motion.button
                onClick={() => { const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }) }}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold text-sm relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)' }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 30px rgba(124,58,237,0.5), 0 0 60px rgba(124,58,237,0.2)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={springTransition}
              >
                <span className="relative z-10">Hire Me →</span>
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, #3B82F6, #7C3AED)',
                  }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              <motion.button
                onClick={scrollToProjects}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold"
                style={{
                  border: '1px solid rgba(124,58,237,0.4)',
                  color: '#a78bfa',
                }}
                whileHover={{
                  background: 'rgba(124,58,237,0.1)',
                  borderColor: 'rgba(124,58,237,0.7)',
                  scale: 1.05,
                  boxShadow: '0 0 20px rgba(124,58,237,0.2)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={springTransition}
              >
                View Projects ↓
              </motion.button>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              className="flex items-center gap-5"
              variants={revealItem}
            >
              {[
                { Icon: Github, href: 'https://github.com/profaxen', label: 'GitHub' },
                { Icon: Linkedin, href: 'https://www.linkedin.com/in/adarsh-tiwari-590b56244', label: 'LinkedIn' },
                { Icon: Mail, href: 'mailto:codewithadarshh@gmail.com', label: 'Email' },
              ].map(({ Icon, href, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200"
                  style={{
                    color: '#475569',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  whileHover={{
                    color: '#f1f5f9',
                    scale: 1.15,
                    background: 'rgba(124,58,237,0.15)',
                    borderColor: 'rgba(124,58,237,0.4)',
                    boxShadow: '0 0 15px rgba(124,58,237,0.3)',
                    y: -3,
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={springTransition}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right: Floating code card */}
          <motion.div
            className="flex-shrink-0 w-full max-w-sm lg:max-w-md hidden lg:block"
            initial={{ opacity: 0, x: 60, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(10, 10, 26, 0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(124,58,237,0.1)',
              }}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, ease: [0.37, 0, 0.63, 1], repeat: Infinity }}
            >
              {/* Terminal bar */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                {['#ff5f56', '#ffbd2e', '#27c93f'].map((bg, i) => (
                  <motion.span
                    key={bg}
                    className="w-3 h-3 rounded-full"
                    style={{ background: bg }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + i * 0.1, type: 'spring', stiffness: 500, damping: 15 }}
                  />
                ))}
                <span
                  className="ml-3 text-xs"
                  style={{ color: '#475569', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  adarsh.js
                </span>
              </div>

              {/* Code content with line-by-line reveal */}
              <div className="p-6" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.825rem', lineHeight: 1.8 }}>
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    className="flex"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 1.2 + i * 0.1,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <span className="mr-4 select-none" style={{ color: '#2d3748', minWidth: '1.5rem', textAlign: 'right' }}>
                      {i + 1}
                    </span>
                    <span>
                      {line.tokens.map((tok, j) => (
                        <span key={j} style={{ color: tok.color }}>
                          {tok.text}
                        </span>
                      ))}
                    </span>
                  </motion.div>
                ))}
                {/* Blinking cursor */}
                <div className="flex mt-1">
                  <span className="mr-4" style={{ color: '#2d3748', minWidth: '1.5rem', textAlign: 'right' }}>
                    8
                  </span>
                  <motion.span
                    className="inline-block w-2 h-5 align-middle"
                    style={{ background: '#7C3AED', borderRadius: '1px' }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-slate-500 hover:text-slate-300 transition-colors duration-300"
        animate={{ y: [0, 10, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  )
}

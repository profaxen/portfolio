import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react'
import ParticleBackground from '../ui/ParticleBackground'

const codeLines = [
  { tokens: [{ text: 'const ', color: '#7C3AED' }, { text: 'adarsh', color: '#93c5fd' }, { text: ' = {', color: '#e2e8f0' }] },
  { tokens: [{ text: '  role', color: '#6ee7b7' }, { text: ': ', color: '#e2e8f0' }, { text: '"Full Stack Dev"', color: '#fcd34d' }, { text: ',', color: '#e2e8f0' }] },
  { tokens: [{ text: '  stack', color: '#6ee7b7' }, { text: ': ', color: '#e2e8f0' }, { text: '["MERN", "AI"]', color: '#fcd34d' }, { text: ',', color: '#e2e8f0' }] },
  { tokens: [{ text: '  mission', color: '#6ee7b7' }, { text: ': ', color: '#e2e8f0' }, { text: '"Scale."', color: '#fcd34d' }] },
  { tokens: [{ text: '}', color: '#e2e8f0' }] },
  { tokens: [{ text: '', color: '' }] },
  { tokens: [{ text: 'adarsh', color: '#93c5fd' }, { text: '.', color: '#e2e8f0' }, { text: 'build', color: '#7C3AED' }, { text: '(', color: '#e2e8f0' }, { text: 'world', color: '#6ee7b7' }, { text: ')', color: '#e2e8f0' }] },
]

export default function Hero() {
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
      {/* Particle Background */}
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

      {/* Background orbs */}
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
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto px-6 py-24 pt-32 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Content */}
          <div className="flex-1 max-w-2xl">
            {/* Label */}
            <motion.div
              className="flex items-center gap-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{
                  background: '#10B981',
                  boxShadow: '0 0 8px #10B981',
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

            {/* H1 */}
            <motion.h1
              className="font-display font-bold leading-none mb-6"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {['Building', 'Systems', 'That'].map((word, i) => (
                <motion.span
                  key={word}
                  className="inline-block mr-4 text-slate-100"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                >
                  {word}
                </motion.span>
              ))}
              <br />
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
                style={{
                  background: 'linear-gradient(90deg, #7C3AED, #3B82F6, #06B6D4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Scale.
              </motion.span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="mb-8 leading-relaxed max-w-lg"
              style={{ color: '#94a3b8', fontSize: '1.125rem', lineHeight: 1.7 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              I'm <span className="text-slate-100 font-medium">Adarsh Tiwari</span>. I build
              scalable full stack systems that solve real-world problems using modern technologies.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-wrap items-center gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.button
                onClick={() => { const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }) }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)' }}
                whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(124,58,237,0.5)' }}
                whileTap={{ scale: 0.97 }}
              >
                Hire Me →
              </motion.button>
              <motion.button
                onClick={scrollToProjects}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  border: '1px solid rgba(124,58,237,0.4)',
                  color: '#a78bfa',
                }}
                whileHover={{
                  background: 'rgba(124,58,237,0.1)',
                  borderColor: 'rgba(124,58,237,0.7)',
                  scale: 1.03,
                }}
                whileTap={{ scale: 0.97 }}
              >
                View Projects ↓
              </motion.button>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              className="flex items-center gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {[
                { Icon: Github, href: 'https://github.com/profaxen', label: 'GitHub' },
                { Icon: Linkedin, href: 'https://www.linkedin.com/in/adarsh-tiwari-590b56244', label: 'LinkedIn' },
                { Icon: Mail, href: 'mailto:codewithadarshh@gmail.com', label: 'Email' },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="transition-colors duration-200"
                  style={{ color: '#475569' }}
                  whileHover={{ color: '#f1f5f9', scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={22} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right: Floating code card */}
          <motion.div
            className="flex-shrink-0 w-full max-w-sm lg:max-w-md hidden lg:block"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
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
              transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
            >
              {/* Terminal bar */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
                <span
                  className="ml-3 text-xs"
                  style={{ color: '#475569', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  adarsh.js
                </span>
              </div>

              {/* Code content */}
              <div className="p-6" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.825rem', lineHeight: 1.8 }}>
                {codeLines.map((line, i) => (
                  <div key={i} className="flex">
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
                  </div>
                ))}
                {/* Blinking cursor */}
                <div className="flex mt-1">
                  <span className="mr-4" style={{ color: '#2d3748', minWidth: '1.5rem', textAlign: 'right' }}>
                    8
                  </span>
                  <motion.span
                    className="inline-block w-2 h-5 align-middle"
                    style={{ background: '#7C3AED' }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-slate-500 hover:text-slate-300 transition-colors duration-200"
        style={{ opacity: 0.5 }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  )
}

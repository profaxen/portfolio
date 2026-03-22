import { useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import SectionHeading from '../ui/SectionHeading'
import { STATS, PERSONAL } from '../../constants'

function CountUp({ to, suffix = '', isInView }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const isDecimal = to % 1 !== 0
    const duration = 1800
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = isDecimal
        ? (eased * to).toFixed(1)
        : Math.floor(eased * to)
      setValue(current)
      if (progress === 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, to])

  return (
    <span>
      {value}{suffix}
    </span>
  )
}

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const leftInView = useInView(leftRef, { once: true, margin: '-80px' })
  const rightInView = useInView(rightRef, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-24 relative z-10" style={{ background: '#0a0a1a' }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          label="< About Me />"
          title="Turning Ideas Into Impactful Systems."
          center={false}
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <motion.div
            ref={leftRef}
            variants={slideLeft}
            initial="hidden"
            animate={leftInView ? 'visible' : 'hidden'}
          >
            <motion.div variants={stagger} initial="hidden" animate={leftInView ? 'visible' : 'hidden'}>
              {[
                "I'm a Full Stack MERN Developer based in Mumbai with a background in Computer Science from the University of Mumbai (CGPA: 8.5). I don't just write code — I architect solutions.",
                "My work spans web platforms, mobile apps, and data-driven systems. Whether it's building a real-time coordination platform or leading a team through a 24-hour hackathon, I bring both technical depth and product thinking.",
              ].map((para, i) => (
                <motion.p
                  key={i}
                  variants={fadeUp}
                  className="text-slate-400 leading-relaxed mb-4"
                  style={{ lineHeight: 1.7 }}
                >
                  {para}
                </motion.p>
              ))}
              <motion.p variants={fadeUp} className="text-slate-300 leading-relaxed mb-8 italic">
                "I'm driven by one question:{' '}
                <span className="text-accent-purple font-medium not-italic">Does this actually solve a real problem?</span>{' '}
                That mindset shapes everything I build."
              </motion.p>
            </motion.div>

            {/* Badge pills */}
            <motion.div variants={stagger} initial="hidden" animate={leftInView ? 'visible' : 'hidden'} className="flex flex-wrap gap-3">
              {[
                { icon: '🎓', title: 'B.Sc Computer Science', sub: 'University of Mumbai · CGPA: 8.5' },
                { icon: '📍', title: 'Mumbai, India', sub: 'Open to Remote' },
              ].map(({ icon, title, sub }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <span className="text-xl">{icon}</span>
                  <div>
                    <p className="text-slate-200 text-sm font-medium">{title}</p>
                    <p className="text-slate-500 text-xs">{sub}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: stats grid */}
          <motion.div
            ref={rightRef}
            variants={slideRight}
            initial="hidden"
            animate={rightInView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 gap-4"
          >
            {STATS.map(({ value, suffix, label }, i) => (
              <motion.div
                key={label}
                className="rounded-2xl p-6 text-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(12px)',
                }}
                whileHover={{ y: -4, borderColor: 'rgba(124,58,237,0.4)', transition: { duration: 0.2 } }}
                initial={{ opacity: 0, y: 20 }}
                animate={rightInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.2 }}
              >
                <p
                  className="font-display text-4xl font-bold mb-2"
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  <CountUp to={value} suffix={suffix} isInView={rightInView} />
                </p>
                <p className="text-slate-400 text-sm">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

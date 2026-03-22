import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function SectionHeading({ label, title, subtitle, center = true }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={`mb-16 ${center ? 'text-center' : 'text-left'}`}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {label && (
        <motion.p
          variants={itemVariants}
          className="font-mono text-sm text-accent-purple mb-4 tracking-wider"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          {label}
        </motion.p>
      )}
      <motion.h2
        variants={itemVariants}
        className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-100 leading-tight tracking-tight mb-4"
        style={{
          letterSpacing: '-0.03em',
          background: 'linear-gradient(135deg, #f1f5f9 0%, #c4b5fd 50%, #f1f5f9 100%)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
        whileInView={{
          backgroundPosition: ['0% center', '200% center'],
        }}
        transition={{ duration: 3, delay: 0.5 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={itemVariants}
          className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed"
          style={{ margin: center ? '0 auto' : '0' }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}

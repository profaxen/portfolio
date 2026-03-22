import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { achievements } from '../../data/achievements'

function AchievementCard({ item, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl p-8 flex flex-col relative overflow-hidden group"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
      initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(8px)' }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.15,
      }}
      whileHover={{
        y: -8,
        borderColor: 'rgba(124,58,237,0.4)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(124,58,237,0.15)',
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
    >
      {/* Subtle gradient on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${item.iconColor}12 0%, transparent 60%)`,
        }}
      />

      {/* Icon with gradient bg circle */}
      <motion.div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl relative z-10"
        style={{
          background: `radial-gradient(circle, ${item.iconColor}33 0%, ${item.iconColor}11 100%)`,
          border: `1px solid ${item.iconColor}44`,
        }}
        whileHover={{
          scale: 1.15,
          rotate: 8,
          boxShadow: `0 0 25px ${item.iconColor}33`,
          transition: { type: 'spring', stiffness: 400, damping: 10 },
        }}
      >
        {item.icon}
      </motion.div>

      {/* Title */}
      <h3 className="font-display text-xl font-bold text-slate-100 mb-3 relative z-10" style={{ letterSpacing: '-0.01em' }}>
        {item.title}
      </h3>

      {/* Body */}
      <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1 relative z-10">{item.body}</p>

      {/* Badge with shimmer */}
      <motion.span
        className="inline-block self-start text-xs font-mono px-3 py-1 rounded-full font-semibold relative z-10 overflow-hidden"
        style={{
          background: `${item.badgeColor}22`,
          border: `1px solid ${item.badgeColor}44`,
          color: item.badgeColor,
          fontFamily: 'JetBrains Mono, monospace',
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: `0 0 12px ${item.badgeColor}33`,
        }}
      >
        {item.badge}
      </motion.span>
    </motion.div>
  )
}

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 relative z-10" style={{ background: '#050510' }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          label="< Achievements />"
          title="Proof of Work."
          subtitle="Real results from real efforts — not just participation."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((item, i) => (
            <AchievementCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

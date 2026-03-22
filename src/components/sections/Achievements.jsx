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
      className="rounded-2xl p-8 flex flex-col"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.12 }}
      whileHover={{
        y: -6,
        borderColor: 'rgba(124,58,237,0.4)',
        boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 0 24px rgba(124,58,237,0.15)',
        transition: { duration: 0.2 },
      }}
    >
      {/* Icon with gradient bg circle */}
      <motion.div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl"
        style={{
          background: `radial-gradient(circle, ${item.iconColor}33 0%, ${item.iconColor}11 100%)`,
          border: `1px solid ${item.iconColor}44`,
        }}
        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
      >
        {item.icon}
      </motion.div>

      {/* Title */}
      <h3 className="font-display text-xl font-bold text-slate-100 mb-3" style={{ letterSpacing: '-0.01em' }}>
        {item.title}
      </h3>

      {/* Body */}
      <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{item.body}</p>

      {/* Badge */}
      <span
        className="inline-block self-start text-xs font-mono px-3 py-1 rounded-full font-semibold"
        style={{
          background: `${item.badgeColor}22`,
          border: `1px solid ${item.badgeColor}44`,
          color: item.badgeColor,
          fontFamily: 'JetBrains Mono, monospace',
        }}
      >
        {item.badge}
      </span>
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

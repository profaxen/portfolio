import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Monitor, Server, Smartphone, Wrench } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { skills } from '../../data/skills'

const categoryIconMap = {
  Monitor: Monitor,
  Server: Server,
  Smartphone: Smartphone,
  Wrench: Wrench,
}

/* Inline SVG skill icons with brand colors - zero external deps */
const skillIcons = {
  react: (color) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill={color}>
      <circle cx="12" cy="12" r="2.2" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke={color} strokeWidth="1.3" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke={color} strokeWidth="1.3" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke={color} strokeWidth="1.3" transform="rotate(120 12 12)" />
    </svg>
  ),
  javascript: (color) => (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <rect width="24" height="24" rx="3" fill={color} />
      <text x="6" y="19" fontFamily="monospace" fontSize="14" fontWeight="bold" fill="#000">JS</text>
    </svg>
  ),
  tailwind: (color) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill={color}>
      <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.1 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.62 7.15 14.5 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.38 16.85 9.5 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.62 13.15 9.5 12 7 12z"/>
    </svg>
  ),
  html5: (color) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill={color}>
      <path d="M4.14 3l1.59 17.82L12 22l6.27-1.18L19.86 3H4.14zm13.37 5.35H9.24l.22 2.46h7.83l-.69 7.72-4.6 1.28-4.58-1.28-.32-3.53h2.4l.16 1.8 2.34.64 2.35-.65.24-2.72H7.36L6.72 5.88h10.5l-.22 2.47z"/>
    </svg>
  ),
  css3: (color) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill={color}>
      <path d="M4.19 3l1.58 17.82L12 22l6.23-1.18L19.81 3H4.19zm13.21 5.35l-.58 6.5-4.82 1.57-4.83-1.57-.33-3.7h2.37l.17 1.88 2.62.71 2.62-.71.27-3.05H7.5l-.2-2.36h10.5l-.2-2.35H7.1l-.2-2.35h10.3l.2 2.35z"/>
    </svg>
  ),
  nodejs: (color) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill={color}>
      <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.46 1.69.46 1.38 0 2.17-.84 2.17-2.3V8.55c0-.12-.1-.22-.22-.22H8.35c-.12 0-.22.1-.22.22v8.08c0 .65-.67 1.3-1.76.75L4.28 16.4a.26.26 0 01-.13-.22V7.6c0-.09.05-.17.13-.22L11.72 3.1c.08-.04.18-.04.26 0l7.44 4.3c.08.05.13.13.13.22v8.58c0 .09-.05.17-.13.22l-7.44 4.3c-.08.04-.18.04-.26 0l-1.88-1.12c-.07-.04-.16-.05-.23-.02-.64.28-.76.32-1.36.48-.15.05-.38.12.08.34l2.45 1.45c.24.14.5.2.78.2s.55-.07.78-.2l7.44-4.3c.48-.28.78-.8.78-1.36V7.7c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.12-.5-.2-.78-.2z"/>
    </svg>
  ),
  express: (color) => (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <text x="1" y="17" fontFamily="monospace" fontSize="11" fontWeight="bold" fill={color}>Ex</text>
    </svg>
  ),
  api: (color) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <path d="M4 15l4-8 4 8" /><line x1="5.6" y1="13" x2="10.4" y2="13" /><path d="M14 7h3a2 2 0 010 4h-3v4" /><line x1="21" y1="7" x2="21" y2="15" />
    </svg>
  ),
  mongodb: (color) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill={color}>
      <path d="M12.545 2.138c-.198-.2-.516-.2-.713 0C10.06 3.91 5.5 8.88 5.5 13.085 5.5 17.06 8.36 21 12 21s6.5-3.94 6.5-7.915c0-4.205-4.56-9.175-5.955-10.947zM12 19c-.55 0-1-.32-1-.714v-5.572c0-.394.45-.714 1-.714s1 .32 1 .714v5.572c0 .394-.45.714-1 .714z"/>
    </svg>
  ),
  jwt: (color) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="11" width="18" height="11" rx="2" /><circle cx="12" cy="16" r="1" fill={color} /><path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  ),
  reactnative: (color) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill={color}>
      <circle cx="12" cy="12" r="2.2" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke={color} strokeWidth="1.3" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke={color} strokeWidth="1.3" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke={color} strokeWidth="1.3" transform="rotate(120 12 12)" />
    </svg>
  ),
  expo: (color) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M12 2L2 19h20L12 2z" fill={color} fillOpacity="0.15" /><circle cx="12" cy="13" r="3" fill={color} />
    </svg>
  ),
  git: (color) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill={color}>
      <path d="M23.546 10.93L13.067.452a1.55 1.55 0 00-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 012.327 2.341l2.66 2.66a1.838 1.838 0 11-1.103 1.06l-2.48-2.48v6.53a1.84 1.84 0 11-1.51-.048V8.78a1.84 1.84 0 01-.998-2.414L7.629 3.63.452 10.806a1.55 1.55 0 000 2.188l10.48 10.477a1.55 1.55 0 002.186 0l10.43-10.43a1.55 1.55 0 000-2.188z"/>
    </svg>
  ),
  postman: (color) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill={color}>
      <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="2" /><path d="M8 12l3 3 5-6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  vscode: (color) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill={color}>
      <path d="M17.58 2.19l-5.26 4.8L7.5 3.02 3.17 5.07v13.86l4.33 2.05 4.82-3.97 5.26 4.8 3.25-1.6V3.79l-3.25-1.6zM7.5 15.58V8.42l4.82 3.58-4.82 3.58zm10.08 2.02l-3.5-3.2V9.6l3.5-3.2v11.2z"/>
    </svg>
  ),
  opencv: (color) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={color} strokeWidth="2">
      <circle cx="8" cy="15" r="4" /><circle cx="16" cy="15" r="4" /><circle cx="12" cy="8" r="4" />
    </svg>
  ),
  geo: (color) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><ellipse cx="12" cy="12" rx="4" ry="10" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z" />
    </svg>
  ),
}

function SkillCard({ category, data, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = categoryIconMap[data.icon] || Monitor

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl p-6 flex flex-col"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
      whileHover={{
        y: -4,
        borderColor: `${data.accent}55`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 20px ${data.accent}22`,
        transition: { duration: 0.2 },
      }}
    >
      {/* Category header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${data.accent}22`, border: `1px solid ${data.accent}44` }}
        >
          <Icon size={20} style={{ color: data.accent }} />
        </div>
        <h3 className="font-display text-lg font-bold text-slate-100">{data.label}</h3>
      </div>

      {/* Skill rows */}
      <div className="flex flex-col gap-2 flex-1">
        {data.items.map((item, i) => {
          const renderIcon = skillIcons[item.iconKey]

          return (
            <motion.div
              key={item.name}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg group cursor-default transition-all duration-200"
              style={{ borderLeft: '2px solid transparent' }}
              whileHover={{
                background: `${data.accent}11`,
                borderLeftColor: data.accent,
                x: 4,
                transition: { duration: 0.15 },
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 + i * 0.05 + 0.3 }}
            >
              <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                {renderIcon ? renderIcon(item.iconColor) : <span style={{ color: item.iconColor }}>●</span>}
              </span>
              <span className="text-sm text-slate-300 font-medium group-hover:text-slate-100 transition-colors duration-200">
                {item.name}
              </span>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative z-10" style={{ background: '#0a0a1a' }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          label="< Skills />"
          title="My Technical Arsenal."
          subtitle="Tools and technologies I use to build production-grade systems."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Object.entries(skills).map(([key, data], i) => (
            <SkillCard key={key} category={key} data={data} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

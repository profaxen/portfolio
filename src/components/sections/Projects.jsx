import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Tag from '../ui/Tag'
import { projects } from '../../data/projects'

const tagColorMap = {
  default: 'purple',
  'Computer Vision': 'purple',
  'AI/ML': 'purple',
  Python: 'blue',
  Geospatial: 'cyan',
  'System Architecture': 'gray',
  'React Native': 'blue',
  'Node.js': 'green',
  'Express.js': 'green',
  MongoDB: 'green',
  'Geolocation API': 'cyan',
  JWT: 'amber',
  'React.js': 'blue',
  'Maps API': 'cyan',
  'Socket.io': 'amber',
}

function ImageSlider({ images }) {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((p) => (p + 1) % images.length)
  const prev = () => setCurrent((p) => (p - 1 + images.length) % images.length)

  return (
    <div className="relative w-full h-full group">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt="Project screenshot"
          className="w-full h-full object-contain rounded-xl"
          style={{ background: '#0d0d1a' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          loading="lazy"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <ChevronLeft size={16} className="text-white" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <ChevronRight size={16} className="text-white" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
                className="w-2 h-2 rounded-full transition-all duration-200"
                style={{
                  background: i === current ? '#7C3AED' : 'rgba(255,255,255,0.3)',
                  boxShadow: i === current ? '0 0 6px rgba(124,58,237,0.6)' : 'none',
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Gradient overlay at bottom for readability */}
      <div
        className="absolute inset-x-0 bottom-0 h-16 rounded-b-xl pointer-events-none"
        style={{
          background: 'linear-gradient(transparent, rgba(0,0,0,0.4))',
        }}
      />
    </div>
  )
}

function ProjectRow({ project, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isEven = index % 2 === 0

  const visualVariant = {
    hidden: { opacity: 0, x: isEven ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  }

  const textVariant = {
    hidden: { opacity: 0, x: isEven ? 50 : -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut', delay: 0.1 } },
  }

  const tagStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.5 } },
  }

  const tagVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  }

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl overflow-hidden mb-8"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      whileHover={{
        borderColor: 'rgba(124,58,237,0.2)',
        background: 'rgba(255,255,255,0.03)',
        transition: { duration: 0.3 },
      }}
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-stretch`}>
        {/* Image area */}
        <motion.div
          className="lg:w-[48%] overflow-hidden"
          variants={visualVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="relative h-full min-h-[280px] lg:min-h-[380px]">
            {/* Gradient backdrop behind the image */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40`}
            />
            <div className="absolute inset-0 p-4 flex items-center justify-center">
              <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                <ImageSlider images={project.images} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Text area */}
        <motion.div
          className="lg:w-[52%] p-8 flex flex-col justify-center"
          variants={textVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Badge */}
          <span
            className="inline-block self-start mb-3 text-xs font-mono px-3 py-1 rounded-full font-semibold"
            style={{
              background: `${project.accentColor}22`,
              border: `1px solid ${project.accentColor}55`,
              color: project.accentColor,
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            {project.badge}
          </span>

          <h3
            className="font-display text-2xl font-bold text-slate-100 mb-2"
            style={{ letterSpacing: '-0.01em' }}
          >
            {project.title}
          </h3>
          <p className="text-slate-400 text-sm mb-5 leading-relaxed">{project.subtitle}</p>

          {/* Highlights */}
          <ul className="space-y-2 mb-5">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-slate-300">
                <CheckCircle
                  size={14}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: project.accentColor }}
                />
                {h}
              </li>
            ))}
          </ul>

          {/* Impact line */}
          {project.impact && (
            <p
              className="text-sm italic mb-5"
              style={{ color: project.accentColor, opacity: 0.85 }}
            >
              "{project.impact}"
            </p>
          )}

          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-2 mb-6"
            variants={tagStagger}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {project.tags.map((tag) => (
              <motion.div key={tag} variants={tagVariant}>
                <Tag text={tag} color={tagColorMap[tag] || 'gray'} />
              </motion.div>
            ))}
          </motion.div>

          {/* Links */}
          <div className="flex items-center gap-3">
            <motion.a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#94a3b8',
              }}
              whileHover={{
                borderColor: 'rgba(124,58,237,0.4)',
                color: '#f1f5f9',
                background: 'rgba(124,58,237,0.1)',
                scale: 1.02,
              }}
              whileTap={{ scale: 0.97 }}
            >
              <Github size={14} />
              GitHub ↗
            </motion.a>
            {project.links.live && (
              <motion.a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg text-white"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)' }}
                whileHover={{ scale: 1.02, boxShadow: '0 0 16px rgba(124,58,237,0.4)' }}
                whileTap={{ scale: 0.97 }}
              >
                <ExternalLink size={14} />
                View Live
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative z-10" style={{ background: '#050510' }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          label="< Projects />"
          title="Things I've Built That Matter."
          subtitle="Each project was built to solve a real problem — not just to fill a portfolio."
        />

        <div>
          {projects.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

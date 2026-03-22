import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Mail, MapPin, Github, Linkedin, CheckCircle, Send } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { PERSONAL } from '../../constants'

const inputBase = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '12px',
  color: '#f1f5f9',
  outline: 'none',
  transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
  width: '100%',
  fontFamily: 'Sora, sans-serif',
}

const inputFocus = {
  border: '1px solid rgba(124,58,237,0.6)',
  boxShadow: '0 0 0 4px rgba(124,58,237,0.1), 0 0 20px rgba(124,58,237,0.05)',
  background: 'rgba(124,58,237,0.06)',
}

function FormInput({ label, id, type = 'text', value, onChange, error, placeholder, isTextarea }) {
  const [focused, setFocused] = useState(false)

  const style = {
    ...inputBase,
    ...(focused ? inputFocus : {}),
    padding: '14px 18px',
    resize: isTextarea ? 'vertical' : undefined,
    minHeight: isTextarea ? '150px' : undefined,
    fontSize: '14px',
  }

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-2 transition-colors duration-300"
        style={{ color: focused ? '#c4b5fd' : '#94a3b8' }}
      >
        {label}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...style, color: value ? '#f1f5f9' : '#475569' }}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={style}
        />
      )}
      <AnimatePresence>
        {error && (
          <motion.p
            className="text-xs mt-1.5"
            style={{ color: '#f87171' }}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    if (!form.email.trim()) e.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.'
    if (!form.message.trim()) e.message = 'Message is required.'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) {
      setErrors(e2)
      return
    }
    setErrors({})
    setLoading(true)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'a2858093-7097-474e-98f1-40a928ad9c83',
          name: form.name,
          email: form.email,
          message: form.message,
          from_name: 'Portfolio Contact Form',
          subject: `New message from ${form.name} via Portfolio`,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setSuccess(true)
        setForm({ name: '', email: '', message: '' })
      } else {
        setErrors({ message: 'Something went wrong. Please try again.' })
      }
    } catch (err) {
      setErrors({ message: 'Network error. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      className="py-24 relative z-10 overflow-hidden"
      style={{ background: '#0a0a1a' }}
    >
      {/* Animated background orb */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto px-6 relative" ref={ref}>
        <SectionHeading
          label="< Contact />"
          title="Let's Build Something."
          subtitle="Open to full-time roles, freelance projects, and interesting collaborations."
        />

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left: info */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-6"
            initial={{ opacity: 0, x: -50, filter: 'blur(8px)' }}
            animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-slate-400 leading-relaxed text-sm">
              I'm currently open to opportunities. If you have a project in mind or want to explore
              working together, reach out — I respond fast.
            </p>

            <div className="flex flex-col gap-4">
              <motion.a
                href={`mailto:${PERSONAL.email}`}
                className="flex items-center gap-3 text-sm text-slate-300 hover:text-accent-purple transition-colors duration-300"
                whileHover={{ x: 4, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}
                >
                  <Mail size={15} className="text-accent-purple" />
                </div>
                {PERSONAL.email}
              </motion.a>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}
                >
                  <MapPin size={15} style={{ color: '#3B82F6' }} />
                </div>
                {PERSONAL.location} · Open to Remote
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-2">
              {[
                { Icon: Github, label: 'github.com/profaxen', href: PERSONAL.github },
                { Icon: Linkedin, label: 'linkedin.com/in/adarsh-tiwari', href: PERSONAL.linkedin },
              ].map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-300 transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  whileHover={{
                    background: 'rgba(124,58,237,0.08)',
                    borderColor: 'rgba(124,58,237,0.3)',
                    color: '#f1f5f9',
                    x: 6,
                    boxShadow: '0 0 15px rgba(124,58,237,0.1)',
                    transition: { type: 'spring', stiffness: 400, damping: 15 },
                  }}
                >
                  <Icon size={16} className="text-accent-purple" />
                  {label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50, filter: 'blur(8px)' }}
            animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <div
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Subtle breathing glow */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 0%, rgba(124,58,237,0.06) 0%, transparent 60%)',
                }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
              />

              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center py-12 text-center relative z-10"
                    initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                      style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.4)' }}
                      animate={{ scale: [0.8, 1.15, 1], rotate: [0, 10, 0] }}
                      transition={{ duration: 0.6 }}
                    >
                      <CheckCircle size={32} style={{ color: '#10B981' }} />
                    </motion.div>
                    <h3 className="font-display text-xl font-bold text-slate-100 mb-2">
                      Message Sent! 🎉
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Thanks for reaching out. I'll get back to you soon.
                    </p>
                    <motion.button
                      onClick={() => setSuccess(false)}
                      className="mt-6 text-sm text-accent-purple hover:underline"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Send another message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 relative z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    noValidate
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormInput
                        label="Name"
                        id="contact-name"
                        placeholder="What should I call you?"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        error={errors.name}
                      />
                      <FormInput
                        label="Email"
                        id="contact-email"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        error={errors.email}
                      />
                    </div>
                    <FormInput
                      label="Message"
                      id="contact-message"
                      placeholder="Hey Adarsh, I'd love to discuss..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      error={errors.message}
                      isTextarea
                    />

                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-white font-semibold text-sm disabled:opacity-70 relative overflow-hidden"
                      style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)' }}
                      whileHover={!loading ? {
                        scale: 1.02,
                        boxShadow: '0 0 30px rgba(124,58,237,0.4), 0 0 60px rgba(124,58,237,0.15)',
                      } : {}}
                      whileTap={!loading ? { scale: 0.98 } : {}}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >
                      {/* Shimmer overlay on hover */}
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                          backgroundSize: '200% 100%',
                        }}
                        animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                      <span className="relative z-10 flex items-center gap-2">
                        {loading ? (
                          <>
                            <motion.div
                              className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={15} />
                            Send Message
                          </>
                        )}
                      </span>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

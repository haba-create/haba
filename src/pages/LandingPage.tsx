import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Sun, Moon, Sparkles, BarChart3, Cpu, Shield, Globe, Zap } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { ThemeContext } from '../contexts/ThemeContext'

const LandingPage = () => {
  const { user } = useContext(AuthContext)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const navigate = useNavigate()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogin = () => {
    navigate('/login')
  }

  if (user) {
    navigate('/dashboard')
  }

  const capabilities = [
    {
      icon: Cpu,
      title: 'AI Strategy & Architecture',
      description: 'Enterprise AI roadmaps, platform design, and implementation strategies that drive measurable business outcomes.',
    },
    {
      icon: BarChart3,
      title: 'Data Platform Engineering',
      description: 'Modern lakehouse architectures with Databricks, Azure Synapse, and cloud-native data pipelines at scale.',
    },
    {
      icon: Shield,
      title: 'Cloud & Security',
      description: 'Multi-cloud migrations, Zero Trust architectures, and compliant infrastructure for regulated industries.',
    },
    {
      icon: Sparkles,
      title: 'Generative AI Solutions',
      description: 'Custom GenAI applications using GPT-4, Claude, RAG pipelines, and fine-tuned models for enterprise use cases.',
    },
    {
      icon: Globe,
      title: 'Digital Transformation',
      description: 'End-to-end modernisation of legacy systems, from data warehousing to serverless and low-code platforms.',
    },
    {
      icon: Zap,
      title: 'Rapid Prototyping',
      description: 'Proof of concept development and production deployment with performance optimisation and CI/CD automation.',
    },
  ]

  const clients = [
    { name: 'Allianz GI', sector: 'Financial Services' },
    { name: 'Home Office', sector: 'Government' },
    { name: 'NHS', sector: 'Healthcare' },
    { name: 'Capita', sector: 'Technology' },
    { name: 'Howden Group', sector: 'Insurance' },
    { name: 'BBC', sector: 'Media' },
    { name: 'Marlink', sector: 'Maritime' },
    { name: 'IFAD (United Nations)', sector: 'International' },
    { name: 'RGA', sector: 'Reinsurance' },
    { name: 'PA Consulting', sector: 'Consulting' },
  ]

  const metrics = [
    { value: '15+', label: 'Years Experience' },
    { value: '20+', label: 'Enterprise Clients' },
    { value: '98%', label: 'Delivery Success' },
    { value: '3', label: 'Cloud Platforms' },
  ]

  return (
    <div className="min-h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Background Effects */}
      <div className="fixed inset-0 data-grid opacity-30" />
      <div className="fixed inset-0 mesh-gradient" />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-16 py-4"
        style={{
          backgroundColor: scrollY > 50
            ? (theme === 'dark' ? 'rgba(10, 10, 11, 0.85)' : 'rgba(255, 255, 255, 0.85)')
            : 'transparent',
          backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none',
          borderBottom: scrollY > 50 ? '1px solid var(--border-color)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              HABA
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={handleLogin}
              className="btn-primary text-sm px-5 py-2"
            >
              Sign In
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-16 pt-20">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide"
              style={{
                backgroundColor: 'var(--accent-light)',
                color: 'var(--accent)',
                border: '1px solid var(--accent)',
                borderColor: theme === 'dark' ? 'rgba(14, 165, 233, 0.3)' : 'rgba(14, 165, 233, 0.2)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              DATA & AI. ARCHITECTURE & ENGINEERING
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
              style={{ color: 'var(--text-primary)' }}
            >
              <span className="text-gradient">Intelligence</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              Architect Intelligent Systems That Transform Enterprise Data
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              We design and build AI platforms, data architectures, and GenAI solutions
              for enterprises across financial services, government, and healthcare.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={handleLogin}
                className="btn-primary group inline-flex items-center gap-2 px-8 py-3.5 text-base"
              >
                Enter Platform
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#capabilities"
                className="btn-ghost inline-flex items-center gap-2 px-8 py-3.5 rounded-lg"
              >
                Our Capabilities
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="pt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
            >
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
                Trusted by
              </span>
              {['Allianz GI', 'Home Office', 'NHS', 'Capita', 'Howden Group'].map((name) => (
                <span
                  key={name}
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {name}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a href="#capabilities">
            <ChevronDown className="w-5 h-5 animate-bounce" style={{ color: 'var(--text-tertiary)' }} />
          </a>
        </motion.div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="relative py-24 lg:py-32 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
              What We Do
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
              End-to-End AI & Data Solutions
            </h2>
            <p className="mt-4 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              From strategy to production, we deliver intelligent systems that create lasting competitive advantage.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group p-6 rounded-2xl card hover:border-sky-500/20 dark:hover:border-sky-500/20 transition-all"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'var(--accent-light)' }}
                >
                  <cap.icon className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {cap.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {cap.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="relative py-20 px-6 lg:px-16" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">{metric.value}</div>
                <div className="text-xs uppercase tracking-widest font-medium" style={{ color: 'var(--text-tertiary)' }}>
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-16" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
              Clients
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Trusted by Leading Organisations
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group p-5 rounded-xl text-center card hover:border-sky-500/20 transition-all"
              >
                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{client.name}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>{client.sector}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-16" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Ready to Transform Your
              <br />
              <span className="text-gradient">Data & AI Capabilities?</span>
            </h2>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Let's discuss how intelligent architecture can elevate your enterprise.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={handleLogin}
                className="btn-primary group inline-flex items-center gap-2 px-8 py-3.5 text-base"
              >
                Get Started
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-6 lg:px-16" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">H</span>
            </div>
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              &copy; {new Date().getFullYear()} HABA. All rights reserved.
            </span>
          </div>
          <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            London &middot; Frankfurt &middot; Remote
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

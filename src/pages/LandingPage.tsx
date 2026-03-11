import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sun, Moon, Terminal, Database, Brain, Shield, Network, Workflow, ChevronRight } from 'lucide-react'
import { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { ThemeContext } from '../contexts/ThemeContext'

const LandingPage = () => {
  const { user } = useContext(AuthContext)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const navigate = useNavigate()
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95])

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
      icon: Brain,
      title: 'AI Strategy & Architecture',
      description: 'Enterprise AI roadmaps, platform design, and implementation strategies that drive measurable business outcomes.',
      tech: ['GPT-4', 'Claude', 'RAG', 'Fine-tuning'],
    },
    {
      icon: Database,
      title: 'Data Platform Engineering',
      description: 'Modern lakehouse architectures with Databricks, Azure Synapse, and cloud-native data pipelines at scale.',
      tech: ['Databricks', 'Synapse', 'Spark', 'Delta Lake'],
    },
    {
      icon: Shield,
      title: 'Cloud & Security',
      description: 'Multi-cloud migrations, Zero Trust architectures, and compliant infrastructure for regulated industries.',
      tech: ['Azure', 'AWS', 'Zero Trust', 'IAM'],
    },
    {
      icon: Terminal,
      title: 'Generative AI Solutions',
      description: 'Custom GenAI applications using GPT-4, Claude, RAG pipelines, and fine-tuned models for enterprise use cases.',
      tech: ['LangChain', 'Vector DB', 'Agents', 'MCP'],
    },
    {
      icon: Network,
      title: 'Digital Transformation',
      description: 'End-to-end modernisation of legacy systems, from data warehousing to serverless and low-code platforms.',
      tech: ['Microservices', 'Event-driven', 'APIs', 'K8s'],
    },
    {
      icon: Workflow,
      title: 'Rapid Prototyping',
      description: 'Proof of concept development and production deployment with performance optimisation and CI/CD automation.',
      tech: ['CI/CD', 'IaC', 'Docker', 'MLOps'],
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
      {/* Background layers */}
      <div className="fixed inset-0 neural-grid" />
      <div className="fixed inset-0 mesh-gradient" />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-16 py-4"
        style={{
          backgroundColor: scrollY > 50
            ? (theme === 'dark' ? 'rgba(5, 5, 7, 0.85)' : 'rgba(250, 250, 250, 0.85)')
            : 'transparent',
          backdropFilter: scrollY > 50 ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrollY > 50 ? '1px solid var(--border-color)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600 to-sky-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm font-display">H</span>
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-600 to-sky-500 blur-lg opacity-30" />
            </div>
            <span className="text-xl font-semibold font-display tracking-tight" style={{ color: 'var(--text-primary)' }}>
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
              className="btn-primary text-sm px-5 py-2 relative"
            >
              <span>Sign In</span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center px-6 lg:px-16 pt-20"
      >
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-[120px] pulse-ring"
          style={{ background: 'var(--glow-primary)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full blur-[150px] pulse-ring"
          style={{ background: 'var(--glow-secondary)', animationDelay: '1.5s' }} />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="text-center max-w-5xl mx-auto space-y-8">
            {/* Terminal-style badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium tracking-wide border"
              style={{
                backgroundColor: 'var(--accent-light)',
                color: 'var(--accent)',
                borderColor: theme === 'dark' ? 'rgba(167, 139, 250, 0.2)' : 'rgba(109, 40, 217, 0.15)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              DATA & AI. ARCHITECTURE & ENGINEERING
            </motion.div>

            {/* Main headline - massive and bold */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] font-display"
              style={{ color: 'var(--text-primary)' }}
            >
              <span className="text-gradient">Intelligence</span>
            </motion.h1>

            {/* Glowing divider line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="glow-line mx-auto max-w-xs"
            />

            {/* Subtitle */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight font-display"
              style={{ color: 'var(--text-primary)', opacity: 0.9 }}
            >
              Architect Intelligent Systems That
              <br />
              Transform Enterprise Data
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              We design and build AI platforms, data architectures, and GenAI solutions
              for enterprises across financial services, government, and healthcare.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
            >
              <button
                onClick={handleLogin}
                className="btn-primary group inline-flex items-center gap-2 px-8 py-3.5 text-base relative"
              >
                <span>Enter Platform</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#capabilities"
                className="btn-ghost inline-flex items-center gap-2 px-8 py-3.5 rounded-lg"
              >
                Our Capabilities
                <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Trust strip - scrolling */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="pt-16"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] mb-6" style={{ color: 'var(--text-tertiary)' }}>
                Trusted by industry leaders
              </p>
              <div className="relative overflow-hidden max-w-3xl mx-auto">
                <div className="absolute left-0 top-0 bottom-0 w-16 z-10" style={{ background: `linear-gradient(to right, var(--bg-primary), transparent)` }} />
                <div className="absolute right-0 top-0 bottom-0 w-16 z-10" style={{ background: `linear-gradient(to left, var(--bg-primary), transparent)` }} />
                <div className="flex scroll-x whitespace-nowrap">
                  {[...clients, ...clients].map((client, i) => (
                    <span
                      key={`${client.name}-${i}`}
                      className="inline-block mx-6 text-sm font-medium"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      {client.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Capabilities Section */}
      <section id="capabilities" className="relative py-24 lg:py-32 px-6 lg:px-16">
        {/* Section glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-px glow-line" />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-xs font-mono font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: 'var(--accent)' }}>
              // capabilities
            </p>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight" style={{ color: 'var(--text-primary)' }}>
              End-to-End AI & Data
              <br />
              <span className="text-gradient-static">Solutions</span>
            </h2>
            <p className="mt-5 max-w-xl mx-auto text-base" style={{ color: 'var(--text-secondary)' }}>
              From strategy to production, we deliver intelligent systems
              that create lasting competitive advantage.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group p-6 rounded-2xl card-edge cursor-default"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--accent-light)' }}
                  >
                    <cap.icon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold font-display mb-1" style={{ color: 'var(--text-primary)' }}>
                      {cap.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {cap.description}
                    </p>
                  </div>
                </div>
                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mt-4 pl-14">
                  {cap.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md"
                      style={{
                        backgroundColor: 'var(--bg-tertiary)',
                        color: 'var(--text-tertiary)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="relative py-20 px-6 lg:px-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-px glow-line" />
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
                className="text-center group"
              >
                <div className="text-5xl md:text-6xl font-bold font-display text-gradient mb-3 group-hover:scale-110 transition-transform duration-300">
                  {metric.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-mono font-medium" style={{ color: 'var(--text-tertiary)' }}>
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-px glow-line" />
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-mono font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: 'var(--accent)' }}>
              // clients
            </p>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Trusted by Leading
              <br />
              <span className="text-gradient-static">Organisations</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                viewport={{ once: true }}
                className="group p-5 rounded-xl text-center card-edge cursor-default"
              >
                <p className="font-semibold text-sm font-display" style={{ color: 'var(--text-primary)' }}>{client.name}</p>
                <p className="text-[10px] mt-1 font-mono uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>{client.sector}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-px glow-line" />

        {/* CTA glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[200px]"
          style={{ background: 'var(--glow-primary)' }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-bold font-display tracking-tight leading-[1.1]" style={{ color: 'var(--text-primary)' }}>
              Ready to Transform Your
              <br />
              <span className="text-gradient">Data & AI Capabilities?</span>
            </h2>
            <p className="text-lg max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Let's discuss how intelligent architecture can elevate your enterprise.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={handleLogin}
                className="btn-primary group inline-flex items-center gap-2 px-10 py-4 text-base relative"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-6 lg:px-16" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-600 to-sky-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs font-display">H</span>
            </div>
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              &copy; {new Date().getFullYear()} HABA. All rights reserved.
            </span>
          </div>
          <div className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>
            London &middot; Frankfurt &middot; Remote
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

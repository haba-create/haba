import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const LandingPage = () => {
  const { user } = useContext(AuthContext)
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

  const clients = [
    'RGA', 'BBC', 'NHS', 'Home Office', 
    'Capita', 'Howden Group', 'AllianzGI', 'Marlink'
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0B] overflow-hidden">
      {/* Data Grid Background */}
      <div className="fixed inset-0 data-grid opacity-50" />
      <div className="fixed inset-0 mesh-gradient" />
      
      {/* Minimal Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 px-8 lg:px-16 py-6"
        style={{
          backgroundColor: scrollY > 50 ? 'rgba(10, 10, 11, 0.8)' : 'transparent',
          backdropFilter: scrollY > 50 ? 'blur(10px)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl font-extralight tracking-wider text-white/90">
            HABA
          </div>
          <button
            onClick={handleLogin}
            className="text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors duration-300"
          >
            Client Access
          </button>
        </div>
      </motion.nav>

      {/* Hero Section - Minimal */}
      <section className="relative min-h-screen flex items-center justify-center px-8 lg:px-16">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="space-y-12"
          >
            {/* Main Headline */}
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl md:text-7xl lg:text-8xl font-thin tracking-tight leading-none"
              >
                <span className="text-white/90">Intelligence</span>
                <br />
                <span className="text-white/40">Architecture</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-sm uppercase tracking-[0.3em] text-gray-500"
              >
                Data & AI Consultancy
              </motion.p>
            </div>

            {/* Subtle Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-xl text-gray-400 font-light leading-relaxed"
            >
              We architect intelligent systems that transform enterprise data into 
              competitive advantage. Specializing in AI strategy, data infrastructure, 
              and scalable solutions for tomorrow's challenges.
            </motion.p>

            {/* Single CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <button
                onClick={handleLogin}
                className="group inline-flex items-center gap-3 px-8 py-3 border border-white/10 
                         text-white/80 font-light text-sm tracking-wide
                         transition-all duration-300 hover:border-white/20 hover:bg-white/[0.02]"
              >
                Enter Platform
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-5 h-5 text-gray-600 animate-bounce" />
        </motion.div>
      </section>

      {/* Capabilities Section - Text Only */}
      <section className="relative py-32 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-16"
          >
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500">01</h3>
              <h4 className="text-xl font-light text-white/90">Strategy</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                AI roadmap development. Technology assessment. Digital transformation planning. 
                Executive advisory services.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500">02</h3>
              <h4 className="text-xl font-light text-white/90">Architecture</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Scalable data platforms. Cloud infrastructure design. MLOps implementation. 
                System integration.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500">03</h3>
              <h4 className="text-xl font-light text-white/90">Delivery</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Custom AI solutions. Proof of concept development. Production deployment. 
                Performance optimization.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="relative py-32 px-8 lg:px-16 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div>
              <div className="text-3xl font-thin text-white/90">11+</div>
              <div className="text-xs uppercase tracking-wider text-gray-600 mt-2">Active Clients</div>
            </div>
            <div>
              <div className="text-3xl font-thin text-white/90">98%</div>
              <div className="text-xs uppercase tracking-wider text-gray-600 mt-2">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-thin text-white/90">3.2yr</div>
              <div className="text-xs uppercase tracking-wider text-gray-600 mt-2">Avg Retention</div>
            </div>
            <div>
              <div className="text-3xl font-thin text-white/90">£2M+</div>
              <div className="text-xs uppercase tracking-wider text-gray-600 mt-2">Value Delivered</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Client Logos - Minimal Grid */}
      <section className="relative py-32 px-8 lg:px-16 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-gray-600 mb-16 text-center">
              Selected Engagements
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-8">
              {clients.map((client, index) => (
                <motion.div
                  key={client}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center"
                >
                  <span className="text-lg font-light text-gray-600 hover:text-white/80 transition-colors duration-300">
                    {client}
                  </span>
                </motion.div>
              ))}
            </div>
            
            <p className="text-xs text-gray-700 text-center mt-12 italic">
              + Select startups and scale-ups
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-32 px-8 lg:px-16 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-thin text-white/90">Begin Your Transformation</h2>
            <p className="text-sm text-gray-500">
              Let's discuss how intelligent architecture can elevate your enterprise.
            </p>
            <button
              onClick={handleLogin}
              className="inline-flex items-center gap-3 px-8 py-3 border border-white/10 
                       text-white/80 font-light text-sm tracking-wide
                       transition-all duration-300 hover:border-white/20 hover:bg-white/[0.02]"
            >
              Schedule Consultation
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-8 lg:px-16 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xs text-gray-600">
            © {new Date().getFullYear()} HABA. All rights reserved.
          </div>
          <div className="text-xs text-gray-600">
            London · Dubai · Singapore
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
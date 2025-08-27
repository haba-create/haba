import { motion } from 'framer-motion'
import { Brain, Database, Sparkles, ArrowRight, Network, Code, Cpu, Cloud } from 'lucide-react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const LandingPage = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/login')
  }

  if (user) {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen overflow-hidden relative gradient-bg">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[10%] left-[15%]"
          animate={{ y: [-20, 20, -20], rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Brain className="w-16 h-16 text-purple-400/30" />
        </motion.div>
        <motion.div
          className="absolute top-[20%] right-[20%]"
          animate={{ y: [20, -20, 20], rotate: -360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <Database className="w-20 h-20 text-blue-400/30" />
        </motion.div>
        <motion.div
          className="absolute bottom-[30%] left-[10%]"
          animate={{ y: [-15, 15, -15], x: [-10, 10, -10] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <Network className="w-24 h-24 text-cyan-400/20" />
        </motion.div>
        <motion.div
          className="absolute bottom-[20%] right-[15%]"
          animate={{ y: [15, -15, 15], rotate: 180 }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cpu className="w-18 h-18 text-purple-400/25" />
        </motion.div>
        <motion.div
          className="absolute top-[50%] right-[10%]"
          animate={{ scale: [1, 1.2, 1], rotate: -180 }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cloud className="w-20 h-20 text-blue-300/20" />
        </motion.div>
        <motion.div
          className="absolute top-[70%] left-[30%]"
          animate={{ y: [-25, 25, -25], x: [10, -10, 10] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        >
          <Code className="w-16 h-16 text-cyan-400/25" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Logo/Brand */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 inline-block"
          >
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-50" />
              <h1 className="relative text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400">
                haba.io
              </h1>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl font-extralight text-gray-300 mb-6 tracking-wide"
          >
            Data & AI Architecture
            <span className="block text-lg md:text-xl mt-3 text-gray-500 font-light">
              Strategic Intelligence Solutions
            </span>
          </motion.p>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-2xl mx-auto mb-16"
          >
            <p className="text-base text-gray-500 leading-relaxed font-light">
              Architecting intelligent systems that transform enterprise data into competitive advantage.
              We design, build, and scale AI-driven solutions for tomorrow's challenges.
            </p>
          </motion.div>

          {/* Feature Cards - Abstract Design */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto"
          >
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-purple-600/5 rounded-xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative glass rounded-xl p-8 border border-white/5 hover:border-purple-500/20 transition-all">
                <Brain className="w-8 h-8 text-purple-400/60 mb-4" />
                <h3 className="text-base font-light mb-2 text-gray-300">Intelligence</h3>
                <p className="text-xs text-gray-500 leading-relaxed">AI-first architecture design</p>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-cyan-600/5 rounded-xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative glass rounded-xl p-8 border border-white/5 hover:border-cyan-500/20 transition-all">
                <Database className="w-8 h-8 text-cyan-400/60 mb-4" />
                <h3 className="text-base font-light mb-2 text-gray-300">Infrastructure</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Scalable data ecosystems</p>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-600/5 rounded-xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative glass rounded-xl p-8 border border-white/5 hover:border-blue-500/20 transition-all">
                <Sparkles className="w-8 h-8 text-blue-400/60 mb-4" />
                <h3 className="text-base font-light mb-2 text-gray-300">Innovation</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Next-generation solutions</p>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <button
              onClick={handleLogin}
              className="group relative inline-flex items-center gap-3 px-10 py-4 overflow-hidden rounded-full border border-white/10 text-white font-light text-base transition-all hover:border-white/20 hover:bg-white/5"
            >
              <span className="relative z-10">Enter Platform</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Client Trust Section - Abstract and Discreet */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-20"
          >
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-8">Trusted Partners</p>
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
                {/* Government & Public Sector */}
                <motion.div
                  whileHover={{ opacity: 1 }}
                  className="group"
                >
                  <span className="text-gray-400 text-sm font-light tracking-wide">NHS</span>
                </motion.div>
                <motion.div
                  whileHover={{ opacity: 1 }}
                  className="group"
                >
                  <span className="text-gray-400 text-sm font-light tracking-wide">Home Office</span>
                </motion.div>
                
                {/* Media & Communications */}
                <motion.div
                  whileHover={{ opacity: 1 }}
                  className="group"
                >
                  <span className="text-gray-400 text-sm font-light tracking-wide">BBC</span>
                </motion.div>
                
                {/* Professional Services */}
                <motion.div
                  whileHover={{ opacity: 1 }}
                  className="group"
                >
                  <span className="text-gray-400 text-sm font-light tracking-wide">RGA</span>
                </motion.div>
                <motion.div
                  whileHover={{ opacity: 1 }}
                  className="group"
                >
                  <span className="text-gray-400 text-sm font-light tracking-wide">Capita</span>
                </motion.div>
                
                {/* Financial Services */}
                <motion.div
                  whileHover={{ opacity: 1 }}
                  className="group"
                >
                  <span className="text-gray-400 text-sm font-light tracking-wide">Howden Group</span>
                </motion.div>
                <motion.div
                  whileHover={{ opacity: 1 }}
                  className="group"
                >
                  <span className="text-gray-400 text-sm font-light tracking-wide">AllianzGI</span>
                </motion.div>
                
                {/* Technology & Maritime */}
                <motion.div
                  whileHover={{ opacity: 1 }}
                  className="group"
                >
                  <span className="text-gray-400 text-sm font-light tracking-wide">Marlink</span>
                </motion.div>
                
                {/* Startups Indicator */}
                <motion.div
                  whileHover={{ opacity: 1 }}
                  className="group"
                >
                  <span className="text-gray-400 text-sm font-light italic">+ Innovative Startups</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default LandingPage
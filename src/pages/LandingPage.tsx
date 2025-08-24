import { motion } from 'framer-motion'
import { Brain, Database, Sparkles, ArrowRight, Network, Code, Cpu, Cloud } from 'lucide-react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const LandingPage = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = () => {
    window.location.href = '/auth/google'
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
            className="text-2xl md:text-3xl font-light text-gray-300 mb-6"
          >
            Data & AI Architecture
            <span className="block text-xl md:text-2xl mt-2 text-gray-400">
              Transforming Business Through Intelligence
            </span>
          </motion.p>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <p className="text-lg text-gray-400 leading-relaxed">
              Expert consultancy helping enterprises leverage cutting-edge data infrastructure 
              and artificial intelligence to drive innovation, optimize operations, and unlock 
              unprecedented growth potential.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
          >
            <div className="glass rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all">
              <Brain className="w-10 h-10 text-purple-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">AI Strategy</h3>
              <p className="text-sm text-gray-400">Custom AI solutions tailored to your business needs</p>
            </div>
            <div className="glass rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-400/40 transition-all">
              <Database className="w-10 h-10 text-cyan-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Data Architecture</h3>
              <p className="text-sm text-gray-400">Scalable infrastructure for modern data operations</p>
            </div>
            <div className="glass rounded-2xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all">
              <Sparkles className="w-10 h-10 text-blue-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Innovation</h3>
              <p className="text-sm text-gray-400">Cutting-edge solutions for competitive advantage</p>
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
              className="group relative inline-flex items-center gap-3 px-8 py-4 overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg shadow-2xl transition-all hover:scale-105 hover:shadow-purple-500/25"
            >
              <span className="relative z-10">Access Dashboard</span>
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          </motion.div>

          {/* Client Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16"
          >
            <p className="text-sm text-gray-500 mb-4">Trusted by industry leaders</p>
            <div className="flex items-center justify-center gap-8">
              <div className="text-gray-600 font-semibold text-xl">Marlink</div>
              <div className="text-gray-600 font-semibold text-xl">AllianzGI</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default LandingPage
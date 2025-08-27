import { motion } from 'framer-motion'
import { Users, Plus, Mail, Phone, Globe, Calendar, DollarSign, TrendingUp } from 'lucide-react'

const Clients = () => {
  const clients = [
    {
      id: 'rga',
      name: 'RGA',
      initial: 'R',
      industry: 'Reinsurance',
      sector: 'Financial Services',
      status: 'active',
      engagement: 'Strategic Partnership'
    },
    {
      id: 'bbc',
      name: 'BBC',
      initial: 'B',
      industry: 'Media & Broadcasting',
      sector: 'Media',
      status: 'active',
      engagement: 'Digital Transformation'
    },
    {
      id: 'nhs',
      name: 'NHS',
      initial: 'N',
      industry: 'Healthcare',
      sector: 'Public Sector',
      status: 'active',
      engagement: 'Data Architecture'
    },
    {
      id: 'home-office',
      name: 'Home Office',
      initial: 'H',
      industry: 'Government',
      sector: 'Public Sector',
      status: 'active',
      engagement: 'AI Implementation'
    },
    {
      id: 'capita',
      name: 'Capita',
      initial: 'C',
      industry: 'Business Services',
      sector: 'Professional Services',
      status: 'active',
      engagement: 'Digital Strategy'
    },
    {
      id: 'howden',
      name: 'Howden Group',
      initial: 'H',
      industry: 'Insurance Brokerage',
      sector: 'Financial Services',
      status: 'active',
      engagement: 'Data Analytics'
    },
    {
      id: 'allianzgi',
      name: 'AllianzGI',
      initial: 'A',
      industry: 'Asset Management',
      sector: 'Financial Services',
      status: 'active',
      engagement: 'Intelligence Platform'
    },
    {
      id: 'marlink',
      name: 'Marlink',
      initial: 'M',
      industry: 'Maritime Communications',
      sector: 'Technology',
      status: 'active',
      engagement: 'IoT Integration'
    }
  ]
  
  const startupClients = [
    { id: 's1', name: 'Series A FinTech', sector: 'Financial Technology' },
    { id: 's2', name: 'Series B HealthTech', sector: 'Healthcare Technology' },
    { id: 's3', name: 'Seed Stage AI', sector: 'Artificial Intelligence' }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Clients</h1>
          <p className="text-gray-400">Manage your client relationships</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-lg transition-all">
          <Plus className="w-5 h-5" />
          Add Client
        </button>
      </motion.div>

      {/* Client Grid - Professional & Abstract */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {clients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative glass rounded-xl p-6 border border-white/5 hover:border-white/10 transition-all">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 mb-4">
                <span className="text-lg font-light text-gray-300">{client.initial}</span>
              </div>
              <h3 className="text-sm font-normal text-white mb-1">{client.name}</h3>
              <p className="text-xs text-gray-500 mb-3">{client.sector}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">{client.engagement}</span>
                <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Startup Portfolio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass rounded-2xl p-6 border border-white/5 mb-8"
      >
        <h2 className="text-lg font-light text-white mb-4">Startup Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {startupClients.map((startup, index) => (
            <div key={startup.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div>
                <p className="text-sm text-gray-300">{startup.name}</p>
                <p className="text-xs text-gray-500">{startup.sector}</p>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50"></div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-4 italic">+ Additional early-stage ventures</p>
      </motion.div>

      {/* Performance Metrics - Abstract Design */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="glass rounded-2xl p-8 border border-white/5"
      >
        <h2 className="text-base font-light text-gray-400 mb-8 uppercase tracking-wider">Performance Metrics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-lg" />
            <div className="relative">
              <p className="text-xs text-gray-500 mb-2">Portfolio</p>
              <p className="text-2xl font-light text-white">11</p>
              <p className="text-xs text-gray-600 mt-1">Active Engagements</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-lg" />
            <div className="relative">
              <p className="text-xs text-gray-500 mb-2">Growth</p>
              <p className="text-2xl font-light text-white">+22%</p>
              <p className="text-xs text-gray-600 mt-1">Year over Year</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-lg" />
            <div className="relative">
              <p className="text-xs text-gray-500 mb-2">Delivery</p>
              <p className="text-2xl font-light text-white">98%</p>
              <p className="text-xs text-gray-600 mt-1">Success Rate</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-lg" />
            <div className="relative">
              <p className="text-xs text-gray-500 mb-2">Retention</p>
              <p className="text-2xl font-light text-white">3.2yr</p>
              <p className="text-xs text-gray-600 mt-1">Average Duration</p>
            </div>
          </div>
        </div>
        
        {/* Sectors Distribution */}
        <div className="mt-8 pt-8 border-t border-white/5">
          <p className="text-xs text-gray-500 mb-4">Sector Distribution</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs bg-white/5 text-gray-400">Financial Services 35%</span>
            <span className="px-3 py-1 rounded-full text-xs bg-white/5 text-gray-400">Public Sector 25%</span>
            <span className="px-3 py-1 rounded-full text-xs bg-white/5 text-gray-400">Technology 20%</span>
            <span className="px-3 py-1 rounded-full text-xs bg-white/5 text-gray-400">Media 10%</span>
            <span className="px-3 py-1 rounded-full text-xs bg-white/5 text-gray-400">Startups 10%</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Clients
import { motion } from 'framer-motion'
import { Plus, Filter, Search, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSector, setSelectedSector] = useState('all')

  const clients = [
    {
      id: 'rga',
      name: 'RGA',
      sector: 'Financial Services',
      type: 'Reinsurance',
      engagement: 'Strategic AI Partnership',
      status: 'active',
      startYear: '2022',
      value: 'Enterprise'
    },
    {
      id: 'bbc',
      name: 'BBC',
      sector: 'Media',
      type: 'Broadcasting',
      engagement: 'Digital Transformation',
      status: 'active',
      startYear: '2021',
      value: 'Enterprise'
    },
    {
      id: 'nhs',
      name: 'NHS',
      sector: 'Public Sector',
      type: 'Healthcare',
      engagement: 'Data Architecture',
      status: 'active',
      startYear: '2023',
      value: 'Enterprise'
    },
    {
      id: 'home-office',
      name: 'Home Office',
      sector: 'Public Sector',
      type: 'Government',
      engagement: 'AI Implementation',
      status: 'active',
      startYear: '2022',
      value: 'Enterprise'
    },
    {
      id: 'capita',
      name: 'Capita',
      sector: 'Professional Services',
      type: 'Business Services',
      engagement: 'Digital Strategy',
      status: 'active',
      startYear: '2023',
      value: 'Enterprise'
    },
    {
      id: 'howden',
      name: 'Howden Group',
      sector: 'Financial Services',
      type: 'Insurance',
      engagement: 'Data Analytics Platform',
      status: 'active',
      startYear: '2021',
      value: 'Enterprise'
    },
    {
      id: 'allianzgi',
      name: 'AllianzGI',
      sector: 'Financial Services',
      type: 'Asset Management',
      engagement: 'Intelligence Platform',
      status: 'active',
      startYear: '2020',
      value: 'Enterprise'
    },
    {
      id: 'marlink',
      name: 'Marlink',
      sector: 'Technology',
      type: 'Maritime Tech',
      engagement: 'IoT Data Integration',
      status: 'active',
      startYear: '2022',
      value: 'Enterprise'
    }
  ]

  const startups = [
    {
      id: 's1',
      name: 'Confidential',
      sector: 'FinTech',
      stage: 'Series A',
      engagement: 'ML Infrastructure'
    },
    {
      id: 's2',
      name: 'Confidential',
      sector: 'HealthTech',
      stage: 'Series B',
      engagement: 'AI Strategy'
    },
    {
      id: 's3',
      name: 'Confidential',
      sector: 'AI/ML',
      stage: 'Seed',
      engagement: 'Technical Advisory'
    }
  ]

  const sectors = ['all', 'Financial Services', 'Public Sector', 'Technology', 'Media', 'Professional Services']

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.engagement.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSector = selectedSector === 'all' || client.sector === selectedSector
    return matchesSearch && matchesSector
  })

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      {/* Header */}
      <div className="px-8 lg:px-16 py-8 border-b border-white/[0.06]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-thin text-white/90 mb-2">Client Portfolio</h1>
              <p className="text-sm text-gray-500">Strategic partnerships and engagements</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-2.5 border border-white/10 text-white/80 font-light text-sm transition-all hover:border-white/20 hover:bg-white/[0.02]">
              <Plus className="w-4 h-4" />
              New Engagement
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search clients or engagements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/[0.02] border border-white/[0.06] text-white/80 placeholder-gray-600 text-sm focus:outline-none focus:border-white/20 transition-colors"
              />
            </div>
            <div className="flex gap-2">
              {sectors.map(sector => (
                <button
                  key={sector}
                  onClick={() => setSelectedSector(sector)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider transition-all ${
                    selectedSector === sector
                      ? 'text-white/90 border-b border-white/40'
                      : 'text-gray-500 hover:text-white/60'
                  }`}
                >
                  {sector === 'all' ? 'All' : sector}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="px-8 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Enterprise Clients Table */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-16"
          >
            <h2 className="text-xs uppercase tracking-[0.3em] text-gray-600 mb-8">Enterprise Clients</h2>
            
            <div className="overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left py-4 text-xs uppercase tracking-wider text-gray-500 font-normal">Client</th>
                    <th className="text-left py-4 text-xs uppercase tracking-wider text-gray-500 font-normal">Sector</th>
                    <th className="text-left py-4 text-xs uppercase tracking-wider text-gray-500 font-normal">Engagement</th>
                    <th className="text-left py-4 text-xs uppercase tracking-wider text-gray-500 font-normal">Since</th>
                    <th className="text-left py-4 text-xs uppercase tracking-wider text-gray-500 font-normal">Status</th>
                    <th className="text-left py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client, index) => (
                    <motion.tr
                      key={client.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="py-5">
                        <div>
                          <div className="text-white/90 font-light">{client.name}</div>
                          <div className="text-xs text-gray-600">{client.type}</div>
                        </div>
                      </td>
                      <td className="py-5">
                        <span className="text-sm text-gray-400">{client.sector}</span>
                      </td>
                      <td className="py-5">
                        <span className="text-sm text-gray-300">{client.engagement}</span>
                      </td>
                      <td className="py-5">
                        <span className="text-sm text-gray-500">{client.startYear}</span>
                      </td>
                      <td className="py-5">
                        <span className="inline-flex items-center px-2 py-1 text-xs text-green-400/80 bg-green-400/10 border border-green-400/20">
                          Active
                        </span>
                      </td>
                      <td className="py-5">
                        <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Startup Portfolio */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-xs uppercase tracking-[0.3em] text-gray-600 mb-8">Startup Advisory</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {startups.map((startup, index) => (
                <motion.div
                  key={startup.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="p-6 border border-white/[0.06] hover:border-white/[0.12] transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{startup.name}</p>
                      <p className="text-xs text-gray-600">{startup.sector} · {startup.stage}</p>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50"></div>
                  </div>
                  <p className="text-xs text-gray-500">{startup.engagement}</p>
                </motion.div>
              ))}
            </div>
            
            <p className="text-xs text-gray-700 mt-6 text-center italic">
              + Additional early-stage ventures under NDA
            </p>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-t border-white/[0.06]"
          >
            <div>
              <p className="text-2xl font-thin text-white/90">11</p>
              <p className="text-xs uppercase tracking-wider text-gray-600 mt-1">Active Clients</p>
            </div>
            <div>
              <p className="text-2xl font-thin text-white/90">98%</p>
              <p className="text-xs uppercase tracking-wider text-gray-600 mt-1">Success Rate</p>
            </div>
            <div>
              <p className="text-2xl font-thin text-white/90">3.2yr</p>
              <p className="text-xs uppercase tracking-wider text-gray-600 mt-1">Avg Retention</p>
            </div>
            <div>
              <p className="text-2xl font-thin text-white/90">5</p>
              <p className="text-xs uppercase tracking-wider text-gray-600 mt-1">Sectors</p>
            </div>
            <div>
              <p className="text-2xl font-thin text-white/90">£2M+</p>
              <p className="text-xs uppercase tracking-wider text-gray-600 mt-1">Annual Value</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Clients
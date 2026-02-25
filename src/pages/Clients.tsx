import { motion } from 'framer-motion'
import { Plus, Search, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSector, setSelectedSector] = useState('all')

  const clients = [
    { id: 'allianzgi', name: 'Allianz GI', sector: 'Financial Services', type: 'Asset Management', engagement: 'AI & Data Platform', status: 'active', startYear: '2024', value: 'Enterprise' },
    { id: 'howden', name: 'Howden Group', sector: 'Financial Services', type: 'Insurance', engagement: 'Cloud & Data Architecture', status: 'active', startYear: '2020', value: 'Enterprise' },
    { id: 'capita', name: 'Capita', sector: 'Professional Services', type: 'Business Services', engagement: 'AI Platform Centralisation', status: 'active', startYear: '2018', value: 'Enterprise' },
    { id: 'home-office', name: 'Home Office', sector: 'Public Sector', type: 'Government', engagement: 'Enterprise Architecture', status: 'active', startYear: '2022', value: 'Enterprise' },
    { id: 'nhs', name: 'NHS', sector: 'Public Sector', type: 'Healthcare', engagement: 'Data Migration', status: 'active', startYear: '2023', value: 'Enterprise' },
    { id: 'bbc', name: 'BBC', sector: 'Media', type: 'Broadcasting', engagement: 'Digital Transformation', status: 'active', startYear: '2021', value: 'Enterprise' },
    { id: 'marlink', name: 'Marlink', sector: 'Technology', type: 'Maritime Tech', engagement: 'Data Architecture', status: 'active', startYear: '2022', value: 'Enterprise' },
    { id: 'ifad', name: 'IFAD (UN)', sector: 'International', type: 'United Nations', engagement: 'CCAI Chatbot', status: 'completed', startYear: '2020', value: 'Enterprise' },
    { id: 'rga', name: 'RGA', sector: 'Financial Services', type: 'Reinsurance', engagement: 'Strategic AI Partnership', status: 'active', startYear: '2022', value: 'Enterprise' },
    { id: 'pa', name: 'PA Consulting', sector: 'Professional Services', type: 'Consulting', engagement: 'NHS Data Architecture', status: 'active', startYear: '2023', value: 'Enterprise' },
  ]

  const startups = [
    { id: 's1', name: 'Confidential', sector: 'FinTech', stage: 'Series A', engagement: 'ML Infrastructure' },
    { id: 's2', name: 'Confidential', sector: 'HealthTech', stage: 'Series B', engagement: 'AI Strategy' },
    { id: 's3', name: 'Confidential', sector: 'AI/ML', stage: 'Seed', engagement: 'Technical Advisory' },
  ]

  const sectors = ['all', 'Financial Services', 'Public Sector', 'Technology', 'Media', 'Professional Services', 'International']

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.engagement.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSector = selectedSector === 'all' || client.sector === selectedSector
    return matchesSearch && matchesSector
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Client Portfolio</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Strategic partnerships and engagements</p>
          </div>
          <button className="btn-primary inline-flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" />
            New Engagement
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-1">
            {sectors.map(sector => (
              <button
                key={sector}
                onClick={() => setSelectedSector(sector)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all"
                style={{
                  backgroundColor: selectedSector === sector ? 'var(--accent)' : 'var(--bg-tertiary)',
                  color: selectedSector === sector ? '#fff' : 'var(--text-secondary)',
                }}
              >
                {sector === 'all' ? 'All' : sector}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Enterprise Clients */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>
          Enterprise Clients ({filteredClients.length})
        </h2>

        <div className="card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <th className="text-left px-5 py-3 text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--text-tertiary)' }}>Client</th>
                  <th className="text-left px-5 py-3 text-xs uppercase tracking-wider font-semibold hidden md:table-cell" style={{ color: 'var(--text-tertiary)' }}>Sector</th>
                  <th className="text-left px-5 py-3 text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--text-tertiary)' }}>Engagement</th>
                  <th className="text-left px-5 py-3 text-xs uppercase tracking-wider font-semibold hidden sm:table-cell" style={{ color: 'var(--text-tertiary)' }}>Since</th>
                  <th className="text-left px-5 py-3 text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--text-tertiary)' }}>Status</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client, index) => (
                  <motion.tr
                    key={client.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="group transition-colors cursor-pointer"
                    style={{ borderBottom: '1px solid var(--border-color)' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{client.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{client.type}</p>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{client.sector}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{client.engagement}</span>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{client.startYear}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
                        client.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-gray-500/10 text-gray-600 dark:text-gray-400'
                      }`}>
                        {client.status === 'active' ? 'Active' : 'Completed'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <ChevronRight className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Startup Advisory */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>
          Startup Advisory
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {startups.map((startup, index) => (
            <motion.div
              key={startup.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.08 }}
              className="card rounded-xl p-5"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{startup.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{startup.sector} &middot; {startup.stage}</p>
                </div>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
              </div>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{startup.engagement}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Metrics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-4"
      >
        {[
          { value: '13', label: 'Total Clients' },
          { value: '98%', label: 'Success Rate' },
          { value: '3.2yr', label: 'Avg Retention' },
          { value: '6', label: 'Sectors' },
          { value: '£2M+', label: 'Annual Value' },
        ].map((stat) => (
          <div key={stat.label} className="card rounded-xl p-4 text-center">
            <p className="text-xl font-bold text-gradient">{stat.value}</p>
            <p className="text-xs mt-1 font-medium" style={{ color: 'var(--text-tertiary)' }}>{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default Clients

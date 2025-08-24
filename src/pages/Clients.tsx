import { motion } from 'framer-motion'
import { Users, Plus, Mail, Phone, Globe, Calendar, DollarSign, TrendingUp } from 'lucide-react'

const Clients = () => {
  const clients = [
    {
      id: 'marlink',
      name: 'Marlink',
      logo: '🚢',
      industry: 'Maritime Communications',
      contact: 'John Andersson',
      email: 'john.andersson@marlink.com',
      phone: '+33 1 70 48 98 00',
      website: 'www.marlink.com',
      status: 'active',
      projects: 5,
      revenue: '$450,000',
      lastContact: '2 days ago'
    },
    {
      id: 'allianzgi',
      name: 'AllianzGI',
      logo: '🏦',
      industry: 'Asset Management',
      contact: 'Sarah Mitchell',
      email: 'sarah.mitchell@allianzgi.com',
      phone: '+49 69 263 0',
      website: 'www.allianzgi.com',
      status: 'active',
      projects: 3,
      revenue: '$320,000',
      lastContact: '1 week ago'
    }
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

      {/* Client Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{client.logo}</div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{client.name}</h3>
                  <p className="text-sm text-gray-400">{client.industry}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                client.status === 'active' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {client.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3 text-sm">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-gray-400">Contact:</span>
                <span className="text-white">{client.contact}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-gray-400">Email:</span>
                <span className="text-white">{client.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-gray-400">Phone:</span>
                <span className="text-white">{client.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="text-gray-400">Website:</span>
                <span className="text-white">{client.website}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{client.projects}</p>
                <p className="text-xs text-gray-400">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">{client.revenue}</p>
                <p className="text-xs text-gray-400">Revenue</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-white">{client.lastContact}</p>
                <p className="text-xs text-gray-400">Last Contact</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass rounded-2xl p-6 border border-white/10"
      >
        <h2 className="text-xl font-semibold text-white mb-6">Client Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-gray-400">Total Clients</span>
            </div>
            <p className="text-3xl font-bold text-white">8</p>
            <p className="text-xs text-green-400 mt-1">+2 this quarter</p>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-400">Total Revenue</span>
            </div>
            <p className="text-3xl font-bold text-white">$770K</p>
            <p className="text-xs text-green-400 mt-1">+15% YoY</p>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-400">Active Projects</span>
            </div>
            <p className="text-3xl font-bold text-white">12</p>
            <p className="text-xs text-blue-400 mt-1">8 in progress</p>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-gray-400">Avg. Retention</span>
            </div>
            <p className="text-3xl font-bold text-white">2.3yr</p>
            <p className="text-xs text-cyan-400 mt-1">Above industry avg</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Clients
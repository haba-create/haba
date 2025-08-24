import { motion } from 'framer-motion'
import { 
  FileText, 
  Bot, 
  Users, 
  Briefcase, 
  TrendingUp, 
  Calendar,
  DollarSign,
  Activity
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()

  const stats = [
    { label: 'Active Projects', value: '12', icon: Briefcase, color: 'from-purple-500 to-purple-600', change: '+2' },
    { label: 'Total Clients', value: '8', icon: Users, color: 'from-blue-500 to-blue-600', change: '+1' },
    { label: 'Documents', value: '47', icon: FileText, color: 'from-cyan-500 to-cyan-600', change: '+5' },
    { label: 'AI Queries', value: '234', icon: Bot, color: 'from-pink-500 to-pink-600', change: '+18' },
  ]

  const quickActions = [
    { label: 'Generate Document', icon: FileText, path: '/dashboard/documents', color: 'purple' },
    { label: 'AI Assistant', icon: Bot, path: '/dashboard/ai', color: 'blue' },
    { label: 'View Clients', icon: Users, path: '/dashboard/clients', color: 'cyan' },
    { label: 'Manage Projects', icon: Briefcase, path: '/dashboard/projects', color: 'pink' },
  ]

  const recentActivity = [
    { action: 'Generated proposal for Marlink', time: '2 hours ago', icon: FileText },
    { action: 'AI analysis completed for AllianzGI', time: '5 hours ago', icon: Bot },
    { action: 'New project milestone reached', time: '1 day ago', icon: TrendingUp },
    { action: 'Client meeting scheduled', time: '2 days ago', icon: Calendar },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening with your consultancy.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
            className="glass rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-green-400 font-medium">{stat.change}</span>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass rounded-2xl p-6 border border-white/10"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="group relative overflow-hidden rounded-xl p-4 glass-dark border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="relative z-10">
                  <action.icon className="w-8 h-8 text-white mb-2" />
                  <p className="text-sm text-gray-300">{action.label}</p>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-r from-${action.color}-600/10 to-${action.color}-600/5 opacity-0 group-hover:opacity-100 transition-opacity`} />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass rounded-2xl p-6 border border-white/10"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="p-2 rounded-lg glass-dark">
                  <activity.icon className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-300">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Revenue Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass rounded-2xl p-6 border border-white/10"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Revenue Overview</h2>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            <span className="text-sm text-gray-400">Last 6 months</span>
          </div>
        </div>
        <div className="h-64 flex items-center justify-center glass-dark rounded-xl">
          <div className="text-center">
            <Activity className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500">Revenue chart will be displayed here</p>
            <p className="text-xs text-gray-600 mt-1">Integration coming soon</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard
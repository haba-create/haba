import { motion } from 'framer-motion'
import {
  FileText,
  Bot,
  Users,
  Briefcase,
  TrendingUp,
  Calendar,
  Activity,
  ArrowUpRight,
  ArrowRight,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const stats = [
    { label: 'Active Projects', value: '12', icon: Briefcase, change: '+2', color: '#0EA5E9' },
    { label: 'Total Clients', value: '8', icon: Users, change: '+1', color: '#8B5CF6' },
    { label: 'Documents', value: '47', icon: FileText, change: '+5', color: '#10B981' },
    { label: 'AI Queries', value: '234', icon: Bot, change: '+18', color: '#F59E0B' },
  ]

  const quickActions = [
    { label: 'Generate Document', description: 'Create AI-powered docs', icon: FileText, path: '/dashboard/documents' },
    { label: 'AI Assistant', description: 'Chat with AI models', icon: Bot, path: '/dashboard/ai' },
    { label: 'View Clients', description: 'Client directory', icon: Users, path: '/dashboard/clients' },
    { label: 'Manage Projects', description: 'Project overview', icon: Briefcase, path: '/dashboard/projects' },
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
        <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Welcome back, {user?.displayName || 'User'}
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Here's an overview of your consultancy activity.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
            className="card rounded-xl p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-500">
                <ArrowUpRight className="w-3 h-3" />
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
            <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card rounded-xl p-5"
        >
          <h2 className="text-base font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="group text-left p-4 rounded-xl transition-all duration-200"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.backgroundColor = 'var(--accent-light)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent'
                  e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'
                }}
              >
                <action.icon className="w-5 h-5 mb-2" style={{ color: 'var(--accent)' }} />
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{action.label}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{action.description}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Recent Activity</h2>
            <button className="text-xs font-medium flex items-center gap-1" style={{ color: 'var(--accent)' }}>
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg transition-colors"
                style={{ backgroundColor: 'var(--bg-tertiary)' }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'var(--accent-light)' }}
                >
                  <activity.icon className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{activity.action}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Revenue Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card rounded-xl p-5"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Revenue Overview</h2>
          <span className="text-xs font-medium px-2 py-1 rounded-md" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-tertiary)' }}>
            Last 6 months
          </span>
        </div>
        <div className="h-48 flex items-center justify-center rounded-xl" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
          <div className="text-center">
            <Activity className="w-10 h-10 mx-auto mb-2" style={{ color: 'var(--text-tertiary)' }} />
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Revenue chart coming soon</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard

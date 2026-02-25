import { motion } from 'framer-motion'
import { Briefcase, Plus, Clock, CheckCircle, AlertCircle, Calendar, Users, TrendingUp } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: 'AI & Data Platform',
      client: 'Allianz GI',
      status: 'in-progress',
      progress: 75,
      deadline: '2025-06-01',
      team: 3,
      budget: '£180,000',
      description: 'Architecting Databricks AI & Data Platform with focus on AI Agents & Compliance'
    },
    {
      id: 2,
      name: 'Financial AI Assistant',
      client: 'Edge AI',
      status: 'in-progress',
      progress: 85,
      deadline: '2025-03-01',
      team: 2,
      budget: '£120,000',
      description: 'GenAI financial analysis assistant with RAG, multi-model support across 3 clouds'
    },
    {
      id: 3,
      name: 'Data Lake Architecture',
      client: 'Marlink',
      status: 'completed',
      progress: 100,
      deadline: '2024-01-10',
      team: 2,
      budget: '£85,000',
      description: 'Centralised data storage and processing infrastructure for maritime operations'
    },
    {
      id: 4,
      name: 'ESG Reporting Automation',
      client: 'Allianz GI',
      status: 'planning',
      progress: 10,
      deadline: '2025-09-01',
      team: 2,
      budget: '£95,000',
      description: 'Automated ESG metrics collection and compliance reporting system'
    }
  ]

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'completed': return { bg: 'rgba(16, 185, 129, 0.1)', text: '#10B981', border: 'rgba(16, 185, 129, 0.2)' }
      case 'in-progress': return { bg: 'rgba(14, 165, 233, 0.1)', text: '#0EA5E9', border: 'rgba(14, 165, 233, 0.2)' }
      case 'planning': return { bg: 'rgba(245, 158, 11, 0.1)', text: '#F59E0B', border: 'rgba(245, 158, 11, 0.2)' }
      default: return { bg: 'var(--bg-tertiary)', text: 'var(--text-tertiary)', border: 'var(--border-color)' }
    }
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return CheckCircle
      case 'in-progress': return Clock
      case 'planning': return AlertCircle
      default: return Clock
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Projects</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Track and manage consultancy projects</p>
        </div>
        <button className="btn-primary inline-flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </motion.div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {projects.map((project, index) => {
          const StatusIcon = getStatusIcon(project.status)
          const statusStyle = getStatusStyle(project.status)
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="card rounded-xl p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{project.name}</h3>
                  <p className="text-sm mt-0.5" style={{ color: 'var(--accent)' }}>{project.client}</p>
                </div>
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ml-3"
                  style={{
                    backgroundColor: statusStyle.bg,
                    color: statusStyle.text,
                    border: `1px solid ${statusStyle.border}`,
                  }}
                >
                  <StatusIcon className="w-3 h-3" />
                  {project.status}
                </span>
              </div>

              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {project.description}
              </p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span style={{ color: 'var(--text-tertiary)' }}>Progress</span>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{project.progress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${project.progress}%`,
                      background: 'linear-gradient(135deg, #0EA5E9, #8B5CF6)',
                    }}
                  />
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" style={{ color: 'var(--text-tertiary)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{project.deadline}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" style={{ color: 'var(--text-tertiary)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{project.team} members</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" style={{ color: 'var(--text-tertiary)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{project.budget}</span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card rounded-xl p-5"
      >
        <h2 className="text-base font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>Project Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { icon: CheckCircle, count: '8', label: 'Completed', color: '#10B981' },
            { icon: Clock, count: '4', label: 'In Progress', color: '#0EA5E9' },
            { icon: AlertCircle, count: '2', label: 'Planning', color: '#F59E0B' },
            { icon: Briefcase, count: '14', label: 'Total', color: '#8B5CF6' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="w-12 h-12 mx-auto mb-2 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{stat.count}</p>
              <p className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Projects

import { motion } from 'framer-motion'
import { Briefcase, Plus, Clock, CheckCircle, AlertCircle, Calendar, Users, TrendingUp } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: 'AI-Powered Fleet Management System',
      client: 'Marlink',
      status: 'in-progress',
      progress: 75,
      deadline: '2024-02-15',
      team: 3,
      budget: '$120,000',
      description: 'Implementing predictive maintenance and route optimization using ML models'
    },
    {
      id: 2,
      name: 'Portfolio Risk Analysis Platform',
      client: 'AllianzGI',
      status: 'in-progress',
      progress: 45,
      deadline: '2024-03-01',
      team: 4,
      budget: '$180,000',
      description: 'Real-time risk assessment and portfolio rebalancing recommendations'
    },
    {
      id: 3,
      name: 'Data Lake Architecture',
      client: 'Marlink',
      status: 'completed',
      progress: 100,
      deadline: '2024-01-10',
      team: 2,
      budget: '$85,000',
      description: 'Centralized data storage and processing infrastructure'
    },
    {
      id: 4,
      name: 'ESG Reporting Automation',
      client: 'AllianzGI',
      status: 'planning',
      progress: 10,
      deadline: '2024-04-01',
      team: 2,
      budget: '$95,000',
      description: 'Automated ESG metrics collection and reporting system'
    }
  ]

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'in-progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'planning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
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
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Projects</h1>
          <p className="text-gray-400">Track and manage your consultancy projects</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-lg transition-all">
          <Plus className="w-5 h-5" />
          New Project
        </button>
      </motion.div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project, index) => {
          const StatusIcon = getStatusIcon(project.status)
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">{project.name}</h3>
                  <p className="text-sm text-gray-400">{project.client}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(project.status)}`}>
                  <StatusIcon className="w-3 h-3" />
                  {project.status}
                </span>
              </div>

              <p className="text-sm text-gray-300 mb-4">{project.description}</p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white font-medium">{project.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full glass-dark overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-400">Deadline</p>
                    <p className="text-white">{project.deadline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-400">Team</p>
                    <p className="text-white">{project.team} members</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-400">Budget</p>
                    <p className="text-white">{project.budget}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Project Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass rounded-2xl p-6 border border-white/10"
      >
        <h2 className="text-xl font-semibold text-white mb-6">Project Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-r from-green-500/20 to-green-600/20 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">8</p>
            <p className="text-sm text-gray-400">Completed</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-blue-600/20 flex items-center justify-center">
              <Clock className="w-8 h-8 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">4</p>
            <p className="text-sm text-gray-400">In Progress</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-yellow-400" />
            </div>
            <p className="text-2xl font-bold text-white">2</p>
            <p className="text-sm text-gray-400">Planning</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-purple-600/20 flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white">14</p>
            <p className="text-sm text-gray-400">Total Projects</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Projects
import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Download, 
  Send, 
  Plus, 
  Edit, 
  Trash2,
  FileSignature,
  FileSpreadsheet,
  FileCheck,
  Building,
  Calendar,
  DollarSign
} from 'lucide-react'

const DocumentGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [selectedClient, setSelectedClient] = useState('')
  const [documentData, setDocumentData] = useState({
    title: '',
    projectName: '',
    deliveryDate: '',
    budget: '',
    scope: '',
    deliverables: '',
    terms: ''
  })

  const templates = [
    { id: 'proposal', name: 'Project Proposal', icon: FileSignature, description: 'Professional project proposals' },
    { id: 'report', name: 'Progress Report', icon: FileSpreadsheet, description: 'Detailed progress updates' },
    { id: 'invoice', name: 'Invoice', icon: DollarSign, description: 'Professional invoices' },
    { id: 'contract', name: 'Service Contract', icon: FileCheck, description: 'Service agreements' },
  ]

  const clients = [
    { id: 'marlink', name: 'Marlink', logo: '🚢' },
    { id: 'allianzgi', name: 'AllianzGI', logo: '🏦' },
  ]

  const recentDocuments = [
    { name: 'Marlink AI Integration Proposal', type: 'Proposal', date: '2024-01-15', status: 'sent' },
    { name: 'AllianzGI Q4 Progress Report', type: 'Report', date: '2024-01-10', status: 'draft' },
    { name: 'Marlink Invoice #2024-003', type: 'Invoice', date: '2024-01-05', status: 'paid' },
  ]

  const handleGenerate = () => {
    console.log('Generating document...', { selectedTemplate, selectedClient, documentData })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-white mb-2">Document Generator</h1>
        <p className="text-gray-400">Create professional documents for your clients</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Template Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Templates */}
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">Select Template</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`group relative overflow-hidden rounded-xl p-4 transition-all ${
                    selectedTemplate === template.id
                      ? 'glass border-2 border-purple-500'
                      : 'glass-dark border border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      selectedTemplate === template.id
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                        : 'bg-white/10'
                    }`}>
                      <template.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-white">{template.name}</p>
                      <p className="text-xs text-gray-400 mt-1">{template.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Client Selection */}
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">Select Client</h2>
            <div className="flex gap-4">
              {clients.map((client) => (
                <button
                  key={client.id}
                  onClick={() => setSelectedClient(client.id)}
                  className={`flex-1 rounded-xl p-4 transition-all ${
                    selectedClient === client.id
                      ? 'glass border-2 border-purple-500'
                      : 'glass-dark border border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="text-3xl mb-2">{client.logo}</div>
                  <p className="font-medium text-white">{client.name}</p>
                </button>
              ))}
              <button className="flex-1 rounded-xl p-4 glass-dark border border-white/10 hover:border-white/20 transition-all">
                <Plus className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Add Client</p>
              </button>
            </div>
          </div>

          {/* Document Details */}
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">Document Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Document Title</label>
                <input
                  type="text"
                  value={documentData.title}
                  onChange={(e) => setDocumentData({...documentData, title: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg glass-dark border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                  placeholder="Enter document title..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Project Name</label>
                  <input
                    type="text"
                    value={documentData.projectName}
                    onChange={(e) => setDocumentData({...documentData, projectName: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg glass-dark border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                    placeholder="Project name..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Delivery Date</label>
                  <input
                    type="date"
                    value={documentData.deliveryDate}
                    onChange={(e) => setDocumentData({...documentData, deliveryDate: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg glass-dark border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Budget</label>
                <input
                  type="text"
                  value={documentData.budget}
                  onChange={(e) => setDocumentData({...documentData, budget: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg glass-dark border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                  placeholder="Project budget..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Scope & Objectives</label>
                <textarea
                  value={documentData.scope}
                  onChange={(e) => setDocumentData({...documentData, scope: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg glass-dark border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none h-32 resize-none"
                  placeholder="Describe the project scope and objectives..."
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleGenerate}
                disabled={!selectedTemplate || !selectedClient}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
              >
                <FileText className="w-5 h-5" />
                Generate Document
              </button>
              <button className="px-6 py-3 rounded-xl glass-dark border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all">
                <Download className="w-5 h-5" />
              </button>
              <button className="px-6 py-3 rounded-xl glass-dark border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Recent Documents Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Documents</h2>
            <div className="space-y-3">
              {recentDocuments.map((doc, index) => (
                <div key={index} className="p-3 rounded-lg glass-dark border border-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <FileText className="w-4 h-4 text-gray-400 mt-1" />
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      doc.status === 'sent' ? 'bg-green-500/20 text-green-400' :
                      doc.status === 'paid' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-white mb-1">{doc.name}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{doc.type}</span>
                    <span>{doc.date}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 py-1 text-xs text-gray-400 hover:text-white transition-colors">
                      <Edit className="w-3 h-3 inline mr-1" />
                      Edit
                    </button>
                    <button className="flex-1 py-1 text-xs text-gray-400 hover:text-white transition-colors">
                      <Download className="w-3 h-3 inline mr-1" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h3 className="text-sm font-medium text-gray-400 mb-3">This Month</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Documents Created</span>
                <span className="text-lg font-semibold text-white">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Sent to Clients</span>
                <span className="text-lg font-semibold text-white">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Conversion Rate</span>
                <span className="text-lg font-semibold text-green-400">87%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DocumentGenerator
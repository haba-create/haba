import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
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
  DollarSign,
  CheckCircle,
  Clock,
  GitBranch,
  RefreshCw,
  Share2,
  Archive,
  AlertTriangle,
  Loader2,
  ChevronDown,
  ChevronRight,
  Eye,
  History,
  Upload,
  FolderOpen
} from 'lucide-react'

const EnhancedDocumentGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [selectedClient, setSelectedClient] = useState('')
  const [documentType, setDocumentType] = useState<'HLD' | 'LLD'>('HLD')
  const [loading, setLoading] = useState(false)
  const [templates, setTemplates] = useState<any[]>([])
  const [documents, setDocuments] = useState<any[]>([])
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [versions, setVersions] = useState<any[]>([])
  const [showVersionHistory, setShowVersionHistory] = useState(false)
  
  const [documentData, setDocumentData] = useState({
    projectName: '',
    requirements: {
      businessObjective: '',
      technicalRequirements: '',
      constraints: '',
      assumptions: '',
      scope: '',
      deliverables: '',
      timeline: '',
      budget: ''
    }
  })

  const documentTypes = [
    { 
      id: 'HLD', 
      name: 'High-Level Design', 
      icon: FileSignature, 
      description: 'System architecture and strategic design',
      color: 'from-purple-500 to-blue-500'
    },
    { 
      id: 'LLD', 
      name: 'Low-Level Design', 
      icon: FileSpreadsheet, 
      description: 'Detailed technical specifications',
      color: 'from-blue-500 to-cyan-500'
    }
  ]

  const clients = [
    { id: 'marlink', name: 'Marlink', logo: '🚢', industry: 'Maritime' },
    { id: 'allianzgi', name: 'AllianzGI', logo: '🏦', industry: 'Finance' },
  ]

  useEffect(() => {
    fetchTemplates()
    fetchDocuments()
  }, [])

  const fetchTemplates = async () => {
    try {
      const response = await axios.get('/api/templates')
      setTemplates(response.data.templates)
    } catch (error) {
      console.error('Error fetching templates:', error)
    }
  }

  const fetchDocuments = async () => {
    try {
      const response = await axios.get('/api/documents')
      setDocuments(response.data.documents)
    } catch (error) {
      console.error('Error fetching documents:', error)
    }
  }

  const fetchVersionHistory = async (documentId: string) => {
    try {
      const response = await axios.get(`/api/documents/${documentId}`)
      setVersions(response.data.versions)
      setShowVersionHistory(true)
    } catch (error) {
      console.error('Error fetching version history:', error)
    }
  }

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const response = await axios.post('/api/documents/generate', {
        documentType,
        client: selectedClient,
        projectName: documentData.projectName,
        requirements: documentData.requirements
      })

      if (response.data.success) {
        alert(`Document generated successfully! View at: ${response.data.document.webViewLink}`)
        fetchDocuments()
      }
    } catch (error) {
      console.error('Error generating document:', error)
      alert('Failed to generate document')
    } finally {
      setLoading(false)
    }
  }

  const handleApproveVersion = async (documentId: string, version: string) => {
    try {
      const response = await axios.post(`/api/documents/${documentId}/versions/${version}/approve`)
      if (response.data.success) {
        alert('Version approved successfully')
        fetchVersionHistory(documentId)
      }
    } catch (error) {
      console.error('Error approving version:', error)
    }
  }

  const handleRollback = async (documentId: string, targetVersion: string) => {
    if (!confirm(`Are you sure you want to rollback to version ${targetVersion}?`)) return
    
    try {
      const response = await axios.post(`/api/documents/${documentId}/rollback`, {
        targetVersion
      })
      if (response.data.success) {
        alert(`Document rolled back to version ${targetVersion}`)
        fetchDocuments()
      }
    } catch (error) {
      console.error('Error rolling back:', error)
    }
  }

  const handleExport = async (documentId: string, format: string) => {
    try {
      const response = await axios.get(`/api/documents/${documentId}/export?format=${format}`, {
        responseType: 'blob'
      })
      
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `document.${format}`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Error exporting document:', error)
    }
  }

  const handleShare = async (documentId: string) => {
    const email = prompt('Enter email address to share with:')
    if (!email) return
    
    const role = confirm('Grant edit access? (Cancel for read-only)') ? 'writer' : 'reader'
    
    try {
      const response = await axios.post(`/api/documents/${documentId}/share`, {
        email,
        role
      })
      if (response.data.success) {
        alert(`Document shared with ${email}`)
      }
    } catch (error) {
      console.error('Error sharing document:', error)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-start"
      >
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Professional Document Generator
          </h1>
          <p className="text-gray-400">
            Generate HLD & LLD architecture documents with AI assistance
          </p>
        </div>
        <button
          onClick={() => axios.post('/api/setup/folders')}
          className="px-4 py-2 rounded-lg glass-dark border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all flex items-center gap-2"
        >
          <FolderOpen className="w-4 h-4" />
          Setup Google Drive
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Document Type Selection */}
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">Document Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setDocumentType(type.id as 'HLD' | 'LLD')}
                  className={`group relative overflow-hidden rounded-xl p-4 transition-all ${
                    documentType === type.id
                      ? 'glass border-2 border-purple-500'
                      : 'glass-dark border border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${type.color}`}>
                      <type.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-white">{type.name}</p>
                      <p className="text-xs text-gray-400 mt-1">{type.description}</p>
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
                  <p className="text-xs text-gray-500 mt-1">{client.industry}</p>
                </button>
              ))}
              <button className="flex-1 rounded-xl p-4 glass-dark border border-white/10 hover:border-white/20 transition-all">
                <Plus className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Add Client</p>
              </button>
            </div>
          </div>

          {/* Document Requirements */}
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">Project Requirements</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Project Name</label>
                <input
                  type="text"
                  value={documentData.projectName}
                  onChange={(e) => setDocumentData({...documentData, projectName: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg glass-dark border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                  placeholder="Enter project name..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Business Objective</label>
                  <textarea
                    value={documentData.requirements.businessObjective}
                    onChange={(e) => setDocumentData({
                      ...documentData,
                      requirements: {...documentData.requirements, businessObjective: e.target.value}
                    })}
                    className="w-full px-4 py-2 rounded-lg glass-dark border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none h-24 resize-none"
                    placeholder="Primary business goals..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Technical Requirements</label>
                  <textarea
                    value={documentData.requirements.technicalRequirements}
                    onChange={(e) => setDocumentData({
                      ...documentData,
                      requirements: {...documentData.requirements, technicalRequirements: e.target.value}
                    })}
                    className="w-full px-4 py-2 rounded-lg glass-dark border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none h-24 resize-none"
                    placeholder="Key technical requirements..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Scope & Deliverables</label>
                <textarea
                  value={documentData.requirements.scope}
                  onChange={(e) => setDocumentData({
                    ...documentData,
                    requirements: {...documentData.requirements, scope: e.target.value}
                  })}
                  className="w-full px-4 py-2 rounded-lg glass-dark border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none h-32 resize-none"
                  placeholder="Project scope and key deliverables..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Timeline</label>
                  <input
                    type="text"
                    value={documentData.requirements.timeline}
                    onChange={(e) => setDocumentData({
                      ...documentData,
                      requirements: {...documentData.requirements, timeline: e.target.value}
                    })}
                    className="w-full px-4 py-2 rounded-lg glass-dark border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                    placeholder="Project timeline..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Budget</label>
                  <input
                    type="text"
                    value={documentData.requirements.budget}
                    onChange={(e) => setDocumentData({
                      ...documentData,
                      requirements: {...documentData.requirements, budget: e.target.value}
                    })}
                    className="w-full px-4 py-2 rounded-lg glass-dark border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                    placeholder="Project budget..."
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleGenerate}
                disabled={!documentType || !selectedClient || !documentData.projectName || loading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating with Claude AI...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    Generate {documentType} Document
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Recent Documents */}
          <div className="glass rounded-2xl p-6 border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Recent Documents</h2>
              <button
                onClick={fetchDocuments}
                className="p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <RefreshCw className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {documents.slice(0, 5).map((doc, index) => (
                <div key={index} className="p-3 rounded-lg glass-dark border border-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <FileText className="w-4 h-4 text-gray-400 mt-1" />
                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                      v{doc.currentVersion || '1.0.0'}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-white mb-1 truncate">{doc.name}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>{new Date(doc.modifiedTime).toLocaleDateString()}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <button
                      onClick={() => fetchVersionHistory(doc.id)}
                      className="py-1 text-xs text-gray-400 hover:text-white transition-colors flex items-center justify-center"
                      title="Version History"
                    >
                      <History className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleExport(doc.id, 'pdf')}
                      className="py-1 text-xs text-gray-400 hover:text-white transition-colors flex items-center justify-center"
                      title="Export"
                    >
                      <Download className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleShare(doc.id)}
                      className="py-1 text-xs text-gray-400 hover:text-white transition-colors flex items-center justify-center"
                      title="Share"
                    >
                      <Share2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Version History Modal */}
          {showVersionHistory && (
            <div className="glass rounded-2xl p-6 border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Version History</h3>
                <button
                  onClick={() => setShowVersionHistory(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {versions.map((version, index) => (
                  <div key={index} className="p-2 rounded glass-dark border border-white/10">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-white">v{version.version}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(version.timestamp).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{version.changelog}</p>
                      </div>
                      <div className="flex gap-1">
                        {!version.approved && (
                          <button
                            onClick={() => handleApproveVersion(selectedDocument?.id, version.version)}
                            className="p-1 rounded hover:bg-white/10"
                            title="Approve"
                          >
                            <CheckCircle className="w-3 h-3 text-green-400" />
                          </button>
                        )}
                        <button
                          onClick={() => handleRollback(selectedDocument?.id, version.version)}
                          className="p-1 rounded hover:bg-white/10"
                          title="Rollback"
                        >
                          <RefreshCw className="w-3 h-3 text-blue-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Document Stats */}
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Document Pipeline Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Documents Generated</span>
                <span className="text-lg font-semibold text-white">{documents.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Pending Approval</span>
                <span className="text-lg font-semibold text-yellow-400">
                  {versions.filter(v => !v.approved).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Claude API Status</span>
                <span className="text-sm font-semibold text-green-400">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Google Drive Status</span>
                <span className="text-sm font-semibold text-green-400">Connected</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default EnhancedDocumentGenerator
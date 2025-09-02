import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { 
  FileText, 
  Download, 
  Send, 
  Loader2,
  CheckCircle,
  AlertTriangle,
  FileSpreadsheet,
  FileSignature,
  Presentation,
  FileType,
  Table
} from 'lucide-react'

const SimpleDocumentGenerator = () => {
  const [loading, setLoading] = useState(false)
  const [templates, setTemplates] = useState<any[]>([])
  const [documents, setDocuments] = useState<any[]>([])
  const [selectedType, setSelectedType] = useState('')
  const [generatedDocument, setGeneratedDocument] = useState<any>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const [formData, setFormData] = useState({
    documentType: '',
    client: '',
    projectName: '',
    requirements: {
      businessObjective: '',
      technicalRequirements: '',
      scope: '',
      deliverables: ''
    }
  })

  const documentTypes = [
    { 
      id: 'HLD', 
      name: 'High-Level Design', 
      icon: FileSignature, 
      description: 'System architecture (Google Docs)',
      color: 'from-purple-500 to-blue-500',
      api: 'Claude'
    },
    { 
      id: 'LLD', 
      name: 'Low-Level Design', 
      icon: FileSpreadsheet, 
      description: 'Technical specifications (Google Docs)',
      color: 'from-blue-500 to-cyan-500',
      api: 'Claude'
    },
    { 
      id: 'POWERPOINT', 
      name: 'PowerPoint', 
      icon: Presentation, 
      description: 'Professional presentation',
      color: 'from-orange-500 to-red-500',
      api: 'OpenAI'
    },
    { 
      id: 'WORD', 
      name: 'Word Document', 
      icon: FileType, 
      description: 'Formal document',
      color: 'from-blue-600 to-indigo-600',
      api: 'OpenAI'
    },
    { 
      id: 'EXCEL', 
      name: 'Excel Spreadsheet', 
      icon: Table, 
      description: 'Data and calculations',
      color: 'from-green-500 to-emerald-500',
      api: 'OpenAI'
    }
  ]

  const clients = [
    { id: 'marlink', name: 'Marlink' },
    { id: 'allianzgi', name: 'AllianzGI' },
    { id: 'rga', name: 'RGA' },
    { id: 'bbc', name: 'BBC' },
    { id: 'nhs', name: 'NHS' },
    { id: 'capita', name: 'Capita' },
    { id: 'howden', name: 'Howden Group' }
  ]

  useEffect(() => {
    fetchTemplates()
    fetchDocuments()
  }, [])

  const fetchTemplates = async () => {
    try {
      const response = await axios.get('/api/v2/templates')
      setTemplates(response.data.templates || [])
    } catch (error) {
      console.error('Error fetching templates:', error)
    }
  }

  const fetchDocuments = async () => {
    try {
      const response = await axios.get('/api/v2/documents')
      setDocuments(response.data.documents || [])
    } catch (error) {
      console.error('Error fetching documents:', error)
    }
  }

  const handleGenerateDocument = async () => {
    if (!formData.documentType || !formData.client || !formData.projectName) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')
    setGeneratedDocument(null)

    try {
      const response = await axios.post('/api/v2/documents/generate', formData)
      
      if (response.data.success) {
        setGeneratedDocument(response.data)
        setSuccess('Document generated successfully!')
        
        // Refresh documents list
        fetchDocuments()
        
        // Clear form
        setFormData({
          documentType: '',
          client: '',
          projectName: '',
          requirements: {
            businessObjective: '',
            technicalRequirements: '',
            scope: '',
            deliverables: ''
          }
        })
      }
    } catch (error: any) {
      console.error('Error generating document:', error)
      setError(error.response?.data?.details || error.response?.data?.error || 'Failed to generate document')
    } finally {
      setLoading(false)
    }
  }

  const handleTestAPIs = async () => {
    setLoading(true)
    try {
      const response = await axios.get('/api/v2/test')
      console.log('API Test Results:', response.data)
      if (response.data.success) {
        setSuccess(`API Test Complete - Claude: ${response.data.tests.claude.status}, OpenAI: ${response.data.tests.openai.status}`)
      }
    } catch (error: any) {
      setError('API test failed: ' + (error.response?.data?.details || error.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-4xl font-light tracking-tight">Document Generator</h1>
          <p className="text-gray-400">AI-powered document creation with templates</p>
          
          {/* API Test Button */}
          <button
            onClick={handleTestAPIs}
            className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
          >
            Test API Connections
          </button>
        </motion.div>

        {/* Alerts */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 flex items-center gap-2"
          >
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span className="text-red-400">{error}</span>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-green-400">{success}</span>
          </motion.div>
        )}

        {/* Document Type Selection */}
        <div className="space-y-4">
          <h2 className="text-xl font-light">1. Select Document Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {documentTypes.map((type) => {
              const Icon = type.icon
              return (
                <motion.button
                  key={type.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setFormData({ ...formData, documentType: type.id })
                    setSelectedType(type.id)
                  }}
                  className={`relative p-4 rounded-xl border transition-all ${
                    formData.documentType === type.id
                      ? 'border-white/30 bg-white/5'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-10 rounded-xl`} />
                  <Icon className="w-8 h-8 mb-2 mx-auto" />
                  <div className="text-sm font-medium">{type.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{type.description}</div>
                  <div className="text-xs text-gray-600 mt-1">API: {type.api}</div>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Client and Project Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-light">2. Client Information</h2>
            <select
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 transition-colors"
            >
              <option value="">Select Client</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-light">3. Project Name</h2>
            <input
              type="text"
              value={formData.projectName}
              onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
              placeholder="Enter project name"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 transition-colors"
            />
          </div>
        </div>

        {/* Requirements */}
        <div className="space-y-4">
          <h2 className="text-xl font-light">4. Requirements (Optional)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Business Objective</label>
              <textarea
                value={formData.requirements.businessObjective}
                onChange={(e) => setFormData({
                  ...formData,
                  requirements: { ...formData.requirements, businessObjective: e.target.value }
                })}
                placeholder="What are the business goals?"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 transition-colors mt-1"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Technical Requirements</label>
              <textarea
                value={formData.requirements.technicalRequirements}
                onChange={(e) => setFormData({
                  ...formData,
                  requirements: { ...formData.requirements, technicalRequirements: e.target.value }
                })}
                placeholder="Key technical specifications"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 transition-colors mt-1"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Scope</label>
              <textarea
                value={formData.requirements.scope}
                onChange={(e) => setFormData({
                  ...formData,
                  requirements: { ...formData.requirements, scope: e.target.value }
                })}
                placeholder="Project scope and boundaries"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 transition-colors mt-1"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Deliverables</label>
              <textarea
                value={formData.requirements.deliverables}
                onChange={(e) => setFormData({
                  ...formData,
                  requirements: { ...formData.requirements, deliverables: e.target.value }
                })}
                placeholder="Expected deliverables"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 transition-colors mt-1"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerateDocument}
            disabled={loading || !formData.documentType || !formData.client || !formData.projectName}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Generate Document
              </>
            )}
          </motion.button>
        </div>

        {/* Generated Document Display */}
        {generatedDocument && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6"
          >
            <h3 className="text-xl font-light mb-4">Generated Document</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-gray-400">Title:</span> {generatedDocument.document.title}</p>
              <p><span className="text-gray-400">Type:</span> {generatedDocument.document.type}</p>
              <p><span className="text-gray-400">Client:</span> {generatedDocument.document.client}</p>
              <p><span className="text-gray-400">Project:</span> {generatedDocument.document.project}</p>
              <p><span className="text-gray-400">Created:</span> {new Date(generatedDocument.document.createdAt).toLocaleString()}</p>
            </div>
            
            {/* Content Preview */}
            <div className="mt-4 p-4 bg-black/30 rounded-lg max-h-96 overflow-y-auto">
              <pre className="text-xs text-gray-300 whitespace-pre-wrap">
                {JSON.stringify(generatedDocument.content, null, 2)}
              </pre>
            </div>
          </motion.div>
        )}

        {/* Recent Documents */}
        {documents.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-light">Recent Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.slice(0, 6).map((doc) => (
                <motion.div
                  key={doc.id || doc.filename}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
                >
                  <FileText className="w-6 h-6 mb-2 text-gray-400" />
                  <div className="text-sm font-medium truncate">{doc.title}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {doc.client} • {doc.type}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SimpleDocumentGenerator
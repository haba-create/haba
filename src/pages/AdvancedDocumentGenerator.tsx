import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { 
  FileText, 
  Download, 
  Send, 
  Loader2,
  CheckCircle,
  AlertTriangle,
  Upload,
  FileSpreadsheet,
  FileSignature,
  Presentation,
  FileType,
  Table,
  Image,
  Sparkles,
  FileJson,
  FilePlus
} from 'lucide-react'

const AdvancedDocumentGenerator = () => {
  const [loading, setLoading] = useState(false)
  const [templates, setTemplates] = useState<any[]>([])
  const [documents, setDocuments] = useState<any[]>([])
  const [selectedType, setSelectedType] = useState('')
  const [selectedFormat, setSelectedFormat] = useState('json')
  const [useAgent, setUseAgent] = useState(true)
  const [generatedDocument, setGeneratedDocument] = useState<any>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [templateFile, setTemplateFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    documentType: '',
    client: '',
    projectName: '',
    requirements: {
      businessObjective: '',
      technicalRequirements: '',
      scope: '',
      deliverables: '',
      additionalContext: ''
    },
    outputFormat: 'json',
    useAgent: true
  })

  const documentTypes = [
    { 
      id: 'HLD', 
      name: 'High-Level Design', 
      icon: FileSignature, 
      description: 'System architecture',
      color: 'from-purple-500 to-blue-500'
    },
    { 
      id: 'LLD', 
      name: 'Low-Level Design', 
      icon: FileSpreadsheet, 
      description: 'Technical specifications',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'POWERPOINT', 
      name: 'PowerPoint', 
      icon: Presentation, 
      description: 'Professional presentation',
      color: 'from-orange-500 to-red-500'
    },
    { 
      id: 'WORD', 
      name: 'Word Document', 
      icon: FileType, 
      description: 'Formal document',
      color: 'from-blue-600 to-indigo-600'
    },
    { 
      id: 'EXCEL', 
      name: 'Excel Spreadsheet', 
      icon: Table, 
      description: 'Data and calculations',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  const outputFormats = [
    { id: 'json', name: 'JSON', icon: FileJson, description: 'Structured data format' },
    { id: 'pdf', name: 'PDF', icon: FileText, description: 'Portable document' },
    { id: 'docx', name: 'Word', icon: FileType, description: 'Microsoft Word' },
    { id: 'pptx', name: 'PowerPoint', icon: Presentation, description: 'Microsoft PowerPoint' },
    { id: 'xlsx', name: 'Excel', icon: Table, description: 'Microsoft Excel' }
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
      const response = await axios.get('/api/v3/templates')
      setTemplates(response.data.templates || [])
    } catch (error) {
      console.error('Error fetching templates:', error)
    }
  }

  const fetchDocuments = async () => {
    try {
      const response = await axios.get('/api/v3/documents')
      setDocuments(response.data.documents || [])
    } catch (error) {
      console.error('Error fetching documents:', error)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setTemplateFile(file)
      setSuccess(`Template selected: ${file.name}`)
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
      const formDataToSend = new FormData()
      formDataToSend.append('documentType', formData.documentType)
      formDataToSend.append('client', formData.client)
      formDataToSend.append('projectName', formData.projectName)
      formDataToSend.append('requirements', JSON.stringify(formData.requirements))
      formDataToSend.append('outputFormat', formData.outputFormat)
      formDataToSend.append('useAgent', String(formData.useAgent))
      
      if (templateFile) {
        formDataToSend.append('template', templateFile)
      }

      const response = await axios.post('/api/v3/documents/generate', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
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
            deliverables: '',
            additionalContext: ''
          },
          outputFormat: 'json',
          useAgent: true
        })
        setTemplateFile(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
    } catch (error: any) {
      console.error('Error generating document:', error)
      setError(error.response?.data?.details || error.response?.data?.error || 'Failed to generate document')
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateImage = async (prompt: string) => {
    try {
      const response = await axios.post('/api/v3/images/generate', { prompt })
      if (response.data.success) {
        return response.data.imageUrl
      }
    } catch (error) {
      console.error('Error generating image:', error)
    }
    return null
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-4xl font-light tracking-tight flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-500" />
            Advanced Document Generator
          </h1>
          <p className="text-gray-400">AI-powered document creation with Agent capabilities</p>
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

        {/* Agent Toggle */}
        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.useAgent}
              onChange={(e) => setFormData({ ...formData, useAgent: e.target.checked })}
              className="w-5 h-5 rounded bg-white/10 border-white/20"
            />
            <span className="text-sm">Use OpenAI Agent with Tools</span>
            <Sparkles className="w-4 h-4 text-purple-500" />
          </label>
          <span className="text-xs text-gray-500">
            (Enables Code Interpreter, Image Generation, and Enhanced Reasoning)
          </span>
        </div>

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
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Output Format Selection */}
        <div className="space-y-4">
          <h2 className="text-xl font-light">2. Select Output Format</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {outputFormats.map((format) => {
              const Icon = format.icon
              return (
                <motion.button
                  key={format.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFormData({ ...formData, outputFormat: format.id })}
                  className={`p-3 rounded-lg border transition-all ${
                    formData.outputFormat === format.id
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <Icon className="w-6 h-6 mb-1 mx-auto" />
                  <div className="text-xs font-medium">{format.name}</div>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Template Upload */}
        <div className="space-y-4">
          <h2 className="text-xl font-light">3. Upload Template (Optional)</h2>
          <div className="flex items-center gap-4">
            <input
              ref={fileInputRef}
              type="file"
              accept=".docx,.pdf,.txt,.json,.md"
              onChange={handleFileSelect}
              className="hidden"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-colors flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              {templateFile ? templateFile.name : 'Choose Template File'}
            </motion.button>
            {templateFile && (
              <button
                onClick={() => {
                  setTemplateFile(null)
                  if (fileInputRef.current) fileInputRef.current.value = ''
                }}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        {/* Client and Project Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-light">4. Client Information</h2>
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
            <h2 className="text-xl font-light">5. Project Name</h2>
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
          <h2 className="text-xl font-light">6. Requirements & Context</h2>
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

            <div className="md:col-span-2">
              <label className="text-sm text-gray-400">Additional Context</label>
              <textarea
                value={formData.requirements.additionalContext}
                onChange={(e) => setFormData({
                  ...formData,
                  requirements: { ...formData.requirements, additionalContext: e.target.value }
                })}
                placeholder="Any additional information or specific requirements"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 transition-colors mt-1"
                rows={4}
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
                Generating with {formData.useAgent ? 'AI Agent' : 'Standard AI'}...
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
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-light">Generated Document</h3>
              <div className="flex gap-2">
                {generatedDocument.document.downloadUrl && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(generatedDocument.document.downloadUrl, '_blank')}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-sm font-medium flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download {generatedDocument.document.outputFormat.toUpperCase()}
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    window.open(`/api/v3/documents/${generatedDocument.document.id}/download?format=json`, '_blank')
                  }}
                  className="px-4 py-2 bg-white/10 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  <FileJson className="w-4 h-4" />
                  Download JSON
                </motion.button>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="text-gray-400">Title:</span> {generatedDocument.document.title}</p>
              <p><span className="text-gray-400">Type:</span> {generatedDocument.document.type}</p>
              <p><span className="text-gray-400">Client:</span> {generatedDocument.document.client}</p>
              <p><span className="text-gray-400">Project:</span> {generatedDocument.document.project}</p>
              <p><span className="text-gray-400">Format:</span> {generatedDocument.document.outputFormat}</p>
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
                  {doc.downloadUrls && (
                    <div className="flex gap-1 mt-2">
                      {Object.entries(doc.downloadUrls).slice(0, 3).map(([format, url]) => (
                        <button
                          key={format}
                          onClick={() => window.open(url as string, '_blank')}
                          className="px-2 py-1 bg-white/5 rounded text-xs hover:bg-white/10"
                        >
                          {format.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdvancedDocumentGenerator
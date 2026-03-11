import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import {
  Bot,
  Send,
  Sparkles,
  Brain,
  Code,
  FileText,
  TrendingUp,
  Copy,
  Loader2,
  Trash2,
} from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  model?: string
  timestamp?: string
}

const AIAssistants = () => {
  const [selectedModel, setSelectedModel] = useState('gpt-5.4')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [conversation, setConversation] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant powered by advanced language models. I can help you with:\n\n- **Data Analysis** - Analyse trends and provide insights\n- **Document Generation** - Create professional documents\n- **Code Review** - Review and improve code\n- **Strategic Planning** - Business recommendations\n\nHow can I assist you today?',
      model: 'system',
      timestamp: new Date().toISOString()
    }
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const models = [
    { id: 'gpt-5.4', name: 'GPT-5.4', provider: 'OpenAI', icon: Brain },
    { id: 'claude-sonnet', name: 'Claude Sonnet 4.6', provider: 'Anthropic', icon: Sparkles },
  ]

  const quickPrompts = [
    { label: 'Analyse Data Trends', icon: TrendingUp, prompt: 'Analyse the recent data trends for our consulting projects and provide insights on areas for improvement.' },
    { label: 'Generate Report', icon: FileText, prompt: 'Generate a comprehensive executive summary report template for a new client engagement.' },
    { label: 'Code Review', icon: Code, prompt: 'Provide best practices for implementing a document generation API with proper error handling and security measures.' },
    { label: 'Strategic Advice', icon: Brain, prompt: 'Provide strategic recommendations for growing a data and AI consultancy business in the current market.' },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [conversation])

  const handleSend = async () => {
    if (!message.trim() || loading) return

    const userMessage: Message = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    }

    setConversation(prev => [...prev, userMessage])
    setMessage('')
    setLoading(true)

    try {
      const response = await axios.post('/api/ai/chat', {
        message: message,
        model: selectedModel,
        conversationHistory: conversation.slice(-10)
      })

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.data.response,
        model: selectedModel,
        timestamp: new Date().toISOString()
      }

      setConversation(prev => [...prev, assistantMessage])
    } catch (error: any) {
      const errorMessage: Message = {
        role: 'assistant',
        content: `I encountered an error: ${error.response?.data?.error || error.message || 'Unable to process your request'}. Please try again.`,
        model: 'error',
        timestamp: new Date().toISOString()
      }
      setConversation(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const handleClearConversation = () => {
    setConversation([{
      role: 'assistant',
      content: 'Conversation cleared. How can I help you today?',
      model: 'system',
      timestamp: new Date().toISOString()
    }])
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-start"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>AI Assistants</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Chat with GPT-5.4 and Claude Opus 4.6 for your consultancy needs</p>
        </div>
        <button
          onClick={handleClearConversation}
          className="p-2 rounded-lg transition-all group"
          style={{ border: '1px solid var(--border-color)' }}
          title="Clear conversation"
        >
          <Trash2 className="w-4 h-4 text-red-500 opacity-50 group-hover:opacity-100" />
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Chat */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-3 space-y-4"
        >
          {/* Model Selector */}
          <div className="card rounded-xl p-3">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      backgroundColor: selectedModel === model.id ? 'var(--accent)' : 'var(--bg-tertiary)',
                      color: selectedModel === model.id ? '#fff' : 'var(--text-secondary)',
                    }}
                  >
                    <model.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{model.name}</span>
                    <span className="sm:hidden">{model.provider}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Connected
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="card rounded-xl h-[500px] overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {conversation.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold ${
                    msg.role === 'user'
                      ? 'text-white'
                      : ''
                  }`}
                    style={{
                      background: msg.role === 'user' ? 'linear-gradient(135deg, #0EA5E9, #8B5CF6)' : 'var(--bg-tertiary)',
                      border: msg.role === 'assistant' ? '1px solid var(--border-color)' : 'none',
                      color: msg.role === 'assistant' ? 'var(--text-tertiary)' : '#fff',
                    }}
                  >
                    {msg.role === 'user' ? 'U' : <Bot className="w-3.5 h-3.5" />}
                  </div>
                  <div className={`max-w-[80%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                    <div
                      className="rounded-xl px-4 py-3 text-sm leading-relaxed"
                      style={{
                        backgroundColor: msg.role === 'user' ? 'var(--accent)' : 'var(--bg-tertiary)',
                        color: msg.role === 'user' ? '#fff' : 'var(--text-primary)',
                        border: msg.role === 'assistant' ? '1px solid var(--border-color)' : 'none',
                      }}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                    {msg.role === 'assistant' && (
                      <button
                        onClick={() => handleCopy(msg.content)}
                        className="text-xs mt-1 px-2 py-0.5 rounded transition-colors inline-flex items-center gap-1"
                        style={{ color: 'var(--text-tertiary)' }}
                      >
                        <Copy className="w-3 h-3" /> Copy
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                  >
                    <Bot className="w-3.5 h-3.5" style={{ color: 'var(--text-tertiary)' }} />
                  </div>
                  <div className="rounded-xl px-4 py-3 flex items-center gap-2"
                    style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                  >
                    <Loader2 className="w-4 h-4 animate-spin" style={{ color: 'var(--accent)' }} />
                    <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4" style={{ borderTop: '1px solid var(--border-color)' }}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  className="input-field flex-1"
                  placeholder="Ask anything..."
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !message.trim()}
                  className="btn-primary px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          {/* Quick Prompts */}
          <div className="card rounded-xl p-4">
            <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Quick Prompts</h3>
            <div className="space-y-2">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(prompt.prompt)}
                  className="w-full text-left p-2.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent-light)'
                    e.currentTarget.style.color = 'var(--accent)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = 'var(--text-secondary)'
                  }}
                >
                  <prompt.icon className="w-3.5 h-3.5 shrink-0" />
                  {prompt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Usage */}
          <div className="card rounded-xl p-4">
            <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Usage</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: 'var(--text-tertiary)' }}>Tokens</span>
                  <span style={{ color: 'var(--text-secondary)' }}>42K / 100K</span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                  <div className="h-full w-[42%] rounded-full" style={{ background: 'linear-gradient(135deg, #0EA5E9, #8B5CF6)' }} />
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-tertiary)' }}>Queries Today</span>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>23</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-tertiary)' }}>Avg Response</span>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>1.2s</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AIAssistants

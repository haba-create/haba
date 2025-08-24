import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Bot, 
  Send, 
  Sparkles, 
  Brain,
  Code,
  FileText,
  TrendingUp,
  Settings,
  Copy,
  RefreshCw,
  ChevronDown
} from 'lucide-react'

const AIAssistants = () => {
  const [selectedModel, setSelectedModel] = useState('gpt-5')
  const [message, setMessage] = useState('')
  const [conversation, setConversation] = useState<any[]>([
    { role: 'assistant', content: 'Hello! I\'m your AI assistant. I can help you with data analysis, document generation, code review, and strategic insights. How can I assist you today?', model: 'system' }
  ])

  const models = [
    { id: 'gpt-5', name: 'GPT-5', provider: 'OpenAI', description: 'Most advanced reasoning', icon: Brain },
    { id: 'claude-sonnet', name: 'Claude Sonnet 4.0', provider: 'Anthropic', description: 'Best for analysis', icon: Sparkles },
  ]

  const quickPrompts = [
    { label: 'Analyze Data Trends', icon: TrendingUp, prompt: 'Analyze the recent data trends and provide insights' },
    { label: 'Generate Report', icon: FileText, prompt: 'Generate a comprehensive report based on current project status' },
    { label: 'Code Review', icon: Code, prompt: 'Review the recent code changes and suggest improvements' },
    { label: 'Strategic Advice', icon: Brain, prompt: 'Provide strategic recommendations for business growth' },
  ]

  const handleSend = () => {
    if (!message.trim()) return
    
    setConversation([...conversation, { role: 'user', content: message }])
    setMessage('')
    
    // Simulate AI response
    setTimeout(() => {
      setConversation(prev => [...prev, { 
        role: 'assistant', 
        content: `I understand you want to: "${message}". Let me process that for you...`, 
        model: selectedModel 
      }])
    }, 1000)
  }

  const handleQuickPrompt = (prompt: string) => {
    setMessage(prompt)
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
          <h1 className="text-4xl font-bold text-white mb-2">AI Assistants</h1>
          <p className="text-gray-400">Leverage cutting-edge AI for your consultancy needs</p>
        </div>
        <button className="p-3 rounded-xl glass-dark border border-white/10 hover:border-white/20 transition-all">
          <Settings className="w-5 h-5 text-gray-400" />
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Chat Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-3 space-y-6"
        >
          {/* Model Selection */}
          <div className="glass rounded-2xl p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                {models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${
                      selectedModel === model.id
                        ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30'
                        : 'glass-dark border border-white/10 hover:border-white/20'
                    }`}
                  >
                    <model.icon className="w-5 h-5 text-white" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-white">{model.name}</p>
                      <p className="text-xs text-gray-400">{model.provider}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>API Connected</span>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="glass rounded-2xl border border-white/10 h-[500px] overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {conversation.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`rounded-2xl p-4 ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30' 
                        : 'glass-dark border border-white/10'
                    }`}>
                      <p className="text-sm text-white">{msg.content}</p>
                      {msg.model && (
                        <p className="text-xs text-gray-500 mt-2">via {msg.model}</p>
                      )}
                    </div>
                    {msg.role === 'assistant' && (
                      <div className="flex gap-2 mt-2 px-2">
                        <button className="text-xs text-gray-500 hover:text-white transition-colors">
                          <Copy className="w-3 h-3 inline mr-1" />
                          Copy
                        </button>
                        <button className="text-xs text-gray-500 hover:text-white transition-colors">
                          <RefreshCw className="w-3 h-3 inline mr-1" />
                          Regenerate
                        </button>
                      </div>
                    )}
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 order-1 mr-3' 
                      : 'glass-dark border border-white/10 order-2 ml-3'
                  }`}>
                    {msg.role === 'user' ? 'U' : <Bot className="w-4 h-4 text-white" />}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1 px-4 py-3 rounded-xl glass-dark border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                  placeholder="Ask anything..."
                />
                <button
                  onClick={handleSend}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-lg transition-all"
                >
                  <Send className="w-5 h-5" />
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
          className="space-y-6"
        >
          {/* Quick Prompts */}
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Prompts</h3>
            <div className="space-y-3">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickPrompt(prompt.prompt)}
                  className="w-full text-left p-3 rounded-lg glass-dark border border-white/10 hover:border-white/20 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <prompt.icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{prompt.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Usage Stats */}
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Usage Stats</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Tokens Used</span>
                  <span className="text-white">42,351 / 100,000</span>
                </div>
                <div className="w-full h-2 rounded-full glass-dark overflow-hidden">
                  <div className="h-full w-[42%] bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Queries Today</span>
                  <span className="text-white">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg Response Time</span>
                  <span className="text-white">1.2s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Model Info */}
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Model Capabilities</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-purple-400 mt-0.5" />
                <div>
                  <p className="text-gray-300">Advanced reasoning</p>
                  <p className="text-xs text-gray-500">Complex problem solving</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Code className="w-4 h-4 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-gray-300">Code generation</p>
                  <p className="text-xs text-gray-500">Multiple languages</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-cyan-400 mt-0.5" />
                <div>
                  <p className="text-gray-300">Document analysis</p>
                  <p className="text-xs text-gray-500">Summarization & insights</p>
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
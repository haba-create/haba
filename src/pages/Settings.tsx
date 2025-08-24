import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings as SettingsIcon, 
  Key, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database,
  Save,
  Eye,
  EyeOff,
  Check
} from 'lucide-react'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('api')
  const [showApiKeys, setShowApiKeys] = useState({
    openai: false,
    anthropic: false
  })
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState({
    openaiKey: '',
    anthropicKey: '',
    notifications: {
      email: true,
      desktop: false,
      projectUpdates: true,
      clientActivity: true
    },
    theme: 'dark',
    dataRetention: '90'
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const tabs = [
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'data', label: 'Data & Privacy', icon: Database },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account and application preferences</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="glass rounded-2xl p-4 border border-white/10">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white border border-purple-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Settings Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="glass rounded-2xl p-6 border border-white/10">
            {/* API Keys Tab */}
            {activeTab === 'api' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-6">API Configuration</h2>
                  <p className="text-gray-400 mb-6">Configure your AI assistant API keys for OpenAI and Anthropic.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">OpenAI API Key (GPT-5)</label>
                    <div className="relative">
                      <input
                        type={showApiKeys.openai ? 'text' : 'password'}
                        value={settings.openaiKey}
                        onChange={(e) => setSettings({...settings, openaiKey: e.target.value})}
                        className="w-full px-4 py-3 pr-12 rounded-lg glass-dark border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                        placeholder="sk-..."
                      />
                      <button
                        onClick={() => setShowApiKeys({...showApiKeys, openai: !showApiKeys.openai})}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showApiKeys.openai ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Required for GPT-5 model access</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Anthropic API Key (Claude Sonnet 4.0)</label>
                    <div className="relative">
                      <input
                        type={showApiKeys.anthropic ? 'text' : 'password'}
                        value={settings.anthropicKey}
                        onChange={(e) => setSettings({...settings, anthropicKey: e.target.value})}
                        className="w-full px-4 py-3 pr-12 rounded-lg glass-dark border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                        placeholder="sk-ant-..."
                      />
                      <button
                        onClick={() => setShowApiKeys({...showApiKeys, anthropic: !showApiKeys.anthropic})}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showApiKeys.anthropic ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Required for Claude Sonnet 4.0 model access</p>
                  </div>
                </div>

                <div className="glass-dark rounded-xl p-4 border border-yellow-500/20">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-400 mb-1">Security Notice</p>
                      <p className="text-xs text-gray-400">API keys are encrypted and stored securely. Never share your API keys with anyone.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-6">Notification Preferences</h2>
                  <p className="text-gray-400 mb-6">Choose how you want to be notified about important updates.</p>
                </div>

                <div className="space-y-4">
                  {Object.entries({
                    email: 'Email Notifications',
                    desktop: 'Desktop Notifications',
                    projectUpdates: 'Project Updates',
                    clientActivity: 'Client Activity'
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between p-4 rounded-lg glass-dark border border-white/10">
                      <div>
                        <p className="text-white font-medium">{label}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {key === 'email' && 'Receive notifications via email'}
                          {key === 'desktop' && 'Show desktop notifications when app is open'}
                          {key === 'projectUpdates' && 'Get notified about project milestones and deadlines'}
                          {key === 'clientActivity' && 'Alerts for new client messages and requests'}
                        </p>
                      </div>
                      <button
                        onClick={() => setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            [key]: !settings.notifications[key as keyof typeof settings.notifications]
                          }
                        })}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          settings.notifications[key as keyof typeof settings.notifications]
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                            : 'bg-gray-700'
                        }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          settings.notifications[key as keyof typeof settings.notifications]
                            ? 'translate-x-6'
                            : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other tabs content would go here */}
            {activeTab !== 'api' && activeTab !== 'notifications' && (
              <div className="text-center py-12">
                <SettingsIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">This section is coming soon</p>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-lg transition-all"
              >
                {saved ? (
                  <>
                    <Check className="w-5 h-5" />
                    Saved
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Settings
import { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import {
  Key,
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Save,
  Eye,
  EyeOff,
  Check,
  Sun,
  Moon,
} from 'lucide-react'
import { ThemeContext } from '../contexts/ThemeContext'

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [activeTab, setActiveTab] = useState('api')
  const [showApiKeys, setShowApiKeys] = useState({ openai: false, anthropic: false })
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState({
    openaiKey: '',
    anthropicKey: '',
    notifications: { email: true, desktop: false, projectUpdates: true, clientActivity: true },
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
        <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Manage your account and application preferences</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="card rounded-xl p-3">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
                  style={{
                    backgroundColor: activeTab === tab.id ? 'var(--accent)' : 'transparent',
                    color: activeTab === tab.id ? '#fff' : 'var(--text-secondary)',
                  }}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="card rounded-xl p-6">
            {/* API Keys */}
            {activeTab === 'api' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>API Configuration</h2>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Configure your AI API keys.</p>
                </div>
                <div className="space-y-4">
                  {[
                    { key: 'openai', label: 'OpenAI API Key', placeholder: 'sk-...', desc: 'Required for GPT-4 model access' },
                    { key: 'anthropic', label: 'Anthropic API Key', placeholder: 'sk-ant-...', desc: 'Required for Claude model access' },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>{field.label}</label>
                      <div className="relative">
                        <input
                          type={showApiKeys[field.key as keyof typeof showApiKeys] ? 'text' : 'password'}
                          value={settings[`${field.key}Key` as keyof typeof settings] as string}
                          onChange={(e) => setSettings({...settings, [`${field.key}Key`]: e.target.value})}
                          className="input-field pr-10"
                          placeholder={field.placeholder}
                        />
                        <button
                          onClick={() => setShowApiKeys({...showApiKeys, [field.key]: !showApiKeys[field.key as keyof typeof showApiKeys]})}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          style={{ color: 'var(--text-tertiary)' }}
                        >
                          {showApiKeys[field.key as keyof typeof showApiKeys] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <p className="text-xs mt-1.5" style={{ color: 'var(--text-tertiary)' }}>{field.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.15)' }}>
                  <div className="flex items-start gap-2.5">
                    <Shield className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Security Notice</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>API keys are encrypted and stored securely.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Notifications</h2>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Choose how you want to be notified.</p>
                </div>
                <div className="space-y-3">
                  {Object.entries({
                    email: ['Email Notifications', 'Receive notifications via email'],
                    desktop: ['Desktop Notifications', 'Show desktop notifications'],
                    projectUpdates: ['Project Updates', 'Get notified about milestones'],
                    clientActivity: ['Client Activity', 'Alerts for client messages'],
                  }).map(([key, [label, desc]]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-4 rounded-lg"
                      style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                    >
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{label}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{desc}</p>
                      </div>
                      <button
                        onClick={() => setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            [key]: !settings.notifications[key as keyof typeof settings.notifications]
                          }
                        })}
                        className="relative w-10 h-5 rounded-full transition-colors"
                        style={{
                          backgroundColor: settings.notifications[key as keyof typeof settings.notifications]
                            ? 'var(--accent)' : 'var(--border-color)',
                        }}
                      >
                        <div
                          className="absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm"
                          style={{
                            transform: settings.notifications[key as keyof typeof settings.notifications]
                              ? 'translateX(22px)' : 'translateX(2px)',
                          }}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Appearance */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Appearance</h2>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Customise the look and feel.</p>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Theme</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => { if (theme === 'dark') toggleTheme() }}
                      className="p-4 rounded-xl text-center transition-all"
                      style={{
                        backgroundColor: theme === 'light' ? 'var(--accent-light)' : 'var(--bg-tertiary)',
                        border: theme === 'light' ? '2px solid var(--accent)' : '1px solid var(--border-color)',
                      }}
                    >
                      <Sun className="w-6 h-6 mx-auto mb-2" style={{ color: theme === 'light' ? 'var(--accent)' : 'var(--text-tertiary)' }} />
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Light</p>
                    </button>
                    <button
                      onClick={() => { if (theme === 'light') toggleTheme() }}
                      className="p-4 rounded-xl text-center transition-all"
                      style={{
                        backgroundColor: theme === 'dark' ? 'var(--accent-light)' : 'var(--bg-tertiary)',
                        border: theme === 'dark' ? '2px solid var(--accent)' : '1px solid var(--border-color)',
                      }}
                    >
                      <Moon className="w-6 h-6 mx-auto mb-2" style={{ color: theme === 'dark' ? 'var(--accent)' : 'var(--text-tertiary)' }} />
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Dark</p>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Other tabs */}
            {!['api', 'notifications', 'appearance'].includes(activeTab) && (
              <div className="text-center py-12">
                <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: 'var(--bg-tertiary)' }}
                >
                  {activeTab === 'profile' && <User className="w-6 h-6" style={{ color: 'var(--text-tertiary)' }} />}
                  {activeTab === 'security' && <Shield className="w-6 h-6" style={{ color: 'var(--text-tertiary)' }} />}
                  {activeTab === 'data' && <Database className="w-6 h-6" style={{ color: 'var(--text-tertiary)' }} />}
                </div>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>This section is coming soon</p>
              </div>
            )}

            {/* Save */}
            <div className="mt-8 flex justify-end">
              <button onClick={handleSave} className="btn-primary inline-flex items-center gap-2 text-sm">
                {saved ? <><Check className="w-4 h-4" /> Saved</> : <><Save className="w-4 h-4" /> Save Changes</>}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Settings

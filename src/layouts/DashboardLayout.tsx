import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { ThemeContext } from '../contexts/ThemeContext'
import {
  LayoutDashboard,
  FileText,
  Bot,
  Users,
  Briefcase,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Sun,
  Moon,
  UserCircle,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const DashboardLayout = () => {
  const { user } = useContext(AuthContext)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
      if (response.ok) {
        window.location.href = '/'
      }
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { path: '/dashboard/profile', icon: UserCircle, label: 'Profile' },
    { path: '/dashboard/documents', icon: FileText, label: 'Documents' },
    { path: '/dashboard/ai', icon: Bot, label: 'AI Assistants' },
    { path: '/dashboard/clients', icon: Users, label: 'Clients' },
    { path: '/dashboard/projects', icon: Briefcase, label: 'Projects' },
    { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center">
            <span className="text-white font-bold text-base">H</span>
          </div>
          <div>
            <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
              HABA
            </h1>
            <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
              AI Platform
            </p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <button
          onClick={() => { navigate('/dashboard/profile'); setSidebarOpen(false) }}
          className="flex items-center gap-3 w-full text-left rounded-xl p-2 -m-2 transition-all duration-200"
          style={{ color: 'var(--text-primary)' }}
        >
          {user?.photo ? (
            <img src={user.photo} alt="" className="w-9 h-9 rounded-full" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center text-white text-sm font-semibold">
              {user?.displayName?.[0] || 'U'}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{user?.displayName || 'User'}</p>
            <p className="text-xs truncate" style={{ color: 'var(--text-tertiary)' }}>{user?.email || 'user@example.com'}</p>
          </div>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/dashboard'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-white'
                      : ''
                  }`
                }
                style={({ isActive }) => ({
                  backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                })}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-[18px] h-[18px]" />
                <span className="flex-1">{item.label}</span>
                {!(['Overview', 'Profile'].includes(item.label)) && (
                  <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 space-y-1" style={{ borderTop: '1px solid var(--border-color)' }}>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
          style={{ color: 'var(--text-secondary)' }}
        >
          {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-red-500 hover:bg-red-500/10"
        >
          <LogOut className="w-[18px] h-[18px]" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg shadow-md"
        style={{
          backgroundColor: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          color: 'var(--text-primary)',
        }}
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="lg:hidden fixed left-0 top-0 h-full w-72 z-40 shadow-xl"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRight: '1px solid var(--border-color)',
            }}
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop */}
      <aside
        className="hidden lg:block fixed left-0 top-0 h-full w-64"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderRight: '1px solid var(--border-color)',
        }}
      >
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout

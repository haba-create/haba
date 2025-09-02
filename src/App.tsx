import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DocumentGenerator from './pages/DocumentGenerator'
import EnhancedDocumentGenerator from './pages/EnhancedDocumentGenerator'
import SimpleDocumentGenerator from './pages/SimpleDocumentGenerator'
import AdvancedDocumentGenerator from './pages/AdvancedDocumentGenerator'
import AIAssistants from './pages/AIAssistants'
import Clients from './pages/Clients'
import Projects from './pages/Projects'
import Settings from './pages/Settings'
import DashboardLayout from './layouts/DashboardLayout'
import { AuthContext } from './contexts/AuthContext'
import axios from 'axios'

function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await axios.get('/api/auth/check', { withCredentials: true })
      if (response.data.authenticated) {
        setUser(response.data.user)
      }
    } catch (error) {
      console.log('Not authenticated')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <div className="animate-pulse text-white text-2xl">Loading...</div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/dashboard" element={
            user ? <DashboardLayout /> : <Navigate to="/login" />
          }>
            <Route index element={<Dashboard />} />
            <Route path="documents" element={<AdvancedDocumentGenerator />} />
            <Route path="documents-simple" element={<SimpleDocumentGenerator />} />
            <Route path="documents-old" element={<EnhancedDocumentGenerator />} />
            <Route path="ai" element={<AIAssistants />} />
            <Route path="clients" element={<Clients />} />
            <Route path="projects" element={<Projects />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
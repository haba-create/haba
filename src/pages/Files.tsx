import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import {
  Upload,
  Download,
  Trash2,
  FileArchive,
  FileText,
  File as FileIcon,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Copy,
  Link as LinkIcon,
} from 'lucide-react'

interface UploadedFile {
  storedName: string
  originalName: string
  size: number
  uploadedAt: string
  downloadUrl: string
}

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

const formatDate = (iso: string): string => {
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

const iconForFile = (name: string) => {
  const lower = name.toLowerCase()
  if (/\.(zip|tar|gz|tgz|rar|7z)$/.test(lower)) return FileArchive
  if (/\.(txt|md|json|csv|log|pdf|doc|docx|xls|xlsx|ppt|pptx)$/.test(lower)) return FileText
  return FileIcon
}

const Files = () => {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [copiedName, setCopiedName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const loadFiles = useCallback(async () => {
    try {
      setLoading(true)
      const res = await axios.get('/api/files', { withCredentials: true })
      setFiles(res.data.files || [])
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to load files')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadFiles()
  }, [loadFiles])

  useEffect(() => {
    if (!success && !error) return
    const t = setTimeout(() => {
      setSuccess('')
      setError('')
    }, 4000)
    return () => clearTimeout(t)
  }, [success, error])

  const uploadFiles = async (fileList: FileList | File[]) => {
    const arr = Array.from(fileList)
    if (arr.length === 0) return

    const formData = new FormData()
    arr.forEach((f) => formData.append('files', f))

    try {
      setUploading(true)
      setUploadProgress(0)
      setError('')
      setSuccess('')

      const res = await axios.post('/api/files/upload', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (evt) => {
          if (evt.total) {
            setUploadProgress(Math.round((evt.loaded / evt.total) * 100))
          }
        },
      })

      const uploaded: UploadedFile[] = res.data.files || []
      setSuccess(`Uploaded ${uploaded.length} file${uploaded.length === 1 ? '' : 's'}`)
      await loadFiles()
    } catch (err: any) {
      setError(err?.response?.data?.details || err?.response?.data?.error || 'Upload failed')
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadFiles(e.target.files)
      e.target.value = ''
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadFiles(e.dataTransfer.files)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const deleteFile = async (storedName: string) => {
    if (!confirm('Delete this file? This cannot be undone.')) return
    try {
      await axios.delete(`/api/files/${encodeURIComponent(storedName)}`, {
        withCredentials: true,
      })
      setSuccess('File deleted')
      await loadFiles()
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Delete failed')
    }
  }

  const copyLink = async (downloadUrl: string, storedName: string) => {
    try {
      const fullUrl = window.location.origin + downloadUrl
      await navigator.clipboard.writeText(fullUrl)
      setCopiedName(storedName)
      setTimeout(() => setCopiedName(null), 2000)
    } catch {
      setError('Failed to copy link')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Files
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Upload files or zipped archives and share them with a download link.
        </p>
      </motion.div>

      {/* Alerts */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
          }}
        >
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm"
          style={{
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#10b981',
          }}
        >
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </motion.div>
      )}

      {/* Upload Dropzone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="card rounded-xl p-6"
      >
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer rounded-xl p-8 text-center transition-all duration-200"
          style={{
            border: `2px dashed ${dragActive ? 'var(--accent)' : 'var(--border-color)'}`,
            backgroundColor: dragActive ? 'var(--accent-light)' : 'var(--bg-tertiary)',
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleInputChange}
            disabled={uploading}
          />
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--accent-light)' }}
            >
              {uploading ? (
                <Loader2 className="w-6 h-6 animate-spin" style={{ color: 'var(--accent)' }} />
              ) : (
                <Upload className="w-6 h-6" style={{ color: 'var(--accent)' }} />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                {uploading
                  ? `Uploading… ${uploadProgress}%`
                  : 'Click to browse or drag & drop files here'}
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                Supports zip, pdf, docx, xlsx, pptx, images, text and more. Up to 200 MB per file.
              </p>
            </div>
            {uploading && (
              <div
                className="w-full max-w-xs h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: 'var(--border-color)' }}
              >
                <div
                  className="h-full transition-all duration-200"
                  style={{
                    width: `${uploadProgress}%`,
                    backgroundColor: 'var(--accent)',
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Files List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="card rounded-xl p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
            Your Files
          </h2>
          <span
            className="text-xs font-medium px-2 py-1 rounded-md"
            style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-tertiary)' }}
          >
            {files.length} total
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin" style={{ color: 'var(--accent)' }} />
          </div>
        ) : files.length === 0 ? (
          <div
            className="text-center py-10 rounded-lg"
            style={{ backgroundColor: 'var(--bg-tertiary)' }}
          >
            <FileIcon
              className="w-10 h-10 mx-auto mb-2"
              style={{ color: 'var(--text-tertiary)' }}
            />
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              No files uploaded yet
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {files.map((f) => {
              const Icon = iconForFile(f.originalName)
              return (
                <div
                  key={f.storedName}
                  className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                  style={{ backgroundColor: 'var(--bg-tertiary)' }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--accent-light)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-semibold truncate"
                      style={{ color: 'var(--text-primary)' }}
                      title={f.originalName}
                    >
                      {f.originalName}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                      {formatBytes(f.size)} · {formatDate(f.uploadedAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <a
                      href={f.downloadUrl}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                      style={{
                        backgroundColor: 'var(--accent)',
                        color: '#fff',
                      }}
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </a>
                    <button
                      onClick={() => copyLink(f.downloadUrl, f.storedName)}
                      className="p-2 rounded-lg transition-all"
                      style={{ color: 'var(--text-secondary)' }}
                      title="Copy download link"
                    >
                      {copiedName === f.storedName ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => deleteFile(f.storedName)}
                      className="p-2 rounded-lg transition-all text-red-500 hover:bg-red-500/10"
                      title="Delete file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {files.length > 0 && (
          <p
            className="mt-4 text-xs flex items-center gap-1.5"
            style={{ color: 'var(--text-tertiary)' }}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            Tip: use the copy button to share a direct download link (requires login).
          </p>
        )}
      </motion.div>
    </div>
  )
}

export default Files

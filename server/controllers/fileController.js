const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fsp = require('fs').promises;

const UPLOAD_DIR = path.join(__dirname, '../../user_uploads');

// Ensure upload dir exists synchronously at startup
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Sanitize a filename to avoid path traversal and weird characters
function sanitizeFilename(name) {
  const base = path.basename(name || 'file');
  return base.replace(/[^a-zA-Z0-9._-]/g, '_');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const safeName = sanitizeFilename(file.originalname);
    cb(null, uniqueSuffix + '-' + safeName);
  }
});

// Accept common file types including zipped archives
const allowedExtensions = [
  '.zip', '.tar', '.gz', '.tgz', '.rar', '.7z',
  '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
  '.txt', '.md', '.json', '.csv', '.log',
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp',
  '.mp3', '.mp4', '.mov', '.wav',
  '.html', '.css', '.js', '.ts', '.tsx', '.jsx', '.py'
];

const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type: ' + ext));
    }
  }
}).array('files', 20); // allow up to 20 files per request

class FileController {
  // Middleware wrapper so multer errors return JSON
  handleUpload(req, res, next) {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          error: 'File upload failed',
          details: err.message
        });
      }
      next();
    });
  }

  async uploadFiles(req, res) {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
      }

      const uploaded = req.files.map((f) => ({
        storedName: f.filename,
        originalName: f.originalname,
        size: f.size,
        mimetype: f.mimetype,
        uploadedAt: new Date().toISOString(),
        downloadUrl: `/api/files/${encodeURIComponent(f.filename)}/download`
      }));

      res.json({ success: true, files: uploaded });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Failed to process upload', details: error.message });
    }
  }

  async listFiles(req, res) {
    try {
      const entries = await fsp.readdir(UPLOAD_DIR);
      const files = await Promise.all(
        entries.map(async (name) => {
          const filePath = path.join(UPLOAD_DIR, name);
          try {
            const stat = await fsp.stat(filePath);
            if (!stat.isFile()) return null;
            // Strip "<timestamp>-<rand>-" prefix to recover original name
            const originalName = name.replace(/^\d+-\d+-/, '');
            return {
              storedName: name,
              originalName,
              size: stat.size,
              uploadedAt: stat.mtime.toISOString(),
              downloadUrl: `/api/files/${encodeURIComponent(name)}/download`
            };
          } catch {
            return null;
          }
        })
      );

      const sorted = files
        .filter(Boolean)
        .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

      res.json({ files: sorted });
    } catch (error) {
      console.error('List files error:', error);
      res.status(500).json({ error: 'Failed to list files', details: error.message });
    }
  }

  async downloadFile(req, res) {
    try {
      const requested = path.basename(req.params.filename || '');
      const filePath = path.join(UPLOAD_DIR, requested);

      // Prevent path traversal: resolved path must stay inside UPLOAD_DIR
      const resolved = path.resolve(filePath);
      if (!resolved.startsWith(path.resolve(UPLOAD_DIR) + path.sep)) {
        return res.status(400).json({ error: 'Invalid filename' });
      }

      if (!fs.existsSync(resolved)) {
        return res.status(404).json({ error: 'File not found' });
      }

      const originalName = requested.replace(/^\d+-\d+-/, '');
      res.download(resolved, originalName);
    } catch (error) {
      console.error('Download error:', error);
      res.status(500).json({ error: 'Failed to download file', details: error.message });
    }
  }

  async deleteFile(req, res) {
    try {
      const requested = path.basename(req.params.filename || '');
      const filePath = path.join(UPLOAD_DIR, requested);

      const resolved = path.resolve(filePath);
      if (!resolved.startsWith(path.resolve(UPLOAD_DIR) + path.sep)) {
        return res.status(400).json({ error: 'Invalid filename' });
      }

      if (!fs.existsSync(resolved)) {
        return res.status(404).json({ error: 'File not found' });
      }

      await fsp.unlink(resolved);
      res.json({ success: true });
    } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({ error: 'Failed to delete file', details: error.message });
    }
  }
}

module.exports = FileController;

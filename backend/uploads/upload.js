import multer from "multer"
import path from "path"
import fs from "fs"

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/jpg"]
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "uploads")
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`)
  }
})

function fileFilter(req, file, cb) {
  if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) cb(null, true)
  else cb(new Error(`Only image files are allowed. Allowed types: ${ALLOWED_IMAGE_TYPES.join(", ")}`), false)
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE }
})

export default upload

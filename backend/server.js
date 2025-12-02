import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import products from "./routers/products.js"
import user from "./routers/user.js"
import cookieParser from "cookie-parser"
import order from "./routers/order.js"
import paypalRouter from "./routers/paypal.js"
import adminRouter from "./routers/admin.js"
import path from "path"
import fs from "fs"
import multer from "multer"
import Product from "./models/Product.js" // ensure this path matches your project

dotenv.config()

connectDB()

const app = express()

// ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "uploads")
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json())

// serve uploaded images
app.use("/uploads", express.static(uploadsDir))

app.use("/api/products", products)
app.use("/api/users", user)
app.use("/api/order", order)
app.use("/api/paypal", paypalRouter)
app.use("/api/admin", adminRouter)

// Multer storage + filter (allow images up to 5MB)
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
  if (/^image\/(jpeg|png|webp|gif|jpg)$/.test(file.mimetype)) cb(null, true)
  else cb(new Error("Only image files are allowed"), false)
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
})

// upload endpoint: accepts form field 'image' (keeps existing behavior)
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" })
  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
  res.status(201).json({ url: fileUrl })
})

// New: update product image by product id
app.put("/api/products/:id/image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" })

    // find product
    const product = await Product.findById(req.params.id)
    if (!product) {
      // remove uploaded file if product not found
      try { fs.unlinkSync(path.join(uploadsDir, req.file.filename)) } catch (e) {}
      return res.status(404).json({ error: "Product not found" })
    }

    // remove previous image file if stored locally and in /uploads
    const prevImage = product.image // adjust field name if different
    if (prevImage && typeof prevImage === "string" && prevImage.startsWith("/uploads/")) {
      const prevPath = path.join(process.cwd(), prevImage.replace(/^\//, ""))
      try { if (fs.existsSync(prevPath)) fs.unlinkSync(prevPath) } catch (e) { /* ignore unlink errors */ }
    }

    // set new image url (full URL)
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    product.image = fileUrl // adjust if your model uses a different field (e.g., images array)

    const updated = await product.save()
    res.status(200).json(updated)
  } catch (err) {
    // on error, try to remove uploaded file to avoid orphan files
    if (req.file) {
      try { fs.unlinkSync(path.join(uploadsDir, req.file.filename)) } catch (e) {}
    }
    console.error(err)
    res.status(500).json({ error: err.message || "Failed to update product image" })
  }
})

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", env: process.env.NODE_ENV || "development" });
});

// Multer / upload error handler
app.use((err, req, res, next) => {
  if (err) {
    return res.status(400).json({ error: err.message || "Upload error" })
  }
  next()
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
  console.log(`Server is running on port ${PORT}`);
});

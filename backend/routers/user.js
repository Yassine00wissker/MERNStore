import express from "express"
import { login, register, getMe } from "../controllers/userController.js"
import { authMiddleware } from "../middleware/auth.js"
const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/me",authMiddleware , getMe)

export default router  
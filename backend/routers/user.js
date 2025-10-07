import express from "express"
import { login, register, getMe, getUsers, deleteUser } from "../controllers/userController.js"
import { authMiddleware } from "../middleware/auth.js"
const router = express.Router()

router.get("/",authMiddleware , getUsers)
router.post("/register", register)
router.post("/login", login)
router.get("/me",authMiddleware , getMe)
router.delete("/:id",authMiddleware , deleteUser)

export default router  
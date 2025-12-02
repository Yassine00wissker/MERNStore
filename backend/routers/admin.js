import express from "express";
import { getStatistics } from "../controllers/adminController.js";
import { authMiddleware, roleMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Get admin statistics - only accessible by admin
router.get("/statistics", authMiddleware, roleMiddleware("admin"), getStatistics);

export default router;

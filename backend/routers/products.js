import express from "express"
import { getProductById, getProducts } from "../controllers/productsController.js";
import { authMiddleware } from "../middleware/auth.js"
const router = express.Router();

router.get("/", authMiddleware, getProducts);
router.get("/:id", authMiddleware, getProductById);

export default router
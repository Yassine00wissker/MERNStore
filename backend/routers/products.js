import express from "express"
import { getProductById, getProducts } from "../controllers/productsController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", protect, getProducts);
router.get("/:id", protect, getProductById);

export default router
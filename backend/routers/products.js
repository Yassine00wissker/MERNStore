import express from "express"
import { getProductById, getProducts, createProduct, deleteProduct, updateProduct, getProductByUserId } from "../controllers/productsController.js";
import { authMiddleware, roleMiddleware } from "../middleware/auth.js"
const router = express.Router();
router.get("/user/:userId", authMiddleware, getProductByUserId);

//for all functionalitys
router.get("/", authMiddleware, getProducts);
router.get("/:id", authMiddleware, getProductById);

//saller functionalitys
router.post("/", authMiddleware, roleMiddleware("seller", "admin"), createProduct);
router.delete("/:id", authMiddleware, roleMiddleware("seller", "admin"), deleteProduct);
router.put("/:id", authMiddleware, roleMiddleware("seller", "admin"), updateProduct);

export default router
import express from "express"
import { getProductById, getProducts, createProduct, deleteProduct, updateProduct, getProductByUserId } from "../controllers/productsController.js";
import { authMiddleware } from "../middleware/auth.js"
const router = express.Router();

//for all functionalitys
router.get("/", authMiddleware, getProducts);
router.get("/:id", authMiddleware, getProductById);


//saller functionalitys
router.post("/", authMiddleware, createProduct);
router.delete("/:id", authMiddleware, deleteProduct);
router.put("/:id", authMiddleware, updateProduct);
router.get("/user/:userId", authMiddleware, getProductByUserId);

export default router
import express from "express"
import { getProductById, getProducts, createProduct, deleteProduct, updateProduct } from "../controllers/productsController.js";
import { authMiddleware } from "../middleware/auth.js"
const router = express.Router();

//for all functionalitys
router.get("/", authMiddleware, getProducts);
router.get("/:id", authMiddleware, getProductById);


//saller functionalitys
router.post("/", authMiddleware, createProduct);
router.delete("/:id", authMiddleware, deleteProduct);
router.put("/:id", authMiddleware, updateProduct);

export default router
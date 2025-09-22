import express from "express"
import {createOrder, getOrdersByProduct, updatetOrderStatus} from '../controllers/orderController.js';
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.post("/", authMiddleware, createOrder)
router.get("/:productId", authMiddleware, getOrdersByProduct)
router.put("/:orderId", authMiddleware, updatetOrderStatus)

export default router;
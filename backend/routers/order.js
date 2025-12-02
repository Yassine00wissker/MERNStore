import express from "express"
import {createOrder, getOrdersByProduct, updatetOrderStatus, getAllOrders} from '../controllers/orderController.js';
import { authMiddleware, roleMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.post("/", authMiddleware, createOrder)
router.get("/all", authMiddleware, roleMiddleware("admin"), getAllOrders)
router.get("/:productId", authMiddleware, roleMiddleware("seller", "admin"), getOrdersByProduct)
router.put("/:orderId", authMiddleware, roleMiddleware("seller", "admin"), updatetOrderStatus)

export default router;
import express from "express"
import {createOrder} from '../controllers/orderController.js';
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.post("/", authMiddleware, createOrder)

export default router;
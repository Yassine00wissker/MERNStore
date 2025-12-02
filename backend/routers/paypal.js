import express from "express";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Create PayPal order - dynamically import controller to handle missing package
router.post("/create-order", authMiddleware, async (req, res) => {
    try {
        const { createPayPalOrder } = await import('../controllers/paypalController.js');
        return createPayPalOrder(req, res);
    } catch (error) {
        if (error.code === 'ERR_MODULE_NOT_FOUND' || error.message.includes('@paypal/checkout-server-sdk')) {
            console.error('PayPal package not installed. Run: npm install @paypal/checkout-server-sdk');
            return res.status(503).json({ 
                message: 'PayPal is not configured. Please install @paypal/checkout-server-sdk: npm install @paypal/checkout-server-sdk',
                error: error.message
            });
        }
        throw error;
    }
});

// Capture PayPal payment - dynamically import controller to handle missing package
router.post("/capture", authMiddleware, async (req, res) => {
    try {
        const { capturePayPalPayment } = await import('../controllers/paypalController.js');
        return capturePayPalPayment(req, res);
    } catch (error) {
        if (error.code === 'ERR_MODULE_NOT_FOUND' || error.message.includes('@paypal/checkout-server-sdk')) {
            console.error('PayPal package not installed. Run: npm install @paypal/checkout-server-sdk');
            return res.status(503).json({ 
                message: 'PayPal is not configured. Please install @paypal/checkout-server-sdk: npm install @paypal/checkout-server-sdk',
                error: error.message
            });
        }
        throw error;
    }
});

export default router;

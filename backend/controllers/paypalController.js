import { client } from '../config/paypal.js';
import paypal from '@paypal/checkout-server-sdk';
import order from '../models/Order.js';

// Create PayPal order
const createPayPalOrder = async (req, res) => {
    try {
        // Check if PayPal is configured
        if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
            return res.status(503).json({ 
                message: 'PayPal is not configured. Please set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in .env' 
            });
        }

        const { orderId } = req.body;

        if (!orderId) {
            return res.status(400).json({ message: 'Order ID is required' });
        }

        // Find the order in database
        const dbOrder = await order.findById(orderId).populate('user');
        
        if (!dbOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if order already paid
        if (dbOrder.isPaid) {
            return res.status(400).json({ message: 'Order already paid' });
        }

        // Create PayPal order request
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer('return=representation');
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                reference_id: orderId.toString(),
                description: `Order #${orderId}`,
                amount: {
                    currency_code: 'USD',
                    value: dbOrder.totalprice.toFixed(2)
                }
            }],
            application_context: {
                brand_name: 'MERN Store',
                landing_page: 'NO_PREFERENCE',
                user_action: 'PAY_NOW',
                return_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/order-success`,
                cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/checkout`
            }
        });

        // Execute PayPal order creation
        const paypalOrder = await client().execute(request);

        res.status(201).json({
            orderId: paypalOrder.result.id,
            status: paypalOrder.result.status,
            links: paypalOrder.result.links
        });
    } catch (error) {
        console.error('PayPal order creation error:', error);
        res.status(500).json({ 
            message: 'Failed to create PayPal order', 
            error: error.message 
        });
    }
};

// Capture PayPal payment
const capturePayPalPayment = async (req, res) => {
    try {
        // Check if PayPal is configured
        if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
            return res.status(503).json({ 
                message: 'PayPal is not configured. Please set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in .env' 
            });
        }

        const { orderId, paypalOrderId } = req.body;

        if (!orderId || !paypalOrderId) {
            return res.status(400).json({ 
                message: 'Order ID and PayPal Order ID are required' 
            });
        }

        // Find the order in database
        const dbOrder = await order.findById(orderId);
        
        if (!dbOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Create capture request
        const request = new paypal.orders.OrdersCaptureRequest(paypalOrderId);
        request.requestBody({});

        // Execute capture
        const capture = await client().execute(request);

        // Check if payment was successful
        if (capture.result.status === 'COMPLETED') {
            // Update order with payment confirmation
            dbOrder.isPaid = true;
            dbOrder.paidAt = new Date();
            dbOrder.paymentInfo.status = 'completed';
            dbOrder.paymentInfo.confirmation = {
                paypalOrderId: capture.result.id,
                payerId: capture.result.payer?.payer_id,
                captureId: capture.result.purchase_units[0]?.payments?.captures[0]?.id,
                status: capture.result.status,
                amount: capture.result.purchase_units[0]?.payments?.captures[0]?.amount,
                createTime: capture.result.create_time,
                updateTime: capture.result.update_time
            };

            await dbOrder.save();

            res.status(200).json({
                message: 'Payment captured successfully',
                order: dbOrder,
                paypalResponse: capture.result
            });
        } else {
            // Payment not completed
            dbOrder.paymentInfo.status = 'failed';
            dbOrder.paymentInfo.confirmation = {
                paypalOrderId: capture.result.id,
                status: capture.result.status,
                error: 'Payment not completed'
            };
            await dbOrder.save();

            res.status(400).json({
                message: 'Payment not completed',
                status: capture.result.status
            });
        }
    } catch (error) {
        console.error('PayPal capture error:', error);
        
        // Try to update order status to failed
        try {
            const dbOrder = await order.findById(req.body.orderId);
            if (dbOrder) {
                dbOrder.paymentInfo.status = 'failed';
                await dbOrder.save();
            }
        } catch (updateError) {
            console.error('Failed to update order status:', updateError);
        }

        res.status(500).json({ 
            message: 'Failed to capture payment', 
            error: error.message 
        });
    }
};

export { createPayPalOrder, capturePayPalPayment };

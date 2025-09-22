import mongoose from "mongoose";
import products from "../models/Product.js";
import order from "../models/Order.js";
const createOrder = async (req, res) => {
    try {
        const { items, shippingInfo, paymentInfo } = req.body;
        const userId = req.user._id;
        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No items in the order" });
        }

        let totalprice = 0;
        const orderItems = []
        for (const item of items) {
            const product = await products.findById(item.product);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            const price = product.price * item.quantity;
            totalprice += price;

            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: price
            })
        }
        const newOrder = new order({
            user: userId,
            items: orderItems,
            shippingInfo,
            paymentInfo,
            totalprice: totalprice
        });

        await newOrder.save();
        console.log("Order created:", newOrder);

        res.status(201).json({ message: "Order created successfully", order: newOrder });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
    console.log("Incoming order:", req.body);
    console.log("User:", req.user);
}

const getOrdersByProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user._id
        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ msg: "Invalid product ID" });
        }

         const product = await products.findOne({
            _id: productId,
            owner: userId
        });

        if (!product) {
            return res.status(404).json({ msg: "Product not found or not owned by this user" });
        }

        const orderId = await order.find({ "items.product" : productId })
            .populate("items.product", "name price")
        if (orderId.length > 0) {
            res.json(orderId);
        } else {
            res.status(404).json({ msg: "No orders found for this product" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error fetching orders" });
    }
}


const updatetOrderStatus = async (req,res) => {
    try {
        const orderId = req.params.orderId
        const { status } = req.body;

         if (!["pending", "shipped", "delivered"].includes(status)) {
            return res.status(400).json({ msg: "Invalid status" });
        }

        const updatedOrder = await order.findByIdAndUpdate(orderId,{ status }, {new:true}).populate("items.product");

        if (!updatedOrder) {
            return res.status(404).json({ msg: "Order not found" });
        }

        res.json(updatedOrder)
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error updatind status order" });

    }
}

export { createOrder , getOrdersByProduct, updatetOrderStatus } 
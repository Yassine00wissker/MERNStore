import order from "../models/Order.js";
import products from "../models/Product.js";
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
export { createOrder } 
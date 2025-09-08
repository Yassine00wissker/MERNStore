import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "user", required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId, ref: "product", required: true
            },
            quantity: {
                type: Number, required: true
            },
            price: {
                type: Number, required: true
            }
        }
    ],
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    paymentInfo: {
        method: {
            type: String,
            enum: ["creditCard", "paypal"],
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending"
        }
    },
    status: { type: String, enum: ["pending", "shipped", "delivered"], default: "pending" },
    totalprice: { type: Number, required: true },
}, { timestamps: true })
export default mongoose.model("order", orderSchema); 
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId, ref: "user", required: true
    },
    items: [
        {
            product: {
                type: Schema.Types.ObjectId, ref: "product", required: true
            },
            quantity: {
                type: Number, required: true
            },
            price: {
                type: Number, required: true
            }
        }
    ],
    status: { type: String, enum: ["pending", "shipped", "delivered"], default: "pending" },
    totalprice: { type: Number, required: true },
}, { timestamps: true })
export default mongoose.model("order", orderSchema); 
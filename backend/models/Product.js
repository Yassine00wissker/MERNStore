import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, require: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
}, { timestamps: true })

export default mongoose.model("product", productSchema)
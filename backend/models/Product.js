import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String, require: true},
    description: {type: String, require: true},
    price: {type: Number, require: true},
    image: {type: String, require: true},
    category: {type: String, require: true},
    quantity: {type: Number, require: true},
}, { timestamps: true })

export default mongoose.model("product", productSchema)
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: {
        type: String,
        enum: ["buyer", "seller", "admin"],
        default: "buyer"
    }
}, { timestamps: true })

export default mongoose.model("user", userSchema)
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import products from "./routers/products.js"
import user from "./routers/user.js"
import cookieParser from "cookie-parser"
import order from "./routers/order.js"

dotenv.config();

connectDB()

const app = express()
// Middleware
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173", // React dev server address
    credentials: true
}));
app.use(express.json())

app.use("/api/products", products)
app.use("/api/users", user)
app.use("/api/order", order)
//app.use("/api/example", /*importation */)

app.listen(process.env.PORT, () => { console.log(`server is running in ${process.env.PORT}`) })
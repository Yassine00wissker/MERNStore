import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import products from "./routers/products.js"

dotenv.config();

connectDB()

const app = express()
// Middleware
app.use(cors())
app.use(express.json())

app.use("/api/products", products)
//app.use("/api/example", /*importation */)

app.listen(process.env.PORT, () => {console.log(`server is running in ${process.env.PORT}`)})
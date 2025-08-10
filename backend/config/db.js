import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connect : ${con.connect.host}`)
    } catch (error) {
        console.error(`Error : ${error.message}`);
        process.exit(1)
    }
};

export default connectDB;
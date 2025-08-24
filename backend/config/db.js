import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL);//to be change mongoodb atlas link
        console.log(`Connect : ${con.connection.host}`);
    } catch (error) {
        console.error(`Error : ${error.message}`);
        process.exit(1)
    }
};

export default connectDB;
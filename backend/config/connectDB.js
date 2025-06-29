import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async(req,res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully!");
    } catch (error) {
        console.log("Unable to connect the Database");
    }
} 

export default connectDB;
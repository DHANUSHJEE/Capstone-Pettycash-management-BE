import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";


dotenv.config();


export const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connected`.cyan.underline.bold);
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold);
    }
}

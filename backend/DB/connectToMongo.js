import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export const connectToMongo = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("connect to mongoDB server!!")
    } catch (error) {
        console.log("Error", error)
    }
}
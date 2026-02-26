import mongoose from "mongoose";

export async function connectToDB() {
    try {
        const URI = process.env.MONGO_URI || "mongodb://auth-db-srv:27017/auth"
        await mongoose.connect(URI);
        console.log("Connected to database");
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Failed to connect database:", error.message);
        } else {
            console.log("Failed to connect database:", error);
        }
        process.exit(1); 
    }
}
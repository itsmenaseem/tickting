import mongoose from "mongoose";

export async function connectToDB() {
    try {
        await mongoose.connect("mongodb://auth-db:27017/auth");
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
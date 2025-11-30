import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    throw new Error("MONGO_URI not set in environment");
}
export default async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI, {
        // options not required for modern mongoose but ok to include
        });
        console.log("MongoDB connected");
    }
    catch (err) {
        console.error("MongoDB error:", err);
        throw err;
    }
}

import mongoose from "mongoose";

// mongodb connection with mongoose
export async function connectMongoDB(url) {
    return mongoose.connect(url)
}

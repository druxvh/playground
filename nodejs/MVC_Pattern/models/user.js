import { Schema, model } from "mongoose";

// Schema (Mongoose)
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

// Model
export const User = model('user', userSchema)
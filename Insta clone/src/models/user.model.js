import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Already registered with this email"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username is already taken"],
  },
  password: String,
});

export const userModel = mongoose.model("users", userSchema);

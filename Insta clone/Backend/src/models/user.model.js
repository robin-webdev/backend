import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  profileImage: {
    type: String,
    default:
      "https://ik.imagekit.io/robinrangaspace/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg",
  },

  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username is already taken"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Account already exists"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

export const userModel = mongoose.model("users", userSchema);

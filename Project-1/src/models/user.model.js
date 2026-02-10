import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username is already taken."],
    required: [true, "Username is required."],
  },
  email: {
    type: String,
    unique: [true, "You are already registered."],
    required: [true, "Email is required."],
  },
  password: {
    type: String,
    required: [true, "Password is Required."],
  },
  bio: String,
  profileImage: {
    type: String,
    default:
      "https://ik.imagekit.io/robinrangaspace/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg",
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;

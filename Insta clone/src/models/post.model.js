import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: [true, "Caption is required"],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: [true, "User is required"],
  },
  image: String,
});

export const postModel = mongoose.model("posts", postSchema);

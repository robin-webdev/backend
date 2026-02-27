import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Types.ObjectId,
      ref: "posts",
      required: [true, "Post Id is required"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: [true, "User Id is required"],
    },
  },
  { timestamps: true },
);

likeSchema.index({ user: 1, post: 1 }, { unique: true });

export const likeModel = mongoose.model("likes", likeSchema);

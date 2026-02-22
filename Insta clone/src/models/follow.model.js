import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
  follower: {
    type: String,
    required: [true, "Follower is required"],
  },
  followee: {
    type: String,
    required: [true, "Followee is required"],
  },
});

followSchema.index([{ follower: 1 }, { followee: 1 }]);

export const followModel = mongoose.model("follows", followSchema);

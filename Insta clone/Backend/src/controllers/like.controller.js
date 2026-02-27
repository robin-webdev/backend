import { likeModel } from "../models/like.model.js";
import { postModel } from "../models/post.model.js";

export async function likeController(req, res) {
  const postId = req.params.postId;
  const userId = req.user.id;

  try {
    const post = await postModel.findById(postId);
  } catch (error) {
    res.status(404).json({
      message: "No post found with given Id",
      error,
    });
    console.error(error);
    return;
  }

  let isAlreadyLiked;

  try {
    isAlreadyLiked = await likeModel.findOne({ post: postId, user: userId });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching like details",
      error,
    });
    console.error(error);
    return;
  }

  if (isAlreadyLiked) {
    return res.status(409).json({
      message: "You have already liked this post",
    });
  }

  try {
    await likeModel.create({
      user: userId,
      post: postId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error liking the post",
      error,
    });
    console.error(error);
    return;
  }

  return res.status(201).json({
    message: "Successfully liked the post",
  });
}

export async function dislikeController(req, res) {
  const postId = req.params.postId;
  const userId = req.user.id;

  try {
    const post = await postModel.findById(postId);
  } catch (error) {
    res.status(404).json({
      message: "No post found with given Id",
      error,
    });
    console.error(error);
    return;
  }

  let isLiked;

  try {
    isLiked = await likeModel.findOne({ post: postId, user: userId });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching like details",
      error,
    });
    console.error(error);
    return;
  }

  if (!isLiked) {
    return res.status(409).json({
      message: "You have already not liked this post",
    });
  }

  try {
    await likeModel.findOneAndDelete({
      user: userId,
      post: postId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error disliking the post",
      error,
    });
    console.error(error);
    return;
  }

  return res.status(201).json({
    message: "Successfully disliked the post",
  });
}

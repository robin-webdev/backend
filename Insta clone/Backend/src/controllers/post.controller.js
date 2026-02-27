import ImageKit, { toFile } from "@imagekit/nodejs";
import { postModel } from "../models/post.model.js";

export async function createPostController(req, res) {
  if (!req.body?.caption) {
    return res.status(400).json({
      message: "No caption found",
    });
  }

  const { caption } = req.body;

  const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  });

  let file;

  if (req.file) {
    file = await client.files.upload({
      file: await toFile(Buffer.from(req.file.buffer), "file"),
      fileName: "postImage",
      folder: "instagram/posts",
    });
  }

  let post;
  try {
    post = await postModel.create({
      user: req.user.id,
      caption: caption,
      image: file ? file.url : undefined,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating post",
      error,
    });
    console.error(error);
    return;
  }

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
}

export async function getAllPostsController(req, res) {
  let posts;
  try {
    posts = await postModel.find({
      user: req.user.id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error getting user posts",
      error,
    });
    console.error(error);
    return;
  }

  res.status(200).json({
    message: "Fetched posts successfully",
    posts,
  });
}

export async function getPostController(req, res) {
  const postId = req.params?.postId;

  let post;
  try {
    post = await postModel.findById(postId);
  } catch (error) {
    res.status(500).json({
      message: "Error getting user posts",
      error,
    });
    console.error(error);
    return;
  }

  if (!post) {
    return res.status(404).json({
      message: "No post found with this ID",
    });
  }

  const isValidUser = req.user.id === post.user.toString();

  if (!isValidUser) {
    return res.status(403).json({
      message: "You can't access this post",
    });
  }

  res.status(200).json({
    message: "Post fetched successfully",
    post,
  });
}

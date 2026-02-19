import ImageKit, { toFile } from "@imagekit/nodejs";
import jwt from "jsonwebtoken";
import postModel from "../models/post.model.js";

export async function createPostController(req, res) {
  const client = new ImageKit({
    privateKey: process.env["IMAGEKIT_PRIVATE_KEY"],
  });

  const file = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "Instagram",
  });

  const post = await postModel.create({
    user: req.user.id,
    caption: req.body.caption,
    imgUrl: file.url,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
}

export async function getPostController(req, res) {
  const posts = await postModel.find({ user: req.user.id });
  res.send(posts);
}

// @route - Post 

export async function getPostDetailsController(req, res) {
  const token = req.cookies.auth_token;

  const userID = req.user.id;
  const { postID } = req.params;

  const post = await postModel.findOne({ user: userID, _id: postID });

  if (!post) {
    res.status(404).json({
      message: "No post found for this user",
    });
  }

  res.status(200).json({
    message: "Post Found",
    post,
  });
}

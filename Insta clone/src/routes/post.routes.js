import express from "express";
import { identifyUser } from "../middlewares/auth.middleware.js";
import multer from "multer";
import {
  createPostController,
  getAllPostsController,
  getPostController,
} from "../controllers/post.controller.js";

const upload = multer({
  storage: multer.memoryStorage(),
});

export const postRouter = express.Router();

postRouter.post(
  "/",
  identifyUser,
  upload.single("postImage"),
  createPostController,
);

postRouter.get("/", identifyUser, getAllPostsController);

postRouter.get("/:postId", identifyUser, getPostController);

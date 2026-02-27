import express from "express";
import { identifyUser } from "../middlewares/auth.middleware.js";
import {
  dislikeController,
  likeController,
} from "../controllers/like.controller.js";

export const likeRouter = express.Router();

likeRouter.post("/like/:postId", identifyUser, likeController);
likeRouter.delete("/dislike/:postId", identifyUser, dislikeController);

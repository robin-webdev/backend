import express from "express";
import { identifyUser } from "../middlewares/auth.middleware.js";
import {
  followController,
  unfollowController,
} from "../controllers/follow.controller.js";

export const followRouter = express.Router();

followRouter.post("/follow/:username", identifyUser, followController);
followRouter.delete("/unfollow/:username", identifyUser, unfollowController);

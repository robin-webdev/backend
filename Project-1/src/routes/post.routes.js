import express from "express";
import {
  createPostController,
  getPostController,
  getPostDetailsController,
} from "../controllers/post.controller.js";
import multer from "multer";
import { identifyUser } from "../middlewares/auth.middleware.js";

const postRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

postRouter.use(identifyUser);

postRouter.post("/", upload.single("image"), createPostController);
postRouter.get("/", getPostController);
postRouter.get("/details/:postID", getPostDetailsController);

export default postRouter;

import express from "express";
import { createPostController } from "../controllers/post.controller.js";
import multer from "multer";

const postRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/", upload.single("image"), createPostController);

export default postRouter;

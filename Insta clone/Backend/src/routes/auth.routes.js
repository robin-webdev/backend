import express from "express";
import multer from "multer";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller.js";

export const authRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

authRouter.post("/register", upload.single("profileImage"), registerController);
authRouter.post("/login", loginController);

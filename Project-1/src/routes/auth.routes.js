import express from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import crypto from "crypto";
import { loginController, registerController } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", registerController);

authRouter.post("/login", loginController);

export default authRouter;
  
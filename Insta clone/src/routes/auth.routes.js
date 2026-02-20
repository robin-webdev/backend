import express from "express";
import { identifyUser } from "../middlewares/auth.middleware.js";
import { registerController } from "../controllers/auth.controller.js";

export const authRouter = express.Router();

authRouter.post("/register", registerController);

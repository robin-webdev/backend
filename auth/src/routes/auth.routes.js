import express from "express";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  try {
    if (!req.body) {
      res.status(404).json({
        message: "No body found.",
      });
    }

    const { email, name, password } = req.body;

    const userExist = await userModel.findOne({ email });

    if (userExist) {
      res.status(409).json({
        message: "User already exists...",
      });
    }

    const user = await userModel.create({
      name,
      email,
      password,
    });

    const token = jwt.sign(
      {
        id: user._id,
        email,
      },
      process.env.JWT_SECRET,
    );

    res.status(201).json({
      message: "User Created...",
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating User...",
      error: error,
    });
  }
});

export default authRouter;

import express from "express";
import userModel from "../models/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

authRouter.get("/users", async (req, res) => {
  const users = await userModel.find();
  res.status(200).json({
    message: "User fetched successfully...",
    users,
  });
});

authRouter.post("/register", async (req, res) => {
  if (!req.body) return res.status(404).json({ message: "No Body Found" });

  const { name, email, password } = req.body;

  if (!name | !email | !password)
    return res.status(404).json({ message: "Field Missing..." });

  try {
    const hash = crypto.createHash("md5").update(password).digest("hex");
    const user = await userModel.create({ name, email, password: hash });
    if (user) {
      return res.status(409).json({
        message: "User already exists...",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("authToken", token);

    res.status(201).json({
      message: "User created Successfully...",
      user,
      token,
    });
  } catch (error) {
    res.status(404).json({
      message: "User registeration Failed..",
      error: error.message,
    });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    if (!req.body) throw new Error("No Body Found");
    const { email, password } = req.body;

    if (!email | !password) throw new Error("Field Missing...");

    const user = await userModel.findOne({ email });
    if (!user) throw new Error("User is not registerred...");
    const isPasswordCorrect =
      user.password === crypto.createHash("md5").update(password).digest("hex");
    if (!isPasswordCorrect) throw new Error("Invalid Password");
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("authToken", token);
    res.status(200).json({
      message: "Successfully Logged in...",
      user,
      token,
    });
  } catch (error) {
    res.status(404).json({
      message: "User Login Failed!",
      error: error.message,
    });
  }
});

authRouter.get("/protected", async (req, res) => {
  try {
    const token = req.cookies?.authToken;
    if (!token) throw new Error("You are not Logged In...");

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    console.log(id);
    const user = await userModel.findOne({ _id: id });
    if (!user) throw new Error("You are not logged in...");
    res.status(200).json({
      message: "Route is Accessed...",
      user,
    });
  } catch (error) {
    res.status(404).json({
      message: "Some Error Occurred...",
      error: error.message,
    });
  }
});

export default authRouter;

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";
import ImageKit, { toFile } from "@imagekit/nodejs";

export async function registerController(req, res) {
  console.log(req.file);
  if (!req.body) {
    return res.status(400).json({
      message: "No Body Found",
    });
  }

  const { name, username, email, password } = req.body;

  if (!(name && username && email && password)) {
    return res.status(400).json({
      message: "Field is missing",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message:
        isUserAlreadyExist.email === email
          ? "User already exists"
          : "Username is already taken",
    });
  }

  const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  });

  let file;

  if (req.file) {
    file = await client.files.upload({
      file: await toFile(Buffer.from(req.file.buffer), "profileImage"),
      fileName: "profileImage",
      folder: "instagram/users",
    });
  }

  let user;

  try {
    user = await userModel.create({
      name,
      username,
      email,
      password: hashedPassword,
      profileImage: file ? file.url : undefined,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error,
    });
    console.error(error);
    return;
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
  );

  res.cookie("auth_token", token);

  res.status(201).json({
    message: "User created successfully",
    user: {
      name: user.name,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
    },
    token,
  });
}

export async function loginController(req, res) {
  if (!req.body) {
    return res.status(400).json({
      message: "No Body Found",
    });
  }

  const { username, email, password } = req.body;

  if (!((username || email) && password)) {
    return res.status(400).json({
      message: "Field is missing",
    });
  }

  const user = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    return res.status(401).json({
      message: "User is not registered",
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
  );

  res.cookie("auth_token", token);

  res.status(200).json({
    message: "User Logged in successfully",
    user: {
      name: user.name,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
    },
    token,
  });
}

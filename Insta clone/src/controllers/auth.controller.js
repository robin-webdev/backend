import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt";

export async function registerController(req, res) {
  if (!req.body) {
    return res.status(400).json({
      message: "Body cannot be empty",
    });
  }

  const { username, email, password } = req.body;

  if (!(username && email && password)) {
    return res.status(400).json({
      message: `${!username ? "Username" : !email ? "Email" : "Password"} is required`,
    });
  }

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: `Account already exists with this ${isUserAlreadyExist.email ? "username" : "email"}`,
    });
  }

  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await userModel.create({ email , password: hashed });
  } catch (error) {
    return res.status(409).json({
      message: "Error creating user",   
      error, 
    });
  }
}

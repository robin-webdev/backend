import jwt from "jsonwebtoken";

export async function identifyUser(req, res, next) {
  const token = req.cookies["auth_token"];

  if (!token)
    return res.status(404).json({
      message: "You are not logged in!",
    });

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized Access!",
    });
  }

  req.user = decoded;

  next();
}

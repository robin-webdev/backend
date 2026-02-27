import jwt from "jsonwebtoken";

export async function identifyUser(req, res, next) {
  const token = req.cookies["auth_token"];

  if (!token) {
    return res.status(401).json({
      message: "User is not logged in",
    });
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }

  req.user = { id: decoded.id, username: decoded.username };

  next();
}

import jwt from "jsonwebtoken";

export async function identifyUser(req, res, next) {
  const token = req.cookie.auth_token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized Request",
    });   
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Invalid Token",
    });
  }

  req.user = decoded.id;
  req.username = decoded.username;
}

import express from "express";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.routes.js";
import { postRouter } from "./routes/post.routes.js";
import { followRouter } from "./routes/follow.routes.js";
import { likeRouter } from "./routes/like.routes.js";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

app.use("/api/auth/", authRouter);
app.use("/api/posts/", postRouter);
app.use("/api/connect/", followRouter);
app.use("/api/react/", likeRouter);

export default app;

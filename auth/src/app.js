import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Reqeust Recieved!",
  });
});

app.post("/register", (req, res) => {});

export default app;

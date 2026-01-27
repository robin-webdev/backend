import express from "express";

const app = express();

app.get("/", () => {
  res.send("Hii");
});
 
export default app;

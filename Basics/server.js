// import app from "./src/app.js";
import app from "./src/database-app.js";
import mongoose from "mongoose";
import env from "dotenv";

env.config();

// This file is for running the server.... and connecting to server......

async function connectToDb() {
  let connection = await mongoose.connect(process.env.MONGODB_URI);

  console.log("Connected");
}

connectToDb();

app.listen(process.env.PORT, () => {
  console.log("Server started on https://localhost:3000/");
}); // Starting the server on port 3000

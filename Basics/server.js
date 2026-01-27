// import app from "./src/app.js";
import app from "./src/database-app.js";
import mongoose from "mongoose";

// This file is for running the server.... and connecting to server......

async function connectToDb() {
  let connection = await mongoose.connect(
    "mongodb+srv://robin:password%40db@demo-cluster.bqstfaw.mongodb.net/db-1",
  );

  console.log("Connected");
}
 
connectToDb();

app.listen(3000, () => {
  console.log("Server started on https://localhost:3000/");
}); // Starting the server on port 3000

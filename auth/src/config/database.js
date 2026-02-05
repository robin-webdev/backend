import mongoose from "mongoose";

async function connectToDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Successfully connected to the Database...");
}

export default connectToDB;

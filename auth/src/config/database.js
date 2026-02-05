import mongoose from "mongoose";

async function connectToDB() {
  await mongoose.connect(`${process.env.MONGO_URI}/auth`);
  console.log("Connected to Database..");
}

export default connectToDB;

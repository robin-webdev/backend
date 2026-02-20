import { configDotenv } from "dotenv";
import app from "./src/app.js";
import { connectToDB } from "./src/config/database.js";

configDotenv();

const port = process.env.PORT;

connectToDB();

app.listen(port, () => {
  console.log(`The server is currently running at http://localhost:${port}/`);
});
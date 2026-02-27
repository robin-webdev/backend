import { connectToDB } from "./src/config/database.js";
import app from "./src/app.js";
import { configDotenv } from "dotenv";

configDotenv();

connectToDB();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
[]
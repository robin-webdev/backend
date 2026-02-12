import app from "./src/app.js";
import connectToDb from "./src/config/database.js";
import { configDotenv } from "dotenv";

configDotenv();

const port = process.env.PORT;

connectToDb();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

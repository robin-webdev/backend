import app from "./src/app.js";
import dotenv from "dotenv";
import connectToDB from "./src/config/database.js";

dotenv.config();

const port = process.env.PORT;

connectToDB();

app.listen(port, () => {
  console.log(`Server running on - http://localhost:${port}/`);
});

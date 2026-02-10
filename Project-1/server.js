import dotenv from "dotenv";
import app from "./src/app.js";
import connectToDb from "./src/config/database.js";

dotenv.config();

const port = process.env.PORT;

connectToDb();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

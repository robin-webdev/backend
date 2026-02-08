import app from "./src/app.js";
import connectToDB from "./src/config/database.js";

connectToDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

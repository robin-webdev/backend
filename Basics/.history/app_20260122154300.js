const express = require("express");

const app = express(); // Creating a server

app.get("/", (req,res) => {
  console.log(app);
});

app.listen(3000); // Starting the server on port 3000

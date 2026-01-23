const express = require("express");

const app = express(); // Creating a server

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log(req);
});

app.listen(3000); // Starting the server on port 3000

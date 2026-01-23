const express = require("express");

const app = express(); // Creating a server

const notes = [
  {
    title : "Test title 1", 
    description : "Test description 1"
  }
] 

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000); // Starting the server on port 3000

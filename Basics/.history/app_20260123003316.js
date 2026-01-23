const express = require("express");

const app = express(); // Creating a server

app.use(express.json());

const notes = [];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/notes", (req, res) => {
  console.log(req.body);
  if (req.body) {
    notes.push(req.body);
    res.send("Note Created!");
  }else{
    res.send("")
  }
});

app.listen(3000); // Starting the server on port 3000

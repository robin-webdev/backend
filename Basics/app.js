const express = require("express");

const app = express(); // Creating a server

app.use(express.json());

const notes = [];

app.get("/", (req, res) => {
  res.send(notes);
});

app.post("/notes/:id", (req, res) => {
  if (req.body) {
    let note = { ...req.body, id: req.params?.id };
    if(this.id === req.body.id)
    notes.push(note);
    res.send("Note Created!");
  } else {
    res.send("Note creation Failed!");
  }
});

app.get("/notes/:id", (req, res) => {
  console.log(req.params);
  res.send("Done"); 
});

setInterval(() => { 
  console.log(notes);
}, 5000);

app.listen(3000); // Starting the server on port 3000

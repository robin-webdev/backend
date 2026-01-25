import express from "express";

// THis file is for creating and configuring the server....

const app = express(); // Creating a server

app.use(express.json());

const notes = [];

app.get("/notes", (req, res) => {
  res.send(notes);
});

app.post("/notes/:id", (req, res) => {
  if (req.body) {
    let note = { ...req.body, id: req.params?.id };
    notes.push(note);
    res.send("Note Created!");
  } else {
    res.send("Note creation Failed!");
  }
});

app.delete("/notes/:id", (req, res) => {
  if (!req.body) {
    res.send("No body found!");
  }
  notes.forEach((note, ind) => {
    if (note?.id == req.body?.id) {
      notes[ind] = null;
      res.send("Note successfully deleted!");
    }
  });
  res.send("No note found with this id!");
});

app.patch("/notes/:id", (req, res) => {
  if (!req.body) {
    res.send("No body found!");
  }
  notes.forEach((note, ind) => {
    if (note?.id == req.params?.id) {
      notes[ind].description = req.body.description;
      res.send("Note successfully updated!");
    }
  });
  res.send("No note found with this id!");
});

export default app;

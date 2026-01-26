import express from "express";

// THis file is for creating and configuring the server....

const app = express(); // Creating a server

app.use(express.json());

const notes = [];

app.get("/notes", (req, res) => {
  res.status(200).json(notes);
});

app.post("/notes/:id", (req, res) => {
  if (req.body) {
    let note = { ...req.body, id: req.params?.id };
    notes.push(note);
    res.status(201).json({
      message: "Note created successfully!",
    });
  } else {
    res.status(400).json({
      message: "No Body Found",
    });
  }
});

app.delete("/notes/:id", (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "No Body Found",
    });
    return;
  }
  notes.forEach((note, ind) => {
    if (note?.id == req.body?.id) {
      notes[ind] = null;
      res.status(204).json({
        message: "Note successfully Deleted",
      }); // No data while using 204 Status Code
      return;
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
      res.status();
    }
  });
  res.status;
});

export default app;

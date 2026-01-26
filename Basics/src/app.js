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

app.delete("/notes", (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "No Body Found",
    });
    return;
  }

  let idAvailable = false;
  notes.forEach((note, ind) => {
    if (note?.id == req.body?.id) {
      notes[ind] = null;
      idAvailable = true;
      res.status(204).json({
        message: "Note successfully Deleted",
      }); // No data while using 204 Status Code
    }
  });

  if (!idAvailable) {
    res.status(404).json({
      message: "No note found with this id!",
    });
  }
});

app.patch("/notes", (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "No Body Found",
    });
    return;
  }
  let idAvailable = false; 
  notes.forEach((note, ind) => {
    if (note?.id == req.body?.id) {
      notes[ind].description = req.body.description;
      idAvailable = true;
      res.status(200).json({
        message: "User updated successfully!",
      });
      return;
    }
  });
  if (!idAvailable) {
    res.status(404).json({
      message: "No note found with this id!",
    });
  }
});

export default app;
     
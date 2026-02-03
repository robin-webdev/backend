import cors from "cors";
import express from "express";
import { notesModel } from "./models/notes.model.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/notes", async (req, res) => {
  try {
    const data = await notesModel.find(); // Returns array of Object
    res.status(200).json({
      message: "Data recieved!",
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: "Bad Request!",
      error,
    });
  }
});

app.post("/api/notes", async (req, res) => {
  if (!req.body) {
    res.status(404).json({
      message: "No body Found!",
    });
    return;
  }
  const { title, description } = req.body;
  if (!title && !description) {
    res.status(404).json({
      message: "Title and Description must be send...",
    });
    return;
  }

  try {
    const note = await notesModel.create({
      title,
      description,
    });
    res.status(201).json({
      message: "Note created successfully!",
      note,
    });
  } catch (error) {
    res.status(404).json({
      message: "Bad Request!",
      error,
    });
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await notesModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Successfully deleted a note",
    });
  } catch (error) {
    res.status(400).json({
      message: "Bad Request!",
      error,
    });
  }
});

app.patch("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    console.log(id, { description });
    await notesModel.findByIdAndUpdate(id, { description });
    res.status(200).json({
      message: "Successfully Updated a note",
    });
  } catch (error) {
    res.status(400).json({
      message: "Bad Request!",
      error,
    });
  }
});

const __filename = fileURLToPath(import.meta.url);
app.use(express.static(path.join(path.dirname(__filename), "..", "public")));

app.use("*name", (req, res) => {
  res.sendFile("/index.html");
});

export default app;

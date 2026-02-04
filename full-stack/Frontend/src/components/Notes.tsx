import { useEffect, useState } from "react";
import { fetchContext } from "./ContextProvider";
import { useNotes } from "../App";
import { RiDeleteBin7Line, RiEditLine } from "@remixicon/react";
import axios from "axios";
import PopUp from "./PopUp";

export interface note {
  title: string;
  description: string;
  _id: string;
}

const Notes = () => {
  const [isOpen, setIsOpen] = useState(false);
  if (!fetchContext) {
    throw new Error("useNotes must be used within NotesProvider");
  }

  const { notes, getNotes } = useNotes();

  async function updateNote(id: string) {
    setId(id);
    setIsOpen(true);
  }

  async function deleteNote(id: string) {
    try {
      await axios.delete(`https://basic-todo-app-89nq.onrender.com/api/notes/${id}`);
      getNotes();
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getNotes();
  }, []);

  const [id, setId] = useState("");

  return (
    <>
      <PopUp isOpen={isOpen} setIsOpen={setIsOpen} id={id} />
      <div className="note-container">
        {notes.map((note, ind) => {
          return (
            <div className="note" key={ind}>
              <div className="title">{note.title}</div>
              <div className="description">{note.description}</div>
              <div className="icons">
                <RiDeleteBin7Line
                  className="icon"
                  onClick={() => deleteNote(note._id)}
                />
                <RiEditLine onClick={() => updateNote(note._id)} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Notes;

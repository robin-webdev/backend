import axios from "axios";
import { useEffect, useState } from "react";

interface note {
  title: string;
  description: string;
}

const Notes = () => {
  const [notes, setNotes] = useState<note[]>([]);

  async function getNotes() {
    try {
      const response = await axios.get("http://localhost:3000/api/notes");
      const data = response?.data?.data;
      setNotes(data ? data : []);
    } catch (error) {
      console.log("Error Fetching Notes...");
      console.error(error);
    }
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="note-container">
      {notes.map((note, ind) => {
        return (
          <div className="note" key={ind}>
            <div className="title">{note.title}</div>
            <div className="description">{note.description}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Notes;

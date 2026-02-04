import { createContext, useState, type ReactNode } from "react";
import type { note } from "./Notes";
import axios from "axios";

type contextTypes = {
  notes: note[];
  getNotes: () => Promise<void>;
};
export const fetchContext = createContext<undefined | contextTypes>(undefined);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<note[]>([]);

  async function getNotes() {
    try {
      const response = await axios.get("https://basic-todo-app-89nq.onrender.com/api/notes");
      const data = response?.data?.data;
      setNotes(data ? data : []);
    } catch (error) {
      console.log("Error Fetching Notes...");
      console.error(error);
    }
  }
  return (
    <fetchContext.Provider value={{ notes, getNotes }}>
      {children}
    </fetchContext.Provider>
  );
};

export default ContextProvider;

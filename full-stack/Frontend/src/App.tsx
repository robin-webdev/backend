import { useContext } from "react";
import "./app.css";
import Form from "./components/Form";
import Notes from "./components/Notes";
import ContextProvider, { fetchContext } from "./components/ContextProvider";

export function useNotes() {
  const context = useContext(fetchContext);

  if (!context) {
    throw new Error("useNotes must be used within NotesProvider");
  }

  return context;
}

const App = () => {
  return (
    <ContextProvider>
      <div className="main">
        <Form />
        <Notes />
      </div>
    </ContextProvider>
  );
};

export default App;

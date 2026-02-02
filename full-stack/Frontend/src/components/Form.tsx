import { useForm, type SubmitHandler } from "react-hook-form";
import "./form.css";
import axios from "axios";
import { useNotes } from "../App";

export interface Inputs {
  title: string;
  description: string;
}

const Form = () => {
  const { getNotes } = useNotes();
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const formSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!data.title || !data.description) return;
    try {
      await axios.post("http://localhost:3000/api/notes", data);
      getNotes();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <input
        placeholder="Enter Title"
        type="text"
        {...register("title")}
        className="title"
      />
      <input
        type="text"
        placeholder="Enter Description"
        {...register("description")}
        className="desc"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;

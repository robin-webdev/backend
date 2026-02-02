import { useForm, type SubmitHandler } from "react-hook-form";
import type { Inputs } from "./Form";
import { useNotes } from "../App";
import axios from "axios";

const PopUp = (props: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}) => {
  const { register, handleSubmit, reset, setValue } = useForm<Inputs>();
  const { notes, getNotes } = useNotes();
  const note = notes.find((n) => n._id === props.id);
  setValue("title", note?.title ? note?.title : "");
  setValue("description", note?.description ? note?.description : "");

  const formSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!data.title || !data.description) return;
    try {
      await axios.patch(`http://localhost:3000/api/notes/${props.id}`, data);
      props.setIsOpen(false);
      getNotes();
      reset();
    } catch (error) {
      console.error(error);
    }
  };
  if (props.isOpen) {
    return (
      <div
        className="popup"
        onClick={() => {
          props.setIsOpen(false);
        }}
      >
        <div
          className="inner"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {" "}
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
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    );
  }
};

export default PopUp;

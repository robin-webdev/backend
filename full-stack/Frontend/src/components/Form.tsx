import { useForm, type SubmitHandler } from "react-hook-form";
import "./form.css";

interface Inputs {
  title: string;
  description: string;
}

const Form = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  function formSubmit(data: Inputs) {
    console.log(data);
  }
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

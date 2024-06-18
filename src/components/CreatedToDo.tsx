import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, newCategorys, toDoState } from "./atom";
import { styled } from "styled-components";

interface IForm {
  ToDo: string;
  newCategory?: string;
}
const Form = styled.form`
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  display: flex;
  background-color: white;
  color: black;
  flex-direction: column;
  width: 40%;
  gap: 10px;
`;

function CreatedToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const setCategory = useSetRecoilState(newCategorys);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleVaild = ({ ToDo, newCategory }: IForm) => {
    if (newCategory) {
      setCategory((prev) => {
        return {
          ...prev,
          [newCategory]: [],
        };
      });
    }
    setToDos((oldToDos) => [
      { text: ToDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("ToDo", "");
    setValue("newCategory", "");
  };
  return (
    <Form onSubmit={handleSubmit(handleVaild)}>
      <div>
        <label htmlFor="todo">ToDO Input</label>
        <input id="todo" {...register("ToDo", { required: "write todo" })} />
      </div>
      <div>
        <label htmlFor="custom">Custom Input</label>
        <input id="custom" {...register("newCategory")} />
      </div>
      <button>Add</button>
    </Form>
  );
}

export default CreatedToDo;

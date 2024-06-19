import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, newCategorys, toDoState } from "./atom";
import { styled } from "styled-components";

interface IForm {
  ToDo: string;
  newCategory?: string;
}
const Form = styled.form`
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  display: flex;

  align-items: center;
  background-color: #ffb3ba;
  color: black;
  flex-direction: column;
  width: 40%;
  gap: 10px;
  border: none;
`;
const ToDoBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
`;

const InputBox = styled.input`
  border: none;
  opacity: 0.5;
  background-color: white;
  &:hover {
    opacity: 1;
  }
`;
export const Button = styled.button`
  padding: 3px 15px;
  background-color: #bae1ff;
  color: white;
  border-radius: 15px;
  border: none;
  text-align: center;
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
      <ToDoBox>
        <label htmlFor="todo">ToDO Input</label>
        <InputBox id="todo" {...register("ToDo", { required: "write todo" })} />
      </ToDoBox>
      <ToDoBox>
        <label htmlFor="custom">Custom Input</label>
        <InputBox id="custom" {...register("newCategory")} />
      </ToDoBox>
      <Button>Add</Button>
    </Form>
  );
}

export default CreatedToDo;

import { useRecoilState, useRecoilValue } from "recoil";
import {
  Categories,
  categoryState,
  newCategorys,
  toDoSelector,
  toDoState,
} from "./atom";
import CreatedToDo from "./CreatedToDo";
import ToDo from "./ToDo";
import { styled } from "styled-components";

const Title = styled.h1`
  text-align: center;
  padding: 20px;
  font-size: 25px;
  font-weight: bold;
`;
const Wrapper = styled.div`
  width: 100%;
`;

const Box = styled.div`
  width: 486px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  justify-content: center;
`;
const Todo = styled.div`
  margin-top: 10px;
  min-height: 200px;
  min-width: 200px;
  padding: 15px;
  border-radius: 15px;
  background-color: white;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const newCategory = useRecoilValue(newCategorys);
  const onInpute = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <Wrapper>
      <Title>To Dos</Title>

      <hr />
      <Box>
        <select value={category} onInput={onInpute}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
          {Object.keys(newCategory).map((custom) => (
            <option value={custom}>{custom}</option>
          ))}
        </select>

        <CreatedToDo />
        <Todo>
          {toDos?.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </Todo>
      </Box>
    </Wrapper>
  );
}

export default ToDoList;

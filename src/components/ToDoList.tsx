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

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const newCategory = useRecoilValue(newCategorys);
  const onInpute = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInpute}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
        {Object.keys(newCategory).map((custom) => (
          <option value={custom}>{custom}</option>
        ))}
      </select>

      <CreatedToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;

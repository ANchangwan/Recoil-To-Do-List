import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  Categories,
  IToDo,
  newCategorys,
  toDoState,
  INewCategory,
} from "./atom";
import { styled } from "styled-components";
import { Button } from "./CreatedToDo";

const Title = styled.span`
  margin: 0px 15px;
  font-size: 15px;
`;
const List = styled.li`
  display: flex;
  align-items: center;
  padding: 5px 0px;
`;
const Btn = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`;

function ToDo({ id, text, category }: IToDo) {
  const setToDo = useSetRecoilState(toDoState);
  const newCategory = useRecoilValue(newCategorys);
  const onClick = (newCategory: IToDo["category"]) => {
    setToDo((oldToDos) => {
      const targetIndex = oldToDos.findIndex((todo) => todo.id === id);
      const newToDo = { text, id, category: newCategory as any };

      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <List>
      <Title>{text}</Title>
      {category !== Categories.TO_DO && (
        <Btn onClick={() => onClick(Categories.TO_DO)}>TO DO</Btn>
      )}
      {category !== Categories.DOING && (
        <Btn onClick={() => onClick(Categories.DOING)}>Doing</Btn>
      )}
      {category !== Categories.DONE && (
        <Btn onClick={() => onClick(Categories.DONE)}>Done</Btn>
      )}
      {Object.keys(newCategory).map(
        (custome) =>
          category !== custome && (
            <Btn key={custome} onClick={() => onClick(custome)}>
              {custome}
            </Btn>
          )
      )}
    </List>
  );
}

export default ToDo;

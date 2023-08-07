import { useEffect, useState } from "react";
import TodoAPI from "../api/todo";
import Todo from "./Todo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    TodoAPI.getTodos().then((res) => setTodos(res));
  }, []);
  return (
    <div>
      {todos?.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;

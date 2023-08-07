import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import TodoList from "../components/TodoList";
import TodoAPI from "../api/todo";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

export default function TodoPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [content, setContent] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSignOut = () => {
    auth.signout(() => navigate("/signin"));
  };

  const handleAdd = async () => {
    try {
      const newTodo = {
        id: v4(),
        todo: content,
        isCompleted: false,
        userId: auth.user,
      };
      await TodoAPI.createTodo(newTodo);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    TodoAPI.getTodos().then((res) => setTodos(res));
  }, []);

  return (
    <div>
      <button onClick={handleSignOut}>로그아웃</button>
      <input
        data-testid="new-todo-input"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button data-testid="new-todo-add-button" onClick={handleAdd}>
        추가
      </button>
      <TodoList todos={todos} />
    </div>
  );
}

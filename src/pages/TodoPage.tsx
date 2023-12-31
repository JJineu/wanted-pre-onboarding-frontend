import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import TodoList from "../components/TodoList";
import TodoAPI from "../api/todo";
import { useEffect, useState } from "react";
import { Todo } from "../types/todo";

export default function TodoPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [content, setContent] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSignOut = () => {
    auth.signout(() => navigate("/signin"));
  };

  const handleAdd = async () => {
    try {
      const newTodo = {
        todo: content,
        isCompleted: false,
      };
      const data = await TodoAPI.createTodo(newTodo);
      setContent("");
      setTodos((prevTodos) => [...prevTodos, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = ({
    id,
    complete,
  }: {
    id: number;
    complete: boolean;
  }) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: complete } : todo
    );
    setTodos(updatedTodos);
  };

  const handleUpdate = ({
    id,
    editContent,
  }: {
    id: number;
    editContent: string;
  }) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, todo: editContent } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDelete = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  useEffect(() => {
    TodoAPI.getTodos()
      .then((res) => setTodos(res))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <button onClick={handleSignOut}>로그아웃</button>
      <div>
        <input
          data-testid="new-todo-input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="새로운 할일 추가"
        />
        <button
          data-testid="new-todo-add-button"
          onClick={handleAdd}
          disabled={content.trim() === ""}
        >
          추가
        </button>
      </div>
      <div>
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import TodoList from "../components/TodoList";

export default function TodoPage() {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSignOut = () => {
    auth.signout(() => navigate("/signin"));
  };
  const handleAdd = () => {};
  return (
    <div>
      <button onClick={handleSignOut}>로그아웃</button>
      <input data-testid="new-todo-input" />
      <button data-testid="new-todo-add-button" onClick={handleAdd}>
        추가
      </button>
      <TodoList />
    </div>
  );
}

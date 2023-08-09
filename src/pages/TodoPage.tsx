import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import TodoList from "../components/TodoList";
import TodoAPI from "../api/todo";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
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
    <Container>
      <Button onClick={handleSignOut}>로그아웃</Button>
      <InputContainer>
        <Input
          data-testid="new-todo-input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="새로운 할일 추가"
        />
        <Button
          data-testid="new-todo-add-button"
          onClick={handleAdd}
          disabled={content.trim() === ""}
        >
          추가
        </Button>
      </InputContainer>
      <TodoListContainer>
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </TodoListContainer>
    </Container>
  );
}

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  min-width: 250px;
`;
const TodoListContainer = styled.div`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
`;

const Button = styled.button`
  min-width: 60px;
  padding: 8px 16px;
  background-color: ${({ disabled }) => (disabled ? "#d1d1d1" : "#007bff")};
  color: #fff;
  border: none;
  border-radius: 4px;
  outline: none;
  cursor: ${({ disabled }) => (disabled ? "" : "pointer")};
  transition: background-color 0.3s;
  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#d1d1d1" : "#0056b3")};
  }
`;

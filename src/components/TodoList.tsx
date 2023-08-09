import { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

type Props = {
  todos: Todo[];
  onToggle: (params: { id: number; complete: boolean }) => void;
  onUpdate: (params: { id: number; editContent: string }) => void;
  onDelete: (id: number) => void;
};
const TodoList = ({ todos, onToggle, onUpdate, onDelete }: Props) => {
  return (
    <div>
      {todos?.map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;

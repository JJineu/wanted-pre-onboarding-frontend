import Todo from "./Todo";

const TodoList = ({ todos, onToggle, onUpdate, onDelete }) => {
  return (
    <div>
      {todos?.map((todo) => (
        <Todo
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

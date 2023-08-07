export default function Todo({ todo }) {
  const { id, todo: content, isCompleted } = todo;
  const onToggle = () => {};
  const handleUpdate = () => {};
  const handleDelete = () => {};
  return (
    <li>
      <label for="todo">
        <input
          id="todo"
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggle(todo)}
        />
        <span>{content}</span>
      </label>
      <button data-testid="modify-button" onClick={handleUpdate}>
        수정
      </button>
      <button data-testid="delete-button" onClick={handleDelete}>
        삭제
      </button>
    </li>
  );
}

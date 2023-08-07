import { useState } from "react";
import TodoAPI from "../api/todo";

export default function Todo({ todo, onToggle, onUpdate, onDelete }) {
  const { id, todo: content, isCompleted, userId } = todo;
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const handleToggle = async () => {
    const updateContent = {
      id,
      content,
      isCompleted: !isCompleted,
    };
    TodoAPI.updateTodo(updateContent)
      .then(() => onToggle({ id, complete: !isCompleted }))
      .catch((err) => console.log(err));
  };

  const handleUpdate = async () => {
    const updateContent = {
      id,
      content: editContent,
      isCompleted,
    };
    TodoAPI.updateTodo(updateContent)
      .then(() => onUpdate({ id, editContent }))
      .catch((err) => console.log(err));
  };

  const handleDelete = async () => {
    TodoAPI.deleteTodo({ id })
      .then(() => onDelete(id))
      .catch((err) => console.log(err));
  };

  return (
    <li>
      <label htmlFor="todo">
        <input
          id="todo"
          type="checkbox"
          checked={isCompleted}
          onChange={handleToggle}
        />
        {editMode ? (
          <>
            <input
              type="text"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <button
              data-testid="submit-button"
              onClick={() => handleUpdate(editContent)}
            >
              제출
            </button>
            <button
              data-testid="cancel-button"
              onClick={() => setEditMode(false)}
            >
              취소
            </button>
          </>
        ) : (
          <>
            <span>{content}</span>
            <button
              data-testid="modify-button"
              onClick={() => setEditMode(true)}
            >
              수정
            </button>
          </>
        )}
      </label>
      <button data-testid="delete-button" onClick={handleDelete}>
        삭제
      </button>
    </li>
  );
}

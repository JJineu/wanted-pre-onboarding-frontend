import { useState } from "react";
import TodoAPI from "../api/todo";
import { Todo } from "../types/todo";

type Props = {
  todo: Todo;
  onToggle: (params: { id: number; complete: boolean }) => void;
  onUpdate: (params: { id: number; editContent: string }) => void;
  onDelete: (id: number) => void;
};
export default function TodoItem({
  todo,
  onToggle,
  onUpdate,
  onDelete,
}: Props) {
  const { id, todo: content, isCompleted } = todo;
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState<string>(content);

  const handleToggle = async () => {
    const updateContent: Todo = {
      id,
      todo: content,
      isCompleted: !isCompleted,
    };
    TodoAPI.updateTodo(updateContent)
      .then(() => onToggle({ id, complete: !isCompleted }))
      .catch((err) => console.log(err));
  };

  const handleUpdate = async (editContent: string) => {
    const updateContent: Todo = {
      id,
      todo: editContent,
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
    <div>
      <div>
        <input
          id={`checkbox-${id}`}
          type="checkbox"
          checked={isCompleted}
          onChange={handleToggle}
        />
        <label htmlFor={`checkbox-${id}`} />
      </div>
      <div>
        {editMode ? (
          <div>
            <input
              data-testid="modify-input"
              type="text"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div>
              <button
                data-testid="submit-button"
                onClick={(e) => {
                  e.preventDefault();
                  handleUpdate(editContent);
                  setEditMode(false);
                }}
              >
                제출
              </button>
              <button
                data-testid="cancel-button"
                onClick={(e) => {
                  e.preventDefault();
                  setEditContent(content);
                  setEditMode(false);
                }}
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div>{content}</div>
            <div>
              <button
                data-testid="modify-button"
                onClick={() => setEditMode(true)}
              >
                수정
              </button>
              <button data-testid="delete-button" onClick={handleDelete}>
                삭제
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
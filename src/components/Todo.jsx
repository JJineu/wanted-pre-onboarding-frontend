import { useState } from "react";
import TodoAPI from "../api/todo";
import styled from "@emotion/styled";

export default function Todo({ todo, onToggle, onUpdate, onDelete }) {
  const { id, todo: content, isCompleted, userId } = todo;
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const handleToggle = async () => {
    const updateContent = {
      id,
      todo: content,
      isCompleted: !isCompleted,
    };
    TodoAPI.updateTodo(updateContent)
      .then(() => onToggle({ id, complete: !isCompleted }))
      .catch((err) => console.log(err));
  };

  const handleUpdate = async () => {
    const updateContent = {
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
    <StyledTodo>
      <CheckBoxContainer>
        <input
          id={`checkbox-${id}`}
          type="checkbox"
          checked={isCompleted}
          onChange={handleToggle}
        />
        <label htmlFor={`checkbox-${id}`} />
      </CheckBoxContainer>
      <Content>
        {editMode ? (
          <EditMode>
            <StyledInput
              type="text"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <ButtonContainer>
              <Button
                data-testid="submit-button"
                onClick={(e) => {
                  e.preventDefault();
                  handleUpdate(editContent);
                  setEditMode(false);
                }}
              >
                제출
              </Button>
              <Button
                data-testid="cancel-button"
                onClick={(e) => {
                  e.preventDefault();
                  setEditContent(content);
                  setEditMode(false);
                }}
              >
                취소
              </Button>
            </ButtonContainer>
          </EditMode>
        ) : (
          <NormalMode>
            <TodoContent>{content}</TodoContent>
            <ButtonContainer>
              <Button
                data-testid="modify-button"
                onClick={() => setEditMode(true)}
              >
                수정
              </Button>
              <Button data-testid="delete-button" onClick={handleDelete}>
                삭제
              </Button>
            </ButtonContainer>
          </NormalMode>
        )}
      </Content>
    </StyledTodo>
  );
}

// Styled components
const StyledTodo = styled.li`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 10px;
`;

const CheckBoxContainer = styled.div`
  margin-right: 10px;
  position: relative;
  label {
    position: absolute;
    top: 0;
    left: 0;
    width: 18px;
    height: 18px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
  }
  input[type="checkbox"]:checked + label {
    background-color: #007bff;
    border: 1px solid #007bff;
  }
  input[type="checkbox"]:checked + label:after {
    content: "\u2713";
    font-size: 14px;
    color: #fff;
    position: absolute;
    top: 2px;
    left: 4px;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const EditMode = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  input[type="text"] {
    flex: 1;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
`;

const NormalMode = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const TodoContent = styled.span`
  flex-basis: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ButtonContainer = styled.div`
  flex-basis: 20%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 8px 12px;
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
  margin-left: 5px;
`;

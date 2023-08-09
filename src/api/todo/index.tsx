import API from "..";
import { Todo } from "../../types/todo";

const TodoAPI = {
  getTodos: async () => {
    try {
      const response = await API.get("/todos");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createTodo: async ({
    todo,
    isCompleted,
  }: {
    todo: string;
    isCompleted: boolean;
  }) => {
    try {
      const response = await API.post("/todos", {
        todo,
        isCompleted,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateTodo: async ({ id, todo, isCompleted }: Todo) => {
    try {
      const response = await API.put(`/todos/${id}`, {
        todo,
        isCompleted,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteTodo: async ({ id }: { id: number }) => {
    try {
      const response = await API.delete(`/todos/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
export default TodoAPI;

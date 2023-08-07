import API from "..";

const TodoAPI = {
  getTodos: async () => {
    try {
      const response = await API.get("/todos");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createTodo: async ({ todo, isCompleted }) => {
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
  updateTodo: async ({ id, todo, isCompleted }) => {
    try {
      console.log("Update Todo - ID:", id);
      console.log("Update Todo - Todo:", todo);
      console.log("Update Todo - isCompleted:", isCompleted);
      const response = await API.put(`/todos/${id}`, {
        todo,
        isCompleted,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteTodo: async ({ id }) => {
    try {
      const response = await API.delete(`/todos/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
export default TodoAPI;

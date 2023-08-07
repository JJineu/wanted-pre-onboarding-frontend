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
  createTodo: async ({ id, todo, isCompleted, userId }) => {
    try {
      const response = await API.post("/todos", {
        id,
        todo,
        isCompleted,
        userId,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // updateTodo: async () => {
  //   try {
  //     const response = await API.post("/todos", {
  //       id,
  //       todo,
  //       isCompleted,
  //       userId,
  //     });
  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  // deleteTodo: async () => {
  //   try {
  //     const response = await API.post("/todos", {
  //       id,
  //       todo,
  //       isCompleted,
  //       userId,
  //     });
  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // },
};
export default TodoAPI;

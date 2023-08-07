import API from "..";

const TodoAPI = {
  postTodos: async () => {
    try {
      return await API.post("/todos", {
        id: 1,
        todo: "과제하기",
        isCompleted: false,
        userId: 1,
      }).then((res) => console.log(res));
    } catch (error) {
      console.log(error);
    }
  },
};
export default TodoAPI;

import API from "..";

const AuthAPI = {
  signIn: async ({ email, password }) => {
    try {
      const response = await API.post("/auth/signin", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  signUp: async ({ email, password }) => {
    try {
      const response = await API.post("/auth/signup", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
export default AuthAPI;

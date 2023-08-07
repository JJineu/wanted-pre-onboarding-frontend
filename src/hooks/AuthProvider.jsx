import { createContext, useContext, useState } from "react";
import AuthAPI from "../api/auth";

export const authContext = createContext();
export const useAuth = () => useContext(authContext);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));

  const signup = ({ email, password }, callback) => {
    return AuthAPI.signUp({ email, password }).then(() => {
      if (callback) callback();
    });
  };

  const signin = ({ email, password }, callback) => {
    return AuthAPI.signIn({ email, password }).then((data) => {
      setToken(data.access_token);
      const id = email.split("@")[0];
      setUserId(id);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user_id", id);
      if (callback) callback();
    });
  };

  const signout = (callback) => {
    setToken("");
    setUserId("");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    if (callback) callback();
  };

  let value = { token, userId, signin, signup, signout };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthProvider;

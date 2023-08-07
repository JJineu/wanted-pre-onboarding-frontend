import { createContext, useContext, useState } from "react";
import AuthAPI from "../api/auth";

export const authContext = createContext();
export const useAuth = () => useContext(authContext);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  const signin = ({ email, password }, callback) => {
    return AuthAPI.signIn({ email, password }).then((data) => {
      setToken(data.access_token);
      localStorage.setItem("access_token", data.access_token);
      if (callback) callback();
    });
  };
  const signup = ({ email, password }, callback) => {
    return AuthAPI.signUp({ email, password }).then(() => {
      if (callback) callback();
    });
  };

  const signout = (callback) => {
    setToken("");
    localStorage.removeItem("access_token");
    if (callback) callback();
  };
  let value = { token, signin, signup, signout };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthProvider;

import { createContext, useContext, useState } from "react";
import AuthAPI from "../api/auth";
import { User } from "../types/user";

type AuthProviderProps = {
  token: string | null;
  userId: string | null;
  signin: ({ email, password }: User, callback?: () => void) => Promise<void>;
  signup: ({ email, password }: User, callback?: () => void) => Promise<void>;
  signout: (callback?: () => void) => void;
};

export const authContext = createContext<AuthProviderProps>(null!);
export const useAuth = () => useContext(authContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));

  const signup = ({ email, password }: User, callback?: () => void) => {
    return AuthAPI.signUp({ email, password }).then(() => {
      if (callback) callback();
    });
  };

  const signin = ({ email, password }: User, callback?: () => void) => {
    return AuthAPI.signIn({ email, password }).then((data) => {
      setToken(data.access_token);
      const id = email.split("@")[0];
      setUserId(id);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user_id", id);
      if (callback) callback();
    });
  };

  const signout = (callback?: () => void) => {
    setToken("");
    setUserId("");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    if (callback) callback();
  };

  let value: AuthProviderProps = { token, userId, signin, signup, signout };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthProvider;

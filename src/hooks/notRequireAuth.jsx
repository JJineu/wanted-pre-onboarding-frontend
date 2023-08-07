import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const NotRequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.token)
    return <Navigate to={"/todo"} state={{ from: location }} replace />;

  return children;
};

export default NotRequireAuth;

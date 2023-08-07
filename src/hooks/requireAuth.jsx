import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.token)
    return <Navigate to={"/signin"} state={{ from: location }} replace />;

  return children;
};

export default RequireAuth;

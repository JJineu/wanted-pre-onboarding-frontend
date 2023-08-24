import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.token)
    return <Navigate to={"/signin"} state={{ from: location }} replace />;

  return <>{children}</>;
};

export default RequireAuth;

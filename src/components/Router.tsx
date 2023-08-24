import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "../hooks/AuthProvider";
import NotRequireAuth from "../hooks/notRequireAuth";
import RequireAuth from "../hooks/requireAuth";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import NotFoundPage from "../pages/NotFoundPage";
import React from "react";
const TodoPage = React.lazy(() => import("../pages/TodoPage"));

const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/signup"
            element={
              <NotRequireAuth>
                <SignUpPage />
              </NotRequireAuth>
            }
          />
          <Route
            path="/signin"
            element={
              <NotRequireAuth>
                <SignInPage />
              </NotRequireAuth>
            }
          />
          <Route
            path="/todo"
            element={
              <RequireAuth>
                <React.Suspense fallback={<>...</>}>
                  <TodoPage />
                </React.Suspense>
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;

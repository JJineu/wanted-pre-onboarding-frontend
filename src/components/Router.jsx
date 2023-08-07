import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "../hooks/AuthProvider";
import NotRequireAuth from "../hooks/notRequireAuth";
import RequireAuth from "../hooks/requireAuth";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import TodoPage from "../pages/TodoPage";
import NotFoundPage from "../pages/NotFoundPage";

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
                <TodoPage />
              </RequireAuth>
            }
          />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;

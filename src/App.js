import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import TodoPage from "./pages/TodoPage";
import NotFoundPage from "./pages/NotFoundPage";
import RequireAuth from "./hooks/requireAuth";
import AuthProvider from "./hooks/AuthProvider";
import NotRequireAuth from "./hooks/notRequireAuth";

export default function App() {
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
}

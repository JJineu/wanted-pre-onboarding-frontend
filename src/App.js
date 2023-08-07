import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import TodoPage from "./pages/TodoPage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthProvider from "./components/AuthProvider";
import RequireAuth from "./hooks/requireAuth";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
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

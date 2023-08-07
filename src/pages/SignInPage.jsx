import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";
import { useState } from "react";

export default function SignInPage() {
  let navigate = useNavigate();
  const auth = useAuth();

  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const isValidate = ({ email, password }) => {
    if (!email) {
      alert("이메일이 입력되지 않았습니다.");
      return false;
    } else if (!email.includes("@")) {
      alert("이메일 형식이 아닙니다.");
      return false;
    }
    if (!password) {
      alert("비밀번호가 입력되지 않았습니다.");
      return false;
    } else if (password.length < 8) {
      alert("8자 이상의 패스워드를 사용해야 합니다.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = state;
    if (isValidate({ email, password })) {
      try {
        await auth.signin({ email, password });
        navigate("/todo");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label for="email">Email</label>
        <input
          data-testid="email-input"
          id="email"
          name="email"
          type="text"
          value={state.email}
          onChange={handleChange}
        />
        <label for="password">Password</label>
        <input
          data-testid="password-input"
          id="password"
          name="password"
          type="password"
          value={state.password}
          onChange={handleChange}
        />
        <button type="submit" data-testid="signin-button">
          로그인
        </button>
      </form>
    </div>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";

export default function SignUpPage() {
  const navigate = useNavigate();
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
      // TODO: input 밑에 error text 표시
      // alert("이메일이 입력되지 않았습니다.");
      return false;
    } else if (!email.includes("@")) {
      // alert("이메일 형식이 아닙니다.");
      return false;
    }
    if (!password) {
      // alert("비밀번호가 입력되지 않았습니다.");
      return false;
    } else if (password.length < 8) {
      // alert("8자 이상의 패스워드를 사용해야 합니다.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = state;
    if (isValidate({ email, password })) {
      try {
        await auth.signup({ email, password });
        navigate("/signin");
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
        <button
          data-testid="signup-button"
          onClick={handleSubmit}
          disabled={!isValidate(state)}
        >
          회원가입
        </button>
      </form>
      <Link to={"/signin"}>
        <button>로그인 창으로</button>
      </Link>
    </div>
  );
}

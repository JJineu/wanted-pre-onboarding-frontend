import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { Error, User } from "../types/user";

export default function SignUpPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [state, setState] = useState<User>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Error>({ email: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const isValidate = ({ email, password }: User) => {
    let errors: Error = { email: "", password: "" };

    if (!email) {
      errors.email = "Email is required";
    } else if (!email.includes("@")) {
      errors.email = `Email format is required (contain "@")`;
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password format is required (length >= 8)";
    }
    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = state;

    if (isValidate({ email, password })) {
      try {
        await auth.signin({ email, password });
        navigate("/todo", { replace: true });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const newErrors = isValidate(state);
    setErrors(newErrors);
  }, [state]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            data-testid="email-input"
            id="email"
            name="email"
            type="text"
            value={state.email}
            onChange={handleChange}
            autoComplete="username"
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            data-testid="password-input"
            id="password"
            name="password"
            type="password"
            value={state.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button
          data-testid="signin-button"
          onClick={handleSubmit}
          disabled={Object.keys(errors).some(
            (key) => errors[key as keyof Error] !== ""
          )}
        >
          로그인
        </button>
        <Link to={"/signup"}>
          <button>회원가입 창으로</button>
        </Link>
      </form>
    </div>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import styled from "@emotion/styled";
import { User, Error } from "../types/user";

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
        await auth.signup({ email, password });
        navigate("/signin");
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
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Label htmlFor="email">Email</Label>
          <Input
            data-testid="email-input"
            id="email"
            name="email"
            type="text"
            value={state.email}
            onChange={handleChange}
            autoComplete="username"
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
        </InputContainer>
        <InputContainer>
          <Label htmlFor="password">Password</Label>
          <Input
            data-testid="password-input"
            id="password"
            name="password"
            type="password"
            value={state.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          {errors.password && <ErrorText>{errors.password}</ErrorText>}
        </InputContainer>
        <Button
          data-testid="signup-button"
          onClick={handleSubmit}
          disabled={Object.keys(errors).some(
            (key) => errors[key as keyof Error] !== ""
          )}
        >
          회원가입
        </Button>

        <StyledLink to={"/signin"}>
          <Button>로그인 창으로</Button>
        </StyledLink>
      </Form>
    </Container>
  );
}

// Styled components
const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const ErrorText = styled.span`
  color: red;
  font-size: 12px;
`;

const Button = styled.button`
  width: 100%;
  padding: 8px 16px;
  background-color: ${({ disabled }) => (disabled ? "#d1d1d1" : "#007bff")};
  color: #fff;
  border: none;
  border-radius: 4px;
  outline: none;
  margin-top: 10px;
  cursor: ${({ disabled }) => (disabled ? "" : "pointer")};
  transition: background-color 0.3s;
  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#d1d1d1" : "#0056b3")};
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

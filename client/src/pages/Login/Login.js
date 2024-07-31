import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import Input from "../../components/Input";
import useLogin from "./useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isNotFound, login } = useLogin();
  const navigate = useNavigate();

  return (
    <AuthLayout
      title="Sign In"
      buttonText="Login"
      onButtonClick={() => login(username, password, navigate)}
      linkTo="/register"
      linkText="Register"
      errorMessage={
        isNotFound ? "User not found with such login and password" : ""
      }
    >
      <Input
        type="text"
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <Input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </AuthLayout>
  );
};

export default Login;

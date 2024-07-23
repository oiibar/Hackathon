import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRegister from "../hooks/useRegister";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isAlreadyExists, isRegistered, isEmpty, register } = useRegister();
  const navigate = useNavigate();

  return (
    <AuthLayout
      title="Sign Up"
      buttonText="Register"
      onButtonClick={() => register(username, password, navigate)}
      linkTo="/login"
      linkText="Login"
      errorMessage={
        isAlreadyExists
          ? "This user already exists"
          : isEmpty
          ? "Fields must not be empty"
          : isRegistered
          ? "You have been successfully registered, redirecting to tasks page..."
          : ""
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

export default Register;

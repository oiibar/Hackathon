// src/hooks/useAuth.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../../api/api";

const useAuth = (initialMode = "login") => {
  const [mode, setMode] = useState(initialMode);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAuth = async () => {
    if (!username.trim() || !password.trim()) {
      setError("Fields must not be empty");
      return;
    }
    setError("");
    try {
      let response;
      if (mode === "login") {
        response = await loginUser(username.trim(), password.trim());
        if (response.data === "You probably don't have an account.") {
          setError("User not found");
          toast.error("User not found");
          return;
        }
        toast.success("Login successful");
        window.localStorage.setItem("userId", response.data);
        navigate("/tasks");
      } else {
        response = await registerUser(username.trim(), password.trim());
        if (response.data === "You already have an account") {
          setError("This user already exists");
          toast.error("This user already exists");
          return;
        }
        toast.success("Registration successful, redirecting to tasks...");
        window.localStorage.setItem("userId", response.data.id);
        navigate("/tasks");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    mode,
    setMode,
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleAuth,
  };
};

export default useAuth;

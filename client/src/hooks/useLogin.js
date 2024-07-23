// src/hooks/useLogin.js
import { useState } from "react";
import { loginUser } from "../api/api";

const useLogin = () => {
  const [isNotFound, setIsNotFound] = useState(false);

  const login = async (username, password, navigate) => {
    setIsNotFound(false);
    try {
      const response = await loginUser(username, password);
      if (response.data === "You probably don't have an account.") {
        setIsNotFound(true);
        return;
      }
      window.localStorage.setItem("userId", response.data);
      navigate("../tasks");
    } catch (error) {
      console.error(error);
    }
  };

  return { isNotFound, login };
};

export default useLogin;

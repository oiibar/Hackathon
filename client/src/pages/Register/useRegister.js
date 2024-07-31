// src/hooks/useRegister.js
import { useState } from "react";
import { registerUser } from "../../api/api";

const useRegister = () => {
  const [isAlreadyExists, setIsAlreadyExists] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const register = async (username, password, navigate) => {
    if (isRegistered) return;
    if (!username.trim() || !password.trim()) return setIsEmpty(true);
    setIsAlreadyExists(false);
    setIsEmpty(false);
    try {
      const response = await registerUser(username.trim(), password.trim());
      if (response.data === "You already have an account") {
        setIsAlreadyExists(true);
        return;
      }
      window.localStorage.setItem("userId", response.data.id);
      setIsRegistered(true);
      navigate("../tasks");
    } catch (error) {
      console.error(error);
    }
  };

  return { isAlreadyExists, isRegistered, isEmpty, register };
};

export default useRegister;

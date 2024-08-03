import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import useAuth from "./useAuth";

const Auth = () => {
  const {
    mode,
    setMode,
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleAuth,
  } = useAuth();

  return (
    <div className="layout">
      <h1 className="title">{mode === "login" ? "Sign In" : "Sign Up"}</h1>
      <div className="flex flex-col gap-2 mb-8">
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
      </div>
      <div className="flex flex-col gap-2">
        <Button onClick={handleAuth} className="button">
          {mode === "login" ? "Login" : "Register"}
        </Button>
        <div className="flex">
          <p>
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
          </p>
          <p
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="text-blue-900 hover:text-blue-500 font-medium cursor-pointer"
          >
            {mode === "login" ? "Register" : "Login"}
          </p>
        </div>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Auth;

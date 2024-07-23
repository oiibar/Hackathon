// src/components/Input.jsx
import React from "react";

const Input = ({
  type = "text",
  value,
  placeholder,
  onChange,
  required = false,
}) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      className="input"
    />
  );
};

export default Input;

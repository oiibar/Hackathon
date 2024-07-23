import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { Link } from "react-router-dom";

const AuthLayout = ({
  title,
  buttonText,
  onButtonClick,
  linkTo,
  linkText,
  errorMessage,
  children,
}) => {
  return (
    <div className="layout">
      <h1 className="title">{title}</h1>
      <div className="flex flex-col gap-2 mb-8">{children}</div>
      <div className="flex flex-col gap-2">
        <Button onClick={onButtonClick} className="button">
          {buttonText}
        </Button>
        <div className="flex">
          <p>Already have an account? </p>
          <Link
            to={linkTo}
            className="text-blue-900 hover:text-blue-500 font-medium"
          >
            {linkText}
          </Link>
        </div>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

AuthLayout.propTypes = {
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  linkTo: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default AuthLayout;

import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${className} ${loading ? "loading" : ""}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;

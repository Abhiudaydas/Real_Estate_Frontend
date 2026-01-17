import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, getMe } from "../../api/auth.api";
import { useAuthContext } from "../../context/AuthContext";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await loginUser(formData);
      const response = await getMe();
      const userData = response.data;
      setUser(userData);

      if (userData.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-container">
          <div className="login-card">
            <h1>Welcome Back</h1>
            <p className="subtitle">Login to your PlotNest account</p>

            <form onSubmit={handleSubmit}>
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />

              {error && <div className="error-message">{error}</div>}

              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="btn-block"
              >
                Login
              </Button>
            </form>

            <p className="login-footer">
              Don't have an account? <a href="/register">Register here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

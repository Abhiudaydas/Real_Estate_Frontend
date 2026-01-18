import React, { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../api/auth.api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        console.log("[AuthContext] Loading user...");
        const res = await getMe();
        console.log("[AuthContext] User loaded:", res.data);
        setUser(res.data);
      } catch (error) {
        console.log(
          "[AuthContext] No user session or error:",
          error.response?.status,
        );
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};

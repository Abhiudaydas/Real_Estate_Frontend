import { useAuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { user, loading } = useAuthContext();

  return {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "ADMIN",
    isUser: user?.role === "USER",
  };
};

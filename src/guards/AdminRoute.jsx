import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const AdminRoute = () => {
  const { user, loading } = useAuthContext();

  if (loading) return <p>Loading...</p>;

  return user && user.role === "ADMIN" ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default AdminRoute;

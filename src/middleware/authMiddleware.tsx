import { Navigate, Outlet } from "react-router-dom";

export default function AuthMiddleware() {
  const token = localStorage.getItem("bareer_token");

  if (!token) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
}

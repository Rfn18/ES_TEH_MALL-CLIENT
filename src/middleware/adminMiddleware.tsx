import { Navigate, Outlet } from "react-router-dom";

export default function AdminMiddleware() {
  const user = localStorage.getItem("user");

  if (!user || user !== "admin") {
    return <Navigate to={"/401"} />;
  }

  return <Outlet />;
}

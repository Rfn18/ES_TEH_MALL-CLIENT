import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Login } from "./page/auth/login";
import "./App.css";
import { Register } from "./page/auth/register";
import { Dashboard } from "./page/admin/dashboard";
import { UserDashboard } from "./page/kasir/dashboard";
import NotFound from "./page/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;

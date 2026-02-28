import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Login } from "./page/login";
import "./App.css";
import { Register } from "./page/register";
import { Dashboard } from "./page/admin/dashboard";
import { UserDashboard } from "./page/dashboard";
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

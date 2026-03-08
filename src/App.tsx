import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./page/auth/login";
import "./App.css";
import { Register } from "./page/auth/register";
import { Dashboard } from "./page/admin/dashboard";
import { UserDashboard } from "./page/kasir/dashboard";
import NotFound from "./page/NotFound";
import { Management } from "./page/admin/management";
import HistoryList from "./page/kasir/history";
import Profile from "./page/profile";
import Setting from "./page/setting";
import AuthMiddleware from "./middleware/authMiddleware";
import AdminMiddleware from "./middleware/adminMiddleware";
import Unatuhorized from "./page/unauthorized";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/401" element={<Unatuhorized />} />
      <Route element={<AuthMiddleware />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/history" element={<HistoryList />} />
        <Route element={<AdminMiddleware />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/management" element={<Management />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;

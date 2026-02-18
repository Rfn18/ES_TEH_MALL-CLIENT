import { BrowserRouter, Routes, Route } from "react-router";
import { Login } from "./page/login";
import "./App.css";
import { Register } from "./page/register";
import { Dashboard } from "./page/admin/dashboard";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
);

export default App;

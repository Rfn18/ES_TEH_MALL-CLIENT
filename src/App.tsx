import { BrowserRouter, Routes, Route } from "react-router";
import { Login } from "./page/login";
import "./App.css";
import { Register } from "./page/register";
import { Dashboard } from "./page/dashboard";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </BrowserRouter>
);

export default App;

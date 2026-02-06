import { BrowserRouter, Routes, Route } from "react-router";
import { Login } from "./page/login";
import "./App.css";
import { Register } from "./page/register";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </BrowserRouter>
);

export default App;

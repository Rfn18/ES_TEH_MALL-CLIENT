import { AuthCard } from "../components/auth/AuthCard";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export const Register = () => {
  const [showPw1, setShowPw1] = useState<Boolean>(false);
  const [showPw2, setShowPw2] = useState<Boolean>(false);

  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(JSON.stringify(data));
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("error fetching data");
      }

      const result = await response.json();
      console.log("Success", result);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthCard>
      <div className="w-full flex flex-col items-center gap-2">
        <h1 className="text-xl font-semibold">Create New Account</h1>
        <p className="text-sm opacity-70">Join TehMallPos to get started</p>
      </div>
      <div className="flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 my-4">
          <label htmlFor="username" className="text-sm font-semibold">
            Username
          </label>
          <div className="flex items-center bg-[#f9fafb] w-full h-12 mb-2 border border-[#ddd] rounded-xl">
            <User size="20" className="m-3 opacity-70" />
            <input
              type="text"
              name="username"
              placeholder="Enter Your Full Name"
              className="w-full h-full text-sm outline-none"
              onChange={handleChange}
            />
          </div>
          <label htmlFor="password" className="text-sm font-semibold">
            Password
          </label>
          <div className="flex items-center bg-[#f9fafb] w-full h-12 mb-2 border border-[#ddd] rounded-xl">
            <Lock size="20" className="m-3 opacity-70" />
            <input
              type={showPw1 ? "text" : "password"}
              name="password"
              placeholder="Create Your password"
              className="w-full h-full text-sm outline-none"
              onChange={handleChange}
            />
            {showPw1 ? (
              <EyeOff
                size="20"
                className="m-3 opacity-70 hover:opacity-100 cursor-pointer"
                onClick={() => setShowPw1(!showPw1)}
              />
            ) : (
              <Eye
                size="20"
                className="m-3 opacity-70 hover:opacity-100  cursor-pointer"
                onClick={() => setShowPw1(!showPw1)}
              />
            )}
          </div>
          <label
            htmlFor="password_confirmation"
            className="text-sm font-semibold"
          >
            Confirm Password
          </label>
          <div className="flex items-center bg-[#f9fafb] w-full h-12 mb-2 border border-[#ddd] rounded-xl">
            <Lock size="20" className="m-3 opacity-70" />
            <input
              type={showPw2 ? "text" : "password"}
              name="password_confirmation"
              placeholder="Confirm Your password"
              className="w-full h-full text-sm outline-none"
              onChange={handleChange}
            />
            {showPw2 ? (
              <EyeOff
                size="20"
                className="m-3 opacity-70 hover:opacity-100 cursor-pointer"
                onClick={() => setShowPw2(!showPw2)}
              />
            ) : (
              <Eye
                size="20"
                className="m-3 opacity-70 hover:opacity-100  cursor-pointer"
                onClick={() => setShowPw2(!showPw2)}
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full h-12 auth-gradient rounded-xl text-white font-bold "
          >
            Register
          </button>
        </form>
        <p className="mt-2 self-center text-sm opacity-70">
          Already have an account?{" "}
          <Link to={"/login"} className="font-bold">
            Login
          </Link>
        </p>
      </div>
    </AuthCard>
  );
};

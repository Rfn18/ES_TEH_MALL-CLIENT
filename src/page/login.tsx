import { Eye, EyeClosed, Lock, User } from "lucide-react";
import { AuthCard } from "../components/auth/AuthCard";
import { Link } from "react-router";
import { useState } from "react";

export const Login = () => {
  const [showPw, setShowPw] = useState<boolean>(false);
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("failed to fething data");
      }

      const result = await response.json();
      console.log(result.access_token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthCard>
      <div className="w-full flex flex-col items-center gap-2">
        <h1 className="text-xl font-semibold">Login To Your Account</h1>
        <p className="text-sm opacity-70">Enter your credentials to continue</p>
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
              placeholder="Enter Your Email"
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
              type={showPw ? "text" : "password"}
              name="password"
              placeholder="Enter Your password"
              className="w-full h-full text-sm outline-none"
              onChange={handleChange}
            />
            {showPw ? (
              <EyeClosed
                size="20"
                className="m-3 opacity-70 cursor-pointer"
                onClick={() => setShowPw(!showPw)}
              />
            ) : (
              <Eye
                size="20"
                className="m-3 opacity-70 cursor-pointer"
                onClick={() => setShowPw(!showPw)}
              />
            )}
          </div>
          <button className="w-full h-12 auth-gradient rounded-xl text-white font-bold ">
            Login
          </button>
        </form>
        <p className="mt-2 self-center text-sm opacity-70">
          Don't have an account?{" "}
          <Link to={"/register"} className="font-bold">
            Register
          </Link>
        </p>
      </div>
    </AuthCard>
  );
};

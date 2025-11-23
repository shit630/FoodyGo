import React from "react";
import { useState } from "react";
import axios from "axios";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { serverUrl } from "../App";

const SignIn = () => {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassWord, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSingIn = async () => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border`}
        style={{ borderColor: borderColor }}
      >
        <h1
          className={`text-3xl font-bold mb-2`}
          style={{ color: primaryColor }}
        >
          FoodyGo
        </h1>
        <p className="text-gray-600 mb-8">
          Signin your account to get started with delicious food deliveries
        </p>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email:{" "}
          </label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 p-2 focus:outline-none"
            placeholder="Enter Your Email"
            style={{ border: `1px solid${borderColor}` }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* password */}
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password:{" "}
          </label>
          <div className="relative">
            <input
              type={`${showPassWord ? "text" : "password"}`}
              className="w-full border rounded-lg px-3 p-2 focus:outline-none"
              placeholder="Enter Your Password"
              style={{ border: `1px solid${borderColor}` }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="absolute right-3 top-[13px] text-gray-500 cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassWord ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>

        <div className="text-right mb-4 cursor-pointer text-[#ff4d2d] font-medium hover:text-[#e64323]">
          <Link to="/forgotpassword">Forgot Password</Link>
        </div>

        <button
          onClick={handleSingIn}
          className={`w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer bg-[#ff4d2d] text-white hover:bg-[#e64323]`}
        >
          Sign In
        </button>
        <button className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100">
          <FcGoogle size={20} />
          <span>Sign in with Google</span>
        </button>
        <p className="text-center mt-4">
          Want to create a new account?{" "}
          <Link to="/signup">
            <span className={`text-[#ff4d2d] cursor-pointer`}>Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

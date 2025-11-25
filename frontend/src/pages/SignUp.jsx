import React from "react";
import { useState } from "react";
import axios from "axios";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const SignUp = () => {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassWord, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSingUp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { fullName, email, password, role, mobile },
        { withCredentials: true }
      );
      dispatch(setUserData(res.data));
      setError("");
      setLoading(false);
    } catch (error) {
      setError(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleGoogleAutth = async () => {
    setLoading(true);
    try {
      if (!mobile) {
        setError("Mobile number is required");
        setLoading(false);
        return;
      }
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const res = await axios.post(
        `${serverUrl}/api/auth/googleAuth`,
        {
          fullName: result.user.displayName,
          email: result.user.email,
          role,
          mobile,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(res.data));
      setError("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
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
          Create your account to get started with delicious food deliveries
        </p>

        {/* Fullname */}
        <div className="mb-4">
          <label
            htmlFor="fullname"
            className="block text-gray-700 font-medium mb-1"
          >
            Full Name:{" "}
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 p-2 focus:outline-none"
            placeholder="Enter Your Full Name"
            style={{ border: `1px solid${borderColor}` }}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

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
            required
          />
        </div>

        {/* mobile */}
        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-gray-700 font-medium mb-1"
          >
            Mobile No.:{" "}
          </label>
          <input
            type="number"
            className="w-full border rounded-lg px-3 p-2 focus:outline-none"
            placeholder="Enter Your Mobile Number"
            style={{ border: `1px solid${borderColor}` }}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>

        {/* password */}
        <div className="mb-4">
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
              required
            />
            <button
              className="absolute right-3 top-[13px] text-gray-500 cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassWord ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>

        {/* Role */}
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-1"
          >
            Role:{" "}
          </label>
          <div className="flex gap-2">
            {["user", "owner", "deliveryBoy"].map((r, i) => (
              <button
                className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer"
                key={i}
                onClick={() => setRole(r)}
                style={
                  role == r
                    ? { backgroundColor: primaryColor, color: "white" }
                    : {
                        border: `1px solid ${primaryColor}`,
                        color: primaryColor,
                      }
                }
              >
                {r == "user" ? "User" : r == "owner" ? "Owner" : "Delivery Boy"}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleSingUp}
          className={`w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer bg-[#ff4d2d] text-white hover:bg-[#e64323]`}
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color="white" /> : "Sign Up"}
        </button>
        {error ? (
          <p className="text-red-500 text-center my-2">
            {error ? <span>*{error}</span> : ""}
          </p>
        ) : (
          ""
        )}

        <button
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100 cursor-pointer"
          onClick={handleGoogleAutth}
        >
          <FcGoogle size={20} />
          <span>Sign up with Google</span>
        </button>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/signin">
            <span className={`text-[#ff4d2d] cursor-pointer`}>Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

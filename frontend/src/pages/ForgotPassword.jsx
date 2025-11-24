import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/sendOtp`,
        {
          email,
        },
        { withCredentials: true }
      );
      setStep(2);
      setError("");
      setLoading(false);
    } catch (error) {
      setError(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/verifyOtp`,
        {
          email,
          otp,
        },
        { withCredentials: true }
      );
      setStep(3);
      setError("");
      setLoading(false);
    } catch (error) {
      setError(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      if (newPassword !== confirmPassword) {
        alert("Both password must be match");
        return;
      }
      const res = await axios.post(
        `${serverUrl}/api/auth/resetPassword`,
        {
          email,
          newPassword,
        },
        { withCredentials: true }
      );
      setError("");
      setLoading(false);
      navigate("/signin");
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white w-full rounded-xl shadow-lg max-w-md p-8">
        <div className="flex items-center gap-4 mb-4">
          <MdOutlineKeyboardBackspace
            onClick={() => navigate(-1)}
            size={30}
            className="text-[#ff4d2d] cursor-pointer hover:text-[#e64323]"
          />
          <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>
        {step == 1 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email:{" "}
              </label>
              <input
                type="email"
                className="w-full border border-gray-200 rounded-lg px-3 p-2 focus:outline-none border]"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {error ? (
              <p className="text-red-500 text-center my-2">
                {error ? <span>*{error}</span> : ""}
              </p>
            ) : (
              ""
            )}
            <button
              onClick={handleSendOtp}
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer bg-[#ff4d2d] text-white hover:bg-[#e64323]`}
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} /> : "Send OTP"}
            </button>
          </div>
        )}

        {step == 2 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="otp"
                className="block text-gray-700 font-medium mb-1"
              >
                OTP:
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-lg px-3 p-2 focus:outline-none border]"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            {error ? (
              <p className="text-red-500 text-center my-2">
                {error ? <span>*{error}</span> : ""}
              </p>
            ) : (
              ""
            )}
            <button
              onClick={handleVerifyOtp}
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer bg-[#ff4d2d] text-white hover:bg-[#e64323]`}
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} /> : "Verify"}
            </button>
          </div>
        )}

        {step == 3 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                New Password:
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-lg px-3 p-2 focus:outline-none border]"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                Confirm Password:
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-lg px-3 p-2 focus:outline-none border]"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error ? (
              <p className="text-red-500 text-center my-2">
                {error ? <span>*{error}</span> : ""}
              </p>
            ) : (
              ""
            )}
            <button
              onClick={handleResetPassword}
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer bg-[#ff4d2d] text-white hover:bg-[#e64323]`}
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} /> : "Reset Password"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

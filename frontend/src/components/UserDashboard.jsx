import axios from "axios";
import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearchSharp, IoCartOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { userData, city } = useSelector((state) => state.user);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      // navigate("/signin");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full h-20 flex items-center justify-between md:justify-center gap-[30px] px-5 fixed top-0 z-9999 bg-[#fff9f6]">
      {showSearch && (
        <div className="w-[90%] h-[70px] fixed bg-white shadow-xl rounded-lg items-center flex gap-5 top-20 md:hidden">
          <div className="flex items-center w-[30%] overflow-hidden gap-2.5 px-2.5 border-r-2 border-gray-400">
            <FaLocationDot size={25} className="text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600">{city}</div>
          </div>
          <div className="w-[80%] flex items-center gap-2.5">
            <IoSearchSharp size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="Search delicious food"
              className="px-2.5 text-gray-700 outline-0 w-full"
            />
          </div>
        </div>
      )}
      <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">FoodyGo</h1>
      <div className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center hidden md:flex  gap-5">
        <div className="flex items-center w-[30%] overflow-hidden gap-2.5 px-2.5 border-r-2 border-gray-400">
          <FaLocationDot size={25} className="text-[#ff4d2d]" />
          <div className="w-[80%] truncate text-gray-600">{city}</div>
        </div>
        <div className="w-[80%] flex items-center gap-2.5">
          <IoSearchSharp size={25} className="text-[#ff4d2d]" />
          <input
            type="text"
            placeholder="Search delicious food"
            className="px-2.5 text-gray-700 outline-0 w-full"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        {!showSearch ? (
          <IoSearchSharp
            size={25}
            className="text-[#ff4d2d] md:hidden cursor-pointer hover:text-[#e64323]"
            onClick={() => setShowSearch(true)}
          />
        ) : (
          <RxCross2
            size={25}
            className="text-[#ff4d2d] md:hidden cursor-pointer hover:text-[#e64323]"
            onClick={() => setShowSearch(false)}
          />
        )}

        <div className="relative cursor-pointer">
          <IoCartOutline
            size={25}
            className="text-[#ff4d2d] hover:text-[#e64323]"
          />
          <span className="absolute right-[-9px] -top-3 text-[#ff4d2d] hover:text-[#e64323]">
            0
          </span>
        </div>
        <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium cursor-pointer hover:text-[#e64323]">
          My Orders
        </button>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl cursor-pointer hover:bg-[#e64323]"
          onClick={() => setShowInfo((prev) => !prev)}
        >
          {userData.fullName.slice(0, 1)}
        </div>
        {showInfo && (
          <div className="fixed top-20 right-2.5 md:right-[10%] lg:right-[25%] w-[180px] bg-white shadow-2xl rounded-xl p-5 flex flex-col gap-2.5 z-9999">
            <div className="text-[17px] font-semibold">{userData.fullName}</div>
            <div className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer hover:text-[#e64323]">
              My Orders
            </div>
            <div
              className="text-[#ff4d2d] font-semibold cursor-pointer flex items-center gap-1 hover:text-[#e64323]"
              onClick={handleLogout}
            >
              Log Out
              <IoLogOutOutline />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

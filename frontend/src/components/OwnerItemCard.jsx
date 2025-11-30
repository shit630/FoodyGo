import axios from "axios";
import React from "react";
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setMyShopData } from "../redux/ownerSlice";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const OwnerItemCard = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleDeleteItem = async (itemId) => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `${serverUrl}/api/item/deleteItem/${itemId}`,
        { withCredentials: true }
      );
      dispatch(setMyShopData(res.data));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden border border-[#ff4d2d] w-full max-w-2xl mb-4">
      <div className="w-36 shrink-0 bg-gray-50">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-between p-3 flex-1">
        <div>
          <h2 className="text-base font-semibold text-[#ff4d3d]">
            {data.name}
          </h2>
          <p className="">
            {" "}
            <span className="font-medium text-gray-70">Category:</span>{" "}
            {data.category}
          </p>
          <p>
            <span className="font-medium text-gray-70">Food Type: </span>{" "}
            {data.foodType}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#ff4d2d] font-bold flex items-center">
            <FaRupeeSign size={10} />
            {data.price}
          </div>
          <div className="flex items-center gap-2">
            <div
              className="p-2 rounded-full hover:bg-[#ff4d2d]/10 text-[#ff4d2d] cursor-pointer"
              onClick={() => navigate(`/editFoodItem/${data._id}`)}
            >
              <FaPen size={16} />
            </div>
            <div
              className="p-2 rounded-full hover:bg-[#ff4d2d]/10 text-[#ff4d2d] cursor-pointer"
              onClick={() => handleDeleteItem(data._id)}
            >
              {loading ? (
                <ClipLoader size={16} color="#ff4d2d" />
              ) : (
                <FaTrashAlt size={16} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerItemCard;

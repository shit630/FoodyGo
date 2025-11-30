import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setMyShopData } from "../redux/ownerSlice";

const useGetMyShop = () => {
  const dispatch = useDispatch();
  const fetchShop = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/shop/getMyShop`);
      console.log(res.data);
      dispatch(setMyShopData(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchShop();
  }, []);
  return <div>useGetMyShop</div>;
};

export default useGetMyShop;

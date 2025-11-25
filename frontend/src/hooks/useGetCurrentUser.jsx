import axios from "axios";
import React, { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/user/currentUser`, {
        withCredentials: true,
      });
      dispatch(setUserData(res.data));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
};

export default useGetCurrentUser;

import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddress, setCity, setState } from "../redux/userSlice";

const useGetCity = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const apiKey = import.meta.env.VITE_GEOAPIKEY;
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const res = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
      );
      dispatch(setCity(res?.data?.results[0].city));
      dispatch(setState(res?.data?.results[0].state));
      dispatch(
        setAddress(
          res?.data?.results[0].address_line1 ||
            res?.data?.results[0].address_line2
        )
      );
    });
  }, [userData]);
  return <div>useGetCity</div>;
};

export default useGetCity;

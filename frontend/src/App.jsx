import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import useGetCity from "./hooks/useGetCity";
import CreateAndEditShop from "./pages/CreateAndEditShop";
import AddFoodItems from "./pages/AddFoodItems";
import EditFoodItems from "./pages/EditFoodItem";

export const serverUrl = "http://localhost:8000";

function App() {
  const { userData } = useSelector((state) => state.user);
  useGetCurrentUser();
  useGetCity();
  // console.log(userData);
  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signin"
          element={!userData ? <SignIn /> : <Navigate to={"/"} />}
        />
        <Route
          path="/forgotPassword"
          element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
        />
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to={"/signIn"} />}
        />
        <Route
          path="/createShop"
          element={
            userData ? <CreateAndEditShop /> : <Navigate to={"/signIn"} />
          }
        />
        <Route
          path="/addFoodItem"
          element={userData ? <AddFoodItems /> : <Navigate to={"/signIn"} />}
        />
        <Route
          path="/editFoodItem/:itemId"
          element={userData ? <EditFoodItems /> : <Navigate to={"/signIn"} />}
        />
      </Routes>
    </>
  );
}

export default App;

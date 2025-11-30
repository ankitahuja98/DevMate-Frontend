import React from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store/store";
import { logout } from "../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";

const index = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div>
      Feed
      <button
        className="border border-2 p-1 m-3 bg-gray-200 cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default index;

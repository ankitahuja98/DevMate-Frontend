import React from "react";
// import DevMateLogo from "../../Images/devmateLogo.png";
import { useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";

const MobileTopbar = () => {
  const location = useLocation();

  return (
    <div className="MobileTopbarContainer">
      {/* <img className="AppLogo" src={DevMateLogo} alt="DevMate" /> */}
      {location.pathname === "/profile" && (
        <div className="w-full flex items-center justify-between">
          <p className="text-3xl font-bold">Profile</p>
          <SettingsIcon />
        </div>
      )}

      {location.pathname === "/discover" && (
        <p className="text-3xl font-bold">Discover</p>
      )}

      {location.pathname === "/" && (
        <p className="text-3xl font-bold">Devmate</p>
      )}

      {location.pathname === "/likedyou" && (
        <p className="text-3xl font-bold">Liked You</p>
      )}

      {location.pathname === "/chats" && (
        <div className="w-full flex items-center justify-between">
          <p className="text-3xl font-bold">Chats</p>
          <SearchIcon style={{ fontSize: "30px" }} />
        </div>
      )}
    </div>
  );
};

export default MobileTopbar;

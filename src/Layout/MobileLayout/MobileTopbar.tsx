// import DevMateLogo from "../../Images/devmateLogo.png";
import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";

const MobileTopbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="MobileTopbarContainer">
      {/* <img className="AppLogo" src={DevMateLogo} alt="DevMate" /> */}
      {location.pathname === "/profile" && (
        <div className="w-full flex items-center justify-between">
          <p className="text-3xl font-bold">Profile</p>
          <SettingsIcon
            sx={{ fontSize: "25px", margin: "0px 7px", cursor: "pointer" }}
            onClick={() => navigate("/setting")}
          />
        </div>
      )}

      {location.pathname === "/premium" && (
        <p className="text-3xl font-bold">Go Premium</p>
      )}

      {location.pathname === "/explore" && (
        <p className="text-3xl font-bold">Devmate</p>
      )}

      {location.pathname === "/likedyou" && (
        <p className="text-3xl font-bold">Liked You</p>
      )}

      {location.pathname === "/setting" && (
        <p className="text-3xl font-bold">Settings</p>
      )}

      {location.pathname === "/matches" && (
        <div className="w-full flex items-center justify-between">
          <p className="text-3xl font-bold">Chats</p>
          <SearchIcon style={{ fontSize: "30px" }} />
        </div>
      )}
    </div>
  );
};

export default MobileTopbar;

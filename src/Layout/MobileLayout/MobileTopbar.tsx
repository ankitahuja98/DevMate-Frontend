import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Button } from "@mui/material";
import DevMateLogo from "../../Images/devmateLogo.avif";

const useStyle = {
  iconStyle: {
    cursor: "pointer",
    fontSize: "25px",
    color: "black",
  },
};
const MobileTopbar = ({
  NotificationIsOpen,
  setNotificationIsOpen,
}: {
  NotificationIsOpen: boolean;
  setNotificationIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNotification = () => {
    setNotificationIsOpen((prev) => !prev);
  };
  let publicRoutes = [
    "/about",
    "/founder",
    "/contact",
    "/pricing",
    "/features",
    "/privacy-policy",
    "/terms",
    "/refund-policy",
  ];

  let ispublicRoutes = publicRoutes.includes(location.pathname);

  return (
    <div className="MobileTopbarContainer">
      {/* <img className="AppLogo" src={DevMateLogo} alt="DevMate" /> */}
      {location.pathname === "/profile" && (
        <div className="w-full flex items-center justify-between">
          <p className="text-3xl font-bold">Profile</p>
          <div>
            <Button onClick={() => navigate("/setting")}>
              <SettingsIcon style={useStyle.iconStyle} />
            </Button>
            <Button onClick={handleNotification}>
              {!NotificationIsOpen ? (
                <NotificationsIcon style={useStyle.iconStyle} />
              ) : (
                <NotificationsActiveIcon style={useStyle.iconStyle} />
              )}
            </Button>
          </div>
        </div>
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

      {location.pathname === "/premium" && (
        <p className="text-3xl font-bold">Go Premium</p>
      )}

      {/* Public routes */}
      {ispublicRoutes && (
        <img
          className="ml-0 md:ml-5 h-10 md:h-12"
          src={DevMateLogo}
          alt="DevMate"
        />
      )}
    </div>
  );
};

export default MobileTopbar;

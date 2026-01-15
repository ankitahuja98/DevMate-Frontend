import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import LogoutIcon from "@mui/icons-material/Logout";
import { type RefObject } from "react";
import TooltipWrapper from "../../utils/TooltipWrapper";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector, type AppDispatch } from "../../redux/store/store";
import { logout } from "../../redux/actions/authAction";
import "../../CSS/Topbar.css";
import DevMateLogoWhite from "../../Images/devmateLogo-white.png";
import { useFullscreen } from "../../context/FullscreenContext";

const useStyle = {
  barStyle: {
    backgroundColor: "#003f88",
    height: "60px",
    display: "flex",
    alignItems: "center",
    borderRadius: "22px",
    margin: "10px 10px 0px 10px",
    boxShadow: "rgb(45 45 45 / 85%) 1px 3px 5px",
  },
  iconStyle: {
    cursor: "pointer",
    fontSize: "25px",
    color: "white",
  },
  logoStyle: {
    height: "40px",
    margin: "2px 2px 2px 25px",
  },
};

const TopBar = ({
  NotificationIsOpen,
  setNotificationIsOpen,
  editorRef,
}: {
  NotificationIsOpen: boolean;
  editorRef?: RefObject<HTMLDivElement | null>;
  setNotificationIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  //   const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleNotification = () => {
    setNotificationIsOpen((prev) => !prev);
  };

  const userProfile = useAppSelector(
    (store) => store.profile.userProfile.userProfileData
  );

  return (
    <div style={useStyle.barStyle}>
      <div>
        <img src={DevMateLogoWhite} alt="DevMate" style={useStyle.logoStyle} />
      </div>
      <div className="text-white w-full">
        <div className="p-3 float-right flex items-center">
          <TooltipWrapper
            title="Notification"
            arrow
            PopperProps={{
              container: editorRef?.current || undefined,
            }}
          >
            <Button onClick={handleNotification}>
              {!NotificationIsOpen ? (
                <NotificationsIcon style={useStyle.iconStyle} />
              ) : (
                <NotificationsActiveIcon style={useStyle.iconStyle} />
              )}
            </Button>
          </TooltipWrapper>
          <TooltipWrapper
            title={isFullscreen ? "Exit Full screen" : "Full screen"}
            arrow
            PopperProps={{
              container: editorRef?.current || undefined,
            }}
          >
            <Button type="button" onClick={toggleFullscreen}>
              {isFullscreen ? (
                <FullscreenExitIcon style={useStyle.iconStyle} />
              ) : (
                <FullscreenIcon style={useStyle.iconStyle} />
              )}
            </Button>
          </TooltipWrapper>

          <TooltipWrapper
            title="Logout"
            arrow
            PopperProps={{
              container: editorRef?.current || undefined,
            }}
          >
            <Button onClick={handleLogout}>
              <LogoutIcon
                style={{ fontSize: "21px", color: "white" }}
                className="cursor-pointer"
              />
            </Button>
          </TooltipWrapper>

          <img
            className="userProfile"
            src={userProfile.profilePhoto}
            alt="user profile"
            onClick={() => navigate("/profile")}
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;

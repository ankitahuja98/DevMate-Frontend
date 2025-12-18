import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { useEffect, useState, type RefObject } from "react";
// import TopBarLogo from "../images/TopBarLogo.png";
import TooltipWrapper from "../../utils/TooltipWrapper";
// import { useTheme } from "../Context/ThemeContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector, type AppDispatch } from "../../redux/store/store";
import { logout } from "../../redux/actions/authAction";
import "../../CSS/Topbar.css";

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
    height: "55px",
    margin: "2px 2px 2px 25px",
  },
};

const TopBar = ({
  NotificationIsOpen,
  setNotificationIsOpen,
  editorRef,
}: {
  NotificationIsOpen: boolean;
  editorRef: RefObject<HTMLDivElement | null>;
  setNotificationIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  //   const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (editorRef.current?.requestFullscreen) {
        editorRef.current.requestFullscreen();
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleNotification = () => {
    setNotificationIsOpen((prev) => !prev);
  };

  const userProfile = useAppSelector(
    (store) => store.profile.userProfile.userProfileData
  );

  return (
    <div style={useStyle.barStyle}>
      <div>
        {/* <img src={TopBarLogo} alt="Logo" style={useStyle.logoStyle} /> */}
      </div>
      <div className="text-white w-full">
        <div className="p-3 float-right flex items-center">
          <TooltipWrapper
            title="Notification"
            arrow
            PopperProps={{
              container: editorRef.current,
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
              container: editorRef.current,
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
            title="Dark Mode"
            arrow
            PopperProps={{
              container: editorRef.current,
            }}
          >
            {/* <Button onClick={toggleTheme}>
              {theme === "light" ? (
                <DarkModeIcon style={useStyle.iconStyle} />
              ) : (
                <LightModeIcon style={useStyle.iconStyle} />
              )}
            </Button> */}
            <Button>
              <DarkModeIcon style={useStyle.iconStyle} />
            </Button>
          </TooltipWrapper>
          <TooltipWrapper
            title="Settings"
            arrow
            PopperProps={{
              container: editorRef.current,
            }}
          >
            <Button>
              <SettingsIcon style={useStyle.iconStyle} />
            </Button>
          </TooltipWrapper>
          <TooltipWrapper
            title="Logout"
            arrow
            PopperProps={{
              container: editorRef.current,
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

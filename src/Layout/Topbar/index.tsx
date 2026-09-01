import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { type RefObject, useEffect, useState } from "react";
import TooltipWrapper from "../../utils/TooltipWrapper";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Badge,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector, type AppDispatch } from "../../redux/store/store";
import { logout } from "../../redux/actions/authAction";
import { getUnreadNotificationCount } from "../../redux/actions/notificationAction";
import NotificationPanel from "../../Components/NotificationPanel";
import "../../CSS/Topbar.css";
import { useFullscreen } from "../../context/FullscreenContext";

const iconBtnClass =
  "min-w-0! rounded-full! p-2.5! text-[#6B7691]! hover:bg-[#F0F2F8]! hover:text-[#17213D]!";

// Every in-app page's heading sits on this row, inline with the
// notification / chat / avatar icons, instead of in the page body. Same
// route→heading idea MobileTopbar already uses. Each page hides its own
// in-body heading at the width this topbar takes over at (650px — see
// .ExplorePageHeader / .LikedYouPageHeader / .PageHeaderRow), so a
// heading never renders twice.
const topbarPageHeadings: Record<
  string,
  { title: string; description?: string }
> = {
  "/explore": {
    title: "Explore Developers",
    description: "Find and connect with talented developers",
  },
  "/likedyou": {
    title: "People who liked you",
    description: "Developers interested in connecting with you",
  },
  "/matches": {
    title: "Chats",
    description: "Your connections and conversations",
  },
  "/premium": {
    title: "Go Premium",
    description: "Unlock advanced matching and unlimited connections",
  },
  "/setting": {
    title: "Settings",
    description: "Manage your account, preferences, and app experience",
  },
  "/profile": {
    title: "Profile",
    description: "Your public profile as other developers see it",
  },
};

// /chat/:targetUserId renders the same page as /matches, so it wants the
// same heading — pathname lookup alone won't match the dynamic segment.
const getPageHeading = (pathname: string) =>
  pathname.startsWith("/chat/")
    ? topbarPageHeadings["/matches"]
    : topbarPageHeadings[pathname];

const TopBar = ({
  editorRef,
}: {
  editorRef?: RefObject<HTMLDivElement | null>;
}) => {
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const pageHeading = getPageHeading(location.pathname);

  const unreadCount = useAppSelector(
    (store) => store.notification.unreadCount,
  );

  useEffect(() => {
    dispatch(getUnreadNotificationCount());
  }, [dispatch]);

  const handleLogout = () => {
    setMenuAnchor(null);
    dispatch(logout());
    navigate("/login");
  };

  const userProfile = useAppSelector(
    (store) => store.profile.userProfile.userProfileData,
  );

  return (
    <div className="flex items-center justify-between gap-4 px-5 sm:px-7 pt-5 pb-2">
      {/* Page heading, for the pages that put it on this row rather than in
          the page body (see topbarPageHeadings above). */}
      {pageHeading && (
        <div className="topbarPageHeading">
          <h1>{pageHeading.title}</h1>
          {pageHeading.description && <p>{pageHeading.description}</p>}
        </div>
      )}


      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 ml-auto">
        <TooltipWrapper
          title="Notifications"
          arrow
          PopperProps={{ container: editorRef?.current || undefined }}
        >
          <Button
            type="button"
            onClick={() => setIsNotifOpen(true)}
            className={iconBtnClass}
          >
            <Badge
              badgeContent={unreadCount}
              max={99}
              color="error"
              sx={{
                "& .MuiBadge-badge": { fontSize: 10, height: 16, minWidth: 16 },
              }}
            >
              <NotificationsNoneOutlinedIcon sx={{ fontSize: 22 }} />
            </Badge>
          </Button>
        </TooltipWrapper>

        <NotificationPanel
          open={isNotifOpen}
          onClose={() => setIsNotifOpen(false)}
          container={editorRef?.current || undefined}
        />

        <TooltipWrapper
          title="Chats"
          arrow
          PopperProps={{ container: editorRef?.current || undefined }}
        >
          <Button
            type="button"
            onClick={() => navigate("/matches")}
            className={iconBtnClass}
          >
            <ChatBubbleOutlineIcon sx={{ fontSize: 21 }} />
          </Button>
        </TooltipWrapper>

        <Button
          onClick={(e) => setMenuAnchor(e.currentTarget)}
          className="min-w-0! rounded-full! pl-1! pr-2! py-1!"
        >
          <img
            className="userProfile"
            src={userProfile.profilePhoto}
            alt="user profile"
          />
          <KeyboardArrowDownIcon sx={{ fontSize: 18, color: "#6B7691" }} />
        </Button>

        <Menu
          anchorEl={menuAnchor}
          open={!!menuAnchor}
          onClose={() => setMenuAnchor(null)}
          container={editorRef?.current || undefined}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          slotProps={{ paper: { sx: { minWidth: 200, mt: 1 } } }}
        >
          <MenuItem
            onClick={() => {
              setMenuAnchor(null);
              navigate("/profile");
            }}
          >
            <ListItemIcon>
              <PersonOutlineIcon fontSize="small" />
            </ListItemIcon>
            View Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              setMenuAnchor(null);
              toggleFullscreen();
            }}
          >
            <ListItemIcon>
              {isFullscreen ? (
                <FullscreenExitIcon fontSize="small" />
              ) : (
                <FullscreenIcon fontSize="small" />
              )}
            </ListItemIcon>
            {isFullscreen ? "Exit Full Screen" : "Full Screen"}
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ color: "#ef4444" }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" sx={{ color: "#ef4444" }} />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default TopBar;

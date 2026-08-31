import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import TuneIcon from "@mui/icons-material/Tune";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { type RefObject, useEffect, useRef, useState } from "react";
import TooltipWrapper from "../../utils/TooltipWrapper";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Badge,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector, type AppDispatch } from "../../redux/store/store";
import { logout } from "../../redux/actions/authAction";
import { getUnreadNotificationCount } from "../../redux/actions/notificationAction";
import NotificationPanel from "../../Components/NotificationPanel";
import "../../CSS/Topbar.css";
import { useFullscreen } from "../../context/FullscreenContext";
import { useSearch } from "../../context/SearchContext";
import {
  experienceLabel,
  availabilityLabel,
} from "../../utils/developerCardHelpers";

const iconBtnClass =
  "min-w-0! rounded-full! p-2.5! text-[#6B7691]! hover:bg-[#F0F2F8]! hover:text-[#17213D]!";

const experienceOptions = [1, 2, 3, 6, 10];

const scopePlaceholder: Record<string, string> = {
  explore: "Search developers, skills, technologies...",
  likedyou: "Search people who liked you...",
};

const TopBar = ({
  editorRef,
}: {
  editorRef?: RefObject<HTMLDivElement | null>;
}) => {
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const searchWrapRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const unreadCount = useAppSelector(
    (store) => store.notification.unreadCount,
  );

  const {
    query,
    setQuery,
    filters,
    setFilter,
    clearFilters,
    scope,
    roleOptions,
    skillOptions,
  } = useSearch();

  useEffect(() => {
    dispatch(getUnreadNotificationCount());
  }, [dispatch]);

  // ⌘K / Ctrl+K focuses search — the hint badge next to the input actually
  // does something now that search is real.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape") setIsAdvancedOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Close the advanced panel on outside click.
  useEffect(() => {
    if (!isAdvancedOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        searchWrapRef.current &&
        !searchWrapRef.current.contains(e.target as Node)
      ) {
        setIsAdvancedOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isAdvancedOpen]);

  const handleLogout = () => {
    setMenuAnchor(null);
    dispatch(logout());
    navigate("/login");
  };

  const userProfile = useAppSelector(
    (store) => store.profile.userProfile.userProfileData,
  );

  const hasActiveFilters = Object.values(filters).some(Boolean);

  return (
    <div className="flex items-center justify-between gap-4 px-5 sm:px-7 pt-5 pb-2">
      {/* Search — real, page-scoped, and only rendered at all on the pages
          that actually implement it (Explore.tsx / LikedYou.tsx register
          themselves as "scope" on mount). Everywhere else the topbar just
          doesn't show a search box, instead of a disabled/greyed-out one. */}
      {scope && (
        <div className="topbarSearchWrap" ref={searchWrapRef}>
          <div className="topbarSearch">
            <SearchIcon sx={{ fontSize: 20, color: "#6B7691" }} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder={scopePlaceholder[scope]}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="topbarSearchInput"
            />
            {query && (
              <button
                type="button"
                className="topbarSearchClear"
                title="Clear search"
                onClick={() => {
                  setQuery("");
                  searchInputRef.current?.focus();
                }}
              >
                <CloseIcon sx={{ fontSize: 16 }} />
              </button>
            )}
            <button
              type="button"
              className={`topbarAdvancedToggle ${
                isAdvancedOpen || hasActiveFilters ? "active" : ""
              }`}
              title="Advanced search"
              onClick={() => setIsAdvancedOpen((v) => !v)}
            >
              <TuneIcon sx={{ fontSize: 16 }} />
              {hasActiveFilters && <span className="topbarAdvancedDot" />}
            </button>
          </div>

          {isAdvancedOpen && (
            <div className="topbarAdvancedPanel">
              <div className="topbarAdvancedPanelHeader">
                <span>Advanced Search</span>
                {hasActiveFilters && (
                  <button type="button" onClick={clearFilters}>
                    Clear all
                  </button>
                )}
              </div>
              <div className="topbarAdvancedGrid">
                <label>
                  Role
                  <select
                    value={filters.role}
                    onChange={(e) => setFilter("role", e.target.value)}
                  >
                    <option value="">All Roles</option>
                    {roleOptions.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Skill
                  <select
                    value={filters.skill}
                    onChange={(e) => setFilter("skill", e.target.value)}
                  >
                    <option value="">All Skills</option>
                    {skillOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Experience
                  <select
                    value={filters.experience}
                    onChange={(e) => setFilter("experience", e.target.value)}
                  >
                    <option value="">Any</option>
                    {experienceOptions.map((e) => (
                      <option key={e} value={e}>
                        {experienceLabel(e)}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Availability
                  <select
                    value={filters.availability}
                    onChange={(e) => setFilter("availability", e.target.value)}
                  >
                    <option value="">Any</option>
                    {Object.entries(availabilityLabel).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          )}
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

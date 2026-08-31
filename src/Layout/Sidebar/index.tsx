import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, type RefObject } from "react";
import type { Variants } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import InterestsOutlinedIcon from "@mui/icons-material/InterestsOutlined";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TooltipWrapper from "../../utils/TooltipWrapper";
import { useAppSelector } from "../../redux/store/store";
import DevMateLogoWhite from "../../Images/devmateLogo-white.avif";

export default function SideBar({
  isOpen,
  setIsOpen,
  editorRef,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editorRef?: RefObject<HTMLDivElement | null>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { height } = useDimensions(containerRef);
  const location = useLocation();
  const navigate = useNavigate();

  const userProfile = useAppSelector(
    (store) => store.profile.userProfile.userProfileData,
  );

  // Real unread count from the already-fetched chat list (0 until the user
  // has visited Chats at least once this session — never a made-up number).
  const unreadChatCount = useAppSelector(
    (store) =>
      store.chat.ChatList?.filter((c: any) => c.isUnread).length || 0,
  );

  return (
    <div className="flex flex-col h-full" style={{ background: sidebarBg }}>
      <motion.nav
        ref={containerRef}
        initial={false}
        animate={{ width: isOpen ? 264 : 72 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={nav}
      >
        <motion.div
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={sidebarVariants}
          custom={height || 400}
        />

        {/* Logo + collapse/expand toggle — one row. Logo hides entirely
            when collapsed so only the toggle icon remains, centered. */}
        <div
          className="flex items-center shrink-0"
          style={{
            justifyContent: isOpen ? "space-between" : "center",
            padding: isOpen ? "20px 14px 12px 20px" : "20px 0 12px",
          }}
        >
          {isOpen && (
            <img src={DevMateLogoWhite} alt="DevMate" className="h-8" />
          )}
          <MenuToggle toggle={() => setIsOpen(!isOpen)} isOpen={isOpen} />
        </div>

        <Navigation
          isOpen={isOpen}
          currentPath={location.pathname}
          editorRef={editorRef}
          badges={{ "/matches": unreadChatCount }}
        />

        {/* Spacer pushes the user card to the bottom of the column */}
        <div style={{ flex: 1 }} />

        {/* User card */}
        <div className="px-3 pb-3 shrink-0">
          <div
            className="flex items-center gap-3 overflow-hidden"
            style={{
              ...userCard,
              padding: isOpen ? "10px 12px" : "10px 0",
              justifyContent: isOpen ? "flex-start" : "center",
              border: isOpen ? userCard.border : "none",
              background: isOpen ? userCard.background : "transparent",
            }}
          >
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={avatarWrap}>
                {userProfile?.profilePhoto ? (
                  <img
                    src={userProfile.profilePhoto}
                    alt={userProfile.name}
                    style={avatarImg}
                  />
                ) : (
                  <span style={avatarInitial}>
                    {userProfile?.name?.charAt(0)?.toUpperCase() || "?"}
                  </span>
                )}
              </div>
              {/* You're the one looking at this screen right now — always online */}
              <span style={onlineDot} />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="min-w-0"
                >
                  <p className="text-white text-sm font-bold truncate">
                    {userProfile?.name || "Your Profile"}
                  </p>
                  <p
                    className="text-xs truncate"
                    style={{ color: "#AEB9D5" }}
                  >
                    {userProfile?.currentRole || "Complete your profile"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Upgrade promo — links to the existing /premium route, only
            shown for accounts that aren't premium yet */}
        {isOpen && !userProfile?.isPremium && (
          <div className="px-3 pb-5 shrink-0">
            <button
              type="button"
              onClick={() => navigate("/premium")}
              style={upgradeCard}
              className="text-left w-full cursor-pointer"
            >
              <WorkspacePremiumIcon
                sx={{ color: "#F4D35E", fontSize: 22, marginBottom: "8px" }}
              />
              <p className="text-white text-sm font-bold mb-1">
                Upgrade to Pro
              </p>
              <p
                className="text-xs mb-3"
                style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.4 }}
              >
                Unlock premium features and connect without limits.
              </p>
              <div style={upgradeBtn}>Upgrade Now</div>
            </button>
          </div>
        )}
      </motion.nav>
    </div>
  );
}

const sidebarBg = "#0B1736";

const menuItems = [
  { id: 0, name: "Explore", path: "/explore", icon: ExploreOutlinedIcon },
  { id: 1, name: "Liked You", path: "/likedyou", icon: FavoriteIcon },
  { id: 2, name: "Chats", path: "/matches", icon: ChatIcon },
  { id: 3, name: "Go Premium", path: "/premium", icon: InterestsOutlinedIcon },
  { id: 4, name: "Settings", path: "/setting", icon: SettingsIcon },
];

const Navigation = ({
  isOpen,
  currentPath,
  editorRef,
  badges = {},
}: {
  isOpen: boolean;
  currentPath: string;
  editorRef?: RefObject<HTMLDivElement | null>;
  badges?: Record<string, number>;
}) => (
  <ul style={list}>
    {menuItems.map((item) => (
      <MenuItem
        key={item.id}
        name={item.name}
        path={item.path}
        icon={item.icon}
        isOpen={isOpen}
        currentPath={currentPath}
        editorRef={editorRef}
        badge={badges[item.path]}
      />
    ))}
  </ul>
);

const MenuItem = ({
  name,
  path,
  icon: Icon,
  isOpen,
  currentPath,
  editorRef,
  badge,
}: {
  name: string;
  path: string;
  icon: React.ElementType;
  isOpen: boolean;
  currentPath: string;
  editorRef?: RefObject<HTMLDivElement | null>;
  badge?: number;
}) => {
  const isActive = currentPath === path;
  const listItem: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: isOpen ? "flex-start" : "center",
    cursor: "pointer",
    padding: isOpen ? "13px 16px" : "13px 0",
    background: isActive
      ? "linear-gradient(135deg, #6D3DF5 0%, #8B5CF6 100%)"
      : "transparent",
    boxShadow: isActive ? "0 6px 16px rgba(109, 61, 245, 0.35)" : "none",
    color: "#FFFFFF",
    width: "100%",
  };
  return (
    <Link
      to={path}
      className={isOpen ? "px-3 py-1 flex align-middle" : "py-1 flex align-middle"}
    >
      <li
        style={listItem}
        className={`rounded-full transition-colors ${
          !isActive ? "hover:bg-white/5" : ""
        }`}
      >
        <TooltipWrapper
          title={name}
          arrow
          PopperProps={{
            container: editorRef?.current || undefined,
          }}
        >
          <span style={{ position: "relative", display: "inline-flex" }}>
            <Icon
              style={{ ...iconPlaceholder, marginRight: isOpen ? 14 : 0 }}
            />
            {!isOpen && !!badge && <span style={collapsedBadgeDot} />}
          </span>

          {/* Animate label visibility */}
          <AnimatePresence>
            {isOpen && (
              <motion.span
                style={{ ...textLabel, display: "flex", alignItems: "center" }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {name}
                {!!badge && <span style={badgePill}>{badge}</span>}
              </motion.span>
            )}
          </AnimatePresence>
        </TooltipWrapper>
      </li>
    </Link>
  );
};

const sidebarVariants: Variants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

interface MenuToggleProps {
  toggle: () => void;
  isOpen: boolean;
}

const MenuToggle: React.FC<MenuToggleProps> = ({ toggle, isOpen }) => {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle menu"
      style={{
        width: 40,
        height: 40,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="text-white/70 hover:text-white transition-colors duration-200 cursor-pointer hover:bg-white/5 rounded-lg shrink-0"
    >
      {isOpen ? (
        <MenuOpenIcon fontSize="medium" style={{ color: "inherit" }} />
      ) : (
        <MenuIcon fontSize="medium" style={{ color: "inherit" }} />
      )}
    </button>
  );
};

// Styles

const nav: React.CSSProperties = {
  height: "100%",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  color: "white",
  overflow: "hidden",
};

const list: React.CSSProperties = {
  listStyle: "none",
  margin: 0,
  marginTop: 6,
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const iconPlaceholder: React.CSSProperties = {
  width: 22,
  height: 22,
  flexShrink: 0,
  marginRight: 14,
};

const textLabel: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 600,
  whiteSpace: "nowrap",
  userSelect: "none",
};

const badgePill: React.CSSProperties = {
  marginLeft: 8,
  background: "#8B5CF6",
  color: "#FFFFFF",
  fontSize: 11,
  fontWeight: 800,
  borderRadius: 999,
  minWidth: 18,
  height: 18,
  padding: "0 5px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

const collapsedBadgeDot: React.CSSProperties = {
  position: "absolute",
  top: -2,
  right: -2,
  width: 8,
  height: 8,
  borderRadius: "50%",
  background: "#F4D35E",
  border: "2px solid #0B1736",
};

const userCard: React.CSSProperties = {
  background: "#121F43",
  border: "1px solid #26365D",
  borderRadius: 14,
  padding: "10px 12px",
  minHeight: 60,
};

const avatarWrap: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  flexShrink: 0,
  background: "#EDE9FE",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
};

const avatarImg: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const avatarInitial: React.CSSProperties = {
  color: "#6D3DF5",
  fontWeight: 700,
  fontSize: 16,
};

const onlineDot: React.CSSProperties = {
  position: "absolute",
  bottom: 0,
  right: 0,
  width: 11,
  height: 11,
  borderRadius: "50%",
  background: "#22C55E",
  border: "2px solid #121F43",
};

const upgradeCard: React.CSSProperties = {
  background: "linear-gradient(160deg, #2A205F 0%, #4C1FD1 100%)",
  border: "1px solid #704BFF",
  borderRadius: 16,
  padding: "16px",
  display: "block",
};

const upgradeBtn: React.CSSProperties = {
  background: "#FFFFFF",
  color: "#4C1FD1",
  fontWeight: 700,
  fontSize: 13,
  textAlign: "center",
  borderRadius: 10,
  padding: "9px",
};

// Utility Hook for dimensions (optional)
const useDimensions = (ref: React.RefObject<HTMLDivElement | null>) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
  }, [ref]);

  return dimensions.current;
};

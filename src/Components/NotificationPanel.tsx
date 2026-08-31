import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  CircularProgress,
  Chip,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useAppSelector, type AppDispatch } from "../redux/store/store";
import {
  clearAllNotifications,
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "../redux/actions/notificationAction";
import type { NotificationItem } from "../redux/types/notificationType";

// Short "2m ago" / "3h ago" / "5d ago" label — no new date library needed
// for a panel that only ever shows recent-ish activity.
const timeAgoLabel = (createdAt: string) => {
  const diffMs = Date.now() - new Date(createdAt).getTime();
  const minutes = Math.floor(diffMs / 60000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const notificationIcon = (type: NotificationItem["type"]) => {
  if (type === "premium_purchase") {
    return <WorkspacePremiumIcon sx={{ fontSize: 20, color: "#D4A017" }} />;
  }
  return <PersonAddAlt1Icon sx={{ fontSize: 20, color: "#6D3DF5" }} />;
};

// Where clicking a notification should take the user.
const notificationTarget = (type: NotificationItem["type"]) => {
  if (type === "premium_purchase") return "/profile";
  if (type === "connection_accepted") return "/matches";
  return "/likedyou";
};

type FilterOption = "all" | "unread" | "connections" | "premium_purchase";
type SortOrder = "newest" | "oldest";

const filterOptions: { value: FilterOption; label: string }[] = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "connections", label: "Connections" },
  { value: "premium_purchase", label: "Pro" },
];

const matchesFilter = (notification: NotificationItem, filter: FilterOption) => {
  if (filter === "all") return true;
  if (filter === "unread") return !notification.isRead;
  if (filter === "connections") {
    return (
      notification.type === "connection_request" ||
      notification.type === "connection_accepted"
    );
  }
  return notification.type === "premium_purchase";
};

// Same spring feel the left Sidebar uses for its width/reveal animations
// (see Layout/Sidebar/index.tsx), just tuned softer/slower — lower
// stiffness stretches the slide out, lower damping keeps a gentle
// overshoot/bounce as it settles, rather than a flat CSS ease.
const panelSpring = { type: "spring" as const, stiffness: 170, damping: 20 };

interface NotificationPanelProps {
  open: boolean;
  onClose: () => void;
  container?: HTMLElement;
}

const NotificationPanel = ({
  open,
  onClose,
  container,
}: NotificationPanelProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterOption>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [isClearAllOpen, setIsClearAllOpen] = useState(false);

  const { list, isLoading } = useAppSelector((store) => store.notification);

  const displayedList = useMemo(() => {
    const filtered = list.filter((notification) =>
      matchesFilter(notification, filter),
    );

    return filtered.sort((a, b) => {
      const diff =
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? -diff : diff;
    });
  }, [list, filter, sortOrder]);

  useEffect(() => {
    if (open) {
      dispatch(getNotifications({ page: 1, size: 20 }));
    }
  }, [open, dispatch]);

  // Close on Escape + lock page scroll behind the panel while it's open.
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  const handleItemClick = (notification: NotificationItem) => {
    if (!notification.isRead) {
      dispatch(markNotificationRead(notification._id));
    }
    onClose();
    navigate(notificationTarget(notification.type));
  };

  const handleMarkAllRead = () => {
    dispatch(markAllNotificationsRead());
  };

  const handleClearAll = () => {
    dispatch(clearAllNotifications());
    setIsClearAllOpen(false);
  };

  // Not mounted at all until it's opened — nothing sits in the DOM (or on
  // screen) until the bell is clicked, and AnimatePresence handles the
  // slide-out + fade before actually unmounting on close.
  return createPortal(
    <>
      <AnimatePresence>
        {open && (
          <>
          <motion.div
            key="notification-backdrop"
            className="fixed inset-0"
            style={{ background: "rgba(23, 33, 61, 0.32)", zIndex: 1300 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
          />

          <motion.div
            key="notification-panel"
            className="fixed top-0 right-0 h-full flex flex-col"
            style={{
              width: 320,
              maxWidth: "100vw",
              background: "#FFFFFF",
              zIndex: 1301,
              boxShadow: "-12px 0 32px rgba(23, 33, 61, 0.18)",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={panelSpring}
          >
            <Box className="flex items-center justify-between px-5 pt-4 shrink-0">
              <Typography sx={{ fontSize: 17, fontWeight: 700, color: "#17213D" }}>
                Notifications
              </Typography>
              <IconButton onClick={onClose} size="small" sx={{ color: "#6B7691" }}>
                <CloseIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>

            {(list.some((item) => !item.isRead) || list.length > 0) && (
              <Box className="flex items-center gap-1 px-5 pb-3 pt-1 shrink-0">
                {list.some((item) => !item.isRead) && (
                  <Button
                    size="small"
                    onClick={handleMarkAllRead}
                    sx={{ textTransform: "none", fontSize: 12.5, color: "#6D3DF5" }}
                  >
                    Mark all as read
                  </Button>
                )}
                {list.length > 0 && (
                  <Button
                    size="small"
                    onClick={() => setIsClearAllOpen(true)}
                    sx={{ textTransform: "none", fontSize: 12.5, color: "#6B7691" }}
                  >
                    Clear all
                  </Button>
                )}
              </Box>
            )}
            <Divider />

            {/* Filter chips + newest/oldest sort toggle — filters/sorts the
                already-fetched page client-side, no extra round trip. */}
            <Box className="flex items-center gap-1.5 px-4 pt-3 pb-2 shrink-0">
              <Box className="flex items-center gap-1.5 flex-1 overflow-x-auto">
                {filterOptions.map((option) => (
                  <Chip
                    key={option.value}
                    label={option.label}
                    size="small"
                    onClick={() => setFilter(option.value)}
                    sx={{
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      backgroundColor:
                        filter === option.value ? "#6D3DF5" : "#F0F2F8",
                      color: filter === option.value ? "#FFFFFF" : "#6B7691",
                      "&:hover": {
                        backgroundColor:
                          filter === option.value ? "#6D3DF5" : "#E4E7EF",
                      },
                    }}
                  />
                ))}
              </Box>
              <Tooltip
                title={sortOrder === "newest" ? "Newest first" : "Oldest first"}
                arrow
              >
                <IconButton
                  size="small"
                  onClick={() =>
                    setSortOrder((prev) =>
                      prev === "newest" ? "oldest" : "newest",
                    )
                  }
                  sx={{ color: "#6B7691", flexShrink: 0 }}
                >
                  {sortOrder === "newest" ? (
                    <ArrowDownwardIcon sx={{ fontSize: 17 }} />
                  ) : (
                    <ArrowUpwardIcon sx={{ fontSize: 17 }} />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
            <Divider />

            <Box sx={{ flex: 1, overflowY: "auto" }}>
              {isLoading && list.length === 0 && (
                <Box className="flex items-center justify-center py-10">
                  <CircularProgress size={24} sx={{ color: "#6D3DF5" }} />
                </Box>
              )}

              {!isLoading && list.length === 0 && (
                <Box className="flex flex-col items-center justify-center gap-2 py-16 px-4 text-center">
                  <NotificationsNoneOutlinedIcon
                    sx={{ fontSize: 36, color: "#C7CCDB" }}
                  />
                  <Typography sx={{ fontSize: 13.5, color: "#6B7691" }}>
                    No notifications yet
                  </Typography>
                </Box>
              )}

              {!isLoading && list.length > 0 && displayedList.length === 0 && (
                <Box className="flex flex-col items-center justify-center gap-2 py-16 px-4 text-center">
                  <NotificationsNoneOutlinedIcon
                    sx={{ fontSize: 36, color: "#C7CCDB" }}
                  />
                  <Typography sx={{ fontSize: 13.5, color: "#6B7691" }}>
                    No notifications match this filter
                  </Typography>
                </Box>
              )}

              {displayedList.map((notification) => (
                <Box
                  key={notification._id}
                  onClick={() => handleItemClick(notification)}
                  className="flex items-start gap-3 px-5 py-3.5 cursor-pointer hover:bg-[#F6F7FB]"
                  sx={{
                    backgroundColor: notification.isRead
                      ? "transparent"
                      : "#F3EEFE",
                  }}
                >
                  <Box sx={{ mt: "2px", flexShrink: 0 }}>
                    {notificationIcon(notification.type)}
                  </Box>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                      sx={{
                        fontSize: 13.5,
                        color: "#17213D",
                        fontWeight: notification.isRead ? 400 : 600,
                        lineHeight: 1.4,
                      }}
                    >
                      {notification.message}
                    </Typography>
                    <Typography sx={{ fontSize: 11.5, color: "#9AA1B5", mt: 0.5 }}>
                      {timeAgoLabel(notification.createdAt)}
                    </Typography>
                  </Box>
                  {!notification.isRead && (
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: "#6D3DF5",
                        mt: "6px",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </Box>
              ))}
            </Box>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Dialog
        open={isClearAllOpen}
        onClose={() => setIsClearAllOpen(false)}
        sx={{ zIndex: 1400 }}
      >
        <DialogTitle className="font-semibold text-red-600">
          Clear All Notifications
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will permanently remove all your notifications. This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsClearAllOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleClearAll} color="error">
            Clear All
          </Button>
        </DialogActions>
      </Dialog>
    </>,
    container || document.body,
  );
};

export default NotificationPanel;

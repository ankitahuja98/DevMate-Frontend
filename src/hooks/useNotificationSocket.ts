import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { creasteSocketConnetion } from "../utils/socket";
import { useAppSelector, type AppDispatch } from "../redux/store/store";
import { notificationReceived } from "../redux/slices/notificationSlice";
import type { NotificationItem } from "../redux/types/notificationType";

// Keeps one live socket.io connection open for the whole authenticated
// session (mounted once in ResponsiveLayout) so the user gets notification
// toasts + live panel/badge updates no matter which page they're on —
// mirrors the per-chat socket pattern in ConversationPanel.tsx, but scoped
// to the user's personal room (joined server-side on connect) instead of a
// specific chat room.
const useNotificationSocket = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useAppSelector(
    (store) => store.profile.userProfile.userProfileData?._id,
  );

  useEffect(() => {
    if (!userId) return;

    const socket = creasteSocketConnetion();

    socket.on("newNotification", (notification: NotificationItem) => {
      dispatch(notificationReceived(notification));
      toast.info(notification.message);
    });

    return () => {
      socket.off("newNotification");
      socket.disconnect();
    };
  }, [userId, dispatch]);
};

export default useNotificationSocket;

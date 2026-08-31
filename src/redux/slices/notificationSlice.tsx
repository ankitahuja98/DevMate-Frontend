import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  clearAllNotifications,
  getNotifications,
  getUnreadNotificationCount,
  markAllNotificationsRead,
  markNotificationRead,
} from "../actions/notificationAction";
import type { NotificationItem, NotificationState } from "../types/notificationType";

const initialState: NotificationState = {
  list: [],
  unreadCount: 0,
  total: 0,
  page: 1,
  isLoading: false,
  isError: false,
};

const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState: initialState,
  reducers: {
    // Pushed in live from the socket listener when a "newNotification"
    // event arrives while the user is connected.
    notificationReceived: (
      state,
      action: PayloadAction<NotificationItem>,
    ) => {
      state.list = [action.payload, ...state.list];
      state.total += 1;
      state.unreadCount += 1;
    },
  },
  extraReducers: (builder) => {
    // get Notifications
    builder.addCase(getNotifications.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNotifications.fulfilled, (state, action) => {
      const { data, total, page } = action.payload;

      state.list = page === 1 ? data : [...state.list, ...data];
      state.total = total;
      state.page = page;
      state.isLoading = false;
    });
    builder.addCase(getNotifications.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // get unread count
    builder.addCase(getUnreadNotificationCount.fulfilled, (state, action) => {
      state.unreadCount = action.payload.count;
    });

    // mark one as read
    builder.addCase(markNotificationRead.fulfilled, (state, action) => {
      const { arg: notificationId } = action.meta;

      const notification = state.list.find(
        (item) => item._id === notificationId,
      );

      if (notification && !notification.isRead) {
        notification.isRead = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    });

    // mark all as read
    builder.addCase(markAllNotificationsRead.fulfilled, (state) => {
      state.list = state.list.map((item) => ({ ...item, isRead: true }));
      state.unreadCount = 0;
    });

    // clear all
    builder.addCase(clearAllNotifications.fulfilled, (state) => {
      state.list = [];
      state.total = 0;
      state.unreadCount = 0;
    });
  },
});

export const { notificationReceived } = notificationSlice.actions;
export default notificationSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../../api/axiosInstance";
import type { NotificationListResponse } from "../types/notificationType";

interface notificationListPayload {
  page: number;
  size: number;
}

export const getNotifications = createAsyncThunk<
  NotificationListResponse,
  notificationListPayload
>("getNotifications", async ({ page, size }, { rejectWithValue }) => {
  try {
    const response = await callApi.get(
      `/notifications?page=${page}&size=${size}`,
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response.data || "Get notifications failed",
    );
  }
});

export const getUnreadNotificationCount = createAsyncThunk<any>(
  "getUnreadNotificationCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await callApi.get("/notifications/unread-count");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data || "Get unread count failed",
      );
    }
  },
);

export const markNotificationRead = createAsyncThunk<any, string>(
  "markNotificationRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      const response = await callApi.patch(
        `/notifications/${notificationId}/read`,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data || "Mark notification read failed",
      );
    }
  },
);

export const markAllNotificationsRead = createAsyncThunk<any>(
  "markAllNotificationsRead",
  async (_, { rejectWithValue }) => {
    try {
      const response = await callApi.patch("/notifications/read-all");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data || "Mark all notifications read failed",
      );
    }
  },
);

export const clearAllNotifications = createAsyncThunk<any>(
  "clearAllNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await callApi.delete("/notifications/clear-all");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data || "Clear all notifications failed",
      );
    }
  },
);

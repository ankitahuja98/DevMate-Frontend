import { createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../../api/axiosInstance";
import type { ChatResponse } from "../types/chatType";

interface chatPayload {
  receiver: string | undefined;
  pageno: number;
  size: number;
}

interface chatDeletePayload {
  targetUserId: string | undefined;
}

export const getChat = createAsyncThunk<ChatResponse, chatPayload>(
  "/getChat",
  async ({ receiver, pageno, size }, { rejectWithValue }) => {
    try {
      const response = await callApi.get(
        `/chat/${receiver}?page=${pageno}&size=${size}`,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || "Get chat failed");
    }
  },
);

export const getChatList = createAsyncThunk<any>(
  "getChatList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await callApi.get("/chatList");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || "Get chat failed");
    }
  },
);

export const chatDelete = createAsyncThunk<any, chatDeletePayload>(
  "chatDelete",
  async ({ targetUserId }, { rejectWithValue }) => {
    try {
      let response = await callApi.post(`/chatDelete/${targetUserId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || "Get chat failed");
    }
  },
);

export const markMessagesAsRead = createAsyncThunk<any, chatDeletePayload>(
  "markMessagesAsRead",
  async ({ targetUserId }, { rejectWithValue }) => {
    try {
      let response = await callApi.post(
        `/chat/markMessagesAsRead/${targetUserId}`,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || "Get chat failed");
    }
  },
);

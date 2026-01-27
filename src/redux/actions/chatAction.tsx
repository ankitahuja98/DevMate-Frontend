import { createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../../api/axiosInstance";
import type { ChatResponse } from "../types/chatType";

interface chatPayload {
  receiver: string | undefined;
  pageno: number;
  size: number;
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
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || "Get chat failed");
    }
  },
);

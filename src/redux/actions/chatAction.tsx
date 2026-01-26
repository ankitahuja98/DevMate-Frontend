import { createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../../api/axiosInstance";

interface chatPayload {
  receiver: string | undefined;
}

export const getChat = createAsyncThunk<any, chatPayload>(
  "/getChat",
  async ({ receiver }, { rejectWithValue }) => {
    try {
      const response = await callApi.get(`/chat/${receiver}`);
      return response.data.data.messages;
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

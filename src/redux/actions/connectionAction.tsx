import { createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../../api/axiosInstance";
import type { ConnectionReqData } from "../types/connectionType";

export const sendConnectionReq = createAsyncThunk<any, ConnectionReqData>(
  "sendConnectionReq",
  async ({ status, toUserId }, { rejectWithValue }) => {
    try {
      const response = await callApi.post(
        `/connectionReq/send/${status}/${toUserId}`
      );
      return response.data.message;
    } catch (error: any) {
      return rejectWithValue(error.response.data || "Send connection failed");
    }
  }
);

export const reviewConnectionReq = createAsyncThunk<any, ConnectionReqData>(
  "reviewConnectionReq",
  async ({ status, requestId }, { rejectWithValue }) => {
    console.log("status", status);
    try {
      const response = await callApi.post(
        `/connectionReq/review/${status}/${requestId}`
      );
      return response.data.message;
    } catch (error: any) {
      return rejectWithValue(error.response.data || "Review connection failed");
    }
  }
);

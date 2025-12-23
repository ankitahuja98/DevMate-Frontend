import { createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../../api/axiosInstance";

export const getAllUsers = createAsyncThunk<any>(
  "getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await callApi("/feed");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || "Get users failed");
    }
  }
);

export const getAllRequests = createAsyncThunk<any>(
  "getAllRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await callApi.get("/user/requests");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || "Get requests failed");
    }
  }
);

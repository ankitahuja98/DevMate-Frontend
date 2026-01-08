import { createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../../api/axiosInstance";
import type { userData } from "../../types/userData";

export const fetchUserProfile = createAsyncThunk<any>(
  "fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await callApi.get("/profile/view");
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

export const editprofile = createAsyncThunk<any, userData>(
  "editprofile",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await callApi.patch("/profile/edit", userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

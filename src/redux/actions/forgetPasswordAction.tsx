import { createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../../api/axiosInstance";

export const forgetPasswordVerifyEmail = createAsyncThunk<any, string>(
  "forgetPasswordVerifyEmail",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await callApi.post("/forgetPassword/verifyEmail", {
        email,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || "Verify email failed");
    }
  },
);

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

export const resetPassword = createAsyncThunk<
  any,
  { email: string; newPassword: string }
>("resetPassword", async ({ email, newPassword }, { rejectWithValue }) => {
  try {
    const response = await callApi.post("/forgetPassword/resetPassword", {
      email,
      newPassword,
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data || "Reset password failed");
  }
});

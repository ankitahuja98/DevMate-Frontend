import { createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../../api/axiosInstance";

export const fetchUserProfile = createAsyncThunk<any>(
  "fetchUserProfile",
  async () => {
    try {
      const response = await callApi.get("/profile/view");
      return response.data.data;
    } catch (error) {
      console.log("Signup Failed", error);
    }
  }
);

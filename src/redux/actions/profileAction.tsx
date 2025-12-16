import { createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../../api/axiosInstance";
import type { userData } from "../../types/userData";

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

export const editprofile = createAsyncThunk<userData, userData>(
  "editprofile",
  async (userData) => {
    try {
      const response = await callApi.patch("/profile/edit", userData);
      return response.data.data;
    } catch (error) {
      console.log("User data update failed", error);
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../../api/axiosInstance";

export const createOrder = createAsyncThunk<any>(
  "createOrder",
  async (_, { rejectWithValue }) => {
    try {
      const response = await callApi.post("payment/create");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create order"
      );
    }
  }
);

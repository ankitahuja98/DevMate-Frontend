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

interface veripaymentpayload {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export const verifyPayment = createAsyncThunk<any, veripaymentpayload>(
  "verifyPayment",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await callApi.post("payment/verify", payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create order"
      );
    }
  }
);

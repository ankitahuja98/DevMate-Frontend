import { createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../../api/axiosInstance";
import type { sendConnectionData } from "../types/connectionType";
import { toast } from "react-toastify";

export const sendConnection = createAsyncThunk<any, sendConnectionData>(
  "sendConnection",
  async ({ status, toUserId }, { rejectWithValue }) => {
    try {
      const response = await callApi.post(
        `/connectionReq/send/${status}/${toUserId}`
      );
      if (status === "interested") {
        toast.success("Gotcha! you like the user");
      } else if (status === "ignored") {
        toast.warning("Gotcha! you ignored the user");
      }
      return response.data.message;
    } catch (error: any) {
      return rejectWithValue(error.response.data || "Send connection failed");
    }
  }
);

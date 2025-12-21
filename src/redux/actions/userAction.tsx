import { createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../../api/axiosInstance";

export const getAllUsers = createAsyncThunk<any>("getAllUsers", async () => {
  try {
    const response = await callApi("/feed");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

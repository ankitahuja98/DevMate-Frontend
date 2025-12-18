import { createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../../api/axiosInstance";
import type { signupformData, loginformData } from "../types/authType";
import { fetchUserProfile } from "./profileAction";

//Action
export const signup = createAsyncThunk<any, signupformData>(
  "signup",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await callApi.post("/auth/signup", formData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || "Signup failed");
    }
  }
);

export const login = createAsyncThunk<any, loginformData>(
  "login",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      let response = await callApi.post("/auth/login", formData);

      if (response.status === 200) {
        dispatch(fetchUserProfile());
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || "Login failed");
    }
  }
);

export const logout = createAsyncThunk<any>(
  "logout",
  async (__DO_NOT_USE__ActionTypes, { rejectWithValue }) => {
    try {
      let response = await callApi.post("/auth/logout");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || "Logout failed");
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../../api/axiosInstance";
import type { signupformData, loginformData } from "../types/authType";
import { fetchUserProfile } from "./profileAction";

//Action
export const signup = createAsyncThunk<any, signupformData>(
  "signup",
  async (formData) => {
    try {
      const response = await callApi.post("/auth/signup", formData);
      return response.data;
    } catch (error) {
      console.log("Signup Failed", error);
    }
  }
);

export const login = createAsyncThunk<any, loginformData>(
  "login",
  async (formData, { dispatch }) => {
    try {
      let response = await callApi.post("/auth/login", formData);

      if (response.status === 200) {
        dispatch(fetchUserProfile());
      }
      return response.data;
    } catch (error) {
      console.log("Login Failed", error);
    }
  }
);

export const logout = createAsyncThunk<any>("logout", async () => {
  try {
    let response = await callApi.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.log("logout Failed", error);
  }
});

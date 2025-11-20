import { createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../../api/axiosInstance";

interface signupformData {
  name: string;
  email: string;
  password: string;
}

interface loginformData {
  email: string;
  password: string;
}

//Action
export const signup = createAsyncThunk<any, signupformData>(
  "signup",
  async (formData) => {
    try {
      const response = await callApi.post("/signup", formData);
      return response.data;
    } catch (error) {
      console.log("Signup Failed", error);
    }
  }
);

export const login = createAsyncThunk<any, loginformData>(
  "login",
  async (formData) => {
    try {
      let response = await callApi.post("/login", formData);
      console.log("loginresponse", response);
      return response.data;
    } catch (error) {
      console.log("Login Failed", error);
    }
  }
);

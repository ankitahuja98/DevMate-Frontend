import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface authInitialState {
  isLoading: boolean;
  data: any | null;
  isError: boolean;
}

interface signupformData {
  name: string;
  email: string;
  password: string;
}

const initialState: authInitialState = {
  isLoading: false,
  data: null as any,
  isError: false,
};

//Action
export const signup = createAsyncThunk<any, signupformData>(
  "signup",
  async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/signup",
        formData
      );
      return response.data;
    } catch (error) {
      console.log("Signup Failed", error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default authSlice.reducer;

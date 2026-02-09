import { createSlice } from "@reduxjs/toolkit";
import { login, signup, verifyOtp } from "../actions/authAction";
import type { AuthInitialState } from "../types/authType";

const initialState: AuthInitialState = {
  signup: {
    signupIsLoading: false,
    signupData: null,
    signupIsError: false,
  },
  login: {
    loginIsLoading: false,
    loginData: null,
    loginIsError: false,
  },
  verifyOtp: {
    verifyOtpIsLoading: false,
    verifyOtpData: null,
    verifyOtpIsError: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // for signup
    builder.addCase(signup.pending, (state) => {
      state.signup.signupIsLoading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.signup.signupIsLoading = false;
      state.signup.signupData = action.payload;
    });
    builder.addCase(signup.rejected, (state) => {
      state.signup.signupIsLoading = false;
      state.signup.signupIsError = true;
    });

    // for login
    builder.addCase(login.pending, (state) => {
      state.login.loginIsLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.login.loginIsLoading = false;
      state.login.loginData = action.payload;
    });
    builder.addCase(login.rejected, (state) => {
      state.login.loginIsLoading = false;
      state.login.loginIsError = true;
    });

    // for verifyOtp
    builder.addCase(verifyOtp.pending, (state) => {
      state.verifyOtp.verifyOtpIsLoading = true;
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.verifyOtp.verifyOtpIsLoading = false;
      state.verifyOtp.verifyOtpData = action.payload;
    });
    builder.addCase(verifyOtp.rejected, (state) => {
      state.verifyOtp.verifyOtpIsLoading = false;
      state.verifyOtp.verifyOtpIsError = true;
    });
  },
});

export default authSlice.reducer;

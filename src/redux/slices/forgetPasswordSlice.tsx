import { createSlice } from "@reduxjs/toolkit";
import {
  forgetPasswordVerifyEmail,
  resetPassword,
} from "../actions/forgetPasswordAction";
import type { forgetPasswordInitialState } from "../types/forgetPassword";

const initialState: forgetPasswordInitialState = {
  forgetPasswordVerifyEmail: {
    forgetPasswordVerifyEmailIsLoading: false,
    forgetPasswordVerifyEmailData: null,
    forgetPasswordVerifyEmailIsError: false,
  },
  resetPassword: {
    resetPasswordIsLoading: false,
    resetPasswordData: null,
    resetPasswordIsError: false,
  },
};

const forgetPasswordSlice = createSlice({
  name: "forgetPasswordSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // for forgetPasswordVerifyEmail
    builder.addCase(forgetPasswordVerifyEmail.pending, (state) => {
      state.forgetPasswordVerifyEmail.forgetPasswordVerifyEmailIsLoading = true;
    });
    builder.addCase(forgetPasswordVerifyEmail.fulfilled, (state, action) => {
      state.forgetPasswordVerifyEmail.forgetPasswordVerifyEmailIsLoading = false;
      state.forgetPasswordVerifyEmail.forgetPasswordVerifyEmailData =
        action.payload;
    });
    builder.addCase(forgetPasswordVerifyEmail.rejected, (state) => {
      state.forgetPasswordVerifyEmail.forgetPasswordVerifyEmailIsLoading = false;
      state.forgetPasswordVerifyEmail.forgetPasswordVerifyEmailIsError = true;
    });

    // for resetPassword
    builder.addCase(resetPassword.pending, (state) => {
      state.resetPassword.resetPasswordIsLoading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.resetPassword.resetPasswordIsLoading = false;
      state.resetPassword.resetPasswordData = action.payload;
    });
    builder.addCase(resetPassword.rejected, (state) => {
      state.resetPassword.resetPasswordIsLoading = false;
      state.resetPassword.resetPasswordIsError = true;
    });
  },
});

export default forgetPasswordSlice.reducer;

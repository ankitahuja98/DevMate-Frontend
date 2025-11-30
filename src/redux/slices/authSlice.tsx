import { createSlice } from "@reduxjs/toolkit";
import { login, signup } from "../actions/authAction";
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
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // for signup
    builder.addCase(signup.pending, (state, action) => {
      state.signup.signupIsLoading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.signup.signupIsLoading = false;
      state.signup.signupData = action.payload;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.signup.signupIsLoading = false;
      state.signup.signupIsError = true;
    });

    // for login
    builder.addCase(login.pending, (state, action) => {
      state.login.loginIsLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.login.loginIsLoading = false;
      state.login.loginData = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.login.loginIsLoading = false;
      state.login.loginIsError = true;
    });
  },
});

export default authSlice.reducer;

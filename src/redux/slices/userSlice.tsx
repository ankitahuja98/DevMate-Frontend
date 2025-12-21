import { createSlice } from "@reduxjs/toolkit";
import type { userprofileInitialState } from "../types/userType";
import { getAllUsers } from "../actions/userAction";

const initialState: userprofileInitialState = {
  userProfileIsloading: false,
  userProfileData: null,
  userProfileIserror: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.userProfileIsloading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.userProfileIsloading = false;
      state.userProfileData = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.userProfileIsloading = false;
      state.userProfileIserror = true;
    });
  },
});

export default userSlice.reducer;

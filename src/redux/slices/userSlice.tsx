import { createSlice } from "@reduxjs/toolkit";
import type { userprofileInitialState } from "../types/userType";
import { getAllUsers } from "../actions/userAction";

const initialState: userprofileInitialState = {
  userDataIsloading: false,
  userData: null,
  userDataIserror: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.userDataIsloading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.userDataIsloading = false;
      state.userData = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.userDataIsloading = false;
      state.userDataIserror = true;
    });
  },
});

export default userSlice.reducer;

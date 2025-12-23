import { createSlice } from "@reduxjs/toolkit";
import type { userDataInitialState } from "../types/userType";
import { getAllUsers, getAllRequests } from "../actions/userAction";

const initialState: userDataInitialState = {
  userDataIsloading: false,
  userData: null,
  userDataIserror: false,
  requestDataIsloading: false,
  requestData: null,
  requestDataIserror: false,
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
    builder.addCase(getAllRequests.pending, (state, action) => {
      state.requestDataIsloading = true;
    });
    builder.addCase(getAllRequests.fulfilled, (state, action) => {
      state.requestDataIsloading = false;
      state.requestData = action.payload;
    });
    builder.addCase(getAllRequests.rejected, (state, action) => {
      state.requestDataIsloading = false;
      state.requestDataIserror = true;
    });
  },
});

export default userSlice.reducer;

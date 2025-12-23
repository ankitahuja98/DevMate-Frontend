import { createSlice } from "@reduxjs/toolkit";
import type { userDataInitialState } from "../types/userType";
import {
  getAllUsers,
  getAllRequests,
  getAllMatches,
} from "../actions/userAction";

const initialState: userDataInitialState = {
  userDataIsloading: false,
  userData: null,
  userDataIserror: false,
  requestDataIsloading: false,
  requestData: null,
  requestDataIserror: false,
  matchesDataIsloading: false,
  matchesData: null,
  matchesDataIserror: false,
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

    builder.addCase(getAllMatches.pending, (state, action) => {
      state.matchesDataIsloading = true;
    });
    builder.addCase(getAllMatches.fulfilled, (state, action) => {
      state.matchesDataIsloading = false;
      state.matchesData = action.payload;
    });
    builder.addCase(getAllMatches.rejected, (state, action) => {
      state.matchesDataIsloading = false;
      state.matchesDataIserror = true;
    });
  },
});

export default userSlice.reducer;

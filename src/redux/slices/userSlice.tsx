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
  reducers: {
    removeUser(state, action) {
      if (state.userData?.data) {
        state.userData.data = state.userData.data.filter(
          (user: any) => user._id.toString() !== action.payload,
        );
      }
    },
    // Resets the entire feed (used by the Refresh button)
    resetUsers(state) {
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.userDataIsloading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.userDataIsloading = false;

      // At first time feed load
      if (!state.userData) {
        state.userData = action.payload;
        return;
      }

      // after first time feed load
      const existing = new Map();

      // old users
      state.userData.data.forEach((val: any) => {
        existing.set(val._id.toString(), val);
      });

      // new users
      action.payload.data.forEach((val: any) => {
        existing.set(val._id.toString(), val);
      });

      state.userData.data = Array.from(existing.values());
      state.userData.nextCursor = action.payload.nextCursor;
      state.userData.hasMore = action.payload.hasMore;
    });
    builder.addCase(getAllUsers.rejected, (state) => {
      state.userDataIsloading = false;
      state.userDataIserror = true;
    });
    builder.addCase(getAllRequests.pending, (state) => {
      state.requestDataIsloading = true;
    });
    builder.addCase(getAllRequests.fulfilled, (state, action) => {
      state.requestDataIsloading = false;
      state.requestData = action.payload;
    });
    builder.addCase(getAllRequests.rejected, (state) => {
      state.requestDataIsloading = false;
      state.requestDataIserror = true;
    });

    builder.addCase(getAllMatches.pending, (state) => {
      state.matchesDataIsloading = true;
    });
    builder.addCase(getAllMatches.fulfilled, (state, action) => {
      state.matchesDataIsloading = false;
      state.matchesData = action.payload;
    });
    builder.addCase(getAllMatches.rejected, (state) => {
      state.matchesDataIsloading = false;
      state.matchesDataIserror = true;
    });
  },
});
export const { removeUser, resetUsers } = userSlice.actions;
export default userSlice.reducer;

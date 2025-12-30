import { createSlice } from "@reduxjs/toolkit";
import type { ProfileInitialState } from "../types/profileType";
import { fetchUserProfile } from "../actions/profileAction";
import { logout } from "../actions/authAction";

const initialState: ProfileInitialState = {
  userProfile: {
    userProfileIsloading: false,
    userProfileData: null,
    userProfileIserror: false,
  },
  isEditProfileDialogOpen: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setEditProfileDialogOpen: (state, action) => {
      state.isEditProfileDialogOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.userProfile.userProfileIsloading = true;
      state.userProfile.userProfileIserror = false;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.userProfile.userProfileData = action.payload;
      state.userProfile.userProfileIsloading = false;
      state.userProfile.userProfileIserror = false;

      if (action.payload.isNewUser) {
        state.isEditProfileDialogOpen = true;
      }
    });
    builder.addCase(fetchUserProfile.rejected, (state) => {
      state.userProfile.userProfileIserror = true;
      state.userProfile.userProfileIsloading = false;
    });

    // for logout
    builder.addCase(logout.fulfilled, (state) => {
      state.userProfile.userProfileData = null;
    });
  },
});

export const { setEditProfileDialogOpen } = profileSlice.actions;
export default profileSlice.reducer;

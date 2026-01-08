interface userprofileInitialState {
  userProfileIsloading: boolean;
  userProfileData: any | null;
  userProfileIserror: boolean | null;
}

export interface ProfileInitialState {
  userProfile: userprofileInitialState;
  isEditProfileDialogOpen: boolean;
}

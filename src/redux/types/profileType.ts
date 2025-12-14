interface userprofileInitialState {
  userProfileIsloading: boolean;
  userProfileData: any | null;
  userProfileIserror: boolean;
}

export interface ProfileInitialState {
  userProfile: userprofileInitialState;
  isEditProfileDialogOpen: boolean;
}

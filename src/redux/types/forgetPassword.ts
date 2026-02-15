interface forgetPasswordVerifyEmail {
  forgetPasswordVerifyEmailIsLoading: boolean;
  forgetPasswordVerifyEmailData: any | null;
  forgetPasswordVerifyEmailIsError: boolean;
}

interface resetPassword {
  resetPasswordIsLoading: boolean;
  resetPasswordData: any | null;
  resetPasswordIsError: boolean;
}

export interface forgetPasswordInitialState {
  forgetPasswordVerifyEmail: forgetPasswordVerifyEmail;
  resetPassword: resetPassword;
}

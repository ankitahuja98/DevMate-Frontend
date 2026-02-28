export interface signupformData {
  name: string;
  email: string;
  password: string;
}

export interface OtpformData {
  email: string;
  otp: string;
}

export interface resendotpformData {
  email: string;
}

export interface loginformData {
  email: string;
  password: string;
}

interface singupInitialState {
  signupIsLoading: boolean;
  signupData: any | null;
  signupIsError: boolean;
}

interface loginInitialState {
  loginIsLoading: boolean;
  loginData: any | null;
  loginIsError: boolean;
}

interface verifyOtpInitialState {
  verifyOtpIsLoading: boolean;
  verifyOtpData: any | null;
  verifyOtpIsError: boolean;
}

interface resendOtpInitialState {
  resendOtpIsLoading: boolean;
  resendOtpData: any | null;
  resendOtpIsError: boolean;
}

interface googleLoginInitialState {
  GoogleLoginIsLoading: boolean;
  GoogleLoginData: any | null;
  GoogleLoginIsError: boolean;
}

export interface AuthInitialState {
  signup: singupInitialState;
  login: loginInitialState;
  verifyOtp: verifyOtpInitialState;
  resendOtp: resendOtpInitialState;
  googleLogin: googleLoginInitialState;
}

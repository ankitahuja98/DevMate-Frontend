export interface signupformData {
  name: string;
  email: string;
  password: string;
}

export interface OtpformData {
  email: string;
  otp: string;
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

export interface AuthInitialState {
  signup: singupInitialState;
  login: loginInitialState;
  verifyOtp: verifyOtpInitialState;
}

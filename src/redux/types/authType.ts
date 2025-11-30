export interface signupformData {
  name: string;
  email: string;
  password: string;
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

export interface AuthInitialState {
  signup: singupInitialState;
  login: loginInitialState;
}

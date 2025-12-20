export interface signupdata {
  name?: string;
  email?: string;
  password?: string;
}

export interface logindata {
  email?: string;
  password?: string;
}

interface validationErrors {
  [key: string]: any;
}

export const validateSignup = (data: signupdata) => {
  const errors: validationErrors = {};

  if (!data.name || data.name.trim().split(" ").length < 2) {
    errors.name = "Name must be at least 2 words";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = "Enter a valid email";
  }

  if (!data.password || data.password.trim().length < 5) {
    errors.password = "Password must be at least 5 characters";
  }
  return errors;
};

export const validateLogin = (data: logindata) => {
  const errors: validationErrors = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = "Enter a valid email";
  }

  if (!data.password || data.password.trim().length < 1) {
    errors.password = "Enter a Password";
  }

  return errors;
};

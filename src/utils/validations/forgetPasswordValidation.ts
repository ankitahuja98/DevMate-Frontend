interface validationErrors {
  [key: string]: any;
}

export const forgetPasswordEmail = (email: string) => {
  const errors: validationErrors = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    errors.email = "Enter a valid email";
  }
  return errors;
};

export const forgetPasswordPassword = (
  newPassword: string,
  ReEnterNewPassword: string,
) => {
  const errors: validationErrors = {};

  if (!newPassword || !ReEnterNewPassword) {
    errors.password = "Password is required";
    return errors;
  }

  if (newPassword.trim().length < 5) {
    errors.password = "Password must be at least 5 characters";
    return errors;
  }

  if (newPassword.trim() !== ReEnterNewPassword.trim()) {
    errors.password = "Passwords must match";
  }

  return errors;
};

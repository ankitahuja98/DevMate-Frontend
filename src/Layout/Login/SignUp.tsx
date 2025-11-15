import React from "react";
import TextField from "@mui/material/TextField";

const SignUp = () => {
  return (
    <div className="SignupPage p-10 flex flex-col justify-center">
      <form className="flex flex-col gap-5">
        <TextField
          required
          fullWidth
          label="Full Name"
          variant="outlined"
          size="small"
        />
        <TextField
          required
          fullWidth
          label="Email"
          variant="outlined"
          size="small"
        />
        <TextField
          required
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          size="small"
        />

        <button type="submit" className="signinBtn">
          Sign up
        </button>
      </form>

      {/* OR Divider */}
      <div className="flex items-center my-6">
        <span className="flex-grow h-px bg-gray-300"></span>
        <span className="px-3 text-gray-500 text-sm">or</span>
        <span className="flex-grow h-px bg-gray-300"></span>
      </div>

      {/* Google Sign-up */}
      <button className="googleBtn">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/09/Google_Icon.svg"
          alt="Google"
          className="w-5 h-5"
        />
        <span className="text-gray-700 font-medium">Sign up with Google</span>
      </button>
    </div>
  );
};

export default SignUp;

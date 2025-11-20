import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import googleLogo from "../../Images/googleLogo.png";
import { useDispatch } from "react-redux";
import { signup } from "../../redux/actions/authAction";
import type { AppDispatch } from "../../redux/store/store";

const SignUp = () => {
  const [singupform, setSignupform] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch<AppDispatch>();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault(); // ⛔ stop page refresh

    dispatch(signup(singupform));
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setSignupform((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="SignupPage p-10 flex flex-col justify-center">
      <form className="flex flex-col gap-5">
        <TextField
          required
          fullWidth
          label="Full Name"
          variant="outlined"
          size="small"
          name="name"
          value={singupform.name}
          onChange={handleInputChange}
        />
        <TextField
          required
          fullWidth
          label="Email"
          variant="outlined"
          size="small"
          name="email"
          value={singupform.email}
          onChange={handleInputChange}
        />
        <TextField
          required
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          size="small"
          name="password"
          value={singupform.password}
          onChange={handleInputChange}
        />

        <button type="submit" className="signinBtn" onClick={handleSignup}>
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
        <img src={googleLogo} alt="Google" className="w-10 h-5" />
        <span className="text-gray-700 font-medium">Sign in with Google</span>
      </button>
    </div>
  );
};

export default SignUp;

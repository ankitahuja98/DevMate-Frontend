import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import googleLogo from "../../Images/googleLogo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  store,
  type AppDispatch,
  type RootState,
} from "../../redux/store/store";
import { login } from "../../redux/actions/authAction";

const SignIn = () => {
  const [loginformData, setloginformData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(login(loginformData));
  };

  const handleInputChange = (e: any) => {
    const { value, name } = e.target;

    setloginformData((prev) => ({ ...prev, [name]: value }));
  };

  const data = useSelector((store: RootState) => store.auth.login.loginData);

  console.log("logindata", data);

  return (
    <div className="SigninPage p-10 flex flex-col justify-center">
      <form className="flex flex-col gap-5">
        <TextField
          required
          fullWidth
          label="Email"
          variant="outlined"
          size="small"
          name="email"
          value={loginformData.email}
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
          value={loginformData.password}
          onChange={handleInputChange}
        />

        <button type="submit" className="signinBtn" onClick={handleLogin}>
          Sign in
        </button>
      </form>

      {/* OR Divider */}
      <div className="flex items-center my-6">
        <span className="flex-grow h-px bg-gray-300"></span>
        <span className="px-3 text-gray-500 text-sm">or</span>
        <span className="flex-grow h-px bg-gray-300"></span>
      </div>

      {/* Google Sign-in */}
      <button className="googleBtn">
        <img src={googleLogo} alt="Google" className="w-10 h-5" />
        <span className="text-gray-700 font-medium">Sign in with Google</span>
      </button>
    </div>
  );
};

export default SignIn;

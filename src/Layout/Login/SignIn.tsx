import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import googleLogo from "../../Images/googleLogo.png";
import { useDispatch } from "react-redux";
import { useAppSelector, type AppDispatch } from "../../redux/store/store";
import { login } from "../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  validateLogin,
  type logindata,
} from "../../utils/validations/loginValidation";
import { Box } from "@mui/material";

const SignIn = () => {
  const [loginformData, setloginformData] = useState({
    email: "Rahul@gmail.com",
    password: "Rahul",
  });
  const [errors, setErros] = useState<logindata>({});

  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const isErrors = validateLogin(loginformData);
    setErros(isErrors);

    if (Object.keys(isErrors).length !== 0) {
      return;
    } else {
      dispatch(login(loginformData))
        .unwrap()
        .then((res) => {
          toast.success(res.message);
          setloginformData({
            email: "",
            password: "",
          });
        })
        .catch((err) => toast.error(err.message));
    }
  };

  const handleInputChange = (e: any) => {
    const { value, name } = e.target;

    setloginformData((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();

  const data = useAppSelector((store) => store.auth.login.loginData);
  const isUser = useAppSelector(
    (store) => store.profile.userProfile.userProfileData
  );

  useEffect(() => {
    if (isUser) {
      navigate("/feed");
    }
  }, [isUser]);

  const ErrorMessage = ({ error }: { error?: string }) => {
    if (!error) return null;
    return <p style={{ fontSize: "11px", color: "red" }}>{error}</p>;
  };

  return (
    <div className="SigninPage p-10 flex flex-col justify-center">
      <form className="flex flex-col gap-5">
        <Box>
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
          <ErrorMessage error={errors.email} />
        </Box>

        <Box>
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
          <ErrorMessage error={errors.password} />
        </Box>

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

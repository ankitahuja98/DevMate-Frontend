import React, { useEffect, useState, type SetStateAction } from "react";
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

const SignIn = ({
  setIsSignIn,
}: {
  setIsSignIn: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [loginformData, setloginformData] = useState({
    email: "neha@gmail.com",
    password: "neha",
  });
  const [isForgetPassword, setIsForgetPassword] = useState(false);
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
    <div className="MobileSigninPage flex flex-col justify-center">
      <div className="mb-6">
        <span className="text-xl font-bold">Welcome Back</span>
      </div>
      <form className="flex flex-col gap-4">
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
            label={isForgetPassword ? "Set new password" : "password"}
            type="password"
            variant="outlined"
            size="small"
            name="password"
            value={loginformData.password}
            onChange={handleInputChange}
          />
          <ErrorMessage error={errors.password} />
          {!isForgetPassword && (
            <Box
              className="text-xs text-end font-semibold mt-1 cursor-pointer"
              style={{ color: "#3C4B70" }}
              onClick={() => setIsForgetPassword(true)}
            >
              Forget password?
            </Box>
          )}
        </Box>

        <button type="submit" className="MobilesigninBtn" onClick={handleLogin}>
          {isForgetPassword ? "Submit" : "Sign in"}
        </button>
      </form>

      {/* OR Divider */}
      <div className="flex items-center my-3">
        <span className="flex-grow h-px bg-gray-300"></span>
        <span className="px-3 text-gray-500 text-sm">or</span>
        <span className="flex-grow h-px bg-gray-300"></span>
      </div>

      {/* Google Sign-in */}
      <button className="MobilegoogleBtn">
        <img src={googleLogo} alt="Google" className="MobileGoogleLogo" />
        <span className="text-gray-700 font-medium">Sign in with Google</span>
      </button>

      <div className="text-center mt-3 text-xs">
        <span className="text-gray-500">New here? </span>
        <span
          className="font-semibold cursor-pointer underline"
          style={{ color: "#3C4B70" }}
          onClick={() => setIsSignIn((prev) => !prev)}
        >
          Create an account
        </span>
      </div>
    </div>
  );
};

export default SignIn;

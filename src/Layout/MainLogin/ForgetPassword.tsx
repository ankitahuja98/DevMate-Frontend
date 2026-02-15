import React, { useState, type SetStateAction } from "react";
import TextField from "@mui/material/TextField";
import googleLogo from "../../Images/googleLogo.avif";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../redux/store/store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { forgetPasswordVerifyEmail } from "../../redux/actions/forgetPasswordAction";
import VerifyEmail from "../../Components/VerifyEmail";

const ForgetPassword = ({
  setIsForgetPassword,
}: {
  setIsForgetPassword: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [FPEmail, setFPEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [FPPassword, setFPPassword] = useState({
    newPassword: "",
    ReEnterNewPassword: "",
  });

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handlePasswordChange = (e: any) => {
    const { value, name } = e.target;

    setFPPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEmailVerified && !isOtpVerified) {
      dispatch(forgetPasswordVerifyEmail(FPEmail))
        .unwrap()
        .then(() => setIsEmailVerified(true))
        .catch((err) => toast.error(err.message));
    }
  };

  return (
    <div className="SigninPage p-10 flex flex-col justify-center">
      <div className="mb-5">
        <span className="text-xl font-bold">Forget Password</span>
      </div>
      <form className="flex flex-col gap-5">
        {!isEmailVerified && !isOtpVerified && (
          <Box>
            <TextField
              required
              fullWidth
              label="Email"
              variant="outlined"
              size="small"
              name="email"
              value={FPEmail}
              onChange={(e) => setFPEmail(e.target.value)}
            />
            {/* <ErrorMessage error={errors.email} /> */}
          </Box>
        )}

        {/* {isEmailVerified && !isOtpVerified && (
          <VerifyEmail
          
          />
        )} */}

        {isEmailVerified && isOtpVerified && (
          <>
            <Box>
              <TextField
                required
                fullWidth
                label="Set new password"
                type="password"
                variant="outlined"
                size="small"
                name="newPassword"
                value={FPPassword.newPassword}
                onChange={handlePasswordChange}
              />
              {/* <ErrorMessage error={errors.password} /> */}
            </Box>

            <Box>
              <TextField
                required
                fullWidth
                label="Re-enter new password"
                type="password"
                variant="outlined"
                size="small"
                name="ReEnterNewPassword"
                value={FPPassword.ReEnterNewPassword}
                onChange={handlePasswordChange}
              />
              {/* <ErrorMessage error={errors.password} /> */}
            </Box>
          </>
        )}

        <Box
          className="text-xs text-end font-semibold mt-1 cursor-pointer"
          style={{ color: "#3C4B70" }}
          onClick={() => setIsForgetPassword(false)}
        >
          Back to login
        </Box>

        <button type="submit" className="signinBtn" onClick={handleSubmit}>
          Submit
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

export default ForgetPassword;

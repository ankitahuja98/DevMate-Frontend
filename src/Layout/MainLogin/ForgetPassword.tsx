import React, { useState, type SetStateAction } from "react";
import TextField from "@mui/material/TextField";
import googleLogo from "../../Images/googleLogo.avif";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../redux/store/store";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import {
  forgetPasswordVerifyEmail,
  resetPassword,
} from "../../redux/actions/forgetPasswordAction";
import VerifyEmail from "../../Components/VerifyEmail";
import { resendOtp, verifyOtp } from "../../redux/actions/authAction";
import {
  forgetPasswordEmail,
  forgetPasswordPassword,
} from "../../utils/validations/forgetPasswordValidation";

const ForgetPassword = ({
  setIsForgetPassword,
  isMobile,
}: {
  setIsForgetPassword: React.Dispatch<SetStateAction<boolean>>;
  isMobile: boolean;
}) => {
  const [FPEmail, setFPEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isOtpvVrifying, setIsOtpvVrifying] = useState<boolean>(false);
  const [FPPassword, setFPPassword] = useState({
    newPassword: "",
    ReEnterNewPassword: "",
  });

  const [errors, setErros] = useState<any>({});

  const dispatch = useDispatch<AppDispatch>();

  const handlePasswordChange = (e: any) => {
    const { value, name } = e.target;

    setFPPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEmailVerified && !isOtpVerified) {
      const isErrors = forgetPasswordEmail(FPEmail);
      setErros(isErrors);
      if (Object.keys(isErrors).length !== 0) {
        return;
      } else {
        dispatch(forgetPasswordVerifyEmail(FPEmail))
          .unwrap()
          .then(() => {
            setIsEmailVerified(true);
            setIsOtpvVrifying(true);
          })
          .catch((err) => toast.error(err.message));
      }
    } else if (isEmailVerified && isOtpVerified) {
      const isErrors = forgetPasswordPassword(
        FPPassword.newPassword,
        FPPassword.ReEnterNewPassword,
      );
      setErros(isErrors);
      if (Object.keys(isErrors).length !== 0) {
        return;
      } else {
        dispatch(
          resetPassword({
            email: FPEmail,
            newPassword: FPPassword.newPassword,
          }),
        )
          .unwrap()
          .then((res) => {
            toast.success(res.message);
            setIsForgetPassword(false);
          })
          .catch((err) => toast.error(err.message));
      }
    }
  };

  const ErrorMessage = ({ error }: { error?: string }) => {
    if (!error) return null;
    return <p style={{ fontSize: "11px", color: "red" }}>{error}</p>;
  };

  return (
    <div
      className={`${isMobile ? "MobileSigninPage" : "SigninPage p-10"}  flex flex-col justify-center`}
    >
      {!isOtpvVrifying && (
        <div className="mb-5">
          <span className="text-xl font-bold">Forget Password</span>
        </div>
      )}
      <form className="flex flex-col">
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
            <ErrorMessage error={errors.email} />
          </Box>
        )}

        {isEmailVerified && !isOtpVerified && (
          <VerifyEmail
            email={FPEmail}
            purpose="forgotPassword"
            verifyAction={verifyOtp}
            resendAction={resendOtp}
            title="Verify reset code"
            description="Enter the 6-digit code sent to your email to reset your password."
            onSuccess={() => {
              setIsOtpVerified(true);
              setIsOtpvVrifying(false);
            }}
          />
        )}

        {isEmailVerified && isOtpVerified && (
          <>
            <Box style={{ marginBottom: "15px" }}>
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
              <ErrorMessage error={errors.password} />
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
              <ErrorMessage error={errors.password} />
            </Box>
          </>
        )}

        {!isOtpvVrifying && (
          <>
            <Box
              className="text-xs text-end font-semibold mt-1 mb-4 cursor-pointer"
              style={{ color: "#3C4B70" }}
              onClick={() => setIsForgetPassword(false)}
            >
              Back to login
            </Box>

            <button type="submit" className="signinBtn" onClick={handleSubmit}>
              Submit
            </button>
          </>
        )}
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

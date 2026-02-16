import React, { useState, type SetStateAction } from "react";
import TextField from "@mui/material/TextField";
import googleLogo from "../../Images/googleLogo.avif";
import { toast } from "react-toastify";

import {
  validateSignup,
  type signupdata,
} from "../../utils/validations/loginValidation";
import { Box } from "@mui/material";
import VerifyEmail from "../../Components/VerifyEmail";
import { resendOtp, signup, verifyOtp } from "../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../redux/store/store";

const SignUp = ({
  setIsSignIn,
}: {
  setIsSignIn: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [singupform, setSignupform] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErros] = useState<signupdata>({});
  const [isOtpvVrifying, setIsOtpvVrifying] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault(); // ⛔ stop page refresh

    const isErrors = validateSignup(singupform);

    setErros(isErrors);
    if (Object.keys(isErrors).length !== 0) {
      return;
    } else {
      dispatch(signup(singupform))
        .unwrap()
        .then(() => {
          // toast.success(res.message);
          setIsOtpvVrifying(true);
        })
        .catch((err) => toast.error(err.message));
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setSignupform((prev) => ({ ...prev, [name]: value }));
  };

  const ErrorMessage = ({ error }: { error?: string }) => {
    if (!error) return null;
    return <p style={{ fontSize: "11px", color: "red" }}>{error}</p>;
  };

  return (
    <div className="SignupPage p-6 sm:p-10 flex flex-col justify-center">
      {!isOtpvVrifying ? (
        <form className="flex flex-col gap-4 sm:gap-5">
          <Box>
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
            <ErrorMessage error={errors.name} />
          </Box>
          <Box>
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
            <ErrorMessage error={errors.email} />
          </Box>
          <Box>
            <TextField
              required
              fullWidth
              label="Set Password"
              type="password"
              variant="outlined"
              size="small"
              name="password"
              value={singupform.password}
              onChange={handleInputChange}
            />
            <ErrorMessage error={errors.password} />
          </Box>

          <button type="submit" className="signinBtn" onClick={handleSignup}>
            Sign up
          </button>
        </form>
      ) : (
        <VerifyEmail
          email={singupform.email}
          purpose="signup"
          verifyAction={verifyOtp}
          resendAction={resendOtp}
          title="Verify your email"
          description="Enter the 6-digit code sent to your email to complete registration."
          verifyotpSuccessToastMsg="Your account has been created successfully"
          onSuccess={() => {
            setIsOtpvVrifying(false);
            setIsSignIn(true);
          }}
        />
      )}

      {/* OR Divider */}
      <div className="flex items-center my-6">
        <span className="flex-grow h-px bg-gray-300"></span>
        <span className="px-3 text-gray-500 text-sm">or</span>
        <span className="flex-grow h-px bg-gray-300"></span>
      </div>

      {/* Google Sign-up */}
      <button className="googleBtn">
        <img src={googleLogo} alt="Google" className="w-8 h-4 sm:w-10 sm:h-5" />
        <span className="text-gray-700 font-medium">Sign in with Google</span>
      </button>
    </div>
  );
};
export default SignUp;

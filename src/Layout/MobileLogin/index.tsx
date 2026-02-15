import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import "./Login.css";
import { useAppSelector } from "../../redux/store/store";
import LoadingThreeDotsPulse from "../../Components/Loader";

const LoginSignup = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  const { signupIsLoading } = useAppSelector((store) => store.auth.signup);
  const { loginIsLoading } = useAppSelector((store) => store.auth.login);
  const { verifyOtpIsLoading } = useAppSelector(
    (store) => store.auth.verifyOtp,
  );
  const { resendOtpIsLoading } = useAppSelector(
    (store) => store.auth.resendOtp,
  );
  const { forgetPasswordVerifyEmailIsLoading } = useAppSelector(
    (store) => store.forgetPassword.forgetPasswordVerifyEmail,
  );
  const { resetPasswordIsLoading } = useAppSelector(
    (store) => store.forgetPassword.resetPassword,
  );

  return (
    <div className="MobileloginContainer h-screen flex justify-center items-center">
      <div className="relative min-h-5/12 max-h-10/12 min-w-9/12 max-w-11/12 rounded-2xl overflow-hidden shadow-xl bg-white">
        {(signupIsLoading ||
          loginIsLoading ||
          verifyOtpIsLoading ||
          resendOtpIsLoading ||
          forgetPasswordVerifyEmailIsLoading ||
          resetPasswordIsLoading) && (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-white/60">
            <LoadingThreeDotsPulse />
          </div>
        )}

        {/* Forms Start*/}
        <div className={`forms-container ${isSignIn ? "active" : "active"}`}>
          {isSignIn ? (
            <SignIn setIsSignIn={setIsSignIn} />
          ) : (
            <SignUp setIsSignIn={setIsSignIn} />
          )}
        </div>
        {/* Forms Ends*/}
      </div>
    </div>
  );
};

export default LoginSignup;

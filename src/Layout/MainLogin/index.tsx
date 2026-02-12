import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import "./Login.css";
import AppLogo from "../../Images/devmateLogo-white.avif";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store/store";
import LoadingThreeDotsPulse from "../../Components/Loader";

const LoginSignup = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const navigate = useNavigate();
  const handleTypeChange = () => {
    setIsSignIn(!isSignIn);
  };
  const { signupIsLoading } = useAppSelector((store) => store.auth.signup);
  const { loginIsLoading } = useAppSelector((store) => store.auth.login);
  const { verifyOtpIsLoading } = useAppSelector(
    (store) => store.auth.verifyOtp,
  );
  const { resendOtpIsLoading } = useAppSelector(
    (store) => store.auth.resendOtp,
  );

  return (
    <div className="loginContainer h-screen flex justify-center items-center">
      <div
        className="relative w-full sm:w-10/12 lg:w-7/12 rounded-2xl overflow-hidden shadow-xl bg-white"
        style={{ height: "70%" }}
      >
        {(signupIsLoading ||
          loginIsLoading ||
          verifyOtpIsLoading ||
          resendOtpIsLoading) && (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-white/60">
            <LoadingThreeDotsPulse />
          </div>
        )}

        {/* Sliding Panel Start*/}
        <div className={`slider ${isSignIn ? "SignUp" : "SignIn"} `}>
          <div className="px-5 ">
            <img
              src={AppLogo}
              alt="DevMate"
              className="cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>
          {isSignIn ? (
            <div className="text-center p-7 ">
              <p className="text-2xl font-bold mb-3">Welcome Back to DevMate</p>
              <p className="text-sm mb-5">
                Your space to meet developers, share ideas, discover
                collaborators, and grow together in tech.
              </p>
              <button
                className="sliderBtn"
                id="signIn"
                onClick={handleTypeChange}
              >
                Sign up
              </button>
            </div>
          ) : (
            <div className="text-center p-7">
              <p className="text-2xl font-bold mb-3">
                Start Your DevMate Journey
              </p>
              <p className="text-sm mb-5">
                Match with developers, exchange ideas, and discover exciting
                opportunities.
              </p>
              <button
                className="sliderBtn"
                id="signIn"
                onClick={handleTypeChange}
              >
                Sign in
              </button>
            </div>
          )}
        </div>
        {/* Sliding Panel Ends*/}

        {/* Forms Start*/}
        <div className={`forms-container ${isSignIn ? "active" : "active"}`}>
          {isSignIn ? <SignIn /> : <SignUp setIsSignIn={setIsSignIn} />}
        </div>
        {/* Forms Ends*/}
      </div>
    </div>
  );
};

export default LoginSignup;

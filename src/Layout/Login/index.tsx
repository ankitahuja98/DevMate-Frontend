import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import "./Login.css";

const LoginSignup = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleTypeChange = () => {
    setIsSignIn(!isSignIn);
  };
  return (
    <div className="bg-gray-200 h-screen flex justify-center items-center">
      <div className="relative h-8/12 w-7/12 rounded-2xl overflow-hidden shadow-xl bg-white">
        {/* Sliding Panel Start*/}
        <div className={`slider  ${isSignIn ? "SignUp" : "SignIn"} `}>
          {isSignIn ? (
            <div className="text-center p-7">
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
          {isSignIn ? <SignIn /> : <SignUp />}
          {/* <SignIn /> <SignUp /> */}
        </div>
        {/* Forms Ends*/}
      </div>
    </div>
  );
};

export default LoginSignup;

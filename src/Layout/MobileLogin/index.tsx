import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import "./Login.css";

const LoginSignup = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  const handleTypeChange = () => {
    setIsSignIn(!isSignIn);
  };
  return (
    <div className="MobileloginContainer h-screen flex justify-center items-center">
      <div className="relative min-h-7/12 max-h-10/12 min-w-9/12 max-w-11/12 rounded-2xl overflow-hidden shadow-xl bg-white">
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

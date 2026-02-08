import { Box } from "@mui/material";
import React, { useEffect, useRef, useState, type SetStateAction } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signup } from "../redux/actions/authAction";
import type { AppDispatch } from "../redux/store/store";

type SignupFormType = {
  name: string;
  email: string;
  password: string;
};

const VerifyEmail = ({
  setIsOtpvVrifying,
  singupform,
  setSignupform,
}: {
  setIsOtpvVrifying: React.Dispatch<SetStateAction<boolean>>;
  singupform: SignupFormType;
  setSignupform: React.Dispatch<SetStateAction<SignupFormType>>;
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputref = useRef<(HTMLInputElement | null)[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    ind: number,
  ) => {
    const value = e.target.value;

    if (!/^\d?$/.test(value)) return; // allow only numbers

    let newArr = [...otp];
    newArr[ind] = value;
    setOtp(newArr);

    // move focus to next input
    if (value && ind < 5) {
      inputref.current[ind + 1]?.focus();
    }
  };

  useEffect(() => {
    inputref.current[0]?.focus();
  }, []);

  const handleVerifyOtp = () => {
    setIsOtpvVrifying(false);

    dispatch(signup(singupform))
      .unwrap()
      .then((res) => {
        toast.success(res.message);

        setSignupform({
          name: "",
          email: "",
          password: "",
        });
      })
      .catch((err) => toast.error(err.message));
  };

  const handleOtpClear = (
    e: React.KeyboardEvent<HTMLInputElement>,
    ind: number,
  ) => {
    if (e.key === "Backspace" && !otp[ind] && ind > 0) {
      inputref.current[ind - 1]?.focus();
    }
  };

  return (
    <div className="w-full flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white p-2 rounded-2xl flex flex-col items-center gap-6">
        {/* Header */}
        <div className="text-center">
          <p className="text-xl sm:text-2xl font-semibold text-gray-800">
            Verify your email
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        {/* OTP inputs */}
        <div className="flex justify-center gap-2 sm:gap-3">
          {otp.map((val, ind) => (
            <Box key={ind}>
              <input
                ref={(refInput) => {
                  inputref.current[ind] = refInput;
                }}
                className="
                  w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9
                  text-center text-base sm:text-lg
                  border border-gray-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-[#3c4b70]
                "
                type="text"
                value={val}
                onChange={(e) => handleOtpChange(e, ind)}
                maxLength={1}
                onKeyDown={(e) => handleOtpClear(e, ind)}
              />
            </Box>
          ))}
        </div>

        {/* Resend */}
        <div className="text-xs sm:text-sm text-gray-500 text-center">
          Didn't receive the code?{" "}
          <span className="text-[#3c4b70] font-medium cursor-pointer hover:underline">
            Resend
          </span>
        </div>

        {/* Button */}
        <button
          type="button"
          className="signinBtn mt-2"
          onClick={handleVerifyOtp}
        >
          Verify Email
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;

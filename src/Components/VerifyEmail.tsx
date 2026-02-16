import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store/store";

type VerifyOtpProps = {
  email: string;
  purpose: string;
  onSuccess: () => void;
  verifyAction: any;
  resendAction: any;
  title: string;
  description: string;
  verifyotpSuccessToastMsg?: string;
};

const VerifyEmail = ({
  email,
  purpose,
  onSuccess,
  verifyAction,
  resendAction,
  title,
  description,
  verifyotpSuccessToastMsg,
}: VerifyOtpProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [isResendActive, setIsResendActive] = useState<boolean>(true);
  const [resendTimer, setResendTimer] = useState<number>(60);
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

  const otpFormData = {
    email: email,
    otp: otp.join(""),
  };

  const handleVerifyOtp = () => {
    dispatch(verifyAction(otpFormData))
      .unwrap()
      .then(() => {
        if (title === "Verify your email") {
          toast.success(verifyotpSuccessToastMsg);
        }

        onSuccess();
        setOtp(new Array(6).fill(""));
      })
      .catch((err: any) => toast.error(err.message));
  };

  const handleOtpClear = (
    e: React.KeyboardEvent<HTMLInputElement>,
    ind: number,
  ) => {
    if (e.key === "Backspace" && !otp[ind] && ind > 0) {
      inputref.current[ind - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.slice(0, 6).split("");
    const newOtp = [...otp];

    digits.forEach((digit, i) => {
      newOtp[i] = digit;
      if (inputref.current[i]) {
        inputref.current[i]!.value = digit;
      }
    });

    setOtp(newOtp);

    // focus last filled input
    const lastIndex = digits.length - 1;
    if (lastIndex >= 0 && lastIndex < 6) {
      inputref.current[lastIndex]?.focus();
    }
  };

  const handleResend = () => {
    if (!isResendActive) return;

    dispatch(resendAction({ email: email, purpose: purpose }))
      .unwrap()
      .then((res: any) => {
        toast.success(res.message);
        setOtp(new Array(6).fill(""));
        setIsResendActive(false);
        setResendTimer(60);
      })
      .catch((err: any) => toast.error(err.message));
  };

  useEffect(() => {
    if (!isResendActive && resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (resendTimer === 0) {
      setIsResendActive(true);
    }
  }, [resendTimer, isResendActive]);

  const isOtpComplete = otp.every((d) => d !== "");

  return (
    <div className="w-full flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white p-2 rounded-2xl flex flex-col items-center gap-6">
        {/* Header */}
        <div className="text-center">
          <p className="text-xl sm:text-2xl font-semibold text-gray-800">
            {title}
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">{description}</p>
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
                onPaste={handleOtpPaste}
              />
            </Box>
          ))}
        </div>

        {/* Resend */}
        <div className="text-xs sm:text-sm text-gray-500 text-center">
          Didn't receive the code?{" "}
          <button
            type="button"
            className={`hover:underline ${isResendActive ? "text-[#3c4b70] cursor-pointer font-medium" : "text-gray-400 cursor-wait"} `}
            onClick={handleResend}
            disabled={!isResendActive}
          >
            Resend
          </button>{" "}
          {!isResendActive && (
            <span className="text-gray-400">({resendTimer} Sec)</span>
          )}
        </div>

        {/* Button */}
        <button
          type="button"
          className="signinBtn mt-2"
          disabled={!isOtpComplete}
          onClick={handleVerifyOtp}
        >
          Verify Email
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;

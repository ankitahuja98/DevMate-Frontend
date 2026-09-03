import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ArrowLeft, Lock, Mail } from "lucide-react";
import { useAppSelector, type AppDispatch } from "../../redux/store/store";
import {
  forgetPasswordVerifyEmail,
  resetPassword,
} from "../../redux/actions/forgetPasswordAction";
import { resendOtp, verifyOtp } from "../../redux/actions/authAction";
import {
  forgetPasswordEmail,
  forgetPasswordPassword,
} from "../../utils/validations/forgetPasswordValidation";
import VerifyEmail from "../../Components/VerifyEmail";
import { Field, PasswordField, SubmitButton } from "./AuthPrimitives";

/* Three steps on one surface: ask for the email, verify the code,
   set the new password. Tracking them as a single `step` value (rather
   than two independent booleans, as before) means there is exactly one
   place that decides what the card is currently showing. */
type Step = "email" | "otp" | "password";

const COPY: Record<Step, { title: string; lead: string }> = {
  email: {
    title: "Reset your password",
    lead: "Enter your account email and we'll send you a verification code.",
  },
  otp: { title: "", lead: "" }, // VerifyEmail draws its own header
  password: {
    title: "Set a new password",
    lead: "Choose a password you haven't used on Devmate before.",
  },
};

const ForgotPasswordForm = ({ onBackToSignIn }: { onBackToSignIn: () => void }) => {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [passwords, setPasswords] = useState({
    newPassword: "",
    ReEnterNewPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const dispatch = useDispatch<AppDispatch>();
  const { forgetPasswordVerifyEmailIsLoading } = useAppSelector(
    (store) => store.forgetPassword.forgetPasswordVerifyEmail,
  );
  const { resetPasswordIsLoading } = useAppSelector(
    (store) => store.forgetPassword.resetPassword,
  );

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, password: undefined }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (step === "email") {
      const foundErrors = forgetPasswordEmail(email);
      setErrors(foundErrors);
      if (Object.keys(foundErrors).length !== 0) return;

      dispatch(forgetPasswordVerifyEmail(email))
        .unwrap()
        .then(() => setStep("otp"))
        .catch((err) => toast.error(err.message));
      return;
    }

    if (step === "password") {
      const foundErrors = forgetPasswordPassword(
        passwords.newPassword,
        passwords.ReEnterNewPassword,
      );
      setErrors(foundErrors);
      if (Object.keys(foundErrors).length !== 0) return;

      dispatch(resetPassword({ email, newPassword: passwords.newPassword }))
        .unwrap()
        .then((res) => {
          toast.success(res.message);
          onBackToSignIn();
        })
        .catch((err) => toast.error(err.message));
    }
  };

  const backLink = (
    <button
      type="button"
      className="au-link au-focus inline-flex items-center gap-1.5"
      onClick={onBackToSignIn}
    >
      <ArrowLeft size={15} strokeWidth={2.2} aria-hidden="true" />
      Back to sign in
    </button>
  );

  if (step === "otp") {
    return (
      <div className="flex flex-col">
        <VerifyEmail
          email={email}
          purpose="forgotPassword"
          verifyAction={verifyOtp}
          resendAction={resendOtp}
          title="Verify reset code"
          description={`Enter the 6-digit code we sent to ${email}.`}
          onSuccess={() => setStep("password")}
        />
        <div className="text-center mt-[clamp(10px,2.2dvh,24px)]">{backLink}</div>
      </div>
    );
  }

  return (
    <>
      <header>
        <h2 className="au-h1">{COPY[step].title}</h2>
        <span
          aria-hidden="true"
          className="au-rule block w-10 h-[3px] rounded-full"
          style={{ background: "var(--au-grad)" }}
        />
        <p className="au-lead text-[14.5px] text-[color:var(--au-ink-soft)]">
          {COPY[step].lead}
        </p>
      </header>

      <form className="au-form" onSubmit={handleSubmit} noValidate>
        {step === "email" && (
          <Field
            label="Email address"
            icon={Mail}
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            disabled={forgetPasswordVerifyEmailIsLoading}
            error={errors.email}
          />
        )}

        {step === "password" && (
          <>
            <PasswordField
              label="New password"
              icon={Lock}
              name="newPassword"
              autoComplete="new-password"
              placeholder="At least 5 characters"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              disabled={resetPasswordIsLoading}
              error={errors.password}
            />
            <PasswordField
              label="Confirm new password"
              icon={Lock}
              name="ReEnterNewPassword"
              autoComplete="new-password"
              placeholder="Re-enter your new password"
              value={passwords.ReEnterNewPassword}
              onChange={handlePasswordChange}
              disabled={resetPasswordIsLoading}
            />
          </>
        )}

        <div className="mt-2">
          <SubmitButton
            loading={
              step === "email"
                ? forgetPasswordVerifyEmailIsLoading
                : resetPasswordIsLoading
            }
            loadingLabel={step === "email" ? "Sending code…" : "Updating…"}
          >
            {step === "email" ? "Send verification code" : "Update password"}
          </SubmitButton>
        </div>
      </form>

      <div className="text-center mt-[clamp(10px,2.2dvh,24px)]">{backLink}</div>
    </>
  );
};

export default ForgotPasswordForm;

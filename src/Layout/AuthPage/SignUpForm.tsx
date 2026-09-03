import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import { useAppSelector, type AppDispatch } from "../../redux/store/store";
import { resendOtp, signup, verifyOtp } from "../../redux/actions/authAction";
import {
  validateSignup,
  type signupdata,
} from "../../utils/validations/loginValidation";
import VerifyEmail from "../../Components/VerifyEmail";
import SigninWithGoogle from "../../Components/SigninWithGoogle";
import { Divider, Field, PasswordField, SubmitButton } from "./AuthPrimitives";

const SignUpForm = ({
  onSwitchToSignIn,
}: {
  onSwitchToSignIn: () => void;
}) => {
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<signupdata>({});
  const [isVerifying, setIsVerifying] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { signupIsLoading } = useAppSelector((store) => store.auth.signup);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();

    const foundErrors = validateSignup(signupForm);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length !== 0) return;

    dispatch(signup(signupForm))
      .unwrap()
      .then(() => setIsVerifying(true))
      .catch((err) => toast.error(err.message));
  };

  /* The OTP step replaces the form entirely rather than sitting under
     it — there's nothing left to edit once the code has been sent. */
  if (isVerifying) {
    return (
      <VerifyEmail
        email={signupForm.email}
        purpose="signup"
        verifyAction={verifyOtp}
        resendAction={resendOtp}
        title="Verify your email"
        description={`Enter the 6-digit code we sent to ${signupForm.email}.`}
        verifyotpSuccessToastMsg="Your account has been created successfully"
        onSuccess={() => {
          setIsVerifying(false);
          onSwitchToSignIn();
        }}
      />
    );
  }

  return (
    <>
      <header>
        <h2 className="au-h1">Create your account</h2>
        <span
          aria-hidden="true"
          className="au-rule block w-10 h-[3px] rounded-full"
          style={{ background: "var(--au-grad)" }}
        />
        <p className="au-lead text-[14.5px] text-[color:var(--au-ink-soft)]">
          Join Devmate and start building with other developers.
        </p>
      </header>

      <form className="au-form" onSubmit={handleSignup} noValidate>
        <Field
          label="Full name"
          icon={User}
          name="name"
          autoComplete="name"
          placeholder="Ada Lovelace"
          value={signupForm.name}
          onChange={handleInputChange}
          disabled={signupIsLoading}
          error={errors.name}
        />

        <Field
          label="Email address"
          icon={Mail}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={signupForm.email}
          onChange={handleInputChange}
          disabled={signupIsLoading}
          error={errors.email}
        />

        <PasswordField
          label="Password"
          icon={Lock}
          name="password"
          autoComplete="new-password"
          placeholder="At least 5 characters"
          value={signupForm.password}
          onChange={handleInputChange}
          disabled={signupIsLoading}
          error={errors.password}
        />

        <div className="mt-2">
          <SubmitButton
            loading={signupIsLoading}
            loadingLabel="Creating account…"
            icon={
              <ArrowRight
                size={18}
                strokeWidth={2.2}
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            }
          >
            Create account
          </SubmitButton>
        </div>
      </form>

      <Divider />

      <SigninWithGoogle label="Continue with Google" />

      {/* Below lg only: on the split layout the header already offers
          "Already a member? Sign in", and a third copy of the same
          control costs sign-up the headroom it needs on a laptop. */}
      <p className="au-card-switch lg:hidden text-center text-[13.5px] text-[color:var(--au-ink-soft)] mt-[clamp(10px,2.2dvh,24px)]">
        Already have an account?{" "}
        <button
          type="button"
          className="au-link au-focus"
          onClick={onSwitchToSignIn}
        >
          Sign in
        </button>
      </p>
    </>
  );
};

export default SignUpForm;

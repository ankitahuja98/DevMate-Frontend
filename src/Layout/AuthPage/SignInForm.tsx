import { useEffect, useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { useAppSelector, type AppDispatch } from "../../redux/store/store";
import { login } from "../../redux/actions/authAction";
import {
  validateLogin,
  type logindata,
} from "../../utils/validations/loginValidation";
import SigninWithGoogle from "../../Components/SigninWithGoogle";
import {
  Checkbox,
  Divider,
  Field,
  PasswordField,
  SubmitButton,
} from "./AuthPrimitives";

/* "Remember me" can't hold the session — that lives in an httpOnly
   cookie the server sets. What it does is remember *who* you are, so
   the next visit only asks for the password. */
const REMEMBERED_EMAIL_KEY = "devmate:remembered-email";

const readRememberedEmail = () => {
  try {
    return localStorage.getItem(REMEMBERED_EMAIL_KEY) ?? "";
  } catch {
    // Private mode / blocked storage — the field just starts empty.
    return "";
  }
};

const SignInForm = ({
  onForgotPassword,
  onSwitchToSignUp,
}: {
  onForgotPassword: () => void;
  onSwitchToSignUp: () => void;
}) => {
  const remembered = readRememberedEmail();

  const [loginformData, setLoginformData] = useState({
    email: remembered || "carrie_carroll71@example.com",
    password: remembered ? "" : "test@123",
  });
  const [rememberMe, setRememberMe] = useState(Boolean(remembered));
  const [errors, setErrors] = useState<logindata>({});

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loginIsLoading } = useAppSelector((store) => store.auth.login);
  const isUser = useAppSelector(
    (store) => store.profile.userProfile.userProfileData,
  );

  useEffect(() => {
    if (isUser) navigate("/explore", { replace: true });
  }, [isUser, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginformData((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error as soon as the user starts fixing it —
    // leaving it up while they type reads as the form arguing back.
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    const foundErrors = validateLogin(loginformData);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length !== 0) return;

    dispatch(login(loginformData))
      .unwrap()
      .then((res) => {
        try {
          if (rememberMe) {
            localStorage.setItem(REMEMBERED_EMAIL_KEY, loginformData.email);
          } else {
            localStorage.removeItem(REMEMBERED_EMAIL_KEY);
          }
        } catch {
          /* storage unavailable — not worth failing a successful login over */
        }
        toast.success(res.message);
        setLoginformData({ email: "", password: "" });
      })
      .catch((err) => {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Server temporarily unavailable";
        toast.error(message);
      });
  };

  return (
    <>
      <header>
        <h2 className="au-h1">Sign in to your account</h2>
        <span
          aria-hidden="true"
          className="au-rule block w-10 h-[3px] rounded-full"
          style={{ background: "var(--au-grad)" }}
        />
        <p className="au-lead text-[14.5px] text-[color:var(--au-ink-soft)]">
          Welcome back! Please enter your details.
        </p>
      </header>

      <form className="au-form" onSubmit={handleLogin} noValidate>
        <Field
          label="Email address"
          icon={Mail}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={loginformData.email}
          onChange={handleInputChange}
          disabled={loginIsLoading}
          error={errors.email}
        />

        <PasswordField
          label="Password"
          icon={Lock}
          name="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={loginformData.password}
          onChange={handleInputChange}
          disabled={loginIsLoading}
          error={errors.password}
        />

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <Checkbox
            checked={rememberMe}
            onChange={setRememberMe}
            label="Remember me"
          />
          <button
            type="button"
            className="au-link au-focus"
            onClick={onForgotPassword}
          >
            Forgot password?
          </button>
        </div>

        <div className="mt-2">
          <SubmitButton
            loading={loginIsLoading}
            loadingLabel="Signing in…"
            icon={
              <ArrowRight
                size={18}
                strokeWidth={2.2}
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            }
          >
            Sign in
          </SubmitButton>
        </div>
      </form>

      <Divider />

      <SigninWithGoogle label="Continue with Google" />

      {/* The primary sign-up entry point lives in the page header; on a
          phone that header is above the fold but far from the button the
          user's thumb is on, so it's repeated here. */}
      <p className="au-card-switch lg:hidden text-center text-[13.5px] text-[color:var(--au-ink-soft)] mt-[clamp(10px,2.2dvh,24px)]">
        New here?{" "}
        <button
          type="button"
          className="au-link au-focus"
          onClick={onSwitchToSignUp}
        >
          Create an account
        </button>
      </p>
    </>
  );
};

export default SignInForm;

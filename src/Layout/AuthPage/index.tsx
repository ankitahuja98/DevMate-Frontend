import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck, Sparkles, Users2, Zap } from "lucide-react";
import { useAppSelector } from "../../redux/store/store";
import SEO from "../../Components/SEO";
import BrandPanel from "./BrandPanel";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import DevMateLogoWhite from "../../Images/devmateLogo-white.avif";
import type { AuthMode } from "./authMode";
import { brandCopyFor } from "./brandCopy";
import "../../CSS/Auth.css";

/* ============================================================
   DEVMATE AUTH
   ============================================================
   One responsive screen for all three auth states. The split is
   55 / 45: brand story on the left, the form on the right, and
   the form is always the larger, brighter, closer surface so
   there's never a question about what the page is for.

   Below lg the brand panel collapses to a compact banner and the
   card takes the full width — the promise stays visible, the
   decoration doesn't.
   ============================================================ */

const trustSignals = [
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    copy: "Your data is safe with us",
  },
  { icon: Zap, title: "Fast & Reliable", copy: "Lightning-fast performance" },
  {
    icon: Users2,
    title: "Trusted by Developers",
    copy: "Join thousands of developers",
  },
];

/* Below sm the three descriptions cost about 130px of height that the
   card needs more than they do — the icon and title still carry the
   signal, so only the copy goes. */
const TrustSignals = () => (
  <ul className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-[460px] mx-auto mt-[clamp(12px,2.6dvh,32px)] shrink-0">
    {trustSignals.map(({ icon: Icon, title, copy }) => (
      <li
        key={title}
        className="au-trust-item flex flex-col items-center text-center sm:items-start sm:text-left gap-1.5 sm:gap-2"
      >
        <span className="au-trust-icon grid place-items-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[color:var(--au-tint)] border border-[color:var(--au-border)] text-[color:var(--au-violet)] shrink-0">
          <Icon size={16} strokeWidth={1.9} aria-hidden="true" />
        </span>
        <div>
          <p className="text-[11.5px] sm:text-[12.5px] font-semibold text-[color:var(--au-ink)] leading-tight">
            {title}
          </p>
          <p className="au-trust-copy hidden sm:block text-[11.5px] text-[color:var(--au-ink-faint)] leading-snug mt-0.5">
            {copy}
          </p>
        </div>
      </li>
    ))}
  </ul>
);

/* The cross-link between sign in and sign up. It's a header element
   rather than a third button in the card, so the card itself only
   ever offers one primary action. */
const ModeSwitch = ({
  mode,
  onChange,
  variant,
}: {
  mode: AuthMode;
  onChange: (next: AuthMode) => void;
  variant: "light" | "dark";
}) => {
  const goingToSignUp = mode !== "signup";
  const onDark = variant === "dark";

  return (
    <div className="flex items-center gap-3">
      <span
        className={`text-[13.5px] font-medium hidden sm:inline ${
          onDark
            ? "text-[color:var(--au-on-dark-faint)]"
            : "text-[color:var(--au-ink-soft)]"
        }`}
      >
        {goingToSignUp ? "New here?" : "Already a member?"}
      </span>
      <button
        type="button"
        onClick={() => onChange(goingToSignUp ? "signup" : "signin")}
        className={`group inline-flex items-center gap-1.5 h-9 px-4 rounded-full border text-[13.5px] font-semibold transition-all duration-200 ${
          onDark
            ? "au-on-dark border-white/25 text-white hover:bg-white/12 hover:border-white/45"
            : "au-focus border-[color:var(--au-border-strong)] bg-white/70 text-[color:var(--au-violet)] hover:border-[color:var(--au-violet-soft)] hover:bg-white"
        }`}
      >
        {goingToSignUp ? "Sign up" : "Sign in"}
        <ArrowRight
          size={15}
          strokeWidth={2.2}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </button>
    </div>
  );
};

const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>("signin");
  const navigate = useNavigate();
  const bannerCopy = brandCopyFor(mode);

  /* Google's redirect resolves outside the form, so its pending state
     is the one thing a button label can't communicate. */
  const { GoogleLoginIsLoading } = useAppSelector(
    (store) => store.auth.googleLogin,
  );

  return (
    <>
      <SEO
        title={
          mode === "signup"
            ? "Create your account - Devmate"
            : "Login - Devmate"
        }
        description="Login to Devmate and connect with developers worldwide."
      />

      <div className="au grid grid-rows-1 lg:grid-cols-[11fr_9fr]">
        <BrandPanel mode={mode} />

        {/* ── Form panel ── */}
        <section className="au-form-bg au-form-panel relative flex flex-col h-full">
          {/* Ground: two faint blooms and a dot field, all below content.
              The wrapper clips them and is itself exactly panel-sized —
              without it the blobs' negative offsets extend the panel's
              scroll height by ~96px and the page scrolls to show empty
              space. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden pointer-events-none"
          >
            <div
              className="au-blob w-[340px] h-[340px] -top-24 -right-20"
              style={{ background: "rgba(124,77,255,0.14)" }}
            />
            <div
              className="au-blob w-[300px] h-[300px] -bottom-24 -left-24"
              style={{ background: "rgba(79,124,250,0.12)" }}
            />
            <div className="absolute top-24 left-6 w-28 h-24 text-[color:var(--au-violet-soft)]/25 au-dots hidden lg:block" />
          </div>

          {/* ── Compact brand banner (below lg) ──
              Everything the left panel says, in one band: who this is,
              what it's for, and the way back to the marketing site. */}
          <div className="au-band au-brand-bg relative lg:hidden shrink-0 px-6 sm:px-8 pt-[clamp(14px,2.2dvh,22px)] pb-[clamp(34px,5dvh,48px)] rounded-b-[32px] overflow-hidden">
            <div
              aria-hidden="true"
              className="au-blob w-[240px] h-[240px] -top-24 -right-16"
              style={{ background: "rgba(124,77,255,0.4)" }}
            />
            <div className="relative flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="au-on-dark rounded-lg cursor-pointer"
                aria-label="Devmate home"
              >
                <img
                  src={DevMateLogoWhite}
                  alt="Devmate"
                  className="h-8 w-auto object-contain object-left"
                />
              </button>
              <ModeSwitch mode={mode} onChange={setMode} variant="dark" />
            </div>

            {/* Keyed on mode so the copy swap replays as a fresh entrance
                rather than jump-cutting mid-sentence — same reasoning as
                the desktop panel this banner stands in for. */}
            <span
              key={`badge-${mode}`}
              className="relative hidden sm:inline-flex items-center gap-2 mt-[clamp(12px,2dvh,20px)] px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.07] text-[12.5px] font-semibold text-[#c7b8ff]"
            >
              <Sparkles size={13} strokeWidth={2.2} aria-hidden="true" />
              {bannerCopy.badge}
            </span>

            <h1
              key={`headline-${mode}`}
              className="relative text-[clamp(22px,3.2dvh,26px)] sm:text-[30px] font-extrabold tracking-[-0.03em] leading-[1.15] text-white mt-[clamp(12px,2dvh,18px)] sm:mt-4"
            >
              {bannerCopy.headline}{" "}
              <span className="au-gradient-text">Devmate</span>
            </h1>
            <p
              key={`lead-${mode}`}
              className="au-band-lead relative text-[13.5px] leading-relaxed text-[color:var(--au-on-dark)] mt-2 max-w-[440px]"
            >
              {bannerCopy.leadCompact}
            </p>
          </div>

          {/* ── Desktop header ── */}
          <header className="relative z-10 hidden lg:flex items-center justify-end px-8 xl:px-12 pt-[clamp(16px,3dvh,32px)] shrink-0">
            <ModeSwitch mode={mode} onChange={setMode} variant="light" />
          </header>

          {/* ── The card ── */}
          <main className="au-main relative z-10 flex-1 flex flex-col justify-center px-5 sm:px-8 xl:px-12 pb-[clamp(14px,3dvh,40px)] lg:pt-[clamp(14px,3dvh,40px)] -mt-8 lg:mt-0">
            <div
              className="au-card relative w-full max-w-[460px] mx-auto shrink-0 rounded-[24px] border border-[color:var(--au-border)] bg-[color:var(--au-surface)]"
              style={{ boxShadow: "var(--au-shadow-card)" }}
            >
              {GoogleLoginIsLoading && (
                <div
                  className="absolute inset-0 z-20 grid place-items-center rounded-[24px] bg-white/72 backdrop-blur-[2px]"
                  role="status"
                  aria-live="polite"
                >
                  <div className="flex flex-col items-center gap-3">
                    <span
                      className="au-spinner"
                      style={{
                        borderColor: "rgba(109,61,245,0.25)",
                        borderTopColor: "var(--au-violet)",
                        width: 26,
                        height: 26,
                      }}
                    />
                    <span className="text-[13px] font-medium text-[color:var(--au-ink-soft)]">
                      Signing you in…
                    </span>
                  </div>
                </div>
              )}

              {/* Keyed on mode so switching panels replays the entrance
                  and resets each form's local state. */}
              <div key={mode} className="au-rise">
                {mode === "signin" && (
                  <SignInForm
                    onForgotPassword={() => setMode("forgot")}
                    onSwitchToSignUp={() => setMode("signup")}
                  />
                )}
                {mode === "signup" && (
                  <SignUpForm onSwitchToSignIn={() => setMode("signin")} />
                )}
                {mode === "forgot" && (
                  <ForgotPasswordForm
                    onBackToSignIn={() => setMode("signin")}
                  />
                )}
              </div>
            </div>

            <TrustSignals />
          </main>
        </section>
      </div>
    </>
  );
};

export default AuthPage;

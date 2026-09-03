import {
  forwardRef,
  useId,
  useState,
  type ComponentType,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { AlertCircle, Check, Eye, EyeOff } from "lucide-react";

/* ============================================================
   Shared building blocks for the auth screens.
   ============================================================
   Sign in, sign up and password reset all draw their fields,
   buttons and dividers from here — that's what keeps the three
   states of the card feeling like one surface rather than three
   separately-styled forms.
   ============================================================ */

/* ── Field ───────────────────────────────────────────────────
   Label + leading icon + input + error, wired together by a
   generated id so the label is clickable and the error is
   announced. `error` drives both the red border (via
   aria-invalid) and the message, so the two can never disagree. */
type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  error?: string;
  trailing?: ReactNode;
};

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, icon: Icon, error, trailing, className = "", ...props }, ref) => {
    const id = useId();
    const errorId = `${id}-error`;

    return (
      <div>
        <label className="au-label" htmlFor={id}>
          {label}
        </label>
        <div className="au-field">
          <span className="au-field-icon" aria-hidden="true">
            <Icon size={18} strokeWidth={1.9} />
          </span>
          <input
            {...props}
            id={id}
            ref={ref}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={`au-input ${trailing ? "au-input--trailing" : ""} ${className}`}
          />
          {trailing}
        </div>
        {error && (
          <p className="au-error" id={errorId} role="alert">
            <AlertCircle size={13} strokeWidth={2.2} aria-hidden="true" />
            {error}
          </p>
        )}
      </div>
    );
  },
);

Field.displayName = "Field";

/* ── Password field ──────────────────────────────────────────
   A Field that owns its own reveal state. onMouseDown is
   prevented so clicking the eye doesn't blur the input — the
   caret stays exactly where the user left it. */
type PasswordFieldProps = Omit<FieldProps, "icon" | "type" | "trailing"> & {
  icon: FieldProps["icon"];
};

export const PasswordField = ({ icon, ...props }: PasswordFieldProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <Field
      {...props}
      icon={icon}
      type={visible ? "text" : "password"}
      trailing={
        <button
          type="button"
          className="au-eye"
          onClick={() => setVisible((prev) => !prev)}
          onMouseDown={(e) => e.preventDefault()}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          tabIndex={props.disabled ? -1 : 0}
        >
          {visible ? (
            <EyeOff size={18} strokeWidth={1.9} />
          ) : (
            <Eye size={18} strokeWidth={1.9} />
          )}
        </button>
      }
    />
  );
};

/* ── Submit button ───────────────────────────────────────────
   Loading swaps the label for a spinner and disables the button,
   so a slow network can't produce a double submit. The label
   itself changes too — a spinner alone doesn't tell a screen
   reader what is happening. */
type SubmitButtonProps = {
  children: ReactNode;
  loading?: boolean;
  loadingLabel?: string;
  disabled?: boolean;
  icon?: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "button";
};

export const SubmitButton = ({
  children,
  loading = false,
  loadingLabel = "Please wait…",
  disabled = false,
  icon,
  onClick,
  type = "submit",
}: SubmitButtonProps) => (
  <button
    type={type}
    className="au-btn au-btn-primary group"
    disabled={loading || disabled}
    aria-busy={loading || undefined}
    onClick={onClick}
  >
    {loading ? (
      <>
        <span className="au-spinner" aria-hidden="true" />
        {loadingLabel}
      </>
    ) : (
      <>
        {children}
        {icon}
      </>
    )}
  </button>
);

/* ── Remember me ─────────────────────────────────────────────  */
export const Checkbox = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) => (
  <label className="au-check">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    <span className="au-check-box" aria-hidden="true">
      <Check size={12} strokeWidth={3.5} />
    </span>
    <span className="text-[13px] font-medium text-[color:var(--au-ink-soft)]">
      {label}
    </span>
  </label>
);

/* ── "or" rule ───────────────────────────────────────────── */
export const Divider = ({ label = "or" }: { label?: string }) => (
  <div className="au-divider" aria-hidden="true">
    {label}
  </div>
);

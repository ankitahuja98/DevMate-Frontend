import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/* ============================================================
   Shared building blocks for the landing page.
   ============================================================
   Kept in one module so every section draws its headings,
   avatars and entrance motion from the same source — that's what
   makes the page read as one design system rather than six
   separately-styled slabs.
   ============================================================ */

/* ── Reveal ──────────────────────────────────────────────────
   Fades content up the first time it scrolls into view, then
   disconnects. `delay` staggers siblings in a grid. Anything
   above the fold should pass `immediate` so it paints on load
   instead of waiting for an observer callback. */
type RevealProps = {
  children: ReactNode;
  delay?: number;
  immediate?: boolean;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section" | "li" | "article";
};

export const Reveal = ({
  children,
  delay = 0,
  immediate = false,
  className = "",
  style,
  as: Tag = "div",
}: RevealProps) => {
  const ref = useRef<HTMLElement | null>(null);
  // Anything above the fold, and any browser without IntersectionObserver,
  // starts visible — the reveal is an enhancement, never a gate on content.
  const [visible, setVisible] = useState(
    () => immediate || typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    if (visible) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // Fire a little before the element is fully on screen so the
      // animation is already settling by the time it's readable.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <Tag
      ref={ref as never}
      className={`lp-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ ...style, "--lp-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
};

/* ── Avatar ──────────────────────────────────────────────────
   Initials on a brand-tinted gradient. Deliberately not stock
   photography: made-up headshots on a real product read as fake,
   and initials match the in-app placeholder users already see. */
const AVATAR_GRADIENTS = [
  "linear-gradient(135deg,#7c4dff,#5b8cff)",
  "linear-gradient(135deg,#5b8cff,#3fc4d8)",
  "linear-gradient(135deg,#9a5bff,#ff7ab8)",
  "linear-gradient(135deg,#6d3df5,#9a7bff)",
  "linear-gradient(135deg,#4f7cfa,#7c4dff)",
  "linear-gradient(135deg,#f59e6b,#ff6f91)",
];

const avatarGradient = (seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
};

const initialsOf = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

type AvatarProps = {
  name: string;
  size?: number;
  ring?: boolean;
  className?: string;
};

export const Avatar = ({
  name,
  size = 44,
  ring = false,
  className = "",
}: AvatarProps) => (
  <div
    aria-hidden="true"
    className={`shrink-0 grid place-items-center font-semibold text-white select-none ${className}`}
    style={{
      width: size,
      height: size,
      borderRadius: 999,
      background: avatarGradient(name),
      fontSize: Math.round(size * 0.36),
      letterSpacing: "-0.02em",
      boxShadow: ring ? "0 0 0 2.5px #fff, 0 2px 6px rgba(16,24,44,.14)" : "none",
    }}
  >
    {initialsOf(name)}
  </div>
);

/* ── Online dot ─────────────────────────────────────────────── */
export const OnlineDot = ({ size = 10 }: { size?: number }) => (
  <span
    className="relative inline-flex text-emerald-500 lp-ping"
    style={{ width: size, height: size }}
  >
    <span
      className="relative inline-flex rounded-full bg-emerald-500"
      style={{ width: size, height: size, boxShadow: "0 0 0 2px #fff" }}
    />
  </span>
);

/* ── Section heading ─────────────────────────────────────────
   Eyebrow + two-line title + lead, centred. Every section below
   the hero uses this, which is what keeps the vertical rhythm
   identical all the way down the page. */
type SectionHeadingProps = {
  eyebrow?: ReactNode;
  titleTop: string;
  titleAccent?: string;
  lead?: string;
};

export const SectionHeading = ({
  eyebrow,
  titleTop,
  titleAccent,
  lead,
}: SectionHeadingProps) => (
  <div className="text-center max-w-[720px] mx-auto">
    {eyebrow && (
      <Reveal>
        <span className="lp-eyebrow">{eyebrow}</span>
      </Reveal>
    )}
    <Reveal delay={60}>
      <h2 className="lp-h2 mt-5 text-[color:var(--lp-ink)]">
        {titleTop}
        {titleAccent && (
          <>
            <br />
            <span className="lp-gradient-text">{titleAccent}</span>
          </>
        )}
      </h2>
    </Reveal>
    {lead && (
      <Reveal delay={120}>
        <p className="lp-lead mt-4">{lead}</p>
      </Reveal>
    )}
  </div>
);

/* ── Skill chip ─────────────────────────────────────────────── */
export const SkillChip = ({ label }: { label: string }) => (
  <span className="px-2.5 py-1 rounded-lg bg-[color:var(--lp-tint)] border border-[color:var(--lp-border)] text-[11px] font-semibold text-[color:var(--lp-violet-600)] leading-none">
    {label}
  </span>
);

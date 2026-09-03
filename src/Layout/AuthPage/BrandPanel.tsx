import { MessageSquare, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { AuthMode } from "./authMode";
import { brandCopyFor } from "./brandCopy";
import { Avatar } from "../../Pages/HomeSections/LandingPrimitives";
import DevMateLogoWhite from "../../Images/devmateLogo-white.avif";

/* ============================================================
   The dark half of the auth screen.
   ============================================================
   Its job is to say what Devmate is while the form keeps the
   attention — so everything here is quieter than the card on
   the right: no full-strength white, no competing call to
   action, and the product vignettes drift at low contrast in
   their own column rather than competing with the copy.
   ============================================================ */

/* Names only — the avatars render as initials on a brand gradient.
   Invented headshots on a real product read as fake, and initials
   are what a user with no photo already sees inside the app. */
const proofNames = ["Alex Chen", "Sarah Kim", "Rohan Verma", "Mia Okafor"];

/* ── Floating product vignettes ──────────────────────────────
   Small pieces of real Devmate UI — an editor, a chat thread, a
   connections stat — drawn in CSS rather than shipped as images.
   They fill the width of their column, so no width of screen can
   push one under the copy or slice it off at the panel edge. */

const EditorCard = () => (
  <div className="au-glass au-float w-full rounded-2xl p-4 translate-x-5">
    <div className="flex items-center gap-1.5">
      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
    </div>
    <div className="mt-4 space-y-2.5">
      {[
        [
          ["w-7", "bg-[#7c8bff]"],
          ["w-20", "bg-[#c4b5fd]"],
          ["w-9", "bg-[#5eead4]"],
        ],
        [
          ["w-5", "bg-white/25"],
          ["w-24", "bg-[#f0abfc]"],
        ],
        [
          ["w-11", "bg-[#7c8bff]"],
          ["w-14", "bg-white/30"],
          ["w-7", "bg-[#5eead4]"],
        ],
        [
          ["w-16", "bg-[#c4b5fd]"],
          ["w-9", "bg-white/25"],
        ],
      ].map((row, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-3 h-1.5 rounded-full bg-white/12 shrink-0" />
          {row.map(([w, bg], j) => (
            <span
              key={j}
              className={`h-1.5 rounded-full shrink-0 ${w} ${bg} opacity-70`}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);

const ChatCard = () => (
  <div
    className="au-glass au-float w-full rounded-2xl p-4 -translate-x-7"
    style={{ "--au-delay": "1.4s" } as React.CSSProperties}
  >
    <div className="flex items-start gap-2.5">
      <span className="grid place-items-center w-7 h-7 rounded-lg bg-[#6d3df5] text-white shrink-0">
        <MessageSquare size={14} strokeWidth={2.2} />
      </span>
      <div className="flex-1 space-y-1.5 pt-1">
        <span className="block h-1.5 w-full rounded-full bg-white/28" />
        <span className="block h-1.5 w-3/5 rounded-full bg-white/16" />
      </div>
    </div>
    <div className="flex items-start gap-2.5 mt-3.5">
      <Avatar name="Sarah Kim" size={28} />
      <div className="flex-1 space-y-1.5 pt-1">
        <span className="block h-1.5 w-4/5 rounded-full bg-white/28" />
        <span className="block h-1.5 w-2/5 rounded-full bg-white/16" />
      </div>
    </div>
  </div>
);

const ConnectionsCard = () => (
  <div
    className="au-glass au-float w-full rounded-2xl p-4 translate-x-3"
    style={{ "--au-delay": "2.6s" } as React.CSSProperties}
  >
    <div className="flex items-center justify-between gap-2">
      <span className="text-[11px] font-semibold tracking-wide text-white/55">
        Connections
      </span>
      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-emerald-400/15 text-emerald-300">
        +18.6%
      </span>
    </div>
    <p className="text-[22px] font-bold text-white mt-1 tracking-tight">
      12.4K
    </p>
    {/* One hand-drawn sparkline. A chart library for four data points
        would be more weight than the whole panel. */}
    <svg
      viewBox="0 0 240 62"
      className="w-full h-[58px] mt-2"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="au-spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M2 52 C 26 52 30 30 52 32 C 74 34 76 44 98 40 C 120 36 122 18 146 22 C 170 26 172 34 194 26 C 212 19 220 9 236 7 L236 62 L2 62 Z"
        fill="url(#au-spark-fill)"
      />
      <path
        d="M2 52 C 26 52 30 30 52 32 C 74 34 76 44 98 40 C 120 36 122 18 146 22 C 170 26 172 34 194 26 C 212 19 220 9 236 7"
        fill="none"
        stroke="#c4b5fd"
        strokeWidth="2.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx="236" cy="7" r="3.5" fill="#fff" />
    </svg>
  </div>
);

const BrandPanel = ({ mode }: { mode: AuthMode }) => {
  const copy = brandCopyFor(mode);
  const navigate = useNavigate();

  return (
    <div className="au-brand-bg relative isolate hidden lg:flex flex-col overflow-hidden px-10 xl:px-12 2xl:px-16 py-[clamp(20px,4dvh,48px)]">
      {/* ── Ground ── */}
      <div aria-hidden="true" className="absolute inset-0 au-grid-lines z-0" />
      <div
        aria-hidden="true"
        className="au-blob z-0 w-[420px] h-[420px] -top-32 -right-24"
        style={{ background: "rgba(124,77,255,0.42)" }}
      />
      <div
        aria-hidden="true"
        className="au-blob z-0 w-[360px] h-[360px] -bottom-28 -left-20"
        style={{ background: "rgba(79,124,250,0.3)" }}
      />
      <div
        aria-hidden="true"
        className="absolute top-8 right-10 w-40 h-32 text-white/12 au-dots z-0"
      />

      <div className="relative z-10 flex-1 flex gap-8 2xl:gap-12 min-h-0">
        {/* ── Copy column ── */}
        <div className="flex flex-col flex-1 min-w-0 max-w-[580px]">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="self-start shrink-0 rounded-lg cursor-pointer"
            aria-label="Devmate home"
          >
            <img
              src={DevMateLogoWhite}
              alt="Devmate"
              className="h-9 w-auto object-contain object-left"
            />
          </button>

          <div className="flex-1 flex flex-col justify-center py-[clamp(14px,3.4dvh,40px)] min-h-0">
            {/* Keyed on mode: with the text swapping under it anyway, a
              fresh mount lets the existing au-rise entrance replay
              instead of the copy jump-cutting mid-sentence. */}
            <span
              key={`badge-${mode}`}
              className="au-rise inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.07] text-[13px] font-semibold text-[#c7b8ff]"
            >
              <Sparkles size={14} strokeWidth={2.2} aria-hidden="true" />
              {copy.badge}
            </span>

            <h1
              key={`headline-${mode}`}
              className="au-display au-rise text-white mt-[clamp(12px,2.6dvh,28px)]"
              style={{ "--au-delay": "70ms" } as React.CSSProperties}
            >
              {copy.headline}
              <br />
              <span className="au-gradient-text">Devmate</span>
            </h1>

            <p
              key={`lead-${mode}`}
              className="au-rise mt-[clamp(10px,2dvh,20px)] text-[16.5px] leading-[1.7] text-[color:var(--au-on-dark)] max-w-[460px]"
              style={{ "--au-delay": "140ms" } as React.CSSProperties}
            >
              {copy.lead}
            </p>

            <ul
              key={`features-${mode}`}
              className="mt-[clamp(16px,3.4dvh,40px)] space-y-[clamp(10px,2.2dvh,20px)]"
            >
              {copy.features.map(
                ({ icon: Icon, title, copy: featureCopy }, i) => (
                  <li
                    key={title}
                    className="au-rise flex items-start gap-4"
                    style={
                      {
                        "--au-delay": `${210 + i * 70}ms`,
                      } as React.CSSProperties
                    }
                  >
                    <span className="grid place-items-center w-11 h-11 rounded-[14px] border border-white/12 bg-white/[0.07] text-[#b9a5ff] shrink-0">
                      <Icon size={19} strokeWidth={1.9} aria-hidden="true" />
                    </span>
                    <div className="pt-0.5">
                      <p className="text-[15px] font-semibold text-white tracking-[-0.01em]">
                        {title}
                      </p>
                      <p className="text-[13.5px] leading-relaxed text-[color:var(--au-on-dark-faint)] mt-0.5">
                        {featureCopy}
                      </p>
                    </div>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* ── Social proof ── */}
          <div
            className="au-rise flex items-center gap-4 pt-[clamp(14px,2.6dvh,28px)] border-t border-white/10 shrink-0"
            style={{ "--au-delay": "430ms" } as React.CSSProperties}
          >
            <div className="flex -space-x-2">
              {proofNames.map((name) => (
                <Avatar key={name} name={name} size={36} ring />
              ))}
              <span
                className="grid place-items-center w-9 h-9 rounded-full text-[10.5px] font-bold text-white shadow-[0_0_0_2.5px_#fff]"
                style={{ background: "var(--au-grad)" }}
              >
                10K+
              </span>
            </div>
            <div>
              <p className="text-[14.5px] font-semibold text-white tracking-[-0.01em]">
                10,000+ developers
              </p>
              <p className="text-[13px] text-[color:var(--au-on-dark-faint)]">
                already connected
              </p>
            </div>
          </div>
        </div>

        {/* ── Vignette column ──
          Its own track, so the cards can never overlap the copy or be
          sliced off by the panel's edge. Under ~1500px the panel can't
          hold both columns, and the copy is the half that has to
          survive — a headline broken over three lines to make room for
          decoration is a bad trade.
          The middle card additionally waits for a tall enough window —
          three cards in a short viewport is a scrollbar, not depth. */}
        <div
          aria-hidden="true"
          className="hidden [@media(min-width:1500px)]:flex flex-col justify-center gap-[clamp(14px,2.8dvh,24px)] w-[250px] 2xl:w-[290px] shrink-0 pointer-events-none"
        >
          <EditorCard />
          <div className="hidden [@media(min-height:840px)]:block">
            <ChatCard />
          </div>
          <ConnectionsCard />
        </div>
      </div>
    </div>
  );
};

export default BrandPanel;

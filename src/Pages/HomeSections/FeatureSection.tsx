import type { ComponentType, ReactNode } from "react";
import {
  Users,
  Code2,
  Briefcase,
  MessageSquare,
  Plus,
  Check,
} from "lucide-react";
import { Avatar, Reveal, SectionHeading, SkillChip } from "./LandingPrimitives";

/* ============================================================
   Feature card illustrations
   ============================================================
   Each card ends in a small, literal picture of the feature drawn
   from real product UI (a match, a profile row, a project card, a
   chat thread) rather than a decorative shape. It costs a few more
   lines than an abstract blob but it's what makes the section
   explain the product instead of just listing nouns.
   ============================================================ */

/* group-hover throughout the four illustrations below targets the
   .group on the card in FeatureSection — the same hover that lifts
   the card also plays a small, on-theme gesture inside it, so a card
   reads as reacting rather than just tilting. */
const MatchIllustration = () => (
  <div className="flex items-center justify-center gap-0 py-2">
    <Avatar
      name="Alex Chen"
      size={44}
      ring
      className="transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:scale-110"
    />
    <span className="w-8 border-t-2 border-dashed border-[color:var(--lp-violet-400)] transition-[width] duration-300 motion-safe:group-hover:w-5" />
    {/* A "+" rotated a half-turn is still a "+" — but it reads as an
        "×" for an instant at 45°/135° along the way, which is what
        turns a generic spin into a little "matched!" gesture. */}
    <span
      className="grid place-items-center w-8 h-8 rounded-full text-white shrink-0 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] motion-safe:group-hover:rotate-180 motion-safe:group-hover:scale-125"
      style={{
        background: `linear-gradient(to bottom, rgba(255,255,255,.5) 0%, rgba(255,255,255,.5) 2px, rgba(255,255,255,.15) 46%, rgba(255,255,255,0) 62%), var(--lp-grad)`,
      }}
    >
      <Plus size={16} strokeWidth={3} />
    </span>
    <span className="w-8 border-t-2 border-dashed border-[color:var(--lp-violet-400)] transition-[width] duration-300 motion-safe:group-hover:w-5" />
    <Avatar
      name="Sarah Kim"
      size={44}
      ring
      className="transition-transform duration-300 delay-75 motion-safe:group-hover:-translate-x-0.5 motion-safe:group-hover:scale-110"
    />
  </div>
);

const ProfileIllustration = () => (
  <div className="rounded-2xl border border-[color:var(--lp-border)] bg-white p-3 transition-colors duration-300 group-hover:border-[color:var(--lp-violet-400)]">
    <div className="flex items-center gap-2.5">
      <Avatar
        name="Rohan Verma"
        size={32}
        className="transition-transform duration-300 motion-safe:group-hover:scale-105"
      />
      <div className="flex-1 space-y-1.5">
        <span className="block h-2 w-20 rounded-full bg-[color:var(--lp-ink)]/12" />
        <span className="block h-2 w-14 rounded-full bg-[color:var(--lp-ink)]/8" />
      </div>
      <span className="lp-glossy grid place-items-center w-5 h-5 rounded-full bg-emerald-500 text-white transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] motion-safe:group-hover:scale-125 motion-safe:group-hover:rotate-12">
        <Check size={12} strokeWidth={3.5} />
      </span>
    </div>
    <div className="flex flex-wrap gap-1.5 mt-3">
      {["React", "Node.js", "TypeScript"].map((s, i) => (
        <SkillChip
          key={s}
          label={s}
          className={`transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 ${
            i === 1 ? "delay-75" : i === 2 ? "delay-150" : ""
          }`}
        />
      ))}
    </div>
  </div>
);

const ProjectIllustration = () => (
  <div className="rounded-2xl border border-[color:var(--lp-border)] bg-white p-3 transition-colors duration-300 group-hover:border-[color:var(--lp-violet-400)]">
    <div className="flex items-center justify-between">
      <span className="text-[12px] font-semibold text-[color:var(--lp-ink)]">
        New Project
      </span>
      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 transition-transform duration-300 motion-safe:group-hover:scale-105">
        Hiring
      </span>
    </div>
    <span className="block h-2 w-3/4 rounded-full bg-[color:var(--lp-ink)]/8 mt-2.5" />
    <div className="flex items-center gap-2 mt-3">
      <div className="flex -space-x-2">
        {["Alex Chen", "Sarah Kim", "Marcus Liu"].map((n, i) => (
          <Avatar
            key={n}
            name={n}
            size={26}
            ring
            className={`transition-transform duration-300 motion-safe:group-hover:-translate-y-1 ${
              i === 1 ? "delay-75" : i === 2 ? "delay-150" : ""
            }`}
          />
        ))}
      </div>
      <span className="text-[11px] font-semibold text-[color:var(--lp-violet-600)] transition-transform duration-300 delay-150 motion-safe:group-hover:translate-x-0.5">
        +15 joined
      </span>
    </div>
  </div>
);

const ChatIllustration = () => (
  <div className="space-y-2 py-1">
    <div className="flex justify-start">
      <span className="px-3 py-2 rounded-2xl rounded-bl-md bg-[color:var(--lp-tint)] border border-[color:var(--lp-border)] text-[11.5px] text-[color:var(--lp-ink-soft)] transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5">
        Up for pairing on the API?
      </span>
    </div>
    <div className="flex justify-end">
      <span
        className="px-3 py-2 rounded-2xl rounded-br-md text-[11.5px] text-white transition-transform duration-300 delay-75 motion-safe:group-hover:-translate-y-0.5"
        style={{
          background: `linear-gradient(to bottom, rgba(255,255,255,.4) 0%, rgba(255,255,255,.4) 2px, rgba(255,255,255,.12) 46%, rgba(255,255,255,0) 62%), var(--lp-grad)`,
        }}
      >
        Let&apos;s ship it 🚀
      </span>
    </div>
    {/* A typing indicator that only appears on hover — as if a reply
        just started coming in. It occupies its row at all times
        (opacity/transform only, nothing conditionally mounted or
        absolutely positioned) so revealing it never reflows the card
        or the row of cards beside it. */}
    <div className="flex justify-start opacity-0 transition-all duration-300 delay-150 group-hover:opacity-100 motion-safe:-translate-y-1 motion-safe:group-hover:translate-y-0">
      <span
        aria-hidden="true"
        className="flex items-center gap-1 px-3 py-2 rounded-2xl rounded-bl-md bg-[color:var(--lp-tint)] border border-[color:var(--lp-border)]"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--lp-ink-faint)] motion-safe:animate-bounce [animation-delay:0ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--lp-ink-faint)] motion-safe:animate-bounce [animation-delay:150ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--lp-ink-faint)] motion-safe:animate-bounce [animation-delay:300ms]" />
      </span>
    </div>
  </div>
);

type Feature = {
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  title: string;
  description: string;
  illustration: ReactNode;
};

const features: Feature[] = [
  {
    icon: Users,
    title: "Connect with Developers",
    description:
      "Find your perfect coding partner. Match with developers who share your tech stack and vision.",
    illustration: <MatchIllustration />,
  },
  {
    icon: Code2,
    title: "Showcase Your Skills",
    description:
      "Build an impressive developer profile highlighting your expertise, projects, and tech stack.",
    illustration: <ProfileIllustration />,
  },
  {
    icon: Briefcase,
    title: "Collaborate on Projects",
    description:
      "Team up on exciting opportunities, from freelance gigs to startup ventures.",
    illustration: <ProjectIllustration />,
  },
  {
    icon: MessageSquare,
    title: "Real-Time Chat",
    description:
      "Seamless communication with built-in messaging. Discuss ideas and coordinate instantly.",
    illustration: <ChatIllustration />,
  },
];

const FeatureSection = () => (
  <section id="features" className="lp-section scroll-mt-24">
    <div className="lp-container">
      <SectionHeading
        titleTop="Everything You Need to"
        titleAccent="Connect & Collaborate"
        lead="Powerful features designed to help developers find their ideal coding partners and build amazing projects together."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
        {features.map(({ icon: Icon, title, description, illustration }, i) => (
          <Reveal
            key={title}
            delay={i * 90}
            as="article"
            className="h-full lp-feat-reveal"
          >
            {/* Card-level hover stacks three cheap, GPU-only moves on
                the existing lift: a touch more scale, a violet glow in
                place of the plain shadow, and a faint tilt that
                alternates left/right by card so a row of four doesn't
                lean the same way. The icon and illustration below add
                their own gesture on top of this. */}
            <div
              className={`group h-full flex flex-col p-6 bg-white rounded-[20px] border border-[color:var(--lp-border)] shadow-[var(--lp-shadow-xs)] transition-all duration-300 hover:border-[color:var(--lp-violet-400)] hover:shadow-[var(--lp-shadow-brand)] motion-safe:hover:-translate-y-2 motion-safe:hover:scale-[1.015] ${
                i % 2 === 0
                  ? "motion-safe:hover:rotate-1"
                  : "motion-safe:hover:-rotate-1"
              }`}
            >
              <span className="lp-feat-icon lp-glossy grid place-items-center w-12 h-12 rounded-2xl bg-[color:var(--lp-tint)] text-[color:var(--lp-violet-600)] transition-all duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] group-hover:bg-[color:var(--lp-violet-600)] group-hover:text-white motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-110">
                <Icon size={22} strokeWidth={2.2} />
              </span>

              <h3 className="lp-feat-title mt-5 text-[17px] font-bold tracking-[-0.02em] text-[color:var(--lp-ink)] transition-colors duration-300 group-hover:text-[color:var(--lp-violet-600)]">
                {title}
              </h3>
              <p className="lp-feat-desc mt-2 text-[14px] leading-[1.65] text-[color:var(--lp-ink-soft)]">
                {description}
              </p>

              {/* Illustration is pinned to the bottom so all four cards
                  line up regardless of description length. */}
              <div className="lp-feat-illustration mt-auto pt-6">
                {illustration}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureSection;

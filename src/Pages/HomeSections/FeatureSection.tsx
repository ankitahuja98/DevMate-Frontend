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

const MatchIllustration = () => (
  <div className="flex items-center justify-center gap-0 py-2">
    <Avatar name="Alex Chen" size={44} ring />
    <span className="w-8 border-t-2 border-dashed border-[color:var(--lp-violet-400)]" />
    <span
      className="grid place-items-center w-8 h-8 rounded-full text-white shrink-0"
      style={{ background: "var(--lp-grad)" }}
    >
      <Plus size={16} strokeWidth={3} />
    </span>
    <span className="w-8 border-t-2 border-dashed border-[color:var(--lp-violet-400)]" />
    <Avatar name="Sarah Kim" size={44} ring />
  </div>
);

const ProfileIllustration = () => (
  <div className="rounded-2xl border border-[color:var(--lp-border)] bg-white p-3">
    <div className="flex items-center gap-2.5">
      <Avatar name="Rohan Verma" size={32} />
      <div className="flex-1 space-y-1.5">
        <span className="block h-2 w-20 rounded-full bg-[color:var(--lp-ink)]/12" />
        <span className="block h-2 w-14 rounded-full bg-[color:var(--lp-ink)]/8" />
      </div>
      <span className="grid place-items-center w-5 h-5 rounded-full bg-emerald-500 text-white">
        <Check size={12} strokeWidth={3.5} />
      </span>
    </div>
    <div className="flex flex-wrap gap-1.5 mt-3">
      {["React", "Node.js", "TypeScript"].map((s) => (
        <SkillChip key={s} label={s} />
      ))}
    </div>
  </div>
);

const ProjectIllustration = () => (
  <div className="rounded-2xl border border-[color:var(--lp-border)] bg-white p-3">
    <div className="flex items-center justify-between">
      <span className="text-[12px] font-semibold text-[color:var(--lp-ink)]">
        New Project
      </span>
      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600">
        Hiring
      </span>
    </div>
    <span className="block h-2 w-3/4 rounded-full bg-[color:var(--lp-ink)]/8 mt-2.5" />
    <div className="flex items-center gap-2 mt-3">
      <div className="flex -space-x-2">
        {["Alex Chen", "Sarah Kim", "Marcus Liu"].map((n) => (
          <Avatar key={n} name={n} size={26} ring />
        ))}
      </div>
      <span className="text-[11px] font-semibold text-[color:var(--lp-violet-600)]">
        +15 joined
      </span>
    </div>
  </div>
);

const ChatIllustration = () => (
  <div className="space-y-2 py-1">
    <div className="flex justify-start">
      <span className="px-3 py-2 rounded-2xl rounded-bl-md bg-[color:var(--lp-tint)] border border-[color:var(--lp-border)] text-[11.5px] text-[color:var(--lp-ink-soft)]">
        Up for pairing on the API?
      </span>
    </div>
    <div className="flex justify-end">
      <span
        className="px-3 py-2 rounded-2xl rounded-br-md text-[11.5px] text-white"
        style={{ background: "var(--lp-grad)" }}
      >
        Let&apos;s ship it 🚀
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
        eyebrow={
          <>
            <Code2 size={14} strokeWidth={2.6} />
            Powerful Features
          </>
        }
        titleTop="Everything You Need to"
        titleAccent="Connect & Collaborate"
        lead="Powerful features designed to help developers find their ideal coding partners and build amazing projects together."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
        {features.map(({ icon: Icon, title, description, illustration }, i) => (
          <Reveal key={title} delay={i * 90} as="article" className="h-full">
            <div className="group h-full flex flex-col p-6 bg-white rounded-[20px] border border-[color:var(--lp-border)] shadow-[var(--lp-shadow-xs)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[color:var(--lp-violet-400)] hover:shadow-[var(--lp-shadow-md)]">
              <span className="grid place-items-center w-12 h-12 rounded-2xl bg-[color:var(--lp-tint)] text-[color:var(--lp-violet-600)] transition-colors duration-300 group-hover:bg-[color:var(--lp-violet-600)] group-hover:text-white">
                <Icon size={22} strokeWidth={2.2} />
              </span>

              <h3 className="mt-5 text-[17px] font-bold tracking-[-0.02em] text-[color:var(--lp-ink)]">
                {title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.65] text-[color:var(--lp-ink-soft)]">
                {description}
              </p>

              {/* Illustration is pinned to the bottom so all four cards
                  line up regardless of description length. */}
              <div className="mt-auto pt-6">{illustration}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureSection;

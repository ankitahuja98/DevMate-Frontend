import { UserPlus, Search, MessagesSquare, Rocket, Route } from "lucide-react";
import { Reveal, SectionHeading } from "./LandingPrimitives";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Profile",
    description:
      "Sign up and create your developer profile in just a few minutes.",
  },
  {
    number: "02",
    icon: Search,
    title: "Discover Developers",
    description:
      "Browse developers based on skills, experience, and project interests.",
  },
  {
    number: "03",
    icon: MessagesSquare,
    title: "Connect & Chat",
    description: "Send connection requests and start meaningful conversations.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Build Together",
    description:
      "Collaborate on projects and build something amazing together.",
  },
];

const HowItWorksSection = () => (
  <section
    id="how-it-works"
    className="lp-section scroll-mt-24 bg-white border-y border-[color:var(--lp-border)]"
  >
    <div className="lp-container">
      <SectionHeading
        eyebrow={
          <>
            <Route size={14} strokeWidth={2.6} />
            Simple Process
          </>
        }
        titleTop="How Devmate Works"
        lead="Four steps from signing up to shipping your next project with someone who gets your stack."
      />

      <div className="relative mt-16">
        {/* The connecting rail. Inset by an eighth of the row on each
            side so it starts and ends at the first/last marker rather
            than running off the edges. Desktop only — stacked steps
            get a vertical rail from each card's own border instead. */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--lp-border-strong) 8%, var(--lp-border-strong) 92%, transparent)",
          }}
        />

        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 relative">
          {steps.map(({ number, icon: Icon, title, description }, i) => (
            <Reveal key={number} delay={i * 110} as="li">
              <div className="group text-center lg:px-3">
                <div className="relative inline-grid place-items-center">
                  <span
                    className="grid place-items-center w-14 h-14 rounded-2xl bg-white border border-[color:var(--lp-border)] text-[color:var(--lp-violet-600)] shadow-[var(--lp-shadow-sm)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[color:var(--lp-violet-400)]"
                  >
                    <Icon size={23} strokeWidth={2.2} />
                  </span>
                  <span
                    className="absolute -top-2 -right-3 grid place-items-center w-7 h-7 rounded-full text-white text-[11px] font-bold"
                    style={{
                      background: "var(--lp-grad)",
                      boxShadow: "0 0 0 3px #fff",
                    }}
                  >
                    {number}
                  </span>
                </div>

                <h3 className="mt-5 text-[16px] font-bold tracking-[-0.02em] text-[color:var(--lp-ink)]">
                  {title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.65] text-[color:var(--lp-ink-soft)] max-w-[260px] mx-auto">
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

export default HowItWorksSection;

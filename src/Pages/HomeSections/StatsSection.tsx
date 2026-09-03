import { Users, Rocket, MessagesSquare, Star } from "lucide-react";
import { Reveal } from "./LandingPrimitives";

const stats = [
  { icon: Users, value: "10K+", label: "Developers" },
  { icon: Rocket, value: "3K+", label: "Projects Built" },
  { icon: MessagesSquare, value: "25K+", label: "Connections Made" },
  { icon: Star, value: "98%", label: "Satisfaction Rate" },
];

/* Floats over the seam between the hero and the features section —
   the negative margin is what makes it read as a card lifted off the
   page rather than another full-width band. */
const StatsSection = () => (
  <div className="relative z-20 lp-container -mt-6 lg:-mt-10">
    <Reveal>
      <div
        className="bg-white rounded-[24px] border border-[color:var(--lp-border)] px-6 py-8 sm:px-10"
        style={{ boxShadow: "var(--lp-shadow-md)" }}
      >
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <div
              key={label}
              className={`flex items-center gap-4 justify-center lg:justify-start ${
                i > 0
                  ? "lg:border-l lg:border-[color:var(--lp-border)] lg:pl-8"
                  : ""
              }`}
            >
              <span className="lp-glossy grid place-items-center w-12 h-12 rounded-2xl bg-[color:var(--lp-tint)] text-[color:var(--lp-violet-600)] shrink-0">
                <Icon size={22} strokeWidth={2.2} />
              </span>
              <div>
                <dd className="text-[26px] sm:text-[28px] font-extrabold tracking-[-0.03em] text-[color:var(--lp-ink)] leading-none">
                  {value}
                </dd>
                <dt className="text-[13px] text-[color:var(--lp-ink-soft)] mt-1.5">
                  {label}
                </dt>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </Reveal>
  </div>
);

export default StatsSection;

import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Avatar, Reveal } from "./LandingPrimitives";

/* The three profiles in the hero preview. Content is fixed, not
   fetched — this is a static illustration of the Explore surface,
   so it must render instantly and identically for every visitor.
   Each profile carries its own gradient pair so the stack reads as
   three distinct people rather than one repeated swatch. */
const previewProfiles = [
  {
    name: "Alex Chen",
    role: "Full-Stack Developer",
    gradient: "from-purple-500 to-indigo-500",
    cardGradient: "from-purple-50 to-indigo-50",
    skills: [
      { label: "React", bg: "bg-purple-200", text: "text-purple-700" },
      { label: "Node.js", bg: "bg-blue-200", text: "text-blue-700" },
    ],
  },
  {
    name: "Sarah Kim",
    role: "UI/UX Designer",
    gradient: "from-blue-500 to-cyan-500",
    cardGradient: "from-blue-50 to-cyan-50",
    skills: [
      { label: "Figma", bg: "bg-blue-200", text: "text-blue-700" },
      { label: "CSS", bg: "bg-cyan-200", text: "text-cyan-700" },
    ],
  },
  {
    name: "Marcus Liu",
    role: "Backend Engineer",
    gradient: "from-indigo-500 to-purple-500",
    cardGradient: "from-indigo-50 to-purple-50",
    skills: [
      { label: "Python", bg: "bg-indigo-200", text: "text-indigo-700" },
      { label: "Django", bg: "bg-purple-200", text: "text-purple-700" },
    ],
  },
];

const trustAvatars = ["Priya S", "Alex Chen", "Rohan V", "Sarah Kim", "Dev M"];

const HeroSection = () => {
  const navigate = useNavigate();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative overflow-hidden pt-14 pb-20 lg:pt-20 lg:pb-28">
      {/* The ambient grid + blobs that used to live here now belong to the
          page shell (PublicRoutesLayout), so one continuous grid runs from
          y=0 down through the fold. The section stays transparent — no tint,
          no backdrop blur — so the grid reads exactly as crisply here as it
          does behind the resting header. */}
      <div className="lp-container relative z-10">
        <div className="grid lg:grid-cols-[1.02fr_1fr] gap-14 lg:gap-12 items-center">
          {/* ── Left: the promise ───────────────────────────── */}
          <div>
            <Reveal immediate>
              <h1 className="lp-display text-[color:var(--lp-ink)]">
                Find Your Perfect
                <br />
                <span className="lp-gradient-text">Dev Partner</span>
              </h1>
            </Reveal>

            <Reveal immediate delay={160}>
              <p className="lp-lead mt-6 max-w-[520px]">
                Connect with talented developers, share ideas, and discover
                exciting collaboration opportunities. Your next coding adventure
                starts here.
              </p>
            </Reveal>

            <Reveal immediate delay={240}>
              <div className="flex flex-wrap gap-3 mt-9">
                <button
                  onClick={() => navigate("/login")}
                  className="lp-btn lp-btn-primary group"
                >
                  Start Matching
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>
                <button
                  onClick={() => scrollTo("how-it-works")}
                  className="lp-btn lp-btn-secondary"
                >
                  Learn More
                </button>
              </div>
            </Reveal>

            {/* ── Trust strip ───────────────────────────────── */}
            <Reveal immediate delay={320}>
              <div className="mt-12">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--lp-ink-faint)]">
                  Trusted by developers worldwide
                </p>
                <div className="flex items-center gap-3.5 mt-3.5">
                  <div className="flex -space-x-2.5">
                    {trustAvatars.map((name) => (
                      <Avatar key={name} name={name} size={36} ring />
                    ))}
                    <span
                      className="grid place-items-center h-9 px-2.5 rounded-full text-[11px] font-bold text-white"
                      style={{
                        background: "var(--lp-grad)",
                        boxShadow: "0 0 0 2.5px #fff",
                      }}
                    >
                      +10K
                    </span>
                  </div>
                  <p className="text-sm text-[color:var(--lp-ink-soft)]">
                    <span className="font-bold text-[color:var(--lp-ink)]">
                      10,000+ developers
                    </span>{" "}
                    already connected
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── Right: the product, shown not described ─────── */}
          {/* The original tilted-stack illustration: a rotated gradient
              plate behind a white card that straightens on hover. */}
          <Reveal immediate delay={200} className="mt-10 lg:mt-0">
            {/* The float lives on its own wrapper: Reveal already animates
                `transform` on its element, so sharing one would cancel the
                other out. */}
            <div className="relative lp-float-slow">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-3xl transform rotate-6"
              />

              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-6">
                  {previewProfiles.map((profile) => (
                    <div
                      key={profile.name}
                      className={`flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r ${profile.cardGradient}`}
                    >
                      <div
                        className={`w-16 h-16 shrink-0 rounded-full flex items-center justify-center text-white text-2xl font-bold bg-gradient-to-br ${profile.gradient}`}
                      >
                        {profile.name.charAt(0)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-slate-900">
                          {profile.name}
                        </div>
                        <div className="text-sm text-slate-600">
                          {profile.role}
                        </div>
                        <div className="flex space-x-2 mt-2">
                          {profile.skills.map((skill) => (
                            <span
                              key={skill.label}
                              className={`px-2 py-1 text-xs rounded-full ${skill.bg} ${skill.text}`}
                            >
                              {skill.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <div className="inline-flex items-center space-x-2 text-purple-600 font-medium">
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span>1,247 developers online now</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

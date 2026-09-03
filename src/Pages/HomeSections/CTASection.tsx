import { useNavigate } from "react-router-dom";
import { ArrowRight, Rocket } from "lucide-react";
import { Reveal } from "./LandingPrimitives";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="pb-24 sm:pb-28">
      <div className="lp-container">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[28px] px-8 py-14 sm:px-14 sm:py-16"
            style={{
              background: "var(--lp-grad)",
              boxShadow: "0 30px 70px -30px rgba(70, 45, 175, 0.7)",
            }}
          >
            {/* Depth: one soft light source top-left, a dot field bottom-right. */}
            <div
              aria-hidden="true"
              className="absolute -top-24 -left-16 w-80 h-80 rounded-full bg-white/15 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-0 right-0 w-64 h-40 text-white/25 lp-dots"
            />

            <div className="relative flex flex-col lg:flex-row items-center gap-10">
              <div className="flex-1 text-center lg:text-left">
                <h2 className="lp-h2 text-white">
                  Ready to Build Something Amazing?
                </h2>
                <p className="mt-4 text-[16px] leading-[1.7] text-white/85 max-w-[560px] mx-auto lg:mx-0">
                  Join thousands of developers who are already building the
                  future together.
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-8">
                  <button
                    onClick={() => navigate("/login")}
                    className="lp-btn lp-btn-white lp-on-dark group"
                  >
                    Create Free Account
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="lp-btn lp-btn-ghost-light lp-on-dark"
                  >
                    Explore Developers
                  </button>
                </div>
              </div>

              {/* Rocket mark — one illustration, sized to balance the copy
                  block without competing with the buttons for attention. */}
              <div aria-hidden="true" className="shrink-0 hidden lg:block">
                <div className="relative grid place-items-center w-40 h-40">
                  <span className="absolute inset-0 rounded-full bg-white/12" />
                  <span className="absolute inset-5 rounded-full bg-white/12" />
                  <span className="lp-glossy--on-light relative grid place-items-center w-20 h-20 rounded-[26px] bg-white/95 text-[color:var(--lp-violet-600)] shadow-[0_16px_34px_-14px_rgba(9,12,30,.6)] lp-float">
                    <Rocket size={34} strokeWidth={2.1} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CTASection;

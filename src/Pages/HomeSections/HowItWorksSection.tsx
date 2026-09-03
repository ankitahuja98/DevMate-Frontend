import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Route } from "lucide-react";
import { Reveal } from "./LandingPrimitives";

const steps = [
  {
    number: "01",
    accent: "#6d3df5",
    title: "Create your developer profile",
    description:
      "Sign up, add the stack you actually work in, and link what you've shipped. It takes a few minutes and it's what every match is built on.",
    chips: ["GitHub import", "Skill tags"],
  },
  {
    number: "02",
    accent: "#06b6d4",
    title: "Discover developers who fit",
    description:
      "Browse by skills, experience and the kind of project you want to build — not by who happened to sign up most recently.",
    chips: ["Stack filters", "Smart matches"],
  },
  {
    number: "03",
    accent: "#f59e0b",
    title: "Connect and start talking",
    description:
      "Send a connection request. When it's mutual, chat opens immediately — no waiting on an inbox and no cold outreach.",
    chips: ["Mutual matches", "Real-time chat"],
  },
  {
    number: "04",
    accent: "#10b981",
    title: "Build something together",
    description:
      "Scope the idea, split the work and ship it. Plenty of side projects, startups and long-term collaborations started right here.",
    chips: ["Side projects", "Co-founders"],
  },
];

/* Reports which step is nearest the middle of the viewport, so the rail,
   the counter and the active card all stay in sync with the read.

   #root is the scroll container in this app (see App.css), not the window,
   so the listener has to cover both — plus resize, since every measurement
   here is geometric. */
const useActiveStep = (count: number) => {
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const measure = useCallback(() => {
    const middle = window.innerHeight / 2;
    let nearest = 0;
    let shortest = Infinity;

    rowRefs.current.forEach((row, i) => {
      if (!row) return;
      const { top, height } = row.getBoundingClientRect();
      const distance = Math.abs(top + height / 2 - middle);
      if (distance < shortest) {
        shortest = distance;
        nearest = i;
      }
    });

    setActive(nearest);
  }, []);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      // rAF-throttled: scroll fires far more often than we need to remeasure.
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };

    const scroller = document.getElementById("root");
    scroller?.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Initial position, scheduled rather than called straight from the
    // effect body so the first measurement can't cascade a render.
    onScroll();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      scroller?.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [measure, count]);

  return { active, rowRefs };
};

const HowItWorksSection = () => {
  const { active, rowRefs } = useActiveStep(steps.length);
  const listRef = useRef<HTMLOListElement>(null);
  const markerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [progress, setProgress] = useState(0);

  /* The rail fills to the centre of the active marker. Measured rather
     than derived from the index, because the cards are different heights
     so an even split would drift away from the dots. */
  useLayoutEffect(() => {
    const list = listRef.current;
    const marker = markerRefs.current[active];
    if (!list || !marker) return;

    const update = () => {
      const listTop = list.getBoundingClientRect().top;
      const { top, height } = marker.getBoundingClientRect();
      setProgress(Math.max(0, top + height / 2 - listTop - 8));
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [active]);

  return (
    <section
      id="how-it-works"
      className="lp-section scroll-mt-24 bg-white border-y border-[color:var(--lp-border)]"
    >
      <div className="lp-container">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-12 lg:gap-20 items-start">
          {/* ── Left: the sticky intro ──────────────────────── */}
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <span className="lp-eyebrow">
                <Route size={14} strokeWidth={2.6} />
                How It Works
              </span>
            </Reveal>

            <Reveal delay={60}>
              <h2 className="lp-h2 mt-5 text-[color:var(--lp-ink)]">
                Four steps from
                <br />
                <span className="lp-gradient-text">hello to shipped.</span>
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="lp-lead mt-4 max-w-[420px]">
                Everything between signing up and shipping with someone who
                already knows your stack.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <p className="lp-tl-count mt-9" aria-hidden="true">
                <span className="lp-tl-count-now lp-gradient-text">
                  {steps[active].number}
                </span>
                <span className="lp-tl-count-total">
                  / {String(steps.length).padStart(2, "0")}
                </span>
              </p>
            </Reveal>
          </div>

          {/* ── Right: the tracked rail ─────────────────────── */}
          <ol
            ref={listRef}
            className="lp-tl"
            style={
              { "--lp-tl-progress": `${progress}px` } as React.CSSProperties
            }
          >
            {steps.map(({ number, accent, title, description, chips }, i) => (
              <li
                key={number}
                ref={(node) => {
                  rowRefs.current[i] = node;
                }}
                className="lp-tl-row"
                data-active={i === active}
                style={{ "--lp-tl-accent": accent } as React.CSSProperties}
              >
                <span
                  ref={(node) => {
                    markerRefs.current[i] = node;
                  }}
                  className="lp-tl-marker"
                  aria-hidden="true"
                >
                  {number}
                </span>

                <Reveal delay={i * 90} as="article" className="lp-tl-card">
                  <h3 className="relative text-[15px] font-bold tracking-[-0.015em] text-[color:var(--lp-ink)]">
                    {title}
                  </h3>
                  <p className="relative mt-2 text-[13px] leading-[1.65] text-[color:var(--lp-ink-soft)]">
                    {description}
                  </p>
                  <div className="relative flex flex-wrap gap-2 mt-4">
                    {chips.map((chip) => (
                      <span key={chip} className="lp-tl-chip">
                        {chip}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

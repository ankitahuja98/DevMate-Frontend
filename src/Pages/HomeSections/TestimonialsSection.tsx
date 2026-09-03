import { Quote, Star } from "lucide-react";
import { Avatar, Reveal, SectionHeading } from "./LandingPrimitives";

const testimonials = [
  {
    quote:
      "Devmate helped me find an amazing co-founder for my startup. The quality of developers here is exceptional.",
    name: "Priya Sharma",
    role: "Founder, CodeFlow",
  },
  {
    quote:
      "I've collaborated on 5+ projects through Devmate. It's the best platform for developer networking.",
    name: "Alex Johnson",
    role: "Full-Stack Developer",
  },
  {
    quote:
      "The matching experience is excellent. I found developers who actually share my vision and tech stack.",
    name: "Sarah Wilson",
    role: "UI/UX Designer",
  },
  {
    quote:
      "I was the only backend dev at my company. Two weeks in I had three people to review my architecture with.",
    name: "Rohan Verma",
    role: "Backend Engineer",
  },
  {
    quote:
      "Filtering by stack meant no wasted conversations. Every match already knew React and shipped side projects.",
    name: "Meera Nair",
    role: "Frontend Developer",
  },
];

/* The track is rendered twice so it can loop seamlessly: the animation
   travels exactly -50%, which puts copy two where copy one began. Only
   the first pass is exposed to assistive tech — the rest is decoration. */
const marqueeCards = [...testimonials, ...testimonials];

type Testimonial = (typeof testimonials)[number];

const TestimonialCard = ({
  quote,
  name,
  role,
  duplicate,
}: Testimonial & { duplicate?: boolean }) => (
  /* The card is the flex item itself — no wrapper — so it can size and
     stretch to the track's row height. */
  <figure className="lp-t-card" aria-hidden={duplicate || undefined}>
    <Quote
      size={26}
      strokeWidth={2}
      className="text-[color:var(--lp-violet-400)]"
      aria-hidden="true"
    />

    <blockquote className="mt-4 text-[15px] leading-[1.7] text-[color:var(--lp-ink)]">
      {quote}
    </blockquote>

    <div className="flex gap-0.5 mt-5" aria-label="Rated 5 out of 5" role="img">
      {Array.from({ length: 5 }).map((_, s) => (
        <Star
          key={s}
          size={14}
          className="fill-amber-400 text-amber-400"
          aria-hidden="true"
        />
      ))}
    </div>

    <figcaption className="mt-auto pt-6 flex items-center gap-3">
      <Avatar name={name} size={40} />
      <div>
        <p className="text-[14px] font-semibold text-[color:var(--lp-ink)]">
          {name}
        </p>
        <p className="text-[12.5px] text-[color:var(--lp-ink-soft)]">{role}</p>
      </div>
    </figcaption>
  </figure>
);

const TestimonialsSection = () => (
  <section className="lp-section">
    <div className="lp-container">
      <SectionHeading
        eyebrow={
          <>
            <Star size={14} strokeWidth={2.6} />
            Testimonials
          </>
        }
        titleTop="Reviews From Our"
        titleAccent="Developer Community"
        lead="Real teams, side projects and startups that started with a connection on Devmate."
      />
    </div>

    {/* Full-bleed on purpose: the strip has to run past both edges of the
        container for cards to blur in and out of frame rather than
        appearing at a visible boundary. */}
    <Reveal className="mt-14">
      <div className="lp-marquee">
        <div className="lp-marquee-track">
          {marqueeCards.map((testimonial, i) => (
            <TestimonialCard
              key={`${testimonial.name}-${i}`}
              {...testimonial}
              duplicate={i >= testimonials.length}
            />
          ))}
        </div>

        <div
          className="lp-marquee-edge lp-marquee-edge--left"
          aria-hidden="true"
        />
        <div
          className="lp-marquee-edge lp-marquee-edge--right"
          aria-hidden="true"
        />
      </div>
    </Reveal>
  </section>
);

export default TestimonialsSection;

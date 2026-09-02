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
];

const TestimonialsSection = () => (
  <section className="lp-section">
    <div className="lp-container">
      <SectionHeading
        eyebrow={
          <>
            <Star size={14} strokeWidth={2.6} />
            Loved by Developers
          </>
        }
        titleTop="What Developers Say"
        lead="Real teams, side projects and startups that started with a connection on Devmate."
      />

      <div className="grid md:grid-cols-3 gap-5 mt-14">
        {testimonials.map(({ quote, name, role }, i) => (
          <Reveal key={name} delay={i * 100} as="article" className="h-full">
            <figure className="group h-full flex flex-col p-7 bg-white rounded-[20px] border border-[color:var(--lp-border)] shadow-[var(--lp-shadow-xs)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[color:var(--lp-violet-400)] hover:shadow-[var(--lp-shadow-md)]">
              <Quote
                size={26}
                strokeWidth={2}
                className="text-[color:var(--lp-violet-400)]"
                aria-hidden="true"
              />

              <blockquote className="mt-4 text-[15px] leading-[1.7] text-[color:var(--lp-ink)]">
                {quote}
              </blockquote>

              <div
                className="flex gap-0.5 mt-5"
                aria-label="Rated 5 out of 5"
                role="img"
              >
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
                  <p className="text-[12.5px] text-[color:var(--lp-ink-soft)]">
                    {role}
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;

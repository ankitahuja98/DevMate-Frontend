import { lazy, Suspense } from "react";
import SEO from "../Components/SEO";
import "../CSS/Landing.css";

// Above the fold — must paint on first render, so no lazy boundary.
import HeroSection from "./HomeSections/HeroSection";
import StatsSection from "./HomeSections/StatsSection";

// Below the fold — split out to keep the initial bundle small.
const FeatureSection = lazy(() => import("./HomeSections/FeatureSection"));
const HowItWorksSection = lazy(
  () => import("./HomeSections/HowItWorksSection"),
);
const TestimonialsSection = lazy(
  () => import("./HomeSections/TestimonialsSection"),
);
const CTASection = lazy(() => import("./HomeSections/CTASection"));
const Footer = lazy(() => import("./Footer"));

const homeSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Devmate",
    alternateName: "devmate.co.in",
    url: "https://devmate.co.in/",
    applicationCategory: "SocialNetworkingApplication",
    operatingSystem: "Web",
    description:
      "Devmate is a developer matching platform where developers connect, find coding partners, and collaborate on projects.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "500",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Devmate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Devmate (devmate.co.in) is an Indian developer matching platform that helps developers find coding partners, collaborate on projects, and grow their tech network.",
        },
      },
      {
        "@type": "Question",
        name: "How does Devmate work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Create a free profile, explore developers by skills and interests, send connection requests, match with compatible developers, and start collaborating via chat.",
        },
      },
      {
        "@type": "Question",
        name: "Is Devmate free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Devmate is free to join. Premium plans are available for advanced features like unlimited matches and priority visibility.",
        },
      },
    ],
  },
];

/* Reserves roughly the height a section will occupy so lazy chunks
   swapping in don't shove the page around mid-scroll. */
const SectionFallback = ({ height = 520 }: { height?: number }) => (
  <div style={{ minHeight: height }} aria-hidden="true" />
);

const HomePage = () => (
  <main className="lp">
    <SEO
      title="Devmate — Find Your Perfect Developer Partner in India"
      description="Devmate is India's developer matching platform. Connect with skilled developers, find coding partners, collaborate on projects, and build amazing products together."
      canonical="https://devmate.co.in/"
      schemas={homeSchemas}
    />

    <HeroSection />
    <StatsSection />

    <Suspense fallback={<SectionFallback />}>
      <FeatureSection />
    </Suspense>

    <Suspense fallback={<SectionFallback height={460} />}>
      <HowItWorksSection />
    </Suspense>

    <Suspense fallback={<SectionFallback height={460} />}>
      <TestimonialsSection />
    </Suspense>

    <Suspense fallback={<SectionFallback height={380} />}>
      <CTASection />
    </Suspense>

    <Suspense fallback={<SectionFallback height={420} />}>
      <Footer />
    </Suspense>
  </main>
);

export default HomePage;

import { lazy, Suspense } from "react";
import SEO from "../Components/SEO";

// HeroSection loads eagerly — it's above the fold (critical for first render)
import HeroSection from "./HomeSections/HeroSection";

// Below-the-fold sections are lazy loaded — reduces initial bundle size
const FeatureSection = lazy(() => import("./HomeSections/FeatureSection"));
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

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      <SEO
        title="Devmate — Find Your Perfect Developer Partner in India"
        description="Devmate is India's developer matching platform. Connect with skilled developers, find coding partners, collaborate on projects, and build amazing products together."
        canonical="https://devmate.co.in/"
        schemas={homeSchemas}
      />

      {/* Hero Section — eagerly loaded (above the fold) */}
      <HeroSection />

      {/* Below-the-fold sections — lazy loaded with Suspense fallback */}
      <Suspense fallback={<SectionSkeleton />}>
        <FeatureSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <CTASection />
      </Suspense>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

// Lightweight placeholder shown while lazy sections load
const SectionSkeleton = () => (
  <div className="py-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto animate-pulse space-y-6">
      <div className="h-8 bg-slate-200 rounded-full w-1/3 mx-auto"></div>
      <div className="h-4 bg-slate-100 rounded-full w-2/3 mx-auto"></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-48 bg-slate-100 rounded-2xl"></div>
        ))}
      </div>
    </div>
  </div>
);

export default HomePage;

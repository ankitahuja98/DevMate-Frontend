import { lazy, Suspense } from "react";

// HeroSection loads eagerly — it's above the fold (critical for first render)
import HeroSection from "./HomeSections/HeroSection";

// Below-the-fold sections are lazy loaded — reduces initial bundle size
const FeatureSection = lazy(() => import("./HomeSections/FeatureSection"));
const CTASection = lazy(() => import("./HomeSections/CTASection"));
const Footer = lazy(() => import("./Footer"));

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
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

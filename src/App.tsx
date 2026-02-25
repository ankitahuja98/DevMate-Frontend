import { lazy, Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { FullscreenProvider } from "./context/FullscreenContext";
import useAuth from "./Layout/Auth/useAuth";

// ─── Eagerly loaded layouts ────
import PublicRoutesLayout from "./Layout/PublicRoutesLayout/PublicRoutesLayout";
import ProtectedRoutes from "./Layout/Auth/ProtectedRoutes";

// ─── Auth & Layouts (loaded only when route is hit) ───────
const ResponsiveLogin = lazy(
  () => import("./Layout/ResponsiveLogin/ResponsiveLogin"),
);
const ResponsiveLayout = lazy(
  () => import("./Layout/ResponsiveLayout/ResponsiveLayout"),
);

// ───  Public informational pages ─────
const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/info/About"));
const Founder = lazy(() => import("./Pages/info/Founder"));
const Contact = lazy(() => import("./Pages/info/Contact"));
const Premium = lazy(() => import("./Pages/info/Premium"));
const Features = lazy(() => import("./Pages/info/Features"));
const PrivacyPolicy = lazy(() => import("./Pages/info/PrivacyPolicy"));
const Terms = lazy(() => import("./Pages/info/Terms"));
const RefundPolicy = lazy(() => import("./Pages/info/RefundPolicy"));

// ───  Protected app pages ──────
const Explore = lazy(() => import("./Pages/Explore"));
const Profile = lazy(() => import("./Pages/Profile"));
const LikedYou = lazy(() => import("./Pages/LikedYou"));
const Matches = lazy(() => import("./Pages/Matches"));
const Chat = lazy(() => import("./Pages/Chat"));
const Settings = lazy(() => import("./Pages/Settings"));

// ─── Fallback UI ─────
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-slate-500 text-sm font-medium">Loading...</p>
    </div>
  </div>
);

function App() {
  useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <FullscreenProvider>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* ── Public: Auth ─── */}
          <Route path="/login" element={<ResponsiveLogin />} />

          {/* ── Public: Informational pages ─── */}
          <Route element={<PublicRoutesLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/founder" element={<Founder />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Premium />} />
            <Route path="/features" element={<Features />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
          </Route>

          {/* ── Protected: App pages ──── */}
          <Route element={<ProtectedRoutes />}>
            <Route element={<ResponsiveLayout />}>
              <Route path="/explore" element={<Explore />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/likedyou" element={<LikedYou />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/chat/:targetUserId" element={<Chat />} />
              <Route path="/setting" element={<Settings />} />
              <Route path="/premium" element={<Premium />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/explore" replace />} />
        </Routes>
      </Suspense>

      <ToastContainer
        position={isMobile ? "top-center" : "bottom-right"}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </FullscreenProvider>
  );
}

export default App;

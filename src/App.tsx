import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoutes from "./Layout/Auth/ProtectedRoutes";
import Explore from "./Pages/Explore";
import LikedYou from "./Pages/LikedYou";
import Settings from "./Pages/Settings";
import Profile from "./Pages/Profile";
import Matches from "./Pages/Matches";
import Chat from "./Pages/Chat";
import { ToastContainer } from "react-toastify";
import ResponsiveLayout from "./Layout/ResponsiveLayout/ResponsiveLayout";
import ResponsiveLogin from "./Layout/ResponsiveLogin/ResponsiveLogin";
import Home from "./Pages/Home";
import About from "./Pages/info/About";
import Contact from "./Pages/info/Contact";
import PrivacyPolicy from "./Pages/info/PrivacyPolicy";
import Terms from "./Pages/info/Terms";
import RefundPolicy from "./Pages/info/RefundPolicy";
import Premium from "./Pages/info/Premium";
import Features from "./Pages/info/Features";
import PublicRoutesLayout from "./Layout/PublicRoutesLayout/PublicRoutesLayout";
import Founder from "./Pages/info/Founder";
import { FullscreenProvider } from "./context/FullscreenContext";
import { useEffect, useState } from "react";
import useAuth from "./Layout/Auth/useAuth";

function App() {
  useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <FullscreenProvider>
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<ResponsiveLogin />} />

        <Route element={<PublicRoutesLayout />}>
          <Route path="/" element={<Home />} />
          {/* Public informational pages */}
          <Route path="/about" element={<About />} />
          <Route path="/founder" element={<Founder />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Premium />} />
          <Route path="/features" element={<Features />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
        </Route>

        {/* Protected Routes */}
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

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/explore" replace />} />
      </Routes>

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

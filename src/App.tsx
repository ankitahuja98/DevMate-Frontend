import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoutes from "./Layout/Auth/ProtectedRoutes";
import Explore from "./Pages/Explore";
import LikedYou from "./Pages/LikedYou";
import Discover from "./Pages/Discover";
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
import Pricing from "./Pages/info/Pricing";
import Features from "./Pages/info/Features";
import PublicRoutesLayout from "./Layout/PublicRoutesLayout/PublicRoutesLayout";

function App() {
  return (
    <>
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<ResponsiveLogin />} />

        <Route element={<PublicRoutesLayout />}>
          <Route index element={<Home />} />
          {/* Public informational pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
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
            <Route path="/chat" element={<Chat />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/setting" element={<Settings />} />
            <Route path="*" element={<Navigate to="/explore" replace />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}

export default App;

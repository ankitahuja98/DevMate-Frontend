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

function App() {
  return (
    <>
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<ResponsiveLogin />} />
        <Route index element={<Home />} />

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

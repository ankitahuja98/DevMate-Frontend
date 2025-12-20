import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginSignup from "./Layout/Login";
import ProtectedRoutes from "./Layout/Auth/ProtectedRoutes";
import MainLayout from "./Layout/MainLayout/index";
import Explore from "./Pages/Explore";
import LikedYou from "./Pages/LikedYou";
import Chat from "./Pages/Chat";
import Discover from "./Pages/Discover";
import Settings from "./Pages/Settings";
import Profile from "./Pages/Profile";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<LoginSignup />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<MainLayout />}>
            <Route index element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/likedyou" element={<LikedYou />} />
            <Route path="/chats" element={<Chat />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/setting" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
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

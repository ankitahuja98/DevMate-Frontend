import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginSignup from "./Layout/Login";
import ProtectedRoutes from "./Layout/Auth/ProtectedRoutes";
import MainLayout from "./Layout/MainLayout/index";
import Feed from "./Layout/Feed/index";

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/login" element={<LoginSignup />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Feed />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

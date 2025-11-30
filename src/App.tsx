import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginSignup from "./Layout/Login";
import Feed from "./Layout/Feed";
import ProtectedRoutes from "./Layout/Auth/ProtectedRoutes";

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/login" element={<LoginSignup />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/feed" element={<Feed />} />
        <Route path="*" element={<Navigate to="/feed" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

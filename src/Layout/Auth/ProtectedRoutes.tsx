import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/store/store";

const ProtectedRoutes = () => {
  const { userProfileData, userProfileIsloading } = useAppSelector(
    (store) => store.profile.userProfile
  );

  // While checking, DON’T redirect yet
  if (userProfileIsloading) {
    return <div>Checking authentication...</div>;
  }

  // If backend says no user → redirect
  if (!userProfileData) {
    return <Navigate to="/login" replace />;
  }

  // Auth OK
  return <Outlet />;
};

export default ProtectedRoutes;

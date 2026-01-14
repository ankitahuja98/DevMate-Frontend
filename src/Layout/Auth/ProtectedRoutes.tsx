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

  if (userProfileData) {
    return <Outlet />; // user is authenticated
  }

  return <Navigate to="/" replace />; // not logged in → go to home
};

export default ProtectedRoutes;

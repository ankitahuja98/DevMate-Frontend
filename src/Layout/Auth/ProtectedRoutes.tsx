import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/store/store";
import LoadingThreeDotsPulse from "../../Components/Loader";

const ProtectedRoutes = () => {
  const location = useLocation();

  const { userProfileData, userProfileIsloading } = useAppSelector(
    (store) => store.profile.userProfile,
  );

  if (userProfileIsloading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingThreeDotsPulse />
      </div>
    );
  }

  if (!userProfileData) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;

import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector, type AppDispatch } from "../../redux/store/store";
import { fetchUserProfile } from "../../redux/actions/profileAction";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const ProtectedRoutes = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { userProfileData, userProfileIsloading } = useAppSelector(
    (store) => store.profile.userProfile
  );

  useEffect(() => {
    if (!userProfileData) {
      dispatch(fetchUserProfile());
    }
  }, []);

  if (userProfileIsloading) return <div>Checking authentication...</div>;

  if (!userProfileData) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoutes;

// ***************************************************************

// First render:

// const isUser = useAppSelector(
//   (store) => store.profile.userProfile.userProfileData
// );
// if (!isUser) return <Navigate to="/login" replace />;

// isUser is null (Redux is empty on first render)

// Component immediately redirects to /login

// useEffect runs after first render:

// useEffect(() => {
//   if (!isUser) {
//     dispatch(fetchUserProfile());
//   }
// }, []);

// This tries to fetch /profile/view from backend

// Backend checks token

// If no token (user logged out or never logged in) → returns 401 / no data

// Redux is not updated (still null)

// Result:

// Redux stays null

// Component stays on /login

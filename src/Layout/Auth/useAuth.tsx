import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector, type AppDispatch } from "../../redux/store/store";
import { fetchUserProfile } from "../../redux/actions/profileAction";

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userProfileData, userProfileIsloading, userProfileIserror } =
    useAppSelector((store) => store.profile.userProfile);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);
  return {
    isAuthenticated: !!userProfileData,
    isLoading: userProfileIsloading,
    user: userProfileData,
    error: userProfileIserror,
  };
};

export default useAuth;

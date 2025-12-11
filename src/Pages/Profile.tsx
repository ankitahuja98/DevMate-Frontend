import "../CSS/Profile.css";
import { useAppSelector } from "../redux/store/store";

const Profile = () => {
  const userprofile = useAppSelector(
    (store) => store.profile.userProfile.userProfileData
  );
  const { name, age } = userprofile;
  return (
    <div className="profileContainer border-2 grid grid-cols-3 ">
      <div className="leftSection border-2 col-span-1">
        <img
          className="userImage"
          src="https://images.unsplash.com/photo-1552058544-f2b08422138a"
          alt="user profile"
        />
        <p className="text-2xl font-bold mt-4">{name}</p>
        <p className="text-2xl font-bold mt-4">{age}</p>
      </div>
      <div className="RightSection border-2 col-span-2">right</div>
    </div>
  );
};

export default Profile;

import { useAppSelector } from "../redux/store/store";
import "../CSS/LikedYou.css";
import LikedYouUserCard from "../Components/LikedYouUserCard";

const LikedYou = () => {
  const AllUsers =
    useAppSelector((store) => store.user.userProfileData?.data) || [];
  return (
    <div className="LikedyouContainer">
      {AllUsers.length !== 0 &&
        AllUsers.map((val: any) => {
          return <LikedYouUserCard key={val._id} val={val} />;
        })}
    </div>
  );
};

export default LikedYou;

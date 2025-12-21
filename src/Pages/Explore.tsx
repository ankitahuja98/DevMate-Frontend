import "../CSS/Explore.css";
import Card from "../Components/Card";
import { useAppSelector, type AppDispatch } from "../redux/store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../redux/actions/userAction";

const Explore = () => {
  const AllUsers =
    useAppSelector((store) => store.user.userProfileData?.data) || [];
  console.log("AllUsers", AllUsers);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div className="ExploreContainer">
      {AllUsers.length !== 0 &&
        AllUsers.map((val: any) => {
          return <Card key={val._id} val={val} />;
        })}
    </div>
  );
};

export default Explore;

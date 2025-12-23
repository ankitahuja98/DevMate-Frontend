import { useAppSelector, type AppDispatch } from "../redux/store/store";
import "../CSS/LikedYou.css";
import LikedYouUserCard from "../Components/LikedYouUserCard";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllRequests } from "../redux/actions/userAction";

const LikedYou = () => {
  const [AllRequests, setAllRequests] = useState([]);

  const getallRequests =
    useAppSelector((store) => store.user.requestData?.data) || [];

  const getallRequestsisLoading = useAppSelector(
    (store) => store.user.requestDataIsloading
  );
  console.log("AllRequests", AllRequests);
  console.log("getallRequests", getallRequests);
  console.log("getallRequestsisLoading", getallRequestsisLoading);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllRequests());
  }, []);

  useEffect(() => {
    setAllRequests(getallRequests);
  }, [getallRequests]);

  return (
    <div className="LikedyouContainer">
      {AllRequests.length !== 0 &&
        AllRequests.map((val: any) => {
          const { fromUserId } = val;
          return <LikedYouUserCard key={fromUserId._id} val={fromUserId} />;
        })}
    </div>
  );
};

export default LikedYou;

import { useAppSelector, type AppDispatch } from "../redux/store/store";
import "../CSS/LikedYou.css";
import LikedYouUserCard from "../Components/LikedYouUserCard";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllRequests } from "../redux/actions/userAction";
import LoadingThreeDotsPulse from "../Components/Loader";
import { Button } from "@mui/material";
import AllReqSwipe from "../Images/AllReqSwipe.png";

interface Request {
  _id: string;
  fromUserId: any;
}

const LikedYou = () => {
  const [AllRequests, setAllRequests] = useState<Request[]>([]);
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

  const handleRefresh = () => {
    dispatch(getAllRequests());
  };

  useEffect(() => {
    setAllRequests(getallRequests);
  }, [getallRequests]);

  const filterRequestData = (id: string) => {
    setAllRequests((prev) => prev.filter((val: any) => val._id !== id));
  };

  return (
    <div
      className={`LikedyouContainer ${
        AllRequests.length < 2 ? "singleReq" : "MultiReq"
      }`}
    >
      {!getallRequestsisLoading ? (
        AllRequests.length !== 0 ? (
          AllRequests.map((val: any) => {
            const { fromUserId } = val;
            return (
              <LikedYouUserCard
                key={fromUserId._id}
                val={fromUserId}
                requestId={val._id}
                filterRequestData={filterRequestData}
              />
            );
          })
        ) : (
          <div className="flex justify-center items-center flex-col">
            <img
              className="w-10/12 md:w-6/12 h-auto"
              src={AllReqSwipe}
              alt="All done"
            />
            <Button
              variant="contained"
              onClick={handleRefresh}
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5568d3 0%, #6941a5 100%)",
                },
              }}
            >
              Refresh
            </Button>
          </div>
        )
      ) : (
        <LoadingThreeDotsPulse />
      )}
    </div>
  );
};

export default LikedYou;

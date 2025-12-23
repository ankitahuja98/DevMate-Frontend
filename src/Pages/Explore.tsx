import "../CSS/Explore.css";
import Card from "../Components/Card";
import { useAppSelector, type AppDispatch } from "../redux/store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../redux/actions/userAction";
import AllSwipe from "../Images/AllSwipe.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const AllUsers =
    useAppSelector((store) => store.user.userProfileData?.data) || [];
  console.log("AllUsers", AllUsers);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const handleRefresh = () => {
    dispatch(getAllUsers());
  };

  return (
    <div className="ExploreContainer">
      {AllUsers.length !== 0 ? (
        AllUsers.map((val: any) => {
          return <Card key={val._id} val={val} />;
        })
      ) : (
        <div className="flex justify-center items-center flex-col">
          <img
            className="w-10/12 md:w-6/12 h-auto"
            src={AllSwipe}
            alt="All done"
          />
          <Button
            variant="contained"
            onClick={handleRefresh}
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #5568d3 0%, #6941a5 100%)",
              },
            }}
          >
            Refresh
          </Button>
        </div>
      )}
    </div>
  );
};

export default Explore;

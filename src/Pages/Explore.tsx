import "../CSS/Explore.css";
import Card from "../Components/Card";
import { useAppSelector, type AppDispatch } from "../redux/store/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../redux/actions/userAction";
import AllSwipe from "../Images/AllSwipe.avif";
import { Button } from "@mui/material";
import type { userData } from "../types/userData";
import LoadingThreeDotsPulse from "../Components/Loader";

const Explore = () => {
  const [AllUsers, setAllUsers] = useState([]);
  const getallUsers =
    useAppSelector((store) => store.user.userData?.data) || [];

  const getallUsersisLoading = useAppSelector(
    (store) => store.user.userDataIsloading
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    setAllUsers(getallUsers);
  }, [getallUsers]);

  const handleRefresh = () => {
    dispatch(getAllUsers());
  };

  const filterUserData = (id: string) => {
    setAllUsers((prev) => prev.filter((val: userData) => val._id !== id));
  };

  return (
    <div className="ExploreContainer">
      {!getallUsersisLoading ? (
        AllUsers.length !== 0 ? (
          AllUsers.map((val: any) => {
            return (
              <Card key={val._id} val={val} filterUserData={filterUserData} />
            );
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

export default Explore;

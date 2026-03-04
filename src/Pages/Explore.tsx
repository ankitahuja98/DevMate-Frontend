import "../CSS/Explore.css";
import Card from "../Components/Card";
import { useAppSelector, type AppDispatch } from "../redux/store/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../redux/actions/userAction";
import { resetUsers } from "../redux/slices/userSlice";
import AllSwipe from "../Images/AllSwipe.avif";
import { Button } from "@mui/material";
import type { userData } from "../types/userData";
import LoadingThreeDotsPulse from "../Components/Loader";
import SEO from "../Components/SEO";

const Explore = () => {
  const [cursor, setCursor] = useState<string | null>(null);
  const [isFetchingNext, setIsFetchingNext] = useState(false);

  const AllUsers: userData[] =
    useAppSelector((store) => store.user.userData?.data) || [];
  const hasMoreUsers = useAppSelector((store) => store.user.userData?.hasMore);
  const nextCursor =
    useAppSelector((store) => store.user.userData?.nextCursor) || null;
  const getallUsersisLoading = useAppSelector(
    (store) => store.user.userDataIsloading,
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllUsers({ cursor: null }));
  }, [dispatch]);

  useEffect(() => {
    if (nextCursor) setCursor(nextCursor);
    if (!getallUsersisLoading && isFetchingNext) setIsFetchingNext(false);
  }, [nextCursor, getallUsersisLoading]);

  // Auto-fetch next batch when the stack runs low (< 5 cards left)
  useEffect(() => {
    if (
      !getallUsersisLoading &&
      !isFetchingNext &&
      hasMoreUsers &&
      cursor &&
      AllUsers.length > 0 &&
      AllUsers.length < 5
    ) {
      setIsFetchingNext(true);
      dispatch(getAllUsers({ cursor }));
    }
  }, [
    AllUsers.length,
    getallUsersisLoading,
    hasMoreUsers,
    isFetchingNext,
    cursor,
    dispatch,
  ]);

  const handleRefresh = () => {
    setCursor(null);
    setIsFetchingNext(false);
    dispatch(resetUsers());
    dispatch(getAllUsers({ cursor: null }));
  };

  return (
    <>
      <SEO
        title="Explore Developers - Devmate"
        description="Explore and discover developers that match your interests."
      />
      <div className="ExploreContainer">
        {!getallUsersisLoading ? (
          AllUsers.length !== 0 ? (
            AllUsers.map((val: any, index: number) => (
              <Card
                key={val._id}
                val={val}
                zIndex={AllUsers.length - index}
                isVisible={index <= 1}
              />
            ))
          ) : (
            <div className="flex justify-center items-center flex-col gap-4">
              <img
                className="w-10/12 md:w-6/12 h-auto"
                src={AllSwipe}
                alt="All done"
              />
              <Button
                variant="contained"
                onClick={handleRefresh}
                sx={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
    </>
  );
};

export default Explore;

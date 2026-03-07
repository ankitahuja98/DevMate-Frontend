import { useAppSelector, type AppDispatch } from "../redux/store/store";
import "../CSS/LikedYou.css";
import Card from "../Components/Card";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllRequests } from "../redux/actions/userAction";
import LoadingThreeDotsPulse from "../Components/Loader";
import { Button } from "@mui/material";
import AllReqSwipe from "../Images/AllReqSwipe.avif";
import SEO from "../Components/SEO";

interface Request {
  _id: string;
  fromUserId: any;
}

const LikedYou = () => {
  const [AllRequests, setAllRequests] = useState<Request[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  const getallRequests =
    useAppSelector((store) => store.user.requestData?.data) || [];
  const getallRequestsisLoading = useAppSelector(
    (store) => store.user.requestDataIsloading,
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllRequests());
  }, []);
  useEffect(() => {
    setAllRequests(getallRequests);
  }, [getallRequests]);

  const handleRefresh = () => dispatch(getAllRequests());

  const filterRequestData = (id: string) => {
    setAllRequests((prev) => prev.filter((val: any) => val._id !== id));
  };

  const handleCloseModal = () => setSelectedRequest(null);

  // ── Loading ────────────────────────────────────────────────────────────────
  if (getallRequestsisLoading) {
    return (
      <div className="LikedyouContainer">
        <div className="loader-wrapper">
          <LoadingThreeDotsPulse />
        </div>
      </div>
    );
  }

  // ── Empty ──────────────────────────────────────────────────────────────────
  if (AllRequests.length === 0) {
    return (
      <div className="LikedyouContainer">
        <div className="flex justify-center items-center flex-col gap-4 pt-10">
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
                background: "linear-gradient(135deg, #5568d3 0%, #6941a5 100%)",
              },
            }}
          >
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Liked You - Devmate"
        description="Developers who liked your profile."
      />

      <div className="LikedyouContainer">
        {/* ── Header count ──────────────────────────────────────────────────── */}
        <div className="LikedYouHeader">
          <span className="LikedYouHeaderCount">
            {AllRequests.length}{" "}
            {AllRequests.length === 1 ? "person" : "people"} liked you
          </span>
          <span className="LikedYouHeaderHint">
            Tap a photo to view their full profile
          </span>
        </div>

        {/* ── Photo grid (both mobile and desktop) ──────────────────────────── */}
        <div className="LikedYouPhotoGrid">
          {AllRequests.map((val: any) => {
            const u = val.fromUserId;
            return (
              <button
                key={u._id}
                className="LikedYouPhotoTile"
                onClick={() => setSelectedRequest(val)}
              >
                <img src={u.profilePhoto} alt={u.name} draggable={false} />
                <div className="LikedYouPhotoTileOverlay">
                  <span className="LikedYouPhotoTileName">{u.name}</span>
                  {u.age && (
                    <span className="LikedYouPhotoTileAge">{u.age}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Modal overlay — same pattern as Matches page ──────────────────── */}
      {selectedRequest && (
        <div className="chatCardOverlay" onClick={handleCloseModal}>
          <div
            className="chatCardContainer"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="chatCardCloseButton" onClick={handleCloseModal}>
              ✕
            </button>
            <div className="chatCardWrapper">
              <Card
                val={selectedRequest.fromUserId}
                mode="likedYou"
                requestId={selectedRequest._id}
                filterRequestData={(id) => {
                  filterRequestData(id);
                  handleCloseModal();
                }}
                sheetMode
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LikedYou;

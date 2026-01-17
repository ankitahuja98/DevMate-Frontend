import "../CSS/Matches.css";
import { useEffect, useState } from "react";
import { useAppSelector, type AppDispatch } from "../redux/store/store";
import LikedYouUserCard from "../Components/LikedYouUserCard";
import SearchIcon from "@mui/icons-material/Search";
import type { userData } from "../types/userData";
import { getAllMatches } from "../redux/actions/userAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Matches = () => {
  const [selectedMatch, setSelectedMatch] = useState<userData | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const matches = useAppSelector((store) => store.user.matchesData?.data) || [];
  console.log("matches", matches);

  useEffect(() => {
    dispatch(getAllMatches());
  }, []);

  const handleMatchClick = (match: userData) => {
    setSelectedMatch(match);
  };

  const handleCloseCard = () => {
    setSelectedMatch(null);
  };

  const handleChatClick = (targetUserId: string) => {
    navigate(`/chat/${targetUserId}`);
  };

  return (
    <div className="chatPageContainer">
      <div className="w-full h-full flex flex-col">
        {/* Matches Section */}
        <div className="matchesSection">
          {/* <div className="matchesSectionHeader">
            <h3 className="matchesTitle">Your matches</h3>
          </div> */}
          <div className="matchesScroll">
            {matches.map((match: any) => (
              <div
                key={match._id}
                className="matchItem"
                onClick={() => handleMatchClick(match)}
              >
                <div className="matchAvatarWrapper">
                  <img
                    src={match.profilePhoto}
                    alt={match.name}
                    className="matchAvatar"
                  />
                </div>
                <p className="matchName">{match.name.split(" ")[0]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chats Section */}
        <div className="chatsSection">
          <div className="chatsSectionHeader">
            <h3 className="chatsTitle">Messages</h3>
            <div className="searchConvo">
              <SearchIcon
                sx={{ fontSize: "20px", marginRight: "3px", color: "grey" }}
              />
              <input
                className="searchConvoInput"
                type="text"
                placeholder="Search Conversations"
              />
            </div>
          </div>
          <div className="chatsList">
            {matches.length !== 0 &&
              matches.map((match: any) => (
                <div
                  key={match._id}
                  className="chatItem"
                  onClick={() => handleChatClick(match._id)}
                >
                  <div className="chatAvatarWrapper">
                    <img
                      src={match.profilePhoto}
                      alt={match.name}
                      className="chatAvatar"
                    />
                  </div>
                  <div className="chatContent">
                    <div className="chatHeader">
                      <h3 className="chatUserName">{match.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* User Card Overlay using your existing LikedYouUserCard component */}
      {selectedMatch && (
        <div className="chatCardOverlay" onClick={handleCloseCard}>
          <div
            className="chatCardContainer"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="chatCardCloseButton" onClick={handleCloseCard}>
              ✕
            </button>
            <div className="chatCardWrapper">
              <LikedYouUserCard val={selectedMatch} isMatched={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Matches;

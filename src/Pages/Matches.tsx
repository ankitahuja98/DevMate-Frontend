import "../CSS/Matches.css";
import { useEffect, useRef, useState } from "react";
import { useAppSelector, type AppDispatch } from "../redux/store/store";
import LikedYouUserCard from "../Components/LikedYouUserCard";
import SearchIcon from "@mui/icons-material/Search";
import type { userData } from "../types/userData";
import { getAllMatches } from "../redux/actions/userAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getChatList } from "../redux/actions/chatAction";
import LoadingThreeDotsPulse from "../Components/Loader";
import getDate from "../utils/getDate";
import MatchesShimmer from "../Components/MatchesShimmer";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Matches = () => {
  const [selectedMatch, setSelectedMatch] = useState<userData | null>(null);
  const [selectedChatMenu, setSelectedChatMenu] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const matches = useAppSelector((store) => store.user.matchesData?.data) || [];
  const { ChatList, isChatlistLoading } =
    useAppSelector((store) => store.chat) || [];
  const menuRef = useRef<HTMLDivElement | null>(null);

  console.log("ChatList", ChatList);

  useEffect(() => {
    dispatch(getAllMatches());
    dispatch(getChatList());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setSelectedChatMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const handleChatMenuOpen = (id: string) => {
    setSelectedChatMenu((prev) => (prev === id ? null : id));
  };

  const handleChatDelete = (targetUserId: string) => {};

  return (
    <div className="chatPageContainer">
      <div className="w-full h-full flex flex-col">
        {/* Matches Section */}
        <div className="matchesSection">
          {/* <div className="matchesSectionHeader">
            <h3 className="matchesTitle">Your matches</h3>
          </div> */}
          <div className="matchesScroll">
            {matches.length === 0 ? (
              <MatchesShimmer />
            ) : (
              matches.map((match: any) => (
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
              ))
            )}
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
            {isChatlistLoading ? (
              <div className="h-full flex justify-center items-center">
                <LoadingThreeDotsPulse />
              </div>
            ) : (
              ChatList?.length !== 0 &&
              ChatList.map((user: any) => (
                <div
                  key={user._id}
                  className="chatItem"
                  onClick={() => handleChatClick(user._id)}
                >
                  <div className="chatAvatarWrapper">
                    <img
                      src={user.profilePhoto}
                      alt={user.name}
                      className="chatAvatar"
                    />
                  </div>
                  <div className="chatContent">
                    <div className="chatHeader">
                      <div>
                        <h3 className="chatUserName">{user.name}</h3>
                        <p className="text-sm text-slate-500">
                          {getDate(user.lastSeen)}
                        </p>
                      </div>
                      <div
                        className="chatMenuWrapper"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div
                          className="chatMenuIcon"
                          onClick={() => handleChatMenuOpen(user._id)}
                        >
                          <MoreVertIcon />
                        </div>

                        {selectedChatMenu === user._id && (
                          <div ref={menuRef} className="chatMenu">
                            <div
                              className="chatMenuItem delete"
                              onClick={() => handleChatDelete(user._id)}
                            >
                              Delete
                            </div>
                            <div className="chatMenuItem block">Block</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
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

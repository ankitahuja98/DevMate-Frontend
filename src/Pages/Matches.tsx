import "../CSS/Matches.css";
import { useEffect, useMemo, useState } from "react";
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
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const Matches = () => {
  const [selectedMatch, setSelectedMatch] = useState<userData | null>(null);
  const [searchChats, setSearchChats] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const matches = useAppSelector((store) => store.user.matchesData?.data) || [];
  const { matchesDataIsloading } = useAppSelector((store) => store.user) || [];

  const { ChatList, isChatlistLoading } =
    useAppSelector((store) => store.chat) || [];

  useEffect(() => {
    dispatch(getAllMatches());
    dispatch(getChatList());
  }, []);

  const filteredChatList = useMemo(() => {
    if (!ChatList) return [];
    const search = searchChats.toLowerCase().trim();

    if (!search) return ChatList;

    return ChatList.filter((val) => {
      const name = val.user?.name?.toLowerCase() || "";
      return name.includes(search);
    });
  }, [searchChats, ChatList]);

  const handleMatchClick = (match: userData) => {
    setSelectedMatch(match);
  };

  const handleCloseCard = () => {
    setSelectedMatch(null);
  };

  const handleChatClick = (targetUserDetails: any) => {
    navigate(`/chat/${targetUserDetails._id}`, {
      state: { targetUserDetails },
    });
  };

  return (
    <div className="chatPageContainer">
      <div className="w-full h-full flex flex-col">
        {/* Matches Section */}
        <div className="matchesSection">
          <div className="matchesSectionHeader">
            <h3 className="matchesTitle">Connections</h3>
          </div>
          <div className="matchesScroll">
            {matchesDataIsloading ? (
              <MatchesShimmer />
            ) : matches.length !== 0 ? (
              matches.map((match: any) => (
                <div
                  key={match._id}
                  className="matchItem"
                  onClick={() => handleMatchClick(match)}
                >
                  <div>
                    <div className="matchAvatarWrapper">
                      <img
                        src={match.profilePhoto}
                        alt={match.name}
                        className="matchAvatar"
                      />
                    </div>
                    <p className="matchName">{match.name.split(" ")[0]}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col px-3">
                <h3 className="text-lg font-semibold text-slate-900">
                  No Matches yet
                </h3>
                <p className="text-smmt-1 mb-3 text-slate-900">
                  Explore developers to find new matches and start connecting.
                </p>
              </div>
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
                placeholder="Search"
                onChange={(e) => setSearchChats(e.target.value)}
              />
            </div>
          </div>

          <div className="chatsList">
            {isChatlistLoading ? (
              <div className="h-full flex justify-center items-center">
                <LoadingThreeDotsPulse />
              </div>
            ) : filteredChatList?.length !== 0 ? (
              filteredChatList?.map((val: any) => {
                const { user, lastmessage, isUnread } = val;
                return (
                  <>
                    <div
                      key={user._id}
                      className="chatItem"
                      onClick={() => handleChatClick(user)}
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
                            <p
                              className={`text-sm ${isUnread ? "text-gray-800 font-semibold" : "text-gray-600"}`}
                            >
                              {isUnread && (
                                <FiberManualRecordIcon
                                  sx={{
                                    fontSize: "10px",
                                    color: "#6C6ACE",
                                    marginRight: "5px",
                                  }}
                                />
                              )}
                              {lastmessage.message}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">
                              {getDate(user.lastSeen)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] px-6 text-center">
                <div className="text-4xl mb-3 opacity-80">💬</div>
                <h3 className="text-lg font-semibold text-slate-800">
                  No conversations yet
                </h3>
                <p className="text-sm text-slate-500 mt-1 mb-3 max-w-xs">
                  Start chatting with developers from the Explore page.
                </p>
                <button
                  onClick={() => navigate("/explore")}
                  className="mt-4 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 transition cursor-pointer"
                >
                  Explore Developers
                </button>
              </div>
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

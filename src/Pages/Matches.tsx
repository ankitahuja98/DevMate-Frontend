import "../CSS/Matches.css";
import { useEffect, useState } from "react";
import { useAppSelector, type AppDispatch } from "../redux/store/store";
import LikedYouUserCard from "../Components/LikedYouUserCard";
import SearchIcon from "@mui/icons-material/Search";
import type { userData } from "../types/userData";
import { getAllMatches } from "../redux/actions/userAction";
import { useDispatch } from "react-redux";
import Chat from "./Chat";

interface ChatMessage {
  _id: string;
  user: {
    _id: string;
    name: string;
    profilePhoto: string;
  };
  lastMessage: string;
  timestamp: string;
  unread: number;
}

const dummyChats = [
  {
    _id: "chat_001",
    user: {
      _id: "user_101",
      name: "Sarah Mitchell",
      profilePhoto: "https://i.pravatar.cc/150?img=1",
    },
    lastMessage: "Excellent! Looking forward to it 🎉",
    timestamp: "2025-01-12T10:39:00Z",
    unread: 0,
  },
  {
    _id: "chat_002",
    user: {
      _id: "user_102",
      name: "John Carter",
      profilePhoto: "https://i.pravatar.cc/150?img=2",
    },
    lastMessage: "Can you review the document I sent?",
    timestamp: "2025-01-12T09:15:00Z",
    unread: 3,
  },
  {
    _id: "chat_003",
    user: {
      _id: "user_103",
      name: "Emily Watson",
      profilePhoto: "https://i.pravatar.cc/150?img=3",
    },
    lastMessage: "Let’s sync up after lunch",
    timestamp: "2025-01-11T16:48:00Z",
    unread: 1,
  },
  {
    _id: "chat_004",
    user: {
      _id: "user_104",
      name: "Design Team",
      profilePhoto: "https://i.pravatar.cc/150?img=4",
    },
    lastMessage: "New UI mockups are ready 🚀",
    timestamp: "2025-01-11T14:22:00Z",
    unread: 0,
  },
  {
    _id: "chat_005",
    user: {
      _id: "user_105",
      name: "Support Bot",
      profilePhoto: "https://i.pravatar.cc/150?img=5",
    },
    lastMessage: "Your ticket has been resolved ✅",
    timestamp: "2025-01-10T11:05:00Z",
    unread: 2,
  },
  {
    _id: "chat_006",
    user: {
      _id: "user_105",
      name: "Support Bot",
      profilePhoto: "https://i.pravatar.cc/150?img=5",
    },
    lastMessage: "Your ticket has been resolved ✅",
    timestamp: "2025-01-10T11:05:00Z",
    unread: 2,
  },
  {
    _id: "chat_007",
    user: {
      _id: "user_105",
      name: "Support Bot",
      profilePhoto: "https://i.pravatar.cc/150?img=5",
    },
    lastMessage: "Your ticket has been resolved ✅",
    timestamp: "2025-01-10T11:05:00Z",
    unread: 2,
  },
];

const Matches = () => {
  const [selectedMatch, setSelectedMatch] = useState<userData | null>(null);
  const [chats, setChats] = useState<ChatMessage[]>(dummyChats);
  const dispatch = useDispatch<AppDispatch>();
  const matches = useAppSelector((store) => store.user.matchesData?.data) || [];

  useEffect(() => {
    dispatch(getAllMatches());
  }, []);

  const handleMatchClick = (match: userData) => {
    setSelectedMatch(match);
  };

  const handleCloseCard = () => {
    setSelectedMatch(null);
  };

  const handleChatClick = (chatId: string) => {
    console.log("Open chat:", chatId);
    // Navigate to individual chat or open chat window
  };

  return (
    <div className="chatPageContainer">
      <div className="w-4/12">
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
            {chats.length !== 0 &&
              chats.map((chat) => (
                <div
                  key={chat._id}
                  className="chatItem"
                  onClick={() => handleChatClick(chat._id)}
                >
                  <div className="chatAvatarWrapper">
                    <img
                      src={chat.user.profilePhoto}
                      alt={chat.user.name}
                      className="chatAvatar"
                    />
                    {chat.unread > 0 && (
                      <div className="chatUnreadBadge">{chat.unread}</div>
                    )}
                  </div>
                  <div className="chatContent">
                    <div className="chatHeader">
                      <h3 className="chatUserName">{chat.user.name}</h3>
                      <span className="chatTimestamp">{chat.timestamp}</span>
                    </div>
                    <p
                      className={`chatLastMessage ${
                        chat.unread > 0 ? "chatUnreadText" : ""
                      }`}
                    >
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="w-8/12">
        <Chat />
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

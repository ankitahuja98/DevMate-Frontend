import "../CSS/Chat.css";
import { useState } from "react";
import { useAppSelector } from "../redux/store/store";
import LikedYouUserCard from "../Components/LikedYouUserCard";
import type { userData } from "../types/userData";

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

const Chat = () => {
  const [selectedMatch, setSelectedMatch] = useState<userData | null>(null);

  const matches =
    useAppSelector((store) => store.user.userProfileData?.data) || [];

  const chats: ChatMessage[] = [
    {
      _id: "1",
      user: {
        _id: "1",
        name: "Sarah Chen",
        profilePhoto: "https://i.pravatar.cc/150?img=1",
      },
      lastMessage: "That sounds great! When are you free to discuss?",
      timestamp: "2m ago",
      unread: 2,
    },
    {
      _id: "2",
      user: {
        _id: "2",
        name: "Alex Kumar",
        profilePhoto: "https://i.pravatar.cc/150?img=12",
      },
      lastMessage: "I'd love to collaborate on that project",
      timestamp: "1h ago",
      unread: 0,
    },
    {
      _id: "3",
      user: {
        _id: "3",
        name: "Maria Garcia",
        profilePhoto: "https://i.pravatar.cc/150?img=5",
      },
      lastMessage: "Thanks for the advice! Really helpful 🙏",
      timestamp: "3h ago",
      unread: 0,
    },
    {
      _id: "4",
      user: {
        _id: "4",
        name: "James Wilson",
        profilePhoto: "https://i.pravatar.cc/150?img=13",
      },
      lastMessage: "Let's schedule a call next week",
      timestamp: "1d ago",
      unread: 1,
    },
    {
      _id: "5",
      user: {
        _id: "5",
        name: "Emma Davis",
        profilePhoto: "https://i.pravatar.cc/150?img=9",
      },
      lastMessage: "Your portfolio looks amazing!",
      timestamp: "2d ago",
      unread: 0,
    },
  ];

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
      {/* Matches Section */}
      <div className="matchesSection">
        <div className="matchesSectionHeader">
          <h3 className="matchesTitle">Your matches</h3>
          {/* <span className="matchesCount">{matches.length} new</span> */}
        </div>
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
        </div>
        <div className="chatsList">
          {chats.map((chat) => (
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
              <LikedYouUserCard val={selectedMatch} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;

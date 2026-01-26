import React, { useEffect, useMemo, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import "../CSS/Chat.css";
import { creasteSocketConnetion } from "../utils/socket";
import { useParams } from "react-router-dom";
import { useAppSelector, type AppDispatch } from "../redux/store/store";
import { useDispatch } from "react-redux";
import { getChat } from "../redux/actions/chatAction";
import LikedYouUserCard from "../Components/LikedYouUserCard";
import LoadingThreeDotsPulse from "../Components/Loader";
import { clearChatData } from "../redux/slices/chatSlice";

type ChatMessage = {
  _id: string;
  senderId: {
    _id: string;
    name: string;
  };
  message: string;
};

const Bubble = ({ message, isMe }: { message: ChatMessage; isMe: boolean }) => {
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-3`}>
      <div className={`max-w-[75%] break-words`}>
        <div
          style={{
            borderRadius: !isMe ? "10px 10px 10px 0px" : "10px 10px 0px 10px",
            backgroundColor: isMe ? "oklch(0.97 0.04 159.44)" : "white",
          }}
          className={`p-3 shadow-sm ${
            isMe ? "rounded-lg rounded-br-sm" : "rounded-lg rounded-bl-sm"
          }`}
          aria-label={`${isMe ? "You" : message.senderId.name} said: ${
            message.message
          }`}
        >
          <div className="whitespace-pre-wrap">{message.message}</div>
        </div>
      </div>
    </div>
  );
};

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pageno, setpageno] = useState(1);
  const [loading, setloading] = useState(false);
  const [hasmore, sethasmore] = useState(true);
  const [input, setInput] = useState("");
  const [reciverProfile, setReciverProfile] = useState(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const matches = useAppSelector((store) => store.user.matchesData?.data) || [];

  console.log("pageno", pageno);

  const receiverDetails = useMemo(() => {
    return matches.find((val: any) => val._id === targetUserId);
  }, [matches, targetUserId]);

  const { userProfileData } = useAppSelector(
    (store) => store.profile.userProfile,
  );
  const { isChatLoading } = useAppSelector((store) => store.chat || []);

  const ChatData = useAppSelector(
    (store) => store.chat.ChatData?.data.messages || [],
  );

  const totalMessages = useAppSelector(
    (store) => store.chat.ChatData?.totalMessages || 0,
  );

  const socketRef = useRef<any>(null);

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    socketRef.current.emit("sendMessage", {
      sender: {
        _id: userProfileData._id,
        name: userProfileData.name,
      },
      receiver: targetUserId,
      message: input,
    });
    setInput("");
  };

  useEffect(() => {
    if (ChatData) {
      setMessages(ChatData);
    }
  }, [ChatData, targetUserId]);

  useEffect(() => {
    dispatch(getChat({ receiver: targetUserId, pageno: pageno, size: 25 }));
    if (!userProfileData._id) return;

    socketRef.current = creasteSocketConnetion();
    socketRef?.current?.emit("joinChat", {
      userId: userProfileData._id,
      targetUserId,
    });

    socketRef.current.on("newMessageReceived", (newMessage: ChatMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socketRef.current?.off("newMessageReceived");
      socketRef.current?.disconnect();
    };
  }, [userProfileData._id, targetUserId]);

  const handleCloseCard = () => {
    setReciverProfile(null);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (loading || !hasmore) return;

      const threshold = 100;
      if (!loading && hasmore && container.scrollTop <= threshold) {
        setpageno((prev) => prev + 1);
      }
    };
    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll);
  }, [loading, hasmore]);

  return (
    <>
      <div className="chatContainer">
        <header className="UserchatHeader">
          <div className="flex items-center gap-3">
            <div
              className="chatAvatarWrapper"
              onClick={() => setReciverProfile(receiverDetails)}
            >
              <img
                src={receiverDetails.profilePhoto}
                alt={receiverDetails.name}
                className="chatAvatar"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold">{receiverDetails.name}</h2>
              {/* <div className="text-sm text-slate-500">Online</div> */}
            </div>
          </div>
        </header>

        <main ref={scrollRef} className="UserChatContent">
          {isChatLoading ? (
            <div className="h-full flex justify-center items-center">
              <LoadingThreeDotsPulse />
            </div>
          ) : messages?.length === 0 ? (
            <div className="flex justify-center items-center text-slate-500 h-full">
              No messages yet — start the conversation
            </div>
          ) : (
            messages?.map((msg) => (
              <Bubble
                key={msg._id}
                message={msg}
                isMe={msg.senderId._id === userProfileData._id}
              />
            ))
          )}
        </main>

        <form onSubmit={handleSubmit} className="Chatform">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            aria-label="Type your message"
            placeholder="Type your message"
            className="chatInput"
          />

          <button
            type="submit"
            disabled={input.trim().length === 0}
            className={`rounded-full p-2 aspect-square flex items-center justify-center ${
              input.trim().length === 0
                ? "opacity-50 cursor-not-allowed"
                : "shadow-md"
            }`}
            aria-label="Send message"
            style={{ backgroundColor: "#128C7E", color: "white" }}
          >
            <SendIcon sx={{ fontSize: 18 }} />
          </button>
        </form>
      </div>

      {/* User Card Overlay using your existing LikedYouUserCard component */}
      {reciverProfile && (
        <div className="chatCardOverlay" onClick={handleCloseCard}>
          <div
            className="chatCardContainer"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="chatCardCloseButton" onClick={handleCloseCard}>
              ✕
            </button>
            <div className="chatCardWrapper">
              <LikedYouUserCard val={receiverDetails} isMatched={true} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;

import React, { useEffect, useMemo, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import "../CSS/Chat.css";
import { creasteSocketConnetion } from "../utils/socket";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, type AppDispatch } from "../redux/store/store";
import { useDispatch } from "react-redux";
import {
  chatDelete,
  getChat,
  markMessagesAsRead,
} from "../redux/actions/chatAction";
import LikedYouUserCard from "../Components/LikedYouUserCard";
import LoadingThreeDotsPulse from "../Components/Loader";
import { clearChatData } from "../redux/slices/chatSlice";
import getDate from "../utils/getDate";
import type { Message } from "../redux/types/chatType";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Bubble = ({ message, isMe }: { message: Message; isMe: boolean }) => {
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
          aria-label={`${isMe ? "You" : ""} said: ${message.message}`}
        >
          <div className="whitespace-pre-wrap">{message.message}</div>
        </div>
      </div>
    </div>
  );
};

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [pageno, setpageno] = useState(1);
  const [loading, setloading] = useState(false);
  const [hasmore, sethasmore] = useState(true);
  const [input, setInput] = useState("");
  const [reciverProfile, setReciverProfile] = useState(null);
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  console.log("messages", messages);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const matches = useAppSelector((store) => store.user.matchesData?.data) || [];

  const receiverDetails = useMemo(() => {
    return matches.find((val: any) => val._id === targetUserId);
  }, [matches, targetUserId]);

  const { userProfileData } = useAppSelector(
    (store) => store.profile.userProfile,
  );
  const { isChatLoading } = useAppSelector((store) => store.chat || []);

  const ChatData = useAppSelector((store) => store.chat.ChatData?.data || []);

  const totalMessages = useAppSelector(
    (store) => store.chat.ChatData?.totalMessages || 0,
  );

  const socketRef = useRef<any>(null);

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const tempId = crypto.randomUUID();

    const newMessage: Message = {
      _id: tempId, // temporary id
      message: input,
      senderId: {
        _id: userProfileData._id,
        name: userProfileData.name,
      },
    };
    setMessages((prev) => [...prev, newMessage]);

    socketRef.current.emit("sendMessage", {
      receiver: targetUserId,
      message: input,
      tempId,
    });

    setInput("");
  };

  // Load initial messages from Redux
  useEffect(() => {
    if (!ChatData) return;

    setMessages(ChatData);
    setloading(false);
  }, [ChatData]);

  useEffect(() => {
    sethasmore(messages.length < totalMessages);
  }, [messages, totalMessages]);

  useEffect(() => {
    if (!userProfileData._id || !targetUserId) return;

    const socket = creasteSocketConnetion();
    socketRef.current = socket;

    socket.on("connect", () => {
      setTimeout(() => {
        socket.emit("joinChat", {
          targetUserId,
        });
      }, 100);
    });

    socket.on("newMessageReceived", (newMessage: Message) => {
      setMessages((prev) => {
        // Check if this is replacing a temporary message
        const tempIndex = prev.findIndex((m) => m._id === newMessage.tempId);

        if (tempIndex !== -1) {
          // Replace the temporary message with the real one
          const updated = [...prev];
          updated[tempIndex] = newMessage;
          return updated;
        }

        // Check if message already exists (by real _id)
        if (prev.some((m) => m._id === newMessage._id)) {
          return prev;
        }

        return [...prev, newMessage];
      });
    });

    return () => {
      socket.off("connect");
      socket.off("newMessageReceived");
      socket.disconnect();
    };
  }, [userProfileData._id, targetUserId]);

  const handleCloseCard = () => {
    setReciverProfile(null);
  };

  // Auto scroll to bottom
  useEffect(() => {
    if (pageno === 1) {
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  useEffect(() => {
    dispatch(getChat({ receiver: targetUserId, pageno: pageno, size: 25 }));
  }, [pageno, targetUserId, dispatch]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (loading || !hasmore) return;

      const threshold = 10;
      if (!loading && hasmore && container.scrollTop <= threshold) {
        setloading(true);
        setpageno((prev) => prev + 1);
      }
    };
    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll);
  }, [loading, hasmore]);

  // reset when target user change
  useEffect(() => {
    setMessages([]);
    setpageno(1);
    sethasmore(true);
    setloading(false);
    dispatch(clearChatData());
  }, [targetUserId]);

  const handleChatDelete = (targetUserId: string | undefined) => {
    dispatch(chatDelete({ targetUserId }));
    navigate("/matches");
  };

  const hasMarkedReadRef = useRef(false);

  useEffect(() => {
    if (!targetUserId) return;
    if (messages.length === 0) return;

    if (!hasMarkedReadRef.current) {
      dispatch(markMessagesAsRead({ targetUserId }));
      hasMarkedReadRef.current = true;
    }
  }, [targetUserId, messages.length]);

  useEffect(() => {
    hasMarkedReadRef.current = false;
  }, [targetUserId]);

  return (
    <>
      <div className="chatContainer">
        <header className="UserchatHeader">
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-3 items-center ">
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
                <h2 className="text-lg font-semibold">
                  {receiverDetails.name}
                </h2>
                <div className="text-sm text-slate-500">
                  {getDate(receiverDetails.lastSeen)}
                </div>
              </div>
            </div>

            <div
              className="chatMenuWrapper"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="chatMenuIcon"
                onClick={() => setIsChatDrawerOpen((prev) => !prev)}
              >
                <MoreVertIcon />
              </div>

              {isChatDrawerOpen && (
                <div ref={menuRef} className="chatMenu">
                  <div
                    className="chatMenuItem delete"
                    onClick={() => handleChatDelete(targetUserId)}
                  >
                    Delete
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main ref={scrollRef} className="UserChatContent">
          {isChatLoading && pageno === 1 ? (
            <div className="h-full flex justify-center items-center">
              <LoadingThreeDotsPulse />
            </div>
          ) : messages?.length === 0 ? (
            <div className="flex justify-center items-center text-slate-500 h-full">
              No messages yet — start the conversation
            </div>
          ) : (
            <>
              {isChatLoading && pageno > 1 && (
                <p className="text-sm text-center text-gray-400">
                  Loading more chats...
                </p>
              )}
              {messages?.map((msg) => (
                <Bubble
                  key={msg._id}
                  message={msg}
                  isMe={msg.senderId._id === userProfileData._id}
                />
              ))}
            </>
          )}
          <div ref={bottomRef} />
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

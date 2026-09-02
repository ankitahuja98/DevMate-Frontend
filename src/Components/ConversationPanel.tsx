import React, { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import { useDispatch } from "react-redux";
import { creasteSocketConnetion } from "../utils/socket";
import { useAppSelector, type AppDispatch } from "../redux/store/store";
import {
  chatDelete,
  getChat,
  markMessagesAsRead,
} from "../redux/actions/chatAction";
import { clearChatData } from "../redux/slices/chatSlice";
import getDate from "../utils/getDate";
import type { Message } from "../redux/types/chatType";
import LoadingThreeDotsPulse from "./Loader";

const EMOJI_OPTIONS = [
  "😀", "😂", "😍", "🥰", "😎", "🤔", "😅", "😉",
  "👍", "🙌", "🙏", "👏", "🔥", "🎉", "✅", "💯",
  "❤️", "💜", "😢", "😮", "🚀", "💡", "👋", "🤝",
];

const formatBubbleTime = (date?: string) => {
  if (!date) return "";
  return new Date(date).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const formatDateDivider = (date: string) => {
  const d = new Date(date);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (d.toDateString() === now.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";

  return d.toLocaleDateString([], {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const Bubble = ({ message, isMe }: { message: Message; isMe: boolean }) => (
  <div className={`bubbleRow ${isMe ? "bubbleRow--me" : "bubbleRow--other"}`}>
    <div
      className={`chatBubble ${isMe ? "chatBubble--me" : "chatBubble--other"}`}
      aria-label={`${isMe ? "You" : ""} said: ${message.message}`}
    >
      <span className="chatBubbleText">{message.message}</span>
    </div>
    <span className="chatBubbleTime">{formatBubbleTime(message.createdAt)}</span>
  </div>
);

interface ConversationPanelProps {
  targetUserId: string;
  receiverDetails: any;
  hasFullProfile: boolean;
  onBack: () => void;
  onOpenProfile: () => void;
  onConversationDeleted: () => void;
}

const ConversationPanel = ({
  targetUserId,
  receiverDetails,
  hasFullProfile,
  onBack,
  onOpenProfile,
  onConversationDeleted,
}: ConversationPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [pageno, setpageno] = useState(1);
  const [loading, setloading] = useState(false);
  const [hasmore, sethasmore] = useState(true);
  const [input, setInput] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const emojiRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<any>(null);
  const hasMarkedReadRef = useRef(false);

  const dispatch = useDispatch<AppDispatch>();

  const { userProfileData } = useAppSelector(
    (store) => store.profile.userProfile,
  );
  const { isChatLoading } = useAppSelector((store) => store.chat || []);
  const ChatData = useAppSelector((store) => store.chat.ChatData?.data ?? null);
  const totalMessages = useAppSelector(
    (store) => store.chat.ChatData?.totalMessages || 0,
  );

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const tempId =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `temp-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    const newMessage: Message = {
      _id: tempId,
      message: input,
      senderId: {
        _id: userProfileData._id,
        name: userProfileData.name,
      },
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);

    socketRef.current?.emit("sendMessage", {
      receiver: targetUserId,
      message: input,
      tempId,
    });

    setInput("");
  };

  useEffect(() => {
    if (!ChatData) return;
    setMessages(ChatData);
    setloading(false);
  }, [ChatData]);

  useEffect(() => {
    sethasmore(messages.length < totalMessages);
  }, [messages, totalMessages]);

  useEffect(() => {
    if (!userProfileData?._id || !targetUserId) return;

    const socket = creasteSocketConnetion();
    socketRef.current = socket;

    socket.on("connect", () => {
      setTimeout(() => {
        socket.emit("joinChat", { targetUserId });
      }, 100);
    });

    socket.on("newMessageReceived", (newMessage: Message) => {
      setMessages((prev) => {
        const tempIndex = prev.findIndex((m) => m._id === newMessage.tempId);
        if (tempIndex !== -1) {
          const updated = [...prev];
          updated[tempIndex] = newMessage;
          return updated;
        }
        if (prev.some((m) => m._id === newMessage._id)) return prev;
        return [...prev, newMessage];
      });
    });

    return () => {
      socket.off("connect");
      socket.off("newMessageReceived");
      socket.disconnect();
    };
  }, [userProfileData?._id, targetUserId]);

  useEffect(() => {
    if (pageno === 1) {
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  useEffect(() => {
    dispatch(getChat({ receiver: targetUserId, pageno, size: 25 }));
  }, [pageno, targetUserId, dispatch]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (loading || !hasmore) return;
      const threshold = 10;
      if (container.scrollTop <= threshold) {
        setloading(true);
        setpageno((prev) => prev + 1);
      }
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [loading, hasmore]);

  useEffect(() => {
    setMessages([]);
    setpageno(1);
    sethasmore(true);
    setloading(false);
    dispatch(clearChatData());
  }, [targetUserId, dispatch]);

  useEffect(() => {
    if (!targetUserId || messages.length === 0) return;
    if (!hasMarkedReadRef.current) {
      dispatch(markMessagesAsRead({ targetUserId }));
      hasMarkedReadRef.current = true;
    }
  }, [targetUserId, messages.length, dispatch]);

  useEffect(() => {
    hasMarkedReadRef.current = false;
  }, [targetUserId]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  // Close the "more" menu and emoji popover on outside click
  useEffect(() => {
    if (!isMenuOpen && !isEmojiOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
      if (
        isEmojiOpen &&
        emojiRef.current &&
        !emojiRef.current.contains(e.target as Node)
      ) {
        setIsEmojiOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isMenuOpen, isEmojiOpen]);

  const handleChatDelete = () => {
    setIsMenuOpen(false);
    dispatch(chatDelete({ targetUserId }));
    onConversationDeleted();
  };

  const handleEmojiPick = (emoji: string) => {
    setInput((prev) => prev + emoji);
    setIsEmojiOpen(false);
  };

  const online = receiverDetails
    ? receiverDetails.isOnline ?? !receiverDetails.lastSeen
    : false;
  const statusLabel = online
    ? "Online"
    : receiverDetails
      ? getDate(receiverDetails.lastSeen)
      : "";

  // Insert a date divider before the first message of each calendar day
  let lastDividerDate = "";

  return (
    <div className="conversationPanel">
      <header className="conversationHeader">
        <div className="conversationHeaderLeft">
          <button
            type="button"
            className="conversationBackBtn"
            onClick={onBack}
            aria-label="Back to conversations"
          >
            <ArrowBackIcon sx={{ fontSize: 20 }} />
          </button>

          <div
            className={`conversationAvatarWrapper ${hasFullProfile ? "clickable" : ""}`}
            onClick={hasFullProfile ? onOpenProfile : undefined}
          >
            <img
              src={receiverDetails?.profilePhoto}
              alt={receiverDetails?.name || "Conversation"}
              className="conversationAvatar"
            />
            {online && <span className="conversationOnlineDot" />}
          </div>

          <div className="min-w-0">
            <h2 className="conversationName">
              {receiverDetails?.name || "Conversation"}
            </h2>
            <div
              className={`conversationStatus ${online ? "conversationStatus--online" : ""}`}
            >
              {online && <span className="statusDot" />}
              {statusLabel}
            </div>
          </div>
        </div>

        <div className="conversationHeaderActions">
          <div className="chatMenuWrapper">
            <button
              type="button"
              className="conversationIconBtn"
              aria-label="More options"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <MoreVertIcon sx={{ fontSize: 20 }} />
            </button>

            {isMenuOpen && (
              <div ref={menuRef} className="chatMenu">
                {hasFullProfile && (
                  <div
                    className="chatMenuItem"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenProfile();
                    }}
                  >
                    View profile
                  </div>
                )}
                <div className="chatMenuItem delete" onClick={handleChatDelete}>
                  Delete conversation
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="conversationCanvas">
      <main ref={scrollRef} className="UserChatContent conversationBody">
        {isChatLoading && pageno === 1 ? (
          <div className="h-full flex justify-center items-center">
            <LoadingThreeDotsPulse />
          </div>
        ) : messages?.length === 0 ? (
          <div className="conversationEmptyState">
            <div className="chatEmptyIcon">💬</div>
            <p className="text-sm font-medium text-slate-500">
              No messages yet
            </p>
            <p className="text-xs text-slate-400">Say hi to get started!</p>
          </div>
        ) : (
          <>
            {isChatLoading && pageno > 1 && (
              <p className="text-sm text-center text-gray-400">
                Loading more messages...
              </p>
            )}
            {messages?.map((msg) => {
              const dividerLabel = msg.createdAt
                ? formatDateDivider(msg.createdAt)
                : null;
              const showDivider =
                dividerLabel !== null && dividerLabel !== lastDividerDate;
              if (showDivider) lastDividerDate = dividerLabel as string;

              return (
                <React.Fragment key={msg._id}>
                  {showDivider && (
                    <div className="dateDivider">
                      <span>{dividerLabel}</span>
                    </div>
                  )}
                  <Bubble
                    message={msg}
                    isMe={msg.senderId._id === userProfileData._id}
                  />
                </React.Fragment>
              );
            })}
          </>
        )}
        <div ref={bottomRef} />
      </main>

      <form onSubmit={handleSubmit} className="composer">
        <div className="composerInputWrapper">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            aria-label="Type a message"
            placeholder="Type a message..."
            className="composerInput"
            autoComplete="off"
          />
        </div>

        <div className="chatMenuWrapper" ref={emojiRef}>
          <button
            type="button"
            className="composerIconBtn"
            aria-label="Add emoji"
            onClick={() => setIsEmojiOpen((prev) => !prev)}
          >
            <SentimentSatisfiedAltOutlinedIcon sx={{ fontSize: 20 }} />
          </button>

          {isEmojiOpen && (
            <div className="emojiPopover">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  type="button"
                  key={emoji}
                  className="emojiOption"
                  onClick={() => handleEmojiPick(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={input.trim().length === 0}
          className="composerSendBtn"
          aria-label="Send message"
        >
          <SendIcon sx={{ fontSize: 19 }} />
        </button>
      </form>
      </div>
    </div>
  );
};

export default ConversationPanel;
